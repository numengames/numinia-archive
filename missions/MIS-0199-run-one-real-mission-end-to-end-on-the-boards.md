---
id: "MIS-199"
uid: ""
title: "Run one real mission end to end on the boards: cards, model by weight, full invoice, what was learned"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-25T14:30:00Z"
updated: "2026-10-25T14:30:00Z"
author: "ursa"
owner: "oracle"
section: "Knowledge and quality"
tags: [missions, boards, estimation, invoice, models]
license: "CC0-1.0"

priority: high
weight: 3
model_planned: sonnet
budget_usd: 8.00
budget_minutes: 180
executor: agent
assigned_to: "ursa"
completed: null

depends_on: ["MIS-198"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-199 — Run one real mission end to end on the boards

> **Summary:** A parent mission. Its children are the board cards titled
> `MIS-199 · …` in Hermes: a complete invoice, the model chosen by the card,
> the site painting weight, and the umbrella for improvised work.
> **Epistemic:** Whether `ADR-083` works outside the template: the first
> mission whose budget is checked against what really happened.
> **Pragmatic:** After it, any mission can say which model to try next time.
> **Audience:** Agents · Oracles

---

## 1. Story

As the Oracle, I want to know which model did each mission, how many tokens
and attempts it took, and whether its card was right, so that I can move
missions to smaller or larger models with evidence.

---

## 2. Scope

The Hermes boards and the invoice scripts (`factura.py`, `enlace.py`), the
board's model override per card, and `web/` of this archive for painting
`weight`. A parent: each child is one pull request in one repository.

### Out of scope

Rewriting old missions or renaming the 275 old cards: they have no mission,
and inventing one would be false.

---

## 3. Acceptance criteria

- [ ] The invoice of a mission counts its helpers' sessions and splits tokens
      into input, output, cache read, cache write and reasoning — today it
      counts only the worker's session and one total
- [ ] The invoice says attempts until success, rescues (a change of model) and
      context compressions — today none of the three
- [ ] Every run of a card started after this mission records its session —
      today 82 of 240 finished runs have none
- [ ] A card of weight 0–2 is dispatched on Haiku and of weight 3–8 on Sonnet
      without anyone typing the model — today every card runs on the default
- [ ] `/missions` on numinia.org shows a mission's weight — today it shows
      `effort`, and «M» when there is none
- [ ] One mission closes with its invoice pasted by the script and its card
      judged right or wrong

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 3 «criterio de diseño», orchestrator's card; each child is sealed on
  its own card.
- Process: Sonnet, about $8 across the children (calibration round 1: card 3
  → $1.00 median per card).

**Time — how much work there is**
- 180 minutes, in 6 cards of at most 30.
- Like: MIS-198, one card of 30 minutes.
- Biggest risk: runs without a session cannot be recovered; only new runs
  will be complete.

---

## 5. What we learned

---

## 6. Invoice
