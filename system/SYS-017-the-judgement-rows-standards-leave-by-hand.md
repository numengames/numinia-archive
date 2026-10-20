---
id: "SYS-017"
uid: ""
title: "The judgement rows standards leave by hand, as read by reviewers"
type: documentation
subtype: reference
status: active
version: "0.1.0"
created: "2026-10-20T04:26:33Z"
updated: "2026-10-20T04:26:33Z"
author: "ursa"
owner: "oracle"
section: "Knowledge and quality"
tags: [system, reference, review, engineering, standards]
license: "CC0-1.0"
related: ["STD-015", "STD-012", "STD-019", "STD-021", "STD-024", "STD-027"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SYS-017 — The judgement rows standards leave by hand

> **Summary:** Ten rows across five standards carry no check a machine can
> run — their "Verified by" column says "by hand". This names each one,
> what it asks and where it lives, so a reviewer reads the source instead
> of the rule's name from memory. Linked from
> `.github/PULL_REQUEST_TEMPLATE.md`'s "For reviewers: read for".
> **Epistemic:** For a pull request touching one of these rule IDs, what
> must a reviewer read, and in which document?
> **Pragmatic:** Look up the rule ID, open the file and section named, and
> judge the diff against the quoted sentence — not against this table alone.
> **Audience:** Agents · People responsible

---

## 1. Scope

The ten rows of `machine/scripts/hand-checked-rows.json` that are pure
judgement — no script resolves them — drawn from five standards: `STD-012`
(corpus does not grow), `STD-019` (versions), `STD-021` (evidence and
citation), `STD-024` (a series is a function) and `STD-027` (the
classification scheme). It does not cover every hand-checked row in that
ledger, only these ten; nor does it cover `STD-015` itself, which is a
register, not a source, of any of them.

Retiring these rows out of their standards — the second half of this work —
is out of scope here; today they still live in the files named below.

---

## 2. How it works

| Rule ID | What to judge | Where |
|---|---|---|
| VER-022 | Offering more without breaking is a **minor** bump; a reword with nothing new is a **patch** | `standards/STD-019-versions.md`, § Check |
| VER-023 | Breaking conformance — work that obeyed yesterday no longer obeys — is a **major** bump | `standards/STD-019-versions.md`, § Check |
| SER-001 | Only `principles/`, `standards/` and `procedures/` oblige anyone; nothing else in the diff may be read as binding | `standards/STD-024-a-series-is-a-function.md`, § Check |
| SER-002 | A requirement is either *complied with* or *carried out* — the diff's wording must pick the one that actually applies | `standards/STD-024-a-series-is-a-function.md`, § Check |
| SER-008 | A new or changed requirement must be answerable yes or no, objectively — not a matter of taste | `standards/STD-024-a-series-is-a-function.md`, § Check |
| CLS-003 | A document's classification (which series it is filed under) and its approval level (what changing it costs) are two different questions — the diff must not answer one with the other | `standards/STD-027-the-classification-scheme.md`, § Check |
| CIT-055 | Any quotation in the diff carries the name of the person who said it, in their own voice, never borrowed | `standards/STD-021-evidence-and-citation.md`, § Check |
| EVI-057 | Any sampling or audit claim in the diff states its denominator in prose — "how many out of how many" | `standards/STD-021-evidence-and-citation.md`, § Check |
| DEF-006 | A "phase" referenced in the diff is used as an index into a sequence, never as a level of importance or severity | `standards/STD-012-corpus-does-not-grow.md`, § Check |
| CIT-051 | **Retired** (`machine/scripts/retired-plates.json`): merged into `DOC-007` of `STD-007`, which gathers references automatically. A diff citing `CIT-051` should cite `DOC-007` instead; a diff that is really about naming a quote's author by hand is `CIT-052` (also hand-checked, same file, § Check), not `CIT-051` |

Read the row's exact sentence in the standard before judging: this table
points to the source, it does not replace it, and the standard may have
moved since this document was written.

A reviewer unsure how a row applies to a given diff escalates through
`PRO-005` rather than guessing; the Oracle's ruling binds the next reviewer
who meets the same row.

---

## 3. How to verify it

```
$ grep -n "by hand" standards/STD-012-corpus-does-not-grow.md standards/STD-019-versions.md \
    standards/STD-021-evidence-and-citation.md standards/STD-024-a-series-is-a-function.md \
    standards/STD-027-the-classification-scheme.md
```
Each of the nine live rule IDs above appears in the `by hand` output of its
named file; `CIT-051` does not, because it is retired.

```
$ node machine/scripts/run-checks.mjs
```
`std-012-corpus-does-not-grow`, `std-019-versions`, `std-021-evidence-and-citation`,
`std-024-a-series-is-a-function` and `std-027-the-classification-scheme` all
pass — none of them claim to check these ten rows; that absence is the point.

---

## 4. Accuracy

Current as of `2026-10-20`, against the standards listed above at this
commit. If a row is renumbered, retired, or gains a machine check, this
document goes stale until edited to match — nothing here is generated.

**Verified against:** the working tree, on 2026-10-20.
