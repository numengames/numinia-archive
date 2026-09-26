---
id: "STD-014"
uid: ""
title: "Publishing gates"
type: documentation
subtype: standard
status: draft
version: "1.1.4"
created: "2026-09-07T10:30:00+02:00"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [licensing, legal, publication, arweave, visibility]
threshold: governed
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Publishing gates

> **Summary:** Two acts cannot be undone: writing to the permanent web and
> making a private repository public. First we confirm the work is
> ours, holds nothing of others we may not share, and holds no personal
> data. An Oracle then signs.
> **Epistemic:** What is checked before an irreversible publication?
> **Pragmatic:** The list to run before pressing the button.
> **Audience:** Agents · Oracles

**Binds:** every permanent publication, and every Numen Games repository
turned public.

## Rules

### The two acts that cannot be undone

**Permanent publication is gated.** Before anything reaches the permanent
web, we MUST verify three things: it is ours, it holds no outside material we
may not share, and it holds no personal data. An Oracle MUST then sign.

**What fails the gate stays withdrawable.** Anything that fails is served
only from an ordinary content network, where we can still take it down.

**Going public is the grant.** A licence offered in public, beside the work,
grants its rights to whoever takes them. Copyright law turns the offer into
a grant; nothing else needs releasing. So an Oracle signs every change to
public, under the same gate.

### What is checked before a repository goes public

**Four checks before visibility changes.** Before a repository goes public,
four checks MUST pass:

- the REUSE linter proves every file declares its owner and licence;
- a scan of every commit, as the secrets standard asks, finds no leaked
  credential;
- the brand and attribution notices are complete;
- a command lists the sensitive folders, and we compare that list with the
  licence declarations, never from memory.

**Nothing reserved slips through.** No general licence declaration may reach
a file we keep reserved, and the whole history MUST be free of personal
data. Publishing someone's personal data needs a legal basis.

**Being born licensed is not publication.** A repository carries its licence
from its first commit. While it stays private, that licence grants nothing
to anyone.

**A legal debt waits for a condition.** A written debt marked as legal ends
when a condition is met, not on a date. The automatic checks test that
condition on every build.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| PUB-001 | Permanent publication is gated; what fails the gate stays withdrawable | [ISO/IEC 5230 OpenChain, clause 3.3 review and approval of open source content](https://github.com/OpenChain-Project/License-Compliance-Specification) | by hand: the Oracle's signature, recorded outside the corpus |
| PUB-002 | Going public is the grant | [ISO/IEC 5230 OpenChain, clause 3.5 community engagement](https://github.com/OpenChain-Project/License-Compliance-Specification) | by hand: the Oracle's signature, recorded outside the corpus |
| PUB-003 | Four checks before visibility changes; nothing reserved slips through | [REUSE 3.3, `reuse lint`](https://reuse.software/spec-3.3/); KEY-054 of Secrets, which holds the full-history scan; [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) for personal data | `reuse lint` in CI; no full-history secret scan (gitleaks) runs yet, register row SEC-004 is owed; the listing is produced by a command and its output attached to the signing; `TRADEMARKS.md` and `NOTICE` by hand |
| PUB-004 | Being born licensed is not publication | — | by hand: a `LICENSE` file present at the first commit |
| PUB-005 | A legal debt waits for a condition | — | nothing yet: the guard that evaluates conditions is described, not built (`DBT-020`) |

## Why

Opening cannot be undone. The permanent web cannot be unwritten, and a
public repository has already been copied. A command lists the sensitive
folders because a hand-written list drifts, and what we meant to keep
publishes itself. We scan the whole history because a secret deleted from
the latest version still sits one step back in the log.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-010` | Licensing | the regime these gates protect |
| `CAN-005` | Opening is an act | why the acts are irreversible |
