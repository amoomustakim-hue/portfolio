import type { Project } from './types'

export const cravvingss: Project = {
  slug: 'cravvingss',
  scene: 'cravvingss',
  title: 'Cravvingss',
  subtitle: 'Chat-native food delivery',
  category: 'Product / Design / Development / Startup',
  year: '2026',
  tags: ['Product', 'Design', 'Development', 'Startup'],
  status: 'In development',
  role: ['Founder', 'Product design', 'Engineering', 'Brand'],
  summary: 'Food delivery that happens inside the conversation you are already having.',
  statement: 'Nobody wants another app for dinner. Cravvingss lives in chat — say what you are craving, pick, pay and track without leaving the thread.',
  palette: { bg: '#d8391d', fg: '#fff3e6', accent: '#ffcf5a' },
  tone: 'dark',
  exit: 'expand',
  blocks: [
    {
      type: 'text',
      label: 'The problem',
      heading: 'Ordering food is a conversation. Apps turned it into a form.',
      body: 'Across Lagos, most food is already ordered over chat — a message to a vendor, a voice note, a bank transfer screenshot. Cravvingss keeps that behaviour and removes the friction: structured menus, payments and tracking, delivered as messages.',
    },
    { type: 'flow' },
    {
      type: 'specs',
      label: 'Product decisions',
      items: [
        ['Interface', 'Conversational — menus, carts and receipts render as rich messages'],
        ['Payments', 'In-thread checkout; the receipt is part of the chat history'],
        ['Vendors', 'Kitchens manage orders from the same channel customers use'],
        ['Tracking', 'Live rider updates pushed as replies, not notifications'],
      ],
    },
    { type: 'pull', text: 'Say what you crave. We handle the rest.' },
    { type: 'scene', caption: 'The order flow, end to end.' },
  ],
}
