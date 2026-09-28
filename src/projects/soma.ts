import type { Project } from './types'

export const soma: Project = {
  slug: 'soma',
  scene: 'soma',
  title: 'Sōma',
  subtitle: 'Architecture & spatial studio',
  category: 'Architecture / Editorial web',
  year: '2026',
  tags: ['Three.js', 'Editorial', 'Light', 'Space'],
  status: 'Concept',
  role: ['Concept', 'Spatial design', '3D', 'Development'],
  summary: 'A studio website where the building is lit in real time.',
  statement: 'Architecture is the play of light on mass. So the site renders its own concrete, and lets the sun move across it while you read.',
  palette: { bg: '#d9d3c7', fg: '#1b1a17', accent: '#7c6f5d' },
  tone: 'light',
  exit: 'collapse',
  blocks: [
    {
      type: 'text',
      label: 'Direction',
      heading: 'Mass, shadow, slit.',
      body: 'A small composition of concrete volumes — a long wall broken by a slit, a cantilevered slab, a row of columns — lit by a single low sun that crosses the scene. Typography is set like a monograph: generous, quiet, asymmetric.',
    },
    { type: 'scene', caption: 'Real-time study — the sun crosses the wall in forty seconds.' },
    { type: 'pull', text: 'Built from light and patience.' },
    {
      type: 'specs',
      label: 'Build notes',
      items: [
        ['Lighting', 'One directional sun with soft shadow maps, animated azimuth'],
        ['Material', 'Rough concrete standard materials, atmospheric fog'],
        ['Layout', 'Horizontal, masked image sequences in the full study'],
        ['Status', 'Self-initiated concept study'],
      ],
    },
  ],
}
