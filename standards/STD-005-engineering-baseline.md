---
title: "Engineering baseline"
id: "STD-005"
uid: ""
type: documentation
subtype: standard
status: draft
version: "3.0.0"
created: "2026-08-17T21:55:38+02:00"
created_source: "git:e3123fc"
created_confidence: exact
updated: "2026-09-26T12:00:00+02:00"
author: "pablofm"
owner: "oracle"
territory: "Platform"
tags: [standards, engineering, ci, guards]
license: "CC0-1.0"
absorbs: ["STD-011"]
series_change: "3.0.0 — 2026-09-26: small batches on one trunk leave for Git is the archive and the three layers of a practice for Who may change what, each the one standard answering that question; no other rule changes. Obligations removed from here, so a major move, at the Oracle's word in session."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Engineering baseline

> **Summary:** Every engineering practice we hold names the machine that
> checks it, or admits it is checked by hand, and checking by hand is debt.
> The automatic checks on every change are the authority; a rule that never
> fails a build is only prose. Where the world already has a good rule, we
> follow it, and say here what it makes us do.
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

### How work lands

How a change reaches the main line, and how a commit says its kind, is
said once, in the standard that git is the archive.

**Leave it better.** No change adds debt silently: it declares what it left
behind. A green pipeline is not a clean tree.

### How a repository is kept safe

**Settings live in the environment.** We follow the third factor of the
twelve-factor app, the common method for building services: anything that
changes between machines, passwords and keys above all, MUST be read from
the environment where the program runs, never written into the repository.
The same code then runs anywhere, and publishing it never publishes a key.
Our choice; if a leaked key opens personal data, data protection law makes
it a breach.

**Every repository keeps a security score.** We follow the security
scorecard of the Open Source Security Foundation, which grades a repository
out of ten, check by check, on how safely it is built, reviewed and
published; it turns "is this safe" into a number anyone can rerun. Our
addition: each repository MUST be graded every week, with a named person who
reads the grade, and a public one aims at seven out of ten or better. Our
choice.

**Migrate in order.** A repository that already exists adopts the security
scorecard first, then the checks that required files are present, then the
full pipeline. Measure first, then tighten.

### When something breaks, and whom we build for

**Incidents produce rules, not culprits.** We follow the postmortem culture
of Google's book on site reliability: which events call for a written review
is decided before any happens, and each review says what happened, what it
cost and what changes, never who is at fault. People report early instead of
hiding, and every serious failure demonstrably leaves a lesson. Our
addition: an incident MAY bring in one new practice, only through a written
decision. Our choice.

**The platform is a product for developers, human and digital.** If the
obvious way to do something is unclear to an agent, it is unclear.

### How changes are told

**The changelog is written for people.** We follow Keep a Changelog, the
common shape for a changelog: newest first, a section for what is not yet
released, and every entry filed under one of six kinds — added, changed,
deprecated, removed, fixed, or security — so a reader learns what moved, and
whether it touches them, without reading the commits. Our addition: a site
with no releases SHOULD head each group with its date instead. Our choice.

How a mission accepts the software it produces, through scenarios a test
runs, is a practice in the register of engineering checks, with its own
check there.

This standard is over its word budget because every rule has to be read
aloud and understood without opening the source.

## Check

