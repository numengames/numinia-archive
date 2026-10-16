---
id: "ADR-077"
uid: ""
title: "Adventures are text and escape rooms are state machines on the server; KHR_interactivity is a bridge, not the runtime"
type: adr
status: draft
version: "0.1.0"
created: "2026-10-16T10:55:00+00:00"
updated: "2026-10-16T10:55:00+00:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Technology"
tags: [decisions, adr, virtual-worlds, engine, adventures, quests, escape-rooms, gltf, standards]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "In Numinia's engine an adventure is a folder of text: quests as steps with conditions, people of the world with a deterministic dialogue tree gated by quest state, and things that are taken or used. The server checks every step and keeps each person's progress; a page can never complete a step by asking. Escape rooms are state machines that run on the server, with no paid chance anywhere. The dialogue tree is the policy: a language model may one day phrase a line, never decide an option, an action or a condition. The glTF extension KHR_interactivity, ratified on 2026-08-28, serves to import and export the engine's rules and never as the runtime of shared state, because its own specification is for single-user experiences."
amends: []
related: ["ADR-074", "ADR-075", "STD-050", "PRI-015", "DBT-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-077 — Adventures are text; escape rooms are state machines on the server

> **Summary:** Quests, people of the world and quest things are text files the
> server reads and enforces; progress is per person and lives on the server;
> escape rooms are server state machines without paid chance; a model may
> phrase a line but never decide; KHR_interactivity is only a door for import
> and export. Decided between 2026-10-13 and 2026-10-16; written here so it
> can be changed.
> **Epistemic:** The Oracle's rulings of 2026-10-13 (game on the server,
> transactional; escape rooms as state machines; no paid chance) and of
> 2026-10-15 (the adventure formats; the tree is the policy). The reading of
> KHR_interactivity's specification is Ursa's: «for single user experiences
> only» and «behavior graphs are a superset of trigger-action lists».
> **Pragmatic:** A new adventure never touches the engine; a quest cannot be
> cheated from the page; the engine's rules can be exported to a standard
> file and the standard's subset imported.
> **Audience:** Agents · Oracles

---

## 1. Context

The engine's first adventures showed the shape: a quest is a list of steps —
reach a place, talk to someone, use or take a thing, deliver it —, a person of
the world has a dialogue tree whose entries and options depend on the player's
quests, and a thing in the world is taken or used. All of it is text in the
adventure's folder, checked when loaded with errors that say how to fix each
one, so that a person or a language model can write an adventure from the
recipe alone.

The study of Procyon, the agent that lived in a Hyperfy world, left a rule in
`STD-050`: the policy goes in the code, the model only phrases. Escape rooms
are the first product (`ADR-073`), and the question arose whether Khronos'
KHR_interactivity, ratified on 2026-08-28, should be the engine of their logic.

## 2. Decision

1. **An adventure is text.** Quests, people of the world and things are text
   files with a declared format and version in the adventure's folder, loaded
   and checked by the server; a file with problems is left out and named, the
   rest loads. The formats only grow (`ADR-074`).
2. **The server enforces every step.** Distances, step conditions and
   positions are checked on the server; progress is kept per person on the
   server and reaches only its owner; what one person uses stays in the world
   for the others unless the thing says otherwise.
3. **Escape rooms are state machines on the server.** Their state changes
   only by events the server validates, never by a page's claim, and there is
   no paid chance in them (`PRI-015`).
4. **The tree is the policy.** Options, actions and conditions live in the
   text; a language model may at most phrase a written line in another tone,
   never add an option or decide an outcome; the written line is the fallback.
5. **KHR_interactivity is a bridge.** Its behaviour graphs are a superset of
   trigger–action lists, so the engine's rules (`ADR-078`) export into it and
   its trigger–action subset imports; it never runs shared state, because its
   specification is for a single user and the engine's viewer library does
   not read it.

## 3. Alternatives considered

- **Adventures as scripts.** Flexible, not writable by a designer or a model
  from a schema, and the model could decide outcomes; rejected.
- **KHR_interactivity as the runtime.** A ratified standard with tooling, but
  single-user by its own text and unread by the viewer library; kept as a
  door.
- **Progress on the page** (local storage). Cheaper, cheatable and lost with
  the browser; rejected.

## 4. Consequences

- The escape room's rules (`ADR-078`) are a closed list that maps into
  KHR_interactivity's subset; nothing in them may need a per-frame check.
- A quest may cite a placed object by its id, so the mission follows the
  object when the builder moves it; the written position of a thing remains
  valid for old adventures.
- Any future phrasing by a model follows `STD-050`: the player's name and
  anything a person wrote go in one fenced block, rebuilt each time.
- Legal questions on games of chance stay in `DBT-022`; this decision keeps
  chance out of paid paths altogether.

## 5. Status

Decided by the Oracle on 2026-10-13 and 2026-10-15; the KHR_interactivity
reading is from 2026-10-16. Built in numinia-engine: the three formats with
their checks, server-side steps and progress per guest, the quest book and
the map's objectives. Pending: the escape room's rules and the export to
KHR_interactivity. Recorded here on 2026-10-16, pending the Oracle's
acceptance on the pull request.
