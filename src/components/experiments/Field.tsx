import { useEffect, useRef } from 'react'

/** A dot grid on springs. The cursor pushes dots aside; they drift home. */
export function Field({ playing }: { playing: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = canvas.current!
    const g = c.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio, 2)
    let dots: { hx: number; hy: number; x: number; y: number; vx: number; vy: number }[] = []
    let w = 0
    let h = 0
    const pointer = { x: -9999, y: -9999 }

    const build = () => {
      const r = c.getBoundingClientRect()
      w = r.width
      h = r.height
      c.width = w * dpr
      c.height = h * dpr
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      const gap = Math.max(18, Math.min(28, w / 36))
      dots = []
      for (let y = gap / 2; y < h; y += gap) for (let x = gap / 2; x < w; x += gap) dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 })
    }
    build()
    const ro = new ResizeObserver(build)
    ro.observe(c)

    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
    }
    const onLeave = () => ((pointer.x = -9999), (pointer.y = -9999))
    c.addEventListener('pointermove', onMove)
    c.addEventListener('pointerleave', onLeave)

    let raf = 0
    const frame = () => {
      g.clearRect(0, 0, w, h)
      const R = 130
      for (const d of dots) {
        const dx = d.x - pointer.x
        const dy = d.y - pointer.y
        const dist = Math.hypot(dx, dy)
        if (dist < R) {
          const f = (1 - dist / R) ** 2 * 3.2
          d.vx += (dx / (dist || 1)) * f
          d.vy += (dy / (dist || 1)) * f
        }
        d.vx += (d.hx - d.x) * 0.045
        d.vy += (d.hy - d.y) * 0.045
        d.vx *= 0.82
        d.vy *= 0.82
        d.x += d.vx
        d.y += d.vy
        const off = Math.min(1, Math.hypot(d.x - d.hx, d.y - d.hy) / 30)
        g.fillStyle = `rgba(245,245,240,${0.28 + off * 0.72})`
        g.beginPath()
        g.arc(d.x, d.y, 1.1 + off * 1.8, 0, Math.PI * 2)
        g.fill()
      }
      if (playing) raf = requestAnimationFrame(frame)
    }
    frame()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      c.removeEventListener('pointermove', onMove)
      c.removeEventListener('pointerleave', onLeave)
    }
  }, [playing])

  return <canvas ref={canvas} className="exp__canvas" aria-label="Interactive dot field" role="img" />
}
