import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { SceneProps } from './types'

const CONCRETE = '#bfb7a9'
const SKY = '#d9d3c7'

type Box = { size: [number, number, number]; pos: [number, number, number] }

// A small composition: a long wall broken by a light slit, a cantilevered
// slab on a row of columns, a solid block and a low stair.
const MASSES: Box[] = [
  { size: [4.6, 3.4, 0.36], pos: [-2.75, 1.7, -1.4] },
  { size: [3.2, 3.4, 0.36], pos: [1.8, 1.7, -1.4] },
  { size: [5.2, 0.24, 2.4], pos: [1.3, 2.62, 1.0] },
  { size: [1.7, 1.7, 1.7], pos: [-3.1, 0.85, 1.4] },
  { size: [2.2, 0.18, 0.7], pos: [-0.9, 0.09, 2.6] },
  { size: [2.2, 0.18, 0.7], pos: [-0.9, 0.27, 2.25] },
  { size: [2.2, 0.18, 0.7], pos: [-0.9, 0.45, 1.9] },
]
const COLUMNS = [-0.6, 0.6, 1.8, 3.0].map((x) => ({ size: [0.2, 2.5, 0.2] as [number, number, number], pos: [x, 1.25, 1.9] as [number, number, number] }))

function Sun({ playing }: { playing: boolean }) {
  const light = useRef<THREE.DirectionalLight>(null)
  const t = useRef(0.35)
  useFrame((_, dt) => {
    if (playing) t.current = (t.current + dt / 40) % 1
    const a = THREE.MathUtils.lerp(-1.1, 1.1, 0.5 - 0.5 * Math.cos(t.current * Math.PI * 2))
    // Side-front sun: faces toward the viewer catch light, shadows rake across the ground.
    light.current?.position.set(Math.sin(a) * 9, 6.2, 4.5 + Math.cos(a) * 2.5)
  })
  return (
    <directionalLight
      ref={light}
      castShadow
      intensity={2.5}
      color="#fff4e3"
      shadow-mapSize={[2048, 2048]}
      shadow-bias={-0.0004}
      shadow-normalBias={0.02}
      shadow-camera-left={-9}
      shadow-camera-right={9}
      shadow-camera-top={9}
      shadow-camera-bottom={-9}
      shadow-camera-near={0.5}
      shadow-camera-far={30}
    />
  )
}

function Rig({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const { camera } = useThree()
  const target = new THREE.Vector3(0, 1.2, 0)
  useFrame((_, dt) => {
    const p = pointer.current ?? { x: 0, y: 0 }
    const k = Math.min(1, dt * 1.5)
    camera.position.x += (8.2 + p.x * 1.6 - camera.position.x) * k
    camera.position.y += (3.6 - p.y * 0.8 - camera.position.y) * k
    camera.lookAt(target)
  })
  return null
}

/** Real-time architectural study: concrete, one low sun, a slit of light. */
export default function SomaScene({ playing, variant }: SceneProps) {
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
    <div className={`scene scene--soma scene--${variant}`}>
      <Canvas
        className="scene__canvas"
        shadows="percentage"
        frameloop={playing ? 'always' : 'demand'}
        dpr={[1, 1.75]}
        camera={{ fov: 30, position: [8.2, 3.6, 9.5] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={[SKY]} />
        <fog attach="fog" args={[SKY, 18, 40]} />
        <hemisphereLight args={['#f1ebe1', '#8f8577', 0.8]} />
        <Sun playing={playing} />
        <Rig pointer={pointer} />
        <mesh rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[80, 80]} />
          <meshStandardMaterial color="#b9b1a3" roughness={1} />
        </mesh>
        {[...MASSES, ...COLUMNS].map((b, i) => (
          <mesh key={i} position={b.pos} castShadow receiveShadow>
            <boxGeometry args={b.size} />
            <meshStandardMaterial color={CONCRETE} roughness={0.93} />
          </mesh>
        ))}
      </Canvas>
      <div className="soma__legend meta" aria-hidden="true">
        <span>Sōma — House for a slow afternoon</span>
        <span>Plan 1:200 / Section A—A</span>
      </div>
    </div>
  )
}
