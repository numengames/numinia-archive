---
id: "MIS-245"
uid: ""
title: "Fight creatures in the engine: they move, hit back and hurt"
type: mission
status: in-progress
version: "0.1.0"
created: "2026-10-25T16:00:00Z"
updated: "2026-10-27T03:30:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [missions, boards, child]
license: "CC0-1.0"

priority: high
weight: 8
model_planned: sonnet
budget_usd: 15.00
budget_minutes: 90
executor: agent
assigned_to: "ursa"
completed: null
parent_mission: "MIS-206"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-245 — Fight creatures in the engine: they move, hit back and hurt

> **Summary:** A child of MIS-206. Its 6 cards on the Hermes board
> `motor-vr` carry the title prefix `MIS-245 · `.
> **Epistemic:** One thing a person notices, cut from a parent that was too big.
> **Pragmatic:** Take its cards in order; the Oracle owns the mission.
> **Audience:** Agents · Oracles

---

## 1. Story

As a player, I want creatures that fight back, so that combat has stakes and feedback.

---

## 2. Scope

The 6 cards titled `MIS-245 · …` on the board `motor-vr`, in the repository
numinia-engine.

### Out of scope

The rest of MIS-206: its other children.

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-245 · …` is open on the Hermes boards — today 6 are open
- [ ] More creatures appear, the beast moves toward me and hits, and my hurt/fallen states live on the server — today the beast stands still and has no player states
- [ ] A real-browser test shows the creature, a hit and the −N, damage uses D6-by-Successes in the simulator, and a procedural background creature without GLB exists — today there is no such test or model

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 8, from the split (one agent's call; the team votes it with cards when weight ≥ 3).
- Process: sonnet, about $15.00 (6 cards × $2.50, the median card of weight 8). Opus rescues it if the review fails.

**Time — how much work there is**
- 90 minutes (6 cards × 15 min, calibration round 1).

---

## 5. What we learned

---

## 6. Invoice
