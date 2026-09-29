---
id: "SYS-011:institution-summa-archive"
title: "Summa Archive"
type: entity
status: draft
version: "0.1.0"
created: "2026-09-29T21:00:00+02:00"
updated: "2026-09-29T21:00:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
category: "institution"
stage: draft
confidence: "medium"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Summa Archive

> **Summary:** In the world, the city's institution for studying and containing
> what lies beyond its edges. In the house, the name of the archive itself:
> the public repository where Numen Games keeps its memory.

Every claim ends with where it comes from: **(cited: `path` — «heading»)**
when a source says it (quote it, in the source's language), **(inferred)**
when several uses support it (name them), **(proposed)** when it is a
plausible reading nobody has confirmed yet.

## Entity

| | |
|---|---|
| Name in the manual (ES) | Archivo Summa (cited: `lore/game/manual/glossary-es-en.md` — «Así en numinia.com.») |
| Name in English | Summa Archive (cited: same) |
| Category | institution |
| Also written as | «El Archivo» (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «conocido coloquialmente»); "Archive Summa" (cited: `system/SYS-002-agent-cycle.md` — «L3 — 📚 Archive Summa»); "the Summa" (cited: `web/src/pages/index.astro` — «The Summa»); `suma` (cited: `web/src/lib/suma.ts`); `archive-summa` (cited: `numinia-web:packages/domain/src/constants/portals.ts`) |

## Concept

An autonomous research body founded by the Concordia Council with the Oracles' endorsement to study the Peripheral Zones (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Organismo autónomo de investigación interterritorial»). It seeks to know what lies beyond and to contain what may threaten or reveal (cited: same — «contener y comprender lo que pueda representar una amenaza o una revelación»). The house borrows the name for its written memory and says so (cited: `web/src/lib/corpus.ts` — «"The Summa" is the Archivo Summa of the manual»). Shared core: knowledge kept as record, with a boundary around what may be read (inferred: uses in `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md`, `canon/CAN-009-the-archive-is-the-organisation.md`).

## Constitutive traits

- Depends on the Concordia Council; itinerant seat, central archive in the Historical Society's Catacombs (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Sede: Itinerante»).
- Six fields of study (cited: same — «Campos de estudio»).
- Restricted Aleph Section under pacts of silence (cited: same — «el corazón sellado del Archivo»).
- Records anomalies (cited: `lore/game/manual/es/06-inventario-y-bestiario.md` — «conserva registros de sus manifestaciones»).
- Can deny: refuses to classify the Cryptahedra (cited: `lore/game/manual/es/02-historia-y-leyendas-de-numinia.md` — «se niega a clasificarlos oficialmente»).
- Morally ambiguous in play (cited: `lore/game/manual/es/07-construyendo-la-aventura.md` — «realiza experimentos con ellos; intenta protegerlos»).

## Facets

| Facet | What it is | Provenance |
|---|---|---|
| Frontier research | Exploring the peripheries | cited: manual ch. 5 — «estudio sistemático y multidisciplinar» |
| Containment / secrecy | Classified files, Aleph | cited: manual ch. 5 — «Sus archivos son clasificados» |
| Record-keeper | Reports, ID cards | cited: `lore/adventures/tabletop/el-espejo-roto.md` — «Tarjeta rígida del Archivo Summa» |
| House memory | Repository as organisational memory | cited: `system/SYS-002-agent-cycle.md` — «The permanent memory» |
| Map | numinia.org home, four rings | cited: `web/src/lib/suma.ts` — «Four rings from the centre out» |
| Civic registry | numinia.com place | cited: `numinia-web:packages/domain/src/constants/portals.ts` — «The great record: laws, minutes, and rulings.» |
| Object catalogue | numinia.com entity cards | cited: `numinia-web:apps/store/src/lib/summa.ts` — «Summa entity cards (experiment» |

## Contexts

| Facet | Context that activates it | Provenance |
|---|---|---|
| Research / secrecy | Adventure hooks, NPC agents, found reports | cited: `lore/game/manual/es/07-construyendo-la-aventura.md` — «un informe del Archivo Summa» |
| Record-keeper | Investigative premises | cited: `lore/adventures/tabletop/el-espejo-roto.md` — «Dependencias del Archivo Summa» |
| House memory | Agent boot/commit cycle | cited: `system/SYS-002-agent-cycle.md` — «↓ BOOT (git pull)» |
| Map | Wayfinding on numinia.org | cited: `web/src/components/Wayfinder.astro` — «Where am I in the Summa.» |
| Canon shelf | Shelf III of /canon/ | cited: `web/src/lib/corpus.ts` — «label: "The Summa"» |
| Civic registry | Solomon district of numinia.com | cited: `numinia-web:packages/domain/src/constants/portals.ts` — «districtId: 'solomon'» |

## Relations

- **Concordia Council** — parent body (cited: manual ch. 5 — «Dependencia: Consejo de Concordia»).
- **Oracles** — endorse it; in the house they «govern from the Archive Summa» (cited: `blueprints/BLU-007-dual-nomenclature.md`).
- **CAN-009** — house principle behind the memory facet (cited: `canon/CAN-009-the-archive-is-the-organisation.md` — «The archive is the organisation»).

## Current manifestations

| Where | How it shows up | Source |
|---|---|---|
| Game | Institution, agents, reports, Aleph | manual ch. 5, 7; `lore/adventures/tabletop/el-espejo-roto.md` |
| House | Layer L3; knowledge base; canon shelf III | `system/SYS-002-agent-cycle.md`, `operations/OPS-001-continuity.md`, `blueprints/BLU-007-dual-nomenclature.md` |
| Web | .org home «Numinia — the Summa»; .com portal and card experiment | `web/src/pages/index.astro`, `numinia-web:packages/domain/src/constants/portals.ts` |
| Processes | Agents pull and push the archive | `system/SYS-002-agent-cycle.md` |

## Existing equivalences

| Source | Equivalence | Evaluation | Why |
|---|---|---|---|
| `STD-030` | none found | pending | No Summa entry (inferred: grep of `standards/STD-030-the-worlds-vocabulary.md`) |
| `BLU-007` | Knowledge Base = Archive Summa | reductive | Keeps memory; drops research, secrecy, ambiguity |
| `SYS-002` | L3 permanent memory | partial | Memory and transversality only |
| `OPS-001` | Archive Summa → `/archive` | reductive | One URL |
| `web/src/lib/corpus.ts` | the Summa = manual's Archivo Summa = whole archive | partial | Only explicit bridge; omits containment |
| `numinia-web:…/portals.ts` | laws, minutes, rulings | contradictory | Manual gives an exploratory body, not a legal registry |
| glossary | Archivo Summa ↔ Summa Archive | complete | Name only |

## Observations

- Spelling: «Summa» in lore and UI; `suma` in module and CSS (`web/src/lib/suma.ts`, `web/src/pages/index.astro`); Spanish «suma» is also an unrelated word in the manual (cited: `lore/game/manual/es/02-historia-y-leyendas-de-numinia.md` — «la suma del 3 sagrado»). Word order varies: "Summa Archive" (lore, .com) vs "Archive Summa" (BLU-007, SYS-002, OPS-001).
- `web/src/lib/corpus.ts` says Summa is the name the repository «has always given its own changelog», yet `CHANGELOG.md` is titled «Changelog — numinia-archive».
- numinia.com's legal-registry reading conflicts with the manual; which binds is for the Oracle.
- Secrecy (Aleph) vs a public archive (cited: `README.md` — «The archive is public.»): does the house inherit that facet?
- "The Summa" names both the whole archive and canon shelf III (cited: `web/src/lib/corpus.ts`).
- `SYS-003`, `STD-026`, `STD-001`, `README.md`, `AGENTS.md` never say "Summa" (inferred: grep).

## Sources

- `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` ("manual ch. 5"), `lore/game/manual/es/02-…`, `06-…`, `07-…` ("manual ch. 7")
- `lore/adventures/tabletop/el-espejo-roto.md`; `lore/codex/glosario.md`; `lore/game/manual/glossary-es-en.md`
- `blueprints/BLU-007-dual-nomenclature.md`, `system/SYS-002-agent-cycle.md`, `operations/OPS-001-continuity.md`, `canon/CAN-009-the-archive-is-the-organisation.md`
- `web/src/lib/suma.ts`, `web/src/lib/corpus.ts`, `web/src/pages/index.astro`, `web/src/components/Wayfinder.astro`
- `numinia-web:packages/domain/src/constants/portals.ts`, `numinia-web:apps/store/src/lib/summa.ts`
