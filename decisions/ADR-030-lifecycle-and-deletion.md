---
id: "ADR-030"
uid:
title: "The four tests before deletion"
type: adr
status: active
version: "4.0.0"
created: "2026-08-30T16:00:00+02:00"
updated: "2026-09-10T03:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [lifecycle, deletion, debt, urls, governance]
absorbs: ["ADR-032", "ADR-033"]
amends: []
superseded_by: null
license: "CC-BY-4.0"
related: ["ADR-041", "ADR-042", "STD-012", "STD-001"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# ADR-030 — The four tests before deletion

> **Summary:** A document may be deleted when four tests pass: no living
> citer, no address dies unredirected, a written resolution, the folder's
> threshold. A debt entry closes into one line of the weekly report and is
> deleted the same way.
> **Epistemic:** Deletion is decided by consumers, not by folder: the
> directory does not know whether a file is the only record of something;
> the citers do.
> **Pragmatic:** Run the two guards, write the line, check the threshold.
> Passing 1–4, deletion needs no decision record of its own.
> **Audience:** Agents · Oracles

## 2. Decision

**The four tests.**

1. **No living citer.** No living document depends on it normatively
   (`ADR-043` rule 8). Text-only mentions count; `check-references.mjs`.
2. **No public address dies unredirected.** `check-url-lifecycle.mjs`
   against `machine/scripts/url-baseline.json`.
3. **A written resolution exists.** The one test no machine performs. A
   period roll-up report (`STD-012`) that carries the record's line is a
   written resolution (`ADR-042`).
4. **The folder's threshold is met.** For `governed` folders: a decision
   record or a pull request the Oracle approves.

**Debt closes into a line.** A `DBT-` entry closes when its condition is
met; its line goes into the weekly report and the file is deleted under the
tests above (`DEF-004`). What was once wrong survives as the line; git
holds the body.

**Absorption is permitted where reachability is preserved**: the absorbed
reasoning survives in the absorbing record, every citation is rewritten in
the same change, every public address redirects to it. A reader following
the old identifier lands on the text that now contains it — never on a stub
or a 404.

## 3. Why

The folder was never the right unit. `debt/` holds entries safe to delete
and entries that are the only record of a defect; `decisions/` holds live
rules and superseded ones. The consumer knows; the directory does not.
