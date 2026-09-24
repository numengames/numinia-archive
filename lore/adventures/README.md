<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# adventures/ — what is played

An adventure is a module a Game Director runs at a table: a Root, its Pieces
of Conflict, its Rumours, and the six Phases the manual prescribes
(`../game/manual/es/07-construyendo-la-aventura.md`, chapter 7 «Construyendo la aventura»,
Fragments 1–6). Missions are the archive's work units; adventures are the
game's. They do not share a series.

| File | What | Length | Where it came from |
|---|---|---|---|
| `session-zero.md` | The four introductory escape rooms (Thresholds of Thought, Transformation, Justice, Valor), seals and Prism Cells. The tutorial: guilds and factions by playing them. | one session | `numinia-lore:seminal/About_Session_Zero.md` |
| `el-espejo-roto.md` | *El Espejo Roto* — module for Distrito Ouroboros, 2–3 sessions, medium difficulty. Drusa Malter, the Splintered Mirror, the Möbius Corridor. | 2–3 sessions | born as the manual's closing module (v0.6.0); since 2026-09-24 it lives only here — a module of its own, not a chapter |
| `the-broken-mirror.md` | *The Broken Mirror* — the English translation of *El Espejo Roto*, same headings, names from `../game/manual/glossary-es-en.md`. | 2–3 sessions | translated 2026-09-24; the Spanish stays the original |

## Writing one

Copy `TEMPLATE.md`. Its sections are the manual's: the module's header
(duration, difficulty, district, opening conflict), then Root → Founding
facts → Spaces of indeterminacy → Potential proposals → Pieces of Conflict
(with a Direction Piece) → the six Phases → pregenerated anchors for the
Director. One file per adventure, kebab-case, in the language it is played
in. No frontmatter: this folder is prose, outward of the header rules.
