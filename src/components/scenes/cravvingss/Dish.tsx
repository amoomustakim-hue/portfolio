import { useMemo, type JSX } from 'react'
import { seeded } from '../../../utils/math'

export type DishKind = 'jollof' | 'suya' | 'dodo' | 'pepperSoup'

/**
 * Flat, top-down food illustrations for the Cravvingss brand world.
 * Seeded, so every render of a dish is identical.
 */
export function Dish({ kind, className, title }: { kind: DishKind; className?: string; title?: string }) {
  const body = useMemo(() => DRAW[kind](), [kind])
  return (
    <svg viewBox="-110 -110 220 220" className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <circle r="104" fill="rgba(0,0,0,0.18)" cx="4" cy="7" />
      {kind === 'pepperSoup' ? (
        <>
          <circle r="100" fill="#2b1a14" />
          <circle r="92" fill="#3a241b" />
          <circle r="74" fill="#8e2a12" />
        </>
      ) : (
        <>
          <circle r="100" fill="#f4ede2" />
          <circle r="84" fill="#fbf8f2" stroke="#e8dfd1" strokeWidth="1.5" />
        </>
      )}
      {body}
    </svg>
  )
}

const DRAW: Record<DishKind, () => JSX.Element> = {
  jollof() {
    const rnd = seeded(7)
    const grains = []
    const tones = ['#d9481c', '#e2582a', '#c63b14', '#ef6a33', '#d24a20']
    for (let i = 0; i < 340; i++) {
      const a = rnd() * Math.PI * 2
      const r = Math.sqrt(rnd()) * 58
      const x = Math.cos(a) * r - 10
      const y = Math.sin(a) * r * 0.92 + 4
      grains.push(
        <ellipse key={i} cx={x} cy={y} rx="3.4" ry="1.5" fill={tones[(rnd() * tones.length) | 0]} transform={`rotate(${rnd() * 180} ${x} ${y})`} />,
      )
    }
    return (
      <g>
        {grains}
        {/* chicken */}
        <path d="M22 -52 C52 -62 76 -40 70 -12 C66 8 44 12 30 2 C14 -8 2 -34 22 -52 Z" fill="#8a4a1f" />
        <path d="M30 -46 C50 -52 64 -36 60 -18 C56 -6 44 -6 36 -14 C26 -22 20 -38 30 -46 Z" fill="#b8652a" />
        <path d="M40 -40 C50 -42 56 -34 53 -26" stroke="#e39a55" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* tomato + onion */}
        <circle cx="-44" cy="38" r="13" fill="#e63b2e" />
        <circle cx="-44" cy="38" r="9" fill="#f26a4f" />
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={-58 + k * 12} cy={-40 + k * 5} r="8" fill="none" stroke="#8fc16a" strokeWidth="2.5" />
        ))}
      </g>
    )
  },
  suya() {
    const rnd = seeded(11)
    const pieces = []
    for (let i = 0; i < 9; i++) {
      const x = -58 + i * 14 + rnd() * 4
      const y = 30 - i * 8 + rnd() * 6
      pieces.push(<rect key={i} x={x - 10} y={y - 8} width="20" height="16" rx="5" fill={i % 2 ? '#6e2f12' : '#86401a'} transform={`rotate(${-28 + rnd() * 20} ${x} ${y})`} />)
    }
    const spice = []
    for (let i = 0; i < 160; i++) {
      const a = rnd() * Math.PI * 2
      const r = Math.sqrt(rnd()) * 70
      spice.push(<circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={0.9 + rnd()} fill={rnd() > 0.5 ? '#b5441b' : '#5a2a12'} />)
    }
    return (
      <g>
        <line x1="-78" y1="48" x2="72" y2="-38" stroke="#c9a877" strokeWidth="3" strokeLinecap="round" />
        {pieces}
        {spice}
        {[0, 1, 2, 3].map((k) => (
          <ellipse key={k} cx={20 + k * 10} cy={40 - k * 4} rx="14" ry="9" fill="none" stroke="#d7a6d8" strokeWidth="2.5" />
        ))}
        <circle cx="-40" cy="-38" r="12" fill="#e63b2e" />
        <circle cx="-22" cy="-52" r="10" fill="#e63b2e" />
      </g>
    )
  },
  dodo() {
    const rnd = seeded(23)
    const slices = []
    for (let i = 0; i < 11; i++) {
      const a = (i / 11) * Math.PI * 2 + rnd() * 0.3
      const r = 22 + rnd() * 36
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      const rot = rnd() * 180
      slices.push(
        <g key={i} transform={`rotate(${rot} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx="17" ry="10" fill="#c77a16" />
          <ellipse cx={x} cy={y} rx="14.5" ry="8" fill="#f2b134" />
          <ellipse cx={x - 3} cy={y - 2} rx="6" ry="2.6" fill="#f8d17a" />
        </g>,
      )
    }
    return <g>{slices}</g>
  },
  pepperSoup() {
    const rnd = seeded(31)
    const meat = []
    for (let i = 0; i < 7; i++) {
      const a = rnd() * Math.PI * 2
      const r = rnd() * 44
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      meat.push(
        <path key={i} d={`M${x - 10} ${y} C${x - 10} ${y - 12} ${x + 12} ${y - 12} ${x + 11} ${y} C${x + 10} ${y + 10} ${x - 9} ${y + 11} ${x - 10} ${y} Z`} fill={i % 2 ? '#5b2412' : '#6e3018'} />,
      )
    }
    const oil = []
    for (let i = 0; i < 40; i++) {
      const a = rnd() * Math.PI * 2
      const r = rnd() * 66
      oil.push(<circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={1 + rnd() * 3} fill="#c5541f" opacity="0.7" />)
    }
    return (
      <g>
        {oil}
        {meat}
        {[0, 1, 2, 3, 4].map((k) => (
          <path key={k} d={`M${-30 + k * 14} ${-20 + (k % 2) * 30} q8 -10 16 0 q-8 10 -16 0 Z`} fill="#3f7a2b" />
        ))}
      </g>
    )
  },
}
