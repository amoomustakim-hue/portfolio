/**
 * The work on the home page, in two groups. Every card is a screenshot or a
 * frame of the real thing and opens the live site. Nothing here is a mock-up.
 */
export type Work = {
  title: string
  line: string
  year: string
  tags: string[]
  /** Status as it really is: Live, Concept, Fan concept. */
  status: string
  /** Parts of the work, listed under the card (SheDrives is a website, a WhatsApp bot and an app). */
  parts?: string[]
  image: string
  href: string
}

const host = (href: string) => href.replace(/^https?:\/\//, '').replace(/\/$/, '')
export const urlOf = (w: Work) => host(w.href)

export const DEVELOPMENT: Work[] = [
  {
    title: 'Cravvingss',
    line: 'The whole food business in one chat. Kitchens take orders, payments and riders on WhatsApp.',
    year: '2026',
    tags: ['Product', 'Backend', 'WhatsApp'],
    status: 'Live in Yaba',
    image: '/img/work/cravvingss-site.jpg',
    href: 'https://cravvingss.shop',
  },
  {
    title: 'SheDrives',
    line: 'Rides with women drivers in Nigeria. I lead the engineering across all three parts.',
    year: '2026',
    tags: ['Product', 'Mobile app', 'Backend'],
    status: 'Live',
    parts: ['Website', 'WhatsApp booking bot', 'Rider and driver app'],
    image: '/img/work/shedrives-site.jpg',
    href: 'https://shedrivesng.com',
  },
  {
    title: 'Wackowrld',
    line: 'A streetwear store you enter rather than browse.',
    year: '2026',
    tags: ['E-commerce', 'Frontend'],
    status: 'Live',
    image: '/img/work/wackowrld-site.jpg',
    href: 'https://wackowrld.shop',
  },
]

export const DESIGN: Work[] = [
  {
    title: 'Noir',
    line: 'N/01, a car commercial in seven shots that you drive with the scroll wheel.',
    year: '2026',
    tags: ['Concept film', 'Scroll'],
    status: 'Concept',
    image: '/img/work/noir-site.jpg',
    href: 'https://noir-kappa-two.vercel.app',
  },
  {
    title: 'Asake, M$NEY',
    line: 'An unofficial fan concept: a marble cover that crumbles into the artist underneath.',
    year: '2026',
    tags: ['Music', 'WebGL'],
    status: 'Fan concept',
    image: '/img/work/asake-site.jpg',
    href: 'https://mr-money-one.vercel.app',
  },
  {
    title: 'Shanghai',
    line: 'City Archive / 001, the Huangpu scrolled from daylight into night.',
    year: '2026',
    tags: ['Immersive', 'Scroll film'],
    status: 'Live',
    image: '/media/shanghai-poster.jpg',
    href: 'https://shanghai-city.vercel.app',
  },
  {
    title: 'ami',
    line: 'The Art of Scent, a perfume house you walk into one scroll at a time.',
    year: '2026',
    tags: ['Luxury', 'E-commerce'],
    status: 'Live',
    image: '/img/work/ami-site.jpg',
    href: 'https://ami-one-rho.vercel.app',
  },
]
