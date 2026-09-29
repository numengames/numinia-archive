---
id: "SYS-011:district-ouroboros"
title: "Ouroboros District"
type: entity
status: draft
version: "0.1.0"
created: "2026-09-29T21:00:00+02:00"
updated: "2026-09-29T21:00:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
category: "district"
stage: draft
confidence: "medium"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Ouroboros District

> **Summary:** In the world, one of Numinia's four districts: the labyrinth of play, home of the Heirs of Eleusis, where riddles, rituals and the black market live. In the house, numinia.org uses it as the place behind the "Play" district of its map: the game, the adventures, event experiences.

Every claim ends with where it comes from: **(cited: `path` — «heading»)**
when a source says it (quote it, in the source's language), **(inferred)**
when several uses support it (name them), **(proposed)** when it is a
plausible reading nobody has confirmed yet.

## Entity

| | |
|---|---|
| Name in the manual (ES) | Distrito Ouroboros (cited: `lore/game/manual/glossary-es-en.md` — «Distrito Ouroboros \| Ouroboros District») |
| Name in English | Ouroboros District; the proper name stays untranslated (cited: same — «solo se traduce la palabra común») |
| Category | district |
| Also written as | «el Ouroboros» (cited: `lore/game/manual/es/04-sistema-de-juego.md` — «las calles enredadas del Ouroboros»); "Play" (cited: `web/src/lib/suma.ts` — «name: "Play", place: "Ouroboros"») |

## Concept

Districts are «la manifestación territorial y funcional» of what guilds and factions stand for (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Los cuatro distritos»). Ouroboros stands for play as uncertainty: «el gran teatro de la incertidumbre» (cited: same — «Distrito Ouroboros – El Laberinto del juego»). It is also where what the city loses or forbids «termina adquiriendo un precio» (cited: `lore/codex/glosario.md` — «Barrio Viejo de Ouroboros»).

## Constitutive traits

- Domain of the Heirs of Eleusis; focus «Proyección narrativa», nature «Fantasía» (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Facción: Herederos de Eleusis»).
- Southeast, 40 m up, 90 km across; the lowest district, «el distrito que metaboliza el trauma» (cited: same — «Ouroboros ‒ El más cercano al suelo»).
- A door opens when a riddle is answered; knowledge is «un secreto disfrazado de acertijo» (cited: `lore/game/manual/es/04-sistema-de-juego.md` — «en _Ouroboros_»).
- Ritual government; its sociolect is Histrión (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Ouroboros– El Distrito del Ritual y el Sueño»; «HISTRIÓN»).

## Facets

| Facet | What it is | Provenance |
|---|---|---|
| Place of play | Adventures designed, tested, played | cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Casa de los Acertijos» |
| Ritual/dream | Esoteric seat; Temple of Khepri | cited: same — «Carácter: espiritual, onírico» |
| Underground economy | Black market, rumours | cited: `lore/game/manual/es/04-sistema-de-juego.md` — «mercado negro del Distrito Ouroboros» |
| House business line | "Play": RPG, adventures, events | cited: `web/src/lib/suma.ts` — «The labyrinth of play» |

## Contexts

| Facet | Context that activates it | Provenance |
|---|---|---|
| Place of play | A GM setting a module | cited: `lore/adventures/tabletop/el-espejo-roto.md` — «Ámbito principal: Distrito Ouroboros» |
| Underground economy | Seeking items that remove states | cited: `lore/game/manual/es/04-sistema-de-juego.md` — «mercado negro» |
| Identity | Character sheet | cited: `lore/game/attributes-and-ranks.md` — «DISTRICT Ouroboros (Identity)» |
| House business line | Browsing the numinia.org map | cited: `web/src/lib/suma.ts` — «Four districts cross ONLY the two outer rings» |

## Relations

- **Heirs of Eleusis** — ruling faction (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «han hecho de este distrito su dominio»).
- **Khepri** — its temple (cited: same — «Templo de Khepri»).
- **Street of Mysteries** — its black market (cited: `lore/codex/glosario.md` — «Calle de los Misterios»).

## Current manifestations

| Where | How it shows up | Source |
|---|---|---|
| Game (manual, adventures) | Chapters 03–07; *El Espejo Roto* | `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md`; `lore/adventures/tabletop/el-espejo-roto.md` |
| House (canon, standards, agents, guilds of the archive) | One canon mention (a fan's story setting); flagged undefined | `canon/CAN-005-licensing.md` — «a story set in the Ouroboros»; `reports/RPT-022-the-newcomer-test.md` — «Names used and never defined in canon» |
| Web (numinia.org, numinia.com) | .org: "Play" district. .com: district record, seal, four spaces | `web/src/lib/suma.ts`; `numinia-web:packages/domain/src/constants/districts.ts` |
| Processes | None found in `agents/`, `AGENTS.md`, STD-026, BLU-007, BLU-011 | inferred: grep of those paths |

## Existing equivalences

| Source | Equivalence it proposes | Evaluation | Why |
|---|---|---|---|
| `STD-030` | Only via its faction: Heirs of Eleusis = «Gamification / Experience» | pending | Indirect; would drop ritual, trauma, black market |
| `BLU-007` | None | pending | District not named |
| `web/src/lib/suma.ts` | "Play" = «the role-playing game, the adventures and experiences for events» | reductive | Keeps the play facet as a product line; drops the rest |
| `numinia-web:packages/domain/src/constants/districts.ts` | «The labyrinth of play: the theatre of uncertainty» | partial | Faithful to one heading; ignores «Ritual y el Sueño» |

## Observations

- **Canon gap confirmed:** `CAN-005` is the only canon use (cited: `reports/RPT-022-the-newcomer-test.md` — «the Ouroboros»).
- **Two characters:** chapter 5 calls it «El Laberinto del juego» and «El Distrito del Ritual y el Sueño» and doesn't say how the two fit (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md`). Unresolved.
- **Draft residue:** «Altura sugerida» / «Justificación» read like design notes left in the manual (inferred: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md`).
- **Naming drift:** manual «Casa de los Acertijos» / «Taberna Hiperbórea» vs numinia.com «Casa de los Enigmas» / «Taberna Hyperborean» (cited: `numinia-web:apps/store/src/i18n/city-landing.ts` — «spaces:»).
- **"Where the adventures happen" is only partly true:** one tabletop module is set there. Session Zero never names it, and its Forge is in Sycamore (cited: `lore/adventures/virtual-worlds/session-zero.md` — «a space located in the Sycamore District»).
- **House use:** there is no workspace or guild called Ouroboros; it appears only as the numinia.org "Play" map region. Is that official? Question for Christian.

## Sources

- `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — definition, spaces, government
- `lore/game/manual/es/04-sistema-de-juego.md` — alethics, black market
- `lore/game/manual/glossary-es-en.md`, `lore/codex/glosario.md` — names
- `lore/adventures/tabletop/el-espejo-roto.md`, `lore/adventures/virtual-worlds/session-zero.md` — settings
- `canon/CAN-005-licensing.md`, `reports/RPT-022-the-newcomer-test.md`, `standards/STD-030-the-worlds-vocabulary.md` — house
- `web/src/lib/suma.ts`, `numinia-web:packages/domain/src/constants/districts.ts`, `numinia-web:apps/store/src/i18n/city-landing.ts` — web
