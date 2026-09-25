---
id: "STD-014"
uid: ""
title: "Publishing gates"
type: documentation
subtype: standard
status: draft
version: "1.1.0"
created: "2026-09-07T10:30:00+02:00"
updated: "2026-09-25T15:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [licensing, legal, publication, arweave, visibility]
threshold: governed
series_change: "1.1.0 — 2026-09-25: the check before a repository goes public now names the two outside checks it runs, the REUSE linter and a secret scan of the whole history as the best practices badge asks, and the gates rest on the OpenChain licence-compliance standard, at the Oracle's word in session."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Publishing gates

> **Summary:** Two acts cannot be undone: writing something to the permanent
> web, and turning a private repository public. Before either, we check that
> the work is ours, that it carries nothing of anyone else's we may not
> share, and that it holds no personal data; then an Oracle signs.
> **Epistemic:** Why making a repository public is already the grant of its
> licence, and what is checked before either act.
> **Pragmatic:** The list to run before pressing the button.
> **Audience:** Agents · Oracles

**Binds:** every permanent publication, and every change of a Numen Games
repository from private to public.
**Does not bind:** publication to an ordinary content network, which can be
withdrawn.

## Rules

### The two acts that cannot be undone

**Permanent publication is gated.** Before anything is written to the
permanent web, we MUST verify that it is ours, that it holds no outside
material we may not share, and no personal data, and an Oracle MUST sign.

**What fails the gate stays withdrawable.** Anything that does not pass is
served only from an ordinary content network, where it can still be taken
down.

**Going public is the grant.** A licence offered in public, with the work
there to take, grants its rights to whoever takes them; nothing else needs
to be released. So making a repository public is an act an Oracle signs,
under the same gate. The law makes it so: copyright law turns the offered
licence into a grant.

### What is checked before a repository goes public

**Four checks before visibility changes.** Before a repository goes public,
four checks MUST pass. Two follow outside standards: the linter of the REUSE
specification, the common way for every file to say its licence, proves
that every file declares its owner and terms; and a secret scanner reads
every commit in the history, not only the latest, and finds no leaked
credential, as the best practices badge of the Open Source Security
Foundation asks. Two are ours: the brand and attribution notices are
complete, and sensitive folders are listed by a command and compared with
the licence declarations, never from memory. Our choice.

**Nothing reserved slips through.** No file we keep reserved may be reached
by a general licence declaration, and the whole history MUST be free of
personal data. The law requires this: publishing someone's personal data
needs a legal basis.

**Being born licensed is not publication.** A repository carries its licence
from its first commit; while it is private, that licence grants permission to
no one.

**A legal debt waits for a condition.** A written debt marked as legal ends
on a condition, not on a date, and the automatic checks evaluate that
condition on every build.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it follows, and what verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| PUB-001 | Permanent publication is gated; what fails the gate stays withdrawable | [ISO/IEC 5230 OpenChain, clause 3.3 review and approval of open source content](https://github.com/OpenChain-Project/License-Compliance-Specification) | by hand: the Oracle's signature, recorded outside the corpus |
| PUB-002 | Going public is the grant | [ISO/IEC 5230 OpenChain, clause 3.5 community engagement](https://github.com/OpenChain-Project/License-Compliance-Specification) | by hand: the Oracle's signature, recorded outside the corpus |
| PUB-003 | Four checks before visibility changes; nothing reserved slips through | [REUSE 3.3, `reuse lint`](https://reuse.software/spec-3.3/); [OpenSSF Best Practices Badge, no_leaked_credentials](https://www.bestpractices.dev/en/criteria/0#0.no_leaked_credentials); [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) for personal data | `reuse lint` in CI; no full-history secret scan (gitleaks) runs yet, register row SEC-004 is owed; the listing is produced by a command and its output attached to the signing; `TRADEMARKS.md` and `NOTICE` by hand |
| PUB-004 | Being born licensed is not publication | — | by hand: a `LICENSE` file present at the first commit |
| PUB-005 | A legal debt waits for a condition | — | nothing yet: the guard that evaluates conditions is described, not built (`DBT-020`) |

## Why

Opening cannot be undone: the permanent web cannot be unwritten, and a
public repository has already been copied. The listing of sensitive folders
is generated, because a list written by hand drifts and what we meant to
keep publishes itself; the whole history is checked, because a secret
removed from the latest version is still one step back in the log.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-010` | Licensing | the regime these gates protect |
| `CAN-005` | Legal by design | why the acts are irreversible |
