import type { Project } from './types'

const base = import.meta.env.BASE_URL
const LIVE = 'https://mr-money-one.vercel.app'

export const asake: Project = {
  slug: 'asake',
  scene: 'asake',
  title: 'Asake — M$NEY',
  subtitle: 'An unofficial fan concept for the M$NEY era',
  category: 'Music / Fan concept / WebGL',
  year: '2026',
  tags: ['WebGL', 'Scroll', 'GSAP', 'AI matting'],
  status: 'Live — fan concept',
  role: ['Concept', 'Design', 'Motion', 'Development'],
  summary: 'The man as monument: a marble cover that crumbles into the artist underneath.',
  statement: 'The M$NEY cover is a marble relief of his face, so the site starts as stone. Scroll and it cracks from the eyes outward into shards that erode to dust, revealing the real portrait beneath, lined up eye for eye. Every era after that orbits him.',
  palette: { bg: '#1e45d8', fg: '#f7f6f2', accent: '#d4ff3d' },
  tone: 'dark',
  exit: 'expand',
  live: LIVE,
  blocks: [
    {
      type: 'text',
      label: 'Direction',
      heading: 'Stone to man.',
      body: 'One fragment shader over two real images: Voronoi shards with ember edges, and a cursor that pushes the pieces aside so you can peek before you scroll. Then the eras: Asake, cut out of stage footage, walks on a seamless loop while five album covers spiral round him in 3D. Hover a cover and it turns into its back sleeve with the tracklist.',
    },
    {
      type: 'site',
      image: `${base}img/work/asake-site.jpg`,
      href: LIVE,
      url: 'mr-money-one.vercel.app',
      caption: 'The marble relief, a moment before it breaks.',
    },
    { type: 'pull', text: 'Carved in marble.' },
    {
      type: 'specs',
      label: 'Build notes',
      items: [
        ['Hero', 'WebGL2 shader: Voronoi crumble, eroding ember rims, cursor push, dust; no generated likeness'],
        ['Cut-out', 'BiRefNet mattes on full-resolution stage footage, head-anchored, 20 fps with a cross-faded loop'],
        ['Orbit', 'CSS 3D helix of covers around the figure, driven by a pinned scroll'],
        ['Stack', 'React, Vite, TypeScript, GSAP ScrollTrigger, Lenis'],
        ['Note', 'Unofficial fan concept, not affiliated with Asake, YBNL or Giran Republic. No music is hosted'],
      ],
    },
    { type: 'launch', href: LIVE, label: 'Break the stone' },
  ],
}
