import type { Project } from './types'

export const noir: Project = {
  slug: 'noir',
  scene: 'noir',
  title: 'Noir',
  subtitle: 'GT — reveal campaign',
  category: 'Automotive / Motion-led web',
  year: '2026',
  tags: ['Motion', 'SVG', 'Scroll', 'Parallax'],
  status: 'Concept',
  role: ['Concept', 'Motion design', 'Illustration', 'Development'],
  summary: 'A car revealed the way car launches are shot: one line of light at a time.',
  statement: 'Most of the frame is black on purpose. The car is drawn only where light touches it — shoulder, roofline, wheel — and speed is suggested, never shown.',
  palette: { bg: '#060606', fg: '#f2f2ee', accent: '#e23b2e' },
  tone: 'dark',
  exit: 'shutter',
  blocks: [
    {
      type: 'text',
      label: 'Direction',
      heading: 'Light painting, in the browser.',
      body: 'A studio technique — dragging a strip light across a car in a dark room — rebuilt as vector motion. A sweep of light travels the body lines, the tail lamps hold the only colour, and the floor gives back a faint reflection.',
    },
    { type: 'scene', caption: 'The sweep — the car only exists where the light is.' },
    { type: 'pull', text: 'Seen in passing.' },
    {
      type: 'specs',
      label: 'Build notes',
      items: [
        ['Drawing', 'Hand-authored SVG body lines, masked by an animated light gradient'],
        ['Motion', 'GSAP timelines; road streaks at three parallax speeds'],
        ['Performance', 'No video, no WebGL — a few kilobytes of vector'],
        ['Status', 'Self-initiated concept study'],
      ],
    },
  ],
}
