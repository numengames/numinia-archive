---
id: "STD-004"
uid: ""
title: "The header"
type: documentation
subtype: standard
status: draft
version: "3.2.0"
created: "2026-08-28T15:10:00Z"
created_source: "git:4c0a02e"
created_confidence: exact
updated: "2026-09-25T13:00:00+02:00"
ratified_by: "ADR-043"
author: "ursa"
owner: "oracle"
territory: "Archive"
license: "CC0-1.0"
tags: [frontmatter, standard, lint, metadata, ISO-8601, RFC-2119]
series_change: "3.2.0 — 2026-09-25: written in plain words a narrator can read aloud, and taking in from the external standards the two outside norms it rests on — dates as ISO 8601 and obligation words as RFC 2119 — as HDR-045 and HDR-046."
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
> **Epistemic:** What a correct header is, how dates and obligation words
> are written, and why each rule is one a machine can check.
> **Pragmatic:** Write a header, add a field, or read a finding by its code.
> **Audience:** Agents · Oracles

**Binds:** every document's header, and every date and obligation word the
archive writes.
**Does not bind:** the body below the header, or the site's own page schema.

## Rules

### Every document has a header

**Every governed document has a header.** Every document in a governed
folder MUST open with a header fenced by three dashes on their own lines,
which a standard reader parses, and which declares a licence.

**A field in no ring is an error.** The first ring of fields is required
of every document, the second of every document that makes a claim, the
third only as each series registers it. No field MAY sit outside a ring.

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

**Relations live in the header and resolve.** Every relation — replaces,
replaced by, absorbs, derived from, ratified by, related — MUST name a
document that exists. Related is used only when nothing stronger is known,
and never inferred.

**Titles are English.** Every title MUST be in English. That a title is
there is checked; its language is judged by hand, because language
detectors lie.

### How dates and obligation words are written

**Dates are written year first.** Every date MUST read year, month and day,
then the hour and its offset from universal time, always in that order, so
it sorts and never reads two ways.

**Obligation words mean one thing.** MUST, SHOULD and MAY, and their
negatives, carry the meaning the internet's standards body gave them: a must
is required, a should may be broken only with a reason, a may is a free
choice.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it rests on, and what verifies it today. Then the codes each field fails
under.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| HDR-000 | Every governed document has a header | — | `machine/guards/rules/std-004-the-header.mjs`, with HDR-040 (the fence) and HDR-043 (the licence) |
| HDR-040 | the fence, part of HDR-000 | — | `machine/guards/rules/std-004-the-header.mjs` |
| HDR-041 | the header parses, part of HDR-000 | [YAML 1.2](https://yaml.org/spec/1.2.2/) | `machine/guards/rules/std-006-plain-text.mjs` (TXT-002: the fence closes and the structure is sound) |
| HDR-043 | the licence is declared, part of HDR-000 | — | `machine/guards/rules/std-004-the-header.mjs`; the value is HDR-008 |
| HDR-030 | A field in no ring is an error | — | `machine/guards/rules/std-004-the-header.mjs` |
| HDR-042 | Adding a field costs a row and a decision | — | by hand, at review: the register row and the decision |
| HDR-009 | Empty is absent | — | `machine/guards/rules/std-004-the-header.mjs` |
| HDR-044 | Absent is never guessed | — | `machine/guards/rules/std-004-the-header.mjs`, placeholder values |
| HDR-032 | A deferred value has an owner | — | `machine/guards/rules/std-004-the-header.mjs`; whether the mission lives, by hand |
| HDR-031 | Retired fields leave in waves | — | `machine/guards/rules/std-004-the-header.mjs` |
| HDR-020 | The universal identifier stays empty | — | `machine/guards/rules/std-004-the-header.mjs` |
| HDR-016 | Relations live in the header and resolve | — | by hand, presence only: no guard resolves header relations; `machine/guards/rules/std-020-git-is-the-archive.mjs` reads the body |
| HDR-002 | Titles are English | — | `machine/guards/rules/std-004-the-header.mjs`, presence; language by hand |
| HDR-045 | Dates are written year first | [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) | `machine/guards/rules/std-004-the-header.mjs` for `created` and `updated` (HDR-006, HDR-007); other dates by hand |
| HDR-046 | Obligation words mean one thing | [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) | by hand, at review |
| HDR-001, 003..008, 012..014, 017..019, 033..038 | each field's own rule, in the register of header fields | — | `machine/guards/rules/std-004-the-header.mjs`, one plate per finding |
| HDR-010, 011, 015 | author, owner, commissioned by | — | by hand, presence only |

A governed folder is one `machine/scripts/lib/rules.json` lists under
`governed.dirs`. HDR-045 was EXT-006 and HDR-046 was EXT-001 in the external
standards; those plates are retired there.

## Why

A person reads the body; guards, indexes and the site read only the header.
Everything the machinery knows about a document is in these lines, so a
guessed value corrupts every view at once, and an unregistered field starts
a count that never stops. Dates and obligation words follow the norms the
world already reads, so nobody has to learn ours.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-016` | Header fields | every field, its shape, its plate |
| `STD-007` | One page per document | the body that follows the header |
| `STD-001` | The series | the folders and prefixes the fields draw on |
