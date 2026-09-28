import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'power3.out', duration: 1.2 })
ScrollTrigger.config({ ignoreMobileResize: true })

/** Every scene is built against these, via gsap.matchMedia. */
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1024px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  mobile: '(max-width: 767px)',
  finePointer: '(hover: hover) and (pointer: fine)',
} as const

export type Conditions = Record<keyof typeof MQ, boolean>

export { gsap, ScrollTrigger }
