---
id: "STD-018"
uid: ""
title: "One document, one identifier"
type: documentation
subtype: standard
status: draft
version: "1.1.1"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-11T04:30:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, identifiers, naming]
threshold: governed
series_change: "1.1.1 — Check rows repoint to machine/guards/rules/std-018-one-identifier.mjs (R3, MIS guards-tests-ci-alpha): lint-naming N-04 and the IDN rules of check-core-rules fold into one guard; no plate or verdict changes. 1.0.0 — new standard, split from STD-009 under ADR-043. Rules keep their plates and their verifiers; the prose around them is the Why."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# One document, one identifier

> **Summary:** Every document carries the identifier of its series, for life.
> A number once used is never reused; the filename carries neither state nor
> version; when two agents claim one number, the first commit keeps it.
> **Epistemic:** What an identifier is and is not allowed to encode.
> **Pragmatic:** Name a new document, or resolve a collision, without a
> decision.
> **Audience:** Agents · Oracles

**Binds:** every registered document of the corpus.
**Does not bind:** the grammar of each series prefix — `STD-001`; the slug —
STD-006 (TXT-001) holds it.

## Rules

**IDN-011 — The identifier is permanent.** Every document carries the
identifier of its series, and that identifier never changes.

**IDN-012 — No state in the filename.** State lives in a declared field.

**IDN-013 — No version in the filename.** The version lives in a declared
field.

**IDN-014 — Numbers are never reused.** An identifier once used is not used
again, not even after the document is deleted; a rule that leaves a standard
leaves a gap, never a renumbering.

**IDN-015 — First commit keeps the number.** When two agents claim one
identifier, whoever committed first keeps it and the second renumbers.

**IDN-016 — The next number is read from the trunk.** The next free
identifier is computed over what is committed after `git pull`, never over
the working tree.

**IDN-017 — Across repositories, qualify.** An identifier cited across a
repository boundary carries the repository: `nwos:ADR-006`, `web:ADR-006`.
Within a repository the bare identifier is correct.

## Check

| Plate | Verified by |
|---|---|
| IDN-011 | `machine/guards/rules/std-018-one-identifier.mjs` — the identifier the name carries, against the series scheme |
| IDN-012, 013, 014 | `machine/guards/rules/std-018-one-identifier.mjs` |
| IDN-015 | `[MANUAL]` — resolved by commit order at the moment of collision |

## Why

An identifier is an address. A citation, a redirect and a `git log --follow`
all depend on it not moving; a filename that also carried state or version
would change every time the document did, and every address into it would
break. The gap a retired rule leaves is cheaper than the renumbering that
would silently re-point every citation to the wrong rule.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-001` | Vocabulary | the series prefixes |
| `STD-004` | The header | where state and version live |
| `STD-020` | Git is the archive | what happens to the address when the document retires |
