import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type Id = 'form' | 'displace' | 'swarm'

/** Pointer in normalised device coordinates, tracked on the canvas' parent. */
function usePointer(el: React.RefObject<HTMLElement | null>) {
  const p = useRef({ x: 0, y: 0, dx: 0, dy: 0, down: false, inside: false })
  useEffect(() => {
    const node = el.current
    if (!node) return
    const move = (e: PointerEvent) => {
      const r = node.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 2 - 1
      const y = -(((e.clientY - r.top) / r.height) * 2 - 1)
      p.current.dx = x - p.current.x
      p.current.dy = y - p.current.y
      p.current.x = x
      p.current.y = y
      p.current.inside = true
    }
    const down = () => (p.current.down = true)
    const up = () => (p.current.down = false)
    const leave = () => ((p.current.inside = false), (p.current.down = false))
    node.addEventListener('pointermove', move)
    node.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    node.addEventListener('pointerleave', leave)
    return () => {
      node.removeEventListener('pointermove', move)
      node.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      node.removeEventListener('pointerleave', leave)
    }
  }, [el])
  return p
}

type P = ReturnType<typeof usePointer>

// E02 — a faceted object with inertia; drag to spin it.
function Form({ pointer }: { pointer: P }) {
  const group = useRef<THREE.Group>(null)
  const spin = useRef({ x: 0.002, y: 0.004 })
  useFrame(() => {
    const p = pointer.current
    if (p.down) {
      spin.current.y += p.dx * 0.25
      spin.current.x -= p.dy * 0.25
      p.dx = p.dy = 0
    }
    spin.current.x *= 0.95
    spin.current.y *= 0.95
    const g = group.current!
    g.rotation.x += spin.current.x + 0.001
    g.rotation.y += spin.current.y + 0.002
  })
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial color="#f5f5f0" flatShading roughness={0.55} metalness={0.1} />
      </mesh>
      <mesh scale={1.18}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial color="#f5f5f0" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

// E04 — Shanghai at night, rippled and colour-split around the cursor.
const DISPLACE_FRAG = /* glsl */ `
uniform sampler2D uTex; uniform vec2 uMouse; uniform float uTime; uniform float uForce; uniform vec2 uCover;
varying vec2 vUv;
void main(){
  vec2 uv=(vUv-0.5)*uCover+0.5;
  vec2 m=(uMouse-0.5)*uCover+0.5;
  vec2 d=uv-m; float dist=length(d*vec2(1.0,uCover.y/uCover.x));
  float wave=sin(dist*60.0-uTime*6.0)*exp(-dist*9.0)*uForce;
  vec2 off=normalize(d+1e-5)*wave*0.03;
  float split=0.004+uForce*0.012*exp(-dist*6.0);
  float r=texture2D(uTex,uv+off+vec2(split,0.0)).r;
  float g=texture2D(uTex,uv+off).g;
  float b=texture2D(uTex,uv+off-vec2(split,0.0)).b;
  gl_FragColor=vec4(r,g,b,1.0);
}`

function Displace({ pointer }: { pointer: P }) {
  const tex = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}media/shanghai-night.jpg`)
  const { size } = useThree()
  const force = useRef(0)
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }',
        fragmentShader: DISPLACE_FRAG,
        uniforms: { uTex: { value: tex }, uMouse: { value: new THREE.Vector2(0.5, 0.5) }, uTime: { value: 0 }, uForce: { value: 0 }, uCover: { value: new THREE.Vector2(1, 1) } },
      }),
    [tex],
  )
  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    const img = tex.image as HTMLImageElement
    const a = size.width / size.height
    const ia = img.width / img.height
    material.uniforms.uCover.value.set(a < ia ? a / ia : 1, a < ia ? 1 : ia / a)
  }, [tex, size, material])
  useFrame((_, dt) => {
    const p = pointer.current
    const target = p.inside ? Math.min(1, Math.hypot(p.dx, p.dy) * 25 + 0.25) : 0
    p.dx *= 0.9
    p.dy *= 0.9
    force.current += (target - force.current) * 0.06
    const u = material.uniforms
    u.uTime.value += dt
    u.uForce.value = force.current
    u.uMouse.value.lerp(new THREE.Vector2((p.x + 1) / 2, (p.y + 1) / 2), 0.15)
  })
  return (
    <mesh material={material} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  )
}

// E05 — points on a sphere, pushed away by the cursor, pulled home by springs.
function Swarm({ pointer, count }: { pointer: P; count: number }) {
  const points = useRef<THREE.Points>(null)
  const { camera } = useThree()
  const data = useMemo(() => {
    const home = new Float32Array(count * 3)
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const t = golden * i
      home.set([Math.cos(t) * r * 1.6, y * 1.6, Math.sin(t) * r * 1.6], i * 3)
    }
    pos.set(home)
    return { home, pos, vel }
  }, [count])
  const ray = useMemo(() => new THREE.Raycaster(), [])
  const hit = useMemo(() => new THREE.Vector3(), [])
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])

  useFrame((state) => {
    const p = pointer.current
    const { home, pos, vel } = data
    const angle = state.clock.elapsedTime * 0.15
    const ca = Math.cos(angle)
    const sa = Math.sin(angle)
    let active = false
    if (p.inside) {
      ray.setFromCamera(new THREE.Vector2(p.x, p.y), camera)
      active = !!ray.ray.intersectPlane(plane, hit)
    }
    for (let i = 0; i < count; i++) {
      const k = i * 3
      const hx = home[k] * ca - home[k + 2] * sa
      const hz = home[k] * sa + home[k + 2] * ca
      const hy = home[k + 1]
      let vx = vel[k] + (hx - pos[k]) * 0.03
      let vy = vel[k + 1] + (hy - pos[k + 1]) * 0.03
      let vz = vel[k + 2] + (hz - pos[k + 2]) * 0.03
      if (active) {
        const dx = pos[k] - hit.x
        const dy = pos[k + 1] - hit.y
        const d2 = dx * dx + dy * dy
        if (d2 < 0.5) {
          const f = (0.5 - d2) * 0.12
          const d = Math.sqrt(d2) || 1
          vx += (dx / d) * f
          vy += (dy / d) * f
          vz += f * 0.6
        }
      }
      vel[k] = vx * 0.88
      vel[k + 1] = vy * 0.88
      vel[k + 2] = vz * 0.88
      pos[k] += vel[k]
      pos[k + 1] += vel[k + 1]
      pos[k + 2] += vel[k + 2]
    }
    const attr = points.current!.geometry.getAttribute('position') as THREE.BufferAttribute
    attr.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.pos, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f5f5f0" size={0.022} sizeAttenuation transparent opacity={0.85} />
    </points>
  )
}

export default function ThreeExperiment({ id, playing }: { id: Id; playing: boolean }) {
  const wrap = useRef<HTMLDivElement>(null)
  const pointer = usePointer(wrap)
  const mobile = window.matchMedia('(max-width: 767px)').matches
  return (
    <div className="exp__three" ref={wrap}>
      <Canvas frameloop={playing ? 'always' : 'demand'} dpr={[1, 1.75]} camera={{ fov: 35, position: [0, 0, 6] }} gl={{ antialias: true, alpha: true }}>
        {id === 'form' && (
          <>
            <ambientLight intensity={0.35} />
            <directionalLight position={[3, 4, 5]} intensity={2.2} />
            <directionalLight position={[-4, -2, -3]} intensity={0.6} color="#8f7bff" />
            <Form pointer={pointer} />
          </>
        )}
        {id === 'displace' && <Displace pointer={pointer} />}
        {id === 'swarm' && <Swarm pointer={pointer} count={mobile ? 1800 : 4000} />}
      </Canvas>
    </div>
  )
}
