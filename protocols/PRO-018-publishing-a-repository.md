---
id: "PRO-018"
uid: ""
title: "Publishing a repository"
type: protocol
status: draft
version: "1.0.1"
created: "2026-09-10T01:00:00+02:00"
updated: "2026-09-26T13:00:00+02:00"
author: "ursa"
owner: "oracle"
tags: [protocol, publishing, licensing, reuse, spdx, visibility]
applies_to: [all-agents]
mandatory: true
license: "CC0-1.0"
related: ["STD-014", "STD-010", "STD-022", "PRO-008", "PRO-011"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-018 — Publishing a repository

> **Summary:** How an agent takes a Numen Games repository from private to
> public, or a work to a permanent store: what is prepared, what is listed,
> what is attached to the signing request, and who presses the button.
> **Epistemic:** Going public is the grant (`PUB-002`). The protocol exists
> so that the irreversible act is preceded by evidence, not by confidence.
> **Pragmatic:** Run the four gates, attach the listings, request the
> signature. The agent never changes visibility.
> **Audience:** Agents · Oracle

**Binds:** any agent preparing a visibility change or a permanent
publication of a Numen Games repository or work, and the request it
files.
**Does not bind:** what the gates are (`STD-014`); the licence regime
(`STD-010`); publication to a CDN, which can be withdrawn.

## 1. Trigger

A mission or ruling asks for a repository to go public, a package to be
published, or a work written to Arweave. The agent prepares and requests;
the Oracle signs and executes.

## 2. Rules

**RLS-001 — The agent prepares; the Oracle presses.** An agent MUST NOT
change a repository's visibility, publish a package or write to a
permanent store. It files a signing request (`PRO-008`) and stops.

**RLS-002 — Listings are generated, never typed.** Every item the request
attaches — files, annotations, sensitive paths, dependency licences,
history scan — MUST be the output of a command, with the command and the
commit it ran at. A hand-written list is not evidence (`PUB-003`).

**RLS-003 — History, not `HEAD`.** The scan for secrets and personal data
MUST cover every commit. A secret removed from the tip is still one `git
log` away; if one is found, `PRO-011` `SEC-005` applies and this protocol
pauses.

**RLS-004 — Every dependency on the allowlist.** The dependency listing
MUST show each package's SPDX identifier against the allowlist of
`STD-010`; one on the
*never* tier, or without a `license` field, blocks the request
(`LIC-005`, `LIC-006`).

**RLS-005 — The declaration is complete before the request.** `LICENSE`,
`LICENSES/`, `REUSE.toml`, `TRADEMARKS.md`, `NOTICE` where Apache-2.0
ships, exact SPDX in every `package.json` (`LIC-007`); `reuse lint` passes.
A request filed with a gap is returned, not signed.

**RLS-006 — One request, one act.** A visibility change and a permanent
publication are separate requests, each with its own listings, even for
the same repository. A signature covers one act.

## 3. Procedure

| Step | What | Evidence attached |
|---|---|---|
| 1 | Confirm ownership: no third-party material outside the allowlist, provenance stated (`LIC-001`, `LIC-011`) | listing of inputs and their licences |
| 2 | Complete the declaration (`RLS-005`) | `reuse lint` output |
| 3 | List sensitive directories against `REUSE.toml` annotations; no reserved file reachable by a general annotation | the listing command and its output |
| 4 | Scan the full history for secrets and personal data (`RLS-003`) | the scan command, the count, zero findings |
| 5 | Check `debt/` for open entries tagged `legal` whose exit is a condition (`PUB-005`) | the entries, or none |
| 6 | File the signing request (`PRO-008`), one act per request | steps 1–5, each with commit and date |
| 7 | Oracle signs and executes; the agent records the act in the mission | the ruling, the date, the new visibility |

## 4. Verification

| Check | Evidence |
|---|---|
| Nothing typed | every listing names its command and commit |
| History covered | scan count equals `git rev-list --count HEAD` |
| One act | the request names exactly one repository and one change |

## 5. Escalation

A secret or personal data found: stop, `SEC-005`. Ownership unclear, a
*signed decision* tier dependency, or another organization's repository:
`PRO-005` before step 6.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-014` | Publishing gates | `PUB-001..005`: the gates this protocol runs |
| `STD-010` | Licensing | `LIC-001/005/006/007/011`: what the listings check; the allowlist step 1 and `RLS-004` read |
| `PRO-008` | Requesting approval, issuing rulings | the signing request |
| `PRO-011` | Auditing identity, authorization and secrets | `SEC-005` when the scan finds a value |
