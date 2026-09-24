---
id: "ADR-057"
uid: ""
title: "CAN-004 absorbs CAN-003: one canon says who you are here"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-24T12:00:00+02:00"
updated: "2026-09-24T12:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, roles, attributes, guilds, factions]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "CAN-003 and CAN-004 become one canon under CAN-004, at 4.0.0: the six attributes, the two semantic theories that shape guilds and factions, the systems-thinking line between qualification, role and position, and the five approaches. The guild list leaves for the vocabulary register; the character-sheet remainder and the rule that positions belong to non-player characters are removed. CAN-003 is deleted and its identifier resolves to CAN-004 through `absorbs`, which is registered for canon/."
related: ["CAN-004", "CAN-003", "CAN-007", "STD-030", "STD-003", "STD-016", "ADR-054", "ADR-053", "ADR-049"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-057 — CAN-004 absorbs CAN-003: one canon says who you are here

> **Summary:** Two canons answered one question — what a person is in
> Numinia — and between them lost the theory that made the answer hold. They
> are now one document, with the theory back in.
> **Epistemic:** The Oracle's review of the canon series found that
> condensation had kept the examples and dropped the arguments; this records
> what went back and what went out.
> **Pragmatic:** One canon to read before classifying anyone or any piece of
> work; one identifier that keeps resolving.
> **Audience:** Agents · Oracles

---

## 1. Context

The canon series was reviewed as a whole on 2026-09-23, after the eight
rewrites of `ADR-048`–`ADR-056`. Read side by side, `CAN-003` (*What an
agent is made of*) and `CAN-004` (*A guild is what you know; a faction is
where you apply it*) turned out to be one argument in two files: the first
names six attributes of an agent and develops two of them thinly; the second
develops those same two — guild and faction — and defines role and position
without the attribute they belong to.

The Oracle's notes on the two, verbatim in substance:

- `CAN-003`: the first half is an obsolete legacy — the old character sheet
  — and only holds from the role onward; the ranks are talked about and never
  appear; the epistemology table is very valuable; integrate with `CAN-004`.
- `CAN-004`: the semantic theories behind the structure are missing — Basic
  Level Theory for the guilds, Prototype Theory for the factions; the
  references to systems thinking matter for the role system and are gone;
  *the position belongs to non-player characters* is an obsolete idea and
  should disappear; very condensed, but valid.

Measured against the source texts (`lore/world/role-structure.md` and the
attribute compendium, ~6 000 words between them), the defect was specific:
the condensation had kept the *images* — the hammer, the actor, the
Australopithecus — and cut the *reasoning* they illustrated. The 4 × 2 × 2
guild list, 250 words, had survived instead, though it is a register that
`STD-030` already holds by name and `ADR-053` gives the game manual authority
over.

| | `CAN-003` 2.0.0 | `CAN-004` 3.0.0 | `CAN-004` 4.0.0 |
|---|---|---|---|
| body words | 830 | 822 | 1 597 (budget 1 500, DOC-006 SHOULD) |
| of which prose | 700 | 570 | 1 377 |
| theories named | 0 | 0 | 3 (Rosch ×2, systems thinking) |
| ranks stated | as an attribute only | none | six, by what each *is* |
| lists that are registers elsewhere | 0 | 1 (the guild tree) | 0 |

## 2. Decision

**`CAN-004` absorbs `CAN-003`** and is rewritten at `4.0.0`, retitled *Nobody
here has a role; you are what you are doing*. It binds whoever describes,
classifies or registers a person, a role or a piece of work — the union of
the two former lines.

What goes **in**, and where it came from:

- **Opposition, from Eco.** A cultural unit is a place among others that
  oppose and circumscribe it; a guild is recognised by the three it is not and
  needs the three it is not. And the correction the old text had lost: the
  opposition belongs to the categories, not the people — one person may stand
  in two guilds.
- **Basic Level Theory, for guilds.** Guild, branch and house are one thing at
  three grades of detail, not three kinds; the branch is the name people use
  because the guild says too little and the house too much.
- **Prototype Theory, for factions.** Play at the centre, framework and
  education at the sides, art itinerant — and the consequence: everything
  starts from play, and whoever goes from framework to education without it
  has left Numinia.
- **Systems thinking.** Qualification (= profile), role (the part played now),
  position (the preferred role, a landmark for others). The school is named
  once, in prose, as the source.
- **Role = house × field; position = branch × field.** The source text's
  operative definition, absent from both former canons.
- **The six ranks by what each is** — Nomad, Citizen, Pilgrim, Vernacular,
  Archon, Oracle — in one paragraph. What each earns and may do stays in
  `STD-003`. The Oracle asked for the ranks to appear; this is how they appear
  without a second table.
- **The five approaches**, as the table the Oracle called valuable.
- From `CAN-003`: role (Eco's stone), position (the gatekeeper), rank as the
  one attribute the system assigns.

What goes **out**:

- **The guild tree** (4 guilds × 2 branches × 2 houses with a gloss each). It
  is a register; `STD-030` holds every name with its operational equivalent,
  and the manual's translation glossary fixes the English. The canon names the
  four guilds and the four factions in prose and stops.
- **"Positions belong preferentially to non-player characters."** Removed at
  the Oracle's word as obsolete. What stays is what made it plausible: a
  position is stable, predictable and mediates the other roles — take one
  rarely and on purpose.
- **The character-sheet remainder** of `CAN-003` (traits, profile, position,
  identity as a psychology of the individual). The six are now stated in one
  paragraph each of a sentence or two; the codex holds the sheet.
- **The district sentence** of `CAN-004` (*each faction is bound to a
  district*). The manual owns geography; no canon defines a district.

**Function is `CAN-007`'s.** Both former canons carried a paragraph on
function-is-not-utility; the source text develops it at length (Hjelmslev,
ends and values, *birds do not fly because wings appeared*). The Oracle's
note on `CAN-007` asks for exactly that — function as a frame of ends and
values, answering *what is it for* and *what is it worth*. So this canon
states the distinction in two sentences and names the canon of function and
structure as its owner; the development lands there in its own change.

**`CAN-003` is deleted.** `absorbs: ["CAN-003"]` on `CAN-004` keeps the
identifier resolving (`SER-006`, `GIT-048`); `/canon/can-003-attributes-and-ranks`
and the four older addresses that pointed at it redirect to the heir
(`GIT-046`, `GIT-047`). `absorbs` is registered for `canon/` in `STD-016`
Ring 3 and `rings.mjs` — it was registered for every series that had needed
it and canon had not, until now.

**Citations repointed in the same change:** `CAN-001` (`related:`),
`STD-003` (prose and References, `3.1.1`), `STD-030` (`related:`, `0.1.1`),
`STD-026` (the sentence sourcing English names, which now names the
translation glossary, `0.1.1`), `PRO-015` (*Does not bind*, `1.0.3`), the
reading order and the redirect map in `web/`, and the rule index in
`AGENTS.md`, regenerated.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Keep two canons and add the theories to each | The theories are what connects attributes to structure: Basic Level explains why the guild nests, and the guild is an *identity*. Split across two files they are stated twice or explained in neither — which is how they went missing |
| Absorb into `CAN-003` instead | `CAN-004` is cited by 22 documents, `CAN-003` by 12, and the site's redirect map already sends five old addresses to `CAN-004`. Fewer citers move |
| Keep the guild tree as an illustration | The canon then holds a list the register holds better, in a language the manual now fixes elsewhere; it was the stalest copy of three |
| Keep the non-player-character rule, softened | The Oracle called it obsolete, not overstated. The reasoning it rested on — a position is a landmark — stays; the prescription goes |
| Develop function here, since the source text does | The same passage would then live in two canons; `CAN-007` is titled *function and structure* and the Oracle asked for it there |
| Stay under 1 500 words by cutting the five approaches | The one table he singled out as valuable; DOC-006 is a SHOULD, and the excess is 6 % |

## 4. Consequences

- **Obliges:** whoever the two former lines bound, now under one line.
  Nothing new is obliged; a rule was removed.
- **Costs:** the published page for `CAN-003` becomes a redirect; the canon
  series counts seven documents; the body exceeds the SHOULD budget by 97
  words. Section anchors of both former documents change.
- **Follow-up, not decided here:** `CAN-007` gains the development of
  function (the Oracle's note); `STD-030` reconciles *Artificers* and
  *Intendants* with the translation glossary's *Artisans* and *Intendants*.
- **Reversal:** git holds both former texts; nothing outside the archive
  reads `CAN-003` by identifier.

## 5. Status

Proposed. It takes effect when the Oracle approves the pull request that
carries it.
