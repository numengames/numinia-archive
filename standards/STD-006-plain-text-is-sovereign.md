---
id: "STD-006"
uid: ""
title: "Plain text is sovereign"
type: documentation
subtype: standard
status: draft
version: "2.1.2"
created: "2026-09-03T06:27:46Z"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Archive"
license: "CC0-1.0"
tags: [archive, substrate, format, sovereignty, self-hosting, GFM, YAML, NDSA]
supersedes: ["ADR-001"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Plain text is sovereign

> **Summary:** The archive is plain text, one document per file, in a shared
> history that every copy holds whole. The file outlives every program that
> reads it, and the archive can run on its keeper's own machines.
> **Epistemic:** What the archive is made of, which outside standards back
> it, and what keeps it readable when hosts, tools or suppliers vanish.
> **Pragmatic:** Decide in one reading whether a format, tool or outside
> service may enter the system.
> **Audience:** Agents · Oracles

**Binds:** every document; everything that stores, serves, builds or reads it; every proposed outside service.

## Rules

These rules let anyone read, check and move the archive without depending
on one supplier.

### What a document is made of

**Plain text, on its shelf.** Every document MUST be a plain-text file in
GitHub-Flavored Markdown, on the shelf of its series. That is the common
formatting language, tables included, that most editors and forges render.
The file reads in any text editor and looks the same everywhere.

**The header is plain text too.** The fields at the top of a document MUST
be well-formed, correctly fenced YAML, the plain data format every language
parses. Whatever describes a document lives there, never in a file beside
it.

**One document per file.** A document is named, cited and deleted by its
file. Two documents in one file MUST NOT occur.

**Link, never copy.** A document MUST NOT be copied into another. A copy
made for use elsewhere names its original.

### Where the truth lives

**Nothing lives only outside the archive.** No document's content MAY exist
only inside a program, a database, a server or another company's service.

**No binary file is the truth.** Images and other binary files MAY be
stored, preferably in formats the Library of Congress lists as fit to keep.
None MAY be the only authoritative copy of anything the archive asserts.

**Every copy is the whole archive.** The archive MUST live in a shared,
distributed history, so one copy taken offline holds every document and all
its history. That gives the separate copies and the file fingerprints the
digital-preservation levels ask for, and lets any copy prove it is intact.

**An outside service is a convenience, not a landlord.** An outside service
MAY be used only if three things hold. Removing it costs convenience, never
availability. Nothing it holds is missing from the archive. A service we run
ourselves could replace it without rewriting a document. Whoever proposes
the service answers all three before adoption.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| TXT-001 | Plain text, on its shelf | [GitHub Flavored Markdown 0.29-gfm](https://github.github.com/gfm/), a superset of [CommonMark](https://spec.commonmark.org/), plus the shelf and the naming shape | `machine/guards/rules/std-006-plain-text.mjs` — naming shape; the syntax, by the site build |
| TXT-002 | The header is plain text too | [YAML 1.2.2](https://yaml.org/spec/1.2.2/) (also holds retired HDR-041) | `machine/guards/rules/std-006-plain-text.mjs` — fence and parse |
| TXT-003 | Nothing lives only outside the archive | — | `machine/guards/rules/std-006-plain-text.mjs` — partial: prose inside components only |
| TXT-004 | One document per file | — | by hand |
| TXT-008 | Link, never copy | —; holds retired GIT-049 | by hand: a scan comparing file contents would catch it, and does not exist |
| TXT-005 | No binary file is the truth | [Library of Congress Recommended Formats Statement](https://www.loc.gov/preservation/resources/rfs/) | by hand |
| TXT-006 | Every copy is the whole archive | [NDSA Levels of Digital Preservation 2.0](https://ndsa.org/publications/levels-of-digital-preservation/) — storage copies and fixity; met by [Git](https://git-scm.com/) content hashes and clones | by hand — a fresh clone, no network, read |
| TXT-007 | An outside service is a convenience, not a landlord | — | by hand, before adoption |

## Why

File over app. Whatever the archive asserts exists as a file, and every
program that reads it, from this site to a future viewer, never owns it.
When the program disappears, the file is unharmed. When the file exists
only inside the program, it does not exist. The rules above are the price.
Sovereignty here is a capability, not a claim about today's suppliers.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-009` | Which rule wins | whose claim wins when the file and a program disagree |
| `STD-004` | The header | the header fields this standard leaves to its own standard |
