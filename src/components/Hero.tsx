import { HACKATHONS, IDENTITY } from '../config/site'
import { DESIGN, DEVELOPMENT } from '../content/work'

/**
 * After the reference: white, a huge thin "Hello", two small numbers above it, a vertical label down the left edge, and the
 * portrait cut out on the right. Both numbers are counted from real things: the live sites listed below, and the hackathons won.
 */
export function Hero() {
  const live = DEVELOPMENT.length + DESIGN.length
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-rail" aria-hidden>
        <span className="hero-rail-text">{IDENTITY.role}</span>
        <span className="hero-rail-line" />
        <span className="hero-rail-text">{new Date().getFullYear()}</span>
      </div>

      <div className="hero-copy">
        <dl className="hero-stats">
          <div>
            <dt>
              <sup>+</sup>
              {String(live).padStart(2, '0')}
            </dt>
            <dd>Live projects</dd>
          </div>
          <div>
            <dt>
              <sup>+</sup>{HACKATHONS.list.length}
            </dt>
            <dd>Hackathon podiums</dd>
          </div>
        </dl>

        <h1 id="hero-title" className="hero-hello">
          Hello
        </h1>
        <p className="hero-line">
          <span className="hero-dash" aria-hidden />
          It's {IDENTITY.name}, a software engineer in Lagos building products end to end
        </p>

        <a className="hero-scroll" href="#development">
          Scroll down <span aria-hidden>↓</span>
        </a>
      </div>

      <img className="hero-portrait" src="/img/portrait.webp" alt={`${IDENTITY.searchName}, portrait`} width={820} height={710} fetchPriority="high" />
    </section>
  )
}
