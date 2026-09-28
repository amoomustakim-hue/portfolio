import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../../utils/gsap'
import { SCRIPT, type Message } from './chat'

/** A WhatsApp-style thread (dark theme) showing the first `step` messages. */
export function ChatThread({ step }: { step: number }) {
  const list = useRef<HTMLDivElement>(null)
  const viewport = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const l = list.current
    const v = viewport.current
    if (!l || !v) return
    const items = Array.from(l.children) as HTMLElement[]
    items.forEach((el, i) => {
      const show = i < step
      const was = el.style.display !== 'none'
      el.style.display = show ? '' : 'none'
      if (show && !was) gsap.fromTo(el, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
    })
    // Keep the newest message in view, like a real thread.
    const last = items[Math.max(0, step - 1)]
    const bottom = last ? last.offsetTop + last.offsetHeight + 12 : 0
    gsap.to(l, { y: Math.min(0, v.clientHeight - bottom), duration: 0.7, ease: 'power3.out', overwrite: true })
  }, [step])

  return (
    <div className="chat" aria-label="Cravvingss order flow on WhatsApp">
      <header className="chat__head">
        <span className="chat__back" aria-hidden="true">‹ 66</span>
        <span className="chat__avatar" aria-hidden="true" />
        <strong>cravvingss</strong>
      </header>
      <div className="chat__viewport" ref={viewport}>
        <div className="chat__list" ref={list}>
          {SCRIPT.map((m) => (
            <Bubble key={m.id} message={m} />
          ))}
        </div>
      </div>
      <footer className="chat__input" aria-hidden="true">
        <span>+</span>
        <i />
      </footer>
    </div>
  )
}

function Bubble({ message: m }: { message: Message }) {
  return (
    <div className={`bubble bubble--${m.from}`}>
      {m.lines.map((line, i) => (
        <p key={i} className={m.title && i === 0 ? 'bubble__title' : undefined}>
          {line}
        </p>
      ))}
      {m.link && <p className="bubble__link">{m.link}</p>}
      <time>{m.time}</time>
    </div>
  )
}
