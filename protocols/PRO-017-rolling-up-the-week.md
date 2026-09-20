---
id: "PRO-017"
uid: ""
title: "Rolling up the week"
type: protocol
status: draft
version: "2.0.1"
created: "2026-09-08T22:00:00Z"
updated: "2026-09-10T12:30:00+02:00"
author: "ursa"
owner: "oracle"
tags: [protocol, rollup, deflation, weekly, reports]
license: "CC0-1.0"
applies_to: [all-agents]
mandatory: true
ratified_by: "ADR-042"
related: ["STD-012", "ADR-030", "RPT-018"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-017 — Rolling up the week

> **Summary:** Once a week one agent turns every record that closed into
> one line in the weekly report and deletes the record. Quarterly and
> annual roll-ups are the same procedure applied to the level below.
> **Epistemic:** The procedure that makes `STD-012` happen without the
> Oracle in the loop. The criterion is `DEF-003`; only the steps are here.
> **Pragmatic:** Fifteen minutes on Monday; the corpus does not grow.
> **Audience:** Agents

**Binds:** any agent executing a weekly, quarterly or annual roll-up.
**Does not bind:** what survives a roll-up (`DEF-003`) nor the four
deletion tests (`ADR-030`).

## 1. Trigger

Every Monday before the Dark Council, for the week that ended Sunday.
Quarterly on the first Monday of a quarter over thirteen weeklies; annual
on the first Monday of a year over four quarterlies. Executor: any agent on
`PRO-001` session; the Oracle reviews the pull request.

## 2. Rules

**RUP-001 — The line is copied, not written.** Each line MUST be taken from
the record's own Closure: identifier, title, one sentence, the commit or PR
that proves it. A Closure the tree does not show is carried as *claimed,
not delivered*.

**RUP-002 — Every line is classified.** Each line MUST carry one of
`DEF-003`'s three marks — `rule`, `debt`, `address` — or `none`. A line the
executor cannot classify is marked `oracle` and stays until the Oracle
rules.

**RUP-003 — The report absorbs before the file dies.** The identifier MUST
be in the report's `absorbs:` (both `MIS-NNN` and `MIS-NNNN` forms) and its
public URL MUST redirect, both locales, before `git rm`.

**RUP-004 — Deletion is not the executor's call.** A record the executor
thinks should stay MUST still be deleted, its line marked `oracle`. Git
holds the body.

**RUP-005 — Telemetry is the last commit.** The dataset MUST be regenerated
after the final content commit and `--check` MUST pass before push.

## 3. Procedure

1. Open or create `reports/RPT-NNN-<yyyy>-w<ww>.md`, `subtype: rollup`,
   with two sections: *Closed this week*, *Carried up*.
2. `node machine/scripts/check-deletable.mjs --candidates` lists what closed;
   `git log --since=<monday>` is the daily record (`DEF-001`).
3. One line per record (`RUP-001`), classified (`RUP-002`).
4. `absorbs:` and redirects in `web/astro.config.mjs` (`RUP-003`).
5. `git rm` the records. Add one line to the open phase report citing this
   week's report, not its lines (`DEF-006`).
6. Guards, `npm run build`, commit, telemetry, commit (`RUP-005`).
7. PR titled `rollup: <period>`: the lines, the token delta, the four
   `ADR-030` tests answered.

Quarterly and annual: the "records" are the reports of the level below.
Only `rule`, `debt`, `address` lines are carried up; `absorbs:` lists move
whole (`DEF-005`); redirects are repointed; the lower reports are deleted.

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
| `RPT-018` | Alpha story | the open phase report step 5 points at |
