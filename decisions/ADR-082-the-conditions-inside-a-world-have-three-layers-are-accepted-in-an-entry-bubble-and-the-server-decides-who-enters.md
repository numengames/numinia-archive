---
id: "ADR-082"
uid: ""
title: "The conditions inside a world have three layers, Numinia's and the organisation's with required and optional points apart, are accepted in an entry bubble in 3D and VR, and the server decides who enters"
type: adr
status: draft
version: "0.1.0"
created: "2026-10-20T11:50:00+00:00"
updated: "2026-10-20T11:50:00+00:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Technology"
tags: [decisions, adr, virtual-worlds, engine, terms, consent, entry-bubble, vr, server-authority, organisations]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "Whoever enters a world accepts its conditions in three layers. Numinia's conditions are the base and bind everyone. An organisation may write its own above them, and they can never contradict Numinia's; they are written by whoever holds the administrator role, as the notes for its AIs are (the Oracle's ruling of 2026-10-20). Inside each layer the points are kept apart: required points, without which nobody enters, and optional points, each its own act and left unticked by default. They are read and accepted in 3D and in VR, in an entry bubble: on arrival the person stands inside a sphere with the world blurred behind it, reads in a large panel, ticks the optional points and presses «Accept and enter» or «Leave». The server decides: until it has recorded the acceptance it lets nobody leave the bubble, nor chat, speak or build. It records who, which version of each layer, which optional points, when (UTC) and in which world; a new published version brings the person back to the bubble with only what changed."
related: ["ADR-079", "ADR-080", "ADR-081", "DBT-022", "STD-052", "MIS-197"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-082 — The conditions inside a world have three layers and are accepted in an entry bubble

> **Summary:** Before a person is let into a world they accept its
> conditions: Numinia's for everyone, the organisation's on top, each with
> required points and optional points apart. They do it in 3D or VR inside a
> bubble, and the server alone decides whether they may come out of it.
> **Epistemic:** The Oracle's request of 2026-10-20, which repeats a
> remark of 2026-10-15 («there you will accept the terms and conditions»).
> The study behind it is `work/mmo-browser-study/CONDICIONES-EN-LOS-MUNDOS`
> in the engine's study folder, which is outside git today (`MIS-195`); the
> layers, the bubble and the server rule below are the Oracle's, the reading
> of what exists today is Ursa's.
> **Pragmatic:** The text can be built and tested with the wording we have
> and replaced later without touching code; what is not decided is the
> wording itself, which the lawyers write (`DBT-022`).
> **Audience:** Agents · Oracles

---

## 1. Context

numinia.com already asks for acceptance when someone signs in with a wallet,
stored as a mark that names the version of the terms and of the privacy
policy; a new version asks again. The engine asks for nothing: a person
enters as a guest. The only text in force is written for companies, and
`DBT-022` records for the lawyers that no conditions exist for consumers
and that one tick for «terms and privacy» together is not a legal act.

The Oracle asked for conditions that live inside the worlds: general ones
of Numinia that everyone accepts; the organisation's own above them; read
and accepted in 3D and in VR, in a bubble where nobody enters the world
until the required part is accepted and the optional part may stay
unticked. The pieces to build it exist: the signed pass of numinia.com
says who you are and which organisation and permissions you hold, zones
are bubbles (`ADR-081`), and a world's content lives in its own folder
(`ADR-079`).

The rule of the house applies: every function of the engine is a piece any
space can switch on with little, and the server decides so nobody cheats.

## 2. Decision

1. **Three layers.**
   1. **Numinia's conditions** are the base. Everyone accepts them, in every
      world.
   2. **The organisation's conditions** are optional and sit above the first.
      They may add; they may never contradict Numinia's. Whoever holds the
      `administrator` role writes them, as the notes for the organisation's
      AIs are written. A world with no organisation shows only
      Numinia's.
   3. **Within each layer, the points are apart:** required points, without
      which nobody enters, and optional points (being recorded, receiving
      notices, an AI hearing you), each its own act, unticked by default.
      One tick per purpose is what the data authority's guidance cited in
      `DBT-022` asks for; it is not taste.
2. **They are accepted in an entry bubble, in 3D and in VR.** On arrival
   the person stands inside a sphere and the world is blurred behind it.
   In it there is one large panel to read (in VR: large type, pages turned
   by lever or pinch, buttons pressed by hand or controller), the optional
   boxes and two buttons: «Accept and enter» and «Leave». The same text is
   published on the organisation's public page to be read calmly outside
   the 3D.
3. **The server decides.** Until it has recorded the acceptance of every
   required point the server does not let the person leave the bubble and
   accepts neither chat, nor voice, nor building from them. The client
   shows the bubble; it never grants entry.
4. **What is recorded.** Who (the person of the pass, or the guest), which
   version of each layer, which optional points were ticked, when (in UTC)
   and in which world. If the person already accepted that version on the
   web, the pass says so and the bubble shows only what is missing. When
   an organisation publishes a new version the person returns to the bubble
   with only what changed.
5. **Where the text lives.** The organisation writes it in numinia.com
   (its settings); numinia.com copies it into each of its worlds; the engine
   only reads the world's folder (`ADR-079`). Every published version has a
   number.

## 3. Alternatives considered

- **One text for all, no organisation layer.** Rejected by the Oracle: an
  organisation that runs a space has duties and rules of its own.
- **Acceptance on the web only, before the world loads.** Rejected: the
  Oracle wants it inside the world, in VR as well, where no web page is
  open.
- **A client-side gate.** Rejected: whoever skips the gate would enter
  without accepting; only the server can refuse.
- **One tick for everything.** Rejected: one act per purpose (`DBT-022`).

## 4. Consequences

- Nothing here is built. The work is queued as `MIS-197`: the format of an
  organisation's conditions, writing and publishing them (administrators
  only), copying them into each world, the pass saying what was accepted,
  the world loading them from its folder, the server refusing entry without
  acceptance, the bubble on PC and phone, the bubble in VR proven on the
  real headset, and the return of only what changed.
- Until the lawyers write consumer conditions (`DBT-022`), what is accepted
  in the bubble is the current company text; changing it later touches no
  code.
- The bubble reuses the zone bubble of `ADR-081` and the pass of numinia.com
  (`STD-052`); an AI entering through the door of `ADR-080` is subject to
  the same acceptance as a person.

## 5. Not decided

- **Who answers for an organisation's conditions:** Numen as the platform or
  the organisation. And whether accepting in VR is worth as much as on the
  web. Both go to the lawyers in `DBT-022`.
- **Minimum age per adventure** (children's and adults' adventures). The
  Oracle said not now.

## 6. Status

Decided by the Oracle on 2026-10-20. Recorded here on 2026-10-20, pending
his acceptance on the pull request.
