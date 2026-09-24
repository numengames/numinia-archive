<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# lore/ — the game

The world of Numinia and the game played in it. **Public domain (CC0-1.0)** —
each file says so in its own SPDX comment. Copy it, adapt it, play it, publish
your own adventures: no permission, no attribution needed. Only the names
**Numinia**, **Numen Games** and **Khepri** are kept (`TRADEMARKS.md`). Home in this repository since 2026-09-17 —
before that, the `numinia-lore` repository, now archived; before that,
`numinia-web`.

| Folder | What | Read by |
|---|---|---|
| `game/` | The rules. `manual/es/` is the canonical text of the RPG (v0.6.0), one file per chapter, `00-introduccion.md` to `07-construyendo-la-aventura.md` (source of numinia.com's domain model and the Codex); `manual/en/` will hold the English translation, chapter by chapter, following `manual/glossary-es-en.md` (the fixed English for every term). `attributes-and-ranks.md` the compendium. | numinia.com Codex (`numinia-web: scripts/fetch-lore.mjs`), Senet, `SYS-003` |
| `adventures/` | What is played: modules a Director runs at a table. Session Zero (the tutorial), *El Espejo Roto*, and `TEMPLATE.md` for the next one. | Directors, Senet |
| `world/` | Who and what Numinia is: welcome, brand and culture, role structure, the epistemic relation with Numen Games. | Senet, Calliope, the company site |
| `codex/` | Edition matter of the printed/EPUB Codex: glossary, acknowledgments, character sheet (text + image), legal note. | numinia.com Codex |

Not a series: no ids, no frontmatter ring, not mirrored by numinia.org
(this viewer is public; the manual is not published as a page). The guards
treat `lore/**` as outward prose (`std-004`, `std-020`). Corrections go here;
the sites re-derive at build.

Missions are the archive's work units (`missions/`). Adventures are the
game's. They do not share a series and are not counted together.
