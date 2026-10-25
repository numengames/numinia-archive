---
id: "MIS-237"
uid: ""
title: "Make jump and touch controls work on a phone without overlaps"
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
weight: 5
model_planned: sonnet
budget_usd: 7.50
budget_minutes: 45
executor: agent
assigned_to: "ursa"
completed: null
parent_mission: "MIS-203"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-237 — Make jump and touch controls work on a phone without overlaps

> **Summary:** A child of MIS-203. Its 6 cards on the Hermes board
> `motor-vr` carry the title prefix `MIS-237 · `.
> **Epistemic:** One thing a person notices, cut from a parent that was too big.
> **Pragmatic:** Take its cards in order; the Oracle owns the mission.
> **Audience:** Agents · Oracles

---

## 1. Story

As a phone player, I want working touch controls, so that I can jump and move without buttons blocking each other.

---

## 2. Scope

The 6 cards titled `MIS-237 · …` on the board `motor-vr`, in the repository
numinia-engine.

### Out of scope

The rest of MIS-203: its other children.

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-237 · …` is open on the Hermes boards — today 6 are open
- [ ] Jump responds while walking with the joystick and the touch HUD does not overlap in portrait or landscape — today Jump ignores presses while walking and the HUD overlaps
- [ ] The bottom sheet is not covered by Jump/Wave/Dance, a corner button returns to the city, the layout holds at dpr 2 or less, and AR in Brave asks for permission — today buttons cover the sheet and Brave says it cannot request permission

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 5, from the split (one agent's call; the team votes it with cards when weight ≥ 3).
- Process: sonnet, about $7.50 (6 cards × $1.25, the median card of weight 5).

**Time — how much work there is**
- 45 minutes (6 cards × 7.5 min, calibration round 1).

---

## 5. What we learned

---

## 6. Invoice
