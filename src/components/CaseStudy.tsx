import { useEffect, useRef, useState } from 'react'
import { nextProject, projectBySlug, type Project } from '../projects'
import type { Block } from '../projects/types'
import { useInView } from '../hooks/useInView'
import { useScrollScene } from '../hooks/useScrollScene'
import { gsap } from '../utils/gsap'
import { navigate } from '../utils/router'
import { expandFrom, release } from '../utils/transition'
import { ChatThread } from './scenes/cravvingss/ChatThread'
import { STEPS } from './scenes/cravvingss/chat'
import { Scene } from './scenes/Scene'
import { Mask, SplitChars } from './ui/Mask'

/** A project's own page: its world full-screen, then the story in blocks. */
export function CaseStudy({ slug }: { slug: string }) {
  const project = projectBySlug(slug)
  if (!project) return <NotFound />
  return <Study key={project.slug} project={project} />
}

function Study({ project: p }: { project: Project }) {
  const root = useRef<HTMLElement>(null)
  const hero = useRef<HTMLElement>(null)
  const heroInView = useInView(hero)
  const next = nextProject(p.slug)

  useEffect(() => {
    document.title = `${p.title} — Mustakheem`
    // Let the page paint under the wipe before revealing it.
    const id = requestAnimationFrame(() => requestAnimationFrame(() => release()))
    return () => {
      cancelAnimationFrame(id)
      document.title = 'Mustakheem — Creative Developer & Designer'
    }
  }, [p])

  useScrollScene(root, ({ motion }) => {
    if (!motion) return
    gsap.from('.case__title .char', { yPercent: 105, duration: 1.6, stagger: 0.04, ease: 'expo.out', delay: 0.35 })
    gsap.from('.case__hero-meta .mask__inner', { yPercent: 110, duration: 1.2, stagger: 0.06, ease: 'expo.out', delay: 0.6 })
    gsap.to('.case__scene', { yPercent: 18, scale: 1.06, ease: 'none', scrollTrigger: { trigger: '.case__hero', start: 'top top', end: 'bottom top', scrub: true } })
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el.querySelectorAll('.mask__inner'), { yPercent: 110, duration: 1.3, stagger: 0.06, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 82%' } })
    })
    gsap.utils.toArray<HTMLElement>('.cblock-scene__frame').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(12% 8% 12% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 30%', scrub: true } })
    })
    gsap.utils.toArray<HTMLElement>('.cblock-specs__row').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 16, duration: 1, scrollTrigger: { trigger: el, start: 'top 92%' } })
    })
  }, [p.slug])

  return (
    <article
      className="case"
      ref={root}
      data-tone={p.tone}
      style={{ ['--p-bg' as string]: p.palette.bg, ['--p-fg' as string]: p.palette.fg, ['--p-accent' as string]: p.palette.accent }}
    >
      <section className="case__hero" ref={hero} data-theme={p.tone === 'light' ? 'light' : 'dark'}>
        <div className="case__scene">
          <Scene project={p} playing={heroInView} variant="hero" />
        </div>
        <div className="case__hero-foot">
          <h1 className="case__title" style={{ ['--len' as string]: p.title.length }}>
            <SplitChars text={p.title.toUpperCase()} />
          </h1>
          <div className="case__hero-meta">
            <Mask className="meta" lines={[p.subtitle, <span className="dim">{p.category}</span>]} />
            <Mask className="meta" lines={[p.year, <span className="dim">{p.status}</span>]} />
          </div>
        </div>
      </section>

      <section className="case__intro" data-theme={p.tone === 'light' ? 'light' : 'dark'}>
        <p className="meta case__back">
          <a
            href="/#work"
            onClick={(e) => {
              e.preventDefault()
              navigate('/#work')
            }}
          >
            ← Index
          </a>
        </p>
        <Mask as="p" className="case__statement" lines={[p.statement]} lineClassName="case__statement-line" />
        <dl className="case__facts">
          <div>
            <dt className="meta dim">Role</dt>
            <dd>{p.role.join(', ')}</dd>
          </div>
          <div>
            <dt className="meta dim">Discipline</dt>
            <dd>{p.category}</dd>
          </div>
          <div>
            <dt className="meta dim">Stack</dt>
            <dd>{p.tags.join(' / ')}</dd>
          </div>
          <div>
            <dt className="meta dim">Year / Status</dt>
            <dd>
              {p.year} — {p.status}
            </dd>
          </div>
        </dl>
      </section>

      {p.blocks.map((b, i) => (
        <BlockView key={i} block={b} project={p} />
      ))}

      <NextProject next={next} />
    </article>
  )
}

