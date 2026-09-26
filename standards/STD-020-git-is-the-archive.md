---
id: "STD-020"
uid: ""
title: "Git is the archive"
type: documentation
subtype: standard
status: draft
version: "2.1.1"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, git, archiving]
threshold: governed
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Git is the archive

> **Summary:** Work reaches the main line by pull request, shared history is
> never rewritten, and what a program generates is generated again, never
> edited.
> **Epistemic:** How a change reaches the main line, and which guarantees
> the repository gives that no document can.
> **Pragmatic:** Commit, merge and regenerate without rewriting what others
> already saw.
> **Audience:** Agents · Oracles

**Binds:** every commit to this repository.

## Rules

### How work reaches the main line

**Small batches, by pull request, on one trunk.** We follow trunk-based
development, the common practice of merging small changes into one main
line at least daily, and the security scorecard's highest tier of branch
protection, from the Open Source Security Foundation: every change MUST
reach the main branch through a pull request that has passed the required
checks and been approved. Conflicts stay small, and the repository's own
settings prove that nobody, however trusted, changed the main line alone.
Our choice.

**One-line subject.** We follow Conventional Commits, the common grammar for
commit messages: the first line of a commit MUST open with one of seven
kinds, then the area touched in brackets, and say, on one line, what
changed. A tool can then sort history and build release notes without
reading the code. Our addition: the same line says why. Our choice.

**Leave it better.** No change adds debt silently: it declares what it left
behind. A green pipeline is not a clean tree.

**Shared history is never rewritten.** We follow the scorecard's first tier
of branch protection and the second source level of the supply-chain levels
for software artifacts: force pushes and deletion of the main branch MUST
be blocked, so the history of a branch others share is never rewritten.
Anyone can then trust that a commit they once saw is still there, unchanged.
Our choice.

### What a program generates

**Generated means generated again.** A file a program generates is never
edited by hand.

**Measurements follow the commit.** The archive's measurements are taken
again after the commit they measure, never before it.

**Conflicts in generated files are generated again.** They are never
resolved by choosing one side.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| GIT-025 | Small batches, by pull request, on one trunk | [Trunk-Based Development](https://trunkbaseddevelopment.com/); [OpenSSF Scorecard, Branch-Protection tier 2 and Code-Review](https://github.com/ossf/scorecard/blob/main/docs/checks.md#branch-protection); holds retired ENG-003 | `.github/rulesets/protect-main.json`: pull request required on the main line, one approval, the `build` check required; `.github/workflows/scorecard.yml` grades it; batch size and branch age by hand |
| GIT-026 | One-line subject | [Conventional Commits 1.0.0, the header](https://www.conventionalcommits.org/en/v1.0.0/#specification) | the guard of this standard (`machine/guards/rules/std-020-git-is-the-archive.mjs`), last 400 commit subjects, one line only; the kind and the why are not checked (no commitlint, `DBT-020`) |
| GIT-050 | Leave it better | holds retired ENG-005 | by hand, at review: the pull request says what it left behind |
| GIT-030 | Shared history is never rewritten | [OpenSSF Scorecard, Branch-Protection tier 1](https://github.com/ossf/scorecard/blob/main/docs/checks.md#branch-protection); [SLSA 1.1, Source track level 2](https://slsa.dev/spec/) | `.github/rulesets/protect-main.json`: no force push, no deletion, linear history |
| GIT-027 | Generated means generated again | — | `machine/scripts/telemetry.mjs --check` in the build guards; `machine/tools/generate-design-kit.mjs --check`, run by hand |
| GIT-028 | Measurements follow the commit | — | `machine/scripts/telemetry.mjs --check` in the build guards |
| GIT-029 | Conflicts in generated files are generated again | — | by hand: a resolved conflict looks like any other change |

| Kind of commit | Written |
|---|---|
| a feature | `feat` |
| a fix | `fix` |
| documentation | `docs` |
| a chore | `chore` |
| a refactoring | `refactor` |
| a test | `test` |
| a change to the automatic checks | `ci` |
| retired, valid in old history only | `session`, `qa`, `standards`, `canon`, `debt`, `audit` |
| the area touched | in brackets, lower case, usually the folder: `feat(web): …` |

## Why

The archive's strongest guarantee is one it inherits: who committed what,
and when, cannot be changed at any price worth paying. Every rule here
protects that inheritance from a rewritten branch, or a file edited by
hand that a program owns.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-009` | Which rule wins | why history is the record |
| `STD-012` | The corpus does not grow | how a document leaves |
