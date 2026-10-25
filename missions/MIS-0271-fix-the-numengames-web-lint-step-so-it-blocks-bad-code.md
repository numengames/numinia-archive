---
id: "MIS-271"
uid: ""
title: "Fix the numengames-web lint step so it blocks bad code"
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

priority: low
weight: 2
model_planned: haiku
budget_usd: 0.42
budget_minutes: 4
executor: agent
assigned_to: "ursa"
completed: null
parent_mission: "MIS-215"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-271 — Fix the numengames-web lint step so it blocks bad code

> **Summary:** A child of MIS-215. Its 1 cards on the Hermes board
> `numen-games` carry the title prefix `MIS-271 · `.
> **Epistemic:** One thing a person notices, cut from a parent that was too big.
> **Pragmatic:** Take its cards in order; the Oracle owns the mission.
> **Audience:** Agents · Oracles

---

## 1. Story

As a maintainer, I want lint to block, so that unformatted code does not merge.

---

## 2. Scope

The 1 cards titled `MIS-271 · …` on the board `numen-games`, in the repository
numengames-web.

### Out of scope

The rest of MIS-215: its other children.

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-271 · …` is open on the Hermes boards — today 1 are open
- [ ] pnpm run format is applied and the Lint step blocks in numengames-web CI — today lint does not block
- [ ] A badly formatted PR fails CI — today unverified

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 2, from the split (one agent's call; the team votes it with cards when weight ≥ 3).
- Process: haiku, about $0.42 (1 cards × $0.42, the median card of weight 2).

**Time — how much work there is**
- 4 minutes (1 cards × 3.7 min, calibration round 1).

---

## 5. What we learned

---

## 6. Invoice
