---
id: "MIS-215"
uid: ""
title: "Keep the four sites' repositories and CI healthy"
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
budget_usd: 7.65
budget_minutes: 45
executor: agent
assigned_to: "ursa"
completed: null
sub_missions: ["MIS-270", "MIS-271", "MIS-272", "MIS-273"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-215 — Keep the four sites' repositories and CI healthy

> **Summary:** A parent mission, split into 4 child missions
> (MIS-270, MIS-271, MIS-272, MIS-273); each child holds the board cards
> titled with its own number.
> **Epistemic:** What the boards held on 2026-10-25 for this area, gathered
> into one mission so that the archive shows the work the boards carry.
> **Pragmatic:** Pick a card titled `MIS-215 · …`, seal its weight, open its
> pull request.
> **Audience:** Agents · Oracles

---

## 1. Story

As anyone who opens a pull request on one of our sites, I want real CI, formatting and the same files everywhere, so that a green check means the change is safe.

---

## 2. Scope

Real CI for pull requests to «tren» branches, formatting and lint enforced on numengames-web, Dependabot's cool-down, the rollback workflow's shell injection, the PR template's checkboxes, missing community files in numinia-assets.

Repositories: numinia-web · numengames-web · numinia-assets. A parent: each child card is one pull request in one
repository.

### Out of scope

Each site's features.

---

## 3. Acceptance criteria

- [ ] Its 4 child missions are done — today none is
- [ ] Pull requests to «tren/*» branches run the full CI — today they do not
- [ ] numengames-web's CI fails on unformatted code — today lint does not block

---

## 4. Budget

**Weight — how much thinking it needs**
- Sealed per child card when it opens; a parent has no card of its own.
- Process: Sonnet by default, about $7.65 (9 cards × $0.85, the
  median finished card of the boards).

**Time — how much work there is**
- 45 minutes of agent work (9 cards × 5, the median finished
  card), plus the Oracle's reviews.
- Biggest risk: cards that wait for the Oracle or for a real device.

---

## 5. What we learned

---

## 6. Invoice
