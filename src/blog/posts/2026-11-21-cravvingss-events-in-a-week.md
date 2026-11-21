---
title: Building Cravvingss Events in a week
date: 2026-11-21
summary: Cravvingss grew a second product: food at events. Organisers sign up through WhatsApp, vendors pay for stalls, attendees order from every stall in one basket and one payment, and food is handed over by scanning a QR code.
tags: Cravvingss, Product, Payments, WhatsApp
---

Cravvingss runs a food business in one WhatsApp chat: kitchens take orders, payments and riders there. This week it grew a second product, Cravvingss Events. It's for food at festivals, fairs and pop-ups, where an organiser brings vendors together and hundreds of people want to eat at the same time.

Fourteen pull requests took it from a landing page to people ordering and collecting food. Here's how the pieces fit.

## Organisers start on WhatsApp

Anyone can say they're an organiser, so sign-up isn't an open form.

- **The invite:** you message the bot that you're organising an event, and it replies with a sign-up link. The link lasts one day and is tied to your WhatsApp number.
- **Forwarded links don't work:** the sign-up page verifies your number with a code before anything else, so someone else's link is useless to you.
- **The sign-up:** five steps, modelled on ticketing platforms: you, your event, how food is sold, getting paid, and review.

Step three is the real decision. An organiser can run a marketplace, with many vendors, a commission and a stall fee, and see a live preview of who gets what from each sale. Or they can choose "Just me", where their own kitchen is the only stall.

"Just me" turned out to be a nice bit of design. Making the organiser's kitchen an ordinary vendor with zero commission and zero stall fee meant every sale is paid exactly like any other vendor sale. Nothing further down needed a special case.

## Vendors, stalls and getting paid

- **Joining:** vendors apply to an event, the organiser approves them, and they pay the stall fee through Paystack.
- **The event page:** it leads with the food, a card per stall with signature dishes and prices. Each stall's menu uses the same menu page as every Cravvingss kitchen, switched to collect-at-the-stall instead of delivery.
- **Payout names:** organisers give their legal name, and the dashboard checks it against the name on their payout bank account. Withdrawals can be held when they don't match.

## One basket, one payment, every stall

This is the part I'm proudest of. At an event you don't want to queue to pay three times for jollof, suya and a drink.

1. **Scan:** you scan the QR poster at the event, which opens WhatsApp with the event already tagged.
2. **Get your link:** the bot replies with an "Order food" button that opens the event menu with your own link.
3. **Pay once:** you fill one basket across as many stalls as you like and pay once. That one Paystack charge is split straight to each vendor and the organiser.
4. **Queue:** each stall gets its own order and queue number, and one message lists them all.

Then a live page shows your place in each stall's line. The estimate comes from that stall's actual pace at this event, not a guess.

## Handing the food over

When an order is ready, you get a "Show my QR" button and a four-digit code as a backup.

On the vendor side, the dashboard's Events tab shows the queue as big numbered cards with "Next up" and a one-tap Ready. The "Scan to hand over" button keeps the camera running between scans, so a busy stall can go from one customer to the next. It flashes green or red for each scan and refuses another stall's order, an order that isn't ready, a wrong code or a repeat scan.

The scanner uses the browser's built-in barcode detector where there is one, and a JavaScript decoder where there isn't.

## The smallest bug of the week

While building ordering, I found that kitchen search had been splitting what you typed on the letter "s" instead of on spaces. The pattern was missing a single backslash. Its tests still passed, because they happened to match the whole search phrase. It's a good reminder to write at least one test that can only pass for the right reason.

## Next

Organisers have a dashboard with their earnings, a 14-day sales chart, their vendors and print-quality QR posters. The next step is a real event: everything above, under the load of a crowd that's hungry all at once.
