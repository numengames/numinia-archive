---
id: "MIS-170"
uid: ""
title: "Each world has its own admin code, and an Oracle changes it with one signature: a client's code opens the client's world and nothing else"
type: mission
status: done
version: "0.3.0"
created: "2026-10-12T16:48:26+02:00"
updated: "2026-10-27T02:30:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, secrets, admin-code, numinia-web]
license: "CC0-1.0"

priority: high
effort: S
executor: agent
assigned_to: null
completed: "2026-10-27T02:30:00Z"

depends_on: []
requires_oracle_approval: true
context: "2026-10-12T16:48:26+02:00"
paths: [system/SYS-014-the-worlds-fleet-as-wired.md, debt/DBT-025-the-worlds-fleet-runs-on-unreviewed-shortcuts.md]
in_review_at: "2026-10-12T22:13:00+02:00"
related: ["MIS-169", "MIS-173", "MIS-175", "DBT-025", "SYS-014"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-170 — Each world has its own admin code

> **Summary:** Every world on a fleet machine shares one admin code today:
> the machine makes it once and copies it into each world's keys, so a
> client's code would also open the house's worlds on the same machine. This
> mission gives each world a code of its own, shown and changed from the
> world's card in the worlds room with one signature each. A change restarts
> only that world, and everyone in it keeps who they are.
> **Epistemic:** Which code opens which world, and how fast a leaked code
> stops working.
> **Pragmatic:** A client gets a code that opens their world and nothing
> else; a code shared by mistake is replaced in a minute.
> **Audience:** Agents · Oracles · Clients

---

## 1. Scope

- **Two new requests**, flat typed data in the fleet's domain (`Numinia
  Fleet`, version 1), signed and checked like the others:
  - `ShowWorldCode(machine, world, nonce, expires)` — the door answers that
    world's code;
  - `RotateWorldCode(machine, world, nonce, expires)` — the door makes a new
    code (16 hexadecimal characters), writes it into the request it drops in
    the inbox and answers it; a second rotation of the same world while one
    waits is refused `busy`.
  `CreateWorld` answers the new world's own code, made the same way.
  `ShowAdminCode`, the machine-wide code, stays accepted for now so the live
  room keeps working, marked legacy in the machine's README.
- **Where the codes live:** one file per world, `/etc/fleet/codes/<id>`
  (`root:fleetd`, mode 640, so the door can read it and not write it); the
  world's `env/<id>.env` holds the same code beside its JWT secret.
- **The reconciler:** a creation writes the code its request carries; a
  rotation rewrites the world's key file keeping its JWT secret, so people
  keep their identity, and restarts only that world, after its next save, as
  a stop does; a stopped world gets its new code and stays stopped; a
  deletion removes the world's code with its keys. No log line carries a
  code.
- **Migration:** the first run of the new reconciler copies each world's
  current code into its file, so `prueba` and `pablofm` keep the code they
  have — the old machine code — until an Oracle changes it. It never changes
  a key file and can run twice.
- **The room** (numinia-web): each world card gets *Admin code*, with
  *Show* and *Change code*, one signature each; the change's dialog says the
  world restarts and whoever is inside is disconnected for a few seconds,
  and on a stopped world that the code applies when it starts. The machine
  line loses its admin-code button. The wizard's last screen shows the new
  world's own code; the history names both requests in the five languages.
- **The vectors:** both repositories hold the same file of signed vectors,
  made once with throwaway keys and copied verbatim, so the room and the
  machine cannot drift apart.
- The engine is not touched: it still reads `ADMIN_CODE` from the world's
  environment.

Out of scope: administrators named in the order as wallets, which needs a
change in the engine (`DBT-025`); retiring `ShowAdminCode`; installing a
pinned recipe (`MIS-173`).

---

## 2. Acceptance criteria

- [x] A signed `ShowWorldCode` answers that world's code, and two worlds on
  the same machine answer different codes. Today: the machine's reconciler
  (numinia-assets `reconcile.py`) names `/etc/fleet/admin-code` as the one
  code "every world keyed here gets".
  *Accepted on the Oracle's word, 2026-10-27; the live check was not run again (see §3).*
- [x] A signed `RotateWorldCode` answers a new code that opens build mode in
  that world (`/admin <code>` in its chat), the old code no longer does, and
  the world's JWT secret is unchanged. Today: no request changes a code —
  the machine understands CreateWorld, DeleteWorld, StopWorld, StartWorld,
  DownloadWorld and ShowAdminCode (numinia-assets `walletsig.py`).
  *Accepted on the Oracle's word, 2026-10-27; the live check was not run again (see §3).*
- [x] A rotation restarts that world's container and no other, and a stopped
  world takes its new code and stays stopped; the machine's tests hold both.
  Today: the reconciler never touches a key file that exists, so no world
  is ever restarted for its keys.
- [x] After the new reconciler's first run on open-1, `prueba` and `pablofm`
  still open build mode with the code they had, and `/etc/fleet/codes/`
  holds one file per world. Today: the bootstrap makes one code for the
  whole machine, `/etc/fleet/admin-code`, and no folder of codes
  (`grep -c codes bootstrap.sh` returns 0).
  *Accepted on the Oracle's word, 2026-10-27; the live check was not run again (see §3).*
- [x] In the worlds room, each world card shows and changes its own code,
  and the machine line has no admin-code button. Today: the code sits on the
  machine line — an *Admin code* button (`data-metric="worlds-admin-code"`)
  whose dialog signs `ShowAdminCode` for the whole machine (numinia-web
  `main` at `7f06254`).
- [x] Both repositories hold the same vectors file, and each one's tests
  pass on it, the two new requests included. Today: the shared vectors
  (`tests/fleet_vectors.json`) cover the six request types above, none of
  them about a world's code.

---

## Execution log

**2026-10-12 — built, merged and live; in review until the Oracle's
check.** The machine's side is numinia-assets pull request 21, merged as
`2ca8e2c1372b2ea4d5207d4bbc35c9a8973639d9` at 18:56 UTC; the room's side is
numinia-web pull request 106, merged as
`080f176d11758b5040894aa35899af40b5e16b69` at 19:45 UTC, site v0.79.0.
Measured at 20:27 UTC (22:27 Madrid): numinia.com's `version.json` names
`080f176…`, open-1's door answers `"recipe": "2ca8e2c…"`, three worlds sit
on it — `p1` running, `dani` and `pablofm` stopped; `prueba` was deleted at
20:22 — and its log holds no `ShowWorldCode` or `RotateWorldCode` yet.
Read against the criteria above:

- **A world's own code, two worlds two codes** — to be seen live in the
  Oracle's check. The door shows the code it reads from that world's own
  file (`/etc/fleet/codes/<id>`, numinia-assets `fleetd.py`). `p1` and
  `pablofm` were keyed before this build reached open-1 — `p1` was created
  at 17:38 UTC, before the machine's merge, and `pablofm` was adopted from
  the public book — so, by the machine's README, both keep the machine's
  old shared code until an Oracle changes it; `dani`, created through the
  new door at 20:13 UTC, was born with its own, since the door makes one
  for each creation. *Mostrar* (show) on `dani` and on `p1` should answer
  two different codes.
- **A change opens build mode with the new code only, the JWT secret
  kept** — to be seen live when the Oracle signs *Cambiar código* (change
  code) on a world and types `/admin <code>` in its chat. The machine's
  tests hold the key file: only its `ADMIN_CODE` line changes, while the
  JWT secret and a hand-written voice line stay
  (`test_a_change_of_code_keeps_everything_else_and_queues_a_restart`).
- **That world restarted alone, a stopped one left stopped** — met by the
  machine's tests at `2ca8e2c`:
  `test_a_world_whose_code_changed_is_restarted_alone_after_its_next_save`
  recreates that world alone, after a 12-second wait for its save, and
  touches neither the other world nor Caddy;
  `test_a_world_stopped_deleted_or_started_needs_no_restart_for_its_code`
  holds that a world stopped, deleted or started in the same run is never
  restarted for its code; and the change leaves the order's state as it
  was. No test changes the code of a world that is already stopped and
  then starts it.
- **open-1 keeps its codes, one file per world** — to be seen live:
  *Mostrar* on `pablofm` must answer the code it had. `prueba`, the other
  world the criterion names, was deleted at 20:22 UTC, so `p1`, keyed the
  same way, stands in for it. The first run of this version copies each
  world's code from its key file into the folder of codes and writes no key
  file (`test_each_world_keeps_the_code_it_has_and_no_key_file_changes`).
- **The room** — met in the room's code at `080f176`: each world card of
  the fleet carries *Código de administración* (admin code) with *Mostrar*
  and *Cambiar código*, one signature each, and the machine line's old
  button (`worlds-admin-code`) appears nowhere in numinia-web's
  `apps/store/src`. The Oracle sees it at
  https://numinia.com/es/lap/admin/worlds/.
- **The same vectors on both sides** — met: numinia-assets'
  `tests/fleet_vectors.json` holds eight request types, the two new ones
  among them, and 21 hex values (eight digests, eight signatures and a
  stranger's, four keccak checks); numinia-web holds the same 21 values,
  copied verbatim into its `fleet.test.ts` rather than kept as a file. Read
  at 20:07 UTC, both merge commits' checks were green: 5 of 5 on
  numinia-assets, whose `build` runs the depot's 171 tests, and 11 of 11
  on numinia-web.

Found after the build and written in numinia-web pull request 106: a
change of code demotes nobody, because the engine keeps each person's rank
in the world's own database, so whoever became administrator with the old
code stays one — a debt in `DBT-025`, which `MIS-175` pays.

---

## 3. Closure

**Closed 2026-10-27 by the Oracle's word.** Pablo said the numinia.org missions can
close now. The build, the machine's tests and the room's code were already evidenced in the
execution log of 2026-10-12 (criteria 3, 5 and 6). Criteria 1, 2 and 4 are the live check
(*Show* on two worlds, *Change code* then `/admin <code>`, *Show* on `pablofm`); it needs the
Oracle's signature and was not run again, so they are ticked on his acceptance, not on a new
measurement. Read today at 02:21 UTC, open-1's door answers `"recipe": "dbf95bb…"` and its
last run was `ok`, so the machine runs a newer recipe than the one the log measured.
