import type { Project } from './types'

const base = import.meta.env.BASE_URL

export const cravvingss: Project = {
  slug: 'cravvingss',
  scene: 'cravvingss',
  title: 'Cravvingss',
  subtitle: 'The whole food business, in one chat',
  category: 'Startup / Product / Backend / Design',
  year: '2026',
  tags: ['Product', 'Backend', 'WhatsApp', 'Payments', 'Design'],
  status: 'Live — Yaba',
  role: ['Founder', 'Product design', 'Backend & integrations', 'Brand'],
  summary: 'Customers order on WhatsApp with no app. Kitchens take payment, run their menu and get paid automatically. Riders pick up work near them.',
  statement: 'One system, all of it in chat. Customers order on WhatsApp with no app, kitchens get paid automatically, and riders pick up work near them.',
  palette: { bg: '#fbf8f5', fg: '#161412', accent: '#e8150e' },
  tone: 'light',
  exit: 'expand',
  live: 'https://cravvingss.shop',
  blocks: [
    {
      type: 'text',
      label: 'The problem',
      heading: 'Food in Lagos is already ordered over chat. The business behind it wasn’t.',
      body: 'Orders arrive as messages, payments as screenshots, and riders are found by phone call. Cravvingss keeps the chat people already use and puts a real system behind it: menus, payments, kitchen updates, dispatch and tracking — for customers, kitchens and riders, in one place.',
    },
    {
      type: 'site',
      image: `${base}img/work/cravvingss-site.jpg`,
      href: 'https://cravvingss.shop',
      url: 'cravvingss.shop',
      caption: 'The Cravvingss site — order food, sell your food, ride and earn.',
    },
    { type: 'flow' },
    {
      type: 'specs',
      label: 'What I built',
      items: [
        ['Ordering', 'WhatsApp-native flow: order, confirmation and every status update arrive as messages'],
        ['Payments', 'In-chat checkout; kitchens are paid out automatically'],
        ['Kitchens', 'Menu management and order handling from the same channel'],
        ['Riders', 'Nearby work, delivery codes and live tracking links'],
      ],
    },
    { type: 'pull', text: 'No app. Just chat.' },
    { type: 'launch', href: 'https://cravvingss.shop', label: 'Visit cravvingss.shop' },
  ],
}
