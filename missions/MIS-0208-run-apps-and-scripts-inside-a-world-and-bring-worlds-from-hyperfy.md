---
id: "MIS-208"
uid: ""
title: "Run apps and scripts inside a world, and bring worlds from Hyperfy"
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
budget_usd: 5.10
budget_minutes: 30
executor: agent
assigned_to: "ursa"
completed: null
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-208 — Run apps and scripts inside a world, and bring worlds from Hyperfy

> **Summary:** A parent mission. Its children are the 6 cards on the
> Hermes boards whose title starts with `MIS-208 · `; each becomes one pull
> request, budgeted on its own when it opens.
> **Epistemic:** What the boards held on 2026-10-25 for this area, gathered
> into one mission so that the archive shows the work the boards carry.
> **Pragmatic:** Pick a card titled `MIS-208 · …`, seal its weight, open its
> pull request.
> **Audience:** Agents · Oracles

---

## 1. Story

As someone who makes a world, I want to add small apps with their own script, safely and without restarting, and to bring my Hyperfy worlds, so that I do not start from zero.

---

## 2. Scope

The app format (app.json, main.ts, assets by hash), scripts in a SES sandbox with a CPU cap and hot reload, importing a Hyperfy world and .hyp apps, and a licence inventory of the pieces.

Repositories: numinia-engine. A parent: each child card is one pull request in one
repository.

### Out of scope

Porting each imported script by hand: it is marked «to port».

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-208 · …` is open on the Hermes boards — today 6 are open
- [ ] An app's script changes in a running world without a restart and cannot exceed its CPU cap — today scripts are not sandboxed
- [ ] A Hyperfy world's db.sqlite and assets import into a world folder — today there is no importer

---

## 4. Budget

**Weight — how much thinking it needs**
- Sealed per child card when it opens; a parent has no card of its own.
- Process: Sonnet by default, about $5.10 (6 cards × $0.85, the
  median finished card of the boards).

**Time — how much work there is**
- 30 minutes of agent work (6 cards × 5, the median finished
  card), plus the Oracle's reviews.
- Biggest risk: cards that wait for the Oracle or for a real device.

---

## 5. What we learned

---

## 6. Invoice
