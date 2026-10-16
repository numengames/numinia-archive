---
id: "ADR-076"
uid: ""
title: "Every thing in a world carries a card and a spoken name; what has none is scenery"
type: adr
status: draft
version: "0.1.0"
created: "2026-10-16T10:55:00+00:00"
updated: "2026-10-16T10:55:00+00:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Technology"
tags: [decisions, adr, virtual-worlds, engine, accessibility, agents, cards, maps]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "Every thing the engine puts in a world — a placed object, a person of the world, a quest thing, an element of the environment — carries a card: its role, a spoken name, a short description, its state, its importance, its sound and the actions it offers. The same card is what a screen reader says, what the map draws and what an AI agent reads: making the engine accessible and making it native for AI is one piece of work. A thing without a name is scenery, declared on purpose, like an empty alt text; anything that can be used, linked or found must have a name, and the server refuses it otherwise. The map and the spoken list show only what the page already receives."
amends: []
related: ["STD-050", "STD-035", "ADR-075"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-076 — Every thing carries a card and a name

> **Summary:** Each thing in a world has a card with a spoken name, and the
> card serves three readers at once: the screen reader, the map and the AI
> agent. What has no name is scenery, said on purpose. Decided on 2026-10-15
> in the accessibility study and the first builder; written here so it can be
> changed.
> **Epistemic:** The Oracle accepted the accessibility study of 2026-10-15
> (after the Commit Conf talk) and the builder's rule that a thing that is
> not scenery needs a name. The finding that moved it is from Second Life:
> forty to fifty per cent of its objects had no name and it was never made
> accessible.
> **Pragmatic:** A feature that puts things in the world without a card does
> not load; a world with unnamed interactive things is not published; the
> map and the agents cost nothing extra because they read the same card.
> **Audience:** Agents · Oracles

---

## 1. Context

No web standard lets a screen reader see a 3D scene, and the system's reader
does not enter an immersive session: the engine has to be its own reader. The
study of 2026-10-15 found the same root in every accessible 3D system — each
thing carries a card, as Apple's accessibility component or ARIA on the web —
and the same failure where it was missing: in Second Life, with half the
objects unnamed, accessibility never arrived. At the same time the first AI
inhabitant needed to know what is around it, and `STD-050` says what an agent
may read: the same card, inside a fenced block of untrusted text.

The first builder met the question in practice: a builder places a crate — is
it a thing or decoration? The answer became a rule of the server.

## 2. Decision

1. **The card.** Every state entry a feature puts in the world declares a
   card: a role from a closed list (person, door, button, sign, object, place,
   exit, creature, point, screen, seat), a name, an optional description,
   its importance, a sound, the actions it offers and, when it can be used
   from nearby, the intent, the prompt and the reach. A feature whose things
   have no card, or whose intents have no spoken name, does not load.
2. **Scenery is declared, not implied.** A placed object is either named or
   marked scenery on purpose; the server refuses an unnamed object that is
   not scenery, with the reason: the name is what a screen reader says and
   what agents read. Scenery cannot be used, linked to or found by name.
3. **One card, three readers.** The spoken list of what is near, the map's
   markers (a shape and a colour per kind; never colour alone) and the
   senses of an AI agent are all built from the card. Nothing is written
   twice.
4. **Only what the page has.** The map and the spoken list show what the
   page already receives through the area of interest; nothing asks the
   server for anyone's position. Names above heads reach only the pages that
   draw that entity.

## 3. Alternatives considered

- **Accessibility as a later layer** (a separate description per world).
  Second Life's path; it never caught up. Rejected.
- **Names optional, agents read the model's file name.** Hashes are not
  names; rejected with the rule that scenery is a conscious choice.
- **A map served by the server** (everyone's position). Cheaper to draw,
  worse for privacy (`STD-035`); rejected.

## 4. Consequences

- Linking objects (`ADR-078`) can only target named things; the builder is
  asked to name a thing before it can be a target.
- A world with interactive things that have no name fails the publishing
  check, next to the flashing-light check.
- Every new feature declares its cards and spoken names before it ships; the
  catalogue the server sends is what the page, the reader and the agents
  learn from.

## 5. Status

Decided by the Oracle on 2026-10-15. Built in numinia-engine: cards on placed
objects, people of the world, quest things and environment elements; the
server's refusal of unnamed non-scenery; the map and minimap with typed
markers and the spoken list; the first agent reading cards inside the fenced
block. Pending: the engine as its own reader in headsets. Recorded here on
2026-10-16, pending the Oracle's acceptance on the pull request.
