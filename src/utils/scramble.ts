const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/—×#'

const running = new WeakMap<HTMLElement, number>()

/**
 * Resolves `text` into `el` through a short burst of random glyphs, left to
 * right. Characters that are already correct stay put, so hovering the same
 * label twice only flickers what changed.
 */
export function scramble(el: HTMLElement, text = el.dataset.text ?? el.textContent ?? '', duration = 600) {
  cancelAnimationFrame(running.get(el) ?? 0)
  el.dataset.text = text
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = text
    return
  }
  const start = performance.now()
  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const settled = Math.floor(t * text.length)
    let out = ''
    for (let i = 0; i < text.length; i++) {
      const ch = text[i]
      out += i < settled || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
    }
    el.textContent = out
    if (t < 1) running.set(el, requestAnimationFrame(frame))
  }
  running.set(el, requestAnimationFrame(frame))
}
