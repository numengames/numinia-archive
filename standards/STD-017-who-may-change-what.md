---
id: "STD-017"
uid: ""
title: "Who may change what"
type: documentation
subtype: standard
status: draft
version: "2.0.1"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-09T16:40:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, governance, authority, ranks]
threshold: governed
series_change: "1.0.0 — new standard, split from STD-009 under ADR-043. Rules keep their plates and their verifiers; the prose around them is the Why."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Who may change what

> **Summary:** Canon and the axis move by a decision record or a pull request
> the Oracle approves; everything else by a pull request. Rank sets
> an actor's reach, a change lands where it governs, and in doubt an agent
> stops.
> **Epistemic:** The cost of each kind of change and who can pay it.
> **Pragmatic:** Know before editing whether you may, and what the edit needs.
> **Audience:** Agents · Oracles

**Binds:** every change to a registered document.
**Does not bind:** what each rank is — `CAN-004`; platform ranks — `STD-003`.

## Rules

**AUT-006 — Canon needs the Oracle's approval.** `canon/` changes by a
decision record, or by a pull request the Oracle approves. Nothing is sealed:
the Oracle's approval on the pull request is the signature.

**AUT-007 — The axis needs a record or an approval.** Standards, protocols
and decisions change by a decision record, or by a pull request the Oracle
approves.

**AUT-009 — Everything else needs a pull request.** Every other series
changes by an ordinary pull request.

**AUT-063 — The change lands where it governs.** A rule written in a
decision, a mission or a commit message is not a rule yet; the sentence goes
into the document a reader looks in.

**AUT-008 — Finished work keeps its claims.** A done mission or a published
report keeps what it claimed; its form may be corrected and the commit says
so.

**AUT-065 — Rank sets the reach.** An Oracle approves structural change,
seals canon, and alone promotes an artefact to stable or breaks it; an Archon
authorises iterations below the stable line; a digital agent writes its own
files and its assigned missions; a custodian maintains documents, indexes and
changelogs; automation writes reports only.

**AUT-067 — No agent edits its own identity.** `SOUL.md` and `OPERATOR.md`
are Oracle-approved; the agent they describe never edits them.

**AUT-010 — In doubt, stop.** Facing an irreversible act with any doubt, an
agent does not act and escalates.

## Check

| Plate | Verified by |
|---|---|
| AUT-009 | branch protection, GitHub settings |
| AUT-006, 007 | `[MANUAL]` — the record or approval is verifiable; its adequacy is not |
| AUT-063, 008, 065 | `[MANUAL]` — recognising an obligation, a claim, or an author's rank needs a reader |
| AUT-067 | `[MANUAL]` — CODEOWNERS could decide it; not wired |
| AUT-010 | `[MANUAL]` — an act not taken leaves no trace |

## Why

A normative document must be switchable off without lying about why it
stopped (`STD-016`, `GIT-045`). The same honesty applies to who may switch
it: the cost of a change is the
record it leaves, and rank is what decides which records an actor may leave.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-009` | Which rule wins | the precedence these costs produce |
| `CAN-004` | Ranks | who holds which rank |
| `STD-016` | Header fields | the states a normative document may hold |
