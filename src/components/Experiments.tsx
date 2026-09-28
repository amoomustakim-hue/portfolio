import { lazy, Suspense, useRef, useState } from 'react'
import { EXPERIMENTS, type ExperimentId } from '../config/site'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useMediaQuery'
import { useScrollScene } from '../hooks/useScrollScene'
import { gsap } from '../utils/gsap'
import { Field } from './experiments/Field'
import { Weight } from './experiments/Weight'
import { Mask } from './ui/Mask'

const ThreeExperiment = lazy(() => import('./experiments/ThreeExperiments'))

/**
 * The lab: unfinished things, one at a time on a single stage. Choosing one
 * swaps the stage; only the chosen experiment runs, and only while visible.
 */
export function Experiments() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState<ExperimentId>('field')
  const inView = useInView(stage, '10% 0px')
  const reduced = useReducedMotion()
  const playing = inView && !reduced
  const meta = EXPERIMENTS.find((e) => e.id === current)!

  useScrollScene(root, ({ motion }) => {
    gsap.from('.exps__head .mask__inner', { yPercent: 110, duration: 1.3, stagger: 0.08, ease: 'power4.out', scrollTrigger: { trigger: '.exps__head', start: 'top 80%' } })
    if (!motion) return
    gsap.fromTo('.exps__stage', { clipPath: 'inset(10% 10% 10% 10%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: '.exps__stage', start: 'top 90%', end: 'top 35%', scrub: true } })
    gsap.from('.exps__list li', { opacity: 0, x: 20, duration: 1, stagger: 0.07, scrollTrigger: { trigger: '.exps__list', start: 'top 85%' } })
  })

  const pick = (id: ExperimentId) => {
    if (id === current) return
    if (stage.current && !reduced) gsap.fromTo(stage.current.querySelector('.exps__screen'), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' })
    setCurrent(id)
  }

  return (
    <section className="exps" id="experiments" ref={root} data-theme="dark" aria-label="Experiments">
      <header className="exps__head">
        <Mask as="h2" className="exps__title" lines={['Experiments']} />
        <Mask className="meta dim exps__sub" lines={['Unfinished things,', 'kept on purpose.']} />
      </header>

      <div className="exps__body">
        <div className="exps__stage" ref={stage} data-cursor={current === 'form' ? 'Drag' : 'Play'}>
          <div className="exps__screen" key={current}>
            {current === 'field' && <Field playing={playing} />}
            {current === 'weight' && <Weight playing={playing} />}
            {(current === 'form' || current === 'displace' || current === 'swarm') && (
              <Suspense fallback={null}>
                <ThreeExperiment id={current} playing={playing} />
              </Suspense>
            )}
          </div>
          <p className="exps__caption meta">
            <span>{meta.index}</span> <span className="dim">{meta.note}</span>
          </p>
        </div>

        <ol className="exps__list">
          {EXPERIMENTS.map((e) => (
            <li key={e.id}>
              <button
                className={e.id === current ? 'is-active' : ''}
                aria-pressed={e.id === current}
                onClick={() => pick(e.id)}
                onPointerEnter={() => window.matchMedia('(hover: hover)').matches && pick(e.id)}
              >
                <span className="meta dim">{e.index}</span>
                <span className="exps__name">{e.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
