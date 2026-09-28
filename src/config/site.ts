/** Identity, links and copy that isn't tied to a single project. */

export const IDENTITY = {
  name: 'Mustakheem',
  fullName: 'Mustakheem Olamilekan Amoo',
  alias: 'Olacodes',
  location: 'Lagos, Nigeria',
  coords: '6°27′N / 3°24′E',
  timeZone: 'Africa/Lagos',
  roles: ['Creative Developer', 'UI/UX Designer', 'Motion Designer', 'Founder'],
  email: 'amoomustakim@gmail.com',
}

/**
 * Social links. Fill in `href` (and `handle`) with your own profiles —
 * entries without an href are not rendered anywhere on the site.
 */
export const SOCIALS: { label: string; handle: string; href: string }[] = [
  { label: 'X', handle: '', href: '' },
  { label: 'LinkedIn', handle: '', href: '' },
  { label: 'GitHub', handle: '', href: '' },
  { label: 'Instagram', handle: '', href: '' },
]

export const LIVE_SOCIALS = SOCIALS.filter((s) => s.href)

/** The About sequence — one word per beat of the scroll. */
export const DISCIPLINES = ['Design', 'Code', 'Motion', 'Product', 'Experiment', 'Build']

export const RECORD = [
  { value: '4×', label: 'Hackathon winner' },
  { value: '01', label: "Africa's Talking × Google Generative AI — Winner" },
  { value: '01', label: 'OpenMetadata Hackathon — Winner' },
  { value: '→', label: 'Founder, Cravvingss' },
]

export const CAPABILITIES = [
  {
    index: '01',
    title: ['Creative', 'Development'],
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Three.js', 'WebGL', 'GSAP'],
  },
  {
    index: '02',
    title: ['Design'],
    items: ['UI/UX', 'Visual Design', 'Interaction Design', 'Art Direction'],
  },
  {
    index: '03',
    title: ['Motion'],
    items: ['Motion Graphics', 'Animation', 'Interactive Motion'],
  },
  {
    index: '04',
    title: ['Product'],
    items: ['Product Design', 'Prototyping', 'Startup Development'],
  },
]

export const EXPERIMENTS = [
  { id: 'field', index: 'E01', title: 'Field', note: 'A grid that gets out of your way.' },
  { id: 'form', index: 'E02', title: 'Form', note: 'Low-poly object, drag to turn.' },
  { id: 'weight', index: 'E03', title: 'Weight', note: 'Type that thickens where you look.' },
  { id: 'displace', index: 'E04', title: 'Displace', note: 'A still of Shanghai, bent by the cursor.' },
  { id: 'swarm', index: 'E05', title: 'Swarm', note: 'Four thousand points, one repulsor.' },
] as const

export type ExperimentId = (typeof EXPERIMENTS)[number]['id']

export const SHANGHAI_URL = 'https://shanghai-city.vercel.app'
