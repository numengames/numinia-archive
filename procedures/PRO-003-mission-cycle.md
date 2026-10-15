---
id: "PRO-003"
uid: ""
title: "Running a mission"
type: procedure
status: draft
version: "5.1.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-10-15T10:10:00Z"
author: "nimrod"
owner: "oracle"
section: "Operations"
tags: [procedure, missions, cycle, briefing, coordination]
applies_to: [all-agents]
mandatory: true
license: "CC0-1.0"
related: ["STD-025", "STD-018", "PRO-001", "PRO-005", "PRO-008"]
derived_from: "PRI-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-003 — Running a mission

> **Summary:** How a mission is received, understood, executed and handed
> back: briefing before any action, the cycle of states, coordination when
> more than one agent is near the same file.
> **Epistemic:** What must an agent understand before it touches a mission, and what does it hand back?
> **Pragmatic:** Briefing before touching anything, states while working,
> coordination when another agent is involved.
> **Audience:** Agents · Oracle

**Binds:** any agent assigned a mission, and the Oracle who opens, reviews
and closes it.

---

## 1. Purpose and trigger

A mission not understood is a mission not executed: briefing is not overhead,
it is the first act of execution. The procedure starts when a mission is
assigned, self-identified, arrives by chat or instruction, or when one on hold
is reactivated. Quick tasks are where the errors happen; they are not exempt.
Executor: the agent; the Oracle at open, review and close.

---

## 2. Preconditions

- A mission card made from `machine/templates/MIS-TEMPLATE.md`, in the
  archive (`STD-025`).
- A clone on a fresh pull, so the next free number is really free (`IDN-015`).

---

## 3. Procedure

1. **Open the card (Oracle).** From `machine/templates/MIS-TEMPLATE.md`, the
   next free number verified after a pull (`IDN-015`), state `todo`, by pull
   request.
2. **Read the whole card (agent).** Every field, before anything else
   (`MSN-041`).
3. **Answer three questions before the first action.** The deliverable, what
   done looks like, and the first concrete action — a tool call or a file
   write, never "research". If any is unclear, ask.
4. **Raise every blocker before starting.** A dependency, a key, an access or
   a decision the mission needs is raised now, not after. Blocked: set
   `on-hold` with its reason (`MSN-039`) and tell the Oracle.
5. **Stop at a contradiction with the principles.** Escalate (`PRO-005`)
   rather than execute against them.
6. **Announce a mission of effort M or larger,** or one worked live with the
   Oracle: state the mission, the estimate and the first action. Smaller work
   may start silently.
7. **Activate the card.** `in-progress`, `started`, and commit it
   (`MSN-002`). No work begins before this commit (`MSN-036`).
8. **Execute and record.** Progress and every change of plan go in the card.
   Agents coordinate through commits, pull requests and the card; there is no
   real-time channel. Agents do not assign each other work, and an ambiguity
   is escalated, never settled by overwriting another's work.
9. **Verify and ask for review.** Verify every acceptance criterion, fill
   Closure with what was done, what diverged and the evidence, then set
   `in-review` and `in_review_at`. The request is scored (`PRO-008`).
10. **Close (Oracle).** `done` with `completed`, or back to `in-progress` with
    the changes requested.

Freezing and unfreezing a card: `MSN-039`. Deleting a closed card: `MSN-004`.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 3 | The three answers in the card or in the opening message |
| 7 | The activation commit predates the first work commit |
| 9 | Every criterion marked with its command; Closure dated |

---

## 5. Escalation

A contradiction with the principles, a blocker the agent cannot lift, or a
conflict with an active mission: `PRO-005`. An identifier collision:
`IDN-015`; the second renumbers and fixes its own references.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-025` | A mission is a card | the artefact this procedure executes |
| `STD-018` | One document, one identifier | `IDN-015`: first commit keeps the number |
| `PRO-005` | Escalating to the Oracle | blockers, contradictions, conflicts |
| `PRO-008` | Requesting approval, issuing rulings | the review request is scored |
