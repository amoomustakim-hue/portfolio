import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import { ChatThread } from './cravvingss/ChatThread'
import { Dish } from './cravvingss/Dish'
import type { SceneProps } from './types'

/**
 * Product world: tomato-red field, a phone running the real order flow, and
 * dishes that drift with the cursor at different depths.
 */
export function CravvingssScene({ playing, variant }: SceneProps) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || !playing || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const layers = Array.from(el.querySelectorAll<HTMLElement>('[data-depth]')).map((node) => ({
      depth: Number(node.dataset.depth),
      x: gsap.quickTo(node, 'x', { duration: 1.4, ease: 'power3.out' }),
      y: gsap.quickTo(node, 'y', { duration: 1.4, ease: 'power3.out' }),
    }))
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      layers.forEach((l) => {
        l.x(nx * l.depth * 60)
        l.y(ny * l.depth * 40)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [playing])

  return (
    <div className={`scene scene--cravvingss scene--${variant}`} ref={root}>
      <p className="crv__word" aria-hidden="true" data-depth="0.2">
        crave
      </p>
      <div className="crv__dish crv__dish--a" data-depth="0.9">
        <Dish kind="jollof" />
      </div>
      <div className="crv__dish crv__dish--b" data-depth="0.6">
        <Dish kind="suya" />
      </div>
      <div className="crv__dish crv__dish--c" data-depth="1.2">
        <Dish kind="dodo" />
      </div>
      <div className="phone" data-depth="0.35">
        <div className="phone__screen">
          <ChatThread step="auto" playing={playing} />
        </div>
      </div>
      <ul className="crv__notes meta" aria-hidden="true">
        <li>Chat-native</li>
        <li>Pay in thread</li>
        <li>Lagos</li>
      </ul>
    </div>
  )
}
