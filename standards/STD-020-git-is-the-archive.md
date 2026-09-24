---
id: "STD-020"
uid: ""
title: "Git is the archive"
type: documentation
subtype: standard
status: draft
version: "1.1.2"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-11T12:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, git, archiving, redirects]
threshold: governed
series_change: "1.1.2 — 2026-09-11: Check rows name the folder a script lives in (machine/scripts/, machine/tools/, machine/guards/rules/); a bare filename does not say where to run it, and three of them had moved. Patch: prose only. 1.1.1 — Check rows repoint to machine/guards/rules/std-020-git-is-the-archive.mjs (R3, MIS guards-tests-ci-alpha): check-references and the GIT rules of check-core-rules fold into one guard; no plate or verdict changes. 1.0.0 — new standard, split from STD-009 under ADR-043. Rules keep their plates and their verifiers; the prose around them is the Why. Old §7 Git and §8 Archiving are one standard: retiring a document is a git operation."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Git is the archive

> **Summary:** Work reaches `main` by pull request, shared history is never
> rewritten, generated files are regenerated. A retired document names its
> heir, stays reachable at its address, and is deleted only when nothing
> living cites it.
> **Epistemic:** Which guarantees the repository gives that no document can,
> and how retirement preserves them.
> **Pragmatic:** Commit, merge, regenerate, supersede and delete without
> breaking an address.
> **Audience:** Agents · Oracles

**Binds:** every commit to this repository and every retirement of a
registered document.
**Does not bind:** the roll-up of records by period — `STD-012`.

## Rules

**GIT-025 — Pull request, never push.** Work reaches the main branch through
a pull request.

**GIT-026 — One-line subject.** A commit's first line says what changed and
why, on one line.

**GIT-030 — Shared history is immutable.** History on a shared branch is
never rewritten.

**GIT-027 — Generated means regenerated.** A generated file is never edited
by hand.

**GIT-028 — Telemetry follows the commit.** Telemetry is regenerated after
the commit it measures, never before.

**GIT-029 — Conflicts in generated files are regenerated.** Never resolved by
choosing sides.

**GIT-045 — The heir is a field.** A `withdrawn` document that has a
replacement names it in `superseded_by`; one that has none carries no
`superseded_by`. A document still `active` or `draft` names no heir.

**GIT-046 — The address survives.** A retired document stays reachable where
it was published.

**GIT-047 — A redirect points at the heir.** Never at an index.

**GIT-048 — Nothing is deleted while cited.** A document goes when no living
document depends on it.

**GIT-049 — Link, never copy.** A document is copied nowhere; a derived copy
declares its master.

## Check

| Plate | Verified by |
|---|---|
| GIT-025, GIT-030 | branch protection, GitHub settings |
| GIT-026, GIT-045 | `machine/guards/rules/std-020-git-is-the-archive.mjs` |
| GIT-027, GIT-028 | `machine/scripts/telemetry.mjs --check`, `machine/tools/generate-design-kit.mjs` |
| GIT-046 | `machine/scripts/check-url-lifecycle.mjs` |
| GIT-048 | `machine/guards/rules/std-020-git-is-the-archive.mjs`, `machine/tools/check-deletable.mjs` |
| GIT-029, GIT-047 | `[MANUAL]` — a resolved conflict and a resolving redirect look like any other |
| GIT-049 | `[MANUAL]` — a content-hash scan would catch it and does not exist |

## Why

The archive's strongest guarantee is the one it inherits: who committed what,
and when, cannot be changed at any price worth paying (`PRE-001`). Every rule
here protects that inheritance — from a rewritten branch, a hand-edited
artefact, or an address that stops resolving.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-009` | Which rule wins | why history is the record |
| `STD-012` | The corpus does not grow | the exit of records by period |
| `ADR-041` | Git is the archive | the decision that retired change logs |
