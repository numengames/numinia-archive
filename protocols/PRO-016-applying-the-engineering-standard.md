---
id: "PRO-016"
uid: ""
title: "Applying the engineering standard"
type: protocol
status: draft
version: "2.0.1"
created: "2026-09-08T21:30:00Z"
updated: "2026-09-10T12:30:00+02:00"
author: "ursa"
owner: "oracle"
tags: [protocol, engineering, agents]
license: "CC0-1.0"
applies_to: [all-agents]
mandatory: true
territory: "Platform"
related: ["STD-005", "STD-015", "PRO-005", "PRO-013"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-016 — Applying the engineering standard

> **Summary:** The order a coding agent follows on any task in a repository
> that carries `STD-005`, and the line between what it does alone and what
> waits for the Oracle.
> **Epistemic:** The standard says what holds; this protocol says how a task
> honours it without weakening a check to pass.
> **Pragmatic:** Six steps before pushing, two tiers of permission, one
> report shape.
> **Audience:** Agents · Oracle

**Binds:** any agent executing a task in a repository that carries `STD-005`.
**Does not bind:** the practices themselves (`STD-005`, `STD-015`) nor which
copy of the standard a repository owns (`STD-005`).

## 1. Trigger

Every task in a repository that contains or cites `STD-005`. Executor: the
agent on `PRO-001` session. The Oracle enters only at the irreversible tier.

## 2. Rules

**TSK-001 — The tree is audited before it is trusted.** The agent must read
the branch before assuming it matches the standard, the README or the brief.

**TSK-002 — Every task is classified before it starts.** Cosmetic —
formatting, lint fixes, typos, added tests — proceeds. Irreversible —
visibility, licences, secrets, history, publishing, force operations — must
stop and reach the Oracle. In doubt, it is irreversible.

**TSK-003 — Practices are named by plate.** Commits and pull requests must
cite the practices they touch by identifier (`fix: read-only workflow tokens
(SEC-008)`).

**TSK-004 — A check is never weakened to pass.** Lowering a threshold,
skipping a test, adding an ignore or unpinning an action is a change to the
standard: it must come as a decision record, never as a side effect.

**TSK-005 — Debt seen in passing is reported, not fixed.** `[MANUAL]`
violations the task did not touch must go to the closing report and the
repository's TODO (`TRC-005`), not into the task.

## 3. Procedure

1. Audit the branch (`TSK-001`).
2. Load `CLAUDE.md` (`AGT-001`): Scorecard scope, AI stance (`AGT-006`),
   local overrides. If it is missing, that is the first finding.
3. Classify the task (`TSK-002`).
4. Do the work, naming practices (`TSK-003`).
5. Run the checks locally; CI remains the authority (`ENG-001`).
6. Report (§4). If the task is a guard, continue in `PRO-013`.

**Autonomous tier.** Mechanical `[AUTO]` fixes — pin an action by SHA, add
`SECURITY.md` from the template, sync labels, complete `.env.example`;
tests, comments, TSDoc; proposals moving `[MANUAL]` to `[AUTO]`.

**Oracle tier.** Repository visibility (`LEG-001`); any `LICENSE`, SPDX
header or REUSE structure; credentials; the principles of `STD-005`; any
check (`TSK-004`); force-push, history rewrite, deleting branches or tags on
`main`.

## 4. Verification

| Check | Evidence |
|---|---|
| Practices named | plates in the commit messages and the PR body |
| Checks ran | local run recorded in the closing report; CI green on the PR |
| Nothing weakened | the diff touches no threshold, ignore, pin or workflow |
| Debt reported | `[MANUAL]` seen in passing listed in the report and the TODO |

## 5. Escalation

The irreversible tier and any check that would have to be weakened go to
the Oracle through `PRO-005`, with the decision record drafted.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-005` | Engineering baseline | the principles this protocol applies |
| `STD-015` | Engineering checks | the practice register the plates come from |
| `PRO-005` | Escalation | how the Oracle tier is reached |
| `PRO-013` | Handing a guard to CI | continues this when the task is a guard |
