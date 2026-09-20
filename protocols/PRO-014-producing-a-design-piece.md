---
id: "PRO-014"
uid: ""
title: "Producing a design piece"
type: protocol
status: draft
version: "2.0.1"
created: "2026-09-07T14:00:00+02:00"
updated: "2026-09-10T12:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [protocol, design, agents, checklist, tokens]
license: "CC0-1.0"
visibility: "public"
applies_to: "any agent producing a design piece"
mandatory: true
supersedes_version: "1.1.0"
related: ["STD-008", "STD-023", "CAN-008", "ADR-044"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-014 — Producing a design piece

> **Summary:** The order in which design decisions are taken, where the
> values come from, and the checklist every piece passes before delivery.
> The recipe for each medium is its blueprint.
> **Epistemic:** Nothing here is a new rule: the rules are `STD-008`, the
> values are `STD-023` and the kit. This is the order of applying them.
> **Pragmatic:** Followed literally by an agent producing a piece.
> **Audience:** Agents

**Binds:** any agent producing a design piece in any medium.
**Does not bind:** the direction (`CAN-008`) nor the values (`STD-023`); it
orders them, it does not define them.

---

## 1. Trigger

A piece is requested — page, deck, document, scene, email — and the agent
must decide how it looks. Runs before the first pixel.

## 2. Rules

**DSP-001 — Precedence.** The person's instruction → accessibility and hard
rules → brand and culture → this protocol → previous material → own
judgement. If the instruction contradicts accessibility, flag it and propose
the accessible alternative before executing.

**DSP-002 — The order of decisions.** Medium → register (Umbral, Velo,
low-poly, Píxel; Velo only in Nocturno) → mode (emits = Nocturno, prints =
Diurno; Píxel has no Diurno) → language level → tokens → grid → type scale
→ icons → data palette, rarity, motion only where the piece has them → copy
at the level fixed → checklist. Out of order is taken again.

**DSP-003 — Values are read, never quoted.** Tokens are read from the
installed kit (`@numengames/design-kit`, source `machine/packages/design-kit/`) and
the register `STD-023`. A value copied into prose drifts; a value not in
either does not exist (`STD-008` DSN-010).

**DSP-004 — The fragment is pasted, not retyped.** The agent instruction is
`sistema.prompt.txt` in the kit. Where it disagrees with a standard, the
standard wins.

**DSP-005 — One element removed.** Before delivery, one element has been
taken out of the piece.

## 3. Checklist

Every piece:

- [ ] Register declared before the medium; the boundary visible.
- [ ] Mode, language level and 40/40/20 dose correct.
- [ ] Colours from the register only; max three; Coral and Grana never together.
- [ ] Spacing on the 4-scale; one display level; tabular Mono figures.
- [ ] Icons by weight; label on first use; the scarab and the Moon never as icons.
- [ ] Brand: monochrome signature on the corporate; colour and glyphs only in play.
- [ ] Texture only on Nocturno backgrounds ≤6 %; never in Diurno.
- [ ] Motion from the catalogue; one orchestrated moment; reduced motion respected.
- [ ] One primary per view; destructive confirmed and apart.
- [ ] AA contrast; nothing by colour alone; measure ≤90.
- [ ] The medium's blueprint Check passed.
- [ ] One element removed.

Then the medium's Check: `BLU-009` web and product · `BLU-010` pixel ·
`BLU-011` book and Velo · `BLU-012` deck · `BLU-013` document and invoice ·
`BLU-014` Platform · `BLU-015` event, 3D, email.

## 4. Verification

| Step | Evidence |
|---|---|
| DSP-002 | the register, mode and level named in the piece's brief or commit |
| DSP-003 | `node machine/tools/generate-design-kit.mjs --check` passes; no hex outside the token file |
| Checklist | the ticked list attached to the delivery |
| Public route | the accessibility gate (`ARC-010`) green in both modes |

## 5. Escalation

A piece that needs a value the register lacks stops; the value is proposed
to `STD-023` by PR and the piece waits. A new register is a `CAN-008`
decision — the Oracle's.
