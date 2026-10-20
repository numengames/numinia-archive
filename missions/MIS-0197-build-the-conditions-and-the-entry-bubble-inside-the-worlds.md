---
id: "MIS-197"
uid: ""
title: "Build the conditions and the entry bubble inside the worlds"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-20T11:50:00Z"
updated: "2026-10-20T11:50:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [engine, virtual-worlds, terms, consent, entry-bubble, vr, organisations]
license: "CC0-1.0"

priority: high
effort: XL
executor: agent
assigned_to: "ursa"
completed: null

requires_oracle_approval: true
paths: [decisions/ADR-082-the-conditions-inside-a-world-have-three-layers-are-accepted-in-an-entry-bubble-and-the-server-decides-who-enters.md]
related: ["ADR-082", "ADR-081", "ADR-079", "DBT-022", "STD-052"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-197 — Build the conditions and the entry bubble inside the worlds

> **Summary:** Nobody enters a world without accepting its conditions:
> Numinia's, the organisation's above them, required and optional points
> apart, read in an entry bubble in 3D and VR, with the server deciding.
> **Epistemic:** The Oracle's ruling of 2026-10-20, recorded in `ADR-082`.
> The design study is `work/mmo-browser-study/CONDICIONES-EN-LOS-MUNDOS`
> in the engine's study folder (outside git today).
> **Pragmatic:** The work is cut into pieces that can be built and proven
> one by one; the legal wording is not part of it and can change after.
> **Audience:** Agents · Oracles

---

## 1. Scope

Build what `ADR-082` decides, in this order, each piece in the repository
that owns it:

- the format of an organisation's conditions, and the questions for the
  lawyers it raises in `DBT-022`;
- numinia.com: writing and publishing them in the organisation's settings
  (administrator only), the public page with the same text, copying them
  into each of the organisation's worlds, and the pass saying what the
  person has already accepted;
- the engine: the world loading its conditions from its folder, the server
  refusing entry, chat, voice and building until the required points are
  accepted, the bubble on PC and phone, the bubble in VR proven on the real
  headset, and the return to the bubble with only what changed.

The full design, the current state of the code and the open questions are in
`work/mmo-browser-study/CONDICIONES-EN-LOS-MUNDOS`.

> **Scope and Acceptance criteria are written when the mission OPENS and are
> not edited afterwards.** What happened goes in Closure.

## Out of scope

Writing the legal text (the lawyers, `DBT-022`). Minimum age per adventure.
Deciding who answers for an organisation's conditions.

---

## 2. Acceptance criteria

- [ ] A person with no acceptance on record cannot leave the entry bubble,
  chat, speak or build in a world; the test that shows it is a server test.
- [ ] An organisation's conditions that contradict Numinia's are refused at
  publication.
- [ ] Optional points arrive unticked and each is recorded apart.
- [ ] The bubble is read and accepted on PC, on phone and on the real VR
  headset.
- [ ] A new published version returns the person to the bubble with only
  what changed.
- [ ] Each acceptance records person or guest, version of each layer,
  optional points, time in UTC and world.

---

## 3. Closure

*(Filled when the mission closes.)*
