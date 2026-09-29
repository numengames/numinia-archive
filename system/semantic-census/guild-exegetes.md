---
id: "SYS-011:guild-exegetes"
title: "Exegetes"
type: entity
status: draft
version: "0.1.0"
created: "2026-09-29T12:10:00+02:00"
updated: "2026-09-29T12:10:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
category: "guild"
stage: draft
confidence: "medium"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Exegetes

> **Summary:** In the world, the guild of language, culture and critical
> interpretation: those who keep, tell, study and govern meaning. In the
> house, the guild the archive files its canon and vocabulary under.

Every claim ends with where it comes from: **(cited: `path` — «heading»)**
when a source says it (quote it, in the source's language), **(inferred)**
when several uses support it (name them), **(proposed)** when it is a
plausible reading nobody has confirmed yet.

## Entity

| | |
|---|---|
| Name in the manual (ES) | Exégetas (cited: `lore/game/manual/glossary-es-en.md` — «\| Exégetas \| Exegetes \|») |
| Name in English | Exegetes (cited: same) |
| Category | guild, one of four (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Exégetas, Alquimistas, Procuradores y Centinelas») |
| Also written as | «exegetas» lower-case, no accent (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Formado por Pitias, espectros, médiums y exegetas»); «Exegeta-01» (cited: `web/src/pages/system/cao.astro` — «nombre: "Exegeta-01"») |

## Concept

The guild that holds meaning: it records what happened, studies what is known, and decides what words mean (inferred: uses in `lore/game/manual/es/03-creacion-del-personaje.md`, `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md`). The manual calls it «Gremio del Lenguaje, la Cultura y la Interpretación Crítica» (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «EXÉGETAS»). It is defined by opposition to the other three guilds: «an Exegete keeps the word» (cited: `canon/CAN-004-role-structure.md` — «A guild is what you know»).

## Constitutive traits

- «Aquellos que viven por las letras, la historia y la fantasía» — protectors of culture, chroniclers, visionaries (cited: `lore/game/manual/es/03-creacion-del-personaje.md` — «Exégetas»).
- Traits «Pensador, Polímata, Historiador, Comunicador»; figure «Narrador»; paradigm «Teórico»; tarot «El Ermitaño» (cited: same).
- Two branches, four houses: Cronistas (Logógrafos · Bardos), Eruditos (Hierofantes · Taumaturgos) (cited: same — «Estructura de los Exégetas»).
- Competences «Descodificación, Criptología, Cronomancia» (cited: same — «Competencias por Gremio»).

## Facets

| Facet | What it is | Provenance |
|---|---|---|
| Chronicle / memory | Record events, diachronic (Logógrafos) and synchronic (Bardos) | cited: `lore/game/manual/es/03-creacion-del-personaje.md` — «perspectiva diacrónica… sincrónica» |
| Scholarship / teaching | Experts across disciplines (Hierofantes) | cited: same — «especialistas en distintos campos» |
| Culture-making / ideation | «moldean la cultura y desarrollan nuevas ideas» (Taumaturgos) | cited: same |
| Semantic governance | Keep the Corpus Numiniense, the Lex Perennis, terminological pacts, «sentencias semióticas» | cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Tesaurum Verba» |
| Living-text restoration | Chamber of Palimpsests: «preservar lo mutable», truth «en su deriva, no en su origen» | cited: same — «Cámara de Palimpsestos» |
| Decoding / esoteric reading | Cryptology, chronomancy; interpreting Akashic currents in Ouroboros | cited: `lore/game/manual/es/03-creacion-del-personaje.md` — «Competencias por Gremio»; `…/05-geografia-y-cultura-de-numinia.md` — «Círculo del Umbra» |

## Contexts

| Facet | Context that activates it | Provenance |
|---|---|---|
| Semantic governance | A term, symbol or pact is disputed or new | cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Concilia Signorum» |
| Chronicle / memory | Documenting events; keeping ancient texts | cited: `lore/game/manual/es/02-historia-y-leyendas-de-numinia.md` — «los textos antiguos que custodian los Exégetas» |
| Decoding | Puzzle play, Session Zero «Threshold of Thought» | cited: `lore/adventures/virtual-worlds/session-zero.md` — «words are not read: they are unearthed» |
| Archive filing | Assigning a document's `guild` header | inferred: uses in `canon/`, `standards/STD-030-the-worlds-vocabulary.md`, `standards/STD-004-the-header.md` |

## Relations

- **Alchemists, Procurators, Sentinels** — co-hyponyms defined by opposition (cited: `lore/world/role-structure.md` — «defined by opposition to the others»).
- **Pythias / Ouroboros** — sit together in the Circle of Umbra (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Círculo del Umbra»).

## Current manifestations

| Where | How it shows up | Source |
|---|---|---|
| Game | Iskar, veteran Exegete; Lyra, master of the Council of Exegetes; NPCs in El Espejo Roto | cited: `lore/game/manual/es/04-sistema-de-juego.md` — «Iskar, el veterano Exégeta»; `lore/adventures/virtual-worlds/session-zero.md` — «Lyra»; `lore/adventures/tabletop/el-espejo-roto.md` — «**Gremio:** Exégetas» |
| House: documents | 18 headers carry `guild: "Exegetes"`: 10 canons, STD-026, STD-030, STD-031, RPT-022, 3 agents, the canon template | inferred: `git grep` over `canon/`, `standards/`, `reports/`, `agents/`, `machine/templates/CAN-TEMPLATE.md` |
| House: agents | Byblos (records management), Calliope (copywriter), Senet (game master) | cited: `agents/byblos/AGENT.yaml`, `agents/calliope/AGENT.yaml`, `agents/senet/AGENT.yaml` — «guild: "Exegetes"» |
| Web numinia.org | Exegeta-01 «Content & Lore»; Adonaz «Archivist General»; dial row «Chief of Staff / Knowledge» | cited: `web/src/pages/system/cao.astro`; `web/src/pages/system/language.astro` |
| Web numinia.com | «Narradores de la Historia y la leyenda, teóricos, educadores»; domain model with branches/houses | cited: `numinia-web:apps/store/src/i18n/city-landing.ts`; `numinia-web:packages/domain/src/constants/guilds.ts` |

## Existing equivalences

| Source | Equivalence it proposes | Evaluation | Why |
|---|---|---|---|
| `standards/STD-030-the-worlds-vocabulary.md` | «Brand / Communication / Strategy» | reductive | Captures communication and ideation (Bards, Thaumaturges); drops memory/archive, teaching, semantic governance, decoding. «Brand» has no support in the manual. |
| `blueprints/BLU-007-dual-nomenclature.md` | «Chief of Staff / Knowledge» → «Knowledge Lead» | partial | Captures scholarship and memory; drops narrative and culture-making. «Chief of Staff» is a coordination role no source gives the guild. |
| `web/src/pages/system/cao.astro` | «Content & Lore» / «Archivist General» | partial | Captures chronicle and archive; drops scholarship and governance. |
| `lore/world/welcome-to-numinia.md` | «History, theory, and narrative» | partial | Closest to the manual; drops semantic governance. |

The three business readings (brand, knowledge lead, content/archive) point at three different departments (inferred: the rows above).

## Observations

- **Conflict:** STD-030 says the operational equivalent is «an exact or close match» (cited: `standards/STD-030-the-worlds-vocabulary.md` — «Summary»), yet BLU-007 and `web/src/pages/system/cao.astro` point at other departments. Not resolved here.
- **Gap:** no equivalence names the facet the manual stresses most in the Tesaurum Verba: terminology and meaning governance. That is the work the archive does when it files vocabulary standards under this guild (inferred: `standards/STD-030-the-worlds-vocabulary.md`, `standards/STD-026-operative-vocabulary.md` headers).
- **Conflict (house):** the archive puts its records agent (Byblos) under Exegetes. STD-030 puts no records or archive function in the guild (cited: `agents/byblos/AGENT.yaml` — «records-management»).
- **Ambiguity:** «exegetas» in the Circle of Umbra is lower-case. It could mean guild members or a generic noun (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md`).
- **Gap:** cryptology is shared with Procurators, and chronomancy has no business reading anywhere (cited: `lore/game/manual/es/03-creacion-del-personaje.md` — «Competencias por Gremio»).
- **Tension:** STD-030 maps Bards to «Social media». The manual's Bards keep «noticias y crónicas actuales», and Chapter 2 treats bards as legend-tellers (cited: `lore/game/manual/es/03-creacion-del-personaje.md`; `lore/game/manual/es/02-historia-y-leyendas-de-numinia.md` — «los bardos»).

## Sources

- Manual ES chapters 02–05, `lore/game/manual/glossary-es-en.md`, `lore/codex/glosario.md`, `lore/world/`, `lore/adventures/`: the world.
- `canon/CAN-004-role-structure.md`, `standards/STD-030-the-worlds-vocabulary.md`, `standards/STD-004-the-header.md`, `blueprints/BLU-007-dual-nomenclature.md`: house definitions and equivalences.
- `agents/`, `web/src/pages/system/`, `numinia-web:packages/domain/`, `numinia-web:apps/store/`: manifestations.
