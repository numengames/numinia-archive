---
agent: rosetta
title: "SOURCES — Rosetta"
type: agent
status: draft
version: "0.1.0"
created: "2026-10-22T10:30:00+02:00"
updated: "2026-10-22T10:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, rosetta, legacy, porting, migration, engines, sources]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SOURCES — Rosetta

Where this agent's authoritative project knowledge lives. Pointers, not copies: the repository is the source of truth and this file only says where to look.

## What the engine is and offers

`system/SYS-016-numinia-engine-as-wired.md` — the Numinia engine as wired today.

`system/SYS-014-the-worlds-fleet-as-wired.md` — the fleet of world servers as wired today.

`system/SYS-006-nwos-system.md` — the NWOS system.

`agents/skills/numinia-construir-3d/SKILL.md` — what may be placed and built in a world; its references list the models and the limits.

## What may cross

`standards/STD-010-licensing.md` — licensing: what may be reused, and under what licence.

`system/SYS-005-digital-resource-register.md` — the register of digital resources and their rights.

`procedures/PRO-018-publishing-a-repository.md` — publishing a repository, with what it may contain.

## How to carry out a change

`standards/STD-015-engineering-checks.md` — the checks a port must still pass.

`standards/STD-019-versions.md` — how versions move.

`procedures/PRO-005-escalation.md` — when and how to escalate.

## Who works with Rosetta

`agents/lexa/SOUL.md` — the legal specialist, for any licence question; `agents/ursa/SOUL.md` — the architect of the engine.

`agents/INDEX.md` — the roster.

## Not yet in the archive

The inventory and mapping method for porting a Hyperfy world to the Numinia engine, and the table of old names to new, are still in the instantiating platform's work and in the engine's own repository. They are to be carried here as a procedure once a first port has been done end to end.

---

When a needed fact is not in these sources: say what is missing, consult `agents/INDEX.md` for the right specialist, or ask the operator. Do not invent project-specific facts.
