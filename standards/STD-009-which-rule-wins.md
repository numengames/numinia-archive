---
id: "STD-009"
uid: ""
title: "Which rule wins"
type: documentation
subtype: standard
status: draft
version: "1.1.7"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, governance, precedence, rules]
threshold: governed
absorbs: ["STD-002"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Which rule wins

> **Summary:** When two sources disagree, these rules decide which wins.
> History beats a document, a document beats code, the costlier document
> beats the cheaper, and the later ruling beats the earlier. Nothing gains
> authority by claiming it.
> **Epistemic:** Which rule wins?
> **Pragmatic:** Settle a conflict between two sources without asking anyone.
> **Audience:** Agents · Oracles

**Binds:** every registered document of the archive, and everyone who reads
one.

## Rules

An archive read by agents needs the same answer to every conflict, every
time. No outside standard ranks history, documents and code, so these rules
do.

### History, documents and code

**History outranks the document.** When a document and the recorded history
of changes disagree, the history MUST be taken as the record, and the
document as the claim.

**Documents outrank code.** Code that does what no document says MUST be
corrected. A document that describes the code, and describes it wrongly, is
fixed instead. The test is direction: a document that prescribes outranks
the code, and a document that describes follows it.

### Between two documents

**The costlier document wins.** Between two documents, the one that needs
more agreement to change MUST prevail. First come those only an Oracle may
change, then those closed once finished, then those open to anyone. Among
the first, the canon comes before standards and protocols, and they come
before the rest.

**The later ruling wins.** At equal cost the later ruling MUST prevail, and
it names what it overrides.

**Authority is not self-declared.** No document holds authority over
another except by the four rules above. A claim of precedence inside a
document MUST be treated as void unless it rests on one of them.

### When a rule starts to bind

**A draft binds nobody.** The internet's standards body publishes its
drafts to be read and argued with, and forbids anyone to claim compliance
with one. We hold our drafts the same way. Nothing in a draft MAY be held
against anyone until its state says otherwise, this standard included.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| PRE-001 | History outranks the document | — (the history is kept in [Git](https://git-scm.com/)) | by hand — recognising that two sources conflict is a judgement no parser makes |
| PRE-002 | Documents outrank code | — | by hand |
| PRE-003 | The costlier document wins | —; the thresholds `governed` · `closed` · `open` in `STD-001` | by hand |
| PRE-004 | The later ruling wins | — | by hand |
| PRE-005 | Authority is not self-declared | — | by hand |
| PRE-006 | A draft binds nobody | [RFC 2026, Internet-Drafts, section 2.2](https://www.rfc-editor.org/rfc/rfc2026#section-2.2): drafts are work in progress, and no one may claim compliance with one | every guard on the shared contract (`machine/guards/lib/guard.mjs`) reads each standard's `status` and reports without failing while it is `draft`, as `ENG-067` in `STD-005` requires |

## Why

A hierarchy by importance invites argument about what is important. A
hierarchy by cost of change is already on record: each shelf states how
much agreement an edit demands, and a reader can check it without asking.
The canon outranks a standard because changing it costs an Oracle's
signature, not because it matters more. History wins because no price worth
paying can change who changed what, and when.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-001` | The series | the thresholds the costlier-document rule orders |
| `STD-017` | Who may change what | who moves each threshold |
| `STD-005` | When a rule bites | how a guard bites by the state of its rule |
| `CAN-004` | You are what you are doing | who holds which rank |
