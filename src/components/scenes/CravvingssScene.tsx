import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { SCRIPT } from './cravvingss/chat'
import { drawPhoneScreen } from './cravvingss/phoneScreen'
import type { SceneProps } from './types'

// Phone proportions (a 6.1" class device), in scene units.
const PW = 0.78
const PH = 1.6
const PD = 0.085
const BEZEL = 0.028

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

/**
 * A titanium phone whose screen is the live Cravvingss thread, drawn to a
 * canvas texture. New messages arrive one by one while the scene plays.
 */
function Phone({ playing, pointer }: { playing: boolean; pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null)
  const { invalidate } = useThree()

  const body = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(roundedRect(PW, PH, 0.13), {
      depth: PD,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 6,
      curveSegments: 24,
    })
    geo.center()
    return geo
  }, [])

  const screenGeo = useMemo(() => new THREE.PlaneGeometry(PW - BEZEL * 2, PH - BEZEL * 2), [])

  const { canvas, texture } = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 780
    c.height = Math.round(780 * ((PH - BEZEL * 2) / (PW - BEZEL * 2)))
    drawPhoneScreen(c, 5)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    return { canvas: c, texture: t }
  }, [])

  // Messages arrive in sequence, then the thread starts over.
  useEffect(() => {
    let count = 5
    const redraw = () => {
      drawPhoneScreen(canvas, count)
      texture.needsUpdate = true
      invalidate()
    }
    // Fonts may land after the first draw.
    document.fonts.ready.then(redraw)
    if (!playing) return
    const id = window.setInterval(() => {
      count = count >= SCRIPT.length ? 4 : count + 1
      redraw()
    }, 1500)
    return () => window.clearInterval(id)
  }, [playing, canvas, texture, invalidate])

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const p = pointer.current ?? { x: 0, y: 0 }
    const k = Math.min(1, dt * 2.4)
    g.rotation.y += (-0.38 + p.x * 0.7 + Math.sin(t * 0.4) * 0.06 - g.rotation.y) * k
    g.rotation.x += (0.08 - p.y * 0.25 - g.rotation.x) * k
    g.rotation.z = -0.05 + Math.sin(t * 0.5) * 0.015
    g.position.y = Math.sin(t * 0.9) * 0.03
  })

  return (
    <group ref={group}>
      <mesh geometry={body}>
        <meshPhysicalMaterial color="#1b1b1d" metalness={0.75} roughness={0.32} clearcoat={0.6} clearcoatRoughness={0.25} envMapIntensity={1.1} />
      </mesh>
      <mesh geometry={screenGeo} position={[0, 0, PD / 2 + 0.0195]}>
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
      {/* glass sheen */}
      <mesh geometry={screenGeo} position={[0, 0, PD / 2 + 0.021]}>
        <meshPhysicalMaterial transparent opacity={0.08} roughness={0.05} metalness={0} clearcoat={1} color="#ffffff" />
      </mesh>
      {/* side buttons */}
      <mesh position={[PW / 2 + 0.019, 0.28, 0]}>
        <boxGeometry args={[0.012, 0.2, 0.04]} />
        <meshStandardMaterial color="#2a2a2c" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-PW / 2 - 0.019, 0.36, 0]}>
        <boxGeometry args={[0.012, 0.1, 0.04]} />
        <meshStandardMaterial color="#2a2a2c" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-PW / 2 - 0.019, 0.18, 0]}>
        <boxGeometry args={[0.012, 0.16, 0.04]} />
        <meshStandardMaterial color="#2a2a2c" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  )
}

/**
 * Cravvingss: the real product — a WhatsApp order thread on a 3D phone,
 * the brand's "in one chat." line, and the status cards from the live site.
 */
export default function CravvingssScene({ playing, variant }: SceneProps) {
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
    <div className={`scene scene--cravvingss scene--${variant}`}>
      <p className="crv__line" aria-hidden="true">
        The whole food business, in <em>one chat.</em>
      </p>
      <div className="crv__stage">
        <Canvas
          className="scene__canvas"
          frameloop={playing ? 'always' : 'demand'}
          dpr={[1, 2]}
          camera={{ fov: 26, position: [0, 0, 5.2] }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Studio />
          <directionalLight position={[2, 3, 4]} intensity={1.6} />
          <directionalLight position={[-3, -1, 2]} intensity={0.6} color="#ffd6cc" />
          <Phone playing={playing} pointer={pointer} />
        </Canvas>
        <div className="crv__chip crv__chip--paid" aria-hidden="true">
          <i className="crv__tick" />
          <span>
            <strong>Paid ₦3,100</strong>
            <small>to Mama Ada’s</small>
          </span>
        </div>
        <div className="crv__chip crv__chip--rider" aria-hidden="true">
          <i className="crv__bike" />
          <span>
            <strong>8 mins away</strong>
            <small>David · on a bike</small>
          </span>
        </div>
      </div>
      <p className="crv__status meta" aria-hidden="true">
        <i /> Now delivering in Yaba
      </p>
    </div>
  )
}
