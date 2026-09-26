---
id: "STD-019"
uid: ""
title: "Versions"
type: documentation
subtype: standard
status: draft
version: "3.0.1"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, versioning, semver]
threshold: governed
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Versions

> **Summary:** Every version is three numbers, major, minor and patch,
> following Semantic Versioning as published. A document's promise to its
> readers is its obligations: breaking work that obeyed it yesterday raises
> the first number, offering more without breaking anything raises the
> middle, and rewording raises the last.
> **Epistemic:** What a version number promises the reader of a document.
> **Pragmatic:** Decide the new number from what changed, not from the mood.
> **Audience:** Agents · Oracles

**Binds:** every registered document, and everything else the archive
versions.
**Does not bind:** software packages elsewhere, which version themselves.

## Rules

### What a version is

**Versions follow Semantic Versioning.** We follow Semantic Versioning, the
common rule for version numbers: every version MUST be three numbers —
major, minor, patch — and a document's public promise, which that rule asks
each project to declare, is its set of obligations. Anyone can then read
from the number alone whether their work still conforms. Everything starts
at zero point one point zero, and reaching one point zero is a major move.
Our choice.

**The header and the log agree.** Where a document keeps a log of its own
changes, the version in its header MUST be the same number as the newest
entry.

### When a number moves

**Breaking conformance is a major.** Any change that makes work which obeyed
the document yesterday fall short today MUST raise the first number:
removing or reversing an obligation, or adding one that is required.

**Offering more without breaking is a minor; rewording is a patch.** A new
recommendation, a new permission or a wider scope that leaves every
conforming work still conforming MUST raise the middle number; a change of
wording that asks nothing new raises only the last.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| VER-021 | Versions follow Semantic Versioning | [Semantic Versioning 2.0.0, items 1 and 2](https://semver.org/spec/v2.0.0.html) | `machine/guards/rules/std-019-versions.mjs`, the shape of the number only; `machine/scripts/check-templates.mjs` T-08 for the opening value on the moulds |
| VER-024 | The header and the log agree | — | `machine/guards/rules/std-019-versions.mjs` |
| VER-023 | Breaking conformance is a major | [Semantic Versioning 2.0.0, item 8](https://semver.org/spec/v2.0.0.html) | by hand: deciding that a change breaks conformance is the judgement itself |
| VER-022 | Offering more without breaking is a minor; rewording is a patch | [Semantic Versioning 2.0.0, items 6 and 7](https://semver.org/spec/v2.0.0.html) | by hand, as above |

## Why

A version is a promise about compatibility. For a document, compatibility
is whether work that obeyed it yesterday still obeys it today; that is
exactly what Semantic Versioning's first number guards, so a new
requirement is a major, not the minor our old rule called it.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-017` | Who may change what | who may move each of the three numbers |
