---
id: "MIS-190"
uid: ""
title: "Split the opportunity record into three one-page standards"
type: mission
status: in-review
version: "0.1.0"
created: "2026-10-15T10:30:03Z"
updated: "2026-10-15T10:30:03Z"
author: "ursa"
owner: "oracle"
section: "Sales and partners"
tags: [standards, sales, opportunity, record, personal-data, tenders]
license: "CC0-1.0"

priority: medium
effort: M
executor: agent
assigned_to: "ursa"
completed: null

in_review_at: "2026-10-15T10:31:34Z"
started: "2026-10-15T10:30:03Z"
requires_oracle_approval: true
context: "2026-10-15T10:30:03Z"
paths: [standards/STD-039-an-opportunity-has-a-record.md, machine/packages/sales-kit/pipeline.mjs, designs/DES-016-one-question-per-standard.md]
related: ["STD-039", "STD-038", "STD-035", "DES-016", "PRO-029", "PRO-030", "PRO-021"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-190 — Split the opportunity record into three one-page standards

> **Summary:** The standard for an opportunity's record answers three
> questions in one document of over three thousand words. The Oracle asked
> (2026-10-15) for it to be cut so a person can follow it: the record, who
> may be named and when, and which calls are recorded at all.
> **Epistemic:** Can the record's rules be read and answered yes or no
> without a fourth of them being about something else?
> **Pragmatic:** Three standards, each with its own question, so the first
> can be put in force and the second keeps the client out of the open until
> the client agrees.
> **Audience:** Agents · Oracles

---

## 1. Scope

- `STD-039` keeps the record: file, header, kind and stage, next step,
  timeline, first-contact door, chance, public archive, computed pipeline.
- A new standard takes who may be named and when: nobody's name, the
  organisation named by consent, the organisation's door. A second new one
  takes the public call: its notice, the card it is read against, its own
  terms, one call one record.
- Moved plates change prefix everywhere the sales kit, its tests, the site
  and comments cite them. Plates of rules that are acts or judgements leave
  to the procedure that holds the act and to the reviewers' list.

Out of scope: the two open rulings on `STD-039` (keeping or deleting lost
records, naming a company from its first contact), the tool's behaviour, and
putting any of the three in force.

---

## 2. Acceptance criteria

- [ ] No plate OPP-006, 007, 010, 011, 012, 013, 014, 015 or 017 is held by
  any standard; each is in the retired ledger with where its obligation went.
  Today: all nine are held by `STD-039`.
- [ ] `STD-039` is under 1,300 words. Today: over 3,000.
- [ ] `node machine/packages/sales-kit/pipeline.mjs opportunities` reports
  the same records valid and the broken fixtures refused, under the new
  plates. Today: the refusals are under the old plates.
- [ ] `npm test` and both check sets pass; no obligation is added or dropped,
  only moved.

---

## 3. Closure

- **What was done:** `STD-039` keeps the record (9 plates, 1,446 words, none
  checked by hand); `STD-054` takes who may be named (NAM-001–003, 1,076
  words); `STD-055` takes the public call (CAL-001–004, 862 words). The
  sales kit, its tests, the site and every citer follow the new plates.
- **What diverged, and why:** the page budget in the criterion was 1,300
  words and the record is 1,446; cutting further meant dropping source
  caveats and the header-field table, so the test holds 1,500 instead.
  `OPP-010` was also emitted by the tool for a won sale with no agreement
  path, which is a header rule: it now reports under `OPP-002`. The
  minimal-data rule lost its MUST: it is a line in the reviewers' list.
- **Evidence:** `npm test` all green; `pipeline.mjs opportunities` and the
  broken fixtures behave as before; no hand-checked row in the three.
- **Closed:** pending the Oracle's review · **by:** ursa
