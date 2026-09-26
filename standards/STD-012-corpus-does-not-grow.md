---
id: "STD-012"
uid: ""
title: "The corpus does not grow"
type: documentation
subtype: standard
status: draft
version: "2.0.2"
created: "2026-09-08T22:00:00Z"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
tags: [deflation, lifecycle, reports, missions, debt, compression, records-management, retirement, Dublin-Core]
ratified_by: "ADR-042"
related: ["ADR-030", "STD-025", "ADR-042", "PRO-017", "STD-001", "CAN-001", "STD-028"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# The corpus does not grow

> **Summary:** Records roll up by week, quarter and year, keeping only what
> changed a rule, a debt or an address. A document leaves replaced,
> absorbed or moved, and is deleted only when nothing living cites it.
> **Epistemic:** How a document leaves the archive, and why an archive that
> only adds becomes unreadable.
> **Pragmatic:** Roll up, replace, absorb, move or delete a document
> without leaving a citation pointing at nothing.
> **Audience:** Agents · Oracles

**Binds:** every document that leaves the archive or its series; roll-ups
bind records only.

## Rules

### What gets written

**The history is the daily record.** A document MUST NOT be written only to
say what happened today. The version history already says it.

**Three levels, no more.** Records MUST roll up into a weekly report, weekly
reports into a quarterly one, and quarterly reports into a yearly one.
There is no monthly level.

### What survives

**Three kinds of line survive.** The international standard for records
management asks that written criteria, fixed in advance, decide what is
kept, so anyone can show why a thing survived. Ours are three: a line MUST
be carried up only if it records a rule that changed, a debt that opened or
closed, or something with an address.

**A phase is an index, not a level.** A phase report points at the periods
it spans and what they concluded. It MUST NOT restate their lines.

**The written procedure authorises every removal.** The records standard
lets a record go only under a written authority, which later proves the
removal was allowed. Our roll-up procedure is that authority. Any agent MAY
run it, and it leaves nothing to taste: an uncertain line is carried up and
marked for the Oracle.

### How a document leaves

**A record leaves by transfer, not destruction.** The records standard ends
a record's life by destroying or transferring it. The version history keeps
every deleted file, so a deletion here is a transfer. Once a closed record
has its line in this week's report, its file MUST be deleted in that same
change, after the four deletion tests.

**The replacement is named in the header.** Dublin Core, the common
vocabulary for describing documents, lets a document name the one that
replaced it. A withdrawn document that has a replacement MUST name it in
its header. A document in force or in draft names none.

**A document changes series under a new name.** A document that moves to
another series MUST take a new name there, and the old one names it as its
replacement. Neither is renumbered. If a document citing the old name
cannot be updated in the same change, the move does not happen.

**Absorption carries the reasoning.** A document MAY leave by being carried
into another, which says in Dublin Core's terms what it replaces. The
reasoning survives there, and every citation is rewritten in the same
change. When a report rolls up, its list of absorbed names MUST move whole
to the report above.

**Nothing is deleted while cited.** A document MUST NOT be deleted while a
living document cites it. A citation from a closed record is a photograph
and does not count.

## Check

Each rule, its code, its source and its check. The sources use terms a
records auditor already knows. The company's accounting records live
outside this archive.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| DEF-001 | The history is the daily record | — | `machine/guards/rules/std-004-the-header.mjs` (`HDR-018`): `daily` is not a registered report subtype; a daily in disguise, by hand |
| DEF-002 | Three levels, no more | — | by hand — no guard reads `period` yet |
| DEF-003 | Three kinds of line survive | [ISO 15489-1:2016, appraisal](https://www.iso.org/standard/62542.html), clause 7 (clause unverified); the three kinds are ours | by hand — the procedure makes the executor say which of the three |
| DEF-006 | A phase is an index, not a level | — | by hand |
| DEF-007 | The written procedure authorises every removal | [ISO 15489-1:2016, disposition authorities](https://www.iso.org/standard/62542.html), clause 8.5 (clause unverified); the authority is `PRO-017` | by hand |
| DEF-004 | A record leaves by transfer, not destruction | [ISO 15489-1:2016, disposition](https://www.iso.org/standard/62542.html), clause 9.9 (clause unverified); git keeps the transferred file | `machine/tools/check-deletable.mjs --candidates` — closed records with no living citer |
| DEF-008 | The replacement is named in the header | [Dublin Core, Is Replaced By](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/isReplacedBy/); holds retired GIT-045 | `machine/guards/rules/std-012-corpus-does-not-grow.mjs`, which reads the `superseded_by` and `status` fields |
| DEF-010 | A document changes series under a new name | [Dublin Core, Is Replaced By](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/isReplacedBy/); no move without updating its readers is ours; holds retired SER-005 | `machine/guards/rules/std-012-corpus-does-not-grow.mjs` |
| DEF-011 | Absorption carries the reasoning | [Dublin Core, Replaces](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/replaces/); holds retired SER-006 | `machine/guards/rules/std-012-corpus-does-not-grow.mjs` (`absorbs:`) |
| DEF-009 | Nothing is deleted while cited | —; holds retired GIT-048 | `machine/guards/rules/std-012-corpus-does-not-grow.mjs`; `machine/tools/check-deletable.mjs`, run by hand |

| In the reading | Exact form |
|---|---|
| the version history | `git log --since` |
| a roll-up report | `reports/`, `subtype: rollup`, with a `period` field |
| a closed record | a mission `done`, or `frozen` with its reason; a debt resolved; a blueprint built or abandoned |
| its list of absorbed names | the `absorbs:` field of the report carrying the line |
| names it in its header | `superseded_by:` on the withdrawn document (Dublin Core `isReplacedBy`) |
| says what it replaces | `absorbs:` on the heir (Dublin Core `replaces`) |
| the four deletion tests | `ADR-030` |
| the written procedure | `PRO-017` |

## Why

An archive that only adds grows, within months, past what any reader can
hold. By September 2026 it held 133 missions, cut to 18 by hand in one day.
This standard turns that cut into a rhythm, on terms a records auditor
already reads, and gives every other exit a name that keeps resolving.
Three levels, because each is a point where someone decides. A fourth
rewrites more and decides nothing new.

## References

| ID | Title | Relation |
|---|---|---|
| `PRO-017` | Rolling up the week | the procedure; what a weekly report looks like |
| `STD-028` | One document, one address | where a retired document's address leads |
