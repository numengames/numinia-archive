---
id: "SYS-011:artefact-lap"
title: "LAP (Lore Akashic Processor)"
type: entity
status: draft
version: "0.1.3"
created: "2026-09-29T12:10:00+02:00"
updated: "2026-10-03T22:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
license: "CC0-1.0"
category: "artefact"
stage: draft
confidence: "medium"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# LAP (Lore Akashic Processor)

> **Summary:** In the world, the wrist device every citizen uses to query the city's recorded information (not the deep Akasha). In the house, the name of numinia.com's player area, where the codex is read.

Every claim ends with where it comes from: **(cited: `path` — «heading»)**
when a source says it (quote it, in the source's language), **(inferred)**
when several uses support it (name them), **(proposed)** when it is a
plausible reading nobody has confirmed yet.

## Entity

| | |
|---|---|
| Name in the manual (ES) | LAP, «Lector Akáshico Personal» (cited: `lore/game/manual/glossary-es-en.md` — «LAP (Lector Akáshico Personal)») |
| Name in English | LAP, «Lore Akashic Processor» (cited: same) |
| Category | artefact |
| Also written as | «Ficha LAP» / «LAP Card» (cited: `lore/game/manual/glossary-es-en.md` — «Ficha LAP»). The forms «L.A.P.» and «Akashic Reader», once on numinia.com, were corrected to the ruling below |

## Concept

The LAP is the everyday interface between an individual and the city's information infrastructure (cited: `lore/game/manual/es/06-inventario-y-bestiario.md` — «una de las interfaces fundamentales entre el individuo y la infraestructura informativa»). It reads the *akashic network*, not the Akasha itself (cited: same — «no accede directamente al Akasha en toda su profundidad»). It shows what Numinia has recorded, not what is true (cited: same — «proporciona información registrada sobre la cosa, no necesariamente la verdad completa»). It marks where public knowledge ends, which is where adventure begins (cited: same — «Las delimita.»).

## Constitutive traits

- Universal, wrist-worn, ordinary equipment outside Inventory slots (cited: `…/06-inventario-y-bestiario.md` — «Todos los ciudadanos disponen de uno»; «El LAP dentro de la aventura»).
- It depends on the network and fails for in-world reasons (cited: same — «Si el LAP deja de funcionar, debe existir una razón dentro del mundo»).

## Facets

| Facet | What it is | Provenance |
|---|---|---|
| Archive reader | Query of official, authorised records | cited: `…/06-inventario-y-bestiario.md` — «Acceso a información» |
| Identity scanner | Reads citizen emblems and returns the LAP Card | cited: same — «Lectura de emblemas ciudadanos» |
| Augmented layer | Overlays nodes, maps and AR on the city | cited: same — «Lectura de nodos sigilares», «Realidad aumentada», «Cartografía dinámica» |
| Rumour channel | Forums and informal channels, still subject to Indagar | cited: same — «LAP y Rumorología» |
| Communicator | Messaging, akashic mail, the inter-faction channel | cited: same — «Comunicación», «Canal interfaccional» |
| Boundary marker | Separates what the city knows from what it does not yet know | cited: same — «qué no sabe todavía» |
| Player area (house) | numinia.com section: character, codex, portals, loot, stats | cited: `numinia-web:apps/store/src/components/lap/LapShell.astro` — «L.A.P. platform shell» |
| Reading frame (house) | The bar, bookmark and controls around the codex page | cited: `designs/DES-011-book-and-veil.md` — «the reading frame (the LAP's bar, bookmark, A·A·A controls, switch)» |

## Contexts

| Facet | Context that activates it | Provenance |
|---|---|---|
| Archive reader / Boundary marker | GD ruling on free vs rolled queries; NPC meetings with LAP Cards | cited: `…/06-inventario-y-bestiario.md` — «Buscador akáshico» |
| Network loss, record tampering | Adventure play: search leads, then failure | cited: `lore/adventures/tabletop/el-espejo-roto.md` — «El LAP pierde conexión.» |
| Player area | Logged-in user on numinia.com `/lap/` | cited: `LapShell.astro` — «href: `${prefix}/lap/`» |
| Reading frame | Long reading of the manual | cited: `DES-011` — «numinia.com/lap/codex» |

## Relations

- **Akasha / Registros Akáshicos**: the deep plane of universal memory, which the LAP does *not* reach (cited: `lore/codex/glosario.md` — «Akasha (Registros Akáshicos)»).
- **Red akáshica**: the organised network the LAP does reach (cited: `lore/codex/glosario.md` — «Red akáshica»).
- **Rumorología / Indagar**: the LAP gives access to rumours but does not verify them (cited: `…/06-inventario-y-bestiario.md` — «El LAP no transforma el rumor en documento»).
- **Veil** (ES «Velo»): its anomalies cut the connection (cited: same — «anomalías del Velo»); in web design, Veil is the register the LAP frame may use (cited: `DES-011` — «MAY live in Velo»).
- **Codex**: in the house, read inside the LAP (inferred: uses in `DES-011`, `codex.ts`).

## Current manifestations

| Where | How it shows up | Source |
|---|---|---|
| Game (manual, adventures) | Full sub-chapter; tool and obstacle in *El espejo roto* | `06-inventario-y-bestiario.md`; `el-espejo-roto.md` |
| House (canon, standards, agents, guilds of the archive) | Not in STD-030, STD-026, DES-007, canon or agents; once in STD-023 as a design verification target | `standards/STD-023-design-values.md` — «to be verified against the LAP» |
| Web (numinia.org, numinia.com) | numinia.com `/lap/` and `/lap/codex`; none in numinia.org `web/src` | `numinia-web:apps/store/src/pages/lap/` |
| Processes | «the player area» in cookie policy; `access-lap` permission | `LEG-003`; `permissions.ts` |

## Existing equivalences

| Source | Equivalence it proposes | Evaluation | Why |
|---|---|---|---|
| `STD-030`, `DES-007` | none | pending | Term absent |
| `glossary-es-en.md` | Lector Akáshico Personal = Lore Akashic Processor | complete | The Oracle's ruling (2026-09-29): the acronym is kept in both languages though the translation is not literal; the sense is the same |
| `LEG-003` | LAP = «player area» | reductive | Keeps the personal-access facet; drops the world artefact and its limits |
| `DES-011` | LAP = reading frame of the codex | partial | Captures interface-around-content; one facet of the house use |
| `lore/codex/glosario.md` | Digest of Ch. 6 | complete | No reframing |

## Observations

- **Name — settled by the Oracle's ruling, 2026-09-29:** *LAP*, no dots, in every language; it stands for *Lector Akáshico Personal* in Spanish and *Lore Akashic Processor* in English. The acronym is kept although the translation is not literal, because the sense is the same. Any other form is corrected (cited: `lore/game/manual/glossary-es-en.md` — «LAP (Lector Akáshico Personal)»).
- **Access conflict:** in the world, every citizen has a LAP. `LapShell.astro` says «Open to Nomads (D16): no wall, ever», yet `permissions.ts` grants `access-lap` at rank *vernacular*, not *nomad* or *citizen*. Not resolved here.
- **Shared core:** the world LAP «debe mostrar el límite con claridad»; the product promises «honest empty states» (inferred: uses in `06-inventario-y-bestiario.md`, `numinia-web:apps/store/src/i18n/lap.ts`). Candidate Puente core (proposed).

## Sources

- `lore/game/manual/es/06-inventario-y-bestiario.md` (authority), `lore/game/manual/en/06-inventory-and-bestiary.md`
- `lore/game/manual/glossary-es-en.md`, `lore/codex/glosario.md`, `lore/adventures/tabletop/el-espejo-roto.md`
- `designs/DES-011-book-and-veil.md`, `standards/STD-023-design-values.md`, `legal/LEG-003-cookie-policy-numengames.md`
- `numinia-web:apps/store/src/components/lap/LapShell.astro`, `numinia-web:apps/store/src/i18n/{messages,codex,lap}.ts`, `numinia-web:packages/domain/src/constants/permissions.ts`
