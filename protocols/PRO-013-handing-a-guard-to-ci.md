---
id: "PRO-013"
uid: ""
title: "Handing a guard to CI"
type: protocol
status: draft
version: "4.0.0"
created: "2026-08-28T15:30:00Z"
created_source: "git:3d01bc2"
created_confidence: exact
updated: "2026-09-10T19:15:00+02:00"
author: "ursa"
owner: "oracle"
tags: [protocol, ci, guards, engineering]
license: "CC0-1.0"
guild: "Alchemists"
territory: "Archive"
visibility: "public"
applies_to: [all-agents]
mandatory: true
related: ["STD-005", "STD-015", "PRO-016"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-013 — Handing a guard to CI

> **Summary:** How a verification guard written by an agent reaches the
> pipeline: it is merged into the guards folder, and the runner the
> workflow already calls picks it up. The agent still cannot edit the
> workflow file.
> **Epistemic:** An agent that can rewrite the pipeline can disable the
> checks that constrain it. The boundary stays; what moved is that a guard
> no longer needs a line in the pipeline to exist.
> **Pragmatic:** Three steps, two of them the agent's, one the Oracle's.
> **Audience:** Agents · Oracle

**Binds:** any agent that writes a guard script, and the Oracle who wires it.
**Does not bind:** what a guard must check (`STD-015`).

## 1. Trigger

A task produces a script meant to fail a build. Reached from `PRO-016`
step 6. Executor: the agent; the Oracle for the review.

## 2. Rules

**GRD-001 — Tested in both directions.** A guard MUST fail on planted
breakage and pass on a clean tree before it is offered.

**GRD-002 — Every finding, every run.** A guard reports everything it sees;
it never keeps a list of what to ignore. Whether a finding fails the build
is not the guard's call: the state of the standard that holds the rule
decides (`ENG-067`). A guard that hides old damage looks like coverage.

**GRD-003 — Every finding cites its plate.** Each finding MUST name the rule
that condemns it, so a failure is actionable without reading the script.

**GRD-004 — One mode, deterministic.** Bare prints every finding and exits
non-zero only when a finding's rule is in force (`ENG-067`: the holder
standard is `active`). No flag changes what is checked. Same tree, same
output.

**GRD-005 — The workflow is not touched.** A guard needs no workflow change:
the runner finds it. A guard that needs a new job, permission or action is
a separate ask (`PRO-005`); the agent never edits the workflow file.

**GRD-006 — The register of guards is the folder.** No document MAY keep a
table of guards. What runs is what the runner finds; `npm run guards` lists
it when asked. A script that is in the folder runs; one that must not run
as a guard does not live there.

**GRD-007 — Wired means seen running on the trunk.** The handoff ends when
the agent reports the run identifier of the runner's step on `main` showing
the new guard, not when the pull request is merged (`TRC-006`).

## 3. Procedure

| Step | Whose | What |
|---|---|---|
| 1 | agent | Write and test the guard (`GRD-001..004`); declare blindness (`TRC-007`); place it in the guards folder. A guard that reads build output says so where the runner reads it. |
| 2 | Oracle | Review and merge the pull request. This is the control: a guard that is not merged does not run. |
| 3 | agent | Read the trunk run and report the identifier of the runner's step showing the guard (`GRD-007`). |

## 4. Verification

| Check | Evidence |
|---|---|
| Both directions | planted-breakage run and clean run in the PR body |
| Wired | `npm run guards` on the merged tree lists the guard |
| Seen running | `gh run view <id> --log \| grep '<guard name>'` on `main`, id reported |

## 5. Escalation

A guard that needs a new job, permission or action: `PRO-005`, the ask
stated separately from the guard.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-005` | When a rule bites | `ENG-031`, `ENG-032`: wiring, register; `ENG-067`: when a finding fails the build |
| `STD-015` | Engineering checks | `TRC-006`, `TRC-007`: proof by step, declared blindness |
| `PRO-016` | Applying the engineering standard | the task this continues |
