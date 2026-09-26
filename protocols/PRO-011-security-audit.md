---
id: "PRO-011"
uid: ""
title: "Auditing identity, authorization and secrets"
type: protocol
status: draft
version: "1.0.2"
created: "2026-08-21T07:35:05Z"
created_source: "git:b35ab06"
created_confidence: exact
updated: "2026-09-26T14:43:00+02:00"
author: "claude-opus-5"
owner: "oracle"
tags: [protocols, security, audit, credentials, secrets, identity, authorization]
license: "CC0-1.0"
applies_to: [all-agents]
mandatory: true
review_next: "2027-08-21"
related: ["STD-022", "STD-015", "PRO-005", "PRO-008"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-011 — Auditing identity, authorization and secrets

> **Summary:** How an agent measures the distance between what the
> documentation claims about identities, authorizations and secrets and
> what exists — census, verification, report — and where it stops.
> **Epistemic:** An audit that finds nothing is suspect only if it cannot
> show where it looked. The deliverable is coverage, not a count.
> **Pragmatic:** Once a year and on every trigger below. The agent censuses
> and verifies, then stops; correction needs a signature.
> **Audience:** Agents · Oracle

**Binds:** any agent running a security audit over a Numinia scope, and the
report it files.

## 1. Trigger

Yearly (`review_next`; a skipped date is the next run's first finding).
Without waiting: before a repository turns public; after any incident;
when a person or agent leaves or changes role; when a provider, worker,
domain or pipeline enters production; when the base document changes an
automated claim. Executor: an agent with read access to the scope.

## 2. Rules

**SEC-001 — Denominator first.** The universe MUST be enumerated from the
API and its count published before anything is censused. Every row then
counts against it; a resource not inspected is listed as not inspected.

**SEC-002 — Provenance on every row.** Each census row MUST carry the
command, the date and the credential used. Without them it is a memory.

**SEC-003 — Read-only until the allowlist.** Census and passive
verification write nothing. An active test MUST use a throwaway branch, a
synthetic canary (valid format, non-existent value), a pull request closed
unmerged and deleted — never in a public repository without signature. If
the control does not block, stop: the finding exists.

**SEC-004 — No correction without a signature.** The agent MUST NOT revoke,
delete, rotate or modify anything. It prepares
the list, the order and what each step breaks, and waits (`PRO-008`).

**SEC-005 — A real value stops the audit.** A secret value seen live or of
unknown state MUST NOT be copied anywhere, not truncated; it is referenced
by location and reported out of band (`KEY-056`). A repository that has
ever been public is treated as compromised: rotate first, history later.

**SEC-006 — Tier before file.** Public (findings, gaps, scores; no
identifiers), internal (names, dates, addresses; never a public repository),
hot (out of band) MUST NOT share a document. No destination for the
internal tier is the audit's first finding.

**SEC-007 — Coverage caps the scores.** The report MUST score doctrine,
execution and coverage out of ten from verified evidence; low coverage
caps the other two rather than averaging with them.

## 3. Procedure

**A · Census**, largest blind spot first: recovery, machine and agent
credentials, third-party apps, DNS, signing keys, humans, billing, declared
secrets (names, never values), last use, declared controls.
**B · Verify.** Passive: full history, dated baseline of live flows,
divergence in both directions. Active: `SEC-003`, block message recorded.
**C · Report** (`RPT-TEMPLATE`, `subtype: audit`): the shape is in the
template's audit note. False documentation claims are corrected in the
document, not noted.
**D · Close.** Canaries and branches deleted, audit credential revoked,
`review_next` updated.

## 4. Verification

| Check | Evidence |
|---|---|
| Denominator | the count and its command, before the first row |
| Read-only held | no commit on the trunk by the audit credential |
| Tiered | no identifier or address in the public report |

## 5. Escalation

The brief does not match what is seen, or an irreversible action is within
reach: stop, `PRO-005`. Another organization's scope receives an offer, never a
correction.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-022` | Secrets | `KEY-054..056`: nothing in the tree, rotate before write, live findings out of band |
| `STD-015` | Engineering checks | `TRC-007`: blindness declared, here as coverage |
| `PRO-008` | Requesting approval, issuing rulings | the correction list is an approval request |
| `PRO-005` | Escalating to the Oracle | stop conditions |
