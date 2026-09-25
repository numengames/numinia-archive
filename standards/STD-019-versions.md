---
id: "STD-019"
uid: ""
title: "Versions"
type: documentation
subtype: standard
status: draft
version: "1.0.4"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, versioning, semver]
threshold: governed
series_change: "1.0.4 — 2026-09-25: written in plain words a narrator can read aloud, and taking in Semantic Versioning from the external standards, where its rule said what our own first rule already said; the two become one rule, with the outside standard as its source."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Versions

> **Summary:** Every version is three numbers, major, minor and patch,
> following the world's common scheme as published. Asking more raises the
> middle number; reversing what was asked raises the first. Who may raise
> which number is set by rank.
> **Epistemic:** What a version number promises the reader of a document.
> **Pragmatic:** Decide the new number from what changed, not from the mood.
> **Audience:** Agents · Oracles

**Binds:** every registered document, and everything else the archive
versions.
**Does not bind:** software packages elsewhere, which version themselves.

## Rules

### What a version is

**Versions follow Semantic Versioning.** Every version MUST be three
numbers — major, minor, patch — as that scheme publishes them, not redefined
here. Everything starts at zero point one point zero.

**The header and the log agree.** Where a document keeps a log of its own
changes, the version in its header MUST be the same number as the newest
entry.

### When a number moves

**A changed obligation is at least a minor.** Changing what a document
requires MUST raise at least the middle number.

**A reversed obligation is a major.** Reversing what a document requires
MUST raise the first number.

### Who may move it

**Who moves which number.** A digital agent MAY move the patch; an Archon
MAY move the minor; only an Oracle MAY move the major. Reaching one point
zero is a major move.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it rests on, and what verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| VER-021 | Versions follow Semantic Versioning | [Semantic Versioning 2.0.0](https://semver.org/) | `machine/guards/rules/std-019-versions.mjs`, the shape of the number only; `machine/scripts/check-templates.mjs` T-08 for the opening value on the moulds |
| VER-024 | The header and the log agree | — | `machine/guards/rules/std-019-versions.mjs` |
| VER-022 | A changed obligation is at least a minor | — | by hand: deciding that a change is a changed obligation is the judgement itself |
| VER-023 | A reversed obligation is a major | — | by hand, as above |
| VER-064 | Who moves which number | — | by hand: matching an author to the number they moved |

VER-021 absorbs EXT-002 of the external standards, which said the same;
that plate is retired there. We adapt the scheme on one point: for a
document, who may raise each number depends on authority, not only on
compatibility.

## Why

A version is a promise about compatibility. For a document, compatibility
is whether what it required yesterday is still required today: a minor says
more is asked, a major says the opposite is asked. Tying each number to a
rank makes the promise cost what it claims, so nobody reverses an obligation
by accident on a patch.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-017` | Who may change what | the ranks VER-064 names |
