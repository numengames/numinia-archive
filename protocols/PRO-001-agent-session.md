---
id: "PRO-001"
uid: ""
title: "Opening and closing a session"
type: protocol
status: draft
version: "1.0.1"
created: "2026-04-08T06:02:27Z"
created_source: "git:a5b6a0d"
created_confidence: exact
updated: "2026-09-10T12:30:00+02:00"
author: "nimrod"
owner: "oracle"
tags: [protocol, briefing, startup, session, close, context, mandatory]
applies_to: [all-agents]
mandatory: true
license: "CC0-1.0"
related: ["PRO-003", "PRO-016", "OPS-008", "OPS-009", "SYS-001"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-001 — Opening and closing a session

> **Summary:** The life of an agent session: how it opens, how its context
> load is watched, how it closes. Mandatory, no exceptions.
> **Epistemic:** An agent without context has no direction; an agent that
> never stops degrades; a session that did not commit did not happen.
> **Pragmatic:** Opening at the start of every session, monitoring
> throughout, closing at the end.
> **Audience:** Agents

**Binds:** every agent, in every session, whatever the mission.
**Does not bind:** the mission itself (`PRO-003`), the task inside it
(`PRO-016`), nor how an agent is admitted to the roster.

## 1. Trigger

A session starts; a session is about to end, to be interrupted, or to hand
its mission to another agent. Executor: the agent.

## 2. Rules

**SES-042 — Sync before anything.** A session must begin with the trunk
pulled, before any read or write. New commits mean `CHANGELOG.md` is read.

**SES-001 — Identity before action.** The agent must read its own
`SOUL.md` and `OPERATOR.md` before acting. Urgency does not skip this;
urgency is the protocol's enemy.

**SES-002 — The board before the work.** The agent must check the missions
`in-progress` assigned to it and those `in-review` awaiting the Oracle. A
new mission starts with its briefing (`PRO-003`), never with execution.

**SES-003 — Read what the mission names, only that.** The protocol the
mission cites; the standard that governs the artefact it touches; `canon/`
only for an explicit philosophical question. A question no document
answers is a gap: escalated (`PRO-005`), not filled.

**SES-044 — From the tree, never from a paste.** The agent works from the
corpus as checked out, not from a copy pasted elsewhere.

**SES-004 — Load is reported, not endured.** At context load 7 or above
the agent must tell the operator, recapitulate — done, current state,
pending — and close if the operator agrees.

**SES-005 — What is not written did not happen.** Before close, decisions
taken go to `decisions/` or to the mission; missions in progress get their
`divergence_log` updated; where to pick up goes to `OPS-008`. A mental
note is not persistence.

**SES-043 — Close is a commit.** A session ends with its record committed
and the branch pushed; the trunk is reached by pull request (`STD-020`).
Without commit and push there is no valid close.

## 3. Procedure

**Open.** 1 pull (`SES-042`). 2 `SOUL.md`, `OPERATOR.md` (`SES-001`).
3 `OPS-009` every session; `STD-009`, `STD-017..022` if not read within
seven days. 4 the board (`SES-002`). 5 what the mission names (`SES-003`).

**Monitor.** Score the load: over four hours +2; more than five topics +2;
over twenty tool calls +1; more than three architectural decisions +2;
cannot recall the start +2. 1–6 operable; 7–8 warn (`SES-004`); 9–10 close
now.

**Close.** Inventory (`SES-005`); commit, push, open the pull request
(`SES-043`); declare it — agent, timestamp, missions still active,
recommended next step.

## 4. Verification

| Check | Evidence |
|---|---|
| Synced | `git log -1 origin/main` equals the local trunk at open |
| Persisted | `divergence_log` dated today on every in-progress mission |
| Closed | the closing commit is on a pushed branch with a pull request |

`SES-042`, `SES-043`, `SES-044` are executed by hand: sync, close and
source leave no artefact a guard can read.

## 5. Escalation

Load at 9 without the operator answering: close anyway (`SES-043`), state
in `OPS-008` why. A mission assigned that has no briefing: `PRO-005`.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `PRO-003` | Mission cycle | the briefing a new mission opens with |
| `OPS-008` | Session state | where to pick up is written at close |
| `OPS-009` | Secrets handling | read every session |
| `SYS-001` | CAO architecture | the protocol chain a session runs through |
