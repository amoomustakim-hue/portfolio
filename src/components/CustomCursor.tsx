import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '../hooks/useMediaQuery'
import { gsap } from '../utils/gsap'

/**
 * Desktop cursor: a dot that trails the pointer. Over text it swells a
 * little; over `[data-cursor="LABEL"]` it becomes a disc carrying the label
 * (a newline splits it over two lines); links and buttons read OPEN.
 */
export function CustomCursor() {
  const fine = useFinePointer()
  return fine ? <Cursor /> : null
}

function Cursor() {
  const el = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const cursor = el.current!
    document.documentElement.classList.add('has-cursor')
    const speed = reduced ? 0.01 : 0.45
    const xTo = gsap.quickTo(cursor, 'x', { duration: speed, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: speed, ease: 'power3.out' })
    let current: Element | null = null

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      xTo(e.clientX)
      yTo(e.clientY)
      cursor.classList.add('is-visible')
    }
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element
      const labelled = t.closest('[data-cursor]')
      const link = labelled ? null : t.closest('a, button, [role="button"], input, textarea')
      const text = labelled || link ? null : t.closest('h1, h2, h3, p, blockquote, li, dd')
      const target = labelled ?? link ?? text
      if (target === current) return
      current = target
      if (label.current) label.current.textContent = labelled?.getAttribute('data-cursor') ?? (link ? 'Open' : '')
      cursor.dataset.state = labelled || link ? 'label' : text ? 'text' : ''
    }
    const onLeave = () => cursor.classList.remove('is-visible')
    const onDown = () => cursor.classList.add('is-down')
    const onUp = () => cursor.classList.remove('is-down')

    // Components can relabel the cursor in place (e.g. "Copied").
    const onLabel = (e: Event) => {
      if (label.current) label.current.textContent = (e as CustomEvent<string>).detail
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('cursor:label', onLabel)
    document.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('cursor:label', onLabel)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [reduced])

  return (
    <div className="cursor" ref={el} aria-hidden="true">
      <span className="cursor__disc" />
      <span className="cursor__label" ref={label} />
    </div>
  )
}
