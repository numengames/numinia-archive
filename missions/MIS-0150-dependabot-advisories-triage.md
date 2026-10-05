---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-150"
uid: ""
title: "Triage the open Dependabot advisories on main and close DBT-007"
status: todo
# ^ todo — the board's state for a mission awaiting assignment (`STD-001` (mission status);
#   the retired 'backlog' value maps to this).
priority: high
effort: S
guild: "Sentinels"
section: "Technology"
executor: agent
assigned_to: null
completed: null

# REGISTRO — not consumed by the build, but every document in this archive
# carries them (`STD-024`).
type: mission
version: "1.0.4"
created: "2026-09-02T15:10:00Z"
created_source: "git:db37686"
created_confidence: exact
updated: "2026-10-05T10:38:00+02:00"
author: "ursa"
owner: "oracle"
tags: [debt, security, dependencies, dependabot, triage, DBT-007]
license: "CC0-1.0"

# OPCIONALES
depends_on: []
requires_oracle_approval: false
paths:
  - debt/DBT-007-dependabot-advisories-untriaged.md
  - package.json
  - web/package.json
  - package-lock.json
  - web/package-lock.json
  - .github/workflows/ci.yml
context: "2026-09-02T09:00:00+02:00"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# MIS-150 — Triage the open Dependabot advisories on main and close DBT-007

> **Summary:** GitHub's push banner reported **10 vulnerabilities on the
> default branch — 3 high, 4 moderate, 3 low** on 2026-08-25, a number that
> exists only in that banner and nowhere in the corpus. `npm audit` on
> 2026-09-04 reports **4** (2 high, 2 low) — see the execution log. Neither
> figure is the measurement this mission owes; both are inputs to it. This
> mission enumerates each advisory from the live source with package,
> severity and reach, gives each a verdict (patch, accept with reason, or
> not applicable), and closes `DBT-007`.
> **Epistemic:** whether the repository's security surface is real exposure
> or static-build noise — measured, not assumed (DBT-007 refuses to state
> the counts as measured; this mission measures them).
> **Pragmatic:** the number stops being a banner that scrolls past; the
> corpus gains a dated record of what was triaged, decided and why.
> **Audience:** Agents · Oracles

---

## Origin

`debt/DBT-007-dependabot-advisories-untriaged.md` (active, severity medium).
Its own "What would close it" block is the contract this mission executes:

- [ ] The 10 are enumerated with package, severity, and whether they reach
      built output or stop at dev/build dependencies
- [ ] Each has a verdict: patch, accept with reason, or not applicable
- [ ] The accepted ones carry a reason and a date, like the orphan allow-list
- [ ] A decision on whether advisory state is surfaced anywhere the corpus
      can see it, rather than only in a push banner

The count comes from GitHub's push banner (10 · 3 high · 4 moderate ·
3 low) and is **unverified** — the counts may have changed since 2026-08-25.
The first act of execution is to re-measure from the live source. A partial
re-measurement on 2026-09-04 already contradicts it (see the execution log):
`npm audit` reports 4, and the Dependabot API returned HTTP 403 to the
agent's token. The enumeration this mission owes still has to come from the
Dependabot alerts themselves, which is what DBT-007 asks for; `npm audit`
sees the npm tree, not GitHub's advisory state, and the two are not the same
source.

---

## Scope

Triage the Dependabot advisory state of **this repository only**
(`numengames/numinia-nwos`), on `main`:

- enumerate the open advisories from the live source (GitHub security
  advisory API / Dependabot alerts — not from the banner or memory), with
  package, GHSA id, severity, and whether the affected dependency reaches
  built output or stops at dev/build time;
- produce a verdict per advisory: **patch** (a fix exists and is safe to
  apply now), **accept** (with a written reason and date), or **not
  applicable** (no real exposure — e.g. dev-server-only path on a static
  build);
- for any `patch` verdict that requires a dependency bump: apply the
  minimal bump (patch-level, same major), run the build and the test
  suites, and commit with a conventional message citing this mission;
- record the triage in the corpus (a dated record — report or annex) so the
  advisory state is visible to the corpus, not only to a push banner;
- close `DBT-007` per its contract, with the Oracle's sign-off.

**Where it stops:**

- **No Astro major upgrade.** Astro 5 → 7 is explicitly excluded from all
  current work (DBT-007 §"Why it is registered" point 2). If an advisory is
  only fixable by a major upgrade, the verdict is **accept with reason**,
  not an upgrade.
- **No CI-side automation** (D-017): Dependabot auto-merge, scheduled
  scanning, or guard wiring are out of scope. The decision on whether
  advisory state should be *surfaced* in the corpus is in scope (recorded);
  *automating* it is not.
- No other repositories (`numinia-web`, `numengames-web`,
  `nwos-deploy`) — even if they share dependencies.
- No dependency audit beyond the advisories themselves (no "while we're
  here" upgrades).

## Out of scope

What someone would reasonably expect to be included and is not:

- **Fixing every vulnerable dependency regardless of cost.** The mission
  fixes what is safe to fix now; everything else gets a reasoned verdict.
- **The Astro 7 migration** — that is a separate, explicitly-excluded work
  stream.
- **Other repos' dependency state.**

---

## Acceptance criteria

> Every criterion must be FALSE at the base commit (`db37686`). Assert the
> final state, not a delta. Verifiable by someone who did not do the work.

- [ ] A dated triage record exists in the corpus (reports/ or the mission
      annex) enumerating **every** currently-open advisory on `main` —
      package, GHSA id, severity, reach (built output vs dev/build) — and
      the count matches the live source at the time of execution.
      (today: no such record exists; the count lives only in the push
      banner and is unverified)
- [ ] Every advisory in the record carries a verdict: `patch`, `accept` +
      written reason + date, or `not applicable` + written reason.
      (today: zero advisories have any verdict anywhere)
- [ ] Each `patch` verdict that required a dependency change is backed by a
      commit whose build and test suites pass, citing this mission.
      (today: no such commits exist)
- [ ] The mission records the decision on surfacing advisory state in the
      corpus (surface in a report/feed, or deliberately not, with reason).
      (today: no decision exists; the banner is the only surface)
- [ ] `DBT-007` is updated to reflect the triage outcome (verdicts,
      remaining accepted exposure, closure recommendation) — status change
      to `done`/`closed` is the Oracle's call, not the executor's.
      (today: DBT-007 is active with zero progress)
- [ ] No dependency was upgraded beyond patch-level same-major without a
      written reason, and no Astro major upgrade was performed.
      (today: trivially false — nothing was upgraded at all)

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.
Add here — never edit `Scope` or the criteria to match what happened.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:**

---
