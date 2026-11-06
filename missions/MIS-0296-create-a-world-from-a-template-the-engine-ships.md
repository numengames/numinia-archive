---
id: "MIS-296"
uid: ""
title: "Create a world on numinia.com from a template the engine ships"
type: mission
status: todo
version: "0.1.0"
created: "2026-11-06T12:45:00Z"
updated: "2026-11-06T12:45:00Z"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [numinia-com, worlds, engine, templates, fleet]
license: "CC0-1.0"

priority: medium
weight: 8
model_planned: sonnet
budget_usd: 0.00
budget_minutes: 0
executor: agent
assigned_to: "ursa"
completed: null

context: "2026-11-06T12:45:00Z"
related: ["MIS-0297", "MIS-0298", "MIS-0293"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-296 — Create a world on numinia.com from a template the engine ships

> **Summary:** The parent of two missions in two repositories. When they
> are done, the new-world wizard in the Worlds room offers the engine's
> templates, and the world is born from the one chosen.
> **Epistemic:** Which template a new world starts from, chosen by the person creating it.
> **Pragmatic:** Create a building world, a Hermes world, or whatever template comes next, from the room.
> **Audience:** Agents · Oracles

---

## 1. Story

As the Oracle creating a world, I want to choose the template it is born
from, so that a world starts with the right content loaded and not always
as the building workshop.

---

## 2. Scope

A parent mission: it builds nothing itself. On 2026-11-06 at 12:30 UTC:

- the engine ships two templates, `taller` (the default: 11 building missions with Lumen) and `hermes`, chosen by the setting `MOTOR_PLANTILLA` on a world's first boot;
- neither the signed `CreateWorld` request nor the machine's recipe carries that setting, so every world is born `taller`.

Its children, one repository each:

- `MIS-297` — `numinia-assets`: the machine takes a template in a signed creation request and passes it to the world's first boot.
- `MIS-298` — `numinia-platform`: the wizard's engine step offers the templates of the latest release and signs the one chosen (after `MIS-297` and `MIS-293`).

### Out of scope

Templates downloaded from a repository instead of shipped inside the engine: a later mission, once two shipped templates are in use.

---

## 3. Acceptance criteria

- [ ] `MIS-297` and `MIS-298` are `done`, or on hold as cancelled (today: both `todo`).
- [ ] A world created from the room with template `hermes` opens with the Hermes template's world card (today: every new world opens as the workshop).

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 8 «planificar». The signed request crosses two repositories and must not break the machines already running.
- Why this card: a contract change between the room and the machines.
- Process: the children carry their own budgets.

**Time — how much work there is**
- 0 minutes of its own.
- Like: the `org` field added to orders in `reconcile.py`.
- Biggest risk: machines that do not know the new request yet. The machine side ships first.

---

## 5. What we learned

*(Written at the end.)*

---

## 6. Invoice

*(Pasted by the invoice script.)*
