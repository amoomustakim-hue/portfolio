import { useEffect, useId, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import type { SceneProps } from './types'

// A low coupe in profile, facing right, on a 1000 × 400 stage. Ground at y 300.
const BODY =
  'M80 280 C78 255 92 238 130 232 L250 222 C330 205 382 160 470 150 C540 142 600 145 640 160 C690 180 720 200 760 208 C840 215 900 222 925 238 C940 248 942 268 932 282 L818 290 A58 58 0 0 0 702 290 L293 290 A58 58 0 0 0 177 290 L80 290 Z'
const GLASS = 'M318 222 C372 196 418 166 474 160 C538 154 596 158 628 170 C652 180 676 196 694 208 Z'
const LINES = [
  'M130 232 C300 226 560 222 925 238', // shoulder
  'M250 222 C330 205 382 160 470 150 C540 142 600 145 640 160 C690 180 720 200 760 208', // roofline
  'M300 270 C420 266 560 266 700 270', // sill
  'M760 208 C840 215 900 222 925 238 C940 248 942 268 932 282', // hood + nose
]
const WHEELS = [235, 760]

/**
 * Automotive light painting: the car only exists where a sweep of light
 * touches its body lines. Tail lamps hold the only colour.
 */
export function NoirScene({ playing, variant }: SceneProps) {
  const root = useRef<HTMLDivElement>(null)
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    const el = root.current
    if (!el) return
    const sweep = el.querySelector(`#${id}-sweep`)
    const ctx = gsap.context(() => {
      gsap.set(sweep, { attr: { x1: -400, x2: -100 } })
      if (!playing) {
        gsap.set(sweep, { attr: { x1: 380, x2: 680 } })
        return
      }
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.6 })
        .fromTo(sweep, { attr: { x1: -500, x2: -200 } }, { attr: { x1: 1100, x2: 1400 }, duration: 4.2, ease: 'power2.inOut' })
      gsap.to('.noir__wheel', { rotate: 360, transformOrigin: '50% 50%', duration: 1.6, ease: 'none', repeat: -1 })
      gsap.utils.toArray<HTMLElement>('.noir__streak').forEach((s, i) => {
        gsap.fromTo(s, { xPercent: 120 }, { xPercent: -220, duration: 1.2 + (i % 3) * 0.7, ease: 'none', repeat: -1, delay: -i * 0.37 })
      })
      gsap.to('.noir__tail', { opacity: 0.55, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    }, el)
    return () => ctx.revert()
  }, [playing, id])

  const car = (
    <>
      <path d={BODY} fill={`url(#${id}-body)`} />
      <path d={GLASS} fill="#030303" />
      <path d={BODY} fill="none" stroke={`url(#${id}-sweep)`} strokeWidth="2.2" />
      {LINES.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={`url(#${id}-sweep)`} strokeWidth={i === 1 ? 3 : 1.6} strokeLinecap="round" />
      ))}
      {WHEELS.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={290} r={50} fill="#050505" />
          <g className="noir__wheel" style={{ transformBox: 'fill-box' }}>
            <circle cx={cx} cy={290} r={34} fill="none" stroke={`url(#${id}-sweep)`} strokeWidth="1.4" />
            {[0, 72, 144, 216, 288].map((a) => (
              <line
                key={a}
                x1={cx}
                y1={290}
                x2={cx + Math.cos((a * Math.PI) / 180) * 32}
                y2={290 + Math.sin((a * Math.PI) / 180) * 32}
                stroke={`url(#${id}-sweep)`}
                strokeWidth="1.2"
              />
            ))}
          </g>
          <circle cx={cx} cy={290} r={50} fill="none" stroke={`url(#${id}-sweep)`} strokeWidth="1" opacity="0.6" />
        </g>
      ))}
      <path className="noir__tail" d="M84 246 L118 238" stroke="#ff2a1a" strokeWidth="5" strokeLinecap="round" filter={`url(#${id}-glow)`} />
      <path d="M906 236 L928 244" stroke="#f4f4ee" strokeWidth="3.5" strokeLinecap="round" filter={`url(#${id}-glow)`} />
    </>
  )

  return (
    <div className={`scene scene--noir scene--${variant}`} ref={root}>
      <p className="noir__word" aria-hidden="true">
        NOIR
      </p>
      <div className="noir__streaks" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className="noir__streak" style={{ top: `${58 + (i % 5) * 7}%`, width: `${18 + (i * 13) % 30}%`, opacity: 0.12 + (i % 4) * 0.08 }} />
        ))}
      </div>
      <svg className="noir__car" viewBox="0 0 1000 420" role="img" aria-label="A dark coupe revealed by a moving line of light">
        <defs>
          <linearGradient id={`${id}-sweep`} gradientUnits="userSpaceOnUse" x1="-400" y1="0" x2="-100" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b1b1d" />
            <stop offset="0.55" stopColor="#0b0b0c" />
            <stop offset="1" stopColor="#050505" />
          </linearGradient>
          <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={`${id}-reflect`}>
            <rect x="0" y="300" width="1000" height="120" fill={`url(#${id}-fade)`} />
          </mask>
          <filter id={`${id}-glow`} x="-50%" y="-200%" width="200%" height="500%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <line x1="0" y1="341" x2="1000" y2="341" stroke="#fff" strokeOpacity="0.08" />
        <g mask={`url(#${id}-reflect)`}>
          <g transform="translate(0 682) scale(1 -1)">{car}</g>
        </g>
        <g transform="translate(0 0)">{car}</g>
      </svg>
      <p className="noir__spec meta" aria-hidden="true">
        V8 — 0–100 in 3.1 s — Nº 07 / 99
      </p>
    </div>
  )
}
