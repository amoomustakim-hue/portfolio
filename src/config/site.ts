/** Who this site is about, and the links and lines that aren't tied to one piece of work. */

export const IDENTITY = {
  name: 'Mustakheem',
  fullName: 'Mustakheem Olamilekan Amoo',
  /** The name people search for: used in titles, meta and the About line. */
  searchName: 'Mustakheem Amoo',
  alias: 'Olacodes',
  role: 'Creative developer',
  location: 'Lagos, Nigeria',
  timeZone: 'Africa/Lagos',
  email: 'amoomustakim@gmail.com',
}

/** Social links. Entries without an href are not shown anywhere. */
export const SOCIALS: { label: string; href: string }[] = [
  { label: 'GitHub', href: 'https://github.com/amoomustakim-hue' },
  { label: 'X', href: '' },
  { label: 'LinkedIn', href: '' },
  { label: 'Instagram', href: '' },
]
export const LIVE_SOCIALS = SOCIALS.filter((s) => s.href)

/** The canonical origin. Override with VITE_SITE_URL if the domain changes. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://www.mustakheem.site').replace(/\/$/, '')

export const SEO = {
  title: 'Mustakheem Amoo, creative developer and designer in Lagos',
  description:
    'Mustakheem Amoo (Olacodes) is a creative developer and designer in Lagos: CEO of KIMTECH Technologies, Lead Software Engineer at SheDrives NG and Cravvingss. Development, design, and a blog about what he builds each week.',
}

/** Where he works now. */
export const EXPERIENCE: { role: string; org: string; href: string; when?: string }[] = [
  { role: 'CEO', org: 'KIMTECH Technologies Ltd', href: '' },
  { role: 'Lead Software Engineer', org: 'SheDrives NG', href: 'https://shedrivesng.com' },
  { role: 'Lead Software Engineer', org: 'Cravvingss', href: 'https://cravvingss.shop' },
]

/** Hackathons won. Four in all; the two named here are the ones on record so far. */
export const HACKATHONS = {
  wins: 4,
  /** Every win, with the place. The fourth is still to be added. */
  list: [
    { organiser: "Africa's Talking", event: 'Lagos edition', place: '1st place' },
    { organiser: "Africa's Talking", event: 'Built for Hardware', place: 'Winner' },
    { organiser: "Africa's Talking", event: 'Africa-wide competition', place: 'Winner' },
  ],
}

export const SKILLS = {
  Development: ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'Fastify', 'PostgreSQL', 'Prisma', 'React Native', 'Three.js', 'GSAP'],
  Design: ['UI/UX', 'Interaction design', 'Motion', 'Art direction', 'Prototyping'],
}
