---
title: From a WhatsApp bot to the app stores
date: 2026-11-21
summary: SheDrives' app learned to hear about rides the moment they change, to reach a locked phone, and to get through Apple and Google's review. Riders can also now choose their driver.
tags: SheDrives, Mobile app, React Native, Product
---

SheDrives started as a WhatsApp bot and a booking page. This week the phone app caught up with it, and in a few places got ahead.

## Hearing about a ride the moment it changes

Until now the app asked the server every few seconds whether anything had happened. That's simple and it works, but a driver waits up to a full interval to see a new ride, and every open app keeps asking even when nothing has changed.

Now the app keeps a WebSocket open. The interesting part is where the news comes from:

- **The trigger:** a trigger in Postgres fires whenever a ride or a ride offer changes, with the ids of the people concerned. Every server instance is listening.
- **What gets sent:** nothing private. The server only tells the right phones that something changed.
- **What the app does:** it fetches the details with its normal requests, so every permission check stays exactly where it already was.

A few details I cared about:

- **The sign-in token goes in the first message,** never in the address, so it never ends up in a log.
- **The session is checked again every few minutes,** so a phone that has been signed out elsewhere is dropped.
- **Polling stays,** just slower, as the fallback for patchy networks.

## Reaching a locked phone

A driver can't be expected to stare at the app waiting for work, so ride requests and ride updates now arrive as push notifications as well as on WhatsApp.

- **Same moments as WhatsApp:** they go out at the same points as the WhatsApp messages, and only when that message is new.
- **Nothing personal on the lock screen:** the wording is short and has no names, addresses or amounts, because anyone can read a lock screen.
- **Failures stay separate:** a push that fails never affects the WhatsApp message.

## Getting through store review

Shipping to TestFlight and Google Play's internal testing track meant the usual setup: store IDs, build profiles, the real app icon, the Firebase file Android needs for push, and written release steps.

The less usual problem was sign-in. SheDrives signs people in with a code sent on WhatsApp, and Apple and Google's reviewers can't receive one. So there are now review accounts that sign in with a fixed code instead, set in the server's settings, never in the code. They're fenced off:

- **Same limits:** the normal sign-in limits still apply, five tries per code and five codes an hour.
- **Hard to guess:** the server refuses to start with a code that's easy to guess, like 123456.
- **Kept apart from real people:** the review rider's rides only ever reach the review driver, and real riders never see the review driver.
- **Visible to staff:** System check flags the accounts as switched on, as a reminder to remove them after the review.

## Choosing your driver

The biggest product change of the week: instead of the nearest driver being picked for you, you can see who's available and choose.

- **Who you see:** each driver with her first name, rating, car and ride type, and her own price, because her trip to your pickup is part of the fare.
- **When she's asked:** only she gets the request. If she declines or can't take it, you're told and choose again; nobody else is asked behind your back.
- **The Drivers tab:** shows who drives with SheDrives, online and offline, grouped by ride type, and you can tap one to book her.

Staff can switch between this and automatic matching in the dashboard's settings.

Riders see real names here, so how much the list gives away about where a driver is mattered. I wrote about that in [Getting a ride app ready for real traffic](/blog/getting-a-ride-app-ready-for-real-traffic).

## The booking page, redesigned

The WhatsApp booking page followed a new reference design, rebuilt over several passes:

- **Layout:** a Home panel with the ride types, round icon navigation, and a driver profile screen.
- **Settings:** trips, saved places, help and legal links.
- **Ride types:** SheGo, SheElite and SheLuxury, now in the order the owner wanted.

Most of the time went into the small things you only notice when they're wrong: loading states, steady scrolling, and the map coming back once a driver has accepted.

## Next

With the store setup done, next is getting builds to testers, then watching how drivers actually use choose-your-driver and whether the live connection holds up on the networks they're really on.
