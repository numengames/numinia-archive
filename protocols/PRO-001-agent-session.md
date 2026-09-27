---
id: "PRO-001"
uid: ""
title: "Opening and closing a session"
type: protocol
status: draft
version: "2.0.0"
created: "2026-04-08T06:02:27Z"
created_source: "git:a5b6a0d"
created_confidence: exact
updated: "2026-09-27T13:00:00+02:00"
author: "nimrod"
owner: "oracle"
tags: [protocol, briefing, startup, session, close, context, mandatory]
applies_to: [all-agents]
mandatory: true
license: "CC0-1.0"
related: ["PRO-005", "PRO-016", "STD-020", "STD-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-001 — Opening and closing a session

> **Summary:** The life of an agent session: how it opens, what it works
> from, how it closes. Mandatory, no exceptions.
> **Epistemic:** What does an agent do when a session opens, and what must be true before it ends?
> **Pragmatic:** Opening at the start of every session, closing at the end.
> **Audience:** Agents

**Binds:** every agent, in every session, whatever the mission.

## 1. Trigger

A session starts; a session is about to end, to be interrupted, or to hand
its work to another agent. Executor: the agent.

## 2. Procedure

**Open** — before any read or write, and urgency skips none of it.

1. **Pull the trunk.** If it brought new commits, read `CHANGELOG.md`.
2. **Read your identity.** If you have an `agents/<name>/` folder, read
   your `SOUL.md` and `OPERATOR.md` before acting.
3. **Read `AGENTS.md`.** It states what binds today.
4. **Audit the branch before trusting it.** Read what is actually checked
   out; never assume it matches `AGENTS.md`, a README or the brief.
5. **Work from the checked-out tree.** Never from a copy pasted elsewhere.
6. **Read what governs what you touch, only that.** The standard that
   governs the artefact; the protocol the task needs; `canon/` only for an
   explicit philosophical question. A question no document answers is a
   gap: escalate it (`PRO-005`), do not fill it.

**During**

7. **Say when you have lost track.** If the session has grown long and you
   can no longer hold its thread, tell the operator and recap — done,
   current state, pending — rather than continue blind; close if he agrees.

**Close** — what is not written did not happen; a mental note is not
persistence.

8. **Write down decisions.** A decision the operator stated in chat goes in
   the `CHANGELOG.md` entry and the commit body.
9. **Commit and push the branch.** Without commit and push there is no
   valid close.
10. **Open the pull request.** The trunk is reached by pull request
    (`STD-020`); never merge it yourself.
11. **Tell the operator in chat** what changed, what is verified and what
    is left, with the pull request's address.

Secrets are handled as `STD-022` says, in every session.

## 3. Verification

| Check | Evidence |
|---|---|
| Synced | `git log -1 origin/main` equals the local trunk at open |
| Closed | the closing commit is on a pushed branch with an open pull request |
| Reported | the closing chat message: changed, verified, left |

Sync, source and close are executed by hand: they leave no artefact a guard
can read.

## 4. Escalation

Lost track and the operator does not answer: close anyway (steps 8–10) and
say in the pull request why. A task whose instruction is unclear: `PRO-005`.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `PRO-005` | Escalating to the Oracle | where a gap or an unclear task goes |
| `STD-020` | Git is the archive | the trunk is reached by pull request |
| `STD-022` | Secrets | how secrets are handled in every session |
