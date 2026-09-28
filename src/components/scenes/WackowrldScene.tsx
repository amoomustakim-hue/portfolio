import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import type { SceneProps } from './types'

const base = import.meta.env.BASE_URL

/**
 * Wackowrld: the live site's hero, treated like a paused frame of its video —
 * a slow push-in, a VHS tracking band, and a flicker of the wordmark.
 */
export function WackowrldScene({ playing, variant }: SceneProps) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || !playing) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.wck__img', { scale: 1.02 }, { scale: 1.12, duration: 14, ease: 'none', repeat: -1, yoyo: true })
      gsap.fromTo('.wck__band', { yPercent: -120 }, { yPercent: 1100, duration: 5.5, ease: 'none', repeat: -1, repeatDelay: 1.5 })
      gsap.to('.wck__img', { x: 3, duration: 0.06, repeat: 5, yoyo: true, repeatDelay: 3.4, ease: 'steps(1)' })
    }, el)
    return () => ctx.revert()
  }, [playing])

  return (
    <div className={`scene scene--wackowrld scene--${variant}`} ref={root}>
      <picture>
        <source media="(max-width: 767px)" srcSet={`${base}img/work/wackowrld-portrait.jpg`} />
        <img className="scene__cover wck__img" src={`${base}img/work/wackowrld-site.jpg`} alt="Wackowrld website hero: the brand wordmark over street footage" loading="lazy" decoding="async" />
      </picture>
      <div className="wck__band" aria-hidden="true" />
      <div className="wck__scan" aria-hidden="true" />
      <p className="wck__tag meta" aria-hidden="true">
        wackowrld.shop — Enter the wrld
      </p>
    </div>
  )
}
