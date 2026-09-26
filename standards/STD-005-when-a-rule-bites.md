---
title: "When a rule bites"
id: "STD-005"
uid: ""
type: documentation
subtype: standard
status: draft
version: "4.0.0"
created: "2026-08-17T21:55:38+02:00"
created_source: "git:e3123fc"
created_confidence: exact
updated: "2026-09-26T16:00:00+02:00"
author: "pablofm"
owner: "oracle"
territory: "Platform"
tags: [standards, engineering, ci, guards]
license: "CC0-1.0"
absorbs: ["STD-011"]
series_change: "4.0.0 — 2026-09-26: this standard now answers one question, when a rule bites and how the guards come to run, and is renamed from Engineering baseline (the old address redirects). The family pipeline arrives whole from the engineering checks. Keeping a repository safe and telling changes leave: settings in the environment to Secrets, leave it better to Git is the archive, the security score, migrating in order, incidents, the platform as a product and the changelog to rows of the engineering checks. Obligations removed from here, so a major move, at the Oracle's word in session."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# When a rule bites

> **Summary:** A rule is worth what the machine that checks it is worth. A
> guard fails the build only while the standard holding its rule is signed;
> a guard over the thing built fails always. Every guard in the guards
> folder runs, and five repositories run the same pipeline.
> **Epistemic:** When a guard fails the build, and how guards and the shared
> pipeline come to run.
> **Pragmatic:** Write, wire or read a guard, and know whether a red build is
> a broken rule or a broken artefact.
> **Audience:** Agents · Oracles

**Binds:** this archive's own repository, edited here and downstream of
nothing, and every workspace born from it, which receives these rules at
birth and owns them from then on; personal repositories SHOULD follow them.
**Does not bind:** which practices a repository keeps, which the register of
engineering checks lists; how a change reaches the main line, which is Git is
the archive; how a secret stays out, which is Secrets.

## Rules

### What a rule is worth

**A rule that does not fail a build is prose.** The automatic checks that run
on every change are the authority, and the documentation explains them. For
an agent, a rule that no guard runs does not exist.

**Every practice names its check.** Each practice in the register of
engineering checks MUST say which machine checks it, or say plainly that a
person does. Checking by hand is debt, and what a machine can check MUST NOT
be audited by hand.

**A guard that fails on unstated behaviour is the defect.** When a guard
fails on something no rule asks for, correct the guard or write the rule;
never bend the work to fit it.

**A guard bites by the state of its rule.** A finding fails the build only
while the standard holding the rule it cites is active; while that standard
is a draft, the guard reports the finding and lets the build pass.

**Signing a standard switches its guards on.** The guard reads the standard's
state from its header each time it runs, never from its own settings. A
finding that cites no rule has no state to read and MUST NOT fail a build.

**A guard over the artefact bites always.** A guard that checks the thing
built rather than a rule — the build itself, fresh measurements, links inside
the site, stray pages, cited addresses that still answer — fails regardless,
and says so where it lists what it cannot see.

### How guards come to run

**A guard runs from the change that merges it.** A guard is a script in the
guards folder, and the runner finds it there and runs it. No document and no
workflow line makes it exist; a script that must not run as a guard lives
elsewhere.

**The list of guards is read, never remembered.** What runs is what the
runner finds in the guards folder. The workflow calls the runner and names no
guard, because a list written by hand is stale the day it is written.

The practices a repository keeps — its security score, its changelog, what
happens after an incident — are rows of the register of engineering checks,
each with its check.

This standard is over its word budget because the shared pipeline has to be
read whole to be copied.

### The family pipeline

Five repositories run the same guards: the four that each serve a site —
this archive, the Numinia site, the Numen Games site and the workspace
deployer — and the store of shared resources, which serves none. A guard is
a step, or a script, that says whether something is wrong with the change
under review. There are two kinds, told apart by the rule above on when a
guard bites:

| Kind | Steps, in this order | Fails the build? |
|---|---|---|
| Artefact | install → type-check → lint → test → build → share card (`web/scripts/share-card.mjs --check`) → version bump (`machine/scripts/check-version-bump.mjs`) | Yes. A page that does not build, a test that fails, a favicon that is missing or a version that did not move is a broken artefact whatever any standard says. |
| Rule | presence of the files a new repository is born with (see the register of engineering checks) · REUSE lint · OpenSSF Scorecard · dependency audit | No, while the register of engineering checks is `draft`. The step runs on every pull request, prints every finding in the log and the job summary, and exits 0. Promoting that register to `active` is what turns them into failures. |

- **One required check, and it is called build.** The protection on the
  main line, copied to every repository, can only require a check by its
  name, so the name means the same everywhere. Where the work is split into
  several jobs, build is the job that passes only if every artefact job
  passed; it never waits on a job that only reports. Renaming it leaves the
  required check pending for ever and blocks every merge; requiring no
  check lets a red run merge. Both were measured before this was written.
- **The store of resources has no site.** It builds nothing: its artefact
  guards are its own checks that every file declares its licence, with the
  tests that prove a missing declaration is refused, and build passes only
  when all of them do.
- **Some files are kept identical across the five, by hand until a shared
  package carries them.** They are listed in the table below; comparing two
  copies shows their paths and nothing else.
- **Every workflow, every step:** outside actions pinned to the full commit
  hash of one release, never a tag that can move (SEC-007); read-only
  permissions at the top of the file, with
  write granted only to the job that needs it (SEC-008); no secret read by a
  build, since publishing is connected in the hosting provider's own panel
  and never through a token in a workflow (SEC-004); and above each step, in
  English, a comment saying what it checks and how to fix it when it fails
  (DEV-005).

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
| ENG-004 | retired → KEY-057 of Secrets, settings live in the environment | — | — |
| ENG-005 | retired → GIT-050 of Git is the archive, leave it better | — | — |
| ENG-068 | retired → SEC-013 of the engineering checks, every repository keeps a security score | — | — |
| ENG-035 | retired → SEC-014 of the engineering checks, migrate in order | — | — |
| ENG-006 | retired → SRE-007 of the engineering checks, incidents produce rules, not culprits | — | — |
| ENG-007 | retired → AGT-007 of the engineering checks, the platform is a product for developers | — | — |
| ENG-069 | retired → TRC-004 of the engineering checks, the changelog is written for people | — | — |
| ENG-034 | retired → AUT-065 of Who may change what, which holds the three layers | — | — |
| ENG-003 | retired → GIT-025 of Git is the archive, small batches by pull request on one trunk | — | — |
| ENG-033 | retired in 2.2.0: it governed baselines, and there are none | — | — |

## Why

A practice with no check is a wish with a heading; writing the check beside
it shows how much is enforced and how much is promised. The guard rules exist
because guards are code that rots, and a guard that bites before its rule is
signed turns a draft into a law nobody agreed to. One pipeline in five
repositories means a red build means the same thing wherever it is read.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-015` | Engineering checks | the practices, their level and their check |
| `PRO-016` | Applying the engineering standard | the procedure for a task |
| `STD-009` | Which rule wins | where ENG-031..035 and ENG-066 came from; `PRE-006`, the principle ENG-067 executes |
| `RPT-019` | Week 37 | where `DBT-017` and `DBT-021`, the two defects ENG-067 closes, are recorded closed |
| `DBT-020` | Declared automatic, executed by nobody | the `[MANUAL]` rows that claim otherwise |
