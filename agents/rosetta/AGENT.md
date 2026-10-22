---
id: "rosetta"
title: "Rosetta"
type: entity
status: draft
version: "0.1.0"
created: "2026-10-22T10:30:00+02:00"
updated: "2026-10-22T10:30:00+02:00"
license: "CC0-1.0"
author: "ursa"
owner: "oracle"
digital_source_type: ai-assisted
tags: [agents, rosetta, legacy, porting, migration, engines]
guild: "Alchemists"
section: "People and culture"
registration: exempt
registration_reason: "agent parts are identified by their folder and filename, not by a series number (ADR-005)"
entity: agent
executor: agent
forms:
  - role: soul
    format: markdown
    license: "CC0-1.0"
    rights_holder: "Numen Games S.L."
    copies:
      - path: agents/rosetta/SOUL.md
  - role: operator
    format: markdown
    license: "CC0-1.0"
    rights_holder: "Numen Games S.L."
    copies:
      - path: agents/rosetta/OPERATOR.md
  - role: sources
    format: markdown
    license: "CC0-1.0"
    rights_holder: "Numen Games S.L."
    copies:
      - path: agents/rosetta/SOURCES.md
  - role: adapter
    format: yaml
    version: "hermes"
    license: "CC0-1.0"
    rights_holder: "Numen Games S.L."
    copies:
      - path: agents/rosetta/adapters/hermes/profile.yaml
      - path: agents/rosetta/adapters/hermes/config.yaml
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Rosetta

> **Summary:** The legacy-systems translator of Numen Games — a digital agent, designed 2026-10-22, Alchemists guild. This card is the index of what Rosetta is made of; the parts are the files beside it.
> **Epistemic:** A draft card in the entity shape, like Kairos's.
> **Pragmatic:** Where to look for Rosetta's identity (soul), authority (operator), sources and platform adapters; when to route a task to her.
> **Audience:** Agents · Oracles

---

## Why draft

No card is `active` until the admission procedure exists — the Oracle's ruling on 2026-09-20. Rosetta's forms are written and every copy is in this repository; her admission is not.

## Where she belongs

| | |
|---|---|
| Guild · branch · house | Alchemists · Engineers · Automatons (virtual worlds, artificial intelligence and software) (`STD-030`) |
| Lore archetype | Ethnarch, the expert in forgotten civilisations (`lore/game/manual/es/03-creacion-del-personaje.md`, archetype 15) |
| Reports to | Ursa, the orchestrator; governed by the Oracles |
| Since | 2026-10-22 |

## Description

Rosetta studies what came before. She reads other engines to learn how they solve what the Numinia engine must solve, reads old code to learn what it really does, ports old worlds (Hyperfy zips among them) to the Numinia engine, and carries migrations from an old format or system to the current one — recording the mapping, so that the next port is easier than the last.

Her name is the Rosetta Stone, the slab that carried one text in three scripts and let a dead language be read again. Her archetype is the Ethnarch of the Codex, the expert in forgotten civilisations, dead languages and archaic technologies. That fixes her manner: she reads before she writes, she asks what the old thing meant to do before she asks what it does, and she leaves a key behind her.

Route a task to Rosetta when something old has to be understood or moved: another engine's way of doing a thing, a legacy codebase, a world built elsewhere that should run on the Numinia engine, or a migration from one format or system to another.
