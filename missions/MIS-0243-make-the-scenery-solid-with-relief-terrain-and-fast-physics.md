---
id: "MIS-243"
uid: ""
title: "Make the scenery solid, with relief terrain and fast physics"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-25T16:00:00Z"
updated: "2026-10-25T16:00:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [missions, boards, child]
license: "CC0-1.0"

priority: high
weight: 8
model_planned: sonnet
budget_usd: 10.00
budget_minutes: 60
executor: agent
assigned_to: "ursa"
completed: null
parent_mission: "MIS-205"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-243 — Make the scenery solid, with relief terrain and fast physics

> **Summary:** A child of MIS-205. Its 4 cards on the Hermes board
> `motor-vr` carry the title prefix `MIS-243 · `.
> **Epistemic:** One thing a person notices, cut from a parent that was too big.
> **Pragmatic:** Take its cards in order; the Oracle owns the mission.
> **Audience:** Agents · Oracles

---

## 1. Story

As a player, I want solid scenery and terrain, so that I do not walk through walls or stutter in busy worlds.

---

## 2. Scope

The 4 cards titled `MIS-243 · …` on the board `motor-vr`, in the repository
numinia-engine.

### Out of scope

The rest of MIS-205: its other children.

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-243 · …` is open on the Hermes boards — today 4 are open
- [ ] GLB mesh collision stops me crossing the scenery and terrain has height on top of the physics — today scenery can be walked through and terrain is flat
- [ ] Zones trigger from the server with raycast and overlapSphere, and 2,000 solids cost under 16.4 ms per step through a spatial grid — today 2,000 solids cost 16.4 ms

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 8, from the split (one agent's call; the team votes it with cards when weight ≥ 3).
- Process: sonnet, about $10.00 (4 cards × $2.50, the median card of weight 8). Opus rescues it if the review fails.

**Time — how much work there is**
- 60 minutes (4 cards × 15 min, calibration round 1).

---

## 5. What we learned

---

## 6. Invoice
