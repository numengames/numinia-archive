---
id: "ADR-073"
uid: ""
title: "The engine is for a social city with play, events, escape rooms and combat; its first product is a one-room escape room, one group at a time"
type: adr
status: draft
version: "0.1.0"
created: "2026-10-16T10:55:00+00:00"
updated: "2026-10-16T10:55:00+00:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Technology"
tags: [decisions, adr, virtual-worlds, engine, product, escape-rooms, combat]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "Numinia's own web 3D engine serves a persistent social city with narrative play, events and escape rooms, and with dangers: zones where the world or the zone declares combat (capture the flag, training grounds, powers to pick up, fights). It is not built around precision shooting. The first thing it ships is an escape room of one room, built inside the world without touching files, played by one group at a time — the world is theirs while they play and is reset when they finish. After it come the tabletop role-playing table, a turn-based mini-game kit, and only then groups and copies of a zone."
amends: []
related: ["ADR-069", "ADR-070", "ADR-071", "PRI-015", "STD-030"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-073 — What the engine is for, and what it builds first

> **Summary:** The engine's purpose was decided on 2026-10-13 and widened on
> 2026-10-16: a social city with play, events, escape rooms and now combat
> zones. The first product is a one-room escape room played by one group at a
> time; the role-playing table, a turn kit and groups with copies follow in
> that order. Until now this lived only in the engine study; it is written here
> so the Oracle can change it.
> **Epistemic:** The Oracle's rulings of 2026-10-13 («ciudad social
> persistente…») and 2026-10-16 («hay combate»; «un grupo cada vez»; the
> order). The reasons for the order are Ursa's valuation of the Oracle's
> catalogue of ideas, which he accepted.
> **Pragmatic:** Decides what the engine optimises for and what waits. Nothing
> here is code; what the engine already does is listed under Status.
> **Audience:** Agents · Oracles

---

## 1. Context

Numinia builds its own engine for 3D worlds in the browser — one link for
desktop, phones and VR headsets, up to a thousand people in one space, nothing
to install. On 2026-10-13 the Oracle settled what it is for: a persistent
social city with narrative play, events and escape rooms, explicitly «not a
precision shooter». On 2026-10-16, valuing a catalogue of world-building
ideas, he changed that last clause: the city has dangers and combat zones, and
the engine has to support them.

The same day he chose what to build first among escape rooms, a tabletop
role-playing table, turn-based mini-games, and groups with copies of a zone.
Two facts drove the choice: an escape room is what is sold to organisations
(`ADR-070` charges a world by the day), and the smallest cut of the object
model that an escape room needs is the one the table and the mini-games reuse.
A second question followed — one group at a time, or several groups each in a
copy — because copies of a zone and groups do not exist yet and are the
largest piece left to build.

## 2. Decision

1. **Purpose.** The engine serves a persistent social city with narrative
   play, events and escape rooms, and with dangers: zones where the world or
   the zone declares combat — capture the flag, training grounds, powers to
   pick up, fights between people. It is not designed around precision
   shooting; where combat needs its own pace (fighting games, races) it gets
   arenas apart from the city, later.
2. **First product.** An escape room of one room, built inside the world by
   people without touching any file: a placed object says what it is, a «what
   it does» tab holds its rules, and a «try from here» button resets the
   builder's own progress. The rules of the object model are `ADR-078`.
3. **One group at a time.** The first escape room is played by one group: the
   world is theirs while they play and is reset when they finish. This fits
   renting a world by the day and needs neither groups nor copies.
4. **Order after it.** The role-playing table (seats, dice thrown by the
   server, the character sheet, voice for the table only); a turn-based kit
   proved with rock-paper-scissors; then groups and copies of a zone, behind
   which waiting rooms, matches with their own tick and per-group metrics
   line up.

## 3. Alternatives considered

- **Keep «no shooter».** Rejected by the Oracle on 2026-10-16: the city has
  dangers; what stays out is designing the whole engine around precision
  shooting.
- **Several groups at once from the start.** Each group in its own copy of
  the room. It would put the largest piece (groups and copies) before
  everything else; rejected for the first product, kept as the fourth step.
- **The role-playing table first.** It is the most Numinia-like thing, but it
  needs the server to seat people and the same object model the escape room
  forces; second, not first.

## 4. Consequences

- The engine's queue is ordered by this decision; a client who needs two
  groups at once moves groups and copies forward, knowingly.
- Combat needs the server to act on a player (teleport, seat, speed, health)
  before any zone can change the rules inside it; that piece moves up right
  after the escape room's rules (`ADR-078`).
- Worlds rented by organisations are the escape room's home; the shared city
  comes later and is governed by `ADR-078`'s layers.
- `STD-030` still lacks the words world, zone, instance, portal, object, owner,
  match and room; this decision uses them in their plain sense until the
  vocabulary catches up.

## 5. Status

Decided by the Oracle on 2026-10-13 (purpose) and 2026-10-16 (combat, first
product, one group at a time, order). Recorded here on 2026-10-16, pending the
Oracle's acceptance on the pull request. Nothing of the escape room is built
yet; the engine already runs a one-zone world with placed objects, quests and
people of the world.
