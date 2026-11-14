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
    <section className="exp" id="about" aria-labelledby="exp-title">
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
        <li>
          <span className="exp-when">{HACKATHONS.wins}× winner</span>
          <span className="exp-what">Hackathons won in all</span>
        </li>
        {HACKATHONS.named.map((h) => (
          <li key={h}>
            <span className="exp-when">Winner</span>
            <span className="exp-what">
              <Org name={h} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