Each rule, its code, its source and its check. Then every outside standard
this baseline follows, with the register rows that apply it.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| ENG-001 | A rule that does not fail a build is prose | — | by reading; the register check (`machine/tools/check-register.mjs --list`) counts its automatic, gated and owed rows |
| ENG-002 | Every practice names its check | — | the register check verifies each row's named check exists; it reports, it does not fail the build while the register is a draft |
| ENG-066 | A guard that fails on unstated behaviour is the defect | — | by hand, at review |
| ENG-067 | A guard bites by the state of its rule; signing a standard switches its guards on; a guard over the artefact bites always | — | `machine/scripts/lib/regime.mjs` reads the holder's state; `regime.test.mjs` proves both directions; `blindness.test.mjs` checks every guard is a build guard or answers to the regime |
| ENG-031 | A guard runs from the change that merges it | — | `machine/scripts/run-guards.mjs` runs every registered guard; `blindness.test.mjs` and the register check refuse a guard script with no registry entry |
| ENG-032 | The list of guards is read, never remembered | — | the workflow calls `npm run guards` and names no guard; the register check verifies that step is present |
| ENG-034 | retired → AUT-065 of Who may change what, which holds the three layers | — | — |
| ENG-003 | retired → GIT-025 of Git is the archive, small batches by pull request on one trunk | — | — |
| ENG-005 | Leave it better | — | by hand, at review |
| ENG-004 | Settings live in the environment | [The Twelve-Factor App, III. Config](https://12factor.net/config) | no tracked environment file in any of the four repositories; no secret scanner of our own (register row SEC-004 is owed) |
| ENG-068 | Every repository keeps a security score | [OpenSSF Scorecard](https://scorecard.dev/) | `.github/workflows/scorecard.yml` runs weekly and on push to the main line in all four repositories; the named reader and the grade itself, by hand |
| ENG-035 | Migrate in order | [OpenSSF Scorecard](https://scorecard.dev/) | by hand |
| ENG-006 | Incidents produce rules, not culprits | [Google SRE book, ch. 15, Postmortem Culture](https://sre.google/sre-book/postmortem-culture/), triggers defined in advance | by hand; the triggers are not yet written down, and no template in `.github/` asks for a postmortem |
| ENG-007 | The platform is a product for developers, human and digital | — | by hand |
| ENG-069 | The changelog is written for people | [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/): six kinds, an Unreleased section | by hand; this archive's changelog groups by date and kind under an unreleased heading; `numinia-web` and `nwos-deploy` keep none |
| ENG-033 | retired in 2.2.0: it governed baselines, and there are none | — | — |

| Outside standard | Register rows that apply it |
|---|---|
| [Google SRE book, ch. 15](https://sre.google/sre-book/postmortem-culture/) | ENG-006 alone; register row SRE-006, which said it again, is retired into it |
| [OpenSSF Scorecard](https://scorecard.dev/) | ENG-068 and ENG-035; register rows SEC-003, SEC-007, SEC-008, SEC-009, ARC-002 and ARC-009 are verified by its checks |
| [Trunk-Based Development](https://trunkbaseddevelopment.com/) | GIT-025 of Git is the archive, which holds retired ENG-003; register rows ARC-002 and DEV-006 apply parts of it; register row DEV-007, which repeated the approval, is retired into GIT-025 |
| [The Twelve-Factor App, III. Config](https://12factor.net/config) | ENG-004; register rows SEC-004 and DEV-001 apply it |
| [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) | the commit-subject rule GIT-026, which holds the list of kinds, and register row ARC-006; no commit-message check anywhere (`DBT-020`) |
| [Gherkin](https://cucumber.io/docs/gherkin/) | register row AGT-005; only `numinia-web` runs scenarios, ten `.feature` files in its acceptance tests in CI |
| [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/) | ENG-069; register row TRC-004 now follows it, where it once allowed a changelog generated from commits, which this outside standard advises against |

## Why

A practice with no check is a wish with a heading; writing the check beside
it shows how much of the baseline is enforced and how much is promised. The
guard rules exist because guards are code that rots. Following a standard the
world already tested buys a better rule and lets anyone audit us against
something they already know; each rule still says in our words what that
standard makes us do, so nobody has to leave the page to obey it.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-015` | Engineering checks | the practices, their level and their check |
| `PRO-016` | Applying the engineering standard | the procedure for a task |
| `STD-009` | Which rule wins | where ENG-031..035 and ENG-066 came from; `PRE-006`, the principle ENG-067 executes |
| `RPT-019` | Week 37 | where `DBT-017` and `DBT-021`, the two defects ENG-067 closes, are recorded closed |
| `DBT-020` | Declared automatic, executed by nobody | the `[MANUAL]` rows that claim otherwise |
