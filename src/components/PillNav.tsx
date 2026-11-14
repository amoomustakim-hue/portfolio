import { useEffect, useState } from 'react'
import { IDENTITY } from '../config/site'
import { onLink, usePath } from '../lib/router'
import { GitHubIcon, HomeIcon, MailIcon, WorkIcon } from './icons'

/**
 * The floating pill menu from the reference: icon buttons and a black "My Blog" pill, centred at the top. On the home page it
 * appears once the hero has scrolled away (the hero keeps its own top bar); on the blog it is always there.
 */
export function PillNav() {
  const home = usePath() === '/'
  const [show, setShow] = useState(!home)
  useEffect(() => {
    if (!home) return setShow(true)
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [home])
  return (
    <nav className={`pill ${show ? 'on' : ''}`} aria-label="Quick links" aria-hidden={!show}>
      <a href="/" onClick={onLink} aria-label="Home" tabIndex={show ? 0 : -1}>
        <HomeIcon />
      </a>
      <span className="pill-sep" />
      <a href="/#development" onClick={onLink} aria-label="Work" tabIndex={show ? 0 : -1}>
        <WorkIcon />
      </a>
      <a href="https://github.com/amoomustakim-hue" target="_blank" rel="noopener" aria-label="GitHub" tabIndex={show ? 0 : -1}>
        <GitHubIcon />
      </a>
      <a href={`mailto:${IDENTITY.email}`} aria-label="Email" tabIndex={show ? 0 : -1}>
        <MailIcon />
      </a>
      <span className="pill-sep" />
      <a className="pill-blog" href="/blog" onClick={onLink} tabIndex={show ? 0 : -1}>
        My Blog
      </a>
    </nav>
  )
}
