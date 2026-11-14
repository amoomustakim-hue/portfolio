import { EXPERIENCE, HACKATHONS } from '../config/site'

function Org({ name, href }: { name: string; href?: string }) {
  const inner = (
    <>
      <i aria-hidden />
      {name}
    </>
  )
  return href ? (
    <a className="org" href={href} target="_blank" rel="noopener">
      {inner}
    </a>
  ) : (
    <span className="org">{inner}</span>
  )
}

/** Work experience and hackathons as the reference's rows: when on the left, the role and a blue company pill on the right. */
export function Experience() {
  return (
    <section className="exp" id="experience" aria-labelledby="exp-title">
      <h2 id="exp-title" className="exp-title">
        Work experience
      </h2>
      <ul className="exp-rows">
        {EXPERIENCE.map((e) => (
          <li key={e.org}>
            <span className="exp-when">{e.when ?? ''}</span>
            <span className="exp-what">
              {e.role} at <Org name={e.org} href={e.href || undefined} />
            </span>
          </li>
        ))}
      </ul>

      <h2 className="exp-title exp-title-2">Hackathons</h2>
      <ul className="exp-rows">
        {HACKATHONS.list.map((h) => (
          <li key={h.event}>
            <span className="exp-when">{h.place}</span>
            <span className="exp-what">
              {h.event} at <Org name={h.organiser} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
