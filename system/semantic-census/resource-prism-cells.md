---
id: "SYS-011:resource-prism-cells"
title: "Prism Cells"
type: entity
status: draft
version: "0.1.0"
created: "2026-09-29T12:10:00+02:00"
updated: "2026-09-29T12:10:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
category: "resource"
stage: draft
confidence: "medium"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Prism Cells

> **Summary:** Small faction-coloured tokens a character finds or earns when
> their way of acting coincides with a Faction. They measure affinity, and
> they can be spent, which makes them disappear.

Every claim ends with where it comes from: **(cited: `path` — «heading»)**
when a source says it (quote it, in the source's language), **(inferred)**
when several uses support it (name them), **(proposed)** when it is a
plausible reading nobody has confirmed yet.

## Entity

| | |
|---|---|
| Name in the manual (ES) | Células del Prisma (cited: `lore/game/manual/glossary-es-en.md` — «Células del Prisma \| Prism Cells») |
| Name in English | Prism Cells (cited: same — «Ya así en la Sesión Cero inglesa») |
| Category | resource (cited: the Oracle's ruling in chat, 2026-09-29) |
| Also written as | «Célula(s)», lower-case «células» in cost tables (cited: `lore/game/manual/es/04-sistema-de-juego.md` — «Coste de Células del Prisma»); `prismCells` / `PrismCellBalance` (cited: `numinia-web:packages/domain/src/types/seal.ts` — «Faction-affinity token balances») |

## Concept

A Cell records affinity, not knowledge: «Una Célula no certifica que el personaje haya aprendido algo sobre una facción. Registra que […] su manera de actuar o interpretar el mundo ha coincidido con ella» (cited: `lore/game/manual/es/06-inventario-y-bestiario.md` — «CÉLULAS DEL PRISMA»). It is the Prism's refraction made into an object: «materializaciones de afinidad que registran cómo uno decidió mirar» (cited: `lore/game/manual/es/02-historia-y-leyendas-de-numinia.md` — «Dinámica del Prisma»). Spending one converts affinity into «recuperación, oportunidad o adquisición» (cited: `06-inventario-y-bestiario.md` — «Gastar la afinidad»).

## Constitutive traits

- Four kinds, one per Faction, coloured apart from Guilds (cited: `06-inventario-y-bestiario.md` — «Morfología de las Células»).
- «Tokens fungibles, acumulables y consumibles»; not a permanent record (cited: same — «Naturaleza y función»).
- Collect any kind, use only your Faction's (cited: `04-sistema-de-juego.md` — «solo podrá usar las que pertenezcan a su Facción»).
- Scarce (cited: `lore/adventures/tabletop/el-espejo-roto.md` — «Conviene mantenerlas escasas»).

## Facets

| Facet | What it is | Provenance |
|---|---|---|
| Affinity record | Measures the bond with a Faction | cited: `06-inventario-y-bestiario.md` — «medida de su reconocimiento, experiencia y afinidad» |
| Access key | Accumulation opens content and possibilities | cited: same — «acceso progresivo a contenidos, capacidades, relaciones» |
| Recovery reserve | Removes States at 1–3 Cells each | cited: `04-sistema-de-juego.md` — «Coste de Células del Prisma» |
| Roll modifier | Raises a Roll result one degree per Cell | cited: `06-inventario-y-bestiario.md` — «Cada Célula consumida permite ascender un grado» |
| Currency | Preferred currency of the Black Market | cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Las Células del Prisma como moneda» |
| Found treasure | Natural treasure in hidden places, more at the periphery | cited: `04-sistema-de-juego.md` — «tesoros naturales» |
| Living node (cosmology) | Node where Prism light condenses around Factions | cited: `02-historia-y-leyendas-de-numinia.md` — «Las Células del Prisma» |

## Contexts

| Facet | Context that activates it | Provenance |
|---|---|---|
| Found treasure | Decode Surroundings Rolls in ruins, deposits | cited: `el-espejo-roto.md` — «Decodificar Entorno» |
| Affinity record | Faction exits of Session Zero | cited: `lore/adventures/virtual-worlds/session-zero.md` — «Prism Cells: the value of a faction» |
| Recovery / modifier | After a State or a Roll, at the player's choice | cited: `06-inventario-y-bestiario.md` — «Gastar la afinidad» |
| Currency | Street of Mysteries, Old Quarter | cited: `05-geografia-y-cultura-de-numinia.md` — «Anexo: El Mercado Negro de Numinia» |
| Contribution recognition (house) | Work ledger | cited: `STD-030` — «Units of activity» |
| Full economy (gamification) | Dial level 10 | cited: `blueprints/BLU-007-dual-nomenclature.md` — «Full Economy» |

## Relations

- **Seeds of Knowledge** — twin Token class: knowledge and permanent Prestige vs affinity, spendable (cited: `06-inventario-y-bestiario.md` — «Existen dos grandes clases de Tokens»).
- **Prisma (force)** — source, not the same entity (cited: `02-historia-y-leyendas-de-numinia.md` — «Por eso existen Células del Prisma»; `canon/CAN-008-visual-identity.md` — «the Prisma asks for a choice»).
- **Seals** — co-modelled in Session Zero and code (cited: `seal.ts` — «thresholds, seals, and Prism Cells»).
- **Token (house)** — (cited: `canon/CAN-011-value-makes-a-bond.md` — «A Token that forgot where it came from would be a coin»).

## Current manifestations

| Where | How it shows up | Source |
|---|---|---|
| Game (manual, adventures) | Rules in chapters 2, 4, 5, 6; loot; Session Zero trails | cited: paths above |
| House (canon, standards, agents, guilds of the archive) | «Contribution recognition» | cited: `STD-030` — «Units of activity» |
| Web (numinia.org, numinia.com) | Dial table maps «Membership Token» → «Prism Cell» from level 3; `PrismCellBalance = Record<FactionId, number>` next to `walletAddress` | cited: `web/src/pages/system/language.astro`; `numinia-web:packages/domain/src/types/character-sheet.ts` |
| Processes | None found | (inferred: `operations/` mentions only secret tokens) |

## Existing equivalences

| Source | Equivalence it proposes | Evaluation | Why |
|---|---|---|---|
| `STD-030` | Contribution recognition, «practical contribution through execution» | contradictory | Manual says Cells record affinity/way of looking, not deeds; drops spendability, currency, faction lock |
| `BLU-007` / `web/src/pages/system/language.astro` | Membership Token ↔ Access Token ↔ Prism Cell | contradictory | Membership is individual, persistent, gating; Cells are fungible, consumed, faction-bound. Keeps only «access» facet |
| `BLU-007` | Level 10 «Tokens, Prism Cells, real weight» | partial | Captures economy facet; silent on affinity |
| `seal.ts` | Per-faction integer balance | partial | Fits fungible/accumulable; no consumption or faction-use rule modelled |
| `lore/codex/glosario.md` | «token de un solo uso» with three uses | complete | Faithful summary of chapters 2 and 6 |

## Observations

- Acquisition conflict: «buenas interpretaciones» (`02-historia…`) vs «tesoros naturales […] fortuitamente» (`04-sistema…`) vs «no constituyen una recompensa abstracta» (`el-espejo-roto.md`).
- `lore/adventures/virtual-worlds/session-zero.md`: each Cell «increases their prestige»; chapter 6 reserves Prestige for Seeds.
- `02-historia…` table: «Bonificador a la reserva del Prisma con células» — a fourth use outside the «tres maneras».
- Currency facet + `walletAddress` + CAN-011 «worth money» meets `STD-033` «A resaleable token waits» (MiCA): whether Cells ever go on-chain is the Oracle's call.
- Via `STD-030`'s Faction→department map, Cells could read as department-affinity tokens (proposed).

## Sources

- Manual ES chapters 02, 04, 05, 06 (`lore/game/manual/es/`) — nature, uses, costs, currency, cosmology
- `lore/game/manual/glossary-es-en.md`, `lore/codex/glosario.md` — names, summary
- `lore/adventures/tabletop/el-espejo-roto.md`, `lore/adventures/virtual-worlds/session-zero.md` — use in play
- `standards/STD-030-the-worlds-vocabulary.md`, `blueprints/BLU-007-dual-nomenclature.md`, `web/src/pages/system/language.astro` — equivalences
- `canon/CAN-008-visual-identity.md`, `canon/CAN-011-value-makes-a-bond.md`, `standards/STD-033-every-charge-delivers-something.md` — relations
- `numinia-web:packages/domain/src/types/seal.ts`, `character-sheet.ts` — code model
