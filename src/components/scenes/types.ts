export type SceneProps = {
  /** Animate / play. False keeps the last frame (or poster) on screen. */
  playing: boolean
  /** `slide` sits inside the gallery frame; `hero` fills a case study; `detail` is an inline plate. */
  variant: 'slide' | 'hero' | 'detail'
}
