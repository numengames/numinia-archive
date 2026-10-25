---
id: "MIS-202"
uid: ""
title: "Prove the engine on real devices: Quest, iPhone and Android"
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

priority: high
model_planned: sonnet
budget_usd: 24.65
budget_minutes: 145
executor: agent
assigned_to: "ursa"
completed: null
sub_missions: ["MIS-230", "MIS-231", "MIS-232", "MIS-233", "MIS-234", "MIS-235", "MIS-236"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-202 — Prove the engine on real devices: Quest, iPhone and Android

> **Summary:** A parent mission, split into 7 child missions
> (MIS-230, MIS-231, MIS-232, MIS-233, MIS-234, MIS-235, MIS-236); each child holds the board cards
> titled with its own number.
> **Epistemic:** What the boards held on 2026-10-25 for this area, gathered
> into one mission so that the archive shows the work the boards carry.
> **Pragmatic:** Pick a card titled `MIS-202 · …`, seal its weight, open its
> pull request.
> **Audience:** Agents · Oracles

---

## 1. Story

As the Oracle, I want every claim about speed, load and touch checked on a real headset and a real phone, so that what we ship works where people are.

---

## 2. Scope

Measurements and manual checks on Quest 3, Pico 4, iPhone Safari and Android: load time, frames, draw calls, people per instance, voice limits, touch builder, and the recordings that capture them.

Repositories: numinia-engine · numinia-web. A parent: each child card is one pull request in one
repository.

### Out of scope

Fixing what the checks find: each fix is a card of the mission that owns the feature.

---

## 3. Acceptance criteria

- [ ] Its 7 child missions are done — today none is
- [ ] Every figure in the engine's performance notes says the device it was measured on — today several come from a desktop emulator
- [ ] Each check that waits for the Oracle's device names the date it was run — today they say «espera a Pablo»

---

## 4. Budget

**Weight — how much thinking it needs**
- Sealed per child card when it opens; a parent has no card of its own.
- Process: Sonnet by default, about $24.65 (29 cards × $0.85, the
  median finished card of the boards).

**Time — how much work there is**
- 145 minutes of agent work (29 cards × 5, the median finished
  card), plus the Oracle's reviews.
- Biggest risk: cards that wait for the Oracle or for a real device.

---

## 5. What we learned

---

## 6. Invoice
