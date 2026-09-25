---
title: "Engineering baseline"
id: "STD-005"
uid: ""
type: documentation
subtype: standard
status: draft
version: "2.4.0"
created: "2026-08-17T21:55:38+02:00"
created_source: "git:e3123fc"
created_confidence: exact
updated: "2026-09-25T13:00:00+02:00"
author: "pablofm"
owner: "oracle"
territory: "Platform"
tags: [standards, engineering, ci, guards]
license: "CC0-1.0"
absorbs: ["STD-011"]
series_change: "2.4.0 — 2026-09-25: written in plain words, and seven outside standards from STD-011 now stand here as the sources of our own rules; two of them bring a new rule, the security score (ENG-068) and the changelog for people (ENG-069), and the other five were already our rules or rows of the register STD-015. At the Oracle's word in session."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Engineering baseline

> **Summary:** Every engineering practice we hold names the machine that
> checks it, or admits it is checked by hand, and checking by hand is debt.
> The automatic checks on every change are the authority; a rule that never
> fails a build is only prose. The practices themselves are listed in the
> register of engineering checks.
> **Epistemic:** Which engineering practices are required here, which outside
> standards they follow, and which a machine actually enforces.
> **Pragmatic:** Set up a new repository, or review an existing one, without
> asking what the house rules are.
> **Audience:** Agents · Oracles

**Binds:** this archive's own repository, edited here and downstream of
nothing, and every workspace born from it, which receives this baseline at
birth and owns it from then on; personal repositories SHOULD follow it.
**Does not bind:** how documents are written, how pieces are licensed, or how
an agent applies this baseline to one task; each has its own standard or
procedure.

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

**Three layers, three speeds.** Principles change only by the Oracle's
decision; practices by a written decision and a pull request, with a new
version number; checks by pull request, at any time.

### How work lands

**Work lands in small batches on one trunk.** Changes are integrated often,
in small pull requests, on short branches that reach the main line quickly;
the main line stays green, and at least one approval comes before it.

**Leave it better.** No change adds debt silently: it declares what it left
behind. A green pipeline is not a clean tree.

### How a repository is kept safe

**Settings live in the environment.** Passwords, keys and anything that
changes between machines MUST stay out of the repository and be read from
where the program runs, because what is published cannot be unpublished.

**Every repository keeps a security score.** Each repository MUST be graded
every week by an open-source scorecard of how safely it is built and
published, and someone MUST read the grade.

**Migrate in order.** A repository that already exists adopts the security
scorecard first, then the checks that required files are present, then the
full pipeline. Measure first, then tighten.

### When something breaks, and whom we build for

**Incidents produce rules, not culprits.** When something breaks, we write
down what happened and what changes, never who is at fault. An incident MAY
bring in one new practice, through a written decision.

**The platform is a product for developers, human and digital.** If the
obvious way to do something is unclear to an agent, it is unclear.

### How changes are told

**The changelog is written for people.** A changelog SHOULD group its
entries by date and by kind — added, changed, fixed, removed — newest first,
so a reader sees what moved without reading the commits.

How a commit message says its kind, and how a mission accepts the software it
produces through scenarios a test runs, are practices in the register of
engineering checks, each with its own check there.

