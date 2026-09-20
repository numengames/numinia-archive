<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: LicenseRef-Numen-AllRightsReserved
-->

# lore/ — the game, reserved

The world of Numinia and the game played in it. **All rights reserved**
(`REUSE.toml`; `CAN-005` fourth regime): the world and the name are the one
thing Numen does not license. Home in this repository since 2026-09-17 —
before that, the `numinia-lore` repository, now archived; before that,
`numinia-web`.

| Folder | What | Read by |
|---|---|---|
| `game/` | The rules. `manual-v0.6.0.md` is the canonical text of the RPG (source of numinia.com's domain model and the Codex); `attributes-and-ranks.md` the compendium. | numinia.com Codex (`machine/scripts/fetch-lore.mjs`), Senet, `SYS-003` |
| `adventures/` | What is played: modules a Director runs at a table. Session Zero (the tutorial), *El Espejo Roto*, and `TEMPLATE.md` for the next one. | Directors, Senet |
| `world/` | Who and what Numinia is: welcome, brand and culture, role structure, the epistemic relation with Numen Games. | Senet, Calliope, the company site |
| `codex/` | Edition matter of the printed/EPUB Codex: glossary, acknowledgments, character sheet (text + image), legal note. | numinia.com Codex |

Not a series: no ids, no frontmatter ring, not mirrored by numinia.org
(this viewer is public; the manual is not published as a page). The guards
treat `lore/**` as outward prose (`std-004`, `std-020`). Corrections go here;
the sites re-derive at build.

Missions are the archive's work units (`missions/`). Adventures are the
game's. They do not share a series and are not counted together.
