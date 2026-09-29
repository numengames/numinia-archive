---
id: "PRO-014"
uid: ""
title: "Producing a design piece"
type: protocol
status: draft
version: "3.1.0"
created: "2026-09-07T14:00:00+02:00"
updated: "2026-09-27T15:45:00+02:00"
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
derived_from: "CAN-008"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-014 — Producing a design piece

> **Summary:** The order in which design decisions are taken, where the
> values come from, and the checklist every piece passes before delivery.
> The recipe for each medium is its blueprint; how the sky, the Veil and
> the reading player are built is `PRO-022`.
> **Epistemic:** In what order does an agent take the design decisions of a piece, and what does it check before delivering?
> **Pragmatic:** Followed literally by an agent producing a piece.
> **Audience:** Agents

**Binds:** any agent producing a design piece in any medium.

---

## 1. Purpose and trigger

A piece is requested — page, deck, document, scene, email — and the agent
must decide how it looks. Runs before the first pixel.

## 2. Preconditions

- The request: the medium, who will see the piece and where.
- The design kit installed (`@numengames/design-kit`) and its agent
  instruction, `sistema.prompt.txt`, at hand.
- The design values register `STD-023` readable.

## 3. Procedure

1. **Settle precedence.** The person's instruction → accessibility and hard
   rules → brand and culture → this protocol → previous material → own
   judgement. If the instruction contradicts accessibility, flag it and
   propose the accessible alternative before executing.
2. **Paste the fragment.** Paste the agent instruction `sistema.prompt.txt`
   from the kit; do not retype it. Where it disagrees with a standard, the
   standard wins.
3. **Take the decisions in order.** Medium → register (Umbral, Veil,
   low-poly, Píxel; Veil only in Nocturno) → mode (emits = Nocturno,
   prints = Diurno; Píxel has no Diurno) → language level → tokens → grid →
   type scale → icons → data palette, rarity, motion only where the piece
   has them → copy at the level fixed. A decision taken out of order is
   taken again.
4. **Read every value from the source.** Read tokens from the installed kit
   (`@numengames/design-kit`, source `machine/packages/design-kit/`) and the
   register `STD-023`. Never copy a value into prose — it drifts. A value in
   neither does not exist (`STD-008` DSN-010).
5. **Remove one element.** Before delivery, take one element out of the
   piece.
6. **Pass the checklist.** Every piece:
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
   - [ ] One element removed.
7. **Pass the medium's blueprint Check.** `BLU-009` web and product ·
   `BLU-010` pixel · `BLU-011` book and Veil · `BLU-012` deck · `BLU-013`
   document and invoice · `BLU-014` Platform · `BLU-015` event, 3D, email.

## 4. Verification

| Step | Evidence |
|---|---|
| 3 | the register, mode and level named in the piece's brief or commit |
| 4 | `node machine/tools/generate-design-kit.mjs --check` passes; no hex outside the token file |
| 6–7 | the ticked list attached to the delivery |
| Public route | the accessibility test (`ACC-004`) green in both modes |

## 5. Escalation

A piece that needs a value the register lacks stops; the value is proposed
to `STD-023` by PR and the piece waits. A new register is a `CAN-008`
decision — the Oracle's.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-008` | Design tokens | the rules this order applies |
| `STD-023` | Design values | where the values are read |
| `PRO-022` | Building the living pieces | the sky, the Veil and the reading player |
