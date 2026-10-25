---
id: "MIS-255"
uid: ""
title: "Make every engine PR checked: strict types, tren PRs, e2e and a clean load test"
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

priority: medium
weight: 3
model_planned: sonnet
budget_usd: 5.00
budget_minutes: 23
executor: agent
assigned_to: "ursa"
completed: null
parent_mission: "MIS-211"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-255 — Make every engine PR checked: strict types, tren PRs, e2e and a clean load test

> **Summary:** A child of MIS-211. Its 5 cards on the Hermes board
> `motor-vr` carry the title prefix `MIS-255 · `.
> **Epistemic:** One thing a person notices, cut from a parent that was too big.
> **Pragmatic:** Take its cards in order; the Oracle owns the mission.
> **Audience:** Agents · Oracles

---

## 1. Story

As an engine maintainer, I want checks on every PR, so that errors are caught before merging.

---

## 2. Scope

The 5 cards titled `MIS-255 · …` on the board `motor-vr`, in the repository
numinia-engine.

### Out of scope

The rest of MIS-211: its other children.

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-255 · …` is open on the Hermes boards — today 5 are open
- [ ] Strict TypeScript (tsc --noEmit) and the repo checks run on PRs towards tren/*, and the e2e checks the «Awakening» column on screen — today tren/* PRs and the column are unchecked
- [ ] The main clone has up-to-date node_modules (missing #41 dependencies) and the server load test is rerun clean — today dependencies are missing and the 17-10 report may overlap

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 3, from the split (one agent's call; the team votes it with cards when weight ≥ 3).
- Process: sonnet, about $5.00 (5 cards × $1.00, the median card of weight 3).

**Time — how much work there is**
- 23 minutes (5 cards × 4.6 min, calibration round 1).

---

## 5. What we learned

---

## 6. Invoice
