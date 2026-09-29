---
id: "SYS-011"
uid: ""
title: "The semantic census"
type: documentation
subtype: reference
status: draft
version: "0.1.0"
created: "2026-09-29T22:00:00+02:00"
updated: "2026-09-29T22:00:00+02:00"
author: "ursa"
owner: "oracle"
provenance: ai-assisted
guild: "Exegetes"
territory: "Archive"
tags: [system, reference, vocabulary, census, narrative-dial]
license: "CC0-1.0"
related: ["RPT-023", "STD-030", "STD-026", "BLU-007", "CAN-007"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SYS-011 — The semantic census

> **Summary:** One card per entity of Numinia — a guild, a rank, a force, an
> artefact — saying what it stands for, the facets it takes and where each
> facet applies, with every claim traced to its source. Eight pilot cards,
> all in draft.
> **Epistemic:** What does each entity of Numinia mean, facet by facet,
> before anyone translates it?
> **Pragmatic:** Read the card before writing an entity's name for a
> reader outside the game, or before proposing a business equivalent.
> **Audience:** Agents · Oracles · External collaborators

## Why a census, not a glossary

A Numinia entity is rarely one idea. The Exegetes interpret, analyse, tell
and set strategy; a single business word keeps one of those and hides the
rest. So the census describes each entity on four layers, and a fifth —
how each facet is said to a business reader, a mixed reader or a player —
comes later, from these cards, in a separate translator.

| Layer | What it holds |
|---|---|
| Entity | the concrete unit of Numinia, by its name in the manual |
| Concept | what it stands for in the system |
| Facet | one dimension it takes in a given use |
| Context | the situation that brings that facet forward |
| Formulation | how the facet is said at each stop of the dial — *not in this census* |

Existing business equivalents (`STD-030`, `BLU-007`) are hypotheses. Each
card weighs them against the concept and records the verdict; none of them
is a definition.

The census describes meaning. It holds no rule: the first glossary of this
archive became a registration law, and that is recorded as debt.

## Categories

Eight, in this order. One valid entity is enough to open a category.

| Category | Holds | Pilot card |
|---|---|---|
| `guild` | the four guilds and their houses | [Exegetes](/system/semantic-census/guild-exegetes/) |
| `faction` | the factions of the world | [Heirs of Eleusis](/system/semantic-census/faction-heirs-of-eleusis/) |
| `district` | the city's districts | [Ouroboros District](/system/semantic-census/district-ouroboros/) |
| `rank` | six ranks, lowest to highest: Nomad, Citizen, Pilgrim, Vernacular, Archon, Oracle | [Oracle](/system/semantic-census/rank-oracle/) |
| `force` | Veil, Threshold, Prism | [Threshold](/system/semantic-census/force-threshold/) |
| `institution` | bodies of the world | [Summa Archive](/system/semantic-census/institution-summa-archive/) |
| `artefact` | objects a character carries or uses | [LAP](/system/semantic-census/artefact-lap/) |
| `resource` | rewards that act as tokens, kept apart from artefacts | [Prism Cells](/system/semantic-census/resource-prism-cells/) |

## The card

A card lives in `system/semantic-census/`, one file per entity, named
`<category>-<slug>.md`. It is an entry of this document, not a document of
its own: its identifier is `SYS-011:<file name>`, its type is `entity`.

| Header field | Values |
|---|---|
| `category` | one of the eight above |
| `stage` | where the card stands in its validation, below |
| `confidence` | `high` · `medium` · `low` — how well the sources support the whole card |

The body follows one mould: entity, concept, constitutive traits, facets,
contexts, relations, current manifestations (game, house, web, processes),
existing equivalences with their evaluation, observations, sources. An
equivalence is judged *complete*, *partial*, *reductive*, *ambiguous*,
*contradictory* or *pending*.

**Every claim says where it comes from:**

- **cited** — a source says it; the card quotes it and names the file.
- **inferred** — several uses support it; the card names them.
- **proposed** — a plausible reading nobody has confirmed yet.

## Stages

Where a claim comes from and where the card stands are two different
things. A card moves through four stages:

| Stage | Who moves it there |
|---|---|
| `draft` | the agent who writes it |
| `validated` | Christian, after reviewing it |
| `approved` | the Oracle |
| `explicit` | the whole team, once it has read the approved card and takes it as settled |

## Sources the census reads

The role-playing manual (`lore/game/manual/es/`), which has authority over
the world; the codex glossary (`lore/codex/glosario.md`); the manual's
Spanish–English name table; the canon, above all the roles and the visual
identity; `STD-030` and `BLU-007` for the equivalents under test;
numinia.com's code (the `numinia-web` repository, cited as `numinia-web:<path>`); the adventures; `BLU-011` for the LAP and the
Veil on the web.

## What comes next

Christian validates the eight pilot cards and says whether the mould
captures the concept, which fields are missing or spare, and what a card
costs to read. Then the census runs category by category, in the order
above, each category reviewed before the next. A shorter card for the
house's own jargon (canon, binds, draft, register) runs in parallel. The
research behind this census is `RPT-023`.

## References

| Identifier | Title | Why it is cited |
|---|---|---|
| `RPT-023` | The wall a newcomer hits is the house's own words, not the world's | the research that led here |
| `STD-030` | The world's vocabulary | the equivalents the cards test |
| `BLU-007` | Sistema de Nomenclatura Dual — Narrative & Gamification Dials | the dial the census feeds |