function BlockView({ block: b, project: p }: { block: Block; project: Project }) {
  const theme = p.tone === 'light' ? 'light' : 'dark'
  switch (b.type) {
    case 'text':
      return (
        <section className="cblock cblock-text" data-theme={theme} data-reveal>
          <p className="meta dim cblock-text__label">{b.label}</p>
          <div>
            <Mask as="h2" className="cblock-text__heading" lines={[b.heading]} />
            <p className="cblock-text__body">{b.body}</p>
          </div>
        </section>
      )
    case 'scene':
      return <SceneBlock project={p} caption={b.caption} />
    case 'pull':
      return (
        <section className="cblock cblock-pull" data-theme={theme} data-reveal>
          <Mask as="blockquote" lines={[b.text]} />
        </section>
      )
    case 'specs':
      return (
        <section className="cblock cblock-specs" data-theme={theme}>
          <p className="meta dim">{b.label}</p>
          <dl>
            {b.items.map(([k, v]) => (
              <div className="cblock-specs__row" key={k}>
                <dt className="meta">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      )
    case 'flow':
      return <FlowBlock />
    case 'site':
      return (
        <section className="cblock cblock-site" data-theme={theme}>
          <a href={b.href} target="_blank" rel="noreferrer" className="browser" data-cursor={'Visit\nsite'}>
            <span className="browser__bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span className="browser__url">{b.url}</span>
            </span>
            <img src={b.image} alt={b.caption} loading="lazy" decoding="async" />
          </a>
          <p className="meta dim cblock-site__caption">
            {b.caption} <a href={b.href} target="_blank" rel="noreferrer">{b.url} ↗</a>
          </p>
        </section>
      )
    case 'launch':
      return (
        <section className="cblock cblock-launch" data-theme={theme}>
          <a
            href={b.href}
            data-cursor="Enter"
            onClick={(e) => {
              if (!p.external) return
              e.preventDefault()
              expandFrom(e.currentTarget.getBoundingClientRect(), '#000', b.label).then(() => {
                window.location.href = b.href
              })
            }}
            target={p.external ? undefined : '_blank'}
            rel={p.external ? undefined : 'noreferrer'}
          >
            <span className="meta dim">{p.external ? 'Live experience' : 'Live site'} ↗</span>
            <span className="cblock-launch__label">{b.label}</span>
          </a>
        </section>
      )
  }
}

function SceneBlock({ project, caption }: { project: Project; caption: string }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, '0px 0px -10% 0px')
  return (
    <section className="cblock cblock-scene" ref={ref} data-theme={project.tone === 'light' ? 'light' : 'dark'}>
      <figure>
        <div className="cblock-scene__frame" data-cursor="Explore">
          <Scene project={project} playing={inView} variant="detail" />
        </div>
        <figcaption className="meta dim">{caption}</figcaption>
      </figure>
    </section>
  )
}

/** Cravvingss: the order flow, step by step, on a real (rendered) phone. */
function FlowBlock() {
  const [step, setStep] = useState(0)
  return (
    <section className="cblock cblock-flow" data-theme="dark">
      <div className="cblock-flow__steps">
        <p className="meta dim">The flow</p>
        <ol>
          {STEPS.map((s, i) => (
            <li key={s.index}>
              <button className={i === step ? 'is-active' : ''} onClick={() => setStep(i)} onPointerEnter={() => setStep(i)} aria-pressed={i === step}>
                <span className="meta">{s.index}</span>
                <span className="cblock-flow__title">{s.title}</span>
                <span className="cblock-flow__body">{s.body}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="cblock-flow__device">
        <div className="phone phone--static">
          <div className="phone__screen">
            <ChatThread step={STEPS[step].upTo} />
          </div>
        </div>
      </div>
    </section>
  )
}

function NextProject({ next }: { next: Project }) {
  return (
    <section className="case__next" data-theme="dark">
      <a
        href={`/work/${next.slug}`}
        data-cursor={'Next\nproject'}
        onClick={(e) => {
          e.preventDefault()
          expandFrom(e.currentTarget.getBoundingClientRect(), next.palette.bg).then(() => navigate(`/work/${next.slug}`))
        }}
      >
        <span className="meta dim">Next project</span>
        <span className="case__next-title">{next.title}</span>
        <span className="meta">{next.category} →</span>
      </a>
    </section>
  )
}

function NotFound() {
  useEffect(() => release(), [])
  return (
    <section className="case case--missing" data-theme="dark">
      <h1 className="case__statement">That project isn’t in the archive.</h1>
      <a
        className="meta"
        href="/"
        onClick={(e) => {
          e.preventDefault()
          navigate('/')
        }}
      >
        ← Back to the index
      </a>
    </section>
  )
}
