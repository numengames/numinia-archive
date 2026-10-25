---
id: "MIS-211"
uid: ""
title: "Keep the engine repository healthy: strict types, checks on every PR, clear guides"
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
budget_usd: 8.50
budget_minutes: 50
executor: agent
assigned_to: "ursa"
completed: null
sub_missions: ["MIS-255", "MIS-256"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-211 — Keep the engine repository healthy: strict types, checks on every PR, clear guides

> **Summary:** A parent mission, split into 2 child missions
> (MIS-255, MIS-256); each child holds the board cards
> titled with its own number.
> **Epistemic:** What the boards held on 2026-10-25 for this area, gathered
> into one mission so that the archive shows the work the boards carry.
> **Pragmatic:** Pick a card titled `MIS-211 · …`, seal its weight, open its
> pull request.
> **Audience:** Agents · Oracles

---

## 1. Story

As an agent or a person working on the engine, I want strict types, checks on every pull request and guides that say which document rules, so that a change does not break what already works.

---

## 2. Scope

A strict TypeScript gate, checks on pull requests to any base, the engine's AGENTS.md citing the Summa, a README for AIs per world, the end-to-end test of the «Despertar» column, a clean load test of the server, the live development mode and a lighter engine skill.

Repositories: numinia-engine. A parent: each child card is one pull request in one
repository.

### Out of scope

Tests of each feature (they belong to its mission).

---

## 3. Acceptance criteria

- [ ] Its 2 child missions are done — today none is
- [ ] `tsc --noEmit` runs in the engine's checks and passes — today it is not run
- [ ] The engine's checks run on pull requests to every base branch — today they skip some

---

## 4. Budget

**Weight — how much thinking it needs**
- Sealed per child card when it opens; a parent has no card of its own.
- Process: Sonnet by default, about $8.50 (10 cards × $0.85, the
  median finished card of the boards).

**Time — how much work there is**
- 50 minutes of agent work (10 cards × 5, the median finished
  card), plus the Oracle's reviews.
- Biggest risk: cards that wait for the Oracle or for a real device.

---

## 5. What we learned

---

## 6. Invoice
