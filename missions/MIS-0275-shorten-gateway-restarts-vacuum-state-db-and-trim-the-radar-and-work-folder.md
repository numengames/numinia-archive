---
id: "MIS-275"
uid: ""
title: "Shorten gateway restarts, vacuum state.db and trim the radar and work folder"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-25T16:00:00Z"
updated: "2026-10-25T16:00:00Z"
author: "ursa"
owner: "oracle"
section: "Operations"
tags: [missions, boards, child]
license: "CC0-1.0"

priority: medium
weight: 5
model_planned: sonnet
budget_usd: 5.00
budget_minutes: 30
executor: agent
assigned_to: "ursa"
completed: null
parent_mission: "MIS-216"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-275 — Shorten gateway restarts, vacuum state.db and trim the radar and work folder

> **Summary:** A child of MIS-216. Its 4 cards on the Hermes board
> `hermes-mejora` carry the title prefix `MIS-275 · `.
> **Epistemic:** One thing a person notices, cut from a parent that was too big.
> **Pragmatic:** Take its cards in order; the Oracle owns the mission.
> **Audience:** Agents · Oracles

---

## 1. Story

As Pablo, I want Hermes cheaper and lighter, so that restarts do not cut crons and costs stay low.

---

## 2. Scope

The 4 cards titled `MIS-275 · …` on the board `hermes-mejora`, in the repository
hermes-mejora.

### Out of scope

The rest of MIS-216: its other children.

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-275 · …` is open on the Hermes boards — today 4 are open
- [ ] Gateway restarts are shorter and do not cut crons, and VACUUM of state.db runs during the gateway stop — today restarts are long and cut crons
- [ ] radar_scan.py filters by minimum amount/CPV before waking the agent and work/_sueltos-20261018 is deleted after 25-10 if unreferenced — today the agent wakes for every hit and the folder remains

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 5, from the split (one agent's call; the team votes it with cards when weight ≥ 3).
- Process: sonnet, about $5.00 (4 cards × $1.25, the median card of weight 5).

**Time — how much work there is**
- 30 minutes (4 cards × 7.5 min, calibration round 1).

---

## 5. What we learned

---

## 6. Invoice
