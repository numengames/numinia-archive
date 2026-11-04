---
id: "MIS-290"
uid: ""
title: "Say in the versions standard when a version number is written"
type: mission
status: in-progress
version: "0.1.0"
created: "2026-11-04T09:20:00Z"
updated: "2026-11-04T09:20:00Z"
author: "ursa"
owner: "oracle"
section: "Knowledge and quality"
tags: [standards, versioning, changelog, merge-queue]
license: "CC0-1.0"

priority: high
weight: 3
model_planned: sonnet
budget_usd: 1.50
budget_minutes: 25
executor: agent
assigned_to: "ursa"
completed: null

started: "2026-11-04T09:20:00Z"
paths: ["standards/STD-019-versions.md"]
related: ["MIS-0273"]
context: "2026-11-04T10:20:00+01:00"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-290 — Say in the versions standard when a version number is written

> **Summary:** `STD-019` says what each version number promises but not when
> the number is written, and it binds only the archive's documents. This
> mission adds the rule that the number moves once, at release, and widens the
> standard to every versioned repository of the house.
> **Epistemic:** When, in a repository where several changes are open at once,
> a version number and its shared log are written.
> **Pragmatic:** A change adds a file of its own naming its kind; the release
> step joins those files and moves the number once. No two open changes edit
> the same lines.
> **Audience:** Agents · Oracles

---

## 1. Story

As an agent who opens a change in `numinia-engine`, I want to leave the version
number and the shared log alone, so that my change does not conflict with every
other open change the moment one of them merges.

---

## 2. Scope

The standard `standards/STD-019-versions.md` only, in `numinia-archive`: one new
rule in the section «When the number is written», one new Check row, a wider
**Binds** line, version 3.2.0. The repository that builds the release step
(`numinia-engine`, branch `chore/versions-without-collisions`) is another
worker's mission. Moving this archive's own `CHANGELOG.md` to fragments
(`changelog.d/`, approved by the Oracle on 2026-10-31) is not part of this mission.

---

## 3. Acceptance criteria

- [ ] `grep -c 'the number moves once' standards/STD-019-versions.md` prints 1 or more (today: 0).
- [ ] The **Binds** line of `STD-019` names every repository of the house that carries a version number (today: it names only documents and what the archive versions).
- [ ] `grep '^version:' standards/STD-019-versions.md` prints `3.2.0` (today: `3.1.5`).
- [ ] `node machine/tools/rule-index.mjs --check` and `npm run checks -- --rules` pass with the new rule (today: the rule does not exist, so there is nothing to pass).

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 3 «criterio de diseño», one estimator (the orchestrator).
- Why this card: the wording decides whether a new recommendation counts as a minor and whether the standard still asks one question.
- Process: sonnet, about $1.50 (closest closed example: the `STD-019` 3.2.0 draft of 2026-10-19, never merged).

**Time — how much work there is**
- 25 minutes, in one pull request.
- Like: the lost-opportunity retention rule added to `STD-039` (#701).
- Biggest risk: a plate used in a closed pull request and a Binds line that the web tests read.

---

## 5. What we learned

*(Written at the end.)*
