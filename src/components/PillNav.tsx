import { IDENTITY } from '../config/site'
import { onLink } from '../lib/router'
import { GitHubIcon, HomeIcon, MailIcon, UserIcon, WorkIcon } from './icons'

/** The site's menu, as in the reference: a floating pill centred at the top of every page, icon buttons and a black "My Blog". */
export function PillNav() {
  return (
    <nav className="pill" aria-label="Main">
      <a href="/" onClick={onLink} aria-label="Home" title="Home">
        <HomeIcon />
      </a>
      <span className="pill-sep" />
      <a href="/#about" onClick={onLink} aria-label="About me" title="About me">
        <UserIcon />
      </a>
      <a href="/#development" onClick={onLink} aria-label="My work" title="My work">
        <WorkIcon />
      </a>
      <a href="https://github.com/amoomustakim-hue" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub">
        <GitHubIcon />
      </a>
      <a href={`mailto:${IDENTITY.email}`} aria-label="Email me" title="Email me">
        <MailIcon />
      </a>
      <span className="pill-sep" />
      <a className="pill-blog" href="/blog" onClick={onLink}>
        My Blog
      </a>
    </nav>
  )
}
