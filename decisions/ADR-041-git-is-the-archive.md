---
id: "ADR-041"
uid: ""
title: "Git is the archive"
type: adr
status: active
version: "1.1.1"
created: "2026-09-08T17:30:00Z"
updated: "2026-10-03T19:40:00+02:00"
author: "ursa"
owner: "oracle"
deciders: ["oracle"]
guild: "Alchemists"
section: "Knowledge and quality"
tags: [lifecycle, deletion, retention, entropy, alpha-reset, history]
amends: []
related: ["ADR-030", "STD-020", "STD-021", "STD-012"]
license: "CC-BY-4.0"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# ADR-041 — Git is the archive

> **Summary:** Every retention rule that kept text alive after it stopped
> deciding anything is withdrawn. A retired document is deleted under
> `ADR-030`; git is the only history; no series is append-only; no document
> keeps a log of its own amendments.
> **Epistemic:** The corpus was inflationary by construction — every cut was
> a move into `history/`, an amendment note or a record, and no move reduces.
> **Pragmatic:** Delete. Cite the commit, not a copy.
> **Audience:** Agents · Oracles

## 2. Decision

**A retired document is deleted.** The exit is the same for every series:
the four tests of `ADR-030`. Passing them, a deletion needs no decision
record.

**Git is the only history.** `history/` is removed. No folder, series or
document is append-only. A superseded record stays only while a living
document depends on it; then it goes (`GIT-`, `STD-020`).

**Correction happens in place.** A published report or a closed mission is
corrected where it stands, with a dated note and a version bump — not by a
successor document. Dated evidence under `reports/evidence/` describes a
moment and is not edited.

**A standard carries no log of itself.** `PRE-004` is satisfied by the
commit message and, on a major, by the decision record. Amendment sections
inside a normative document are not written.

**A broken reference inside a closed record is a photograph** (`CIT-053`).
Closed documents are not walked as citers; they stay indexed so a living
citation of them resolves.

## 3. Why

The refoundation measured its own effect three times and it was positive
each time: five rules in six documents forbade the only operation that
reduces. `history/` held seven files, every one also in `git log`.
Recovering a deleted text is `git log --follow -- <path>`: one command, and
it does not age.

## 4. Alternatives

- **Keep `history/` with a deletion exit.** A second archive next to git is
  a copy, and copies are forbidden.
- **Supersede, never delete.** Rejected by measurement: growth in every
  batch.
