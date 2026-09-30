import { useEffect, useRef, useState } from 'react'
import type { SceneProps } from './types'

const base = import.meta.env.BASE_URL

/** H.264 first, VP9 for browsers without it. */
const pickSrc = (name: string) => {
  const probe = document.createElement('video')
  const mp4 = !!probe.canPlayType('video/mp4; codecs="avc1.64001f"') || !probe.canPlayType('video/webm; codecs="vp9"')
  return `${base}media/${name}.${mp4 ? 'mp4' : 'webm'}`
}

type Props = SceneProps & {
  /** public/media/{name}.mp4 / .webm / .jpg */
  name: string
  caption: string
  /** object-position for the cover crop. */
  focus?: string
}

/**
 * Footage from a live project as a looping plate — muted, no controls. The
 * source is only attached once the slide is asked to play; until then it is
 * just its poster frame.
 */
export function FilmScene({ name, caption, focus = '50% 50%', playing, variant }: Props) {
  const video = useRef<HTMLVideoElement>(null)
  const [src] = useState(() => pickSrc(name))
  const [attached, setAttached] = useState(playing)

  useEffect(() => {
    if (playing) setAttached(true)
  }, [playing])

  useEffect(() => {
    const v = video.current
    if (!v) return
    v.muted = true
    v.setAttribute('muted', '')
    if (playing && attached) v.play().catch(() => {})
    else v.pause()
  }, [playing, attached])

  return (
    <div className={`scene scene--film scene--${name} scene--${variant}`}>
      <video
        ref={video}
        className="scene__cover"
        style={{ objectPosition: focus }}
        src={attached ? src : undefined}
        poster={`${base}media/${name}.jpg`}
        muted
        playsInline
        loop
        preload={attached ? 'auto' : 'none'}
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="scene-film__shade" />
      <p className="scene-film__caption meta" aria-hidden="true">
        {caption}
      </p>
    </div>
  )
}
