import type { Work } from '../content/work'
import { Chevron } from './icons'

/**
 * A group of work in the reference's layout: a two-column grid of rounded cards, the real screenshot framed inside, then the
 * title, two lines about it and a "View project" pill that opens the live site.
 */
function Card({ w }: { w: Work }) {
  return (
    <article className="wcard">
      <a className="wcard-shot" href={w.href} target="_blank" rel="noopener" tabIndex={-1} aria-hidden>
        <img src={w.image} alt="" loading="lazy" />
      </a>
      <div className="wcard-body">
        <div className="wcard-head">
          <h3>{w.title}</h3>
          <span className="wcard-status">{w.status}</span>
        </div>
        <p className="wcard-line">{w.line}</p>
        {w.parts ? (
          <ul className="wcard-parts">
            {w.parts.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        ) : null}
        <a className="wcard-btn" href={w.href} target="_blank" rel="noopener" aria-label={`View ${w.title}`}>
          View project <Chevron />
        </a>
      </div>
    </article>
  )
}

export function WorkGrid({ id, title, intro, items }: { id: string; title: string; intro: string; items: Work[] }) {
  return (
    <section className="work" id={id} aria-labelledby={`${id}-title`}>
      <header className="work-head">
        <p className="eyebrow">{intro}</p>
        <h2 id={`${id}-title`}>{title}</h2>
      </header>
      <div className="wgrid">
        {items.map((w) => (
          <Card key={w.title} w={w} />
        ))}
      </div>
    </section>
  )
}
