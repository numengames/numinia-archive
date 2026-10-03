---
id: "PRO-001"
uid: ""
title: "Opening and closing a session"
type: protocol
status: draft
version: "2.1.1"
created: "2026-04-08T06:02:27Z"
created_source: "git:a5b6a0d"
created_confidence: exact
updated: "2026-10-03T19:40:00+02:00"
author: "nimrod"
owner: "oracle"
section: "People and culture"
tags: [protocol, briefing, startup, session, close, context, mandatory]
applies_to: [all-agents]
mandatory: true
license: "CC0-1.0"
related: ["PRO-003", "PRO-005", "PRO-016", "OPS-008", "OPS-009", "SYS-001", "STD-020", "STD-022", "STD-025"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-001 — Opening and closing a session

> **Summary:** The life of an agent session: how it opens, how its context
> load is watched, how it closes. Mandatory, no exceptions.
> **Epistemic:** What does an agent do when a session opens, how does it know it is degrading, and what must be true before it ends?
> **Pragmatic:** Opening at the start of every session, monitoring
> throughout, closing at the end.
> **Audience:** Agents

**Binds:** every agent, in every session, whatever the mission.

## 1. Purpose and trigger

A session starts; a session is about to end, to be interrupted, or to hand
its mission to another agent. Executor: the agent.

## 2. Preconditions

- A checkout of the repository the session works in, with push access.
- The agent's own folder under `agents/`, with its `SOUL.md` and
  `OPERATOR.md`.
- A channel to the operator for the whole session: the close is told there.

## 3. Procedure

**Open** — before any read or write. Urgency skips none of it: urgency is
the protocol's enemy.

1. **Pull the trunk.** If it brought new commits, read `CHANGELOG.md`.
2. **Read your identity.** Read your own `SOUL.md` and `OPERATOR.md`
   before acting.
3. **Read `AGENTS.md`**, the repository's instructions to agents.
4. **Read `OPS-009` every session.** Read `STD-009` and `STD-017` to
   `STD-022` if you have not read them within the last seven days.
5. **Check the missions board.** List the missions `in-progress` assigned
   to you and those `in-review` awaiting the Oracle.
6. **Start a new mission with its briefing** (`PRO-003`), never with
   execution. Read its card whole, never by title (`STD-025`, `MSN-041`).
7. **Audit the branch before trusting it.** Read what is actually checked
   out; never assume it matches `AGENTS.md`, a README or the mission card.
8. **Work from the checked-out tree.** Never from a copy pasted elsewhere.
9. **Read what the mission names, only that.** The protocol the mission
   cites; the standard that governs the artefact it touches; `canon/` only
   for an explicit philosophical question. A question no document answers
   is a gap: escalate it (`PRO-005`), do not fill it.

**Monitor** — throughout the session.

10. **Score your context load** from 1 to 10, adding the signs below.
11. **At 7–8, warn.** Tell the operator, recapitulate — done, current
    state, pending — and close if he agrees.
12. **At 9–10, close now.**

| Sign | Points |
|---|---|
| over four hours in session | +2 |
| more than five topics | +2 |
| over twenty tool calls | +1 |
| more than three architectural decisions | +2 |
| cannot recall how the session started | +2 |

| Score (1–10) | State |
|---|---|
| 1–6 | operable |
| 7–8 | warn the operator (step 11) |
| 9–10 | close now (step 12) |

**Close** — what is not written did not happen; a mental note is not
persistence.

13. **Write down decisions.** Decisions taken go to `decisions/` as a
    decision record, or to the mission they belong to.
14. **Update the `divergence_log`** of every mission still in progress.
15. **Write where to pick up** in `OPS-008`.
16. **Commit and push the branch.** Without commit and push there is no
    valid close.
17. **Open the pull request.** The trunk is reached by pull request
    (`STD-020`); never merge it yourself.
18. **Declare the close** — agent, timestamp, missions still active,
    recommended next step — and tell the operator in chat what changed,
    what is verified and what is left, with the pull request's web address.

Secrets are handled as `OPS-009` and `STD-022` say, in every session.

## 4. Verification

| Check | Evidence |
|---|---|
| Synced | `git log -1 origin/main` equals the local trunk at open |
| Persisted | `divergence_log` dated today on every in-progress mission; `OPS-008` updated |
| Closed | the closing commit is on a pushed branch with an open pull request |
| Declared | the close declaration: agent, timestamp, active missions, next step |

Sync, source and close are executed by hand: they leave no artefact a guard
can read.

## 5. Escalation

Load at 9 and the operator does not answer: close anyway (steps 13–18) and
state in `OPS-008` why. A mission assigned that has no briefing: `PRO-005`.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `PRO-003` | Running a mission | the briefing a new mission opens with |
| `PRO-005` | Escalating to the Oracle | where a gap or a mission without briefing goes |
| `OPS-008` | Session state | where to pick up is written at close |
| `OPS-009` | Secrets handling | read every session |
| `STD-020` | Git is the archive | the trunk is reached by pull request |
| `STD-022` | Secrets | how secrets are handled in every session |
| `STD-025` | A mission is a card | the card is read whole, never by title |
| `SYS-001` | CAO architecture | the protocol chain a session runs through |
