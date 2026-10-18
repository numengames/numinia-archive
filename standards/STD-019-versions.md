---
id: "STD-019"
uid: ""
title: "Versions"
type: standard
subtype: standard
status: active
version: "3.2.0"
created: "2026-09-03T22:10:00Z"
updated: "2026-10-19T00:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "Knowledge and quality"
license: "CC0-1.0"
tags: [standards, versioning, semver]
derived_from: "PRI-009"

---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Versions

> **Summary:** A version is three numbers, major, minor and patch, as
> Semantic Versioning defines them. A document promises its obligations.
> Breaking work that obeyed it raises the first number, offering more raises
> the middle, and rewording raises the last.
> **Epistemic:** What does a version number promise?
> **Pragmatic:** Choose the new number from what changed, not from the mood.
> **Audience:** Agents · Oracles

**Binds:** every registered document, and everything else the archive
versions.

## Rules

### What a version is

**Versions follow Semantic Versioning.** Every version MUST be three
numbers, major, minor and patch, as Semantic Versioning defines them. That
rule asks each project to declare its public promise, and a document's
promise is its set of obligations. Anyone can then tell from the number
alone whether their work still conforms. Everything starts at zero point one
point zero, and reaching one point zero is a major move.

**The header and the log agree.** Where a document keeps a log of its own
changes, the version in its header MUST be the same number as the newest
entry.

### When a number moves

**Breaking conformance is a major.** A change that makes yesterday's
conforming work fall short today MUST raise the first number. Removing or
reversing an obligation does this, and so does adding a required one.

**Offering more without breaking is a minor; rewording is a patch.** A new
recommendation, a new permission or a wider scope that leaves all
conforming work still conforming MUST raise the middle number. A change of
wording that asks nothing new raises only the last.

### Format changes while a format has no outside user

**A non-additive format change needs no prior approval while that format has
no user outside Numen Games.** For an artefact whose on-disk or on-wire
format may still move — today, Numinia Engine's world and save format — an
additive change (one that only adds, never removes or redefines a field)
ships like any other change. A non-additive change (renaming, removing or
redefining a field) MAY also ship without the approval `STD-017` would
otherwise ask, as long as nobody outside Numen Games reads or writes that
format yet; shipping it MUST raise the major number and fix a test
fingerprint of the format so the break is visible and reproducible.

**The exemption ends the day an outside user exists.** From the first time
the format is read or written by anyone outside Numen Games, a non-additive
change returns to the approval `STD-017` asks of every other breaking
change. This clause does not revive on its own — restoring it once it has
lapsed is itself a change to what the standard promises, so it raises the
major number like any other reversal of an obligation (see *Breaking
conformance is a major*, above).

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| VER-021 | Versions follow Semantic Versioning | [Semantic Versioning 2.0.0, items 1 and 2](https://semver.org/spec/v2.0.0.html) | `machine/checks/rules/std-019-versions.mjs`, the shape of the number only; `machine/scripts/check-templates.mjs` T-08 for the opening value on the templates |
| VER-024 | The header and the log agree | — | `machine/checks/rules/std-019-versions.mjs` |
| VER-023 | Breaking conformance is a major | [Semantic Versioning 2.0.0, item 8](https://semver.org/spec/v2.0.0.html) | by hand: deciding that a change breaks conformance is the judgement itself |
| VER-022 | Offering more without breaking is a minor; rewording is a patch | [Semantic Versioning 2.0.0, items 6 and 7](https://semver.org/spec/v2.0.0.html) | by hand, as above |
| VER-025 | A non-additive format change needs no prior approval while that format has no outside user; the exemption ends the day one exists | `AGENTS.md` §Autonomy (numinia-engine); `ADR-074` | by hand: whether the format already has a user outside Numen Games is the judgement itself |

## Why

A version is a promise about compatibility. For a document, compatibility
means that work which obeyed it yesterday still obeys it today. Semantic
Versioning's first number checks exactly that, so a new requirement is a
major, not the minor our old rule called it.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-017` | Who may change what | who may move each of the three numbers |
| `ADR-074` | A world is text: a folder with a schema is the truth, formats only grow, glTF is the delivery, and the whole world can always be downloaded | the decision `VER-025`'s exemption extends |
