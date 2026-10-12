---
id: "MIS-168"
uid: ""
title: "A machine updates itself with one signature: the Oracle signs which build of the machine's programs to install, and the machine fetches, checks and installs it — no SSH"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-12T13:11:36+02:00"
updated: "2026-10-12T13:11:36+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, updates, supply-chain, numinia-web]
license: "CC0-1.0"

priority: medium
effort: M
executor: hybrid
assigned_to: null
completed: null

depends_on: ["MIS-156"]
requires_oracle_approval: true
context: "2026-10-12T13:04:00+02:00"
paths: [system/SYS-014-the-worlds-fleet-as-wired.md, debt/DBT-025-the-worlds-fleet-runs-on-unreviewed-shortcuts.md]
related: ["MIS-162", "MIS-163", "MIS-164", "MIS-167", "SYS-014", "DBT-025", "ADR-069"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-168 — A machine updates itself with one signature

> **Summary:** A fleet machine learns new code today only when someone opens
> SSH and pastes its bootstrap line again, so every machine change of
> `MIS-162`, `MIS-163`, `MIS-164` and `MIS-167` costs a session at the
> machine — and one such run on 2026-10-12 stopped halfway without a word.
> This mission adds `UpdateMachine`: the Oracle signs the exact commit of
> numinia-assets to install, the machine fetches it, checks it, installs it
> the way the bootstrap does, restarts its door and its reconciler, says
> which build it runs, and goes back to the previous one if the new one does
> not come up.
> **Epistemic:** Which build each machine runs, and whether it is behind.
> **Pragmatic:** *Update machine* in the room replaces the SSH session.
> **Audience:** Agents · Oracles

---

## 1. Scope

- **The request:** `UpdateMachine(machine, commit, nonce, expires)`, signed
  like the others. The machine refuses a commit that is not on
  numinia-assets' `main`. The fleet's rail holds: a merged pull request alone
  changes no machine; the Oracle's signature names the build.
- **The install:** the same steps as the bootstrap's, from the fetched commit,
  never run from the clone; the previous programs are kept.
- **The proof it came up:** after the restart the door answers and the
  reconciler completes a run; otherwise the machine puts the previous
  programs back by itself and says so in its log.
- **What it says:** `/fleet/v1/machine` names the commit it runs; the room
  compares it with `main` and offers *Update machine*.
- The bootstrap line stays for a new machine and for changing a machine's
  list of Oracles.

### Standards to select when the mission opens (not the selection)

| Area | What it covers here | Candidates |
|---|---|---|
| Secure updates | what a stolen link in the chain can install | The Update Framework (TUF); Sigstore; the house's EIP-712 requests naming a commit |
| Code that changes only by approval | the rail of `ADR-069` | signed GitOps (Flux's source verification, Argo CD's source integrity) |

The choice and its reason go in this mission's execution log.

Out of scope: updating the engine image of a running world (an order edit,
`DBT-025`); changing a machine's Oracles by request; creating a new machine
from the room.

---

## 2. Acceptance criteria

- [ ] `curl -s https://open-1.numinia.com/fleet/v1/machine` names the commit
  of the programs it runs. Today: it names the door's protocol (`fleetd/1`)
  and nothing about its build.
- [ ] From the room, one signature updates open-1 to a newer commit of
  numinia-assets' `main`, with no SSH session. Today: the bootstrap line,
  pasted over SSH.
- [ ] A request naming a commit that is not on `main` is refused with its
  rule. Today: no such request.
- [ ] An update whose door does not answer after the restart goes back to
  the previous programs by itself. Today: no update path.

---

## 3. Closure

*(Fill when the mission closes.)*
