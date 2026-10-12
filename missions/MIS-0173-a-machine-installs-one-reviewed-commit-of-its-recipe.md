---
id: "MIS-173"
uid: ""
title: "A machine installs one reviewed commit of its recipe: the bootstrap line names the commit, the machine installs exactly that one and says which it runs"
type: mission
status: in-review
version: "0.2.0"
created: "2026-10-12T16:48:26+02:00"
updated: "2026-10-12T22:13:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, supply-chain, numinia-assets, numinia-web]
license: "CC0-1.0"

priority: high
effort: S
executor: hybrid
assigned_to: null
completed: null

requires_oracle_approval: true
context: "2026-10-12T16:48:26+02:00"
paths: [system/SYS-014-the-worlds-fleet-as-wired.md, standards/STD-015-engineering-checks.md]
in_review_at: "2026-10-12T22:13:00+02:00"
related: ["MIS-170", "MIS-168", "MIS-174", "DBT-025"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-173 — A machine installs one reviewed commit of its recipe

> **Summary:** A fleet machine installs whatever numinia-assets' `main`
> holds at the moment its bootstrap line runs, and nothing says which build
> a machine runs. A change merged on `main` — which today needs no approval
> (`MIS-174`) — reaches the next machine whose line is run again, whether
> anyone meant it to or not. This mission pins the recipe: the line the room
> hands out names one reviewed commit, the machine installs exactly that one
> and says which it runs, and the room warns when a machine runs another.
> **Epistemic:** Which build of the recipe each machine runs, and whether it
> is the one the room expects.
> **Pragmatic:** Re-running the bootstrap line on a machine installs what
> was reviewed, never what happened to land last.
> **Audience:** Agents · Oracles

---

## 1. Scope

- **The pin:** the bootstrap reads `FLEET_REF`, a commit of 40 hexadecimal
  characters; anything else stops it with a message that says why. Left
  empty it installs `main`, with a warning line that the recipe is not
  pinned. The machine's clone ends at exactly that commit, fresh or not, and
  the programs are installed from it, as today.
- **What the machine says:** `/etc/fleet/recipe` holds the commit it
  actually installed, also when it installed `main`, and the door answers it
  at `/fleet/v1/machine` as `recipe`.
- **The room's line:** the bootstrap line the room hands out names the
  reviewed commit twice — in the script's address and in `FLEET_REF` — and
  a machine whose `recipe` is another commit shows a warning with its line
  to run again.

### Standards to select when the mission opens (not the selection)

| Area | What it covers here | Candidates |
|---|---|---|
| Pinning what a machine installs | the recipe's version | a full commit, as the house pins third-party Actions (`STD-015` SEC-007); a signed tag; The Update Framework, once `MIS-168` updates by signature |

The choice and its reason go in this mission's execution log.

Out of scope: the rule on numinia-assets' `main`, which the Oracle deferred
(`MIS-174`); updating a machine without its bootstrap line (`MIS-168`);
signing commits.

---

## 2. Acceptance criteria

- [ ] `curl -s https://open-1.numinia.com/fleet/v1/machine` answers
  `recipe`, the 40-character commit open-1 installed, and it equals the
  commit in the room's line. Today: it answers `machine`, `door`,
  `oracles`, `zones`, `lastRun`, `waiting` and `at`, and nothing about its
  recipe (2026-10-12, 16:43 Madrid).
- [ ] The bootstrap installs exactly the commit `FLEET_REF` names, and a
  value that is not 40 hexadecimal characters stops it with its message; the
  machine's tests hold both. Today: the bootstrap clones the repository's
  default branch (`git clone --quiet --depth 1`) or, on a re-run, pulls it
  (`git pull --ff-only`) — numinia-assets `bootstrap.sh`.
- [ ] The line the room hands out names one commit, in the address and in
  `FLEET_REF`, and a machine running another recipe shows a warning with
  its line. Today: the room's line fetches the script from `main`
  (numinia-web `fleet.ts`, `BOOTSTRAP_URL`, at `7f06254`) and the room knows
  nothing of a machine's recipe.

---

## Execution log

**2026-10-12 — built, merged and live; in review until the Oracle's
check.** The machine's side is numinia-assets pull request 21, merged as
`2ca8e2c1372b2ea4d5207d4bbc35c9a8973639d9` at 18:56 UTC; the room's side is
numinia-web pull request 106, merged as
`080f176d11758b5040894aa35899af40b5e16b69` at 19:45 UTC, site v0.79.0.

**The standard chosen**, as the table above asked: a full commit of 40
hexadecimal characters, the way the house pins third-party Actions
(`STD-015` SEC-007); the bootstrap refuses any other value. A signed tag
and The Update Framework are left for `MIS-168`, where a machine updates
itself by signature.

Read against the criteria above:

- **The door says its recipe, equal to the room's** — met. Measured at
  20:02 UTC (22:02 Madrid): `curl -s https://open-1.numinia.com/fleet/v1/machine`
  answers `"recipe": "2ca8e2c1372b2ea4d5207d4bbc35c9a8973639d9"`, the same
  40 characters as `FLEET_REF` in numinia-web `fleet.ts` at `080f176` —
  the commit in the line the room hands out.
- **Exactly the commit `FLEET_REF` names, anything else refused** — met by
  the machine's tests at `2ca8e2c`. Two tests name `FLEET_REF`:
  `test_bootstrap_installs_exactly_the_commit_it_is_given` (the clone
  fetches `FLEET_REF`, or `main` when it is empty, checks that commit out
  detached, installs nothing when the commit it got is another, and writes
  `/etc/fleet/recipe` once the programs are in) and
  `test_bootstrap_refuses_a_ref_that_is_not_a_whole_commit` (eight values —
  `main`, seven characters, upper case, 39 and 41 characters, a trailing
  newline, a `;reboot` suffix, a leading space — each stop it with exit 2
  and *FLEET_REF IS NOT A COMMIT*). A third,
  `test_the_machine_says_which_commit_of_its_recipe_it_runs`, holds the
  door's `recipe`, which says nothing when the file is missing or holds
  anything but a whole commit. The merge commit's `build` check, which runs
  these tests, was green when read at 20:07 UTC.
- **The room's line names one commit and warns about another** — met in
  the room's code at `080f176`: the line fetches the bootstrap from that
  commit of numinia-assets and runs it with `FLEET_REF` set to it; each
  answering machine's line shows `receta <7 hex>` (recipe), and a machine
  whose `recipe` is another commit, or none, shows *usa una receta
  anterior: relanza su línea* (it runs an older recipe: run its line again)
  with its line. The Oracle sees it at
  https://numinia.com/es/lap/admin/worlds/; by the code and the measured
  `recipe`, open-1 shows no warning.

The rule on numinia-assets' `main` was split out to `MIS-174`, which the
Oracle deferred, and is not part of this closure. Until it lands, a pin is
only as good as the commit it names; the machine's README lists that among
its debts.

---

## 3. Closure

*(Fill when the mission closes.)*
