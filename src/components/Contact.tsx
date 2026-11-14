import { IDENTITY, LIVE_SOCIALS } from '../config/site'

export function Contact() {
  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="contact-title">
        Let's build something.
      </h2>
      <a className="contact-email" href={`mailto:${IDENTITY.email}`}>
        {IDENTITY.email} <span aria-hidden>↗</span>
      </a>
      <div className="contact-foot">
        <span>
          © {new Date().getFullYear()} {IDENTITY.searchName}, {IDENTITY.location}
        </span>
        <span className="contact-socials">
          {LIVE_SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener">
              {s.label}
            </a>
          ))}
        </span>
      </div>
    </footer>
  )
}
