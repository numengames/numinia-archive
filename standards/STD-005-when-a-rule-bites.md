---
title: "When a rule bites"
id: "STD-005"
uid: ""
type: documentation
subtype: standard
status: draft
version: "4.0.2"
created: "2026-08-17T21:55:38+02:00"
created_source: "git:e3123fc"
created_confidence: exact
updated: "2026-09-26T20:00:00+02:00"
author: "pablofm"
owner: "oracle"
territory: "Platform"
tags: [standards, engineering, ci, guards]
license: "CC0-1.0"
absorbs: ["STD-011"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# When a rule bites

> **Summary:** A rule is worth the machine that checks it. A guard fails the
> build only while the standard holding its rule is signed. A guard over the
> thing built always fails. Five repositories share one pipeline.
> **Epistemic:** When a guard fails the build, and how guards and the shared
> pipeline come to run.
> **Pragmatic:** Write, wire or read a guard, and know whether a red build is
> a broken rule or a broken artefact.
> **Audience:** Agents · Oracles

**Binds:** this repository and every workspace born from it; personal repositories SHOULD follow.

## Rules

These rules are edited here and come from nowhere else. A workspace receives
them at birth and owns them from then on.

### What a rule is worth

**A rule that does not fail a build is prose.** The automatic checks that run
on every change are the authority. The documentation explains them. For an
agent, a rule that no guard runs does not exist.

**Every practice names its check.** Each practice in the register of
engineering checks MUST say which machine checks it, or say plainly that a
person does. Checking by hand is debt, and what a machine can check MUST NOT
be audited by hand.

**A guard that fails on unstated behaviour is the defect.** When a guard
fails on something no rule asks for, fix the guard or write the rule. Never
bend the work to fit the guard.

**A guard bites by the state of its rule.** A finding fails the build only
while the standard holding the rule it cites is active. While that standard
is a draft, the guard reports the finding and lets the build pass.

**Signing a standard switches its guards on.** The guard reads the standard's
state from its header each time it runs, never from its own settings. A
finding that cites no rule has no state to read and MUST NOT fail a build.

**A guard over the artefact bites always.** A guard that checks the thing
built, rather than a rule, fails regardless: the build itself, fresh
measurements, links inside the site, stray pages, cited addresses that still
answer. It says so where it lists what it cannot see.

### How guards come to run

**A guard runs from the change that merges it.** A guard is a script in the
guards folder. The runner finds it there and runs it. No document or workflow
line makes it exist. A script that must not run as a guard lives elsewhere.

**The list of guards is read, never remembered.** What runs is what the
runner finds in the guards folder. The workflow calls the runner and names no
guard, because a list written by hand is stale the day it is written.

The practices a repository keeps, such as its security score, its changelog
and its incident reviews, are rows of the register of engineering checks,
each with its check.

This standard is over its word budget because the shared pipeline must be
read whole to be copied.

### The family pipeline

Five repositories run the same guards. Four serve a site: this archive, the
Numinia site, the Numen Games site and the workspace deployer. The fifth, the
store of shared resources, serves none. A guard is a step or a script that
says whether something is wrong with the change under review. The rule on
when a guard bites sorts guards into two kinds:

| Kind | Steps, in this order | Fails the build? |
|---|---|---|
| Artefact | install → type-check → lint → test → build → share card (`web/scripts/share-card.mjs --check`) → version bump (`machine/scripts/check-version-bump.mjs`) | Yes. A page that does not build, a test that fails, a favicon that is missing or a version that did not move is a broken artefact whatever any standard says. |
| Rule | presence of the files a new repository is born with (see the register of engineering checks) · REUSE lint · OpenSSF Scorecard · dependency audit | No, while the register of engineering checks is `draft`. The step runs on every pull request, prints every finding in the log and the job summary, and exits 0. Promoting that register to `active` is what turns them into failures. |

- **One required check, and it is called build.** The protection on the
  main line, copied to every repository, can require a check only by name,
  so the name means the same everywhere. Where the work is split into
  several jobs, build passes only if every artefact job passed. It never
  waits on a job that only reports. Renaming it leaves the required check
  pending for ever and blocks every merge. Requiring no check lets a red run
  merge. Both failures were measured before this was written.
- **The store of resources has no site.** It builds nothing. Its artefact
  guards check that every file declares its licence, with tests proving a
  missing declaration is refused. Build passes only when all of them do.
- **Some files are kept identical across the five, by hand until a shared
  package carries them.** The table below lists them. Comparing two copies
  shows their paths and nothing else.
- **Every workflow, every step,** as the register of engineering checks
  asks: outside actions pinned to the full commit hash of one release, never
  a tag that can move; read-only permissions at the top of the file, with
  write granted only to the job that needs it; no secret read by a build,
  because publishing is connected in the hosting provider's own panel, never
  through a token in a workflow; and above each step, a comment in English
  saying what it checks and how to fix it when it fails.

| Kept identical in the five | What it does |
|---|---|
| `machine/scripts/check-version-bump.mjs` | refuses a change to a site that does not raise its version; only its two path settings differ |
| `web/scripts/share-card.mjs` | draws the card shown when a link is shared |
| `.github/dependabot.yml` | asks for dependency updates |
| `.github/workflows/dependabot-auto-merge.yml` | merges those updates once the checks pass |
| `.github/workflows/scorecard.yml` | runs the weekly security score |

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| ENG-001 | A rule that does not fail a build is prose | — | by reading; the register check (`machine/tools/check-register.mjs --list`) counts its automatic, gated and owed rows |
| ENG-002 | Every practice names its check | — | the register check verifies each row's named check exists; it reports, it does not fail the build while the register is a draft |
| ENG-066 | A guard that fails on unstated behaviour is the defect | — | by hand, at review |
| ENG-067 | A guard bites by the state of its rule; signing a standard switches its guards on; a guard over the artefact bites always | — | `machine/scripts/lib/regime.mjs` reads the holder's state; `regime.test.mjs` proves both directions; `blindness.test.mjs` checks every guard is a build guard or answers to the regime |
| ENG-031 | A guard runs from the change that merges it | — | `machine/scripts/run-guards.mjs` runs every registered guard; `blindness.test.mjs` and the register check refuse a guard script with no registry entry |
| ENG-032 | The list of guards is read, never remembered | — | the workflow calls `npm run guards` and names no guard; the register check verifies that step is present |

## Why

A practice with no check is a wish with a heading. Writing the check beside
it shows how much is enforced and how much is only promised. Guards are code,
and code rots. A guard that bites before its rule is signed turns a draft
into a law nobody agreed to. With one pipeline in five repositories, a red
build means the same thing wherever it is read.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-015` | Engineering checks | the practices, their level and their check |
| `PRO-016` | Applying the engineering standard | the procedure for a task |
| `STD-009` | Which rule wins | where ENG-031..035 and ENG-066 came from; `PRE-006`, the principle ENG-067 executes |
