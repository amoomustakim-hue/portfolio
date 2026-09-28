import type { DishKind } from './Dish'

export type Message =
  | { id: string; from: 'me' | 'them'; kind: 'text'; text: string }
  | { id: string; from: 'them'; kind: 'menu' }
  | { id: string; from: 'them'; kind: 'cart' }
  | { id: string; from: 'them'; kind: 'paid' }
  | { id: string; from: 'them'; kind: 'track' }

export const MENU: { kind: DishKind; name: string; price: string; kitchen: string }[] = [
  { kind: 'jollof', name: 'Smoky jollof + chicken', price: '₦4,800', kitchen: 'Mama Put, Yaba' },
  { kind: 'suya', name: 'Beef suya, extra yaji', price: '₦3,200', kitchen: 'Mallam Isa' },
  { kind: 'dodo', name: 'Dodo, double portion', price: '₦1,500', kitchen: 'Mama Put, Yaba' },
  { kind: 'pepperSoup', name: 'Goat pepper soup', price: '₦3,900', kitchen: 'The Pot, Sabo' },
]

export const SCRIPT: Message[] = [
  { id: 'm1', from: 'me', kind: 'text', text: 'I’m craving something spicy tonight' },
  { id: 'm2', from: 'them', kind: 'text', text: 'Say less. Here’s what’s hot near you in Yaba:' },
  { id: 'm3', from: 'them', kind: 'menu' },
  { id: 'm4', from: 'me', kind: 'text', text: 'Smoky jollof + chicken, please' },
  { id: 'm5', from: 'them', kind: 'cart' },
  { id: 'm6', from: 'them', kind: 'paid' },
  { id: 'm7', from: 'them', kind: 'track' },
]

/** The four beats of the flow, and how many messages each one reveals. */
export const STEPS = [
  { index: '01', title: 'Say it', body: 'Type what you want in plain words — no search bars, no categories.', upTo: 1 },
  { index: '02', title: 'Pick', body: 'Nearby kitchens answer as a swipeable menu inside the chat.', upTo: 3 },
  { index: '03', title: 'Pay', body: 'The cart and checkout arrive as a message. One tap, receipt stays in the thread.', upTo: 6 },
  { index: '04', title: 'Track', body: 'Your rider’s progress lands as replies until the knock on the door.', upTo: 7 },
]
