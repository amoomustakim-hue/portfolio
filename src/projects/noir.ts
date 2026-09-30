import type { Project } from './types'

const base = import.meta.env.BASE_URL
const LIVE = 'https://noir-kappa-two.vercel.app'

export const noir: Project = {
  slug: 'noir',
  scene: 'noir',
  title: 'Noir',
  subtitle: 'N/01 — a concept film in seven shots',
  category: 'Automotive / Scroll-driven film',
  year: '2026',
  tags: ['Film', 'Scroll', 'GSAP', 'AI video'],
  status: 'Live — concept',
  role: ['Direction', 'Motion', 'Design', 'Development'],
  summary: 'A car commercial you drive with the scroll wheel.',
  statement: 'Seven shots, one car. Each chapter pins to the screen and the scroll becomes the playhead — scroll down and the car launches, scroll back and it rolls onto the grid again.',
  palette: { bg: '#050505', fg: '#ededeb', accent: '#ff2a1a' },
  tone: 'dark',
  exit: 'shutter',
  live: LIVE,
  blocks: [
    {
      type: 'text',
      label: 'Direction',
      heading: 'Scroll is the playhead.',
      body: 'Reveal, launch, heat, onboard, rain, driver, night. Every shot was generated, cut at its hard edges, graded to one look and encoded with a keyframe every twelve frames, so it seeks instantly in both directions. Over each one sits a live readout — start lights and a launch timer, disc temperature, speed and shift lights, a heart rate.',
    },
    {
      type: 'site',
      image: `${base}img/work/noir-site.jpg`,
      href: LIVE,
      url: 'noir-kappa-two.vercel.app',
      caption: 'The trailer, then seven chapters under your scroll.',
    },
    { type: 'pull', text: 'Built in the dark.' },
    {
      type: 'specs',
      label: 'Build notes',
      items: [
        ['Footage', 'Seven AI-generated shots, trimmed at their cuts, one grade, a 2× motion-interpolated tunnel'],
        ['Playback', 'Pinned chapters; scroll eases the playhead, and only seeks when the decoder is free'],
        ['Encodes', '1080p and 720p, H.264 and VP9, 12-frame GOPs without B-frames'],
        ['Stack', 'React, Vite, TypeScript, GSAP ScrollTrigger, Lenis'],
      ],
    },
    { type: 'launch', href: LIVE, label: 'Watch N/01' },
  ],
}
