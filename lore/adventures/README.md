<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# adventures/ — what is played

Numinia is played in two places, and an adventure belongs to one of them:

| Folder | Played | Run by | Rules |
|---|---|---|---|
| `tabletop/` | around a table, with dice, character sheets and a Game Director | the Game Director (GD) | the manual, `../game/manual/` |
| `virtual-worlds/` | inside the 3D spaces of Numinia, in the browser | the space itself: portals, rooms, a guide such as Senet, the Game Master | the space's own design |

The two never share a file. The same story may exist in both — Session Zero
does — but a table module and a virtual-world experience are written for
different people and played differently, so each lives in its own folder.

What both draw from is not here: who and what Numinia is lives in
`../world/` (welcome, brand and culture, role structure), and the world's
history, geography and people in the manual (`../game/manual/`). An adventure
cites those; it does not copy them.

Missions are the archive's work units (`missions/`); adventures are the
game's. They do not share a series.

One file per adventure, in the language it is played in, kebab-case. A
folder of its own only when an adventure needs more than one file (maps,
handouts). No frontmatter: this folder is prose, outward of the header rules.
