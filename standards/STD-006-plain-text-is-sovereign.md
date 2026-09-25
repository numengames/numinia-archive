---
id: "STD-006"
uid: ""
title: "Plain text is sovereign"
type: documentation
subtype: standard
status: draft
version: "2.0.4"
created: "2026-09-03T06:27:46Z"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Archive"
license: "CC0-1.0"
tags: [archive, substrate, format, sovereignty, self-hosting]
supersedes: ["ADR-001"]
series_change: "2.0.4 — 2026-09-25: written in plain words for a narrator; codes, file names and checks wait in the Check table; no obligation added or dropped."
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
> **Epistemic:** What the archive is made of, and what keeps it readable when
> its hosting, tools or suppliers disappear.
> **Pragmatic:** Decide in one reading whether a format, tool or outside
> service may enter the system.
> **Audience:** Agents · Oracles

**Binds:** every document of the archive; everything that stores, serves,
builds or reads it; every proposed outside service.
**Does not bind:** what any document says.

## Rules

### What a document is made of

**Plain text, on its shelf.** Every document MUST be a plain-text file in
the simple formatting language the archive uses, on the shelf of its
series, readable in any text editor with no tools.

**The header is plain text too.** The fields at the top of a document MUST
be well-formed and correctly fenced. What describes a document lives there,
never in a file beside it.

**One document per file.** A file is the unit a document is named, cited
and deleted by. Two documents in one file MUST NOT occur.

### Where the truth lives

**Nothing lives only outside the archive.** No document's content MAY exist
only inside a program, a database, a server or another company's service.

**No binary file is the truth.** Images and other binary files MAY be
stored; none MAY be the only authoritative copy of anything the archive
asserts.

**Every copy is the whole archive.** The archive MUST live in a shared,
distributed history, and one copy taken offline MUST hold every document
and all its history. Losing the hosting costs the hosting, not the archive.

**An outside service is a convenience, not a landlord.** An outside service
MAY be used only if removing it costs convenience and never availability,
nothing it holds is missing from the archive, and a service we run
ourselves could replace it without rewriting a document. Whoever proposes
it MUST answer those three before adoption.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it rests on, and what verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| TXT-001 | Plain text, on its shelf | [CommonMark](https://commonmark.org/) | `machine/guards/rules/std-006-plain-text.mjs` — naming shape |
| TXT-002 | The header is plain text too | [YAML 1.2](https://yaml.org/spec/1.2.2/) | `machine/guards/rules/std-006-plain-text.mjs` — fence and parse |
| TXT-003 | Nothing lives only outside the archive | — | `machine/guards/rules/std-006-plain-text.mjs` — partial: prose inside components only |
| TXT-004 | One document per file | — | by hand |
| TXT-005 | No binary file is the truth | — | by hand |
| TXT-006 | Every copy is the whole archive | [Git](https://git-scm.com/) | by hand — a fresh clone, no network, read |
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
