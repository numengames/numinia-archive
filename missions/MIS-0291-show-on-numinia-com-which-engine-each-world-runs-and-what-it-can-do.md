---
id: "MIS-291"
uid: ""
title: "Show on numinia.com which engine each world runs and what that engine can do"
type: mission
status: todo
version: "0.1.0"
created: "2026-11-06T12:45:00Z"
updated: "2026-11-06T12:45:00Z"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [engine, fleet, worlds, versions, features, numinia-com]
license: "CC0-1.0"

priority: high
weight: 13
model_planned: sonnet
budget_usd: 0.00
budget_minutes: 0
executor: agent
assigned_to: "ursa"
completed: null

context: "2026-11-06T12:45:00Z"
related: ["MIS-0292", "MIS-0293", "MIS-0294", "MIS-0295", "MIS-0290"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-291 — Show on numinia.com which engine each world runs and what that engine can do

> **Summary:** The parent of four missions in two repositories. When they
> are done, an Oracle sees in the Worlds room, per machine, the engine
> version of every world, what each version brought, and every engine
> feature with the way a person reaches it.
> **Epistemic:** Where an Oracle reads the engine's state without asking an agent.
> **Pragmatic:** Know whether the worlds are current, what changed, and which features have no way in.
> **Audience:** Agents · Oracles

---

## 1. Story

As the Oracle who runs the worlds, I want to see in the Worlds room which
engine version each world runs, what each version brought and which
features exist, so that I know without asking whether the worlds are
current and what I can switch on.

---

## 2. Scope

A parent mission: it builds nothing itself. Its children, one repository each:

- `MIS-292` — `numinia-engine`: every release names its semantic version and carries its notes.
- `MIS-293` — `numinia-engine`: every release carries a catalogue of the engine's features.
- `MIS-294` — `numinia-platform`: the Worlds room shows, per machine, each world's version and what each version brought (after `MIS-292`).
- `MIS-295` — `numinia-platform`: the Worlds room lists the features and marks those with no way in (after `MIS-293`).

### Out of scope

- Not updating a world while people are inside: the Oracle put it off on 2026-11-06 because the engine is changing too fast. Every release still reaches every running world.
- Building missing features (vehicles have no code today, only notes). The catalogue makes them visible; building them is separate work.

---

## 3. Acceptance criteria

- [ ] `MIS-292`, `MIS-293`, `MIS-294` and `MIS-295` are `done`, or on hold as cancelled (today: all four are `todo`).
- [ ] Signed in as an Oracle, the Worlds room shows a world's engine as a semantic version such as `0.106.0`, beside its build (today: it shows only the build, such as `79fc7d4`).

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 13 «quema las manos». This card is too big for one mission, so it is split into the four children.
- Why this card: two repositories, a data contract between them, and an Oracle-only screen.
- Process: the children carry their own budgets; this card adds none.

**Time — how much work there is**
- 0 minutes of its own; the children's minutes add up.
- Like: `MIS-196`, a parent across engine and numinia.com.
- Biggest risk: the release workflow file, which the App cannot change without the Oracle.

---

## 5. What we learned

*(Written at the end.)*

---

## 6. Invoice

*(Pasted by the invoice script.)*