This standard is over its word budget because every rule has to be read
aloud and understood without opening the source.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it follows, and what verifies it today. Then every outside standard this
baseline absorbed, with the rule of ours that already said it.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| ENG-001 | A rule that does not fail a build is prose | — | by reading; the register check (`machine/tools/check-register.mjs`) counts 24 automatic, 5 gated and 27 owed rows out of 56 |
| ENG-002 | Every practice names its check | — | the register check verifies each row's named check exists; it reports, it does not fail the build while the register is a draft |
| ENG-066 | A guard that fails on unstated behaviour is the defect | — | by hand, at review |
| ENG-067 | A guard bites by the state of its rule; signing a standard switches its guards on; a guard over the artefact bites always | — | `machine/scripts/lib/regime.mjs` reads the holder's state; `regime.test.mjs` proves both directions; `blindness.test.mjs` checks every guard is a build guard or answers to the regime |
| ENG-031 | A guard runs from the change that merges it | — | `machine/scripts/run-guards.mjs` runs every registered guard; `blindness.test.mjs` and the register check refuse a guard script with no registry entry |
| ENG-032 | The list of guards is read, never remembered | — | the workflow calls `npm run guards` and names no guard; the register check verifies that step is present |
| ENG-034 | Three layers, three speeds | — | by hand, at review |
| ENG-003 | Work lands in small batches on one trunk | [Trunk-Based Development](https://trunkbaseddevelopment.com/) | `.github/rulesets/protect-main.json`: pull request required, one approval, no force push, linear history, the `build` check required; batch size and branch age by hand |
| ENG-005 | Leave it better | — | by hand, at review |
| ENG-004 | Settings live in the environment | [The Twelve-Factor App, config](https://12factor.net/config) | no tracked environment file in any of the four repositories; no secret scanner of our own (register row SEC-004 is owed) |
| ENG-068 | Every repository keeps a security score | [OpenSSF Scorecard](https://scorecard.dev/) | `.github/workflows/scorecard.yml` runs weekly and on push to the main line in all four repositories; the last runs succeeded; whether the grade is read, by hand |
| ENG-035 | Migrate in order | [OpenSSF Scorecard](https://scorecard.dev/) | by hand |
| ENG-006 | Incidents produce rules, not culprits | [Blameless postmortem](https://sre.google/sre-book/postmortem-culture/) | by hand; no template in `.github/` asks for a postmortem |
| ENG-007 | The platform is a product for developers, human and digital | — | by hand |
| ENG-069 | The changelog is written for people | [Keep a Changelog](https://keepachangelog.com/) | by hand; this archive's changelog groups by date and kind under an unreleased heading; `numinia-web` and `nwos-deploy` keep none |
| ENG-033 | retired in 2.2.0: it governed baselines, and there are none | — | — |

| Outside standard | Where it is our rule |
|---|---|
| [Blameless postmortem](https://sre.google/sre-book/postmortem-culture/) | ENG-006 here; register row SRE-006 says it again |
| [OpenSSF Scorecard](https://scorecard.dev/) | ENG-068, new here; ENG-035 already made it the first step; six register rows are verified by its checks, and a seventh asks that it be consulted |
| [Trunk-Based Development](https://trunkbaseddevelopment.com/) | ENG-003 here; register rows ARC-002, DEV-006, DEV-007 and the pull-request rule GIT-025 say parts of it again |
| [The Twelve-Factor App, config](https://12factor.net/config) | ENG-004 here; register rows SEC-004 and DEV-001, and the secrets rule KEY-054, say parts of it again |
| [Conventional Commits](https://www.conventionalcommits.org/) | register row ARC-006 and its list of kinds; not repeated here; no commit-message check anywhere (`DBT-020`), none of the last 30 commit subjects on this archive's main line conform |
| [Gherkin](https://cucumber.io/docs/gherkin/) | register row AGT-005; not repeated here; only `numinia-web` runs scenarios, ten `.feature` files in its acceptance tests in CI |
| [Keep a Changelog](https://keepachangelog.com/) | ENG-069, new here; register row TRC-004 requires a changelog too, but allows one generated from commits, which this outside standard advises against |

## Why

A practice with no check is a wish with a heading; writing the check beside
it shows how much of the baseline is enforced and how much is promised. The
guard rules exist because guards are code that rots. Following a standard the
world already tested, instead of writing our own, buys a better rule and lets
anyone check us against something they already know.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-015` | Engineering checks | the 52 practices, their level and their check |
| `PRO-016` | Applying the engineering standard | the procedure for a task |
| `STD-009` | Which rule wins | where ENG-031..035 and ENG-066 came from; `PRE-006`, the principle ENG-067 executes |
| `RPT-019` | Week 37 | where `DBT-017` and `DBT-021`, the two defects ENG-067 closes, are recorded closed |
| `DBT-020` | Declared automatic, executed by nobody | the `[MANUAL]` rows that claim otherwise |
