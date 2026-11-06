---
id: "MIS-298"
uid: ""
title: "Offer the engine's templates in the Worlds room's new-world wizard"
type: mission
status: todo
version: "0.1.0"
created: "2026-11-06T12:45:00Z"
updated: "2026-11-06T12:45:00Z"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [numinia-com, worlds, templates, wizard]
license: "CC0-1.0"

priority: medium
weight: 8
model_planned: sonnet
budget_usd: 0.00
budget_minutes: 30
executor: agent
assigned_to: "ursa"
completed: null

parent_mission: "MIS-296"
context: "2026-11-06T12:45:00Z"
paths: ["apps/store/src/lib/fleet.ts", "apps/store/src/lib/worlds.ts", "apps/store/src/components/lap/admin/WorldDialogs.tsx", "apps/store/src/i18n/worlds.ts"]
related: ["MIS-0296", "MIS-0297", "MIS-0293"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-298 — Offer the engine's templates in the Worlds room's new-world wizard

> **Summary:** The new-world wizard's engine step offers only engines. This
> mission adds a choice of template, taken from the latest engine release,
> and signs it with the new request when the machine takes it.
> **Epistemic:** Which template a new world is born from, chosen in the room.
> **Pragmatic:** Create a world as the workshop or as Hermes without touching a machine.
> **Audience:** Agents · Oracles

---

## 1. Story

As the Oracle creating a world, I want to pick its template in the wizard,
so that the world is born with the content I need.

---

## 2. Scope

`numinia-platform`, `apps/store` only, one pull request. Starts when `MIS-297` and `MIS-293` are `done`.

The mission:

- reads `plantillas` from the latest release's `funciones-motor.json` (`MIS-293`), validated with Zod; no list means no choice;
- adds `CreateWorldFromTemplate` to `REQUEST_TYPES` in `lib/fleet.ts`, field for field as `MIS-297` defines it;
- adds to the engine step a template choice, with `taller` first and each template's description;
- uses `CreateWorldFromTemplate` only when the chosen machine says `templates: true`, and plain `CreateWorld` otherwise, with a note that the world will be born as the workshop;
- adds texts in the five locales, a note in `content/updates/`, and the tests that keep the lib files at 100 %.

---

## 3. Acceptance criteria

- [ ] With `DATA_SOURCE=fixture`, the wizard's engine step lists `taller` and `hermes` (today: no template choice). A Gherkin scenario checks it.
- [ ] A test in `lib/__tests__/` builds the typed data for `CreateWorldFromTemplate` and matches `MIS-297`'s field list.
- [ ] With a fixture machine that does not take the new request, the wizard signs `CreateWorld` and shows the workshop note.
- [ ] `npm run verify` passes, the visual baselines included.

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 8 «hace sudar».
- Why this card: a signed contract copied field for field; a mismatch shows only on a real machine (Talos).
- Process: blind round 1 on 2026-11-06, agreed (doulos 5, talos 8, senet 5); sealed by Ursa as Scrum Master.

**Time — how much work there is**
- 30 minutes, in one board card titled `MIS-298 · …`.
- Like: the engine choice already in the same step.
- Biggest risk: a field-order mismatch with the machine's hash, caught only on a real machine. The first world from a template is created on a machine the Oracle names, never on `open-1`.

---

## 5. What we learned

*(Written at the end.)*

---

## 6. Invoice

*(Pasted by the invoice script.)*
