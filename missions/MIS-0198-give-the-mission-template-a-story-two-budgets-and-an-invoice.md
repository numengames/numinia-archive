---
id: "MIS-198"
uid: ""
title: "Give the mission template a story, two budgets and an invoice"
type: mission
status: in-review
version: "0.1.0"
created: "2026-10-25T13:00:00Z"
updated: "2026-10-25T13:30:00Z"
author: "ursa"
owner: "oracle"
section: "Knowledge and quality"
tags: [missions, template, estimation, budget]
license: "CC0-1.0"

priority: high
weight: 3
model_planned: opus
budget_usd: 6.00
budget_minutes: 30
executor: agent
assigned_to: "ursa"
completed: null

started: "2026-10-25T13:00:00Z"
in_review_at: "2026-10-25T13:30:00Z"
paths: [machine/templates/, machine/checks/rules/std-004-the-header.mjs, machine/scripts/lib/rings.mjs, standards/STD-004-the-header.md, procedures/PRO-003-mission-cycle.md]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-198 — Give the mission template a story, two budgets and an invoice

> **Summary:** The mission template gains a user story, a budget on two axes
> — weight and time — what was learned, and an invoice; the header check
> accepts the new fields.
> **Epistemic:** How `ADR-083` lands in the template, the header and the
> mission cycle.
> **Pragmatic:** The next mission opens from the new template.
> **Audience:** Agents · Oracles

---

## 1. Story

As the Oracle, I want each mission to say how much thinking and how much
work it needs before it starts, and what it really cost when it ends, so that
I can tell which missions to give a large model and learn from the gap.

---

## 2. Scope

`machine/templates/MIS-TEMPLATE.md` and its example, the header's registered
fields and vocabularies (`STD-004`, `rings.mjs`, the HDR check), the missions
telemetry, and steps 6, 8 and 9 of `PRO-003`. One repository.

### Out of scope

Rewriting the missions that carry `effort`. The invoice script and the
board-link script, which live with the boards in Hermes. Calibrating the
dollars of each card.

---

## 3. Acceptance criteria

- [x] The template carries `## 1. Story`, `## 4. Budget`, `## 5. What we
      learned` and `## 6. Invoice` — today it has none of the four
- [x] A mission header with `weight: 8`, `model_planned`, `budget_usd` and
      `budget_minutes` passes the header check — today HDR-030 rejects all four
- [x] `weight: 4` fails HDR-038 — today it passes, unknown
- [x] `npm test` and `npm run checks` pass

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 3 «criterio de diseño», orchestrator's card — the design was already
  approved; what is left is placing it in the archive's rules.
- Process: Opus, chosen by the Oracle's session, not by the card; about $6.

**Time — how much work there is**
- 30 minutes, in 1 card.
- Like: STD-052 0.3.0 (#750), one field and one vocabulary added.
- Biggest risk: a guard that reads the old section names.

---

## 5. What we learned

- **What was done:** the four sections, the four header fields under ring 3,
  `weight` under HDR-038, `by_weight` in the telemetry, the closure count
  reading the numbered `## 6. Invoice`, and the three steps of `PRO-003`.
- **What diverged, and why:** the vocabulary table of `STD-004` had no row for
  `priority` nor `effort`, though both were enforced; they were added with
  `weight`. And this mission's model was the session's, not the card's: the
  card says Sonnet. That is the gap the invoice is meant to show.
- **For the next similar mission:** a new header field touches five places —
  `rings.mjs`, the HDR vocabulary, `STD-004`'s two tables, the template test.

---

## 6. Invoice

*(Pasted at merge from the board's measurement.)*

- **Evidence:** this pull request.
- **Closed:** · **by:**
