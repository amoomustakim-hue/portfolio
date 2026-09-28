import { lazy, Suspense } from 'react'
import { useIsMobile, useReducedMotion } from '../../hooks/useMediaQuery'
import type { Project } from '../../projects'
import { AfterDarkScene } from './AfterDarkScene'
import { CravvingssScene } from './CravvingssScene'
import { NoirScene } from './NoirScene'
import { ShanghaiScene } from './ShanghaiScene'
import type { SceneProps } from './types'

// Three.js scenes are split out of the main bundle and only load when shown.
const AuraScene = lazy(() => import('./AuraScene'))
const SomaScene = lazy(() => import('./SomaScene'))

const base = import.meta.env.BASE_URL

/**
 * Renders a project's world. WebGL scenes fall back to a pre-rendered still
 * on phones and with reduced motion; everything else simply stops animating.
 */
export function Scene({ project, playing, variant }: { project: Project } & SceneProps) {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const live = playing && !reduced
  const webgl = project.scene === 'aura' || project.scene === 'soma'

  if (webgl && (reduced || mobile)) {
    return (
      <div className={`scene scene--${project.scene} scene--${variant}`}>
        <img className="scene__cover" src={`${base}img/scenes/${project.scene}.jpg`} alt="" loading="lazy" decoding="async" />
      </div>
    )
  }

  const props = { playing: live, variant }
  switch (project.scene) {
    case 'shanghai':
      return <ShanghaiScene {...props} />
    case 'cravvingss':
      return <CravvingssScene {...props} />
    case 'noir':
      return <NoirScene {...props} />
    case 'afterDark':
      return <AfterDarkScene {...props} />
    case 'aura':
    case 'soma': {
      const Lazy = project.scene === 'aura' ? AuraScene : SomaScene
      return (
        <Suspense fallback={<div className={`scene scene--${project.scene} scene--${variant}`} />}>
          <Lazy {...props} />
        </Suspense>
      )
    }
  }
}
