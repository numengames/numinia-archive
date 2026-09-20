---
id: "ADR-043"
uid: ""
title: "One page per document"
type: adr
status: active
version: "2.0.0"
created: "2026-09-08T22:30:00+02:00"
updated: "2026-09-10T03:00:00+02:00"
author: "ursa"
owner: "oracle"
deciders: ["oracle"]
guild: "Alchemists"
territory: "Archive"
tags: [standards, form, readability, plates, budget, deletion]
amends: []
related: ["STD-007", "ADR-041", "STD-001"]
license: "CC-BY-4.0"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-043 — One page per document

> **Summary:** Every document takes one shape: a rule-shaped title, a
> three-part card, one line of scope, rules first and plated, then the
> check, then the reason. Size is SHOULD, form is MUST. Rules are cited by
> plate, never by section.
> **Epistemic:** The standards series went unread — 32,611 words in twelve
> files, reasons before rules, pointers instead of text — and every cut
> moved a target because rules were cited by position.
> **Pragmatic:** `STD-007` holds the shape as plates `DOC-001..011`;
> `check-document-shape.mjs` measures it and blocks on new form failures.
> **Audience:** Agents · Oracles

## 2. Decision

1. **Title states the rule, in at most five words.**
2. **The card is three short paragraphs** — Summary, Epistemic, Pragmatic —
   then one line of scope: *Binds* / *Does not bind*.
3. **Rules first, each plated.** Three letters and three digits, unique
   across the corpus, fixed for life, never reused. A plate names a rule,
   not a place. Missions keep four digits; no other exception.
4. **Cite plates, never sections.** Document identifiers appear only in a
   References table of at most five rows, each a normative dependency.
5. **Size is SHOULD; form is MUST.** A body over budget with one written
   sentence of reason is valid; a document without plates, or with reasons
   before rules, is not.
6. **The body budget is per series** and lives in the Series register.
   Registers are tables and exempt.
7. **Number is uniqueness, order is the index.** Renumbering the current
   series is deferred, not decided.
8. **Deletion by normative dependency.** A document is deleted when no
   living document depends on it normatively. Historical mentions in
   decisions and closed records are kept as written and do not block.

## 3. Consequences

- `STD-007` is the first file in the shape and binds every series.
- The 85 legacy plates (`CORE-NN`, `H-NN`, `PW-NN`, `A-NN`, `RK-NN`) were
  renamed in one pull request by a one-shot script, retired after the run;
  the equivalence table lives in git at `9645477`. Retired plates stay as
  written where history mentions them (rule 8).
- The guard blocks on form for new failures; the failures of the day it was
  wired are frozen in `machine/scripts/document-shape-baseline.json`, a list that
  shrinks and never grows. Size is reported, never blocked.

## 4. Alternatives

- **A word cap as MUST.** A rule violated on day one by every file it binds
  teaches people to ignore the guard.
- **Keep numbered sections, add a citation guard.** That guard existed and
  proved the point: it made the breakage visible without making the text
  readable.
- **Renumber now.** The same refactor twice, before citations moved to
  plates.
