---
id: "STD-004"
uid: ""
title: "The header"
type: documentation
subtype: standard
status: draft
version: "4.0.0"
created: "2026-08-28T15:10:00Z"
created_source: "git:4c0a02e"
created_confidence: exact
updated: "2026-09-26T12:00:00+02:00"
ratified_by: "ADR-043"
author: "ursa"
owner: "oracle"
territory: "Archive"
license: "CC0-1.0"
tags: [frontmatter, standard, lint, metadata, RFC-3339, BCP-14, YAML, Dublin-Core]
series_change: "4.0.0 — 2026-09-26: how obligation words are written leaves for One page per document, which says how every rule is worded; this standard now answers only what a correct header is. An obligation removed from here, so a major move, at the Oracle's word in session."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# The header

> **Summary:** Every document opens with a short block of labelled fields
> that says what it is, who wrote it and when. Each field is listed in the
> register of header fields, or it is an error. A value nobody knows is left
> out, never guessed.
> **Epistemic:** What a correct header is, which outside standards its
> values follow, and why each rule is one a machine can check.
> **Pragmatic:** Write a header, add a field, or read a finding by its code.
> **Audience:** Agents · Oracles

**Binds:** every document's header, and every date the archive writes.
**Does not bind:** the body below the header, or the site's own page schema.

## Rules

None of these rules is required by law; each is our choice, made so that
any tool that already reads the outside standard can check us unaided.

### Every document has a header

**Every governed document has a header.** Every document in a governed
folder MUST open, at its very first character, with a block of fields in
the plain data format called YAML, fenced by three dashes on their
own lines; so any tool finds the header without guessing where it starts.

**A field in no ring is an error.** A field that no ring registers MUST be
reported, the way a closed schema refuses any property it does not list: a
misspelt field is caught on the day it is written, instead of silently
meaning nothing.

**Adding a field costs a row and a decision.** A new field MUST arrive with
its line in the register of header fields and the decision that justifies
it, in the same change.

### What a header may say

**Empty is absent.** A field MUST NOT hold an empty value. To say nothing is
known, leave the field out, write null, or write that it is to be announced.

**Absent is never guessed.** A placeholder, a plausible date or an invented
author MUST NOT stand in for a value. Where history cannot testify, a date
is marked as declared, so a reader tells evidence from claim.

**A deferred value has an owner.** A value left to be announced MUST sit in
a field that a mission owns, and the check names that mission. Whether the
mission is still alive is judged by hand.

**Retired fields leave in waves.** A retired field MUST be reported wherever
it still appears until its migration lands; the rule naming it goes with
its last occurrence.

**The universal identifier stays empty.** The field reserved for a
universal identifier MUST stay empty until the system that assigns it
exists.

### What the values follow

**The licence is a name from the shared list.** Every header MUST declare a
licence, written exactly as the open-source world's shared licence list
spells it, the same tag the file's own licence lines carry; so one check
reads the terms of every file and they never disagree.

**A version counts what changed.** A version MUST be three numbers in the
semantic versioning form, bumped as the standard of versions says; a reader
knows from the number alone whether an obligation was dropped, added or
only reworded.

**Replaced is a relation, not a state.** A document that has an heir MUST
say so with a link to it, never with a status of its own; unlike the usual
decision-record habit of a superseded status, a link names the heir and
cannot drift from it.

**Relations live in the header and resolve.** Every relation — replaces,
replaced by, absorbs, derived from, ratified by, related, part of — MUST
name a document that exists, and each means what the library world's
Dublin Core terms and the web's provenance vocabulary say it means; so any
catalogue tool reads our links as its own.

**Titles are English.** Every title MUST be in English, and a language is
always named with the internet's standard language tags; so a program and a
person agree on which language a text is in.

### How dates are written

**Dates are written the internet's way.** Every date MUST follow the
internet's timestamp format: year, month, day, the hour and its offset from
universal time, in that order; so dates sort as text, read one way only,
and no updated date comes before its created date.

