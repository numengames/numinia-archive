---
title: "Engineering baseline"
id: "STD-005"
uid: ""
type: documentation
subtype: standard
status: draft
version: "2.3.0"
created: "2026-08-17T21:55:38+02:00"
created_source: "git:e3123fc"
created_confidence: exact
updated: "2026-09-10T19:15:00+02:00"
author: "pablofm"
owner: "oracle"
territory: "Platform"
tags: [standards, engineering, ci, guards]
license: "CC0-1.0"
series_change: "2.3.0 — ENG-031 and ENG-032 turned around: what runs is what is in the guards folder, found by the runner; the workflow calls the runner and names no guard. Before, a guard existed only once the Oracle pasted its step into the workflow, and four written, tested, registered guards never ran. The Oracle's control moves to the review of the change that adds the guard. Minor: the obligation changes shape, none added. Decided by the Oracle on 2026-09-10. 2.2.0 — ENG-033 retired: it governed baselines, and since 2026-09-10 there are none — a guard reports every finding it sees and the state of the holding standard (ENG-067) decides whether it fails the build; new damage shows in the diff of the change that caused it. Minor: an obligation removed, none added. Decided by the Oracle on 2026-09-10. 2.1.0 — ENG-067: a guard bites by the state of the standard that holds the rule it cites — `draft` reports, `active` fails the build; build guards, which verify the artefact and not a rule, are the declared exception. Minor: a new obligation on guards, none reversed. Decided by the Oracle on 2026-09-10 (DBT-021, exit 1). 2.0.0 — the standard takes the ADR-043 shape and splits: 2,161 -> 480 words of body here, the 52 practice rows become the register STD-015. The seven principles are ENG-001..007; the six guard rules that came from STD-009 keep their numbers as ENG-031..035 and ENG-066. Major: §3.2 was cited by two documents and no longer exists."
---

# Engineering baseline

> **Summary:** Every practice maps to an automated check or is tagged
> `[MANUAL]`, and `[MANUAL]` is debt. CI is the authority; a rule that does
> not fail a build is prose. The practices are the register `STD-015`, each
> with its check.
> **Epistemic:** Which engineering practices are required here and which a
> machine actually enforces.
> **Pragmatic:** Set up a new repository, or review an existing one, without
> asking what the house rules are.
> **Audience:** Agents · Oracles

**Binds:** `numengames/numinia-archive`, edited here and downstream of nothing.
NWOS workspaces receive it at birth and own it; personal repositories SHOULD.
**Does not bind:** documents (`STD-004`, `STD-009`); licences (`STD-010`);
distance to external frameworks (`STD-011`); how an agent applies it to a
task (`PRO-016`).

## Rules

**ENG-001 — A rule that does not fail a build is prose.** CI is the authority;
documentation is its explanation. For an agent, a rule no guard runs does not
exist.

**ENG-002 — Every practice names its check.** A row in `STD-015` carries
`[AUTO: tool]` or `[MANUAL]`. `[MANUAL]` is debt; improvement is moving rows
to `[AUTO]`. Automatable checks MUST NOT be audited by hand.

**ENG-003 — Small batches.** Frequent integration, small pull requests, trunk
kept green. At least one approval before `main`.

**ENG-004 — Configuration lives in the environment.** Secrets MUST NOT touch
the repository; publication is irreversible.

**ENG-005 — Leave it better.** No touch adds debt silently; a change declares
what it left behind. A green pipeline is not a clean tree.

**ENG-006 — Incidents produce rules, not culprits.** Blameless postmortems; an
incident MAY inject one practice by ADR.

**ENG-007 — The platform is a product for developers, biological and
digital.** If the golden path is unclear to an agent, it is unclear.

**ENG-031 — A guard runs from the change that merges it.** A guard is a
script in the guards folder; the runner finds it there and runs it. No
document and no workflow line makes it exist. A script that must not run
as a guard lives elsewhere.

**ENG-032 — The guard register is read, never remembered.** What runs is
what the runner finds in the guards folder. The workflow calls the runner
and names no guard; a list of guards written by hand is stale the day it
is written.

**ENG-033** — retired 2.2.0. It governed baselines; there are none.

**ENG-034 — Three layers, three speeds.** Principles change by Oracle
decision; practices by ADR and pull request, semver; checks by pull request,
continuously.

**ENG-035 — Migrate in order.** An existing repository adopts Scorecard first,
then presence checks, then the full pipeline. Measure, then tighten.

**ENG-066 — A guard that fails on unstated behaviour is the defect.** Correct
the guard or write the rule; never bend the tree to a guard no axis document
backs.

**ENG-067 — A guard bites by the state of its rule.** A finding fails the
build only while the standard that holds the plate it cites is `active`;
while that standard is `draft`, the guard reports the finding and exits zero.
The state is read from the holder's header at run time, never configured in
the guard, so ratifying a standard is what turns its guards on (`PRE-006`).
A finding that cites no plate has no state to read and MUST NOT fail a build
(`ENG-066`). Exception: a guard that verifies the artefact rather than a rule
— the build, telemetry freshness, internal links, orphan content, the life of
cited URLs — bites regardless; it declares itself a build guard in its
blindness entry.

## Check

| Plate | Verified by |
|---|---|
| ENG-001, ENG-002 | `[MANUAL]` — `STD-015` is the table; `machine/telemetry/` reports the `[MANUAL]` share |
| ENG-003 | `[AUTO: branch protection]` — `STD-015` DEV-007, ARC-002 |
| ENG-004 | `[AUTO: push protection + gitleaks]` — `STD-015` SEC-004 |
| ENG-031, ENG-032 | `machine/scripts/run-guards.mjs` runs every guard in the folder; `blindness.test.mjs` checks each one declares what it does not see |
| ENG-005, 006, 007, 034, 035, 066 | `[MANUAL]` |
| ENG-067 | `machine/scripts/lib/regime.mjs` reads the holder's state; `regime.test.mjs` proves both directions; `[MANUAL]` for which guards have adopted it — read the imports, never a list (`ENG-032`) |

Nothing in this standard fails a build in this repository today; it is
enforced by reading and by the checks it names running elsewhere (`DBT-020`).

## Why

A practice with no check is a wish with a heading. Writing the check beside
the practice makes the honest state visible: how much of the baseline is
enforced and how much is promised. The guard rules exist because the guards
are themselves code that can rot — unwired, remembered wrong, or absorbing the
damage they were meant to catch. ENG-067 gives the `status` field its
consequence: before it, a draft's rules failed builds as hard as an active's,
and the signature that turned a draft into an obligation changed nothing a
machine could see (`DBT-021`, closed in `RPT-019`). With it, ENG-001 reads as intended — a draft's
rules are prose until the Oracle signs, and the signature is the switch.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-015` | Engineering checks | the 52 practices, their level and their check |
| `PRO-016` | Applying the engineering standard | the procedure for a task |
| `STD-009` | Which rule wins | where ENG-031..035 and ENG-066 came from; `PRE-006`, the principle ENG-067 executes |
| `RPT-019` | Week 37 | where `DBT-017` and `DBT-021`, the two defects ENG-067 closes, are recorded closed |
| `DBT-020` | Declared automatic, executed by nobody | the `[MANUAL]` rows that claim otherwise |
