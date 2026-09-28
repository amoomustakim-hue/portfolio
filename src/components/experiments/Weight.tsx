import { useEffect, useRef } from 'react'

const WORD = 'CURIOSITY'

/** A variable-font word: each letter thickens as the cursor approaches it. */
export function Weight({ playing }: { playing: boolean }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current!
    const letters = Array.from(el.querySelectorAll<HTMLElement>('.weight__l'))
    const current = letters.map(() => 200)
    const target = letters.map(() => 200)
    let raf = 0
    const onMove = (e: PointerEvent) => {
      letters.forEach((l, i) => {
        const r = l.getBoundingClientRect()
        const d = Math.hypot(r.left + r.width / 2 - e.clientX, r.top + r.height / 2 - e.clientY)
        target[i] = 120 + Math.max(0, 1 - d / 320) * 780
      })
    }
    const onLeave = () => target.fill(200)
    const tick = () => {
      letters.forEach((l, i) => {
        current[i] += (target[i] - current[i]) * 0.14
        l.style.fontVariationSettings = `'wght' ${current[i].toFixed(0)}`
      })
      raf = requestAnimationFrame(tick)
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    if (playing) raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [playing])

  return (
    <div className="weight" ref={root}>
      <p className="weight__word" aria-label={WORD}>
        {Array.from(WORD).map((ch, i) => (
          <span className="weight__l" key={i} aria-hidden="true">
            {ch}
          </span>
        ))}
      </p>
      <p className="meta dim weight__axis">wght 100 — 900 / Inter Tight Variable</p>
    </div>
  )
}
