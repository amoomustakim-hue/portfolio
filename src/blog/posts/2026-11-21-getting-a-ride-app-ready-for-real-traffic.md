---
title: Getting a ride app ready for real traffic
date: 2026-11-21
summary: A week of the unglamorous work on SheDrives' backend: rate limits that suit Nigerian mobile networks, a database that says "busy" instead of falling over, backups that are restored every night, and keeping drivers' whereabouts private.
tags: SheDrives, Backend, Security, Reliability
---

Most of what I merged on SheDrives this week will never be seen by a rider. It's the part of the work that decides whether the app is still standing on a busy Friday night, and whether the people using it are safe while it is.

## Rate limits that fit how Nigeria gets online

Rate limits usually count requests per IP address. That breaks here. Nigerian mobile networks put many people behind one public address, so a limit per address means one busy phone can lock out everyone else on the same network.

So limits now count per signed-in session, with a high ceiling per address behind them as a backstop. The ceiling is there because a session limit has a catch: the token is read before anyone checks it, so a made-up token on every request would otherwise get a fresh allowance every time.

The same catch applies to the routes that run before anyone is signed in, like asking for a sign-in code. Every one of those codes is a WhatsApp message the business pays for. Those routes now always count per address, whatever the request claims to be, and each phone number keeps its own limit on top: five codes an hour, 45 seconds apart, five tries per code.

## A database that says "busy" instead of falling over

Three small changes made the server much harder to knock over:

- **Time limits:** every query and every open transaction now has one, so a single slow query can't hold a connection forever.
- **A clear answer when overloaded:** when the database is overwhelmed, people get "SheDrives is busy, try again in a moment", and the pages quietly retry reads twice before saying so.
- **Surviving dropped connections:** a connection dropped by a database restart no longer brings the whole server down with it. That one was a single missing error listener.

## Backups you have actually restored

A backup you've never restored is a guess. The database is now backed up every night, encrypted, to Cloudflare R2, and then the same job restores that backup into a throwaway database and checks its row counts against the live one. A backup that can't be restored fails the job that same night, and I get an email.

Alerts got the same treatment across the board:

- **What raises one:** the WhatsApp account having problems, sign-in codes not being delivered, a payment notification that fails its signature check, and staff being locked out.
- **Where they go:** each alert also goes to Sentry.
- **What to do:** a short incident runbook says what to do for each one.

## Keys, passwords and documents

A few changes in this area:

- **Encryption keys:** secrets stored by the app, such as drivers' bank details, are encrypted with versioned keys. Each value records which key made it, and one command re-encrypts everything when the key changes.
- **Staff passwords:** they use stronger settings, the hashing runs off the main thread, and old hashes are upgraded the next time each person signs in.
- **Driver documents:** an upload is judged by its own first bytes, never by the name or type the phone claims. Once a document is safely in cloud storage and reads back identical, the copy on the server's disk is deleted.

## Drivers' whereabouts stay private

This week riders also got a Drivers tab and the option to choose their driver, so riders now see drivers' names before a ride. That raised a question worth getting right: how much does a list like that give away about where a driver is?

If a list shows a driver's exact distance from a point the rider chooses, a few requests from different points are enough to pin her down. The same goes for watching where she drops off the list as the pickup moves. For a service built around women drivers, that matters a lot.

So both lists now work everything out from the centre of the grid square she's in, about 550 metres across. That covers who is listed, in what order, how far, how long and the price. The most anyone can learn is the square. Her exact position is only used for dispatch, once she has a ride.

The tests do what an attacker would. They measure from five points, and binary-search for the exact spot where she drops off the list. Then they check that moving her around inside her square changes none of the answers.

## What I'd tell myself at the start of the week

Write the attack before the fix. Both security fixes this week came from reviewing my own earlier changes, and in both cases the most convincing evidence was a test that failed before the fix and passed after it.
