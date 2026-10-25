---
id: "MIS-277"
uid: ""
title: "Back up the open-worlds machine nightly and confirm sizing"
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

priority: high
weight: 3
model_planned: sonnet
budget_usd: 3.00
budget_minutes: 14
executor: agent
assigned_to: "ursa"
completed: null
parent_mission: "MIS-216"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-277 — Back up the open-worlds machine nightly and confirm sizing

> **Summary:** A child of MIS-216. Its 3 cards on the Hermes board
> `numen-games` carry the title prefix `MIS-277 · `.
> **Epistemic:** One thing a person notices, cut from a parent that was too big.
> **Pragmatic:** Take its cards in order; the Oracle owns the mission.
> **Audience:** Agents · Oracles

---

## 1. Story

As an operator, I want nightly backups and verified release assumptions, so that the servers are safe and rightly sized.

---

## 2. Scope

The 3 cards titled `MIS-277 · …` on the board `numen-games`, in the repository
numengames-web.

### Out of scope

The rest of MIS-216: its other children.

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-277 · …` is open on the Hermes boards — today 3 are open
- [ ] A nightly backup timer with 14-day retention exists on open-worlds/machine — today none exists
- [ ] release.py's three assumptions are verified on open-1 and the VPS-3 OVH load test confirms the Large size — today both are unverified

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 3, from the split (one agent's call; the team votes it with cards when weight ≥ 3).
- Process: sonnet, about $3.00 (3 cards × $1.00, the median card of weight 3).

**Time — how much work there is**
- 14 minutes (3 cards × 4.6 min, calibration round 1).

---

## 5. What we learned

---

## 6. Invoice
