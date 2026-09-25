---
id: "DBT-020"
uid: ""
title: "Four automations are declared in the standards and none of them exists in the tree"
type: documentation
status: active
version: "0.2.0"
created: "2026-09-07T15:20:00+02:00"
updated: "2026-09-10T16:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Platform"
tags: [debt, ci, guards, provenance, standards]
license: "CC-BY-4.0"
severity: high
severity_reason: "an [AUTO] mark tells a reader a machine is checking. Four of them are checked by nothing, and one of those four is the licence declaration the system presents as its best-executed standard"
detected: "2026-09-07"
visibility: "restricted-oracle"
visibility_reason: "internal structural debt"
opened_by: "ursa"
related: ["MIS-0146", "STD-005", "STD-010"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# DBT-020 — Declared automatic, executed by nobody

> **Summary:** Four rules carried an `[AUTO: tool]` mark naming a tool that is
> not in the tree, and a fifth cited a debt already closed. **The marks are
> honest now** — every one reads `[MANUAL]` or names where the tool really runs
> (2026-09-10, verified against `ci.yml` and `STD-015`). What this entry still
> holds is the two decisions in §5, which are the Oracle's and remain open:
> whether `reuse lint` enters CI, and whether the DCO rule survives. Four
> standards cite this entry as the home of "described, not built"; it stays
> open as that home until those two are decided.
> **Epistemic:** Verified at `f35ec1f` against the real tree — installed tools
> and the fifteen steps of `ci.yml`, not prose.
> **Pragmatic:** This is the same failure `CAN-005` already warns about for
> unsigned CLA/AGPL: a check that reports success by never running.
> **Audience:** Agents · Oracles

---

## 1. What was measured

| Declaration | Where | Reality in the tree |
|---|---|---|
| `[AUTO: reuse lint in CI]` | `STD-005` ARC-003 | **`reuse` runs in no workflow.** The fifteen steps of `ci.yml` do not include it; the package is not installed locally |
| `[AUTO: commitlint]` | `STD-005` ARC-006 | **No commitlint, no husky, no config** anywhere in the tree |
| `[AUTO]` for DCO | `STD-010` | **No bot. 0 of the last 30 commits carry `Signed-off-by`** |
| `[AUTO: axe-core + Playwright, numinia-web/apps/store/e2e/a11y.spec.ts]` | `STD-005` ARC-010 | **The test is real** — 31 routes, both themes — but that path does not exist in *this* repository, and the citation reads as if it did |
| «coverage incomplete, `DBT-013`» | `STD-005` ARC-010 | **`DBT-013` has been `closed` since 2026-09-04.** The standard cites an open debt that is shut |

## 2. Why this is worse than a missing guard

A rule with no guard is honest: the reader knows to check by hand.

**An `[AUTO]` mark that names a tool is a claim about the tree.** It tells the
reader a machine already checked, so nobody checks. The rule looks enforced and
is not — the exact pattern this system calls a silent failure.

The licence declaration is the sharpest case. An external audit at `959ad78`
listed REUSE/SPDX as *"the best-executed standard in the repository — use it as
a quality template for everything else"*. The declaration is exemplary. **Its
execution does not happen.** The audit applied its own criterion — installed
tool, not mentioned tool — to everything except the thing it was praising.

## 3. What the first real run found

`reuse lint` had never been executed against this tree. Running it found three
defects that eleven guards and six CI checks had never seen:

| Defect | Where | Nature |
|---|---|---|
| Unparseable SPDX expression | `CLAUDE.md`, `STD-010` | a documentation example (`MIT   (or the applicable ID)`) read by the tool as a real declaration |
| One file with no licence information | `CLAUDE.md` | consequence of the above |
| Unused licence | `LICENSES/` | see below |

The first two are fixed with `REUSE-IgnoreStart` / `REUSE-IgnoreEnd`, the
mechanism the specification provides for exactly this. **Both appear twice
because the same 620-word block is duplicated by hand between `CLAUDE.md` and
`STD-010`** — the drift already recorded as debt. One defect, two copies.

**On `AGPL-3.0-only`:** the licensing regime puts applications under AGPL and
`STD-010` names it fifteen times, but no file in this repository carries that
identifier — the applications live elsewhere. REUSE treats an unreferenced
licence text as an error, so adding it here would break compliance to fix a
documentation gap. **It belongs in the repository that ships AGPL code, not in
this one.** Recorded so the next reader does not repeat the attempt.

## 4. The fourth way

The guards are not disabled, not ignored, and not deceived. **Nor are they
invented in a hurry to close this entry.**

Two exits are legitimate and both are honest:

1. **Install the tool** — then the mark is true.
2. **Lower the mark to `[MANUAL]`** — then the mark is true and the reader knows
   to check by hand.

Choosing (2) is not a defeat. It is the difference between a system that knows
what it verifies and one that assumes it.

## 5. What this entry does not decide

- Whether `reuse lint` should enter `ci.yml`. **The CI is not touched without an
  express order.** Today the guards only look.
- Whether the DCO rule should survive at all. Thirty commits with zero
  signatures is evidence that either the rule or the practice is wrong, and
  which one is an Oracle decision.

## 6. References

- `STD-005` ARC-003, ARC-006, ARC-010 — the declarations
- `STD-010` — the DCO rule
- `STD-005` — the outside standards the declarations rest on
- `DBT-013` — closed 2026-09-04, still cited as open
- `CAN-005` — the original warning about checks that pass by not running
