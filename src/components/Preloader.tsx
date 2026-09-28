import { useEffect, useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useMediaQuery'
import { gsap } from '../utils/gsap'
import { pad } from '../utils/math'
import { Mask } from './ui/Mask'

type Props = { onReveal: () => void; onDone: () => void }

const MIN = 1600
const MAX = 6000
const base = import.meta.env.BASE_URL

/**
 * Black field, name, a three-digit counter driven by real loading (fonts,
 * the first project's poster, the 3D hero chunk). Leaves by splitting open
 * like a shutter.
 */
export function Preloader({ onReveal, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const cb = useRef({ onReveal, onDone })
  cb.current = { onReveal, onDone }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mask__inner', { yPercent: 110, duration: 1.3, stagger: 0.08, ease: 'expo.out', delay: 0.1 })
      gsap.from('.preloader__foot', { opacity: 0, duration: 1, delay: 0.4 })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const parts = [0, 0, 0]
    const counter = { v: 0 }
    const start = performance.now()
    let leaving = false
    let wait = 0

    const render = () => {
      if (count.current) count.current.textContent = pad(counter.v, 3)
      if (bar.current) bar.current.style.transform = `scaleX(${counter.v / 100})`
    }
    const leave = () => {
      if (leaving) return
      leaving = true
      const el = root.current!
      const tl = gsap.timeline({ onComplete: () => cb.current.onDone() })
      if (reduced) {
        tl.add(() => cb.current.onReveal()).to(el, { opacity: 0, duration: 0.5 })
        return
      }
      tl.to(el.querySelectorAll('.mask__inner'), { yPercent: -110, duration: 0.8, stagger: 0.04, ease: 'power3.in' })
        .to(el.querySelector('.preloader__foot'), { opacity: 0, duration: 0.4 }, '<')
        .add(() => cb.current.onReveal(), '-=0.1')
        .to(el.querySelector('.preloader__top'), { yPercent: -100, duration: 1.3, ease: 'power4.inOut' }, '<')
        .to(el.querySelector('.preloader__bottom'), { yPercent: 100, duration: 1.3, ease: 'power4.inOut' }, '<')
    }
    const settle = () => {
      if (counter.v < 99.5) return
      const left = MIN - (performance.now() - start)
      if (left > 0) wait = window.setTimeout(leave, left)
      else leave()
    }
    const update = () => {
      const target = ((parts[0] + parts[1] + parts[2]) / 3) * 100
      gsap.to(counter, { v: target, duration: 0.9, ease: 'power2.out', overwrite: true, onUpdate: render, onComplete: settle })
    }
    const done = (i: number) => () => {
      parts[i] = 1
      update()
    }

    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]).then(done(0))
    const img = new Image()
    img.onload = img.onerror = done(1)
    img.src = `${base}media/shanghai-poster.jpg`
    // The hero's 3D object ships in its own chunk.
    import('./HeroObject').then(done(2), done(2))
    const cap = window.setTimeout(() => {
      parts.fill(1)
      update()
    }, MAX)

    return () => {
      window.clearTimeout(cap)
      window.clearTimeout(wait)
      gsap.killTweensOf(counter)
    }
  }, [reduced])

  return (
    <div className="preloader" ref={root} role="status" aria-live="polite" aria-label="Loading">
      <div className="preloader__top" />
      <div className="preloader__bottom" />
      <div className="preloader__name">
        <Mask lines={['Mustakheem']} className="preloader__title" />
        <Mask lines={['Creative Developer']} className="meta preloader__role" />
      </div>
      <p className="preloader__count" aria-hidden="true">
        <span className="mask">
          <span className="mask__inner" ref={count}>
            000
          </span>
        </span>
      </p>
      <div className="preloader__foot">
        <span className="meta">Initializing experience</span>
        <span className="meta dim">Lagos — 2026</span>
        <span className="preloader__bar" aria-hidden="true">
          <span ref={bar} />
        </span>
      </div>
    </div>
  )
}
