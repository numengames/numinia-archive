---
id: "SYS-014"
uid: ""
title: "The worlds fleet, as wired"
type: documentation
subtype: reference
status: draft
version: "0.1.0"
created: "2026-10-12T11:53:57+02:00"
updated: "2026-10-12T11:53:57+02:00"
author: "ursa"
owner: "oracle"
digital_source_type: ai-assisted
section: "Products and services"
tags: [system, reference, virtual-worlds, hosting, fleet, control-plane, wallet, eip-712]
license: "CC0-1.0"
related: ["ADR-069", "MIS-156", "MIS-158", "MIS-159", "MIS-161", "SYS-013", "SYS-015", "DBT-025"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SYS-014 — The worlds fleet, as wired

> **Summary:** How a 3D world of the public fleet is born, runs and goes
> away today: an Oracle signs one request in numinia.com's worlds room, and
> the machine that runs the world checks the signature itself and does the
> work.
> **Epistemic:** Which pieces make up the public fleet, what each one holds,
> who holds each key, and which of them run today.
> **Pragmatic:** Before creating a world, changing a machine or reviewing the
> fleet's security, know which piece acts and what it refuses.
> **Audience:** Agents · Oracles

> **A system document is a reference manual, not a plan.** Pieces that do not
> exist yet are listed as *not wired*, with what wires them; nothing here
> says they run until they do.

---

## 1. Scope

The public fleet that `ADR-069` decides and `MIS-156` builds: its machines
(one today, `open-1`, a small server in France), the worlds room on
numinia.com that is its console, and the signed requests between them. An
*Oracle* is the platform's top rank (`STD-003`): the house's administrators.

Not covered: how a person signs in to numinia.com and comes to hold that
rank, which is `SYS-015`; the two earlier setups — the paused AWS cluster
and the hand-run server with five worlds, which the room only watches; what
a world costs (`MIS-161`); the engine itself; and a private fleet, which
does not exist yet.

---

## 2. How it works

### The pieces

| Piece | What it is | Where it lives | What it holds | State |
|---|---|---|---|---|
| **The worlds room** | the console: a room of numinia.com's player area, *LAP › Management › Worlds*, that only an Oracle opens | numinia-web, `apps/store/src/components/lap/admin/` and `apps/store/src/lib/fleet.ts` | no key: it reads each machine's public window and writes the request the wallet signs | wired, site v0.77.0 |
| **The Oracle's wallet** | the wallet the Oracle signs in with: thirdweb's in-app wallet for Google, email or passkey, or MetaMask or WalletConnect | the Oracle's browser or device | the only key that orders a machine | wired |
| **The door** | `fleetd`, a small web service on each machine: takes signed requests, publishes the machine's facts, hands out copies | numinia-assets `open-worlds/machine/fleetd.py`, behind the machine's Caddy at `https://<alias>.numinia.com/fleet/v1/` | the request numbers already used | built; not yet on open-1 |
| **The reconciler** | the machine's worker: checks each request again, changes the machine's book and makes the containers match it | numinia-assets `open-worlds/machine/reconcile.py`, run every minute and on each request | root on the machine | built; open-1 still runs the version that read the public book |
| **The book** | one order per world: id, card, state, machine, address, engine image, limits | on each machine, written only by its reconciler | no secret; which wallet signed the creation | built; `prueba` and `pablofm` still sit in numinia-assets `open-worlds/`, to be adopted once |
| **The worlds** | one container per world, running the house's engine image pinned to one build, with Caddy in front for HTTPS | on each machine | the world's data, and its keys, made by the machine | two running on open-1 |
| **The recipe** | one bootstrap line that turns a fresh server into a fleet machine, or updates one | numinia-assets `open-worlds/machine/` | nothing secret | wired |
| **DNS** | wildcard records `*.numinia.com` and `*.numen.games` pointing at open-1, DNS only | Cloudflare, set by an Oracle | — | wired while there is one machine |
| **The world's card** | what the world is: an entity card in `objects/` (`ADR-069`) | this archive | nothing secret | not wired: no world has one yet |

### A world is born

1. The Oracle signs in to numinia.com (`SYS-015`) and opens *Worlds*. The
   room's data comes from one endpoint that answers 403 to anyone whose
   signed session lacks the permission to manage worlds (numinia-web
   `apps/store/src/pages/api/admin/worlds.ts`).
2. The room reads each machine's public window (`/fleet/v1/machine`,
   `/worlds`, `/log`), the world cards from this archive, and each world's
   own `/status`. A machine whose window does not answer shows as closed,
   with the one line that bootstraps it — the signed-in wallet already
   written into it — and a Copy button.
