---
id: "MIS-300"
uid: ""
title: "Decide the avatar format and how a person chooses an avatar in a world"
type: mission
status: todo
version: "0.1.0"
created: "2026-11-06T12:45:00Z"
updated: "2026-11-06T12:45:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [avatars, vrm, gltf, study, engine]
license: "CC0-1.0"

priority: low
weight: 5
model_planned: sonnet
budget_usd: 0.00
budget_minutes: 30
executor: agent
assigned_to: "ursa"
completed: null

context: "2026-11-06T12:45:00Z"
paths: ["designs/"]
related: ["MIS-0299"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-300 — Decide the avatar format and how a person chooses an avatar in a world

> **Summary:** The engine takes VRM avatars up to 10 000 triangles from a
> house catalogue of three. Before growing that catalogue, this study weighs
> whether VRM is still the right format and how choosing an avatar in a
> world should work, and ends in a recommendation the Oracle decides.
> **Epistemic:** Which avatar format Numinia keeps, and why.
> **Pragmatic:** The next avatar missions are written against one format and one selection flow.
> **Audience:** Agents · Oracles

---

## 1. Story

As the Oracle, I want to know whether VRM is our best avatar format and how
people should choose their avatar, so that we build the selection once, on
the right base.

---

## 2. Scope

`numinia-archive` only, one pull request. Its output is one design in `designs/`.

The study:

- names the candidates: VRM 1.0, VRM 0.x, and plain glTF/GLB with a standard humanoid rig, plus any other format found in use by browser 3D worlds;
- scores each on six criteria:
  - load cost in a browser on a mid-range phone and in a Quest headset;
  - the expressions and look-at the engine uses today;
  - open licence and tooling (Blender, VRoid);
  - how many CC0 avatars exist for it;
  - what the engine already reads (`packages/render/src/avatares-politica.ts`);
  - the cost of switching;
- describes today's selection flow (the world card's default avatar, each person's own choice) and proposes the next one;
- ends with one recommendation and the decision the Oracle takes, entered in the decisions backlog.

Every claim about a format cites its specification or primary documentation.

### Out of scope

Building the selection flow or converting avatars: missions after the decision.

---

## 3. Acceptance criteria

- [ ] A design in `designs/` compares at least three formats on the six criteria above, each claim with its source (today: no such document).
- [ ] The design ends with one recommendation, and the decisions backlog holds the matching question for the Oracle.
- [ ] `npm run checks` passes on the pull request.

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 5 «sube el nivel».
- Why this card: no production risk, but a format and a selection flow nobody has written down yet.
- Process: blind rounds on 2026-11-06 (round 1: doulos 3, talos 3, senet 8; round 2: all 5); sealed by Ursa as Scrum Master.

**Time — how much work there is**
- 30 minutes, in one board card titled `MIS-300 · …`.
- Like: `MIS-254`, research plans written as documents.
- Biggest risk: an answer from habit instead of measurement. The load cost is measured on the engine's own avatars, not quoted.

---

## 5. What we learned

*(Written at the end.)*

---

## 6. Invoice

*(Pasted by the invoice script.)*
