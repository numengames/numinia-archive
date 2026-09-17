<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: LicenseRef-Numen-AllRightsReserved
-->

# adventures/ — what is played

An adventure is a module a Game Director runs at a table: a Root, its Pieces
of Conflict, its Rumours, and the six Phases the manual prescribes
(`../game/manual-v0.6.0.md`, chapter 7 «Construyendo la aventura»,
Fragments 1–6). Missions are the archive's work units; adventures are the
game's. They do not share a series.

| File | What | Length | Where it came from |
|---|---|---|---|
| `session-zero.md` | The four introductory escape rooms (Thresholds of Thought, Transformation, Justice, Valor), seals and Prism Cells. The tutorial: guilds and factions by playing them. | one session | `numinia-lore:seminal/About_Session_Zero.md` |
| `el-espejo-roto.md` | *El Espejo Roto* — module for Distrito Ouroboros, 2–3 sessions, medium difficulty. Drusa Malter, the Splintered Mirror, the Möbius Corridor. | 2–3 sessions | the manual's own closing module (v0.6.0, from «EL ESPEJO ROTO» to the end); the text stays in the manual too — numinia.com renders the manual whole |

## Writing one

Copy `TEMPLATE.md`. Its sections are the manual's: the module's header
(duration, difficulty, district, opening conflict), then Root → Founding
facts → Spaces of indeterminacy → Potential proposals → Pieces of Conflict
(with a Direction Piece) → the six Phases → pregenerated anchors for the
Director. One file per adventure, kebab-case, in the language it is played
in. No frontmatter: this folder is prose, outward of the header rules.
