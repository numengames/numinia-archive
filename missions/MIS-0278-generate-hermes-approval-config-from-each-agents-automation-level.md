---
id: "MIS-278"
uid: ""
title: "Generate Hermes approval config from each agent's automation level"
type: mission
status: done
version: "0.2.0"
created: "2026-10-25T16:00:00Z"
updated: "2026-10-29T09:25:00Z"
author: "ursa"
owner: "oracle"
section: "Operations"
tags: [missions, boards, child]
license: "CC0-1.0"

priority: medium
weight: 3
model_planned: sonnet
budget_usd: 1.00
budget_minutes: 5
executor: agent
assigned_to: "ursa"
completed: "2026-10-29T09:25:00Z"
parent_mission: "MIS-216"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-278 — Generate Hermes approval config from each agent's automation level

> **Summary:** A child of MIS-216. Its 1 cards on the Hermes board
> `numinia-org` carry the title prefix `MIS-278 · `.
> **Epistemic:** One thing a person notices, cut from a parent that was too big.
> **Pragmatic:** Take its cards in order; the Oracle owns the mission.
> **Audience:** Agents · Oracles

---

## 1. Story

As Pablo, I want approvals generated from agent data, so that permissions stay consistent.

---

## 2. Scope

The 1 cards titled `MIS-278 · …` on the board `numinia-org`, in the repository
numinia-archive.

### Out of scope

The rest of MIS-216: its other children.

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-278 · …` is open on the Hermes boards — today 1 are open
- [x] The Hermes approvals config is generated from each agent's automation_level — today it is written by hand
- [x] The generated config matches each agent's level — today unverified

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 3, from the split (one agent's call; the team votes it with cards when weight ≥ 3).
- Process: sonnet, about $1.00 (1 cards × $1.00, the median card of weight 3).

**Time — how much work there is**
- 5 minutes (1 cards × 4.6 min, calibration round 1).

---

## 5. What we learned

**Closure proposed 2026-10-29 by ursa, for the Oracle's word.** Evidence: numinia-archive #772 (merged 2026-10-28, d6e16d0b): machine/scripts/generate-hermes-approvals.mjs. The criterion about open cards on the Hermes boards was not checked by ursa and stays unticked.

---

## 6. Invoice
