---
id: "MIS-295"
uid: ""
title: "List the engine's features in the Worlds room and mark those nobody can reach"
type: mission
status: todo
version: "0.1.0"
created: "2026-11-06T12:45:00Z"
updated: "2026-11-06T12:45:00Z"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [numinia-com, worlds, engine, features]
license: "CC0-1.0"

priority: medium
weight: 3
model_planned: sonnet
budget_usd: 0.00
budget_minutes: 30
executor: agent
assigned_to: "ursa"
completed: null

parent_mission: "MIS-291"
context: "2026-11-06T12:45:00Z"
paths: ["apps/store/src/lib/worlds.ts", "apps/store/src/lib/worlds-source.ts", "apps/store/src/components/lap/admin/WorldsPanel.tsx", "apps/store/src/i18n/worlds.ts"]
related: ["MIS-0291", "MIS-0293"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-295 — List the engine's features in the Worlds room and mark those nobody can reach

> **Summary:** Once each engine release carries its catalogue of features
> (`MIS-293`), the Worlds room shows that list under the «Motor» block: each
> feature, what it does, how a person reaches it, and a mark on those built
> with no way in.
> **Epistemic:** What the running engine can do, and which features are built but out of reach.
> **Pragmatic:** The Oracle sees what to switch on, and the list of what to wire.
> **Audience:** Agents · Oracles

---

## 1. Story

As the Oracle, I want the engine's features listed in the Worlds room with
how to reach each, so that I know what my worlds can do and which built
features still need a button.

---

## 2. Scope

`numinia-platform`, `apps/store` only, one pull request. Starts when `MIS-293` is `done`.

The mission:

- reads `funciones-motor.json` of the latest engine release, beside `imagen.json`;
- validates it with Zod (`numinia-engine/catalogo@1`) and fails closed: an unknown or broken catalogue shows nothing;
- draws, under the «Motor» block, a fold «What the engine can do»;
- groups the features by how a person reaches them (live switch, menu, Build panel, world files), with features nobody can reach last and marked;
- shows each feature's `describe`, as the engine writes it in Spanish;
- adds the room's own texts in the five locales, a note in `content/updates/`, and the tests that keep the lib file at 100 %.

### Out of scope

Translating the engine's `describe` sentences, and a per-world view of which switches are on (the world's own `/funciones` already serves that).

---

## 3. Acceptance criteria

- [ ] With `DATA_SOURCE=fixture`, the built Worlds room has a fold «What the engine can do» listing each catalogue entry, the ones with `entrada: ninguna` last and marked (today: no such fold). A Gherkin scenario checks it.
- [ ] A broken or missing catalogue renders no fold and no error (a test in the lib's test file).
- [ ] `npm run verify` passes, the visual baselines included.

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 3 «criterio de diseño».
- Why this card: the pattern of MIS-294, smaller: one Zod schema that fails closed and one fold.
- Process: blind round 1 on 2026-11-06, agreed (doulos 3, talos 3, senet 3); sealed by Ursa as Scrum Master.

**Time — how much work there is**
- 30 minutes, in one board card titled `MIS-295 · …`.
- Like: `MIS-294`, the same block and the same release.
- Biggest risk: none beyond `MIS-294`'s baselines.

---

## 5. What we learned

*(Written at the end.)*

---

## 6. Invoice

*(Pasted by the invoice script.)*
