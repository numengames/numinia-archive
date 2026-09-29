---
id: "SYS-011:faction-heirs-of-eleusis"
title: "Heirs of Eleusis"
type: entity
status: draft
version: "0.1.0"
created: "2026-09-29T12:10:00+02:00"
updated: "2026-09-29T12:10:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
category: "faction"
stage: draft
confidence: "medium"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Heirs of Eleusis

> **Summary:** In the manual, a semi-religious mystery order that holds play to
> be the highest form of knowledge and rules the Ouroboros district. In the
> house, the faction of play, the centre of the four fields, which house
> documents call "gamification".

Every claim ends with where it comes from: **(cited: `path` — «heading»)**
when a source says it (quote it, in the source's language), **(inferred)**
when several uses support it (name them), **(proposed)** when it is a
plausible reading nobody has confirmed yet.

## Entity

| | |
|---|---|
| Name in the manual (ES) | Herederos de Eleusis (cited: `lore/game/manual/glossary-es-en.md` — «Herederos de Eleusis \| Heirs of Eleusis») |
| Name in English | Heirs of Eleusis (cited: same) |
| Category | faction |
| Also written as | Singular «Heredero/Heredera de Eleusis» (cited: `lore/game/manual/es/03-creacion-del-personaje.md` — archetype compatibilities); seed name «Orden Mística de los Nuevos Cultos Eleusinos» (cited: same — «Nombre semilla»); slug `heirs-of-eleusis` (cited: `numinia-web:packages/domain/src/constants/factions.ts`); "Play" district (cited: `web/src/lib/suma.ts` — «play: { name: "Play", place: "Ouroboros"») |

## Concept

A worldview that treats play as the supreme path to knowledge and
transformation (cited: `lore/game/manual/es/03-creacion-del-personaje.md` — «el juego es la forma suprema de conocimiento y transformación»). That play is
sacred and mystical, not recreational: the order borrows its rites from the
Eleusinian mysteries and seeks «la transformación personal que supone el rito
mistérico del trance» (cited: same). Like every faction it is a field of
development, not a kind of knowledge (cited: `canon/CAN-004-role-structure.md` — «A faction is where you apply it»).

## Constitutive traits

- Field of development «Proyección narrativa»; principles «Juego, curiosidad, descubrimiento»; sphere of influence «Gamificación, diseño de desafíos, narración interactiva» (cited: `lore/game/manual/es/03-creacion-del-personaje.md` — «Herederos de Eleusis»).
- Semi-religious, spiritualist, after Allan Kardec, Orphic rites (soma/sema) and Eleusinian cults, including «su visión de la resurrección desde el mundo de los muertos» (cited: same).
- Playing is a duty: «para los Herederos de Eleusis, jugar es mandato sagrado» (cited: `lore/game/manual/es/04-sistema-de-juego.md` — deontics).
- Symbol: serpent with opium poppies, «la narcosis y la sanación del alma» (cited: `lore/game/manual/es/03-creacion-del-personaje.md` — «Símbolo»).
- Colour violet (cited: `lore/game/manual/es/06-inventario-y-bestiario.md` — «Herederos de Eleusis|Violeta»).

## Facets

| Facet | What it is | Provenance |
|---|---|---|
| Play as knowledge | Learning comes from playful experimentation | cited: `lore/game/manual/es/03-creacion-del-personaje.md` — «el aprendizaje y el progreso surgen de la experimentación lúdica» |
| Narrative projection | Storytelling in which «cada ciudadano se convierte en protagonista» | cited: same |
| Challenge design | Riddles, challenges, gamification | cited: same — «Ámbito de influencia» |
| Mystic / initiatory | Rite, trance, death and rebirth | cited: same |
| Territory and culture | Ouroboros, the Histrión sociolect, game masters, oniromancers, pythias | cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Distrito Ouroboros – El Laberinto del juego», «HISTRIÓN» |
| Prototype of the factions | The central, most workable field, the entry into Numinia | cited: `canon/CAN-004-role-structure.md` — «Play is the centre, and the Heirs of Eleusis hold it» |

## Contexts

| Facet | Context that activates it | Provenance |
|---|---|---|
| Play as knowledge / challenge design | Character creation; an android built «for ludic purposes» | cited: `lore/adventures/virtual-worlds/session-zero.md` — «as an entertainer or game master» |
| Mystic / initiatory | Reading symbols as ritual (mural as «festive ritual act») | cited: same |
| Territory | Adventures: Ouroboros NPCs (Thalia, «Ludarca») | cited: `lore/adventures/tabletop/el-espejo-roto.md` — «Facción: Herederos de Eleusis» |
| Prototype | Mapping the organisation's fields; numinia.org's "Play" district (RPG, adventures, events) | cited: `web/src/lib/suma.ts` — «the role-playing game, the adventures and experiences for events» |

## Relations

- **Ouroboros district** — its domain (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «han hecho de este distrito su dominio»).
- **Hermeticists / Stellar Circle** — peripheral fields that point back to play; **Neo-Atlantists** — itinerant (cited: `canon/CAN-004-role-structure.md`).
- **Archetypes** Innocent, Destroyer, Jester (cited: `numinia-web:packages/domain/src/constants/archetypes.ts` — «alignedFactions: ['heirs-of-eleusis']»).

## Current manifestations

| Where | How it shows up | Source |
|---|---|---|
| Game (manual, adventures) | Mystic order, Ouroboros, violet, NPCs | cited: manual ch. 3–6; `lore/adventures/tabletop/el-espejo-roto.md` |
| House (canon, standards, agents, guilds of the archive) | "Play", prototype field; "Gamification / Experience" | cited: `canon/CAN-004-role-structure.md`; `standards/STD-030-the-worlds-vocabulary.md`; `standards/STD-026-operative-vocabulary.md` — «The field of Numinia's prototype faction» |
| Web (numinia.org, numinia.com) | .org: "Play" district; .com: `field: 'gamification'`, `prototypeRole: 'prototype'`; store landing `field: 'Narrativa'` | cited: `web/src/lib/suma.ts`; `numinia-web:packages/domain/src/constants/factions.ts`; `numinia-web:apps/store/src/i18n/city-landing.ts` |
| Processes | No agent names the faction; Senet does «gamified systems» without it | inferred: `agents/`, `agents/senet/SOUL.md` |

## Existing equivalences

| Source | Equivalence it proposes | Evaluation | Why |
|---|---|---|---|
| `STD-030` | Gamification / Experience — «They design game-based experiences that activate participation» | reductive | Keeps challenge design. Drops the manual's field (narrative projection), play as knowledge, and the whole mystic/initiatory facet; "activate participation" is instrumental, where the manual makes play an end («mandato sagrado») |
| `BLU-007` | Only generic Faction ↔ «Division / Area» | pending | Nothing on this faction; its gamification dial (badges, ranks, tokens) is a mechanics scale, not the faction |
| `CAN-004` / `lore/world/role-structure.md` | Play | partial | Keeps play as knowledge and the prototype; drops narrative and mystic facets |
| `numinia-web` domain | `field: 'gamification'` | reductive | Fixes STD-030's label in code, overriding the manual's «Proyección narrativa» |

## Observations

- **Field conflict (not resolved):** the manual says «Campo de desarrollo: Proyección narrativa» (ch. 3; «Foco» in ch. 5); CAN-004 says "Play"; STD-030, STD-026, `lore/world/welcome-to-numinia.md` («Gamification: Fantasy and fictional narrative») and `numinia-web:packages/domain/src/constants/factions.ts` say "gamification"; the store landing (`numinia-web:apps/store/src/i18n/city-landing.ts`) says «Narrativa». In the manual, gamification is only a sphere of influence.
- The "gamification faction" label is a house attribution; nothing in the manual links the faction to BLU-007's gamification dial. Linking them would add a meaning (points, tokens) the manual does not give (proposed).
- The mystic facet (Kardec, trance, opium, death) appears in no house equivalence. It is either dropped on purpose or the business readings are missing it (inferred: absent from `STD-030`, `CAN-004`, `numinia-web:packages/domain/src/constants/factions.ts`).
- STD-026 itself warns gamification can be «manipulation with confetti» (cited: `standards/STD-026-operative-vocabulary.md`).
- For Christian: which field is canonical, narrative projection, play or gamification? Should the mystic facet reach the Bridge level?

## Sources

- `lore/game/manual/es/` ch. 02–06 — definition, mandate, Ouroboros, violet (authority)
- `lore/game/manual/glossary-es-en.md` — ES/EN names
- `lore/codex/glosario.md` — «Facción», «Distrito» entries
- `lore/world/role-structure.md`, `canon/CAN-004-role-structure.md` — prototype, Play
- `lore/adventures/virtual-worlds/session-zero.md`, `lore/adventures/tabletop/el-espejo-roto.md` — contexts
- `standards/STD-030-the-worlds-vocabulary.md`, `standards/STD-026-operative-vocabulary.md`, `blueprints/BLU-007-dual-nomenclature.md` — equivalences
- `web/src/lib/suma.ts`, `numinia-web:packages/domain/src/constants/` (factions, archetypes), `numinia-web:apps/store/src/i18n/city-landing.ts` — web usage
