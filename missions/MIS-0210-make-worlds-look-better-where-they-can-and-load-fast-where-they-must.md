---
id: "MIS-210"
uid: ""
title: "Make worlds look better where they can and load fast where they must"
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

priority: low
model_planned: sonnet
budget_usd: 11.05
budget_minutes: 65
executor: agent
assigned_to: "ursa"
completed: null
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-210 — Make worlds look better where they can and load fast where they must

> **Summary:** A parent mission. Its children are the 13 cards on the
> Hermes boards whose title starts with `MIS-210 · `; each becomes one pull
> request, budgeted on its own when it opens.
> **Epistemic:** What the boards held on 2026-10-25 for this area, gathered
> into one mission so that the archive shows the work the boards carry.
> **Pragmatic:** Pick a card titled `MIS-210 · …`, seal its weight, open its
> pull request.
> **Audience:** Agents · Oracles

---

## 1. Story

As a visitor on any device, I want a world to look its best on mine and load quickly, so that a weak phone and a strong PC both get a good world.

---

## 2. Scope

Quality levels by device (post-processing, soft shadows), level of detail for models and people, the environment panel, a manifest per zone with hashes and caching, a client size gate of 300 kB gzipped, web panels in the world, and the research plans on adaptive quality and competitive mode.

Repositories: numinia-engine. A parent: each child card is one pull request in one
repository.

### Out of scope

Measuring on real devices (the devices mission).

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-210 · …` is open on the Hermes boards — today 13 are open
- [ ] The engine's checks fail when the client exceeds 300 kB gzipped — today there is no gate
- [ ] Distant VRM avatars cost one draw call each — today they cost their full mesh

---

## 4. Budget

**Weight — how much thinking it needs**
- Sealed per child card when it opens; a parent has no card of its own.
- Process: Sonnet by default, about $11.05 (13 cards × $0.85, the
  median finished card of the boards).

**Time — how much work there is**
- 65 minutes of agent work (13 cards × 5, the median finished
  card), plus the Oracle's reviews.
- Biggest risk: cards that wait for the Oracle or for a real device.

---

## 5. What we learned

---

## 6. Invoice
