---
id: "PRO-011"
uid: ""
title: "Auditing identity, authorization and secrets"
type: protocol
status: draft
version: "2.0.1"
created: "2026-08-21T07:35:05Z"
created_source: "git:b35ab06"
created_confidence: exact
updated: "2026-09-27T14:30:00+02:00"
author: "claude-opus-5"
owner: "oracle"
tags: [protocols, security, audit, credentials, secrets, identity, authorization]
license: "CC0-1.0"
applies_to: [all-agents]
mandatory: true
review_next: "2027-08-21"
related: ["STD-022", "STD-015", "PRO-005", "PRO-008"]
derived_from: "CAN-010"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-011 — Auditing identity, authorization and secrets

> **Summary:** How an agent measures the distance between what the
> documentation claims about identities, authorizations and secrets and
> what exists — census, verification, report — and where it stops.
> **Epistemic:** How is a security audit run so that it shows where it looked and stops before it changes anything?
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

## 2. Procedure

1. **Publish the denominator.** Enumerate the universe from the API and
   publish its count, with the command, before censusing anything. Every
   row counts against it; list a resource not inspected as not inspected.
2. **Census, largest blind spot first.** Recovery, machine and agent
   credentials, third-party apps, DNS, signing keys, humans, billing,
   declared secrets (names, never values), last use, declared controls.
   Give every row the command, the date and the credential used; a row
   without them is a memory.
3. **Verify passively.** Full history, a dated baseline of live flows,
   divergence in both directions. Write nothing.
4. **Test actively, only with throwaway material.** A throwaway branch, a
   synthetic canary (valid format, non-existent value), a pull request
   closed unmerged and deleted; never in a public repository without
   signature. Record the block message. If the control does not block,
   stop: the finding exists.
5. **Stop on a real value.** A secret seen live or of unknown state is
   never copied, not even truncated: reference it by location and report
   it out of band (`KEY-056`). Treat a repository that has ever been public
   as compromised: rotate first, history later.
6. **Tier before filing.** Public (findings, gaps, scores; no identifiers),
   internal (names, dates, addresses; never in a public repository), hot
   (out of band) never share a document. No destination for the internal
   tier is the audit's first finding.
7. **Report** (`RPT-TEMPLATE`, `subtype: audit`, shape in the template's
   audit note). Score doctrine, execution and coverage out of ten from
   verified evidence; low coverage caps the other two, it does not average
   with them. Correct false documentation claims in the document, not in
   a note.
8. **Prepare the correction and wait.** Revoke, delete, rotate or modify
   nothing. Write the list, the order and what each step breaks, and file
   it as an approval request (`PRO-008`).
9. **Close.** Delete canaries and branches, revoke the audit credential,
   update `review_next`.

## 3. Verification

| Check | Evidence |
|---|---|
| Denominator | the count and its command, before the first row |
| Provenance | every row names command, date, credential |
| Read-only held | no commit on the trunk by the audit credential |
| Tiered | no identifier or address in the public report |
| Scored | coverage score stated; the other two do not exceed it |

## 4. Escalation

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
