/** Who this site is about, and the links and lines that aren't tied to one piece of work. */

export const IDENTITY = {
  name: 'Mustakheem',
  fullName: 'Mustakheem Olamilekan Amoo',
  /** The name people search for: used in titles, meta and the About line. */
  searchName: 'Mustakheem Amoo',
  alias: 'Olacodes',
  role: 'Software Engineer',
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
  title: 'Mustakheem Amoo, Software Engineer in Lagos',
  description:
    'Mustakheem Amoo (Olacodes) is a software engineer in Lagos: CEO of KIMTECH Technologies, Lead Software Engineer at SheDrives NG and Cravvingss. Development, design, and a blog about what he builds each week.',
}

/** Where he works now. */
export const EXPERIENCE: { role: string; org: string; href: string; when?: string }[] = [
  { role: 'CEO', org: 'KIMTECH Technologies Ltd', href: '' },
  { role: 'Lead Software Engineer', org: 'SheDrives NG', href: 'https://shedrivesng.com' },
  { role: 'Lead Software Engineer', org: 'Cravvingss', href: 'https://cravvingss.shop' },
]

/** Hackathon placings, best first. */
export const HACKATHONS = {
  list: [
    { place: '1st place', name: "Africa's Talking Build with AI: Build with AT Hackathon" },
    { place: '1st place', name: "Africa's Talking × Google Generative AI + APIs Hackathon" },
    { place: '2nd place', name: '234 AI Hackathon × Commerce Fusion' },
    { place: '3rd place', name: "Africa's Talking Build for Hardware Lagos Hackathon" },
  ],
}

export const SKILLS = {
  Development: ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'Fastify', 'PostgreSQL', 'Prisma', 'React Native', 'Three.js', 'GSAP'],
  Design: ['UI/UX', 'Interaction design', 'Motion', 'Art direction', 'Prototyping'],
}
