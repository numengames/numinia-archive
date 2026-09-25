---
id: "STD-006"
uid: ""
title: "Plain text is sovereign"
type: documentation
subtype: standard
status: draft
version: "2.0.5"
created: "2026-09-03T06:27:46Z"
updated: "2026-09-25T15:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Archive"
license: "CC0-1.0"
tags: [archive, substrate, format, sovereignty, self-hosting, GFM, YAML, NDSA]
supersedes: ["ADR-001"]
series_change: "2.0.5 — 2026-09-25: each rule says which outside standard it follows and what it buys — GitHub-Flavored Markdown as the real syntax in place of plain CommonMark, YAML for the header, the Library of Congress list of formats fit to keep, the digital-preservation levels for copies and fixity; no obligation added or dropped."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Plain text is sovereign

> **Summary:** The archive is plain text, one document per file, kept in a
> shared history that every copy holds whole. The file outlives every
> program that reads it, and the archive can run on its keeper's own
> machines.
> **Epistemic:** What the archive is made of, which outside standards say
> so, and what keeps it readable when its hosting, tools or suppliers vanish.
> **Pragmatic:** Decide in one reading whether a format, tool or outside
> service may enter the system.
> **Audience:** Agents · Oracles

**Binds:** every document of the archive; everything that stores, serves,
builds or reads it; every proposed outside service.
**Does not bind:** what any document says.

## Rules

No law requires these; they are our choice, so that the archive can be
read, checked and moved without any one supplier.

### What a document is made of

**Plain text, on its shelf.** Every document MUST be a plain-text file in
GitHub-Flavored Markdown, the common formatting language with tables that
most editors and forges render, on the shelf of its series; so it reads in
any text editor and renders the same everywhere.

**The header is plain text too.** The fields at the top of a document MUST
be well-formed YAML, the plain data format every language parses, and
correctly fenced; what describes a document lives there, never in a file
beside it.

**One document per file.** A file is the unit a document is named, cited
and deleted by. Two documents in one file MUST NOT occur.

### Where the truth lives

**Nothing lives only outside the archive.** No document's content MAY exist
only inside a program, a database, a server or another company's service.

**No binary file is the truth.** Images and other binary files MAY be
stored, preferably in formats the national library of the United States
lists as fit to keep; none MAY be the only authoritative copy of anything
the archive asserts.

**Every copy is the whole archive.** The archive MUST live in a shared,
distributed history in which one copy taken offline holds every document
and all its history; that gives the several copies in separate places, and
the fingerprint of every file, that the digital-preservation levels ask
for, so any copy proves it is intact.

**An outside service is a convenience, not a landlord.** An outside service
MAY be used only if removing it costs convenience and never availability,
nothing it holds is missing from the archive, and a service we run
ourselves could replace it without rewriting a document; whoever proposes
it answers those three before adoption.

This standard is over its word budget because each rule now says what its
outside standard does, as well as what it obliges.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it rests on, and what verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| TXT-001 | Plain text, on its shelf | [GitHub Flavored Markdown 0.29-gfm](https://github.github.com/gfm/), a superset of [CommonMark](https://spec.commonmark.org/) — ours adds: the shelf and the naming shape | `machine/guards/rules/std-006-plain-text.mjs` — naming shape; the syntax, by the site build |
| TXT-002 | The header is plain text too | [YAML 1.2.2](https://yaml.org/spec/1.2.2/) (also holds retired HDR-041) | `machine/guards/rules/std-006-plain-text.mjs` — fence and parse |
| TXT-003 | Nothing lives only outside the archive | — | `machine/guards/rules/std-006-plain-text.mjs` — partial: prose inside components only |
| TXT-004 | One document per file | — | by hand |
| TXT-005 | No binary file is the truth | [Library of Congress Recommended Formats Statement](https://www.loc.gov/preservation/resources/rfs/) | by hand |
| TXT-006 | Every copy is the whole archive | [NDSA Levels of Digital Preservation 2.0](https://ndsa.org/publications/levels-of-digital-preservation/) — storage copies and fixity; met by [Git](https://git-scm.com/) content hashes and clones | by hand — a fresh clone, no network, read |
| TXT-007 | An outside service is a convenience, not a landlord | — | by hand, before adoption |

## Why

File over app: whatever the archive asserts exists as a file, and every
program — this site, an editor, a future viewer — reads that file and never
owns it. When the program disappears the file is unharmed; when the file
exists only inside the program, it does not exist. The rules above are what
that costs. Sovereignty here is a capability, not a claim about today's
suppliers.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-009` | Which rule wins | whose claim wins when the file and a program disagree |
| `STD-004` | The header in three rings | the header fields this standard leaves to its own standard |
