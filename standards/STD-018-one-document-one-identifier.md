---
id: "STD-018"
uid: ""
title: "One document, one identifier"
type: documentation
subtype: standard
status: draft
version: "1.1.4"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, identifiers, naming, Dublin-Core, Cool-URIs, CURIE]
threshold: governed
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
> **Epistemic:** What an identifier is, what it may not carry, and which
> outside practice each rule follows.
> **Pragmatic:** Name a new document, or settle a clash of numbers, without
> asking anyone.
> **Audience:** Agents · Oracles

**Binds:** every registered document of the archive.

## Rules

No law requires any of these; they are our choice, taken from the practice
of libraries and the web, so that a citation made today still leads to the
same document in twenty years.

### An identifier is for life

**The identifier is permanent.** Every document MUST carry the identifier
of its series for life, as Dublin Core defines an identifier and the web's
guidance on lasting addresses asks; so every citation of it stays true.

**Numbers are never reused.** An identifier once used MUST NOT be used
again, even after its document is deleted, as the systems behind scholarly
identifiers forbid reassignment; so an old citation may lead nowhere, but
never to the wrong document.

### The name says nothing else

**No state in the file name.** A file name MUST NOT say what state its
document is in; the web's guidance on lasting addresses keeps status out of
names, because the state changes and the name must not.

**No version in the file name.** A file name MUST NOT carry a version, for
the same reason: a name that moved with each version would break every link
into the document, while the header holds the version.

### Choosing and citing a number

**The first commit keeps the number.** When two agents claim one
identifier, whoever committed first MUST keep it, and the second renumbers.

**The next number is read from the trunk.** The next free identifier MUST
be counted over what is committed on the trunk after taking in its latest
changes, never over one's own uncommitted work.

**Across repositories, name the repository.** An identifier cited from
another repository MUST carry that repository's short name and a colon in
front of it, the web's compact-identifier form; so any reader or tool
expands it to exactly one place. Within its own repository the bare
identifier is correct.

This standard is over its word budget because each rule now says what its
outside standard does, as well as what it obliges.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| IDN-011 | The identifier is permanent | [`dcterms:identifier`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/identifier/); [W3C, Cool URIs don't change](https://www.w3.org/Provider/Style/URI) — ours adds: the grammar `<PREFIX>-<NNN>` per series | `machine/guards/rules/std-018-one-identifier.mjs`: the identifier a file name carries, against its series' scheme |
| IDN-014 | Numbers are never reused | [DOI Handbook, numbering](https://www.doi.org/the-identifier/resources/handbook/2_numbering) — a DOI is never reassigned | `machine/guards/rules/std-018-one-identifier.mjs`: one identifier held by two documents |
| IDN-012 | No state in the file name | [W3C, Cool URIs don't change](https://www.w3.org/Provider/Style/URI) — leave status out | `machine/guards/rules/std-018-one-identifier.mjs` |
| IDN-013 | No version in the file name | [W3C, Cool URIs don't change](https://www.w3.org/Provider/Style/URI) — ours applies it to file names as well as addresses | `machine/guards/rules/std-018-one-identifier.mjs` |
| IDN-015 | The first commit keeps the number | — | by hand, by commit order at the moment of the clash |
| IDN-016 | The next number is read from the trunk | — | by hand: counted after `git pull`, never over the working tree |
| IDN-017 | Across repositories, name the repository | [W3C CURIE Syntax 1.0](https://www.w3.org/TR/curie/) — ours adds: the prefix is the repository's short name | by hand: written `nwos:ADR-006`, `web:ADR-006` |

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
