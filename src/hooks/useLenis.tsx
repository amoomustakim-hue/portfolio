import Lenis from 'lenis'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '../utils/gsap'
import { useReducedMotion } from './useMediaQuery'

const LenisContext = createContext<Lenis | null>(null)

/** Lenis smooth scroll on GSAP's ticker, so it and ScrollTrigger share one frame loop. */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return
    const instance = new Lenis({ duration: 1.3, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), wheelMultiplier: 0.9 })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)
    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)

/** Scroll to an element id, a pixel offset, or the top. */
export function useScrollTo() {
  const lenis = useLenis()
  return useCallback(
    (target: string | number, opts: { immediate?: boolean } = {}) => {
      const el = typeof target === 'string' ? document.getElementById(target) : null
      if (typeof target === 'string' && !el) return
      if (lenis) {
        lenis.scrollTo(el ?? (target as number), {
          duration: opts.immediate ? 0 : 2,
          immediate: opts.immediate,
          easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
          force: true,
        })
      } else {
        window.scrollTo({ top: el ? el.getBoundingClientRect().top + window.scrollY : (target as number) })
      }
    },
    [lenis],
  )
}

/** Freeze page scrolling while `locked` (preloader, menus). */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis()
  useEffect(() => {
    if (!locked) return
    document.documentElement.classList.add('is-locked')
    lenis?.stop()
    return () => {
      document.documentElement.classList.remove('is-locked')
      lenis?.start()
    }
  }, [locked, lenis])
}