3. *New world* asks for four things: a name, which names the world, its
   order and its card alike; the machine and the address, a name under
   numinia.com or numen.games that the browser checks against public DNS;
   the engine, a pinned build of the house's image; and the limits, by
   default 2 GB of memory, 1.5 CPUs and 50 MB per upload.
4. *Sign and create.* The room writes a `CreateWorld` request: machine,
   world, address, image, limits, a random 128-bit number and an expiry ten
   minutes ahead. The wallet shows every field before it signs. The format is
   EIP-712 typed data, domain `Numinia Fleet`, version 1: the standard way a
   wallet signs a message that a server checks. The room refuses to sign with
   any wallet but the session's.
5. The browser sends the request straight to the machine,
   `POST https://<alias>.numinia.com/fleet/v1/actions`. numinia.com's server
   never sees it.
6. The door checks that the request names this machine, has not expired and
   ends at most fifteen minutes ahead, carries a number never used here,
   came from numinia.com's page or from a script with no browser origin, and
   is signed by a wallet on this machine's list; it takes no more than twenty
   requests from one address in five minutes. It drops the request in the
   machine's inbox and answers with the admin code. A refusal names its
   reason, which the room puts in plain words: `not-an-oracle-here`,
   `expired`, `replayed`, `exists`, `address-taken`.
7. The reconciler checks the signature, the signer, the machine and every
   field again, writes the order, makes the world's keys — a JWT secret of
   its own and the machine's admin code — starts the container and gives
   Caddy the new address, with a reload that keeps the other worlds
   connected.
8. The room shows the world being born, with its admin code, and the world
   opens at its address over HTTPS in under a minute. `/admin <code>` typed
   in the world's chat makes that browser an administrator of the world, who
   can then build in it.

### Stop, start, download, delete

One signed request each, from the world's card in the room.

| Action | What the machine does | What stays |
|---|---|---|
| Stop | takes the container down | the data and the keys |
| Start | brings it back with its data | — |
| Download | zips the world whole: a consistent copy of its database, its files, a compose file that runs it on `localhost:3000` with the same engine build, fresh keys, a SHA-256 manifest and a short guide; the link works for a day | the world, untouched |
| Delete | after the Oracle types the world's name, removes the order, the container, the world's folder, its keys and its copies; the address is part of what is signed | the card, if there is one, and any copy already downloaded |
| Show the admin code | returns the machine's admin code | — |

### Who may order what: two lists

- numinia.com's list of Oracles, a secret of its Worker (`SYS-015`), opens
  the room.
- Each machine's own list, written by its bootstrap line, decides whose
  signature that machine obeys. A wallet on the first list and not on the
  second sees the room, and every request it signs is refused
  `not-an-oracle-here`. Adding an Oracle to a machine means running its
  bootstrap line again with the new list.

A Google or email sign-in creates a different wallet from MetaMask, so one
person may hold two wallets: the machine obeys only the one in its line.

### What anyone can read

