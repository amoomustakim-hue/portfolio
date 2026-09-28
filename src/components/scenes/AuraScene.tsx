import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import type { SceneProps } from './types'

/** Studio lighting as an environment map: glass and brass need something to reflect. */
function Studio() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    return () => {
      scene.environment = null
      env.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])
  return null
}

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.quadraticCurveTo(x + w, y, x + w, y + r)
  s.lineTo(x + w, y + h - r)
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  s.lineTo(x + r, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)
  return s
}

function useLabel() {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 640
    const g = c.getContext('2d')!
    g.clearRect(0, 0, 512, 640)
    g.fillStyle = 'rgba(28, 22, 14, 0.92)'
    g.textAlign = 'center'
    g.font = '300 150px "Inter Tight Variable", "Inter Tight", Helvetica, sans-serif'
    g.fillText('AURA', 256, 330)
    g.font = '500 26px "IBM Plex Mono", monospace'
    g.fillText('EAU DE PARFUM', 256, 400)
    g.fillText('50 ML — 1.7 FL.OZ', 256, 440)
    g.fillRect(206, 470, 100, 2)
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 4
    return tex
  }, [])
}

/**
 * The backdrop is geometry, not CSS: glass can only refract what is rendered
 * behind it, so the warm gradient and the wordmark live on a plane.
 */
function Backdrop() {
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 2048
    c.height = 1024
    const g = c.getContext('2d')!
    const grad = g.createRadialGradient(1024, 430, 60, 1024, 520, 1150)
    grad.addColorStop(0, '#f7f0e4')
    grad.addColorStop(0.55, '#e8ddca')
    grad.addColorStop(1, '#cbbda3')
    g.fillStyle = grad
    g.fillRect(0, 0, 2048, 1024)
    g.fillStyle = 'rgba(120, 90, 50, 0.1)'
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.font = '200 560px "Inter Tight Variable", "Inter Tight", Helvetica, sans-serif'
    g.fillText('aura', 1024, 470)
    const shadow = g.createRadialGradient(1024, 860, 10, 1024, 860, 360)
    shadow.addColorStop(0, 'rgba(110, 72, 30, 0.28)')
    shadow.addColorStop(1, 'rgba(110, 72, 30, 0)')
    g.fillStyle = shadow
    g.save()
    g.translate(1024, 860)
    g.scale(1, 0.22)
    g.translate(-1024, -860)
    g.fillRect(0, 0, 2048, 1024)
    g.restore()
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])
  return (
    <mesh position={[0, 0.15, -3]}>
      <planeGeometry args={[14, 7]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  )
}

function Bottle({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null)
  const label = useLabel()

  const flacon = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(roundedRect(1.15, 1.45, 0.16), {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelSegments: 8,
      curveSegments: 16,
    })
    geo.center()
    return geo
  }, [])

  const juice = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(roundedRect(0.95, 1.02, 0.1), {
      depth: 0.34,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 4,
    })
    geo.center()
    return geo
  }, [])

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const p = pointer.current ?? { x: 0, y: 0 }
    const targetY = p.x * 0.9 + Math.sin(t * 0.35) * 0.25
    const targetX = -p.y * 0.25
    g.rotation.y += (targetY - g.rotation.y) * Math.min(1, dt * 2.2)
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, dt * 2.2)
    g.position.y = Math.sin(t * 0.8) * 0.05 - 0.15
  })

  return (
    <group ref={group}>
      <mesh geometry={flacon}>
        <meshPhysicalMaterial
          color="#fffaf2"
          transmission={1}
          thickness={1.2}
          roughness={0.04}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.05}
          attenuationColor="#f0d6a8"
          attenuationDistance={3}
          envMapIntensity={1.4}
        />
      </mesh>
      <mesh geometry={juice} position={[0, -0.16, 0]}>
        <meshPhysicalMaterial color="#d6a14c" roughness={0.15} transmission={0.55} thickness={0.6} ior={1.33} envMapIntensity={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.335]}>
        <planeGeometry args={[0.72, 0.9]} />
        <meshBasicMaterial map={label} transparent toneMapped={false} />
      </mesh>
      {/* neck + brass cap */}
      <mesh position={[0, 0.86, 0]}>
        <cylinderGeometry args={[0.13, 0.15, 0.16, 32]} />
        <meshPhysicalMaterial color="#fffaf2" transmission={1} thickness={0.3} roughness={0.05} ior={1.5} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.56, 64]} />
        <meshStandardMaterial color="#b8894b" metalness={1} roughness={0.28} envMapIntensity={1.2} />
      </mesh>
      <mesh position={[0, 1.485, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.012, 64]} />
        <meshStandardMaterial color="#d8b27a" metalness={1} roughness={0.18} />
      </mesh>
    </group>
  )
}

/** Luxury still life: one glass flacon, turned by the cursor, floating in warm light. */
export default function AuraScene({ playing, variant }: SceneProps) {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5
      pointer.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className={`scene scene--aura scene--${variant}`}>
      <Canvas
        className="scene__canvas"
        frameloop={playing ? 'always' : 'demand'}
        dpr={[1, 1.75]}
        camera={{ fov: 28, position: [0, 0.2, 7.2] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#e4d8c4']} />
        <Studio />
        <Backdrop />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <directionalLight position={[-4, 1, -3]} intensity={0.8} color="#ffe2b8" />
        <Bottle pointer={pointer} />
      </Canvas>
      <p className="aura__caption meta" aria-hidden="true">
        Nº 01 — Amber, iris, cold smoke
      </p>
    </div>
  )
}
