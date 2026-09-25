---
id: "STD-014"
uid: ""
title: "Publishing gates"
type: documentation
subtype: standard
status: draft
version: "1.0.1"
created: "2026-09-07T10:30:00+02:00"
updated: "2026-09-09T01:45:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [licensing, legal, publication, arweave, visibility]
threshold: governed
series_change: "1.0.1 — LIC-060 retired as a duplicate of PUB-001 (ADR-043 cut of STD-009). 1.0.0 — new standard, split from STD-010 under ADR-043: the two gates of the old §4, as PUB-001..005. Wording kept; the checklist is the same four items."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Publishing gates

> **Summary:** Two acts cannot be undone: writing to Arweave, and turning a
> repository public. Each passes the same review — ownership, no incompatible
> third-party material, no personal data — and is signed by an Oracle.
> **Epistemic:** Why a visibility change is the grant itself, and what is
> checked before either act.
> **Pragmatic:** The list to run before pressing the button.
> **Audience:** Agents · Oracles

**Binds:** every permanent publication and every private-to-public change of
a Numen Games repository.
**Does not bind:** publication to a CDN, which can be withdrawn.

## Rules

**PUB-001 — Permanent publication is gated.** Before writing to Arweave,
ownership, absence of incompatible third-party material and absence of
personal data must be verified, and an Oracle must sign. What does not pass is
served only from CDN.

**PUB-002 — Going public is the grant.** A licence offered publicly with the
work available grants rights to whoever takes them, with no `npm publish` or
Arweave needed. A visibility change is therefore an Oracle-signed act under
the same gate as `PUB-001`.

**PUB-003 — Four checks before visibility changes.** `LICENSES/`,
`REUSE.toml`, `TRADEMARKS.md` and `NOTICE` complete; a *real listing* of
sensitive directories against the annotations, never a hand-written list; no
reserved file reachable by a general annotation; no personal data or secrets
in the history, not only in `HEAD`.

**PUB-004 — Birth licence is not publication.** A repository carries its
`LICENSE` from the first commit; while private it grants permission to no one.

**PUB-005 — A legal debt threshold is a condition.** Exits in `debt/` entries
tagged `legal` are conditions, not dates, and CI evaluates them on every
build.

## Check

| Plate | Verified by |
|---|---|
| PUB-001, PUB-002 | `[MANUAL]` — the Oracle's signature, recorded outside the corpus |
| PUB-003 | `[MANUAL]` — the listing is produced by a command, its output attached to the signing |
| PUB-004 | `[MANUAL]` — `LICENSE` present at the first commit |
| PUB-005 | `[MANUAL]` — the guard that evaluates thresholds is described, not built (`DBT-020`) |

## Why

`CAN-005`: opening is irreversible. Arweave cannot be unwritten; a public
repository has already been cloned. The listing is generated because what is
enumerated by hand desynchronises and the reserved publishes itself; the
history is checked because a secret removed from `HEAD` is still one `git
log` away.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-010` | Licensing | the regime these gates protect |
| `CAN-005` | Legal by design | why the acts are irreversible |