Each machine's window answers without a key: the machine, its worlds and
the phase each is in (creating, running, stopping, stopped, starting,
deleting), what it did and when, with the signer's wallet shortened, how a
request went, and a copy's state. Each world answers `/status`: uptime,
people inside, engine build. The room shows nothing an outsider could not
read, except the admin code, which only a signed request reveals.

### What the machine refuses, and what a theft gives

The machine refuses an image outside the house's registry
(`ghcr.io/numengames/`) or not pinned to one build; an address that is not
one name under a house zone, or under a client domain listed on that
machine; any order field that does not match its strict pattern; and a
running world with no keys on a machine with no admin code, since an empty
code would make every visitor an administrator.

| If this is stolen | The thief gets | And does not get |
|---|---|---|
| numinia.com | nothing on the machines; it could show a false page and ask for a signature, and the wallet shows exactly what is signed | any machine, any key |
| an Oracle's wallet | every action on the machines that list it, and their admin code | code execution, images outside the registry, addresses outside the zones |
| a machine | its worlds' data and keys, and its admin code | GitHub, the other machines, any wallet |
| the admin code | administrator of every world on that machine | the machine itself |
| a signed request | nothing more: one machine, one world, fifteen minutes | anything else |

The full table, with the door and the download links, is in the
[machine's README](https://github.com/numengames/numinia-assets/blob/main/open-worlds/machine/README.md).

### Not wired yet

Each is a debt of the trial, kept with what pays it in `DBT-025`:

- one admin code per machine, shared by all its worlds and typed in a chat;
- no nightly copy (`MIS-158`), although numen.games/hosting offers one;
- the book lives only on its machine;
- a world is born without its card;
- a world's engine and limits cannot be changed after it is created;
- what a world costs is not shown (`MIS-161`).

---

## 3. How to verify it

```
$ curl -s https://numinia.com/version.json
{"commit":"1bc7bef…","builtAt":"2026-10-12T09:22:04.117Z"}    the room that signs is live
$ curl -s https://open-1.numinia.com/fleet/v1/worlds
a JSON list of worlds and their phases                          the door is up
$ curl -s https://prueba.numinia.com/status
{"uptime":…,"protected":true,"connectedUsers":[],"commitHash":"0e2045370989d051e73f81c7c9d53121d5c374b3"}
```

`commitHash` must equal the build pinned in the world's order. On a
machine, `journalctl -u fleet-reconcile -n 20` says what the last runs did,
and `fleet-reconcile --dry-run` shows the plan without touching anything.
In the repositories, numinia-assets' tests verify every request type
against signed vectors (`tests/fleet_vectors.json`), and numinia-web's
`fleet.test.ts` hashes the same messages, so the web and the machine cannot
drift apart silently.

---

## 4. Accuracy

**Verified against:** numinia-web `main` at `1bc7bef` (site v0.77.0),
numinia-assets `main` at `a593e13`, and the live addresses, on 2026-10-12 at
11:56 Madrid time.

- **open-1 runs the new bootstrap since 2026-10-12**: its door answers at
  `https://open-1.numinia.com/fleet/v1/machine`. The full create, stop,
  start, download and delete walk on open-1 is still being checked; the
  proof so far is the walk end to end against a real Caddy and door on a
  test host before the merge (numinia-assets pull request 17).
- The refusals and the paths on the machine are read from the code and its
  README, not from the machine.
- No world has a card in `objects/` yet, although `ADR-069` asks for the
  card first; the room marks such a world *No card*.

---

## References

| ID | Title | Why it is cited |
|---|---|---|
| `ADR-069` | A world has a card, an order and a key, each in its place | the decision this fleet carries out |
| `MIS-156` | The first machine of the public fleet obeys the order book | the mission that builds it |
| `SYS-015` | Signing in to numinia.com, as wired | how the Oracle rank is held |
| `SYS-013` | The repositories, as wired | where each piece's repository sits |
| `DBT-025` | The worlds fleet runs on shortcuts no technical reviewer has checked | what is not wired yet, and what pays it |
