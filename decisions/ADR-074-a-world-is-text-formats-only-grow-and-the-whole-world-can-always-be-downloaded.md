---
id: "ADR-074"
uid: ""
title: "A world is text: a folder with a schema is the truth, formats only grow, glTF is the delivery, and the whole world can always be downloaded"
type: adr
status: draft
version: "0.1.0"
created: "2026-10-16T10:55:00+00:00"
updated: "2026-10-16T10:55:00+00:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Technology"
tags: [decisions, adr, virtual-worlds, engine, formats, gltf, data, portability]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "In Numinia's engine a world is data, not code: the truth of a world is a folder of text files with a schema and a version (the world's placed objects and their state, the adventure's quests, people and things, the environment) plus assets named by their hash. Formats only grow — a new version adds fields and never breaks a file an older engine wrote. Delivery to a viewer is glTF with the house extension; a packed file such as Hyperfy's is a delivery, never the truth. A whole world can always be downloaded as one archive that another server of the engine reads back, by its owners, at any time."
amends: []
related: ["ADR-069", "ADR-072", "PRI-012", "STD-010"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-074 — A world is text

> **Summary:** The engine keeps every world as text files with a schema, adds
> to its formats without ever breaking old files, delivers glTF to viewers,
> and lets the owners download the whole world as one archive at any time.
> Decided between 2026-10-11 and 2026-10-16 in the engine study; written here
> so it can be changed.
> **Epistemic:** The Oracle's rulings of 2026-10-13 (the world as data,
> additive formats), 2026-10-15 («bajar un zip del mundo o subir un zip») and
> 2026-10-16 («que el mundo lo lleve todo, bajarlo y arrancarlo en local»).
> The reasons are Ursa's, from the engine evaluation and from what the
> closing of Rec Room on 2026-06-01 showed: its creators could not download
> a working copy of their rooms.
> **Pragmatic:** Every format the engine reads is a text file an LLM can
> write and a person can review in a pull request; migrations are additive;
> an organisation that leaves takes its world with it.
> **Audience:** Agents · Oracles

---

## 1. Context

The engine was built, rather than adopted, because nothing free in October
2026 joined WebGPU, WebXR, a thousand people in one instance and TypeScript.
The evaluation that led there kept one lesson from Hyperfy above the rest: its
world lives in a binary pack that is the only truth, so nothing can be
reviewed, diffed or migrated, and its script API changes under the objects.
`PRI-012` says what is yours stays with you, and `ADR-069` already makes a
world a card in the archive with an order the servers read.

On 2026-10-16 the Oracle also ruled that the world folder carries everything
(placed objects, adventure, environment) so that a world moves between the
house's fleet, a bare server and a laptop without losing anything.

## 2. Decision

1. **The truth is text.** A world is a folder: a manifest with a schema and a
   version; the placed objects and their shared state, saved as text (a
   snapshot plus a journal); the adventure's quests, people of the world and
   things, one text file each, with a declared format name and version
   (`mision@1`, `pnj@1`, `cosa@1`, `habitante@1`); the environment; and assets
   named by their SHA-256 hash. Secrets and sessions never go in it.
2. **Formats only grow.** A new version of a format adds fields; an older
   file keeps loading and unknown fields are kept, never dropped. Nothing a
   world wrote becomes unreadable by a newer engine.
3. **Delivery is glTF.** What a viewer receives is glTF with the house
   extension for the world's own data; a packed file (a `.hyp`, a zip) is a
   delivery or a transport, never the truth.
4. **The whole world downloads.** The owners of a world can download it as
   one archive — manifest, data, adventure, environment, uploaded assets —
   and another server of the engine, or a laptop, reads it back. The archive
   is the exit guarantee: a world does not depend on the house's servers
   to exist.

## 3. Alternatives considered

- **A binary pack as the truth** (Hyperfy's `.hyp`, a SQLite file). Fast to
  load, impossible to review or migrate by hand; rejected, kept only as a
  delivery format and as something the engine can import.
- **Code as the truth** (a script per world, as Roblox or Core). Powerful, but
  not reviewable by non-programmers and not writable by an LLM from a schema
  alone; scripts stay a later, sandboxed layer on top of data.
- **No download, only the house's copies.** What Rec Room's creators met on
  2026-06-01. Rejected by `PRI-012`.

## 4. Consequences

- Any new feature of the engine declares its format as text with a version
  before it ships; a feature that cannot be saved as text does not persist.
- A published version of a shared space (`ADR-078`) is such an archive with a
  note; it can be kept in git and reviewed as a pull request without the
  designer seeing git.
- Importing a Hyperfy world is an import into this format, done once.
- The archive weighs what its assets weigh; limits per world are published
  with the rest of the engine's limits.

## 5. Status

Decided by the Oracle on 2026-10-13, 2026-10-15 and 2026-10-16. Built in
numinia-engine: text formats for quests, people and things; placed objects
saved as text; the world archive that downloads and uploads from the server's
own page; since 2026-10-16 the world folder carries adventure and environment
too. Recorded here on 2026-10-16, pending the Oracle's acceptance on the pull
request.
