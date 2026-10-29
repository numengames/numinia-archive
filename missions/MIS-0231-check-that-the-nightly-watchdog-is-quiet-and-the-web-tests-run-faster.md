---
id: "MIS-231"
uid: ""
title: "Check that the nightly watchdog is quiet and the web tests run faster"
type: mission
status: in-progress
version: "0.1.0"
created: "2026-10-25T16:00:00Z"
updated: "2026-10-29T09:25:00Z"
in_review_at: "2026-10-27T03:30:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [missions, boards, child]
license: "CC0-1.0"

priority: low
weight: 2
model_planned: haiku
budget_usd: 0.84
budget_minutes: 7
executor: agent
assigned_to: "ursa"
completed: null
parent_mission: "MIS-202"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-231 — Check that the nightly watchdog is quiet and the web tests run faster

> **Summary:** A child of MIS-202. Its 2 cards on the Hermes board
> `numinia-com` carry the title prefix `MIS-231 · `.
> **Epistemic:** One thing a person notices, cut from a parent that was too big.
> **Pragmatic:** Take its cards in order; the Oracle owns the mission.
> **Audience:** Agents · Oracles

---

## 1. Story

As a maintainer, I want the nightly watchdog and tests verified, so that alerts and CI time can be trusted.

---

## 2. Scope

The 2 cards titled `MIS-231 · …` on the board `numinia-com`, in the repository
numinia-web.

### Out of scope

The rest of MIS-202: its other children.

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-231 · …` is open on the Hermes boards — today 2 are open
- [ ] The nightly watchdog of numinia.com opens no alert after #179 and #180 — today unverified
- [ ] The duration of numinia-web tests is measured and a list of tests to run only on touched code exists — today test time is unmeasured

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 2, from the split (one agent's call; the team votes it with cards when weight ≥ 3).
- Process: haiku, about $0.84 (2 cards × $0.42, the median card of weight 2).

**Time — how much work there is**
- 7 minutes (2 cards × 3.7 min, calibration round 1).

---

## 5. What we learned

---

## 6. Invoice
