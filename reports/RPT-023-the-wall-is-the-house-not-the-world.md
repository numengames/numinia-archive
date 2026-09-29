---
id: "RPT-023"
uid: ""
title: "The wall a newcomer hits is the house's own words, not the world's"
type: report
subtype: analysis
status: active
version: "1.0.0"
created: "2026-09-29T08:00:00+02:00"
updated: "2026-09-29T12:15:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [report, analysis, vocabulary, narrative-dial, onboarding, research]
license: "CC-BY-4.0"
visibility: "public"
scope: "The files a newcomer reads first — README.md, CONTRIBUTING.md, AGENTS.md, the eleven canons and four entry pages of the site (index, about, core, binding) — and the three vocabularies that exist today. Not examined: standards, protocols, the lore itself, other sites, human readers."
evidence_head: "854b774"
model: "claude-opus-5-5"
agent: "ursa"
related: ["BLU-007", "STD-026", "STD-030", "RPT-022", "CAN-007", "SYS-011"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# RPT-023 — The wall a newcomer hits is the house's own words, not the world's

> **Summary:** On 2026-09-29, in the 22 000 words a newcomer reads first,
> the game's names appear a handful of times while the house's working
> words — canon, binds, draft, register, Oracle — appear hundreds of times
> and no vocabulary defines them; words a business reader looks for, such as
> customer, market or backlog, do not appear at all.
> **Epistemic:** What actually stops an outsider reading this archive, and
> how others who met the same problem solved it.
> **Pragmatic:** The research base for the narrative dial and its census:
> what to rename, what to explain beside the word, what to rewrite by hand.
> **Audience:** Agents · Oracles

---

## 1. Scope and method

**The instrument.** The front matter of each file below is stripped and
every occurrence of a term is counted as a whole word, singular or plural,
case-insensitive except for the game's proper names. The same term is then
searched in the three existing vocabularies: `BLU-007` (the two dials),
`STD-026` (operative vocabulary) and `STD-030` (the world's vocabulary).

**The corpus.** 18 files, about 21 979 words: `README.md`,
`CONTRIBUTING.md`, `AGENTS.md`, the eleven files of `canon/`, and
`web/src/pages/index.astro`, `about.astro`, `core.astro`, `binding.astro`.
The term lists were chosen by hand: 46 game words, 35 house words and 29
business words — 110 in all. A term outside those lists was not counted.

**The outside cases.** Twelve searches for organisations and tools that met
the same problem; each case kept below was read at its source on the date
of this report.

**Measured at:** `854b774`, 2026-09-29.

## 2. Findings

### Measured

**The game's words are rare at the door.** Velo 5, Umbral 4, Prisma 4 —
all in one canon, the visual identity. Each of the four guilds appears once.
Prism Cell, Seal, Dark Council, Session Zero, Akasha, Ostramires: zero.

**The house's words are everywhere, and no vocabulary holds them.**

| Word | Times | In how many files | In a vocabulary |
|---|---|---|---|
| canon | 45 | 13 | no |
| binds | 36 | 18 | no |
| draft | 36 | 11 | no |
| Oracle | 23 | 8 | yes, in `BLU-007` and `STD-030` |
| register | 23 | 6 | no |
| Pragmatic | 16 | 13 | no |
| in force | 15 | 7 | no |
| guard | 15 | 5 | no |
| Epistemic | 14 | 13 | no |
| series | 13 | 6 | no |
| telemetry | 8 | 3 | no |
| debt | 7 | 4 | no |
| shelf · cut | 5 each | 4 · 2 | no |
| instrument · promotion | 4 each | 4 · 2 | no |
| ruling | 3 | 2 | no |
| mould · depot · roll-up | 2 each | 2 · 2 · 1 | no |
| ratchet | 1 | 1 | no |

"Yes" or "no" means the word has an entry that defines it; a word that only
occurs inside another entry's prose counts as "no". `Oracle` is the one house
word the vocabularies define — it belongs to the game as well.

The home page is titled *The Summa*.

**The business reader's words are missing.** customer 0, market 0,
backlog 0, goal 0, deadline 0, KPI 0, OKR 0, onboarding 0; client 2,
deliver 1, team 1, budget 1. What Numen Games sells, to whom and how it is
delivered is written in `operations/OPS-011-positioning-and-market.md`,
outside the corpus a newcomer reads, addressed to Oracles.

**The vocabularies disagree on the guilds.** The Sentinels are *Head of
Operations* in `BLU-007` and *People / Community / Support* in `STD-030`;
the Exegetes carry three different business equivalents across the
sources. The disagreement is not settled by picking one source: it is the
first evidence that one entity holds several facets (see below).

**Nothing translates the three forces into business language.** `CAN-008`
defines them as manifestation, depth and refraction.

### Outside: who met this problem and what they did

1. **Newsela** publishes each article at about five reading levels. Its
   staff rewrite four simpler versions by hand; the lower versions keep
   the topic's key terms "with either context or a full definition" and
   add "brief, plain-language explanations of concepts and institutions".
   Their levels change sentence structure, organisation and background
   knowledge, not only vocabulary.
   [Newsela's approach to leveling](https://help.newsela.com/en/articles/13656260-newsela-s-approach-to-leveling-nonfiction-texts)
2. **Magic: The Gathering** has printed *reminder text* since the Mirage set:
   "parenthesized text printed in italics that follows a keyword", which
   explains the keyword without being rules text. Some players called it
   dumbing the game down; it spread anyway, and foil cards later dropped it
   for flavour text — the expert's version.
   [Reminder text](https://mtg.wiki/page/Reminder_text)
3. **WCAG 2.2** has two AAA success criteria for exactly this. *Unusual
   Words* (3.1.3) asks for a mechanism that defines "technical jargon and
   unusual terms". It does not exempt "new, made-up, or invented words".
   *Reading Level* (3.1.5) asks for a simpler version when a text needs more
   than lower secondary education.
   [3.1.3](https://www.w3.org/WAI/WCAG22/Understanding/unusual-words.html) ·
   [3.1.5](https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html)
4. **Domain-driven design.** Each part of a large organisation keeps its own
   *ubiquitous language*. The design does not force one vocabulary on all of
   them: it draws a *bounded context* around each, with "mechanisms to map"
   between them.
   [Fowler, Bounded Context](https://martinfowler.com/bliki/BoundedContext.html)
5. **Shape Up** (Basecamp) coins its own words — appetite, bet, betting
   table, circuit breaker, cool-down — and every one has a one-line
   definition in business terms in a public glossary.
   [Shape Up glossary](https://basecamp.com/shapeup/4.5-appendix-06)
6. **Sociocracy 3.0** tells a newcomer, on its first page, to refer to the
   glossary "for terms you are not familiar with".
   [S3 guide](https://patterns.sociocracy30.org/)
7. **Holacracy at Zappos and Medium**, the counter-case. After Zappos
   adopted it, 18 % of staff (260 people) took a severance offer by January
   2016, though the paper says why they left "is unclear" (Chicago Tribune,
   2016-01-14). Medium moved off Holacracy in March 2016 (Medium blog, Andy
   Doyle, *Management and Organization at Medium*). The link between the
   jargon and the result is asserted by commentators, not measured.
8. **Project Fluent** (Mozilla) has *terms*: vocabulary items defined once,
   referenced everywhere, with variants a selector chooses between — the
   data shape of a three-stop dictionary.
   [Fluent terms](https://projectfluent.org/fluent/guide/terms.html)
9. **Vale**, an MIT-licensed prose linter, runs *substitution* rules that
   fail a build when a listed word appears — the shape of a guard for the
   business stop. [vale.sh](https://vale.sh/)
10. **Diátaxis** sorts documentation into four kinds: tutorials, how-to
    guides, reference and explanation. [diataxis.fr](https://diataxis.fr/)

### Inferred, not measured

- **Two vocabularies, two treatments.** The game's names are untouchable
  only inside the role-playing manual (Oracle, 2026-09-29); everywhere else
  — canon, site, README, onboarding — they are said as the reader's stop
  of the dial requires. The house's working words are not story. They can
  be renamed at the source, in every stop, and leave the dial's job for
  good. Renaming shrinks the problem before any tool is built.
- **An entity is not translated by one word** (Christian's review,
  2026-09-29). Many entities embody a concept with several facets; one
  business equivalent keeps one facet and reduces or falsifies the rest.
  The existing equivalents in `STD-030` and `BLU-007` are therefore
  hypotheses. The dial rests on *entity → concept → facet → context →
  formulation*, and the first four layers are described once, in a census,
  before any formulation is written.
- **Swapping words is not enough.** Newsela rewrites structure, and
  `CAN-007` says renaming is not transforming. The business stop needs
  three mechanisms: *swap* the word, *explain beside* it, and *rewrite by
  hand* the few blocks that open the site.
- **The missing documents are tutorial and reference, not more
  explanation.** In Diátaxis's terms the canon is explanation. What a
  business reader lacks is a short tutorial (what we offer, to whom, who
  decides, how work moves) and a reference (one dictionary).
- **The dial is also accessibility.** WCAG 3.1.3 applies to invented words
  by name, and `STD-034` already binds every public page.

## 3. What this report did NOT examine

Human readers; standards and protocols, which a newcomer reaches later;
the lore; numinia.com, numen.games and nwos.numen.games; words outside the
hand-picked lists, so the house list is a floor, not a census. The outside
cases were read at their sources, not tested; the Holacracy figures are
press reports.

## 4. What follows

1. This report, with the census index (`SYS-011`) and eight pilot cards in
   draft, one per category: guilds, factions, districts, ranks, forces,
   institutions, artefacts, resources.
2. Christian validates the pilot cards and the card itself; the Oracle
   approves; the census then runs category by category.
3. The house words, in a parallel track with a shorter card: each one
   marked *rename*, *keep and define* or *retire*.
4. Only then, the formulations per facet and context at the three stops
   (Business · Bridge · Numinia), the translator's format and its token
   cost.
5. The tool: the ⚙️ button with the narrative slider, the gloss beside the
   word, a guard for the business stop, and a page for business readers
   written by hand once the Summa's outer rings exist.

## References

| Identifier | Title | Why it is cited |
|---|---|---|
| `BLU-007` | Two Dials. One System. | the dial design and its vocabulary map |
| `STD-026` | Operative vocabulary | the business-term vocabulary searched |
| `STD-030` | The world's vocabulary | the game vocabulary searched; its equivalents are hypotheses |
| `RPT-022` | The newcomer test | the canon-only baseline this report widens |
| `CAN-007` | Renaming is not transforming | why swapping words is not enough |
| `CAN-008` | One identity, three forces | where the three forces are defined |
| `STD-034` | Accessibility | where WCAG already binds |
| `OPS-011` | Positioning and market | where the offer is written today |
| `SYS-011` | The semantic census | where the entities are described, facet by facet |
