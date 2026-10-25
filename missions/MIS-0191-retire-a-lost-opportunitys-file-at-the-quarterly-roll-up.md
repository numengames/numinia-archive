---
id: "MIS-191"
uid: ""
title: "Retire a lost opportunity's file at the quarterly roll-up, after 90 days"
type: mission
status: done
version: "0.2.0"
created: "2026-10-15T10:55:00Z"
updated: "2026-10-25T18:00:00Z"
author: "ursa"
owner: "oracle"
section: "Sales and partners"
tags: [standards, sales, opportunity, retention, roll-up]
license: "CC0-1.0"

priority: medium
effort: S
executor: agent
assigned_to: "ursa"
completed: "2026-10-15T11:17:07Z"

started: "2026-10-15T10:55:00Z"
requires_oracle_approval: true
context: "2026-10-15T10:55:00Z"
paths: [standards/STD-039-an-opportunity-has-a-record.md, procedures/PRO-017-rolling-up-the-week.md, machine/packages/sales-kit/pipeline.mjs, machine/templates/RPT-TEMPLATE-QUARTER.md]
related: ["MIS-190", "STD-039", "STD-012", "STD-043", "PRO-017"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-191 — Retire a lost opportunity's file at the quarterly roll-up

> **Summary:** The Oracle ruled (2026-10-15) that a record closed `lost` is
> kept 90 days from its `lost` line; the first quarterly roll-up after that
> counts it — how many, their value, their reason — and deletes its file.
> A won record stays. This builds the ruling.
> **Epistemic:** Can the pipeline say which lost records are ready to leave,
> so the roll-up needs no memory?
> **Pragmatic:** The roll-up reads one list from the tool, writes one
> measured line, and removes the files.
> **Audience:** Agents · Oracles

---

## 1. Scope

- `pipeline.mjs` lists, in its figures and its report, every lost record
  more than 90 days past its `lost` line, with its reason and value.
- `STD-039` states the rule and a row says what checks it.
- `PRO-017`'s quarterly step names the list, the line under *business and
  customers* and the removal; the quarterly template says where it goes.

Out of scope: naming a company from its first contact (still open), and
putting `STD-039` in force.

---

## 2. Acceptance criteria

- [x] `node machine/packages/sales-kit/pipeline.mjs <records> --json` has a
  `leaving` list; a record lost 91 days ago is in it and one lost 90 days
  ago is not. Today: the key does not exist.
- [x] The report has a section for what is ready to leave. Today: it has none.
- [x] `STD-039` says 90 days and the quarterly roll-up in `PRO-017` removes
  those files. Today: neither says it.
- [x] `npm test` and both check sets pass.

---

## 3. Closure

- **What was done:** `pipeline.mjs` lists `leaving` (lost records past 90
  days) in its figures and a *Ready to leave* section in its report;
  `STD-039` 0.16.0 holds the rule as OPP-019; `PRO-017` 3.4.0 and the
  quarterly template carry the quarterly step; the site's figures type
  knows the new key.
- **What diverged, and why:** to stay under the page limit of `STD-039`
  (1,500 words) the Why section and the summary's list of kinds were
  shortened; no obligation changed. A lost record's file is not deleted by
  the tool: the roll-up does it, with the count written first. The scope called naming
  a company from first contact "still open"; it was already decided: a
  company is named only after its written confirmation, and `STD-054`,
  `STD-039`, `PRO-029`, the record template and a tool comment now say
  that (they said "told and did not object").
- **Evidence:** `npm test` all green (three new tests on the 90-day
  boundary, the report section and the tree); both check sets pass.
- **Closed:** 2026-10-15, when the Oracle merged #701 · **by:** the Oracle
