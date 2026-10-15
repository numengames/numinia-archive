---
id: "MIS-191"
uid: ""
title: "Retire a lost opportunity's file at the quarterly roll-up, after 90 days"
type: mission
status: in-progress
version: "0.1.0"
created: "2026-10-15T10:55:00Z"
updated: "2026-10-15T10:55:00Z"
author: "ursa"
owner: "oracle"
section: "Sales and partners"
tags: [standards, sales, opportunity, retention, roll-up]
license: "CC0-1.0"

priority: medium
effort: S
executor: agent
assigned_to: "ursa"
completed: null

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

- [ ] `node machine/packages/sales-kit/pipeline.mjs <records> --json` has a
  `leaving` list; a record lost 91 days ago is in it and one lost 90 days
  ago is not. Today: the key does not exist.
- [ ] The report has a section for what is ready to leave. Today: it has none.
- [ ] `STD-039` says 90 days and the quarterly roll-up in `PRO-017` removes
  those files. Today: neither says it.
- [ ] `npm test` and both check sets pass.

---

## 3. Closure

*(Fill when the mission closes.)*
