---
id: "STD-020"
uid: ""
title: "Git is the archive"
type: documentation
subtype: standard
status: draft
version: "1.1.3"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, git, archiving, redirects]
threshold: governed
series_change: "1.1.3 — 2026-09-25: written in plain words, at the Oracle's word in session: no code, field name or path in the reading; rules grouped by purpose, and plates, sources and what verifies each wait in one table at the foot. No obligation added or dropped."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Git is the archive

> **Summary:** Work reaches the main line by pull request, shared history is
> never rewritten, and what a program generates is generated again, never
> edited. A retired document names the one that replaces it, stays reachable
> where it was, and is deleted only when nothing living cites it.
> **Epistemic:** Which guarantees the repository gives that no document can,
> and how retiring a document keeps them.
> **Pragmatic:** Commit, merge, regenerate, replace and delete without
> breaking an address.
> **Audience:** Agents · Oracles

**Binds:** every commit to this repository and every retirement of a
registered document.
**Does not bind:** gathering old records into one per period, which the
standard on keeping the corpus small governs.

## Rules

### How work reaches the main line

**Pull request, never push.** Work reaches the main branch through a pull
request.

**One-line subject.** The first line of a commit says what changed and why,
on one line.

**Shared history is never rewritten.** The history of a branch others share
is never rewritten.

### What a program generates

**Generated means generated again.** A file a program generates is never
edited by hand.

**Measurements follow the commit.** The archive's measurements are taken
again after the commit they measure, never before it.

**Conflicts in generated files are generated again.** They are never
resolved by choosing one side.

### How a document is retired

**The replacement is named in the header.** A withdrawn document that has a
replacement names it in its header; one with none names nothing. A document
still in force or in draft names no replacement.

**The address survives.** A retired document stays reachable where it was
published.

**A redirect leads to the replacement.** Never to an index.

**Nothing is deleted while cited.** A document goes only when no living
document depends on it.

**Link, never copy.** A document is copied nowhere; a copy made from it says
which one is the original.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it follows, and what verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| GIT-025 | Pull request, never push | [Trunk-Based Development](https://trunkbaseddevelopment.com/) | `.github/rulesets/protect-main.json`: pull request required on the main line |
| GIT-026 | One-line subject | — | the guard of this standard (`machine/guards/rules/std-020-git-is-the-archive.mjs`), last 400 commit subjects |
| GIT-030 | Shared history is never rewritten | — | `.github/rulesets/protect-main.json`: no force push, no deletion, linear history |
| GIT-027 | Generated means generated again | — | `machine/scripts/telemetry.mjs --check` in the build guards; `machine/tools/generate-design-kit.mjs --check`, run by hand |
| GIT-028 | Measurements follow the commit | — | `machine/scripts/telemetry.mjs --check` in the build guards |
| GIT-029 | Conflicts in generated files are generated again | — | by hand: a resolved conflict looks like any other change |
| GIT-045 | The replacement is named in the header | — | the guard of this standard, which reads the `superseded_by` and `status` fields |
| GIT-046 | The address survives | — | `machine/scripts/check-url-lifecycle.mjs`, which reports and does not fail the build |
| GIT-047 | A redirect leads to the replacement | — | by hand: a redirect that resolves looks like any other |
| GIT-048 | Nothing is deleted while cited | — | the guard of this standard; `machine/tools/check-deletable.mjs`, run by hand |
| GIT-049 | Link, never copy | — | by hand: a scan comparing file contents would catch it, and does not exist |

## Why

The archive's strongest guarantee is one it inherits: who committed what,
and when, cannot be changed at any price worth paying. Every rule here
protects that inheritance from a rewritten branch, a file edited by hand
that a program owns, or an address that stops answering.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-009` | Which rule wins | why history is the record |
| `STD-012` | The corpus does not grow | the exit of records by period |
| `ADR-041` | Git is the archive | the decision that retired change logs |
