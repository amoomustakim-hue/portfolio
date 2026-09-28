import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IDENTITY, LIVE_SOCIALS } from '../config/site'
import { useScrollLock, useScrollTo } from '../hooks/useLenis'
import { useReducedMotion } from '../hooks/useMediaQuery'
import { navigate } from '../utils/router'
import { gsap, ScrollTrigger } from '../utils/gsap'
import { scramble } from '../utils/scramble'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

/**
 * Fixed, minimal. Reads the `data-theme` of whatever section sits under it
 * and switches ink accordingly; on phones the links fold into a menu.
 */
export function Navigation({ ready, path }: { ready: boolean; path: string }) {
  const bar = useRef<HTMLElement>(null)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [open, setOpen] = useState(false)
  const scrollTo = useScrollTo()

  useLayoutEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      gsap.from('.nav__item', { yPercent: -120, opacity: 0, duration: 1.3, stagger: 0.07, ease: 'expo.out', delay: 0.4 })
    }, bar)
    return () => ctx.revert()
  }, [ready])

  // Theme follows the section under the bar. Rebuilt per route.
  useEffect(() => {
    if (!ready) return
    let triggers: ScrollTrigger[] = []
    const id = requestAnimationFrame(() => {
      triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-theme]')).map((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: 'top 36px',
          end: 'bottom 36px',
          refreshPriority: -10,
          onToggle: (self) => self.isActive && setTheme(el.dataset.theme === 'light' ? 'light' : 'dark'),
        }),
      )
      ScrollTrigger.refresh()
    })
    return () => {
      cancelAnimationFrame(id)
      triggers.forEach((t) => t.kill())
    }
  }, [ready, path])

  const go = useCallback(
    (id: string) => {
      setOpen(false)
      if (path !== '/') {
        navigate(`/#${id}`)
        return
      }
      window.setTimeout(() => scrollTo(id), open ? 300 : 0)
    },
    [path, scrollTo, open],
  )

  return (
    <>
      <header className={`nav nav--${theme}`} ref={bar}>
        <a
          className="nav__item nav__brand"
          href="/"
          onClick={(e) => {
            e.preventDefault()
            if (path === '/') scrollTo(0)
            else navigate('/')
          }}
          onPointerEnter={(e) => scramble(e.currentTarget.querySelector('span')!, IDENTITY.name.toUpperCase(), 450)}
        >
          <span>{IDENTITY.name.toUpperCase()}</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.id}
              className="nav__item nav__link meta"
              href={`/#${l.id}`}
              onClick={(e) => {
                e.preventDefault()
                go(l.id)
              }}
              onPointerEnter={(e) => scramble(e.currentTarget, l.label.toUpperCase(), 380)}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button className="nav__item nav__menu meta" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu">
          Menu
        </button>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} onGo={go} />
    </>
  )
}

function MobileMenu({ open, onClose, onGo }: { open: boolean; onClose: () => void; onGo: (id: string) => void }) {
  const root = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const reduced = useReducedMotion()
  useScrollLock(open)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(root.current, { visibility: 'visible' })
        .fromTo(root.current, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: reduced ? 0.01 : 0.9, ease: 'power4.inOut' })
        .fromTo('.mmenu__link .mask__inner', { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out' }, reduced ? 0 : 0.35)
    }, root)
    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    const t = tl.current
    if (!t) return
    if (open) {
      t.timeScale(1).play()
      root.current?.querySelector<HTMLButtonElement>('.mmenu__close')?.focus()
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
    if (t.progress() > 0) t.timeScale(1.5).reverse()
  }, [open, onClose])

  return (
    <div className="mmenu" id="mobile-menu" ref={root} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open} inert={!open}>
      <div className="mmenu__top">
        <span className="meta">{IDENTITY.name}</span>
        <button className="meta mmenu__close" onClick={onClose}>
          Close
        </button>
      </div>
      <nav className="mmenu__nav" aria-label="Mobile">
        {[...LINKS, { id: 'experiments', label: 'Experiments' }].map((l, i) => (
          <button key={l.id} className="mmenu__link" onClick={() => onGo(l.id)}>
            <span className="mask">
              <span className="mask__inner">
                <small className="meta">0{i + 1}</small> {l.label}
              </span>
            </span>
          </button>
        ))}
      </nav>
      <div className="mmenu__foot meta">
        <a href={`mailto:${IDENTITY.email}`}>{IDENTITY.email}</a>
        {LIVE_SOCIALS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </div>
    </div>
  )
}
