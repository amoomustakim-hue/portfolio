import { useEffect } from 'react'
import { EXPERIENCE, HACKATHONS, IDENTITY, SKILLS } from '../config/site'
import { DESIGN, DEVELOPMENT } from '../content/work'
import { GitHubStats } from '../components/GitHubStats'
import { onLink } from '../lib/router'
import { setMeta } from '../lib/seo'

/** The longer About me: who I am, what I'm working on now, how I work, wins and tools. Only things that are true. */
export function AboutPage() {
  useEffect(() => {
    setMeta(
      `About ${IDENTITY.searchName}`,
      `${IDENTITY.fullName} (${IDENTITY.alias}) is a software engineer in Lagos: CEO of KIMTECH Technologies and Lead Software Engineer at SheDrives NG and Cravvingss.`,
      '/about',
    )
  }, [])
  const roles: Record<string, string> = {
    'KIMTECH Technologies Ltd': 'My company. It is the home for the products I build and run, including Cravvingss.',
    'SheDrives NG': 'Rides with women drivers in Nigeria. I lead the engineering across the website, the WhatsApp booking bot and the rider and driver app.',
    Cravvingss: 'The whole food business in one chat: kitchens take orders, payments and riders on WhatsApp. I lead the engineering, from the server to the landing page.',
  }
  return (
    <article className="page aboutp">
      <header className="aboutp-head">
        <div>
          <p className="eyebrow">About me</p>
          <h1 className="aboutp-title">
            I'm {IDENTITY.name}. I build products end to end, and design websites that feel like places.
          </h1>
        </div>
        <img className="aboutp-portrait" src="/img/portrait.webp" alt={`${IDENTITY.searchName}, portrait`} width={820} height={710} />
      </header>

      <div className="aboutp-body">
        <section className="aboutp-sec">
          <h2>Who I am</h2>
          <div className="aboutp-text">
            <p>
              My full name is {IDENTITY.fullName}. Online I also go by {IDENTITY.alias}. I live and work in {IDENTITY.location}.
            </p>
            <p>
              I'm a software engineer, and I design too. I like owning the whole thing: the server and the data, the WhatsApp bots people
              actually talk to, the mobile app, and the interface on top. Most of what I build lives where people already are, which in Nigeria
              usually means WhatsApp.
            </p>
            <p>
              On the design side I make websites that behave like places rather than pages: films you drive with the scroll wheel, covers that
              crumble, cities that go from day into night.
            </p>
          </div>
        </section>

        <section className="aboutp-sec">
          <h2>What I do now</h2>
          <ul className="aboutp-roles">
            {EXPERIENCE.map((e) => (
              <li key={e.org}>
                <p className="aboutp-role">
                  {e.role} at{' '}
                  {e.href ? (
                    <a className="org" href={e.href} target="_blank" rel="noopener">
                      <i aria-hidden />
                      {e.org}
                    </a>
                  ) : (
                    <span className="org">
                      <i aria-hidden />
                      {e.org}
                    </span>
                  )}
                </p>
                <p className="aboutp-note">{roles[e.org]}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="aboutp-sec">
          <h2>How I work</h2>
          <ol className="aboutp-how">
            <li>
              <strong>Ship the real thing.</strong> Everything on this site is live or a working concept you can open. No mock-ups.
            </li>
            <li>
              <strong>Meet people where they are.</strong> A chat beats an app download, and a clear message beats a form.
            </li>
            <li>
              <strong>Study the reference properly.</strong> When a design comes from somewhere, I read it frame by frame before I build.
            </li>
            <li>
              <strong>Write it down.</strong> I post what I built every Monday, Wednesday and Friday on{' '}
              <a href="/blog" onClick={onLink}>
                my blog
              </a>
              .
            </li>
          </ol>
        </section>

        <section className="aboutp-sec">
          <h2>Hackathons</h2>
          <ul className="exp-rows aboutp-rows">
            {HACKATHONS.list.map((h) => (
              <li key={h.name}>
                <span className="exp-when">{h.place}</span>
                <span className="exp-what">
                  <span className="org">
                    <i aria-hidden />
                    {h.name}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="aboutp-sec">
          <h2>Tools</h2>
          <div>
            <p className="aboutp-k">Development</p>
            <div className="aboutp-chips">
              {SKILLS.Development.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <p className="aboutp-k">Design</p>
            <div className="aboutp-chips">
              {SKILLS.Design.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="aboutp-sec">
          <h2>Selected work</h2>
          <ul className="aboutp-work">
            {[...DEVELOPMENT, ...DESIGN].map((w) => (
              <li key={w.title}>
                <a href={w.href} target="_blank" rel="noopener">
                  <span>{w.title}</span>
                  <span className="aboutp-note">{w.line}</span>
                  <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <GitHubStats />
    </article>
  )
}
