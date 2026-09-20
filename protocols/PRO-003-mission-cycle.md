---
id: "PRO-003"
uid: ""
title: "Running a mission"
type: protocol
status: draft
version: "5.0.1"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-09-10T12:30:00+02:00"
author: "nimrod"
owner: "oracle"
tags: [protocol, missions, cycle, briefing, coordination]
applies_to: [all-agents]
mandatory: true
license: "CC0-1.0"
related: ["STD-025", "STD-018", "PRO-001", "PRO-005", "PRO-008"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-003 — Running a mission

> **Summary:** How a mission is received, understood, executed and handed
> back: briefing before any action, the cycle of states, coordination when
> more than one agent is near the same file.
> **Epistemic:** A mission not understood is a mission not executed.
> Briefing is not overhead; it is the first act of execution.
> **Pragmatic:** Briefing before touching anything, states while working,
> coordination when another agent is involved.
> **Audience:** Agents · Oracle

**Binds:** any agent assigned a mission, and the Oracle who opens, reviews
and closes it.
**Does not bind:** what the card must contain (`STD-025`); the session
around the mission (`PRO-001`).

## 1. Trigger

A mission is assigned, self-identified, arrives by chat or instruction, or
a frozen one is reactivated. Executor: the agent; the Oracle at open,
review and close.

## 2. Rules

**MCY-001 — Mission first, execution after.** No work MUST begin before the
briefing is complete and the card's activation is committed (`MSN-036`).
Quick tasks are where the errors happen; they are not exempt.

**MCY-002 — Three answers before the first action.** The agent MUST be able
to state the deliverable, what done looks like, and the first concrete
action — a tool call or a file write, never "research". Unclear: ask.

**MCY-003 — Blockers are flagged before starting.** A dependency, a key, an
access or a decision the mission needs MUST be raised before the first
action, not after. Blocked: `frozen` with its reason (`MSN-039`), Oracle
notified.

**MCY-004 — Contradiction with the canon stops the mission.** The agent
MUST escalate (`PRO-005`) rather than execute against the canon.

**MCY-005 — Review is requested with evidence.** Before `in-review`, every
acceptance criterion MUST be verified and Closure filled with what was
done, what diverged and the evidence; the request is scored (`PRO-008`).

**MCY-006 — The repository is the channel.** Agents coordinate through
commits, pull requests and the mission file; there is no real-time
channel. Agents do not assign each other work. Ambiguity is escalated,
never resolved by overwriting another's work.

**MCY-007 — Announce M and above.** A mission of effort M or larger, or
one worked live with the Oracle, opens with mission, estimate and first
action stated. Smaller work may start silently.

## 3. Procedure

| Step | Whose | What |
|---|---|---|
| 1 | Oracle | Open from `machine/templates/MIS-TEMPLATE`, next free number verified after a pull (`IDN-015`), `todo`, pull request. |
| 2 | agent | Brief: read the whole card (`MSN-041`), answer the three questions (`MCY-002`), check blockers (`MCY-003`). |
| 3 | agent | Activate: `in-progress`, `started`, commit (`MSN-002`). Announce if M+ (`MCY-007`). |
| 4 | agent | Execute; record progress and any change of plan in the card. |
| 5 | agent | Verify criteria, fill Closure, `in-review`, `in_review_at`, approval request (`MCY-005`). |
| 6 | Oracle | `done` with `completed`, or back to `in-progress` with the changes requested. |

Freezing and unfreezing: `MSN-039`. Deleting a closed card: `MSN-004`.

## 4. Verification

| Check | Evidence |
|---|---|
| Registered first | the activation commit predates the first work commit |
| Briefed | the three answers in the card or the opening message |
| Reviewable | every criterion marked with its command; Closure dated |

## 5. Escalation

Contradiction with the canon, a blocker the agent cannot lift, a conflict
with an active mission: `PRO-005`. Identifier collision: `IDN-015`, the
second renumbers and fixes its own references.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-025` | A mission is a card | the artefact this protocol executes |
| `STD-018` | Identity | `IDN-015`: first commit keeps the number |
| `PRO-005` | Escalating to the Oracle | blockers, contradictions, conflicts |
| `PRO-008` | Requesting approval, issuing rulings | the review request is scored |
