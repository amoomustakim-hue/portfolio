import { IDENTITY } from '../config/site'
import { onLink } from '../lib/router'

/** The reference's top bar: a small mark, three quiet links, and Book a call on the right. */
export function Nav() {
  return (
    <header className="nav">
      <a href="/" onClick={onLink} className="nav-mark" aria-label={`${IDENTITY.searchName}, home`}>
        M<span>.</span>
      </a>
      <nav aria-label="Main" className="nav-links">
        <a href="/#about" onClick={onLink}>About me</a>
        <a href="/#development" onClick={onLink}>Development</a>
        <a href="/#design" onClick={onLink}>Design</a>
        <a href="/blog" onClick={onLink}>Blog</a>
      </nav>
      <a className="nav-cta" href={`mailto:${IDENTITY.email}?subject=Let%27s%20talk`}>
        Book a call <span aria-hidden>↗</span>
      </a>
    </header>
  )
}
