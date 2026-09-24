---
id: "STD-009"
uid: ""
title: "Which rule wins"
type: documentation
subtype: standard
status: draft
version: "1.1.2"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-11T11:30:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, governance, precedence, rules]
threshold: governed
absorbs: ["STD-002"]
series_change: "1.1.2 — 2026-09-11: PRE-006 Check row names the R2 contract instead of the folded check-core-rules.mjs. Patch: prose only. 1.0.0 — STD-009 stops being the whole normative layer and keeps precedence only: 2,887 -> 300 words of body. Its other sections are STD-017 (authority), STD-018 (identity), STD-019 (versions), STD-020 (git and archiving), STD-021 (evidence and citation), STD-022 (secrets); HDR-040/041/043 go to STD-004; LIC-058..060 are retired as duplicates of LIC-007, HDR-008 and PUB-001. Every plate keeps its number. Major: fourteen sections no longer exist."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Which rule wins

> **Summary:** Everything in the corpus is a claim; these rules decide whose
> claim wins. History over document, document over code, the costlier
> document over the cheaper, the later ruling over the earlier — and nothing
> is authoritative for saying so.
> **Epistemic:** The order of precedence between git, documents and code, and
> why it is cost of change, not importance.
> **Pragmatic:** Settle a conflict between two sources without asking anyone.
> **Audience:** Agents · Oracles

**Binds:** every registered document of the corpus, and every reader of one.
**Does not bind:** apparatus, and the files that address a reader outside the
corpus (`README`, `CHANGELOG`, agent instructions), which follow their
platform.

## Rules

**PRE-001 — History outranks the document.** When a document and git history
disagree, the history is the record and the document is the claim.

**PRE-002 — Documents outrank code.** Code that does what no document says is
corrected. A document that describes what code does, and describes it wrong,
is a broken description and is fixed. The test is direction.

**PRE-003 — The costlier document wins.** Between two documents, the one that
costs more agreement to change: `governed`, then `closed`, `open`
(`STD-001`). Between two governed documents the canon outranks the axis, and
the axis outranks the rest.

**PRE-004 — The later ruling wins.** At equal cost the later ruling prevails,
and a later ruling names what it overrides.

**PRE-005 — Authority is not self-declared.** No document holds authority
over another except by PRE-001..004; a claim of precedence inside a document
is void unless it rests on one of them.

**PRE-006 — A draft binds nobody.** A document in `draft` states an intention.
It is published to be read and argued with; nothing in it is quoted against
anyone until its state says otherwise — this standard included.

## Check

| Plate | Verified by |
|---|---|
| PRE-001..005 | `[MANUAL]` — recognising that two sources conflict, and which is the claim, is a judgement no parser makes |
| PRE-006 | every guard on the R2 contract (`machine/guards/lib/guard.mjs`) reads each standard's `status` and reports without failing while it is `draft`; every guard MUST behave so under `ENG-067` (`STD-005`) |

## Why

A hierarchy by importance invites argument about what is important. A
hierarchy by cost of change is already recorded: it is how much agreement
each series demands before it may be edited, and a reader can verify it
without asking. Canon outranks a standard because changing it costs an
Oracle's signature, not because it matters more. History wins because who
wrote a commit, and when, cannot be changed at any price worth paying.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-001` | Vocabulary | the four thresholds PRE-003 orders |
| `STD-017` | Who may change what | who moves each threshold |
| `CAN-004` | Ranks | who holds which rank |
