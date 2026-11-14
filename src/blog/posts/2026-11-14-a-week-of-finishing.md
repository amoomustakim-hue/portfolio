---
title: A week of finishing things
date: 2026-11-14
summary: SheDrives' app got its last screens, Cravvingss moved its backend onto its own server, and the Cravvingss landing page was rebuilt from a screen recording.
tags: SheDrives, Cravvingss, Mobile app, Infrastructure
---

Some weeks are about starting. This one was about closing things off: around forty pull requests across two products, and most of them were the last piece of something.

## SheDrives: every app screen in one design

SheDrives is rides with women drivers in Nigeria, and it has three faces: a website, a WhatsApp bot people book through, and a rider and driver app. This week was mostly the app.

It started with the opening: the SheDrives wordmark typing itself out on an off-white pink ground, a welcome page that offers a phone number or Google, and a sign-in that doesn't feel like a form. Then the rider side: the home map with search inside a card that sits just above the keyboard, choosing a ride, the "finding your driver" screen, and a trips history you'd actually want to scroll through.

The driver side followed: a home screen with her earnings, the driver application in the same flowing style as the WhatsApp version, and plans she can renew from the app. One small decision I liked: a new driver's free week now shows up wherever she is, in the app, in WhatsApp and on the website, from the same server code, so all three always agree.

By Friday the last ten screens (settings, safety, help, saved places and the rest) were moved onto the same parts as everything else. Most of that was one file: once the shared title, card, row and button looked right, every screen built on them followed.

The sign-in code also changed how it's sent. It now goes out as WhatsApp's approved code message first, with a plain message only as a fallback. A plain message can look delivered and then fail quietly, and nobody should be stuck on a "check your WhatsApp" screen waiting for a code that isn't coming.

## Cravvingss: a server of its own

Cravvingss runs a whole food business in one chat: kitchens take orders, payments and riders on WhatsApp. Its backend moved onto its own server this week, in phases: an audit of what was running, hardening, the data, a verified restore, then the switch. It now deploys on push, backs itself up off-site, and sends an alert to my phone if anything goes down.

The chat got simpler too. It answers greetings, order tracking and order history directly, without calling the model, which makes those replies instant. Finding a kitchen still happens in the chat, but ordering itself moved to the kitchen's menu page, where it's easier to see everything at once.

## The Cravvingss landing page, from a recording

The other half of the week was the Cravvingss landing page, rebuilt from a screen recording of a site I liked. That meant reading the recording frame by frame rather than guessing: how the icons pop in one at a time, fly into the phone as you scroll, and how each section fades into the next instead of meeting it at a hard line. It took more than one pass to get right, and that was the lesson: watch the reference properly before building.

## Next

On SheDrives, the app screens are done, so next is push notifications for drivers, so a ride request reaches her phone even when it's locked.
