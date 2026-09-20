---
id: "STD-012"
uid: ""
title: "The corpus does not grow"
type: documentation
subtype: standard
status: draft
version: "1.2.2"
created: "2026-09-08T22:00:00Z"
updated: "2026-09-11T12:00:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
tags: [deflation, lifecycle, reports, missions, debt, compression]
ratified_by: "ADR-042"
related: ["ADR-030", "STD-025", "ADR-042", "PRO-017", "STD-001", "CAN-001"]
series_change: "1.2.2 — 2026-09-11: Check rows name the folder a script lives in (machine/scripts/, machine/tools/, machine/guards/rules/); a bare filename does not say where to run it, and three of them had moved. Patch: prose only. 1.2.1 — 2026-09-10: status `active` → `draft` under the alpha reset the Oracle ordered on 2026-09-10: the state had been set by agents, not signed one by one. Text unchanged; the state returns to `draft` until the tree meets the standard and the Oracle ratifies it one by one. Patch move (VER-064). 1.2.0 — the standard takes the ADR-043 shape: 868 -> 455 words of body. DEF-001..007 keep their text and their checks; the history that motivated the standard is one sentence in the Why. Minor: no rule changed, and no section number was cited by any document."
---
# The corpus does not grow

> **Summary:** Every record — mission, report, debt, blueprint — has a written
> exit. Records roll up by period: week, quarter, year. What survives is what
> changed a rule, opened or closed a debt, or produced an address. Git keeps
> the rest.
> **Epistemic:** Why a corpus that only adds becomes unreadable, and what a
> reader may expect to find where.
> **Pragmatic:** A deleted record's identifier keeps resolving, always to the
> highest living document that holds its line.
> **Audience:** Agents · Oracles

**Binds:** `missions/`, `reports/`, `debt/`, `blueprints/`.
**Does not bind:** the axis — `canon/`, `standards/`, `protocols/` deflate by
consolidation (`ADR-030`); `decisions/` deflate by becoming rules, never by
roll-up.

## Rules

**DEF-001 — Git is the daily record.** No document MUST be written whose only
purpose is to say what happened today. `git log --since` is the daily report.

**DEF-002 — Three levels, not more.** Records roll up into a **weekly** report,
weekly into **quarterly**, quarterly into **annual**. No monthly level. Each is
one document in `reports/`, `subtype: rollup`, with a `period` field.

**DEF-003 — What survives a roll-up.** A line is carried up if, and only if, it
records a rule that changed, a debt that opened or closed, or an artefact with
an address — a URL, a released version, a merged PR elsewhere. Everything else
falls at the first roll-up.

**DEF-004 — The record dies when its line lands.** A mission that closes
(`done`, or `frozen` with its reason), a resolved debt, a blueprint that became
a mission or was abandoned: its line goes into the current weekly report and
the file is deleted in the same PR, under `ADR-030`'s four tests.

**DEF-005 — The identifier resolves to the highest living level.** A deleted
record's identifier goes into the `absorbs:` of the report that carries its
line. When that report is rolled up, its `absorbs:` MUST move whole into the
report above, and every public redirect MUST be repointed in the same PR.

**DEF-006 — Phase is an index, not a level.** A phase report points at the
periods that compose the phase and what they concluded. It MUST NOT restate
the weekly lines; it cites them.

**DEF-007 — The roll-up is delegable; the criterion is not.** Any agent MAY
execute a roll-up following `PRO-017`. What survives is DEF-003, not the
executor's judgement; an uncertain line is carried up and marked for the
Oracle, never dropped.

## Check

| Plate | Verified by |
|---|---|
| DEF-001 | `machine/guards/rules/std-004-the-header.mjs` — no `subtype: daily`, no one-day `period` · `[MANUAL]` for a daily in disguise |
| DEF-002 | `[MANUAL]` — no guard reads `period` yet (`ADR-042`) |
| DEF-003 | `[MANUAL]` — `PRO-017` makes the executor state which of the three |
| DEF-004 | `machine/tools/check-deletable.mjs --candidates` — closed records with no living citer |
| DEF-005 | `machine/guards/rules/std-020-git-is-the-archive.mjs` · `machine/scripts/check-url-lifecycle.mjs` |
| DEF-006 | `[MANUAL]` |

## Why

An archive that only adds becomes, in months, larger than any reader can
hold: 133 missions and 528k tokens by September 2026, cut to 18 and 324k in
one day by hand. This standard makes that cut a rhythm instead of an event.
Three levels because each is a decision boundary; a fourth rewriting adds loss
without adding one. A document written in order to be compressed later is
inflation with a deadline.

## References

| ID | Title | Relation |
|---|---|---|
| `PRO-017` | Rolling up the week | the procedure; what a weekly report looks like |
| `ADR-030` | Lifecycle and deletion | the four tests every exit still passes |
| `ADR-042` | Corpus rolls up by period | the decision that ratified this standard |
| `RPT-018` | The Alpha story | closed for growth; the first weekly starts after it |
