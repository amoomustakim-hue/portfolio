import { useRef, useState } from 'react'
import { IDENTITY, LIVE_SOCIALS } from '../config/site'
import { useLocalTime } from '../hooks/useLocalTime'
import { useScrollScene } from '../hooks/useScrollScene'
import { gsap } from '../utils/gsap'
import { blob } from '../utils/blobStage'
import { Mask, SplitChars } from './ui/Mask'

/** Nearly full-screen, loud type; the chrome object returns in front of it. */
export function Contact() {
  const root = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)
  const time = useLocalTime()

  useScrollScene(root, ({ motion, mobile }) => {
    const spot = { x: mobile ? 0.22 : 0.3, y: mobile ? -0.26 : -0.13, scale: mobile ? 0.4 : 0.82 }
    gsap.from('.contact__line .char', {
      yPercent: 105,
      duration: 1.5,
      stagger: 0.025,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.contact__title', start: 'top 75%' },
    })
    gsap.from('.contact__lower .mask__inner', { yPercent: 110, duration: 1.2, stagger: 0.06, ease: 'power4.out', scrollTrigger: { trigger: '.contact__lower', start: 'top 90%' } })
    if (!motion) return
    // The object comes back: fades in as Contact arrives, rests beside the headline.
    gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        start: 'top 80%',
        end: 'top top',
        scrub: true,
        onLeaveBack: () => gsap.to(blob, { opacity: 0, duration: 0.3, overwrite: 'auto' }),
      },
      defaults: { ease: 'none' },
    }).fromTo(
      blob,
      { opacity: 0, x: spot.x, y: spot.y + 0.45, scale: spot.scale * 0.6, amp: 2 },
      { opacity: 1, x: spot.x, y: spot.y, scale: spot.scale, amp: 1.2, immediateRender: false },
    )
    // …and leaves with the section instead of lingering behind the footer.
    gsap.fromTo(
      blob,
      { y: spot.y },
      {
        y: spot.y - 1.1,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      },
    )
  })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(IDENTITY.email)
    } catch {
      window.location.href = `mailto:${IDENTITY.email}`
      return
    }
    setCopied(true)
    window.dispatchEvent(new CustomEvent('cursor:label', { detail: 'Copied' }))
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section className="contact" id="contact" ref={root} data-theme="dark" aria-label="Contact">
      <p className="meta contact__label">(05) Contact</p>
      <h2 className="contact__title" aria-label="Let's build something.">
        {['Let’s', 'build', 'something.'].map((w, i) => (
          <span className={`contact__line contact__line--${i + 1}`} key={w}>
            <SplitChars text={w.toUpperCase()} />
          </span>
        ))}
      </h2>

      <div className="contact__lower">
        <Mask className="contact__ask" lines={['Have an idea?', <span className="dim">Let’s talk.</span>]} />
        <div className="contact__links">
          <button className={`contact__email ${copied ? 'is-copied' : ''}`} onClick={copy} data-cursor={copied ? 'Copied' : 'Copy\nemail'}>
            <span className="mask">
              <span className="mask__inner">{IDENTITY.email}</span>
            </span>
            <span className="meta contact__email-hint" aria-live="polite">
              {copied ? 'Copied to clipboard' : 'Click to copy'}
            </span>
          </button>
          {LIVE_SOCIALS.length > 0 && (
            <ul className="contact__socials">
              {LIVE_SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" data-cursor="Open">
                    <span>{s.label}</span>
                    <span className="meta dim">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="meta dim contact__time">
          {IDENTITY.location} — {time} WAT
        </p>
      </div>
    </section>
  )
}
