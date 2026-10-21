---
title: "SKILL reference — Building recipes"
type: agent
status: active
version: "1.0.0"
created: "2026-10-20T14:00:00+02:00"
updated: "2026-10-20T14:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, skill, reference]
license: "CC0-1.0"
registration: exempt
registration_reason: "a reference file of a cross-agent skill is identified by its path inside the skill folder (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Recipes

Four things built with `bloque` and `farolillo`, with the numbers. Each was run against a real world server with the same bridge the relay uses; the calls are what each costs against the cap of 12 every 10 seconds. Build one, wait 10 seconds, build the next.

Take a point `(cx, cz)` from `mirar`: your own x and z plus 5, with nobody there. All offsets below are from it. Parameters not shown are left out (`y` 0, `giro` 0).

## Table with a lantern (6 calls)

| # | modelo | x | z | y | escala_x · y · z |
|---|---|---|---|---|---|
| 1 | bloque | cx | cz | 0.72 | 1.6 · 0.1 · 0.9 |
| 2-5 | bloque | cx ± 0.7 | cz ± 0.35 | 0 | 0.1 · 0.72 · 0.1 |
| 6 | farolillo | cx | cz | 0.82 | - |

Row 2-5 is four calls, one for each sign pair. The top is 1.6 m by 0.9 m and sits on four legs.

## Doorway (3 calls)

| # | modelo | x | z | y | escala_x · y · z |
|---|---|---|---|---|---|
| 1 | bloque | cx - 2.25 | cz | 0 | 1.5 · 2.5 · 0.3 |
| 2 | bloque | cx + 2.25 | cz | 0 | 1.5 · 2.5 · 0.3 |
| 3 | bloque | cx | cz | 2 | 3 · 0.5 · 0.3 |

A wall 6 m wide with an opening 3 m wide and 2 m high. For a wall along z instead, swap the x and z offsets and the width and depth.

## Steps (4 calls)

For `i` = 0, 1, 2, 3: `bloque` at x `cx`, z `cz + 0.4 × i`, y 0, escala_x 2, escala_y `0.2 × (i + 1)`, escala_z 0.4. Four steps going up towards +z, 2 m wide, each 20 cm higher. Placement is verified; that a person can walk up them is not.

## Small square (9 calls)

1. `bloque` at `cx`, `cz`, y 0, escala_x 10, escala_y 0.1, escala_z 10: a floor.
2. Eight `farolillo` at y 0.1, at these offsets from `(cx, cz)`: (4, 0), (2.83, 2.83), (0, 4), (-2.83, 2.83), (-4, 0), (-2.83, -2.83), (0, -4), (2.83, -2.83).

The 9 calls fit one window. Deleting it again takes 9 more calls, more than the window has left: 3 `borrar` at once, the rest after 10 seconds.

## If you need more than 12

Split into groups of 10 or fewer, `mirar` between them, and wait for the seconds "Despacio" gives. Never retry in a tight loop.

## Next

- `guia limites` — what else can refuse you.
- `guia catalogo` — other sizes to build from.
