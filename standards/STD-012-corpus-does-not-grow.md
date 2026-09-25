---
id: "STD-012"
uid: ""
title: "The corpus does not grow"
type: documentation
subtype: standard
status: draft
version: "1.2.3"
created: "2026-09-08T22:00:00Z"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
tags: [deflation, lifecycle, reports, missions, debt, compression]
ratified_by: "ADR-042"
related: ["ADR-030", "STD-025", "ADR-042", "PRO-017", "STD-001", "CAN-001"]
series_change: "1.2.3 — 2026-09-25: written in plain words a narrator can read aloud; plates, field names and paths wait in the Check tables, and records management is named as the outside standard behind what survives and when a record leaves. No obligation added or dropped."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# The corpus does not grow

> **Summary:** Every record — a mission, a report, a debt, a blueprint — has
> a written way out. Records roll up by week, by quarter and by year. What
> survives is what changed a rule, opened or closed a debt, or produced
> something with an address. The history keeps the rest.
> **Epistemic:** Why an archive that only adds becomes unreadable, and what a
> reader may expect to find where.
> **Pragmatic:** A deleted record's name keeps leading somewhere: to the
> highest living document that holds its line.
> **Audience:** Agents · Oracles

**Binds:** missions, reports, debt records and blueprints.
**Does not bind:** canon, standards and protocols, which shrink by merging;
decisions, which become rules.

## Rules

### What gets written

**The history is the daily record.** A document MUST NOT be written whose
only purpose is to say what happened today; the version history already says
it.

**Three levels, no more.** Records roll up into a weekly report, weekly
reports into a quarterly one, quarterly reports into a yearly one. There is
no monthly level.

### What survives

**Only three kinds of line survive a roll-up.** A line is carried up only if
it records a rule that changed, a debt that opened or closed, or something
with an address: a web page, a released version, a merged change elsewhere.

**A phase is an index, not a level.** A phase report points at the periods
it spans and what they concluded. It MUST NOT restate their lines; it cites
them.

**Anyone may roll up; nobody may choose.** Any agent MAY run a roll-up by
the written procedure. What survives is decided by the three kinds above; an
uncertain line is carried up and marked for the Oracle, never dropped.

### How a record leaves

**The record goes when its line lands.** A closed mission, a resolved debt,
or a blueprint built or abandoned: its line goes into this week's report and
the file is deleted in the same change, after the four deletion tests.

**The name leads to the highest living level.** A deleted record's name is
listed as absorbed by the report carrying its line. When that report rolls
up, the list MUST move whole into the report above, and every public
redirect MUST follow in the same change.

## Check

Every rule above, with its plate, the outside standard it follows, and what
verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| DEF-001 | The history is the daily record | — | `machine/guards/rules/std-004-the-header.mjs` (`HDR-018`): `daily` is not a registered report subtype; a daily in disguise, by hand |
| DEF-002 | Three levels, no more | — | by hand — no guard reads `period` yet |
| DEF-003 | Only three kinds of line survive a roll-up | [ISO 15489-1, appraisal](https://www.iso.org/standard/62542.html) | by hand — the procedure makes the executor say which of the three |
| DEF-006 | A phase is an index, not a level | — | by hand |
| DEF-007 | Anyone may roll up; nobody may choose | [ISO 15489-1, disposition authority](https://www.iso.org/standard/62542.html) | by hand |
| DEF-004 | The record goes when its line lands | [ISO 15489-1, disposition](https://www.iso.org/standard/62542.html) | `machine/tools/check-deletable.mjs --candidates` — closed records with no living citer |
| DEF-005 | The name leads to the highest living level | [W3C, Cool URIs don't change](https://www.w3.org/Provider/Style/URI) | `machine/guards/rules/std-020-git-is-the-archive.mjs` · `machine/scripts/check-url-lifecycle.mjs` |

| In the reading | Exact form |
|---|---|
| the version history | `git log --since` |
| a roll-up report | `reports/`, `subtype: rollup`, with a `period` field |
| listed as absorbed | the `absorbs:` field of the report |
| the four deletion tests | `ADR-030` |
| the written procedure | `PRO-017` |
| closed mission | `status: done`, or `frozen` with its reason |

## Why

An archive that only adds grows, in months, beyond what any reader can hold:
by September 2026 it held 133 missions and was cut to 18 by hand in one day.
This standard makes that cut a rhythm instead of an event. Three levels,
because each is a point where a decision is taken; a fourth rewriting loses
more without deciding more. A document written only to be compressed later
is inflation with a deadline.

## References

| ID | Title | Relation |
|---|---|---|
| `PRO-017` | Rolling up the week | the procedure; what a weekly report looks like |
| `ADR-030` | The four tests before deletion | the four tests every exit still passes |
| `ADR-042` | The corpus rolls up weekly | the decision that ratified this standard |
| `RPT-018` | The Alpha story | closed for growth; the first weekly starts after it |
