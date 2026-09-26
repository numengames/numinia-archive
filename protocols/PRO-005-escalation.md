---
id: "PRO-005"
uid: ""
title: "Escalating to the Oracle"
type: protocol
status: draft
version: "2.0.1"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-09-10T12:30:00+02:00"
author: "nimrod"
owner: "oracle"
tags: [protocol, escalation, security]
applies_to: [all-agents]
mandatory: true
license: "CC0-1.0"
related: ["STD-017", "PRO-008"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-005 — Escalating to the Oracle

> **Summary:** When an agent stops and asks instead of deciding, what it
> sends, and how long it waits.
> **Epistemic:** The cost of a wrong escalation is a message. The cost of a
> wrong autonomous decision is the archive.
> **Pragmatic:** A standalone page on purpose: a protocol invoked under
> pressure must be findable in one second.
> **Audience:** Agents

**Binds:** any agent facing a decision it may not, or cannot, take alone.

## 1. Trigger

Any of: a mission contradicts the canon (`PRE-003`); the decision exceeds
the agent's rank (`AUT-065`); the agent is blocked; a possible security
issue; `requires_oracle_approval: true`; doubt about whether an act is
appropriate (`AUT-010`). Executor: the agent. Receiver: the Oracle, with no
intermediate layer.

## 2. Rules

**ESC-001 — In doubt, escalate; do not act.** An agent that is unsure
whether it may act MUST stop and escalate. `AUT-010` applied.

**ESC-002 — The escalation carries a recommendation.** Every escalation
MUST state the options evaluated with their consequences and the agent's
own recommendation. Options without a judgement move the work, not the
decision.

**ESC-003 — Forty-eight hours, then the reversible option.** An escalation
unanswered after 48 hours MAY proceed with the reversible option, the
assumption recorded where the work is. Irreversible acts wait.

**ESC-004 — A preference is not a blocker.** An agent MUST NOT escalate a
matter of taste as if it stopped the work.

**ESC-005 — Straight to the Oracle.** Escalations go to the Oracle. No
routing through an intermediate agent: none exists, and a route through a
non-existent actor is how an escalation is lost.

## 3. Procedure

1. Detect and stop (`ESC-001`).
2. Write it where the work is: the mission, or a decision record if the
   matter is structural.
3. Send, in this shape (`ESC-002`):

```
ESCALATION
Mission: MIS-NNNN
Issue: one paragraph
Options: A) … → consequence  B) … → consequence
Recommendation: A / B / other
Requires: decision · information · access
```

4. Wait (`ESC-003`). The Oracle's answer follows `PRO-008`; a structural
   ruling becomes a decision record.

## 4. Verification

| Check | Evidence |
|---|---|
| It was escalated, not decided | the escalation text in the mission or record, dated |
| It carried a judgement | a `Recommendation:` line that names one option |
| The wait was honoured | no irreversible commit between the escalation and the answer |

## 5. Escalation

This is the escalation. An escalation that cannot reach the Oracle is
recorded where the work is and the work stops.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-017` | Who may change what | `AUT-010`, `AUT-065`: when the agent may not act |
| `PRO-008` | Decision | the other direction: how the Oracle answers |
