import { gsap } from './gsap'

let overlay: HTMLDivElement | null = null

/**
 * Grows a panel from `rect` (a project frame) to the full viewport — the
 * seam between the gallery and a case study or external experience.
 */
export function expandFrom(rect: DOMRect, color: string, caption?: string) {
  release(true)
  const el = document.createElement('div')
  el.className = 'page-wipe'
  el.style.background = color
  if (caption) {
    const p = document.createElement('p')
    p.className = 'page-wipe__caption meta'
    p.textContent = caption
    el.appendChild(p)
  }
  document.body.appendChild(el)
  overlay = el
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  gsap.set(el, { top: rect.top, left: rect.left, width: rect.width, height: rect.height })
  return new Promise<void>((resolve) => {
    gsap
      .timeline({ onComplete: resolve })
      .to(el, { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight, duration: reduced ? 0.01 : 1, ease: 'power4.inOut' })
      .fromTo(el.querySelector('.page-wipe__caption'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
  })
}

/** Fades the wipe away once the destination has painted. */
export function release(immediate = false) {
  const el = overlay
  if (!el) return
  overlay = null
  if (immediate) {
    el.remove()
    return
  }
  gsap.to(el, { opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.15, onComplete: () => el.remove() })
}

// Coming back from the external Shanghai site restores this page from bfcache
// with the wipe still covering it.
window.addEventListener('pageshow', (e) => {
  if (e.persisted) release()
})
