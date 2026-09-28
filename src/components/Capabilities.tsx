import { useRef } from 'react'
import { CAPABILITIES } from '../config/site'
import { useScrollScene } from '../hooks/useScrollScene'
import { gsap } from '../utils/gsap'

/**
 * Capabilities as a typographic band that travels sideways while pinned.
 * Words lean with scroll velocity. On phones it's a plain vertical list.
 */
export function Capabilities() {
  const root = useRef<HTMLElement>(null)

  useScrollScene(root, ({ motion, mobile }) => {
    gsap.from('.caps__head .mask__inner', { yPercent: 110, duration: 1.3, stagger: 0.08, ease: 'power4.out', scrollTrigger: { trigger: '.caps__head', start: 'top 80%' } })
    if (!motion || mobile) return
    const track = root.current!.querySelector<HTMLElement>('.caps__track')!
    const distance = () => track.scrollWidth - window.innerWidth
    const skew = gsap.quickTo('.caps__item', 'skewX', { duration: 0.6, ease: 'power3.out' })
    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.caps__pin',
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => skew(gsap.utils.clamp(-7, 7, self.getVelocity() / -350)),
        onScrubComplete: () => skew(0),
      },
    })
  })

  return (
    <section className="caps" id="capabilities" ref={root} data-theme="dark" aria-label="Capabilities">
      <div className="caps__pin">
        <header className="caps__head">
          <p className="meta">
            <span className="mask">
              <span className="mask__inner">(03) Capabilities</span>
            </span>
          </p>
          <h2 className="caps__title">
            <span className="mask">
              <span className="mask__inner">What I bring</span>
            </span>
            <span className="mask">
              <span className="mask__inner dim">to the table.</span>
            </span>
          </h2>
        </header>
        <div className="caps__track">
          {CAPABILITIES.map((c) => (
            <div className="caps__col" key={c.index}>
              <p className="meta dim caps__index">{c.index}</p>
              <h3 className="caps__cat">
                {c.title.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </h3>
              <ul>
                {c.items.map((item) => (
                  <li className="caps__item" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
