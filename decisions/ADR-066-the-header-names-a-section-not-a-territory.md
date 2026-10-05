---
id: "ADR-066"
uid: ""
title: "The header names a section of the company, not a territory"
type: adr
status: draft
version: "0.2.0"
created: "2026-10-03T19:40:00+02:00"
updated: "2026-10-05T14:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Knowledge and quality"
tags: [decisions, adr, header, vocabulary, sections, territory]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "The header field territory is retired and replaced by section, whose only values are the ten sections of the front door in STD-030; every published record carries exactly one; the code's name for a top-level folder becomes series, the archive's own word."
amends: ["STD-004"]
related: ["STD-030", "STD-001", "STD-027", "SYS-011"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# ADR-066 — The header names a section, not a territory

> **Summary:** `territory` leaves the header; `section` takes its place, with
> the ten sections of the front door as its only values; the viewer's code
> stops calling a folder a "section" and calls it a series.
> **Epistemic:** On 2026-09-29 the world gave *territory* a meaning of its
> own — a faction's district — and the header's eight values were never
> sections of a company. One word, two meanings, in the same archive.
> **Pragmatic:** `STD-004` gains a vocabulary row and a retired-field row;
> 172 records change one line; about 110 gain one; the front door reads the
> field to arrange the archive.
> **Audience:** Agents · Oracles

---

## 1. Context

Measured on `0fae541`, 2026-10-03.

| | |
|---|---|
| records carrying `territory:` | 172 |
| of those, `Archive` | 72 |
| of those, `Sales` | 47 |
| the other six values together (`Funding`, `Product`, `Platform`, `CAO`, `Infrastructure`, `Content`) | 53 |
| published records carrying no `territory:` | about 110 |
| places in the viewer that read the field | 6 pages, 1 telemetry family, the sales kit |

**The word has an owner now.** The semantic census card
`system/semantic-census/district-ouroboros.md` (2026-09-29) defines a
*district* as the operative territory of a faction: the ground a house works.
The header had been using the same word since the Spanish-era `area` was
renamed, for something else — a rough label of what a record is about. Two
meanings for one word is the drift `STD-030` exists to stop.

**The values were never a vocabulary of the company.** `CAO`, `Product`,
`Platform`, `Infrastructure`, `Content`, `Sales`, `Funding`, `Archive` mix an
office, two products, two layers of technology, a kind of writing, a function
and the archive itself. Nothing arranged a page by them; 72 of 172 records
said `Archive`, which is where every record lives. A field whose most common
value adds nothing is a field nobody reads.

**The front door needs a reading of the archive a company recognises.**
The Oracle decided (2026-09-29, 2026-10-03) that numinia.org opens on the
archive arranged by the sections of a company, with the map at `/map`.
`STD-030` already holds those sections — ten, following the APQC Process
Classification Framework 7.4 merged where a small company does not split
them. The field that said what a record is about is exactly the field the
front door needs, once its values are those ten.

**A name collides in the code.** The viewer calls a top-level folder a
"section" (`SECTIONS`, `sectionOf`, `[section].astro` in `web/src/lib/corpus.ts`
and `web/src/pages/`). The archive's own word for a folder is *series*
(`STD-001`, `STD-027`: function · activity · series, after ISO 15489). The
word in the code was a leftover of the first viewer; it is used in 23 lines
of 6 files and a reader never sees it.

---

## 2. Decision

The header field `territory` is retired. The field `section` replaces it, in
ring 3, for every series that carries a header. Its only values are the ten
sections of the front door as written in `STD-030`, exactly: *Strategy and
governance*, *Products and services*, *Brand and marketing*, *Sales and
partners*, *Operations*, *People and culture*, *Finance*, *Legal and
compliance*, *Technology*, *Knowledge and quality*. Every published record
carries exactly one. A series whose records carry no header and all belong
to one section names that section once, in `STD-030` (*Series that take one
section*), and its records inherit it; today that is `lore/`, the game, in
*Products and services*. A record's section is a reading for the front door, not
a filing: the function classifies and the series files (`STD-027`, CLS-001),
and neither changes here.

The viewer's code names a top-level folder a *series*, as the archive does.
The word *section* in the code means the header field and nothing else.

Binds from the merge of this record. `STD-004` is active and ratified by
`ADR-043`; its change is the Oracle's, by his decision of 2026-10-03.

---

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Keep `territory` and change only its values | The word now belongs to the world's districts; the census card would have to carry a footnote forever. |
| Name the field `business_section` and leave the code alone | Two words for one thing in 280 headers, to spare 23 lines of code a rename. The uglier word would be the one every author types. |
| Name the field `category`, APQC's own word | `category` is already a header field of two series under `system/` (the census cards, the supplier cards), with other meanings. |
| Name the field `function`, records management's word for a business grouping | `function` is taken by the classification scheme (`STD-027`): six functions, not ten, and they classify rather than arrange. |
| Derive the section from the folder, write nothing in the header | Folders and sections are not one to one: `protocols/` holds sales procedures and legal ones; `operations/` holds offers and secrets. Half the archive would be guessed. Kept for one case only: a series without headers whose every record is one section (`lore/`), declared once in `STD-030`. |

---

## 4. Consequences

**Obliges.** `STD-004` gains the row and the retired field; the header guard
rejects any value outside the ten and reports `territory` wherever it
remains, as it does `area`. The 18 moulds in `machine/templates/` offer the
ten values. Each of the 172 records is reread and given its section; the
records that carried none receive one. A test holds that every published
record falls in exactly one section, and that the section exists in
`STD-030`. The front door reads the field.

**Costs.** One line in about 280 files, a version bump on each; the telemetry
family `missions` reports `by_section` instead of `by_territory`, and the
snapshot history keeps the old key where it was written. The sales kit's
fixture changes one line.

**Unchanged.** Function, series, type, status; every address; the content
of every record.

---

## 5. Status

Proposed on 2026-10-03, pending the Oracle's acceptance on the pull request.
