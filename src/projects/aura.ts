import type { Project } from './types'

export const aura: Project = {
  slug: 'aura',
  scene: 'aura',
  title: 'Aura',
  subtitle: 'Eau de Parfum — digital flagship',
  category: 'Luxury / 3D product experience',
  year: '2026',
  tags: ['Three.js', 'WebGL', 'Art Direction', 'Interaction'],
  status: 'Concept',
  role: ['Concept', 'Art direction', '3D', 'Development'],
  summary: 'A fragrance you can turn in your hand before it exists on a shelf.',
  statement: 'Luxury is restraint. One object, lit like a studio still, answering the cursor the way glass answers light.',
  palette: { bg: '#e9dfcf', fg: '#1a1712', accent: '#b8894b' },
  tone: 'light',
  exit: 'slide',
  blocks: [
    {
      type: 'text',
      label: 'Direction',
      heading: 'An object, not a page.',
      body: 'The flagship is built around a single real-time bottle: physical glass with transmission and refraction, a brushed-brass cap, and liquid that catches the light as it turns. The interface steps back to typography and silence.',
    },
    { type: 'scene', caption: 'Real-time glass — move the cursor to turn the bottle.' },
    { type: 'pull', text: 'Worn close. Remembered longer.' },
    {
      type: 'specs',
      label: 'Build notes',
      items: [
        ['Material', 'MeshPhysicalMaterial transmission, IOR 1.5, studio environment lighting'],
        ['Geometry', 'Bevelled extrusion for the flacon, lathe for the cap'],
        ['Interaction', 'Cursor-driven rotation with inertia; idle float'],
        ['Status', 'Self-initiated concept study'],
      ],
    },
  ],
}
