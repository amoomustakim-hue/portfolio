import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useIsMobile } from '../hooks/useMediaQuery'
import { blob } from '../utils/blobStage'
import { gsap } from '../utils/gsap'


const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`

const VERT = /* glsl */ `
uniform float uTime; uniform float uAmp;
varying vec3 vNormal; varying vec3 vView; varying float vNoise;
${NOISE}
float disp(vec3 p){
  return snoise(p*0.9+vec3(0.0,uTime*0.16,uTime*0.09))*0.13*uAmp + snoise(p*1.9-uTime*0.2)*0.02*uAmp;
}
vec3 move(vec3 p){ vec3 n=normalize(p); return n*(1.0+disp(n)); }
void main(){
  vec3 n=normalize(position);
  vec3 p=move(position);
  vec3 t=normalize(cross(n, abs(n.y)<0.99?vec3(0.0,1.0,0.0):vec3(1.0,0.0,0.0)));
  vec3 b=normalize(cross(n,t));
  float e=0.012;
  vec3 pt=move(n+t*e); vec3 pb=move(n+b*e);
  vec3 nn=normalize(cross(pt-p,pb-p));
  if(dot(nn,n)<0.0) nn=-nn;
  vNormal=normalize(normalMatrix*nn);
  vec4 mv=modelViewMatrix*vec4(p,1.0);
  vView=normalize(-mv.xyz);
  vNoise=disp(n);
  gl_Position=projectionMatrix*mv;
}`

// Liquid chrome in a black studio: two soft boxes, a key light, a rim.
const FRAG = /* glsl */ `
uniform float uOpacity;
varying vec3 vNormal; varying vec3 vView; varying float vNoise;
vec3 studio(vec3 r){
  vec3 c=mix(vec3(0.012),vec3(0.06),smoothstep(-1.0,1.0,r.y));
  c+=vec3(1.0)*smoothstep(0.45,0.55,r.y)*smoothstep(0.98,0.8,r.y)*0.85;
  c+=vec3(0.95)*smoothstep(0.62,0.9,r.x)*smoothstep(-0.4,0.25,r.y)*0.55;
  c+=vec3(1.0,0.96,0.9)*pow(max(0.0,dot(r,normalize(vec3(-0.55,0.45,0.7)))),28.0)*1.6;
  c+=vec3(0.55,0.5,0.62)*smoothstep(0.75,0.95,-r.x)*0.25;
  return c;
}
void main(){
  vec3 n=normalize(vNormal); vec3 v=normalize(vView);
  vec3 c=studio(reflect(-v,n));
  float fres=pow(1.0-max(dot(n,v),0.0),3.0);
  c=mix(c,vec3(0.96,0.96,0.94),fres*0.45);
  c+=vec3(0.30,0.26,0.40)*smoothstep(-0.1,0.3,vNoise)*0.08;
  gl_FragColor=vec4(c,uOpacity);
}`

function Form({ detail }: { detail: number }) {
  const mesh = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()
  const pointer = useRef({ x: 0, y: 0, speed: 0 })
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, detail), [detail])
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: { uTime: { value: 3 }, uAmp: { value: 1 }, uOpacity: { value: 1 } },
        transparent: true,
      }),
    [],
  )

  useEffect(() => {
    let last = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      pointer.current.speed = Math.min(1, pointer.current.speed + Math.hypot(x - last.x, y - last.y) * 6)
      pointer.current.x = x
      pointer.current.y = y
      last = { x, y }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((_, dt) => {
    const m = mesh.current
    if (!m) return
    const p = pointer.current
    p.speed *= 0.94
    material.uniforms.uTime.value += dt
    material.uniforms.uAmp.value = blob.amp * (1 + p.speed * 0.8)
    material.uniforms.uOpacity.value = blob.opacity
    const unit = viewport.height / 3
    const s = unit * blob.scale
    m.scale.setScalar(s)
    m.position.x += (blob.x * viewport.width + p.x * 0.3 - m.position.x) * 0.08
    m.position.y += (-blob.y * viewport.height - p.y * 0.2 - m.position.y) * 0.08
    m.rotation.y += (p.x * 0.8 - m.rotation.y) * 0.04 + dt * 0.08
    m.rotation.x += (p.y * 0.5 - m.rotation.x) * 0.04
  })

  return <mesh ref={mesh} geometry={geometry} material={material} />
}

/**
 * The persistent object. Fixed behind the page's opaque sections and in
 * front of the hero and contact typography — it only renders while one of
 * those is on screen. Not mounted at all with reduced motion.
 */
export default function HeroObject() {
  const mobile = useIsMobile()
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const check = () => {
      const on = blob.opacity > 0.01
      if (wrap.current) wrap.current.style.visibility = on ? 'visible' : 'hidden'
      setVisible((v) => (v === on ? v : on))
    }
    gsap.ticker.add(check)
    return () => gsap.ticker.remove(check)
  }, [])

  return (
    <div className="hero-object" ref={wrap} aria-hidden="true">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={mobile ? [1, 1.5] : [1, 1.75]}
        camera={{ fov: 30, position: [0, 0, 8] }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Form detail={mobile ? 28 : 56} />
      </Canvas>
    </div>
  )
}
