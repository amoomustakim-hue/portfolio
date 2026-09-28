import { useEffect, useRef } from 'react'
import { IDENTITY } from '../config/site'
import { useLocalTime } from '../hooks/useLocalTime'
import { useScrollScene } from '../hooks/useScrollScene'
import { gsap } from '../utils/gsap'
import { scramble } from '../utils/scramble'
import { blob } from '../utils/blobStage'
import { Mask, SplitChars } from './ui/Mask'

const LINES = ['I build', 'digital', 'experiences.']

/**
 * The first frame: three lines of oversized type with the chrome object
 * floating in front of them. Letters lean away from the cursor.
 */
export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const intro = useRef<gsap.core.Timeline | null>(null)
  const readyRef = useRef(ready)
  readyRef.current = ready
  const time = useLocalTime()

  useScrollScene(root, ({ motion, finePointer, mobile }) => {
    const home = { x: mobile ? 0.2 : 0.22, y: mobile ? -0.17 : 0.02, scale: mobile ? 0.46 : 0.86 }

    if (!motion) {
      intro.current = gsap.timeline({ paused: !readyRef.current }).fromTo('.hero__inner', { opacity: 0 }, { opacity: 1, duration: 1 })
      return
    }

    const tl = gsap
      .timeline({ paused: true, defaults: { ease: 'expo.out' } })
      .fromTo(blob, { opacity: 0, scale: home.scale * 0.55, x: home.x, y: home.y + 0.1, amp: 2.2 }, { opacity: 1, scale: home.scale, y: home.y, amp: 1, duration: 2.6 }, 0)
      .from('.hero__title .char', { yPercent: 105, duration: 1.8, stagger: 0.035 }, 0.15)
      .from('.hero__rule', { scaleX: 0, duration: 1.6, ease: 'power3.inOut' }, 0.5)
      .from('.hero__meta .mask__inner, .hero__roles .mask__inner, .hero__lede .mask__inner', { yPercent: 110, duration: 1.2, stagger: 0.05 }, 0.8)
      .add(() => root.current?.querySelectorAll<HTMLElement>('[data-scramble]').forEach((el) => scramble(el, el.dataset.scramble, 900)), 0.9)
      .from('.hero__cue', { opacity: 0, duration: 1.2 }, 1.6)
    intro.current = tl
    if (readyRef.current) tl.progress(1)

    // Leaving: the object pushes toward the camera while Work slides over it.
    gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onLeave: () => gsap.to(blob, { opacity: 0, duration: 0.3, overwrite: 'auto' }),
        onEnterBack: () => gsap.to(blob, { opacity: 1, x: home.x, duration: 0.6, overwrite: 'auto' }),
      },
      defaults: { ease: 'none' },
    })
      .fromTo(blob, { scale: home.scale, y: home.y, amp: 1 }, { scale: home.scale * 1.45, y: home.y - 0.28, amp: 1.9, immediateRender: false }, 0)
      .to('.hero__title', { yPercent: -18 }, 0)
      .to('.hero__inner', { opacity: 0.2 }, 0)

    if (!finePointer) return
    // Letters lean away from the pointer, gently.
    const chars = gsap.utils.toArray<HTMLElement>('.hero__title .char').map((el) => ({
      el,
      x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
    }))
    const onMove = (e: PointerEvent) => {
      for (const c of chars) {
        const r = c.el.getBoundingClientRect()
        const dx = r.left + r.width / 2 - e.clientX
        const dy = r.top + r.height / 2 - e.clientY
        const d = Math.hypot(dx, dy)
        const f = Math.max(0, 1 - d / 260)
        c.x((dx / (d || 1)) * f * 22)
        c.y((dy / (d || 1)) * f * 14)
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  })

  useEffect(() => {
    if (ready) intro.current?.play()
  }, [ready])

  return (
    <section className="hero" id="top" ref={root} data-theme="dark" aria-label="Introduction">
      <div className="hero__inner">
        <div className="hero__meta">
          <span className="hero__rule" aria-hidden="true" />
          <Mask className="meta" lines={[<span data-scramble={`${IDENTITY.name} — Portfolio`}>{IDENTITY.name} — Portfolio</span>, <span className="dim">Index / 2026</span>]} />
          <Mask className="meta hero__meta-mid" lines={[<span data-scramble="Creative developer">Creative developer</span>, <span className="dim">& designer</span>]} />
          <Mask
            className="meta hero__meta-right"
            lines={[<span data-scramble={IDENTITY.location}>{IDENTITY.location}</span>, <span className="dim">{IDENTITY.coords} — {time} WAT</span>]}
          />
        </div>

        <h1 className="hero__title" aria-label="I build digital experiences.">
          {LINES.map((line, i) => (
            <span key={line} className={`hero__line hero__line--${i + 1}`}>
              <SplitChars text={line} />
            </span>
          ))}
        </h1>

        <div className="hero__bottom">
          <Mask className="meta hero__roles" lines={IDENTITY.roles} />
          <p className="hero__lede">
            <Mask lines={['Design, code and motion —', 'products and experiences', 'built from Lagos.']} />
          </p>
          <p className="hero__cue meta">
            Scroll to explore <span aria-hidden="true">↓</span>
          </p>
        </div>
      </div>
    </section>
  )
}
