---
id: "PRO-018"
uid: ""
title: "Publishing a repository"
type: protocol
status: draft
version: "2.1.0"
created: "2026-09-10T01:00:00+02:00"
updated: "2026-09-27T15:45:00+02:00"
author: "ursa"
owner: "oracle"
tags: [protocol, publishing, licensing, reuse, spdx, visibility]
applies_to: [all-agents]
mandatory: true
license: "CC0-1.0"
related: ["STD-014", "STD-010", "STD-022", "PRO-008", "PRO-011"]
derived_from: "CAN-005"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-018 — Publishing a repository

> **Summary:** How an agent takes a Numen Games repository from private to
> public, or a work to a permanent store: what is prepared, what is listed,
> what is attached to the signing request, and who presses the button.
> **Epistemic:** What does an agent prepare before a repository or a work is made public, and who makes it so?
> **Pragmatic:** Run the four gates, attach the listings, request the
> signature. The agent never changes visibility.
> **Audience:** Agents · Oracle

**Binds:** any agent preparing a visibility change or a permanent
publication of a Numen Games repository or work, and the request it
files.

## 1. Purpose and trigger

A mission or ruling asks for a repository to go public, a package to be
published, or a work written to Arweave. The agent prepares and requests;
the Oracle signs and executes. Going public is the grant (`PUB-002`), so
the irreversible act is preceded by evidence.

## 2. Preconditions

- A mission or a ruling that names the repository, package or work to
  publish.
- A clone with its full history: step 5 scans every commit, not the tip.
- `reuse` installed, and the allowlist of `STD-010` at hand.

## 3. Procedure

Every listing attached is the output of a command, shown with the command
and the commit it ran at; a hand-typed list is not evidence (`PUB-003`).

1. **Confirm ownership.** No third-party material outside the allowlist,
   provenance stated (`LIC-001`, `LIC-011`). *Evidence:* listing of inputs
   and their licences.
2. **Check every dependency's licence.** List every dependency's SPDX
   identifier against the `STD-010` allowlist; one on the *never* tier or
   without a `license` field blocks the request (`LIC-005`, `LIC-006`).
   *Evidence:* the dependency listing.
3. **Complete the declaration.** `LICENSE`, `LICENSES/`, `REUSE.toml`,
   `TRADEMARKS.md`, `NOTICE` where Apache-2.0 ships, exact SPDX in every
   `package.json` (`LIC-007`). A request with a gap is returned, not signed.
   *Evidence:* `reuse lint` output, passing.
4. **Check the reserved directories.** List sensitive directories against
   `REUSE.toml` annotations; no reserved file reachable by a general
   annotation. *Evidence:* the listing command and its output.
5. **Scan the whole history.** Scan every commit, not `HEAD`, for secrets
   and personal data: a secret removed from the tip is one `git log` away.
   On a find, stop and follow the real-value step of Auditing identity,
   authorization and secrets (`PRO-011`; `KEY-056` of `STD-022`).
   *Evidence:* the scan command, the count, zero findings.
6. **Check the legal debt.** Look in `debt/` for open entries tagged `legal`
   whose exit is a condition (`PUB-005`). *Evidence:* the entries, or none.
7. **File the signing request and stop.** Use Requesting approval
   (`PRO-008`). One act per request: a visibility change and a permanent
   publication are separate requests, each with its own listings. Never
   change visibility, publish a package or write to a permanent store
   yourself. *Evidence:* steps 1–6, each with commit and date.
8. **The Oracle signs and executes.** The agent records the act in the
   mission. *Evidence:* the ruling, the date, the new visibility.

## 4. Verification

| Check | Evidence |
|---|---|
| Nothing typed | every listing names its command and commit |
| History covered | scan count equals `git rev-list --count HEAD` |
| One act | the request names exactly one repository and one change |

## 5. Escalation

A secret or personal data found: stop and follow the real-value step of
Auditing identity, authorization and secrets (`PRO-011`). Ownership
unclear, a *signed decision* tier dependency, or another organization's
repository: `PRO-005` before step 7.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-014` | Publishing gates | `PUB-001..005`: the gates this protocol runs |
| `STD-010` | Licensing | `LIC-001/005/006/007/011`: what the listings check; the allowlist steps 1 and 2 read |
| `STD-022` | Secrets | `KEY-056`: a live finding reported out of band |
| `PRO-008` | Requesting approval, issuing rulings | the signing request |
| `PRO-011` | Auditing identity, authorization and secrets | the real-value step when the scan finds a value |
