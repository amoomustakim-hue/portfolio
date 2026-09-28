import type { Project } from './types'

const base = import.meta.env.BASE_URL

export const wackowrld: Project = {
  slug: 'wackowrld',
  scene: 'wackowrld',
  title: 'Wackowrld',
  subtitle: 'Est. whenever — worldwide',
  category: 'Fashion / Brand site / E-commerce',
  year: '2026',
  tags: ['Brand', 'E-commerce', 'Video', 'Motion'],
  status: 'Live',
  role: ['Design', 'Development'],
  summary: 'A streetwear world you enter rather than browse.',
  statement: 'A label that doesn’t take itself seriously deserves a site that feels like a music video — footage first, wordmark loud, one door in: enter the wrld.',
  palette: { bg: '#0d0e0e', fg: '#f2f5f4', accent: '#46b8e6' },
  tone: 'dark',
  exit: 'collapse',
  live: 'https://wackowrld.shop',
  blocks: [
    {
      type: 'text',
      label: 'Direction',
      heading: 'Footage first, wordmark loud.',
      body: 'The home page opens on full-bleed video with the hand-drawn Wackowrld wordmark sitting over it, a single call to enter, and the store behind. Everything else steps aside for the energy of the clip.',
    },
    {
      type: 'site',
      image: `${base}img/work/wackowrld-site.jpg`,
      href: 'https://wackowrld.shop',
      url: 'wackowrld.shop',
      caption: 'The live site — enter the wrld.',
    },
    { type: 'pull', text: 'Enter the wrld.' },
    { type: 'launch', href: 'https://wackowrld.shop', label: 'Visit wackowrld.shop' },
  ],
}
