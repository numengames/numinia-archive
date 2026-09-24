---
id: "STD-006"
uid: ""
title: "Plain text is sovereign"
type: documentation
subtype: standard
status: draft
version: "2.0.3"
created: "2026-09-03T06:27:46Z"
updated: "2026-09-11T03:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Archive"
license: "CC0-1.0"
tags: [archive, substrate, format, sovereignty, self-hosting]
supersedes: ["ADR-001"]
series_change: "2.0.3 — Check rows repoint to machine/guards/rules/std-006-plain-text.mjs (R3, MIS guards-tests-ci-alpha): frontmatter-delimiter, frontmatter-yaml, prose-in-code and the shape half of lint-naming fold into one guard per standard; no plate, threshold or verdict changes. 2.0.2 — 2026-09-10: status `active` → `draft` under the alpha reset the Oracle ordered on 2026-09-10: the state had been set by agents, not signed one by one. Text unchanged; the state returns to `draft` until the tree meets the standard and the Oracle ratifies it one by one. Patch move (VER-064). 2.0.0 — the standard takes the ADR-043 shape: 1,433 -> 340 words of body. The seven rules of the old conformance table are kept as TXT-001..007, with the same checks; the substrate, format and sovereignty sections and File Over App collapse into them. Major, not minor, because the section numbers other documents could cite (§2.1-2.3) no longer exist."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Plain text is sovereign

> **Summary:** The corpus is plain-text Markdown in a distributed git
> repository, one document per file. The file outlives every application that
> reads it, and the system can run on its operator's own infrastructure.
> **Epistemic:** What the archive is made of, and the constraint that keeps it
> readable when its hosting, tooling or vendors disappear.
> **Pragmatic:** Decide in one reading whether a format, tool or dependency may
> enter the system.
> **Audience:** Agents · Oracles

**Binds:** every corpus document; every component that stores, serves, builds
or reads it; every proposed dependency.
**Does not bind:** the content of any document.

## Rules

**TXT-001 — Markdown, under a series folder.** Every corpus document MUST be a
`.md` file under a series folder, readable in any text editor with no tooling.

**TXT-002 — Plain-text header.** Frontmatter MUST be well-formed YAML between
correct delimiters. Structured metadata lives there, not in a sidecar.

**TXT-003 — Nothing lives only outside the tree.** No document's content MAY
exist only in a component, a database, a server or behind an API.

**TXT-004 — One document per file.** A file is the unit of identity, citation
and deletion. Two documents in one file MUST NOT occur.

**TXT-005 — No binary source of truth.** Binary artefacts MAY be stored;
none MAY be the authoritative copy of anything the corpus asserts.

**TXT-006 — Every clone is the whole archive.** The corpus MUST live in a
distributed version-control repository, and a single offline clone MUST hold
every document and its history. Losing the hosting costs hosting, not the
corpus.

**TXT-007 — A dependency, not a landlord.** A third-party service MAY be used
only if removing it degrades convenience, never availability; nothing it holds
is unavailable in the repository; and a self-operated equivalent could replace
it without rewriting the corpus. The three answers MUST be written in the
document that proposes the dependency, before adoption.

## Check

| Plate | Verified by |
|---|---|
| TXT-001 | `machine/guards/rules/std-006-plain-text.mjs` — root UPPERCASE, no version/date in a living name, kebab-case slug |
| TXT-002 | `machine/guards/rules/std-006-plain-text.mjs` — the fence closes on its own line; the header is structurally sound YAML |
| TXT-003 | `machine/guards/rules/std-006-plain-text.mjs` — partial: prose in components only |
| TXT-004, TXT-005 | `[MANUAL]` — whether a half could be cited alone, or an image is the record, is a judgement about meaning |
| TXT-006 | `[MANUAL]` — fresh clone, no network, read; if anything must be fetched, failed |
| TXT-007 | `[MANUAL]` — a gate before adoption, not an audit after |

## Why

*File Over App*: an artefact the system asserts exists as a file, and every
application — this site, an editor, a future viewer — reads that file and
never owns it. When the application disappears the file is unharmed; when
the file exists only inside the application, it does not exist. The rules
above are what that costs. Sovereignty here is a capability, not a claim
about today's vendors.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-009` | Core rules | authority: who emits, versions and signs |
| `STD-004` | The header in three rings | the header this standard leaves to its own standard |
