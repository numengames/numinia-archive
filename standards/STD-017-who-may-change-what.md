---
id: "STD-017"
uid: ""
title: "Who may change what"
type: documentation
subtype: standard
status: draft
version: "2.0.2"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, governance, authority, ranks]
threshold: governed
series_change: "2.0.2 — 2026-09-25: written in plain words a narrator can read aloud; plates, file names and the outside standard behind each rule wait in the Check table. No obligation added or dropped."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Who may change what

> **Summary:** The canon, the standards and the protocols change by a written
> decision or a change the Oracle approves; everything else by an ordinary
> change. Rank sets how far an actor reaches, a rule lands where it governs,
> and in doubt an agent stops.
> **Epistemic:** What each kind of change costs, and who can pay it.
> **Pragmatic:** Know before editing whether you may, and what the edit needs.
> **Audience:** Agents · Oracles

**Binds:** every change to a registered document.
**Does not bind:** what each rank is, or the ranks on the platform.

## Rules

### What each kind of document needs

**The canon needs the Oracle's approval.** The canon changes by a written
decision, or by a change the Oracle approves. Nothing is sealed: the
Oracle's approval on the change is the signature.

**Standards, protocols and decisions need a record or an approval.** They
change by a written decision, or by a change the Oracle approves.

**Everything else needs an ordinary change.** Every other series changes by
an ordinary reviewed change.

### Where a change lands

**A rule lands where it governs.** A rule written in a decision, a mission or
a commit message is not a rule yet; the sentence goes into the document a
reader looks in.

**Finished work keeps its claims.** A finished mission or a published report
keeps what it claimed; its form MAY be corrected, and the change says so.

### Who may make it

**Rank sets the reach.** An Oracle approves structural change, seals the
canon, and alone makes something stable or breaks it; an Archon authorises
work below that line; a digital agent writes its own files and missions; a
custodian keeps documents, indexes and change logs; automation writes only
reports.

**No agent edits its own identity.** The files that say who an agent is and
who operates it are approved by the Oracle; the agent they describe never
edits them.

**In doubt, stop.** Facing an act that cannot be undone, with any doubt, an
agent does not act and asks higher up.

## Check

Every rule above, with its plate, the outside standard it follows, and what
verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| AUT-006 | The canon needs the Oracle's approval | — | by hand — the record or approval is visible; whether it suffices is not |
| AUT-007 | Standards, protocols and decisions need a record or an approval | — | by hand, as above |
| AUT-009 | Everything else needs an ordinary change | — | branch protection, in the repository settings |
| AUT-063 | A rule lands where it governs | — | by hand — recognising an obligation needs a reader |
| AUT-008 | Finished work keeps its claims | — | by hand |
| AUT-065 | Rank sets the reach | — | by hand — an author's rank is read, not parsed |
| AUT-067 | No agent edits its own identity | [ISO/IEC 27001, segregation of duties](https://www.iso.org/standard/27001) | by hand — a code-owners file could decide it; not wired |
| AUT-010 | In doubt, stop | — | by hand — an act not taken leaves no trace |

| In the reading | Exact form |
|---|---|
| a written decision | a decision record in `decisions/` |
| a change | a pull request |
| the files that say who an agent is and who operates it | `SOUL.md` and `OPERATOR.md` |

## Why

A rule must be able to be switched off without lying about why it stopped.
The same honesty applies to who may switch it: what a change costs is the
record it leaves, and rank decides which records an actor may leave.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-009` | Which rule wins | the precedence these costs produce |
| `CAN-004` | You are what you are doing | what each rank is |
| `STD-003` | Platform ranks | the ranks on the platform |
| `STD-016` | Header fields | the states a rule may hold |
