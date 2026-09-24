---
id: "STD-019"
uid: ""
title: "Versions"
type: documentation
subtype: standard
status: draft
version: "1.0.3"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-11T12:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, versioning, semver]
threshold: governed
series_change: "1.0.3 — 2026-09-11: Check rows name the folder a script lives in (machine/scripts/, machine/tools/, machine/guards/rules/); a bare filename does not say where to run it, and three of them had moved. Patch: prose only. 1.0.2 — Check row repoints to machine/guards/rules/std-019-versions.mjs (R3, MIS guards-tests-ci-alpha): VER-021/024 leave check-core-rules; no plate or verdict changes. 1.0.0 — new standard, split from STD-009 under ADR-043. Rules keep their plates and their verifiers; the prose around them is the Why."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Versions

> **Summary:** Semantic Versioning 2.0.0, adopted as published. A changed
> obligation is at least a minor; a reversed one is a major; who may move
> which digit is set by rank.
> **Epistemic:** What a version number promises a reader of a document.
> **Pragmatic:** Decide the bump from the diff, not from the mood.
> **Audience:** Agents · Oracles

**Binds:** every registered document, and every artefact the corpus versions.
**Does not bind:** software packages downstream, which follow their own
`package.json`.

## Rules

**VER-021 — Semantic Versioning 2.0.0.** Versions follow semver as published
at <https://semver.org>, not redefined here. Every artefact starts at
`0.1.0`.

**VER-022 — A changed obligation is at least a minor.** Changing what a
document requires raises at least the middle number.

**VER-023 — A reversed obligation is a major.** Reversing what a document
requires raises the first number.

**VER-064 — Who moves which digit.** A digital agent moves the patch; an
Archon moves the minor; only an Oracle moves the major. Promotion to `1.0.0`
is a major move.

**VER-024 — Header and log agree.** Where a document keeps a change log, the
version in the header and the newest entry are the same number.

## Check

| Plate | Verified by |
|---|---|
| VER-021, VER-024 | `machine/guards/rules/std-019-versions.mjs`; `machine/scripts/check-templates.mjs` T-08 for the opening value |
| VER-022, 023 | `[MANUAL]` — classifying a diff as a changed obligation is the judgement itself |
| VER-064 | `[MANUAL]` — matching an author to the digit they moved |

## Why

A version is a promise about compatibility. For a document, compatibility is
whether what it required yesterday is still required today: a minor says
more is asked, a major says the opposite is asked. Tying the digit to a rank
makes the promise cost what it claims — nobody reverses an obligation by
accident on a patch.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-017` | Who may change what | the ranks VER-064 names |
