---
id: "PRO-016"
uid: ""
title: "Applying the engineering standard"
type: procedure
status: draft
version: "3.2.0"
created: "2026-09-08T21:30:00Z"
updated: "2026-10-20T06:42:13+02:00"
author: "ursa"
owner: "oracle"
tags: [procedure, engineering, agents]
license: "CC0-1.0"
applies_to: [all-agents]
mandatory: true
section: "Technology"
related: ["STD-005", "STD-015", "STD-004", "STD-010", "STD-020", "PRO-005", "PRO-013"]
derived_from: "PRI-010"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-016 — Applying the engineering standard

> **Summary:** The order a coding agent follows on any task in a repository
> that carries `STD-005`, and the line between what it does alone and what
> waits for the Oracle.
> **Epistemic:** In what order does an agent carry out a coding task, and what must it leave to the Oracle?
> **Pragmatic:** Nine steps before pushing, two tiers of permission, one
> report shape.
> **Audience:** Agents · Oracle

**Binds:** any agent executing a task in a repository that carries `STD-005`.

## 1. Purpose and trigger

Every task in a repository that contains or cites `STD-005`. Executor: the
agent on `PRO-001` session. The Oracle enters only at the irreversible tier.

## 2. Preconditions

- A checkout of the repository the task is in, and its checks runnable
  locally.
- The task stated: what changes and why.
- A channel to the Oracle for anything on the irreversible tier.

## 3. Procedure

1. **Audit the branch.** Read the tree before assuming it matches the
   standard, the README or the brief.
2. **Load `AGENTS.md`.** It is the platform-neutral layer (`CLAUDE.md` is
   the Claude adapter): Scorecard scope, AI stance (`AGT-006`), local
   overrides. If it is missing, that is the first finding.
3. **Classify the task before it starts.** Cosmetic — formatting, lint
   fixes, typos, added tests — proceeds. Irreversible — visibility,
   licences, secrets, history, publishing, force operations — stops and
   reaches the Oracle (the Oracle tier below). In doubt, it is
   irreversible.
4. **Write the test first.** Write the test that describes the change, run
   it, see it fail, and commit it as `test(...)` before the `fix`/`feat`
   commit (`STD-015` DEV-008).
5. **Do the work, naming practices by rule ID.** Commits and pull requests
   cite the practices they touch by their `STD-015` identifier
   (`fix: read-only workflow tokens (SEC-008)`).
6. **Never weaken a check to pass.** Lowering a threshold, skipping a
   test, adding an ignore or unpinning an action is a change to the
   standard: it comes as a decision record, never as a side effect.
7. **Confirm it is ours to publish.** Before the pull request, name where
   every new file, image, text or snippet came from (`LIC-001`); keep a
   licence or obligation inherited from someone else's work apart, never
   folded into ours (`LIC-004`); say when the work is a client's and
   belongs to the client (`LIC-010`); confirm a CC0 gift waives only our
   part, never a recognisable person's publicity or privacy right
   (`LIC-012`). A gap here is Oracle tier.
8. **Register a new header field.** In the same pull request: a row in
   the field's standard, and a decision record saying why (`HDR-042`).
9. **Say what you left better.** One line in the pull request naming a
   debt paid down, a doc clarified or a check tightened, even off-task
   (`GIT-050`).
10. **Report debt, do not fix it.** `[MANUAL]` violations seen in passing
    that the task did not touch go to the closing report and the
    repository's TODO (`TRC-005`), not into the task.
11. **Run the checks locally.** CI remains the authority (`ENG-001`).
12. **Report.** If the task is a check, continue in `PRO-013`.

**Autonomous tier.** Formatting, lint fixes, typos, added tests; mechanical
`[AUTO]` fixes — pin an action by SHA, add `SECURITY.md` from the template,
sync labels, complete `.env.example`; comments, TSDoc; proposals moving
`[MANUAL]` to `[AUTO]`.

**Oracle tier.** Repository visibility (`LEG-001`); any `LICENSE`, SPDX
header or REUSE structure; credentials and secrets; publishing; the
principles of `STD-005`; weakening any check; force-push, history rewrite,
deleting branches or tags on `main`.

## 4. Verification

| Check | Evidence |
|---|---|
| Practices named | rule IDs in the commit messages and the PR body |
| Test first | the `test(...)` commit precedes the `fix`/`feat` commit in the PR |
| Checks ran | local run recorded in the closing report; CI green on the PR |
| Nothing weakened | the diff touches no threshold, ignore, pin or workflow — or a decision record carries the change |
| Provenance and licence stated | step 7's answer in the PR body (`LIC-001/004/010/012`) |
| Header field registered | the field's standard gains a row, a decision cites it (`HDR-042`) |
| Left better, said so | one line in the PR body (`GIT-050`) |
| Debt reported | `[MANUAL]` seen in passing listed in the report and the TODO |

## 5. Escalation

The Oracle tier and any check that would have to be weakened go to the
Oracle through `PRO-005`, with the decision record drafted.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-005` | When a rule bites | the principles this procedure applies |
| `STD-015` | Engineering checks | the practice register the rule IDs come from, test-first included |
| `STD-004` | The header | `HDR-042`: a field's row and decision |
| `STD-010` | Licensing | `LIC-001/004/010/012`: step 7's confirmation |
| `STD-020` | Git is the archive | `GIT-050`: the PR says what it left better |
| `PRO-005` | Escalating to the Oracle | how the Oracle tier is reached |
| `PRO-013` | Handing a check to CI | continues this when the task is a check |
