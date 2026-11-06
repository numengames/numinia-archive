---
id: "MIS-299"
uid: ""
title: "Make the Nomad the avatar every new world starts with"
type: mission
status: todo
version: "0.1.0"
created: "2026-11-06T12:45:00Z"
updated: "2026-11-06T12:45:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [engine, avatars, vrm, nomad, templates]
license: "CC0-1.0"

priority: medium
weight: 5
model_planned: sonnet
budget_usd: 0.00
budget_minutes: 30
executor: agent
assigned_to: "ursa"
completed: null

context: "2026-11-06T12:45:00Z"
paths: ["activos/avatares/", "activos/avatares/catalogo.json", "activos/avatares/LICENCIAS.md", "plantillas/taller/aventura/ficha.json", "plantillas/hermes/aventura/ficha.json"]
related: ["MIS-0300", "MIS-0296"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-299 — Make the Nomad the avatar every new world starts with

> **Summary:** The engine ships three house avatars (Astrodisco, Skelly,
> Polybot). The Oracle wants Numinia's Nomad as the one every new world
> wears by default. This mission adds it to the house catalogue within the
> engine's limits and sets it as the default of both templates.
> **Epistemic:** Which avatar a person wears on entering a new world.
> **Pragmatic:** Every new world greets people as Numinia's Nomad.
> **Audience:** Agents · Oracles

---

## 1. Story

As the Oracle, I want every new world to start with the Nomad as its
avatar, so that Numinia has one recognisable face from the first visit.

---

## 2. Scope

`numinia-engine` only, one pull request.

On 2026-11-06 at 12:30 UTC:

- The house avatars live in `activos/avatares/` with `catalogo.json`; `AVATARES_CASA` in `packages/server/src/aventura.ts` is built from it, and a world's card (`ficha.json`, field `avatar`) may name one of them as its default.
- The catalogue `numinia-avatars.json` in the data repository holds 9 avatars and none is called Nomad. The closest, `starter-avatar-01` (white, with the beetle), says CC0 in that catalogue.
- The `.vrm` file itself says otherwise. Its meta reads «Procyon», author VIPE, licence CC_BY, use «ExplicitlyLicensedPerson».
- It has 12 755 triangles and weighs 3.9 MB, above the engine's limit of 10 000 triangles.

**Precondition, before any work:** the Oracle names the Nomad's file and confirms its licence (CC0, or CC BY with the credit to give). Without both, this card stays `todo`.

The mission:

- adds the Nomad's `.vrm` to `activos/avatares/`, reduced to at most 10 000 triangles if needed, with its entry in `catalogo.json` and its licence and credit in `numinia-engine/activos/avatares/LICENCIAS.md`;
- sets `"avatar"` to the Nomad's id in the `ficha.json` of both templates, so every world born from them wears it;
- checks the file with the engine's own avatar checks.

### Out of scope

Worlds already running (their card already says which avatar they use), and the avatar-selection study (`MIS-300`).

---

## 3. Acceptance criteria

- [ ] `activos/avatares/catalogo.json` lists the Nomad, and `numinia-engine/activos/avatares/LICENCIAS.md` gives its licence and credit (today: three avatars, no Nomad).
- [ ] Both `plantillas/*/aventura/ficha.json` name the Nomad as `avatar` (today: neither names one).
- [ ] The engine's tests pass with the new avatar, including the 10 000-triangle limit.
- [ ] A new local world (`npm run dev`) puts the Nomad on a visitor who has chosen nothing.

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 5 «sube el nivel».
- Why this card: the licence precondition, and reducing a VRM without breaking expressions.
- Process: blind round 1 on 2026-11-06, agreed (doulos 5, talos 3, senet 5); sealed by Ursa as Scrum Master.

**Time — how much work there is**
- 30 minutes, in one board card titled `MIS-299 · …`, once the precondition is met.
- Like: the three 100Avatars added to `activos/avatares/`.
- Biggest risk: the licence. A CC BY file needs its credit wherever it shows.

---

## 5. What we learned

*(Written at the end.)*

---

## 6. Invoice

*(Pasted by the invoice script.)*
