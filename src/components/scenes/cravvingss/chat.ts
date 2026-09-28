/**
 * The Cravvingss order flow as it really runs on WhatsApp — copy taken from
 * the live product. Rendered both as DOM (the case-study flow) and onto the
 * 3D phone's screen texture.
 */
export type Message = {
  id: string
  from: 'me' | 'them'
  /** First line is set in bold when `title` is true. */
  lines: string[]
  title?: boolean
  link?: string
  time: string
}

export const SCRIPT: Message[] = [
  { id: 'm1', from: 'me', lines: ['Jollof rice + chicken from Olas kitchen, please'], time: '22:27' },
  {
    id: 'm2',
    from: 'them',
    title: true,
    lines: ['✅ Order confirmed!', 'Olas kitchen has your order and will confirm it shortly. We’ll keep you posted right here.'],
    time: '22:28',
  },
  { id: 'm3', from: 'them', lines: ['🍳 Olas kitchen accepted your order — your food is being prepared.'], time: '22:28' },
  { id: 'm4', from: 'them', lines: ['🛎️ Your food is ready! We’re getting a courier to it now.'], time: '22:28' },
  {
    id: 'm5',
    from: 'them',
    lines: [
      '🛵 A courier is on it — heading to Olas kitchen to pick up your order.',
      '🔐 Your delivery code is 9368. Give it to the courier only when your food is in your hands.',
      '📍 Track it live:',
    ],
    link: 'cravvingss.shop/track/cms0vrfd…',
    time: '22:29',
  },
  { id: 'm6', from: 'them', lines: ['📦 Picked up! Your order is on its way.'], time: '22:29' },
  { id: 'm7', from: 'them', lines: ['🏁 Your courier is almost with you — get ready!'], time: '22:36' },
  { id: 'm8', from: 'them', lines: ['🎉 Delivered — enjoy your meal! Thanks for ordering with Cravvingss.'], time: '22:37' },
]

/** The beats of the product, and how many messages each one reveals. */
export const STEPS = [
  { index: '01', title: 'Order', body: 'Customers order on WhatsApp. No app, no sign-up — just a chat.', upTo: 1 },
  { index: '02', title: 'Pay', body: 'Kitchens take payment in the thread and get paid automatically.', upTo: 2 },
  { index: '03', title: 'Cook', body: 'The kitchen runs its menu and updates the order from the same chat.', upTo: 4 },
  { index: '04', title: 'Ride', body: 'Riders pick up work near them. A delivery code and live tracking keep it honest.', upTo: 6 },
  { index: '05', title: 'Eat', body: 'Every step arrives as a message, right up to the door.', upTo: 8 },
]
