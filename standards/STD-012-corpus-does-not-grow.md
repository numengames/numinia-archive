---
id: "STD-012"
uid: ""
title: "The corpus does not grow"
type: documentation
subtype: standard
status: draft
version: "2.0.0"
created: "2026-09-08T22:00:00Z"
updated: "2026-09-26T12:00:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
tags: [deflation, lifecycle, reports, missions, debt, compression, records-management, retirement, Dublin-Core]
ratified_by: "ADR-042"
related: ["ADR-030", "STD-025", "ADR-042", "PRO-017", "STD-001", "CAN-001", "STD-028"]
series_change: "2.0.0 — 2026-09-26: this standard becomes the one answer to how a document leaves: it takes naming the replacement and deleting only what nothing cites from Git is the archive, and moving series and absorption from A series is a function, and binds every document that leaves, not only records. Where a retired address leads is left to the address standard alone. A wider scope with new obligations, so a major move, at the Oracle's word in session."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# The corpus does not grow

> **Summary:** Every document has a written way out. Records roll up by
> week, by quarter and by year, and keep only what changed a rule, a debt
> or an address. Any document leaves by being replaced, absorbed or moved
> under a new name, and is deleted only when nothing living cites it.
> **Epistemic:** How a document leaves the archive, and why an archive that
> only adds becomes unreadable.
> **Pragmatic:** Roll up, replace, absorb, move or delete a document
> without leaving a citation pointing at nothing.
> **Audience:** Agents · Oracles

**Binds:** every document that leaves the archive or its series; roll-ups
bind records only.
**Does not bind:** where a retired web address leads.

## Rules

### What gets written

**The history is the daily record.** A document MUST NOT be written whose
only purpose is to say what happened today; the version history already says
it.

**Three levels, no more.** Records MUST roll up into a weekly report, weekly
reports into a quarterly one, and quarterly reports into a yearly one; there
is no monthly level.

### What survives

**Three kinds of line survive.** The international standard for records
management asks that what is kept be decided in advance by written criteria,
so anyone can show why a thing survived. Ours are three: a line MUST be
carried up only if it records a rule that changed, a debt that opened or
closed, or something with an address.

**A phase is an index, not a level.** A phase report points at the periods
it spans and what they concluded, and MUST NOT restate their lines.

**The written procedure authorises every removal.** The records standard
lets a record go only under a written authority, which proves afterwards
that each removal was allowed. Our roll-up procedure is that authority: any
agent MAY run it, and it leaves nothing to taste — an uncertain line is
carried up and marked for the Oracle.

### How a document leaves

**A record leaves by transfer, not destruction.** The records standard ends
a record's life by destroying it or transferring it; the version history
keeps every deleted file, so ours is a transfer. Once a closed record has
its line in this week's report, its file MUST be deleted in that change,
after the four deletion tests.

**The replacement is named in the header.** Dublin Core, the common
vocabulary for describing documents, lets a document say which one replaced
it. A withdrawn document that has a replacement MUST name it in its header;
a document still in force or in draft names none.

**A document changes series under a new name.** A document that moves to
another series MUST take a new name there, with the old one naming it as
its replacement; neither is renumbered, and if a reader of the old cannot
be updated in the same change, the move does not happen.

**Absorption carries the reasoning.** A document MAY leave by being carried
into another that says, in Dublin Core's terms, what it replaces; the
reasoning survives there, and every citation is rewritten in the same
change. When a report rolls up, its list of absorbed names MUST move whole
to the report above.

**Nothing is deleted while cited.** A document MUST NOT be deleted while a
living document cites it; a closed record's citation is a photograph and
does not count.

## Check

Each rule, its code, its source and its check. No law requires any of it:
Spanish law obliges a company to keep its accounting records, which live
elsewhere; the rest is our choice, made so an auditor can read it in terms
they already know.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| DEF-001 | The history is the daily record | — | `machine/guards/rules/std-004-the-header.mjs` (`HDR-018`): `daily` is not a registered report subtype; a daily in disguise, by hand |
| DEF-002 | Three levels, no more | — | by hand — no guard reads `period` yet |
| DEF-003 | Three kinds of line survive | [ISO 15489-1:2016, appraisal](https://www.iso.org/standard/62542.html), clause 7 (clause unverified); the three kinds are ours | by hand — the procedure makes the executor say which of the three |
| DEF-006 | A phase is an index, not a level | — | by hand |
| DEF-007 | The written procedure authorises every removal | [ISO 15489-1:2016, disposition authorities](https://www.iso.org/standard/62542.html), clause 8.5 (clause unverified); the authority is `PRO-017` | by hand |
| DEF-004 | A record leaves by transfer, not destruction | [ISO 15489-1:2016, disposition](https://www.iso.org/standard/62542.html), clause 9.9 (clause unverified); git keeps the transferred file | `machine/tools/check-deletable.mjs --candidates` — closed records with no living citer |
| DEF-005 | retired → URL-005 of One document, one address, which alone says where a retired address leads; the moving list of absorbed names is DEF-011 | — | — |
| DEF-008 | The replacement is named in the header | [Dublin Core, Is Replaced By](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/isReplacedBy/); holds retired GIT-045 | `machine/guards/rules/std-012-corpus-does-not-grow.mjs`, which reads the `superseded_by` and `status` fields |
| DEF-010 | A document changes series under a new name | [Dublin Core, Is Replaced By](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/isReplacedBy/); no move without updating its readers is ours; holds retired SER-005 | `machine/guards/rules/std-012-corpus-does-not-grow.mjs` |
| DEF-011 | Absorption carries the reasoning | [Dublin Core, Replaces](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/replaces/); holds retired SER-006 | `machine/guards/rules/std-012-corpus-does-not-grow.mjs` (`absorbs:`) |
| DEF-009 | Nothing is deleted while cited | — (ours); holds retired GIT-048 | `machine/guards/rules/std-012-corpus-does-not-grow.mjs`; `machine/tools/check-deletable.mjs`, run by hand |

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

An archive that only adds grows, in months, beyond what any reader can hold:
by September 2026 it held 133 missions and was cut to 18 by hand in one day.
This standard makes that cut a rhythm instead of an event, on terms an
auditor of records already reads, and gives every other exit a name that
keeps resolving. Three levels, because each is a point where a decision is
taken; a fourth rewriting loses more without deciding more.

## References

| ID | Title | Relation |
|---|---|---|
| `PRO-017` | Rolling up the week | the procedure; what a weekly report looks like |
| `ADR-030` | The four tests before deletion | the four tests every exit still passes |
| `ADR-042` | The corpus rolls up weekly | the decision that ratified this standard |
| `RPT-018` | The Alpha story | closed for growth; the first weekly starts after it |
| `STD-028` | One document, one address | where a retired document's address leads |
