---
id: "PRO-017"
uid: ""
title: "Rolling up the week"
type: protocol
status: draft
version: "3.1.0"
created: "2026-09-08T22:00:00Z"
updated: "2026-09-27T15:45:00+02:00"
author: "ursa"
owner: "oracle"
tags: [protocol, rollup, deflation, weekly, reports]
license: "CC0-1.0"
applies_to: [all-agents]
mandatory: true
ratified_by: "ADR-042"
related: ["STD-012", "ADR-030", "RPT-018"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-017 — Rolling up the week

> **Summary:** Once a week one agent turns every record that closed into
> one line in the weekly report and deletes the record. Quarterly and
> annual roll-ups are the same procedure applied to the level below.
> **Epistemic:** How does the week's closed work become one report and leave the corpus smaller?
> **Pragmatic:** Fifteen minutes on Monday; the corpus does not grow.
> **Audience:** Agents

**Binds:** any agent executing a weekly, quarterly or annual roll-up.

## 1. Purpose and trigger

Every Monday before the Dark Council, for the week that ended Sunday.
Quarterly on the first Monday of a quarter over thirteen weeklies; annual
on the first Monday of a year over four quarterlies. Executor: any agent on
`PRO-001` session; the Oracle reviews the pull request.

## 2. Preconditions

- A clone of `main` with its full history: the roll-up reads `git log`.
- The phase report open, so the week's report has a parent to cite.
- The week closed: it ended on Sunday.

## 3. Procedure

1. **Open the report.** Open or create `reports/RPT-NNN-<yyyy>-w<ww>.md`,
   `subtype: rollup`, with two sections: *Closed this week*, *Carried up*.
2. **List what closed.** `node machine/scripts/check-deletable.mjs
   --candidates`; `git log --since=<monday>` is the daily record (`DEF-001`).
3. **Copy one line per record.** Take it from the record's own Closure:
   identifier, title, one sentence, the commit or PR that proves it. Do not
   write it. A Closure the tree does not show is carried as *claimed, not
   delivered*.
4. **Classify every line.** Mark it with one of `DEF-003`'s three marks —
   `rule`, `debt`, `address` — or `none`. A line you cannot classify is
   marked `oracle` and stays until the Oracle rules.
5. **Absorb before deleting.** Put the identifier in the report's
   `absorbs:` (both `MIS-NNN` and `MIS-NNNN` forms) and redirect its public
   URL in `web/astro.config.mjs`, both locales.
6. **Delete the records.** `git rm` every one — including a record you
   think should stay: mark its line `oracle`; git holds the body. Add one
   line to the open phase report citing this week's report, not its lines
   (`DEF-006`).
7. **Build and commit.** Guards, `npm run build`, commit.
8. **Regenerate telemetry last.** Regenerate the dataset after the final
   content commit; `--check` passes before push. Commit.
9. **Open the PR.** Title `rollup: <period>`: the lines, the token delta,
   the four `ADR-030` tests answered.

Quarterly and annual: the "records" are the reports of the level below.
Carry up only `rule`, `debt`, `address` lines; move `absorbs:` lists whole
(`DEF-011`); repoint redirects (`URL-005`); delete the lower reports.

## 4. Verification

| Check | Evidence |
|---|---|
| Nothing broke | `check-references` 0 new · `check-url-lifecycle` 0 dead |
| Nothing left behind | `check-deletable --candidates` empty for the period |
| Nothing lost | `absorbs:` equals the set of deleted identifiers |
| Nothing grew | `tokens.total` in `machine/telemetry/latest.json` lower than before; if not, the PR says why |

## 5. Escalation

A Closure the executor believes was deliberately false: `PRO-005`. The
Oracle wants a body back: `git show <commit>:<path>`.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-012` | The corpus does not grow | `DEF-001..007`, the rule this executes |
| `ADR-030` | Lifecycle and deletion | the four tests a deletion answers |
| `RPT-018` | Alpha story | the open phase report step 6 points at |
