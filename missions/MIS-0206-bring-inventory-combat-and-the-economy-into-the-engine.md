---
id: "MIS-206"
uid: ""
title: "Bring inventory, combat and the economy into the engine"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-25T15:30:00Z"
updated: "2026-10-25T15:30:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [missions, boards, parent]
license: "CC0-1.0"

priority: medium
model_planned: sonnet
budget_usd: 15.30
budget_minutes: 90
executor: agent
assigned_to: "ursa"
completed: null
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-206 — Bring inventory, combat and the economy into the engine

> **Summary:** A parent mission. Its children are the 18 cards on the
> Hermes boards whose title starts with `MIS-206 · `; each becomes one pull
> request, budgeted on its own when it opens.
> **Epistemic:** What the boards held on 2026-10-25 for this area, gathered
> into one mission so that the archive shows the work the boards carry.
> **Pragmatic:** Pick a card titled `MIS-206 · …`, seal its weight, open its
> pull request.
> **Audience:** Agents · Oracles

---

## 1. Story

As a player, I want to carry what I earn, fight creatures that fight back and spend what I gather, so that an adventure has stakes.

---

## 2. Scope

Inventory v1 (equip, confirm before dropping, items per adventure), combat on the server (creatures that move and hit, wounded and fallen states, end-to-end test), the economy simulator, the 3D dice, the Graboso clip recorder and the Asimov tribute — rebased and opened as pull requests.

Repositories: numinia-engine. A parent: each child card is one pull request in one
repository.

### Out of scope

New creatures' art beyond one procedural prototype.

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-206 · …` is open on the Hermes boards — today 18 are open
- [ ] A creature moves towards the player and hits, and the player can fall, decided by the server — today the creature stands still
- [ ] The inventory, combat, economy simulator, Graboso and Asimov branches are merged or closed — today they wait to be rebased

---

## 4. Budget

**Weight — how much thinking it needs**
- Sealed per child card when it opens; a parent has no card of its own.
- Process: Sonnet by default, about $15.30 (18 cards × $0.85, the
  median finished card of the boards).

**Time — how much work there is**
- 90 minutes of agent work (18 cards × 5, the median finished
  card), plus the Oracle's reviews.
- Biggest risk: cards that wait for the Oracle or for a real device.

---

## 5. What we learned

---

## 6. Invoice
