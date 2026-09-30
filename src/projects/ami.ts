import type { Project } from './types'

const base = import.meta.env.BASE_URL
const LIVE = 'https://ami-one-rho.vercel.app'

export const ami: Project = {
  slug: 'ami',
  scene: 'ami',
  title: 'ami',
  subtitle: 'The Art of Scent — fragrance house',
  category: 'Luxury / E-commerce / Scroll film',
  year: '2026',
  tags: ['Next.js', 'Frame sequence', 'Three.js', 'Art direction'],
  status: 'Live',
  role: ['Art direction', 'Design', 'Development'],
  summary: 'A perfume house you walk into, one scroll at a time.',
  statement: 'The homepage is a single camera move: from the pavement, through the door, into the room. Every line of copy is keyed to the same timeline, so the page reads as a walk rather than a stack of sections.',
  palette: { bg: '#17150f', fg: '#f4efe5', accent: '#c3a382' },
  tone: 'dark',
  exit: 'slide',
  live: LIVE,
  blocks: [
    {
      type: 'text',
      label: 'Direction',
      heading: 'An intimate world of scent.',
      body: 'A boutique walkthrough is scrubbed frame by frame against the scroll, with a rack-focus grade that dims the room whenever a statement arrives. After the film: the signature scents on a hairline shelf, a scent finder by mood, and the flagship flacon in real-time 3D glass, turned by the scroll.',
    },
    {
      type: 'site',
      image: `${base}img/work/ami-site.jpg`,
      href: LIVE,
      url: 'ami-one-rho.vercel.app',
      caption: 'The storefront, the moment before you step inside.',
    },
    { type: 'pull', text: 'Worn close. Remembered longer.' },
    {
      type: 'specs',
      label: 'Build notes',
      items: [
        ['Film', '151 frames, AI-upscaled with Real-ESRGAN, scrubbed on a canvas with a crop that follows the sign'],
        ['Loading', 'Priority frames preloaded with the HTML; the rest stream in behind the page'],
        ['3D', 'The flagship flacon in layered glass (three.js), large screens only'],
        ['Stack', 'Next.js, TypeScript, Tailwind, GSAP ScrollTrigger, Lenis'],
      ],
    },
    { type: 'launch', href: LIVE, label: 'Enter the house' },
  ],
}
