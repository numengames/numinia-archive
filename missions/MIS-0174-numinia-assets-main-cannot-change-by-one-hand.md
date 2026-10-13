---
id: "MIS-174"
uid: ""
title: "numinia-assets' main cannot change by one hand: one approval from someone other than the last pusher, stale approvals dismissed, the CI check required, no bypass"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-12T16:58:38+02:00"
updated: "2026-10-12T16:58:38+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [fleet, supply-chain, branch-protection, code-review, numinia-assets]
license: "CC0-1.0"

priority: low
effort: XS
executor: human
assigned_to: null
completed: null

requires_oracle_approval: true
context: "2026-10-12T16:58:38+02:00"
paths: [standards/STD-015-engineering-checks.md]
related: ["MIS-173"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-174 — numinia-assets' main cannot change by one hand

> **Summary:** numinia-assets holds the recipe every fleet machine
> installs, and its `main` takes a merge with no approval and no green
> check: one account with write access, or the house's GitHub App, could
> merge a change alone. This mission raises the rule on `main` so that no
> single hand can: one approving review from someone other than the last
> pusher, stale approvals dismissed, the CI check `build` required, and
> nobody allowed to bypass it.
> **Epistemic:** Who must agree before the recipe's `main` can change.
> **Pragmatic:** With `MIS-173`'s pin, a change reaches a machine only after
> a second person approved it and the tests passed.
> **Audience:** Agents · Oracles

---

## 1. Scope

- **Deferred by the Oracle on 2026-10-12:** "it can wait; there are more
  relevant things now".
- **The rule on numinia-assets' `main`**, ruleset 23865799, set by the
  Oracle in GitHub's settings: one approving review, from someone other than
  the last pusher; approvals dismissed when new commits arrive; the CI check
  `build` required; nobody allowed to bypass it.
- **Who reviews the Oracle's own pull requests there** is named when the
  mission opens.
- The house's own standard already asks for part of it: `STD-015` ARC-002, a
  pull request and status checks required on `main`, read by OpenSSF
  Scorecard's Branch-Protection check.

### Standards to select when the mission opens (not the selection)

| Area | What it covers here | Candidates |
|---|---|---|
| Who may change the main line | the rule on `main` | GitHub rulesets (required review, last-push approval, required checks, no bypass); OpenSSF Scorecard's Branch-Protection and Code-Review checks, which numinia-assets already runs |

The choice and its reason go in this mission's execution log.

Out of scope: the rules of any other repository; signing commits; the pin
of what a machine installs (`MIS-173`).

---

## 2. Acceptance criteria

- [ ] numinia-assets' rule on `main` requires one approving review from
  someone other than the last pusher, dismisses stale approvals, requires the
  check `build`, and lets nobody bypass it. Today: ruleset 23865799 requires
  a pull request with 0 approvals, keeps stale approvals and requires no
  status check (read from `GET /repos/numengames/numinia-assets/rules/branches/main`
  on 2026-10-12).
- [ ] numinia-assets' public OpenSSF Scorecard reads Branch-Protection 6 or
  more out of 10. Today: 3 out of 10, "branch protection is not maximal on
  development and all release branches" (its scan of 2026-10-12, at
  `f3de8dd`).

---

## 3. Closure

*(Fill when the mission closes.)*
