import { EXPERIENCE, HACKATHONS, IDENTITY, SKILLS } from '../config/site'

/** About me: who I am in two short paragraphs, with the plain facts beside it. */
export function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <p className="eyebrow">About me</p>
      <div className="about-grid">
        <div>
          <h2 id="about-title" className="about-lead">
            I build products end to end, and design websites that feel like places.
          </h2>
          <p className="about-text">
            I'm {IDENTITY.fullName}, also known as {IDENTITY.alias}, a {IDENTITY.role.toLowerCase()} and designer in {IDENTITY.location}. I work on
            the whole thing: the server, the WhatsApp bots, the mobile app and the interface people actually touch.
          </p>
          <p className="about-text">
            I run {EXPERIENCE[0].org} as {EXPERIENCE[0].role}, and I lead software engineering at {EXPERIENCE[1].org} and {EXPERIENCE[2].org}. I've
            placed in {HACKATHONS.list.length} hackathons along the way, two of them in first place.
          </p>
        </div>
        <dl className="about-facts">
          <div>
            <dt>Based in</dt>
            <dd>{IDENTITY.location}</dd>
          </div>
          <div>
            <dt>I build with</dt>
            <dd>{SKILLS.Development.slice(0, 7).join(', ')}</dd>
          </div>
          <div>
            <dt>I design</dt>
            <dd>{SKILLS.Design.join(', ')}</dd>
          </div>
          <div>
            <dt>Say hello</dt>
            <dd>
              <a href={`mailto:${IDENTITY.email}`}>{IDENTITY.email}</a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
