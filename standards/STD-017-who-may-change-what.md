---
id: "STD-017"
uid: ""
title: "Who may change what"
type: documentation
subtype: standard
status: draft
version: "2.1.0"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-26T12:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, governance, authority, ranks]
threshold: governed
series_change: "2.1.0 — 2026-09-26: this standard becomes the one answer to who may change what: it takes the five thresholds and the rule that a change meets its series' threshold from the series standard, the three layers of a practice from the engineering baseline, and who moves which version number from the versions standard. No obligation dropped, one moved in, so a minor move, at the Oracle's word in session."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Who may change what

> **Summary:** The canon, the standards and the protocols change by a written
> decision or a change the Oracle approves; everything else by an ordinary
> change. Each series has a threshold, rank sets how far an actor reaches,
> and in doubt an agent stops.
> **Epistemic:** Who may change what: what each kind of change costs, who
> can pay it, and which outside standard each cost follows.
> **Pragmatic:** Know before editing whether you may, and what the edit needs.
> **Audience:** Agents · Oracles

**Binds:** every change to a registered document.
**Does not bind:** what each rank is, or the ranks on the platform.

## Rules

### What each kind of document needs

**The canon needs the Oracle's approval.** The international quality
standard asks that a controlling document be approved before it is used, so
anyone can show who let it in. The canon MUST change by a written decision
or a change the Oracle approves; that approval, kept with the change, is the
signature.

**Standards, protocols and decisions need a record or an approval.** Under
the same rule of the quality standard, they MUST change by a written
decision or by a change the Oracle approves, and the approval is kept as
the record.

**The threshold says what a change takes.** The quality standard asks that
changes to a controlled document be controlled, so every change shows who
let it through. We grade that control in five thresholds, from the
Oracle's signature down to an ordinary change; each series names its own,
and a change MUST meet it.

**Everything else needs an ordinary change.** The information-security
standard keeps the one who writes a change apart from the one who lets it
in. Every other series MUST change by an ordinary change that someone else
reviews, which the repository's protection enforces.

### Where a change lands

**A rule lands where it governs.** A rule written in a decision, a mission or
a commit message is not a rule yet; the sentence MUST go into the document a
reader looks in.

**Finished work keeps its claims.** The records standard holds that a record
stays complete and unaltered, and the decision-record convention says: write
a new one, do not edit the old. A finished mission or a published report
keeps what it claimed; only its form MAY be corrected, and the change says
so.

### Who may make it

**Rank sets the reach.** The management-system standard for records asks
that roles, responsibilities and authorities be written down, so every act
has an owner. Every actor MUST stay within its rank's reach: an Oracle
approves structural change and alone makes something stable or breaks it;
an Archon authorises work below that line; a digital agent writes its own
files and missions; a custodian keeps documents, indexes and change logs;
automation writes only reports. The same line sets the three layers of a
practice: principles move only by the Oracle's decision, practices by a
written decision, and checks by an ordinary change; and so the three
numbers of a version: a digital agent moves the last, an Archon the middle,
and only an Oracle the first.

**No agent edits its own identity.** The information-security standard
separates duties that conflict, so no one grants themselves power. The
files that say who an agent is and who operates it are approved by the
Oracle; the agent they describe MUST NOT edit them.

**In doubt, stop.** Facing an act that cannot be undone, with any doubt, an
agent MUST NOT act, and asks higher up.

## Check

Each rule, its code, its source and its check. No law requires any of it for a
private company; it is our choice, so that an auditor finds the controls they
already look for.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| AUT-006 | The canon needs the Oracle's approval | [ISO 9001:2015, review and approval, clause 7.5.2 c](https://www.iso.org/standard/62085.html) (clause unverified); the approver being the Oracle is ours | by hand — the pull request approval is the record; whether it suffices is not parsed |
| AUT-007 | Standards, protocols and decisions need a record or an approval | [ISO 9001:2015, review and approval, clause 7.5.2 c](https://www.iso.org/standard/62085.html) (clause unverified) | by hand, as above |
| AUT-068 | The threshold says what a change takes | [ISO 9001:2015, control of changes, clause 7.5.3.2 c](https://www.iso.org/standard/62085.html) (clause unverified); the five thresholds are ours; holds retired SER-003 | by hand — what a signature is is read, not parsed; each series' threshold is a column of `STD-001` |
| AUT-009 | Everything else needs an ordinary change | [ISO/IEC 27001:2022, segregation of duties, control A.5.3](https://www.iso.org/standard/27001) (clause unverified) | branch protection, in the repository settings |
| AUT-063 | A rule lands where it governs | — | by hand — recognising an obligation needs a reader |
| AUT-008 | Finished work keeps its claims | [ISO 15489-1:2016, integrity, clause 5.2.2](https://www.iso.org/standard/62542.html) (clause unverified) · [Nygard, documenting architecture decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions): supersede, do not edit | by hand |
| AUT-065 | Rank sets the reach | [ISO 30301:2019, roles, responsibilities and authorities, clause 5.3](https://www.iso.org/standard/74292.html) (clause unverified); the ranks are ours; holds retired ENG-034 (three layers) and VER-064 (who moves which version number) | by hand — an author's rank is read, not parsed |
| AUT-067 | No agent edits its own identity | [ISO/IEC 27001:2022, segregation of duties, control A.5.3](https://www.iso.org/standard/27001) (clause unverified): conflicting duties shall be segregated | by hand — a code-owners file could decide it; not wired |
| AUT-010 | In doubt, stop | — | by hand — an act not taken leaves no trace |

The five thresholds, and what a change to each takes:

| Threshold | What a change takes |
|---|---|
| `sealed` | the Oracle's signature and a decision record giving the reason |
| `governed` | a decision record, or a pull request the Oracle approves |
| `closed` | substance is not reopened; form may be corrected and the commit says so |
| `live` | corrected when it contradicts the canon or a signed decision; the correction is recorded inside the document, naming who and against which decision |
| `open` | a pull request |

| In the reading | Exact form |
|---|---|
| a written decision | a decision record in `decisions/` |
| a change | a pull request |
| the repository's protection | branch protection on `main` |
| the files that say who an agent is and who operates it | `SOUL.md` and `OPERATOR.md` |

## Why

A rule must be able to be switched off without lying about why it stopped.
No file in a repository is immutable; what tells the canon from a memory
is what a change takes. What a change costs is the record it leaves, and
rank decides which records an actor may leave.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-009` | Which rule wins | the precedence these costs produce |
| `CAN-004` | You are what you are doing | what each rank is |
| `STD-003` | Platform ranks | the ranks on the platform |
| `STD-004` | The header | the states a rule may hold |
| `STD-001` | The series | the threshold each series declares |
