import { SHANGHAI_URL } from '../config/site'
import type { Project } from './types'

export const shanghai: Project = {
  slug: 'shanghai',
  scene: 'shanghai',
  title: 'Shanghai',
  subtitle: 'City Archive / 001',
  category: 'Immersive web experience',
  year: '2026',
  tags: ['GSAP', 'WebGL', 'Motion', 'Creative Development'],
  status: 'Live',
  role: ['Art direction', 'Design', 'Creative development', 'Video pipeline'],
  summary: 'A cinematic archive of the Huangpu, scrolled from daylight into night.',
  statement: 'A single timelapse, treated like a living photograph — scroll becomes the camera, and the camera controls time.',
  palette: { bg: '#050505', fg: '#ece7df', accent: '#c9a36b' },
  tone: 'dark',
  exit: 'stretch',
  external: SHANGHAI_URL,
  blocks: [
    {
      type: 'text',
      label: 'The idea',
      heading: 'Scroll is the camera.',
      body: 'One day-to-night timelapse of the Bund carries the entire site. The hero pushes in and crops from 16:9 to scope, the river surfaces from the waterline, a survey plate maps the skyline — and a pinned chapter hands time itself to the scroll wheel.',
    },
    { type: 'scene', caption: 'Plate 001 — the Huangpu, looking east.' },
    {
      type: 'specs',
      label: 'Under the hood',
      items: [
        ['Scrubbing', 'video.currentTime eased toward scroll progress, seeks only when the decoder is free'],
        ['Encoding', 'Short-GOP H.264 / VP9, 1080p desktop, AI-upscaled portrait crop for phones'],
        ['Motion', 'GSAP ScrollTrigger scenes in scoped matchMedia, Lenis smooth scroll'],
        ['Access', 'Reduced-motion branch for every scene, touch-specific composition'],
      ],
    },
    { type: 'pull', text: 'Light changes everything.' },
    { type: 'launch', href: SHANGHAI_URL, label: 'Enter City Archive / 001' },
  ],
}
