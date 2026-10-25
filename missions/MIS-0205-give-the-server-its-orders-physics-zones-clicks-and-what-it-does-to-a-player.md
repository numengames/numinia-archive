---
id: "MIS-205"
uid: ""
title: "Give the server its orders: physics, zones, clicks and what it does to a player"
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
budget_usd: 7.65
budget_minutes: 45
executor: agent
assigned_to: "ursa"
completed: null
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-205 — Give the server its orders: physics, zones, clicks and what it does to a player

> **Summary:** A parent mission. Its children are the 9 cards on the
> Hermes boards whose title starts with `MIS-205 · `; each becomes one pull
> request, budgeted on its own when it opens.
> **Epistemic:** What the boards held on 2026-10-25 for this area, gathered
> into one mission so that the archive shows the work the boards carry.
> **Pragmatic:** Pick a card titled `MIS-205 · …`, seal its weight, open its
> pull request.
> **Audience:** Agents · Oracles

---

## 1. Story

As someone who makes a world, I want the server to decide collisions, zones, teleports and clicks, so that nobody can cheat and every world can reuse the same pieces.

---

## 2. Scope

Mesh collision from the GLB, terrain height, trigger zones and raycasts on the server, teleport, freeze, push, seats and flying with permission, chat commands, clicks that open links, the active heartbeat and a spatial grid for solids.

Repositories: numinia-engine. A parent: each child card is one pull request in one
repository.

### Out of scope

Movement feel in VR (the comfort mission).

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-205 · …` is open on the Hermes boards — today 9 are open
- [ ] A player cannot walk through a GLB scene's walls — today they can
- [ ] A world can teleport, freeze or seat a player through a server order — today only the client moves the player

---

## 4. Budget

**Weight — how much thinking it needs**
- Sealed per child card when it opens; a parent has no card of its own.
- Process: Sonnet by default, about $7.65 (9 cards × $0.85, the
  median finished card of the boards).

**Time — how much work there is**
- 45 minutes of agent work (9 cards × 5, the median finished
  card), plus the Oracle's reviews.
- Biggest risk: cards that wait for the Oracle or for a real device.

---

## 5. What we learned

---

## 6. Invoice
