---
id: "PRO-005"
uid: ""
title: "Escalating to the Oracle"
type: protocol
status: draft
version: "3.0.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-09-27T13:00:00+02:00"
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
> **Epistemic:** When does an agent stop and ask the Oracle, and what does it send?
> **Pragmatic:** A standalone page on purpose: a protocol invoked under
> pressure must be findable in one second.
> **Audience:** Agents

**Binds:** any agent facing a decision it may not, or cannot, take alone.

## 1. Trigger

Any of: the task contradicts the canon (`PRE-003`); the decision exceeds
the agent's rank (`AUT-065`); the agent is blocked; a possible security
issue; `requires_oracle_approval: true`; doubt about whether an act is
appropriate (`AUT-010`). A matter of taste is not a trigger: a preference
does not stop the work, so do not escalate it as if it did. Executor: the
agent. Receiver: the Oracle.

## 2. Procedure

1. **Stop.** In doubt whether you may act, do not act (`AUT-010`).
2. **Write it where the work is.** In the chat with the operator, and in
   the pull request if one is open.
3. **Send it straight to the Oracle.** No intermediate agent exists; a
   route through a non-existent actor is how an escalation is lost.
4. **Carry a judgement.** State the options you weighed, each with its
   consequence, and your own recommendation — options without a judgement
   move the work, not the decision. Use this shape:

```
ESCALATION
Where: task in one line · PR or file
Issue: one paragraph
Options: A) … → consequence  B) … → consequence
Recommendation: A / B / other
Requires: decision · information · access
```

5. **Wait.** The Oracle's answer follows `PRO-008`.
6. **After 48 hours unanswered, take only the reversible option.** Record
   the assumption where the work is. Irreversible acts keep waiting.

## 3. Verification

| Check | Evidence |
|---|---|
| It was escalated, not decided | the escalation text in the chat or the pull request, dated |
| It carried a judgement | a `Recommendation:` line that names one option |
| The wait was honoured | no irreversible commit between the escalation and the answer |

## 4. Escalation

This is the escalation. An escalation that cannot reach the Oracle is
recorded where the work is, and the work stops.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-017` | Who may change what | `AUT-010`, `AUT-065`: when the agent may not act |
| `PRO-008` | Requesting approval, issuing rulings | the other direction: how the Oracle answers |
