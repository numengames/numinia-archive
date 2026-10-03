---
id: "PRO-013"
uid: ""
title: "Handing a check to CI"
type: protocol
status: draft
version: "5.1.2"
created: "2026-08-28T15:30:00Z"
created_source: "git:3d01bc2"
created_confidence: exact
updated: "2026-10-03T20:30:00+02:00"
author: "ursa"
owner: "oracle"
tags: [protocol, ci, checks, engineering]
license: "CC0-1.0"
guild: "Alchemists"
section: "Technology"
visibility: "public"
applies_to: [all-agents]
mandatory: true
related: ["STD-005", "STD-015", "PRO-016"]
derived_from: "CAN-010"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-013 — Handing a check to CI

> **Summary:** How a verification check written by an agent reaches the
> pipeline: it is merged into the guards folder, and the runner the
> workflow already calls picks it up. The agent still cannot edit the
> workflow file.
> **Epistemic:** How does a check an agent wrote come to run in CI?
> **Pragmatic:** Three moves, two of them the agent's, one the Oracle's.
> **Audience:** Agents · Oracle

**Binds:** any agent that writes a check script, and the Oracle who wires it.

## 1. Purpose and trigger

A task produces a script meant to fail a build. Reached from `PRO-016`
step 9. Executor: the agent; the Oracle for the review.

## 2. Preconditions

- A check script written and run locally, reached from step 9 of Applying
  the engineering standard (`PRO-016`).
- The standard that holds the check's rules, with their rule IDs.
- A clone of `main` where `npm run guards` runs.

## 3. Procedure

Steps are the agent's, save step 6, which is the Oracle's.

1. **Report every finding, every run.** No ignore list: a check that hides
   old damage looks like coverage. Whether a finding fails the build is
   decided by the state of the standard that holds its rule (`ENG-067`), not
   by the check.
2. **Name the rule ID in every finding**, so a failure is actionable without
   reading the script.
3. **Keep one deterministic mode.** Bare, it prints every finding and exits
   non-zero only when a finding's holder standard is `active` (`ENG-067`).
   No flag changes what is checked; same tree, same output.
4. **Test both directions.** Fail on planted breakage, pass on a clean tree,
   before offering it. Declare blindness (`TRC-007`).
5. **Place it in the guards folder and touch nothing else.** The runner
   finds it; never edit the workflow file. A script that must not run as a
   check does not live there. A check that reads build output says so where
   the runner reads it. Keep no table of checks in any document: `npm run
   guards` lists what runs.
6. **The Oracle reviews and merges the pull request.** This is the control:
   a check that is not merged does not run.
7. **Report the run on `main`.** The handoff ends when the run identifier of
   the runner's step on `main` shows the check, not at merge (`TRC-006`).

## 4. Verification

| Check | Evidence |
|---|---|
| Both directions | planted-breakage run and clean run in the PR body |
| Wired | `npm run guards` on the merged tree lists the check |
| Seen running | `gh run view <id> --log \| grep '<guard name>'` on `main`, id reported |

## 5. Escalation

A check that needs a new job, permission or action: `PRO-005`, the ask
stated separately from the check.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-005` | When a rule bites | `ENG-031`, `ENG-032`: wiring, register; `ENG-067`: when a finding fails the build |
| `STD-015` | Engineering checks | `TRC-006`, `TRC-007`: proof by step, declared blindness |
| `PRO-016` | Applying the engineering standard | the task this continues |
