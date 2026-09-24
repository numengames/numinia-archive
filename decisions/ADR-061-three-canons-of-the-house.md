---
id: "ADR-061"
uid: ""
title: "Three canons of the house take the Oracle's review: play as principle, three forces, a reader for the licence"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-24T19:00:00+02:00"
updated: "2026-09-24T19:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, brand, visual-identity, licensing]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "CAN-002 gains why a game (play is our first narrative, first lesson and first creative drive) and loses Who we are, whose Oracles table moves to the agents index where the site now reads it; CAN-008 loses its restatement of the house's purpose and reorganises its registers as the three forces of the world — Umbral, Velo, Prisma — with low-poly and pixel as the Prisma's two manifestations; CAN-005 keeps every thesis and is rewritten around a reader who wants to use something of ours. Three glyphs stay three."
related: ["CAN-002", "CAN-008", "CAN-005", "CAN-010", "ADR-052", "ADR-055", "ADR-056", "ADR-059", "ADR-060"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-061 — Three canons of the house take the Oracle's review

> **Summary:** The last three notes of the Oracle's review of the canon
> series, applied in one change because they cross: the brand canon and the
> visual canon each told the other's story, and the licensing canon told its
> own in the wrong voice.
> **Epistemic:** What was missing in each, what was duplicated between two,
> and what stays as it was.
> **Pragmatic:** One PR, one signature, the canon review closed.
> **Audience:** Agents · Oracles

---

## 1. Context

The Oracle reviewed the eight canons on 2026-09-23. Five of his notes are
already applied (`ADR-057`, `ADR-058`, `ADR-059`, `ADR-060`). The three that
remain, in his words:

- **`CAN-002`**: *What does this document really talk about? The game?
  Some context is missing. I would include the philosophical principle of
  play for Numen: the game is our first narrative, our first lesson and our
  first creative drive. Does the last section, "Who we are", belong here?*
- **`CAN-008`**: *The first section is redundant with 002; it can be
  integrated. It is strange to mix Umbral and Velo (perspectives of the
  world) with Low-poly and Píxel (manifestations of the world). Umbral and
  Velo are two forces that join with the third force of Numinia, the Prisma
  (refraction). Give the Prisma its category beside them, as a force that in
  Numinia wraps two manifestations: Low-poly and Píxel.* And on the glyphs:
  three are three; the glyphs are design, not canon.
- **`CAN-005`**: *The first point is abstract, unclear — one does not
  understand what the governance values refer to. The rest is understood
  better, but the whole document is sententious, not explanatory, not kind.*

Measured:

| | `CAN-002` 3.0.0 | `CAN-008` 2.0.0 | `CAN-005` 4.1.0 |
|---|---|---|---|
| body words | 875 | 1 436 | 616 |
| said in another canon too | imagery (also `CAN-008`), three levels of voice (also `CAN-008`) | purpose, cause, values, pillars (all `CAN-002`) | — |
| dates or clocks in the body | *began in 2020*, *more than fifteen years* | — | — |
| tables read by code | the Oracles (`web/src/lib/agents.ts`) | — | — |
| sentences per case given | — | — | 0 |

The imagery was told three ways across `CAN-002`, `CAN-006` and `CAN-008`
(*Mediterranean wisdom, steampunk and cyberpunk, Khepri* / *early 20th and
21st century* / *solarpunk 40, steampunk 40, cyberpunk 20*), and the three
levels of language twice. The phrase the Oracle asked for exists in the
manual's introduction in both languages: *El juego es nuestra primera
narrativa, nuestra primera lección y nuestro primer impulso creativo.* The
three forces exist in the manual, chapter 2, *the three living forces of
Numinia*: *where the Velo keeps and the Umbral manifests, the Prisma
unfolds; it creates no truths, it multiplies perspectives.*

## 2. Decision

### `CAN-002` → `4.0.0`

**Gains *Why a game*.** After the purpose and before the values: play is our
first narrative, our first lesson and our first creative drive; a game is
the oldest way of understanding a situation from inside it; a framework can
stand without one and stands flat; the story turns up anyway in brushstrokes
nobody is aware of, so it is done on purpose. The reasoning is the long
role-structure text's opening (*the game as ground*), in plain words.

**Loses *Who we are*.** Founding year, fifteen years, biographies — history
with a clock. One sentence survives at the end of *The name*: friends who
play, build, learn and divulge, that order matters. **The Oracles table
moves to `agents/INDEX.md`** under a new *Oracles* heading, and
`web/src/lib/agents.ts` reads it there; the build still fails if the table
does not parse.

**Loses *Where the imagery comes from*.** Two lines remain — the name, the
scarab and the moon — and the canon of visual identity is named as owner of
the imagery. The three levels of voice stay here; `CAN-008` now cites them.

**Closes on `CAN-010`**: *Leave things better than we found them. What that
sentence obliges of an act is its own canon.* 891 words.

The ethics is not developed here: the Oracle's *first step towards an
ethical construction* became `CAN-010` (`ADR-060`).

### `CAN-008` → `3.0.0`, retitled *One identity, three forces*

**Loses *Where it comes from*.** Purpose, cause, values and pillars are
`CAN-002`'s. What stays is what each value obliges *of a piece* — nothing
decorative, accessibility as equity, surprise minimised where the user acts,
material that lasts — under *What the values oblige of a piece*.

**The four registers become the three forces.** Umbral (manifestation: the
base system, the force that invoices), Velo (depth: no new colour, only
transparency), Prisma (refraction: creates no truths, multiplies
perspectives) — and inside the Prisma, its two manifestations, low-poly and
pixel, each entered and left whole, *because a refraction is an angle and an
angle is not mixed*. The fusion rule reads *forces do not stack*. Every rule
on low-poly and pixel is unchanged.

**The voice defers to `CAN-002`.** The paragraph restating the three levels
becomes what a piece does with them. The sentence *its names are never
translated* becomes *written as the manual and its translation glossary fix
them* — the glossary exists since 2026-09-24 and the canon of roles already
uses its English.

**The glyphs are three**, as they were. 1 497 words.

### `CAN-005` → `5.0.0`

**Every thesis kept; the voice changed.** It opens on a reader — a teacher, a
studio, a developer, a fan — with one question: *what may I take?* The
*governance values* become five kinds of thing each held differently, each
with the reader it serves. Each rule carries a case: the door that opens
outward; *it happened to us* on the canon's own licence; the Oracle's
signature as arithmetic, not distrust; the name as what makes a promise
worth something. 1 041 words. No licence, regime or gate changes; `STD-010`,
`STD-014` and `PRO-018` are untouched.

### Everywhere

- `agents/INDEX.md` `3.1.0`; `web/src/lib/agents.ts` reads the Oracles from
  it; the rule index in `AGENTS.md` regenerated for `CAN-008`'s title.
- `/updates` entry for the site change.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Three PRs, one per canon | `CAN-002` and `CAN-008` each held the other's material; moving it in one direction only leaves the other canon stating what it no longer owns for one merge. The Oracle asked for one PR |
| Keep *Who we are* without the dates | Without the dates it is four names and a sentence; the names are a roster and the sentence survived. A biography without a clock is not a biography |
| Keep the Oracles table in the canon because the site reads it | The site reads the archive, not the other way round (`PRE-002`). The reader moved with the table |
| Keep four registers and add the Prisma as a fifth | The Oracle's point was that four mixed two levels. Three forces, one of which has two manifestations, is the manual's own structure |
| Name a fourth glyph | The Oracle: three are three; glyphs are design |
| Rewrite `CAN-005`'s theses as well as its voice | The theses were never the complaint. Reversing none keeps `STD-010`'s regime table and every plate exactly as ratified |
| Develop the ethics in `CAN-002` | `ADR-060` opened `CAN-010` for it |

## 4. Consequences

- **Obliges:** nothing new in `CAN-002` or `CAN-005`. In `CAN-008`, a piece
  now declares a force rather than a register — same set of choices, one
  level fewer.
- **Costs:** `CAN-008`'s title changes on the site; the imagery is told once
  (`CAN-006` still mentions steampunk and cyberpunk in its own argument and
  is left alone). Section anchors of all three change.
- **Follow-up:** the design-values register and the web blueprint speak of
  *registers*; they take *forces* as each is next touched, not in a sweep.
- **Reversal:** git holds the three prior versions.

## 5. Status

Proposed. It takes effect when the Oracle approves the pull request that
carries it.
