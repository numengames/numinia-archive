---
id: "STD-012"
uid: ""
title: "The corpus does not grow"
type: documentation
subtype: standard
status: draft
version: "1.3.0"
created: "2026-09-08T22:00:00Z"
updated: "2026-09-25T15:00:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
tags: [deflation, lifecycle, reports, missions, debt, compression, records-management]
ratified_by: "ADR-042"
related: ["ADR-030", "STD-025", "ADR-042", "PRO-017", "STD-001", "CAN-001"]
series_change: "1.3.0 — 2026-09-25: what survives and how a record leaves are written as what they adopt from the international standard for records management and the web's permanent redirect, each saying what it makes us do and why, and that no law requires it; the no-redirect-chain rule becomes an explicit obligation."
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
> **Epistemic:** Why an archive that only adds becomes unreadable, and that
> our way out is the one records managers everywhere already audit.
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

### How a record leaves

**A record leaves by transfer, not destruction.** The records standard ends
a record's life by destroying it or transferring it; the version history
keeps every deleted file, so ours is a transfer. Once a closed record has
its line in this week's report, its file MUST be deleted in that change,
after the four deletion tests.

**The old name leads to the answer in one step.** The web's permanent
redirect, and the rule that good addresses never change, keep every old link
working; we add that it lands on the answer directly. When a report rolls
up, its list of absorbed names and every public redirect MUST move to the
report above in the same change.

## Check

Every rule above, with its plate, the outside standard it follows, and what
verifies it today. No law requires any of it: Spanish law obliges a company
to keep its accounting records, which live elsewhere; the rest is our choice,
made so an auditor can read it in terms they already know.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| DEF-001 | The history is the daily record | — | `machine/guards/rules/std-004-the-header.mjs` (`HDR-018`): `daily` is not a registered report subtype; a daily in disguise, by hand |
| DEF-002 | Three levels, no more | — | by hand — no guard reads `period` yet |
| DEF-003 | Three kinds of line survive | [ISO 15489-1:2016, appraisal](https://www.iso.org/standard/62542.html), clause 7 (clause unverified); the three kinds are ours | by hand — the procedure makes the executor say which of the three |
| DEF-006 | A phase is an index, not a level | — | by hand |
| DEF-007 | The written procedure authorises every removal | [ISO 15489-1:2016, disposition authorities](https://www.iso.org/standard/62542.html), clause 8.5 (clause unverified); the authority is `PRO-017` | by hand |
| DEF-004 | A record leaves by transfer, not destruction | [ISO 15489-1:2016, disposition](https://www.iso.org/standard/62542.html), clause 9.9 (clause unverified); git keeps the transferred file | `machine/tools/check-deletable.mjs --candidates` — closed records with no living citer |
| DEF-005 | The old name leads to the answer in one step | [RFC 9110, 301 Moved Permanently, section 15.4.2](https://www.rfc-editor.org/rfc/rfc9110#section-15.4.2) · [W3C, Cool URIs don't change](https://www.w3.org/Provider/Style/URI); one step, no chain, is ours | `machine/guards/rules/std-020-git-is-the-archive.mjs` · `machine/scripts/check-url-lifecycle.mjs` · `machine/scripts/check-url-shape.mjs` (redirect chains) |

| In the reading | Exact form |
|---|---|
| the version history | `git log --since` |
| a roll-up report | `reports/`, `subtype: rollup`, with a `period` field |
| a closed record | a mission `done`, or `frozen` with its reason; a debt resolved; a blueprint built or abandoned |
| its list of absorbed names | the `absorbs:` field of the report carrying the line |
| the four deletion tests | `ADR-030` |
| the written procedure | `PRO-017` |

## Why

An archive that only adds grows, in months, beyond what any reader can hold:
by September 2026 it held 133 missions and was cut to 18 by hand in one day.
This standard makes that cut a rhythm instead of an event, on terms an
auditor of records already reads. Three levels, because each is a point where
a decision is taken; a fourth rewriting loses more without deciding more.

## References

| ID | Title | Relation |
|---|---|---|
| `PRO-017` | Rolling up the week | the procedure; what a weekly report looks like |
| `ADR-030` | The four tests before deletion | the four tests every exit still passes |
| `ADR-042` | The corpus rolls up weekly | the decision that ratified this standard |
| `RPT-018` | The Alpha story | closed for growth; the first weekly starts after it |
