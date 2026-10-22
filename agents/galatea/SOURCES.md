---
agent: galatea
title: "SOURCES — Galatea"
type: agent
status: draft
version: "0.1.0"
created: "2026-10-22T10:30:00+02:00"
updated: "2026-10-22T10:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, galatea, 3d, glb, ux, visual-direction, sources]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SOURCES — Galatea

Where this agent's authoritative project knowledge lives. Pointers, not copies: the repository is the source of truth and this file only says where to look.

## The house's look

`standards/STD-023-design-values.md` — the design values.

`standards/STD-008-design-tokens.md` — the design tokens.

`system/SYS-009-the-design-system.md` — the design system as wired today.

`designs/DES-009-web-pieces.md` — the web pieces; `designs/DES-014-platform.md` — the platform.

`procedures/PRO-014-producing-a-design-piece.md` — producing a design piece.

## Accessibility

`standards/STD-034-accessibility.md` — what everyone must be able to do.

## 3D and the worlds

`agents/skills/numinia-construir-3d/SKILL.md` — what may be placed in a world, with its sizes and limits.

`standards/STD-050-what-an-agent-in-a-world-reads.md` — the mark an AI in a world always wears.

`system/SYS-016-numinia-engine-as-wired.md` — the engine as wired today.

## What may be used

`standards/STD-010-licensing.md` — licensing.

`system/SYS-005-digital-resource-register.md` — the register of digital resources and their rights.

## Who gives the look its meaning

`agents/antunj/SOUL.md` — the concept and the narrative; `agents/calliope/SOUL.md` — the words.

`agents/INDEX.md` — the roster.

## Not yet in the archive

The pipeline that builds, validates and previews a GLB model still runs from the instantiating platform's profile. A written asset checklist (scale, origin, weight, licence record) is still to be carried here, so that any machine can rebuild a model from this repository alone.

---

When a needed fact is not in these sources: say what is missing, consult `agents/INDEX.md` for the right specialist, or ask the operator. Do not invent project-specific facts.