This standard is over its word budget because each rule now says what its
outside standard does, as well as what it obliges.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it rests on, and what verifies it today. Then the codes each field fails
under.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| HDR-000 | Every governed document has a header | [YAML 1.2.2](https://yaml.org/spec/1.2.2/) — ours adds: fenced by `---` at byte 0 | `machine/guards/rules/std-004-the-header.mjs`, with HDR-040 (the fence) and HDR-043 (the licence) |
| HDR-040 | the fence at byte 0, part of HDR-000 | [YAML 1.2.2](https://yaml.org/spec/1.2.2/), document markers | `machine/guards/rules/std-004-the-header.mjs` — the file starts with `---\n` |
| HDR-041 | retired → TXT-002 (the header parses) | [YAML 1.2.2](https://yaml.org/spec/1.2.2/) | `machine/guards/rules/std-006-plain-text.mjs` under TXT-002; plate kept, never reused |
| HDR-030 | A field in no ring is an error | [JSON Schema 2020-12](https://json-schema.org/draft/2020-12/json-schema-core), `additionalProperties: false`, as the model | `machine/guards/rules/std-004-the-header.mjs` |
| HDR-042 | Adding a field costs a row and a decision | — | by hand, at review: the register row and the decision |
| HDR-009 | Empty is absent | — | `machine/guards/rules/std-004-the-header.mjs` |
| HDR-044 | Absent is never guessed | — ([EDTF](https://www.loc.gov/standards/datetime/) is the candidate for uncertain dates) | `machine/guards/rules/std-004-the-header.mjs`, placeholder values |
| HDR-032 | A deferred value has an owner | — | `machine/guards/rules/std-004-the-header.mjs`; whether the mission lives, by hand |
| HDR-031 | Retired fields leave in waves | — | `machine/guards/rules/std-004-the-header.mjs` |
| HDR-020 | The universal identifier stays empty | — | `machine/guards/rules/std-004-the-header.mjs` |
| HDR-043 | The licence is a name from the shared list — declared | [REUSE 3.3](https://reuse.software/spec-3.3/); [SPDX 2.3 Annex E](https://spdx.github.io/spdx-spec/v2.3/using-SPDX-short-identifiers-in-source-files/) | `machine/guards/rules/std-004-the-header.mjs` — `license` present |
| HDR-008 | The licence is a name from the shared list — spelt right | [SPDX License List](https://spdx.org/licenses/) | `machine/guards/rules/std-004-the-header.mjs` — value against the manifest |
| HDR-005 | A version counts what changed | [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html); bump rules in `STD-019` | `machine/guards/rules/std-004-the-header.mjs` — shape; the bump, by hand |
| HDR-004 | Replaced is a relation, not a state | differs on purpose from [MADR](https://adr.github.io/madr/) and [Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) `superseded`; the heir is [`dcterms:isReplacedBy`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/isReplacedBy/) | `machine/guards/rules/std-004-the-header.mjs` — status in its lifecycle |
| HDR-016 | Relations live in the header and resolve | [DCMI Metadata Terms](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/): `replaces`, `isReplacedBy`, `relation`, `isPartOf`; [PROV-O](https://www.w3.org/TR/prov-o/) `wasDerivedFrom`; the field map is in `STD-016` | by hand, presence only: no guard resolves header relations; `machine/guards/rules/std-020-git-is-the-archive.mjs` reads the body |
| HDR-002 | Titles are English | [BCP 47](https://www.rfc-editor.org/info/bcp47) — the tag `en` | `machine/guards/rules/std-004-the-header.mjs`, presence; language by hand |
| HDR-045 | Dates are written the internet's way | [RFC 3339, section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6), a free, exact profile of [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) — ours adds: time required, `updated` ≥ `created` | `machine/guards/rules/std-004-the-header.mjs` for `created` and `updated` (HDR-006, HDR-007); other dates by hand |
| HDR-046 | retired → DOC-013 of One page per document, how the rules of a document are worded | — | — |
| HDR-001, 003, 006, 007, 012..014, 017..019, 033..038 | each field's own rule, in the register of header fields | — | `machine/guards/rules/std-004-the-header.mjs`, one plate per finding |
| HDR-010, 011, 015 | author, owner, commissioned by | — | by hand, presence only |

A governed folder is one `machine/scripts/lib/rules.json` lists under
`governed.dirs`. HDR-045 was EXT-006 and HDR-046 was EXT-001 in the external
standards; those plates are retired there.

## Why

A person reads the body; guards, indexes and the site read only the header.
Everything the machinery knows about a document is in these lines, so a
guessed value corrupts every view at once, and an unregistered field starts
a count that never stops. Each value follows a norm the world already
reads, so an auditor checks us with tools they already own.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-016` | Header fields | every field, its shape, its plate, its outside meaning |
| `STD-007` | One page per document | the body that follows the header |
| `STD-019` | Versions | when each number of a version moves |
| `STD-001` | The series | the folders and prefixes the fields draw on |
