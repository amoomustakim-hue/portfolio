import { useEffect, useRef, useState } from 'react'
import type { SceneProps } from './types'

const base = import.meta.env.BASE_URL

/** Portrait crop on phones (the full 2.35:1 frame would be a thin slice), H.264 first. */
function pickSource() {
  const phone = window.matchMedia('(max-width: 767px)').matches
  const probe = document.createElement('video')
  const mp4 = !!probe.canPlayType('video/mp4; codecs="avc1.64001f"') || !probe.canPlayType('video/webm; codecs="vp9"')
  const name = phone ? 'shanghai-portrait' : 'shanghai'
  return { src: `${base}media/${name}.${mp4 ? 'mp4' : 'webm'}`, poster: `${base}media/${name === 'shanghai' ? 'shanghai-poster' : 'shanghai-portrait-poster'}.jpg` }
}

/** The Shanghai timelapse as a living plate — no controls, no chrome, just footage. */
export function ShanghaiScene({ playing, variant }: SceneProps) {
  const video = useRef<HTMLVideoElement>(null)
  const [{ src, poster }] = useState(pickSource)
  // Attach the source only once the scene has been asked to play: posters are cheap, video isn't.
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
    <div className={`scene scene--shanghai scene--${variant}`}>
      <video
        ref={video}
        className="scene__cover"
        src={attached ? src : undefined}
        poster={poster}
        muted
        playsInline
        loop
        preload={attached ? 'auto' : 'none'}
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="scene-shanghai__shade" />
      <p className="scene-shanghai__hud meta" aria-hidden="true">
        <span className="scene-shanghai__rec" /> 31°13′N 121°28′E — Huangpu
      </p>
    </div>
  )
}
