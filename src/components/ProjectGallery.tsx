import { useRef, useState } from 'react'
import { PROJECTS, type Project } from '../projects'
import type { Exit } from '../projects/types'
import { useScrollScene } from '../hooks/useScrollScene'
import { useReducedMotion } from '../hooks/useMediaQuery'
import { gsap } from '../utils/gsap'
import { pad } from '../utils/math'
import { navigate } from '../utils/router'
import { expandFrom } from '../utils/transition'
import { Scene } from './scenes/Scene'
import { Mask, SplitChars } from './ui/Mask'

type TL = gsap.core.Timeline
const q = (el: HTMLElement, sel: string) => el.querySelectorAll(sel)

/**
 * Each exit is its own piece of choreography — the gallery never simply
 * cross-fades. `at` is where the hand-off starts on the timeline, `d` its length.
 */
const EXITS: Record<Exit, (tl: TL, cur: HTMLElement, next: HTMLElement, at: number, d: number) => void> = {
  // Frame shrinks, title stretches off, black — the next project rises.
  stretch(tl, cur, next, at, d) {
    tl.to(q(cur, '.slide__frame'), { scale: 0.6, duration: d * 0.5, ease: 'power2.in' }, at)
      .to(q(cur, '.slide__title'), { scaleX: 2.2, opacity: 0, transformOrigin: '0% 50%', duration: d * 0.5, ease: 'power2.in' }, at)
      .to(q(cur, '.slide__meta, .slide__sub'), { opacity: 0, duration: d * 0.25 }, at)
      .to(q(cur, '.slide__blackout'), { opacity: 1, duration: d * 0.2 }, at + d * 0.32)
      .set(next, { autoAlpha: 1 }, at + d * 0.5)
      .fromTo(next, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: d * 0.5, ease: 'power3.out' }, at + d * 0.5)
  },
  // The image grows past the viewport and the next project opens inside it.
  expand(tl, cur, next, at, d) {
    tl.to(q(cur, '.slide__frame'), { scale: 1.55, duration: d, ease: 'power2.in' }, at)
      .to(q(cur, '.slide__meta, .slide__sub, .slide__title'), { opacity: 0, duration: d * 0.3 }, at)
      .set(next, { autoAlpha: 1 }, at + d * 0.3)
      .fromTo(next, { clipPath: 'circle(0% at 50% 45%)' }, { clipPath: 'circle(75% at 50% 45%)', duration: d * 0.7, ease: 'power2.inOut' }, at + d * 0.3)
      .fromTo(q(next, '.slide__frame'), { scale: 1.25 }, { scale: 1, duration: d * 0.7, ease: 'power3.out' }, at + d * 0.3)
  },
  // A horizontal move through the gallery, with the media lagging behind its frame.
  slide(tl, cur, next, at, d) {
    tl.set(next, { autoAlpha: 1 }, at)
      .to(cur, { xPercent: -100, duration: d, ease: 'power2.inOut' }, at)
      .to(q(cur, '.slide__media'), { xPercent: 35, duration: d, ease: 'power2.inOut' }, at)
      .fromTo(next, { xPercent: 100 }, { xPercent: 0, duration: d, ease: 'power2.inOut' }, at)
      .fromTo(q(next, '.slide__media'), { xPercent: -35 }, { xPercent: 0, duration: d, ease: 'power2.inOut' }, at)
  },
  // A shutter wipes in from the right while the current frame drifts and dims.
  shutter(tl, cur, next, at, d) {
    tl.set(next, { autoAlpha: 1 }, at)
      .to(cur, { xPercent: -18, duration: d, ease: 'power2.inOut' }, at)
      .to(q(cur, '.slide__blackout'), { opacity: 0.7, duration: d }, at)
      .fromTo(next, { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: d, ease: 'power3.inOut' }, at)
      .fromTo(q(next, '.slide__frame'), { xPercent: 12 }, { xPercent: 0, duration: d, ease: 'power3.out' }, at)
  },
  // A tube-TV switch-off: the frame collapses to a line, then the next opens from it.
  collapse(tl, cur, next, at, d) {
    tl.to(q(cur, '.slide__meta, .slide__sub, .slide__title'), { opacity: 0, duration: d * 0.2 }, at)
      .to(q(cur, '.slide__frame'), { scaleY: 0.005, duration: d * 0.4, ease: 'power3.in' }, at)
      .to(q(cur, '.slide__frame'), { scaleX: 0, duration: d * 0.12, ease: 'power2.in' }, at + d * 0.4)
      .set(next, { autoAlpha: 1 }, at + d * 0.5)
      .fromTo(next, { clipPath: 'inset(50% 0% 50% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: d * 0.5, ease: 'expo.out' }, at + d * 0.5)
  },
}

function open(project: Project, frame: HTMLElement) {
  const rect = frame.getBoundingClientRect()
  if (project.external) {
    expandFrom(rect, '#000', 'Entering City Archive / 001').then(() => {
      window.location.href = project.external!
    })
    return
  }
  expandFrom(rect, project.palette.bg).then(() => navigate(`/work/${project.slug}`))
}

/**
 * Selected Work: a pinned stage where each project fills the screen and hands
 * over to the next with its own transition. With reduced motion the projects
 * simply stack.
 */
export function ProjectGallery() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const reduced = useReducedMotion()
  const n = PROJECTS.length

  useScrollScene(root, ({ motion }) => {
    gsap.from('.work__intro .mask__inner', {
      yPercent: 110,
      duration: 1.4,
      stagger: 0.08,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.work__intro', start: 'top 75%' },
    })
    if (!motion) return

    const slides = gsap.utils.toArray<HTMLElement>('.slide')
    slides.forEach((s, i) => i > 0 && gsap.set(s, { autoAlpha: 0 }))
    const ticks = gsap.utils.toArray<HTMLElement>('.work__tick')

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.work__stage',
        start: 'top top',
        end: `+=${(n - 1) * 115}%`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const t = self.progress * (n - 1)
          const idx = Math.min(n - 1, Math.round(t - 0.15))
          if (idx !== activeRef.current) {
            activeRef.current = idx
            setActive(idx)
          }
          ticks.forEach((tick, i) => tick.style.setProperty('--fill', String(Math.max(0, Math.min(1, t - i + 1)))))
        },
      },
    })
    for (let i = 0; i < n - 1; i++) {
      EXITS[PROJECTS[i].exit](tl, slides[i], slides[i + 1], i + 0.32, 0.68)
      // Once covered, the old slide stops painting.
      tl.set(slides[i], { autoAlpha: 0 }, i + 1)
    }
    // New titles arrive letter by letter once their slide is revealed.
    for (let i = 1; i < n; i++) tl.fromTo(q(slides[i], '.slide__title .char'), { yPercent: 105 }, { yPercent: 0, stagger: 0.01, duration: 0.22, ease: 'power3.out' }, i - 0.32)
    tl.set({}, {}, n - 1)
  })

  return (
    <section className={`work ${reduced ? 'work--static' : ''}`} id="work" ref={root} data-theme="dark" aria-label="Selected work">
      <header className="work__intro">
        <Mask as="h2" className="work__heading" lines={['Selected', 'work']} />
        <div className="work__intro-meta">
          <Mask className="meta" lines={[`(${pad(n)}) Projects`, <span className="dim">2024 — 2026</span>]} />
          <Mask className="work__intro-copy" lines={['Real products, a live experiment,', 'and self-initiated studies', 'in range and restraint.']} />
        </div>
      </header>

      <div className="work__stage">
        {PROJECTS.map((p, i) => {
          const near = reduced || Math.abs(i - active) <= 1
          return (
            <article
              key={p.slug}
              className="slide"
              data-tone={p.tone}
              style={{ ['--p-bg' as string]: p.palette.bg, ['--p-fg' as string]: p.palette.fg, ['--p-accent' as string]: p.palette.accent }}
              aria-label={`${p.title} — ${p.category}`}
            >
              <div className="slide__meta meta">
                <span>
                  {pad(i + 1)} / {pad(n)}
                </span>
                <span>{p.year}</span>
                <span className="slide__tags">{p.tags.join(' / ')}</span>
                <span className="dim">{p.status}</span>
              </div>

              <a
                className="slide__frame"
                href={p.external ?? `/work/${p.slug}`}
                data-cursor={p.external ? 'Show\nproject' : 'View\nproject'}
                aria-label={`${p.external ? 'Open' : 'View'} ${p.title}`}
                onClick={(e) => {
                  e.preventDefault()
                  open(p, e.currentTarget)
                }}
              >
                <div className="slide__media">{near && <Scene project={p} playing={!reduced && i === active} variant="slide" />}</div>
                <span className="slide__corners" aria-hidden="true" />
                <span className="slide__hover meta" aria-hidden="true">
                  {p.external ? 'Show project' : 'View project'} <span>→</span>
                </span>
              </a>

              <div className="slide__foot">
                <h3 className="slide__title" style={{ ['--len' as string]: p.title.length }}>
                  <SplitChars text={p.title.toUpperCase()} />
                </h3>
                <div className="slide__sub">
                  <p className="meta">{p.subtitle}</p>
                  <p className="meta dim">{p.category}</p>
                  {p.live && (
                    <a className="meta slide__case" href={p.live} target="_blank" rel="noreferrer">
                      {p.live.replace('https://', '')} ↗
                    </a>
                  )}
                  {p.external && (
                    <a
                      className="meta slide__case"
                      href={`/work/${p.slug}`}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(`/work/${p.slug}`)
                      }}
                    >
                      Case study →
                    </a>
                  )}
                </div>
              </div>
              <div className="slide__blackout" aria-hidden="true" />
            </article>
          )
        })}

        <ol className="work__ticks" aria-hidden="true">
          {PROJECTS.map((p, i) => (
            <li key={p.slug} className={`work__tick meta ${i === active ? 'is-active' : ''}`}>
              <span>{pad(i + 1)}</span>
              <i />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
