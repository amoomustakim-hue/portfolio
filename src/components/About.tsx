import { useRef } from 'react'
import { DISCIPLINES, IDENTITY, RECORD } from '../config/site'
import { useScrollScene } from '../hooks/useScrollScene'
import { gsap } from '../utils/gsap'
import { pad } from '../utils/math'
import { Mask, SplitChars } from './ui/Mask'

const NOTES: Record<string, string> = {
  Design: 'Interfaces, systems, art direction.',
  Code: 'React, WebGL, the whole stack.',
  Motion: 'Timing is a material.',
  Product: 'From an idea to something shipped.',
  Experiment: 'Curiosity, on purpose.',
  Build: 'Then do it again, better.',
}

const base = import.meta.env.BASE_URL

/**
 * The quiet, light chapter. One word at a time while pinned, then a short
 * statement, a portrait and the record.
 */
export function About() {
  const root = useRef<HTMLElement>(null)
  const count = useRef<HTMLSpanElement>(null)

  useScrollScene(root, ({ motion }) => {
    if (motion) {
      const words = gsap.utils.toArray<HTMLElement>('.about__word')
      const notes = gsap.utils.toArray<HTMLElement>('.about__note')
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.about__pin',
          start: 'top top',
          end: `+=${DISCIPLINES.length * 55}%`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const i = Math.min(DISCIPLINES.length - 1, Math.floor(self.progress * DISCIPLINES.length))
            if (count.current) count.current.textContent = pad(i + 1)
          },
        },
      })
      words.forEach((w, i) => {
        const chars = w.querySelectorAll('.char')
        if (i > 0) {
          tl.fromTo(chars, { yPercent: 105 }, { yPercent: 0, stagger: 0.02, duration: 0.3, ease: 'power3.out' }, i - 0.2)
          tl.fromTo(notes[i], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.2 }, i - 0.1)
        }
        if (i < words.length - 1) {
          tl.fromTo(chars, { yPercent: 0 }, { yPercent: -105, stagger: 0.02, duration: 0.3, ease: 'power3.in', immediateRender: false }, i + 0.55)
          tl.to(notes[i], { opacity: 0, duration: 0.15 }, i + 0.55)
        }
      })
      tl.fromTo('.about__progress i', { scaleX: 0 }, { scaleX: 1, duration: words.length }, 0)
      tl.set({}, {}, words.length)
    }

    gsap.utils.toArray<HTMLElement>('.about [data-reveal]').forEach((el) => {
      gsap.from(el.querySelectorAll('.mask__inner'), { yPercent: 110, duration: 1.4, stagger: 0.08, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 80%' } })
    })
    if (motion) {
      gsap.fromTo(
        '.about__portrait',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut', scrollTrigger: { trigger: '.about__portrait', start: 'top 80%' } },
      )
      gsap.fromTo('.about__portrait img', { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.about__portrait', start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.from('.about__record li', { opacity: 0, y: 18, duration: 1, stagger: 0.08, scrollTrigger: { trigger: '.about__record', start: 'top 85%' } })
    }
  })

  return (
    <section className="about" id="about" ref={root} data-theme="light" aria-label="About">
      <div className="about__pin">
        <p className="meta about__label">(02) About — What I do</p>
        <div className="about__words" aria-label={DISCIPLINES.join(', ')}>
          {DISCIPLINES.map((w) => (
            <div className="about__word" key={w}>
              <SplitChars text={w.toUpperCase()} />
            </div>
          ))}
        </div>
        <div className="about__notes" aria-hidden="true">
          {DISCIPLINES.map((w) => (
            <p className="about__note meta" key={w}>
              {NOTES[w]}
            </p>
          ))}
        </div>
        <p className="about__count meta" aria-hidden="true">
          <span ref={count}>01</span> / {pad(DISCIPLINES.length)}
        </p>
        <span className="about__progress" aria-hidden="true">
          <i />
        </span>
      </div>

      <div className="about__statement">
        <div data-reveal>
          <Mask as="h2" className="about__headline" lines={['I design.', 'I develop.', <em>I experiment.</em>]} />
        </div>
        <figure className="about__portrait" data-cursor="Hello">
          <img src={`${base}img/profile.jpg`} alt={`Portrait of ${IDENTITY.fullName}`} loading="lazy" decoding="async" />
          <figcaption className="meta">{IDENTITY.fullName}</figcaption>
        </figure>
        <div className="about__bio" data-reveal>
          <Mask
            as="p"
            className="about__bio-lead"
            lines={[`I’m ${IDENTITY.name} — a creative developer`, 'and designer from Lagos, Nigeria.']}
          />
          <p className="about__bio-body">
            I build digital products, interactive experiences and visual systems where technology meets storytelling. Founder of
            Cravvingss. Also known as {IDENTITY.alias}.
          </p>
        </div>
      </div>

      <div className="about__record">
        <p className="meta dim">Record</p>
        <ol>
          {RECORD.map((r) => (
            <li key={r.label}>
              <span className="about__record-value">{r.value}</span>
              <span className="about__record-label">{r.label}</span>
            </li>
          ))}
          <li>
            <span className="about__record-value">∞</span>
            <span className="about__record-label">UI/UX designer · Creative developer · Motion designer</span>
          </li>
        </ol>
      </div>
    </section>
  )
}
