---
id: "STD-007"
uid: ""
title: "One page per document"
type: documentation
subtype: standard
status: draft
version: "1.1.3"
created: "2026-09-03T10:30:00Z"
updated: "2026-09-11T12:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Content"
license: "CC0-1.0"
tags: [standards, writing, form, plates, budget]
ratified_by: "ADR-043"
supersedes_version: "0.3.0"
series_change: "1.1.3 — 2026-09-11: Check rows name the folder a script lives in (machine/scripts/, machine/tools/, machine/guards/rules/); a bare filename does not say where to run it, and three of them had moved. Patch: prose only. 1.1.2 — Check rows repoint to machine/guards/rules/std-007-one-page.mjs (R3, MIS guards-tests-ci-alpha): check-document-shape and check-plain-writing fold into one guard per standard; no plate, threshold or verdict changes. 1.1.1 and before — Was 'Standards read as prose, not as pointers' and bound standards only. Now binds every series with one shape: rule-shaped title, three-part card, plated rules before reasons, a body budget per series. First document written in the shape it prescribes."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# One page per document

> **Summary:** A rule-shaped title, a three-part card, a one-line scope.
> Rules first, each with a plate; then the check, then the reason. The
> body fits its series' budget. Size limits are SHOULD; form is MUST.
>
> **Epistemic:** Why the previous standards went unread — apparatus before
> content, reasons before rules, pointers instead of text — and the shape
> that reverses each of the three.
>
> **Pragmatic:** The template to copy, the budgets to aim at, and what the
> shape guard reports on every pull request.

**Binds:** every document in every series; the body budget per series is in the decision below.
**Does not bind:** templates, generated files, `README.md`, `INDEX.md`.

---

## Rules

**DOC-001 — The title states the rule.** At most five words, naming what
is required, not the topic. *One document, one identifier* — not *Naming*.

**DOC-002 — The card is three short paragraphs.** Summary (what is
required), Epistemic (what the reader will understand), Pragmatic (what
the reader can then do). Each SHOULD be two to three lines, at most 40
words.

**DOC-003 — Scope is one line each way.** *Binds:* and *Does not bind:*,
each SHOULD be at most 15 words, naming series, folders or kinds — never
"the repository".

**DOC-004 — Rules first, plated.** Every rule MUST carry a plate — three
letters, three digits, unique across the corpus, never reused — and one
RFC 2119 verb, and SHOULD fit in 35 words. Rules precede reasons.

**DOC-005 — Why is short.** The *Why* section SHOULD hold at most 80
words. Longer reasoning is a decision record.

**DOC-006 — Body budget.** The body — after the scope line, before
References — SHOULD fit the budget its series is assigned: 500 words for
standards, protocols, decisions and missions; 300 for debt and guilds;
1,000 for reports and blueprints; 1,500 for canon. Exceeding it requires
one written sentence saying why, in the document.

**DOC-007 — Few, necessary references.** The References table MUST list
only documents this one depends on to oblige, and SHOULD have at most
five rows.

**DOC-008 — Cite plates, not places.** Another document's rule is cited by
plate and plain name. Section numbers MUST NOT appear in a citation;
document identifiers appear only in References.

**DOC-009 — Registers are tables.** A `subtype: register` file is exempt
from DOC-002 and DOC-006; it MUST hold a Summary, a table, and at most one
sentence of prose.

**DOC-010 — No history inside.** No changelog, amendment section or "what
changed" text. Git is the history.

**DOC-011 — Written in English.** New and rewritten documents are written
in English. A document that departs from the default declares `lang:`; a
Spanish document is not invalid, it is mid-migration.

## Check

| Rule | Verified by |
|---|---|
| DOC-001, DOC-005..007 | `machine/guards/rules/std-007-one-page.mjs` — budgets are SHOULD: counted, reported, never handed to the regime |
| DOC-002..004 | `machine/guards/rules/std-007-one-page.mjs` — a NEW missing card, scope line or plate binds by this standard's state (ENG-067) |
| DOC-008 | `machine/guards/rules/std-007-one-page.mjs` (bare IDs, section pointers, in standards/ only) |
| DOC-009, DOC-010 | `machine/scripts/check-templates.mjs` |

## Why

Size is SHOULD and form is MUST: a document over budget with a written
reason is still valid; one without plates, or with reasons first, is not.
An adult reads non-fiction at about 240 words a minute and skims most of a
page; a narrator reads 150. Five hundred words is three minutes aloud, one
printed page, about 700 tokens — small enough that an agent loads a whole
series instead of searching it.

## References

| ID | Name | Why cited |
|---|---|---|
| `ADR-043` | One page per document | the decision; the budget per series until a Series register exists |
| `STD-004` | The header standard | the card and the fields above the body |
