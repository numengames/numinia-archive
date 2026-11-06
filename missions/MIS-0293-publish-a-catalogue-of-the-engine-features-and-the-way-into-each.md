---
id: "MIS-293"
uid: ""
title: "Publish with every engine release a catalogue of its features and the way into each"
type: mission
status: todo
version: "0.1.0"
created: "2026-11-06T12:45:00Z"
updated: "2026-11-06T12:45:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [engine, features, catalogue, releases]
license: "CC0-1.0"

priority: high
weight: 5
model_planned: sonnet
budget_usd: 0.00
budget_minutes: 30
executor: agent
assigned_to: "ursa"
completed: null

parent_mission: "MIS-291"
context: "2026-11-06T12:45:00Z"
paths: ["features/", "features/funciones/feature.ts", "tools/publicar-version.sh"]
related: ["MIS-0291", "MIS-0296"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-293 — Publish with every engine release a catalogue of its features and the way into each

> **Summary:** The engine holds 40 feature folders under `features/`, each
> with a `describe` sentence, but nothing lists them with how a person
> reaches each one. This mission generates that list at release, as a
> release asset a machine can read.
> **Epistemic:** Which features a given engine version has, and which of them nobody can reach.
> **Pragmatic:** numinia.com draws the list; the ones with no way in become the list of what to wire.
> **Audience:** Agents · Oracles

---

## 1. Story

As the Oracle, I want a list of everything the engine can do and how each
thing is switched on, so that I find the features we built but nobody can
reach.

---

## 2. Scope

`numinia-engine` only, one pull request. On 2026-11-06 at 12:30 UTC:

- `features/` holds 40 folders, each `feature.ts` declaring `id`, `level` and `describe`.
- Only three features have a live switch in a world (`FUNCIONES` in `features/funciones/feature.ts`: `normas`, `dardos`, `pesca`).
- The others are reached through the in-world menus, through the Build panel, through the world's files, or not at all. No file records which applies.

The mission:

- adds to each `feature.ts` one declared field `entrada`: `interruptor` (live switch), `menu` (a button in a menu a player sees), `construir` (the Build panel), `fichero` (only by editing the world's files) or `ninguna` (built, no way in), plus the menu or panel name when there is one;
- generates `funciones-motor.json` at release (`numinia-engine/catalogo@1`: one entry per feature with `id`, `describe`, `level`, `entrada`) and attaches it to the release beside `imagen.json`;
- adds to the same file a list `plantillas`: one entry per folder in `plantillas/` with its name and the `descripcion` in its `aventura/ficha.json`, which the new-world wizard reads (`MIS-298`);
- adds a test that fails when a feature lacks `entrada`.

Which value each feature gets is read from the code (a grep of the menus and the Build panel), not guessed. A feature whose way in cannot be found is `ninguna`.

### Out of scope

Wiring a way in for features marked `ninguna`, and vehicles, which have no feature folder today.

---

## 3. Acceptance criteria

- [ ] `curl -sL https://github.com/numengames/numinia-engine/releases/latest/download/funciones-motor.json` returns one entry per folder in `features/`, each with `id`, `describe` and `entrada`, and a `plantillas` list naming `taller` and `hermes` (today: 404).
- [ ] `grep -L "entrada:" features/*/feature.ts` prints nothing (today: it prints all 40 files).
- [ ] A test fails when one `feature.ts` lacks `entrada` (today: no such test).

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 5 «sube el nivel».
- Why this card: 40 features classified by reading the code; a guess makes the catalogue lie.
- Process: blind round 1 on 2026-11-06, agreed (doulos 5, talos 5, senet 5); sealed by Ursa as Scrum Master.

**Time — how much work there is**
- 30 minutes, in one board card titled `MIS-293 · …`.
- Like: the conditions-of-entry switch in `features/funciones/` (f1).
- Biggest risk: 40 features to classify by reading their menus. If it runs long, the classification goes to a second card.

---

## 5. What we learned

*(Written at the end.)*

---

## 6. Invoice

*(Pasted by the invoice script.)*
