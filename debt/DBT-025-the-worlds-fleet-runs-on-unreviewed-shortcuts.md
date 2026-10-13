---
id: "DBT-025"
uid: ""
title: "The worlds fleet runs on shortcuts no technical reviewer has checked"
type: documentation
status: active
version: "0.2.0"
created: "2026-10-12T11:53:57+02:00"
updated: "2026-10-12T22:13:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [debt, virtual-worlds, fleet, security, backups, review]
license: "CC-BY-4.0"
severity: high
severity_reason: "open-1 keeps every world of the fleet with no copy but the ones someone downloads, while numen.games/hosting offers one every night, and whoever once typed a world's admin code stays its administrator after the code changes"
detected: "2026-10-12T10:51:00+02:00"
visibility: "public"
visibility_reason: "the machine's own README already publishes these debts; a reviewer outside the house must be able to read them"
related: ["SYS-014", "ADR-069", "MIS-156", "MIS-158", "MIS-159", "MIS-161", "MIS-170", "MIS-175"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# DBT-025 — The worlds fleet's unreviewed shortcuts

> **Summary:** To make a world appear, travel and go with nothing done by
> hand, the public fleet's trial took shortcuts that no technical reviewer
> has checked yet. This entry lists them, with what each one risks and what
> pays it.
> **Epistemic:** Which parts of `SYS-014` a stronger engineer should doubt
> first, and why each was accepted.
> **Pragmatic:** Read it before putting a world with real content on the
> fleet, before selling hosting, and before reviewing the fleet.
> **Audience:** Agents · Oracles · Technical reviewers

---

## 1. The defect

Ten shortcuts, counted on 2026-10-12 from the machine's README and the
code. Each was accepted to reach a first world; none is the design.

| Shortcut | What it risks | What pays it |
|---|---|---|
| One admin code per world, shown to a signed Oracle and typed in the world's chat; the worlds keyed before 2026-10-12's build share the machine's old code until theirs is changed | whoever holds it administers that world, and whoever used it stays administrator after the code changes: the engine keeps each person's rank in the world's own database, and its players list cannot demote an administrator | administrators named as wallets (`MIS-159`); until then, a change of code that sets that world's administrators back to visitors while it is down (`MIS-175`), and one change for each world keyed before the build |
| No copy but the ones someone downloads; the book of orders lives only on its machine | a lost machine loses its worlds and its book, while numen.games/hosting offers a copy every night | the nightly copy, which takes the book with the worlds (`MIS-158`) |
| The engine runs as root inside its container | an escape from the engine starts as root | a non-root user in the compose file, owning the world's folder |
| Each machine's Oracles are listed by hand, by running its bootstrap line again | adding or removing an Oracle needs someone at the machine | owners by wallet in the order, and a signed request that changes the list |
| A download link is the key to its copy for a day | whoever holds the link gets that copy | a signature at download time, if needed |
| A world is born without its card in `objects/`, although `ADR-069` asks for the card first | a world the archive does not know | the card written after birth, or proposed by the room |
| A world's engine and limits cannot be changed after it is created | updating the engine means deleting the world and creating it again | a signed request that edits an order (`MIS-159`) |
| One wildcard DNS record per zone points at open-1 | a second machine needs its records written by hand | records written by the room with a key limited to the zone, once a second machine exists |
| An Oracle's wallet is the only key, and one signature deletes a world | a stolen wallet deletes every world on the machines that list it | a second signature for deletes, or a hardware wallet for every Oracle |
| The engine saves a world's apps and blueprints only on its timer, never when it is told to stop, so the machine waits one `SAVE_INTERVAL` (10 s) before it stops or copies a world | every stop and every copy takes up to 12 seconds longer, and a world that dies without warning (a crash, a reboot, no memory left) still loses up to 10 seconds of edits | the engine saving when it receives SIGTERM, as the twelve-factor app's disposability asks — a change for the engine's maintainer, in the engine's own repository |

Four choices a reviewer may also question, recorded so the question has an
answer:

- **The door and the reconciler are the house's own code**, not Doco-CD or
  Komodo. An order is JSON, not a compose file, so a git-to-compose tool
  would need a translation step anyway; that step is the reconciler, pure
  functions with tests.
- **The recipe lives in numinia-assets**, the resource depot, beside the
  trial's first orders. It moves with them when `ADR-069`'s exit
  conditions are met.
- **Wallet signatures, not an identity provider**, order the machines: the
  console holds no key, so a stolen website cannot order a machine.
- **The hand-run server's five worlds stay outside the fleet.** The room
  watches them; nothing changes them.

---

## 2. Evidence

```
$ curl -s https://open-1.numinia.com/fleet/v1/machine
{"machine": "open-1", "door": "fleetd/1", "oracles": 1, "zones": ["numinia.com", "numen.games"]}
$ git grep -l -E '^entity: "?world"?' -- objects/
(nothing)
```

Measured on 2026-10-12 at 11:56 Madrid time. The first five shortcuts are
the *Debts, on purpose* section of the
[machine's README](https://github.com/numengames/numinia-assets/blob/main/open-worlds/machine/README.md)
at numinia-assets `a593e13`; the last one joined that section at `f3de8dd`
(numinia-assets pull request 19). In the engine, numinia-hyperfy2 at
`0e20453`, the server writes the blueprints and apps that changed every
`SAVE_INTERVAL` seconds, and on SIGTERM it closes and exits without saving
(read the same afternoon). The request types in numinia-web
`apps/store/src/lib/fleet.ts` are create, delete, stop, start, download and
show the admin code: none edits an order. numen.games/hosting offers
*Cada noche, 14 días* (numengames-web `src/content/hosting.ts`).

Measured again on 2026-10-12 at 22:02 Madrid time, after numinia-assets
pull request 21 (merge `2ca8e2c`) and numinia-web pull request 106 (merge
`080f176`, site v0.79.0) gave each world its own code: open-1's
`/fleet/v1/machine` answers `{"machine": "open-1", "door": "fleetd/1",
"oracles": 1, "zones": ["numinia.com", "numen.games"], "recipe":
"2ca8e2c1372b2ea4d5207d4bbc35c9a8973639d9", "lastRun": {"at":
"2026-10-12T20:01:39Z", "ok": true, "rule": null}, "waiting": {"requests":
0, "since": null}, "at": "2026-10-12T20:02:40Z"}`. The machine's README at
`2ca8e2c` lists the old shared code among its debts. The engine at
`0e20453` keeps each person's rank in the world's `users` table (`Ranks`:
ADMIN 2, BUILDER 1, VISITOR 0), `/admin <code>` writes it there, and its
players list offers a rank button only for someone who is not an
administrator (read that evening); pull request 106 records the debt.

---

## 3. Closure condition

> **Closes when:** every row of the first table is paid — its piece merged
> and live — or marked accepted by the Oracle after a technical review, and
> that review is linked here.

---

## 4. Cost of leaving it open

Until the nightly copy exists, a lost machine loses every world on it, with
no way back but a copy someone happened to download; and selling hosting
before it promises what the machine does not do (`STD-033`). A leaked admin
code administers its world — or, while the worlds keyed before 2026-10-12's
build still share the machine's old code, all of them — and whoever used it
stays administrator after the code changes (`MIS-175`).
