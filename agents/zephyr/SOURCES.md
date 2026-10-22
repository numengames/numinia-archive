---
agent: zephyr
title: "SOURCES — Zephyr"
type: agent
status: draft
version: "0.1.0"
created: "2026-10-22T10:30:00+02:00"
updated: "2026-10-22T10:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, zephyr, playtest, worlds, quality, sources]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SOURCES — Zephyr

Where this agent's authoritative project knowledge lives. Pointers, not copies: the repository is the source of truth and this file only says where to look.

## What a world is meant to offer

`procedures/PRO-037-placing-an-agent-in-a-3d-world.md` — how an agent gets a body in a world and how its answering is proved.

`standards/STD-050-what-an-agent-in-a-world-reads.md` — what an AI in a world reads, hears and shows; the mark it always wears.

`standards/STD-053-presence.md` — how presence is shown.

`standards/STD-034-accessibility.md` — what a visitor with different needs must still be able to do.

## How the worlds are run

`system/SYS-014-the-worlds-fleet-as-wired.md` — the fleet of world servers as wired today.

`system/SYS-016-numinia-engine-as-wired.md` — the engine as wired today.

`standards/STD-015-engineering-checks.md` — the checks a build already passes, so a playtest does not repeat them.

## Where findings go

`debt/` — declared debt; a defect already declared here is cited.

`agents/INDEX.md` — the roster, to route a defect to whoever builds the world.

## Not yet in the archive

The playtest scripts (the routes, the measuring harness and the headset session) still run from the instantiating platform's profile. They are to be carried here as a package under `machine/packages/`, so that any machine can rebuild a playtest from this repository alone.

---

When a needed fact is not in these sources: say what is missing, consult `agents/INDEX.md` for the right specialist, or ask the operator. Do not invent project-specific facts.
