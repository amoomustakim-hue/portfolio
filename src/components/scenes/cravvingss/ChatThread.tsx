import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '../../../utils/gsap'
import { MENU, SCRIPT, type Message } from './chat'
import { Dish } from './Dish'

type Props = {
  /** Autoplay loops the whole conversation; a number shows exactly that many messages. */
  step: number | 'auto'
  playing: boolean
}

/** A WhatsApp-style thread: plain bubbles plus rich commerce messages. */
export function ChatThread({ step, playing }: Props) {
  const list = useRef<HTMLDivElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const typing = useRef<HTMLDivElement>(null)

  // Keep the newest message in view by sliding the list, like a real thread.
  const follow = (animate = true) => {
    const l = list.current
    const v = viewport.current
    if (!l || !v) return
    const visible = Array.from(l.children).filter((c) => (c as HTMLElement).style.display !== 'none') as HTMLElement[]
    const last = visible[visible.length - 1]
    const bottom = last ? last.offsetTop + last.offsetHeight + 12 : 0
    const y = Math.min(0, v.clientHeight - bottom)
    gsap.to(l, { y, duration: animate ? 0.7 : 0, ease: 'power3.out', overwrite: true })
  }

  // Controlled mode: show the first `step` messages.
  useLayoutEffect(() => {
    if (step === 'auto' || !list.current) return
    const items = Array.from(list.current.children) as HTMLElement[]
    items.forEach((el, i) => {
      const show = i < step
      const was = el.style.display !== 'none'
      el.style.display = show ? '' : 'none'
      if (show && !was) gsap.fromTo(el, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
    })
    follow()
  }, [step])

  // Autoplay: reveal message by message, with typing dots before their replies, then loop.
  useEffect(() => {
    if (step !== 'auto' || !list.current) return
    const items = Array.from(list.current.children) as HTMLElement[]
    items.forEach((el) => (el.style.display = 'none'))
    gsap.set(list.current, { y: 0 })
    if (!playing) {
      items.slice(0, 3).forEach((el) => (el.style.display = ''))
      return
    }
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, onRepeat: () => gsap.set(list.current, { y: 0 }) })
    tl.call(() => items.forEach((el) => (el.style.display = 'none')))
    SCRIPT.forEach((m, i) => {
      if (m.from === 'them') {
        tl.call(() => typing.current?.classList.add('is-on'))
        tl.to({}, { duration: 0.9 })
        tl.call(() => typing.current?.classList.remove('is-on'))
      }
      tl.call(() => {
        items[i].style.display = ''
        follow()
      })
      tl.fromTo(items[i], { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' })
      tl.to({}, { duration: m.kind === 'menu' ? 1.8 : 0.9 })
    })
    tl.to({}, { duration: 2.4 })
    tl.to(items, { opacity: 0, duration: 0.5 })
    return () => {
      tl.kill()
      typing.current?.classList.remove('is-on')
    }
  }, [step, playing])

  return (
    <div className="chat" aria-label="Cravvingss chat order flow">
      <header className="chat__head">
        <span className="chat__avatar" aria-hidden="true">C</span>
        <span className="chat__who">
          <strong>Cravvingss</strong>
          <small>business account · online</small>
        </span>
      </header>
      <div className="chat__viewport" ref={viewport}>
        <div className="chat__list" ref={list}>
          {SCRIPT.map((m) => (
            <Bubble key={m.id} message={m} />
          ))}
        </div>
      </div>
      <div className="chat__typing" ref={typing} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <footer className="chat__input" aria-hidden="true">
        <span>Message</span>
        <i className="chat__send" />
      </footer>
    </div>
  )
}

function Bubble({ message: m }: { message: Message }) {
  if (m.kind === 'text') return <div className={`bubble bubble--${m.from}`}>{m.text}</div>
  if (m.kind === 'menu')
    return (
      <div className="bubble bubble--them bubble--rich">
        <div className="menu-cards">
          {MENU.slice(0, 3).map((d, i) => (
            <div className={`menu-card ${i === 0 ? 'is-picked' : ''}`} key={d.kind}>
              <Dish kind={d.kind} className="menu-card__dish" />
              <strong>{d.name}</strong>
              <span>
                {d.price} · {d.kitchen}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  if (m.kind === 'cart')
    return (
      <div className="bubble bubble--them bubble--rich cart">
        <div className="cart__row">
          <span>1× Smoky jollof + chicken</span>
          <span>₦4,800</span>
        </div>
        <div className="cart__row dim">
          <span>Delivery · 25–35 min</span>
          <span>₦500</span>
        </div>
        <div className="cart__pay">Pay ₦5,300</div>
      </div>
    )
  if (m.kind === 'paid')
    return (
      <div className="bubble bubble--them">
        <strong>Paid ✓</strong> Order #CR-2041 is with Mama Put, Yaba.
      </div>
    )
  return (
    <div className="bubble bubble--them bubble--rich track">
      <span>Tunde is on the way · 6 min</span>
      <div className="track__bar">
        <i />
      </div>
      <div className="track__legs">
        <small>Kitchen</small>
        <small>Rider</small>
        <small>You</small>
      </div>
    </div>
  )
}
