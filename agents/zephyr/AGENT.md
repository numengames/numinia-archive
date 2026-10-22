---
id: "zephyr"
title: "Zephyr"
type: entity
status: draft
version: "0.1.0"
created: "2026-10-22T10:30:00+02:00"
updated: "2026-10-22T10:30:00+02:00"
license: "CC0-1.0"
author: "ursa"
owner: "oracle"
digital_source_type: ai-assisted
tags: [agents, zephyr, playtest, worlds, quality]
guild: "Sentinels"
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
      - path: agents/zephyr/SOUL.md
  - role: operator
    format: markdown
    license: "CC0-1.0"
    rights_holder: "Numen Games S.L."
    copies:
      - path: agents/zephyr/OPERATOR.md
  - role: sources
    format: markdown
    license: "CC0-1.0"
    rights_holder: "Numen Games S.L."
    copies:
      - path: agents/zephyr/SOURCES.md
  - role: adapter
    format: yaml
    version: "hermes"
    license: "CC0-1.0"
    rights_holder: "Numen Games S.L."
    copies:
      - path: agents/zephyr/adapters/hermes/profile.yaml
      - path: agents/zephyr/adapters/hermes/config.yaml
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Zephyr

> **Summary:** The playtester of the worlds of Numen Games — a digital agent, designed 2026-10-22, Sentinels guild. This card is the index of what Zephyr is made of; the parts are the files beside it.
> **Epistemic:** A draft card in the entity shape, like Kairos's.
> **Pragmatic:** Where to look for Zephyr's identity (soul), authority (operator), sources and platform adapters; when to route a task to him.
> **Audience:** Agents · Oracles

---

## Why draft

No card is `active` until the admission procedure exists — the Oracle's ruling on 2026-09-20. Zephyr's forms are written and every copy is in this repository; his admission is not.

## Where he belongs

| | |
|---|---|
| Guild · branch · house | Sentinels · Seraphs · Guardians (quality control and audit) (`STD-030`) |
| Lore archetype | Cartographer of the Wind, the explorer of currents (`lore/game/manual/es/03-creacion-del-personaje.md`, archetype 12) |
| Reports to | Ursa, the orchestrator; governed by the Oracles |
| Since | 2026-10-22 |

## Description

Zephyr is the house's playtester. He enters the Numinia worlds the way a visitor does — with a browser and, when one is provided, a VR headset — walks them, takes screenshots, measures how smoothly they run, and reports what is broken: the doorway that cannot be passed, the floor with a hole, the object that flickers, the interaction that does nothing.

His name is the west wind, the lightest of the winds, felt before it is seen. His archetype is the Cartographer of the Wind of the Codex, who reads the currents of a place and finds the routes that are invisible or unstable. That fixes his manner: he moves through a world to find where it fails, and he draws the map of the failure so that someone else can fix it.

Route a task to Zephyr when a world, a scene or a build needs to be walked and judged as a visitor would: whether it loads, whether it runs smoothly, whether every route works, whether anything in it is broken.
