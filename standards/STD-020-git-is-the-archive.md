---
id: "STD-020"
uid: ""
title: "Git is the archive"
type: documentation
subtype: standard
status: draft
version: "1.2.0"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-25T15:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, git, archiving, redirects]
threshold: governed
series_change: "1.2.0 — 2026-09-25: five rules now follow and name an outside standard (the scorecard's branch protection, supply-chain source level two, Conventional Commits, the W3C's cool addresses and the HTTP permanent redirects) and say what each makes us do, a minor move because a commit subject must now open with its kind and none is dropped, at the Oracle's word in session."
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

**Pull request, never push.** We follow the security scorecard's highest
tier of branch protection, from the Open Source Security Foundation: every
change MUST reach the main branch through a pull request that has passed
the required checks and been approved. The repository's own settings then
prove that nobody, however trusted, changed the main line alone. Our choice.

**One-line subject.** We follow Conventional Commits, the common grammar for
commit messages: the first line of a commit MUST open with the kind of
change and say, on one line, what changed. A tool can then sort history and
build release notes without reading the code. Our addition: the same line
says why. Our choice.

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

### How a document is retired

**The replacement is named in the header.** A withdrawn document that has a
replacement names it in its header; one with none names nothing. A document
still in force or in draft names no replacement.

**The address survives.** We follow the World Wide Web Consortium's advice
that cool addresses do not change: a retired document MUST stay reachable
where it was published. Every link, citation and bookmark made to it keeps
working. Our addition: retiring a document is no reason to move it. Our
choice.

**A redirect leads to the replacement.** We follow the web's rules for
answering a request: a moved document MUST answer with a permanent redirect
to the one that replaces it, so a browser, a search engine or a link checker
knows the move is for good and updates its link. Our addition: never to an
index, which answers no one's question. Our choice.

**Nothing is deleted while cited.** A document goes only when no living
document depends on it.

**Link, never copy.** A document is copied nowhere; a copy made from it says
which one is the original.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it follows, and what verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| GIT-025 | Pull request, never push | [OpenSSF Scorecard, Branch-Protection tier 2](https://github.com/ossf/scorecard/blob/main/docs/checks.md#branch-protection) | `.github/rulesets/protect-main.json`: pull request required on the main line, one approval, the `build` check required; `.github/workflows/scorecard.yml` grades it |
| GIT-026 | One-line subject | [Conventional Commits 1.0.0, the header](https://www.conventionalcommits.org/en/v1.0.0/#specification) | the guard of this standard (`machine/guards/rules/std-020-git-is-the-archive.mjs`), last 400 commit subjects, one line only; the kind and the why are not checked (no commitlint, `DBT-020`) |
| GIT-030 | Shared history is never rewritten | [OpenSSF Scorecard, Branch-Protection tier 1](https://github.com/ossf/scorecard/blob/main/docs/checks.md#branch-protection); [SLSA 1.1, Source track level 2](https://slsa.dev/spec/) | `.github/rulesets/protect-main.json`: no force push, no deletion, linear history |
| GIT-027 | Generated means generated again | — | `machine/scripts/telemetry.mjs --check` in the build guards; `machine/tools/generate-design-kit.mjs --check`, run by hand |
| GIT-028 | Measurements follow the commit | — | `machine/scripts/telemetry.mjs --check` in the build guards |
| GIT-029 | Conflicts in generated files are generated again | — | by hand: a resolved conflict looks like any other change |
| GIT-045 | The replacement is named in the header | — | the guard of this standard, which reads the `superseded_by` and `status` fields |
| GIT-046 | The address survives | [W3C, Cool URIs don't change](https://www.w3.org/Provider/Style/URI) | `machine/scripts/check-url-lifecycle.mjs`, which reports and does not fail the build |
| GIT-047 | A redirect leads to the replacement | [RFC 9110, section 15.4.2 301 Moved Permanently and section 15.4.9 308 Permanent Redirect](https://www.rfc-editor.org/rfc/rfc9110#section-15.4.2) | by hand: a redirect that resolves looks like any other |
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
