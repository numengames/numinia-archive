---
id: "STD-018"
uid: ""
title: "One document, one identifier"
type: documentation
subtype: standard
status: draft
version: "1.1.2"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, identifiers, naming]
threshold: governed
series_change: "1.1.2 — 2026-09-25: written in plain words a narrator can read aloud; codes, file names and commands leave the reading for the Check table. No obligation added or dropped."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# One document, one identifier

> **Summary:** Every document carries the identifier of its series, for
> life. A number once used is never used again; the file name says neither
> state nor version; when two agents claim one number, the first to commit
> keeps it.
> **Epistemic:** What an identifier is, and what it may not carry.
> **Pragmatic:** Name a new document, or settle a clash of numbers, without
> asking anyone.
> **Audience:** Agents · Oracles

**Binds:** every registered document of the archive.
**Does not bind:** the shape of each series' prefix, or the readable part
of a file name.

## Rules

### An identifier is for life

**The identifier is permanent.** Every document MUST carry the identifier
of its series, and that identifier MUST NOT change.

**Numbers are never reused.** An identifier once used MUST NOT be used
again, even after its document is deleted; a rule that leaves a standard
leaves a gap, never a renumbering.

### The name says nothing else

**No state in the file name.** A file name MUST NOT say what state its
document is in; the state lives in a field of the header.

**No version in the file name.** A file name MUST NOT carry a version; the
version lives in a field of the header.

### Choosing and citing a number

**The first commit keeps the number.** When two agents claim one
identifier, whoever committed first MUST keep it, and the second MUST
renumber.

**The next number is read from the trunk.** The next free identifier MUST
be counted over what is committed on the trunk after taking in its latest
changes, never over one's own uncommitted work.

**Across repositories, name the repository.** An identifier cited from
another repository MUST carry that repository's short name in front of it.
Within its own repository the bare identifier is correct.

## Check

Every rule above, with the code an agent cites it by, and what verifies it
today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| IDN-011 | The identifier is permanent | — | `machine/guards/rules/std-018-one-identifier.mjs`: the identifier a file name carries, against its series' scheme |
| IDN-014 | Numbers are never reused | — | `machine/guards/rules/std-018-one-identifier.mjs`: one identifier held by two documents |
| IDN-012 | No state in the file name | — | `machine/guards/rules/std-018-one-identifier.mjs` |
| IDN-013 | No version in the file name | — | `machine/guards/rules/std-018-one-identifier.mjs` |
| IDN-015 | The first commit keeps the number | — | by hand, by commit order at the moment of the clash |
| IDN-016 | The next number is read from the trunk | — | by hand: counted after `git pull`, never over the working tree |
| IDN-017 | Across repositories, name the repository | — | by hand: written `nwos:ADR-006`, `web:ADR-006` |

## Why

An identifier is an address. A citation, a redirect and a file's history
all depend on it not moving; a file name that also carried state or
version would change whenever the document did, and every address into it
would break. The gap a retired rule leaves is cheaper than a renumbering
that silently points every citation at the wrong rule.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-001` | The series | the series prefixes |
| `STD-004` | The header | where state and version live |
| `STD-006` | Plain text is sovereign | the readable part of a file name |
| `STD-020` | Git is the archive | what happens to the address when the document retires |
