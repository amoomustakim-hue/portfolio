import { IDENTITY } from '../config/site'
import { useScrollTo } from '../hooks/useLenis'

/** Quiet sign-off with the name set as a full-width wordmark. */
export function Footer() {
  const scrollTo = useScrollTo()
  return (
    <footer className="footer" data-theme="dark">
      <div className="footer__row meta">
        <span>{IDENTITY.fullName}</span>
        <span>{IDENTITY.location}</span>
        <span>Creative developer / Designer</span>
        <span>2026</span>
      </div>
      <p className="footer__mark" aria-hidden="true">
        {IDENTITY.name.toUpperCase()}
      </p>
      <div className="footer__row meta">
        <span className="dim">Built with curiosity.</span>
        <button className="footer__top meta" onClick={() => scrollTo(0)}>
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
