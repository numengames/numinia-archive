---
id: "SYS-014"
uid: ""
title: "The worlds fleet, as wired"
type: documentation
subtype: reference
status: draft
version: "0.3.0"
created: "2026-10-12T11:53:57+02:00"
updated: "2026-10-18T14:00:00+02:00"
author: "ursa"
owner: "oracle"
digital_source_type: ai-assisted
section: "Products and services"
tags: [system, reference, virtual-worlds, hosting, fleet, control-plane, wallet, eip-712]
license: "CC0-1.0"
related: ["ADR-069", "MIS-156", "MIS-158", "MIS-159", "MIS-161", "MIS-170", "MIS-173", "MIS-175", "SYS-013", "SYS-015", "DBT-025"]
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
| **The worlds room** | the console: a room of numinia.com's player area, *LAP › Management › Worlds*, that only an Oracle opens | numinia-web, `apps/store/src/components/lap/admin/` and `apps/store/src/lib/fleet.ts` | no key: it reads each machine's public window, writes the request the wallet signs, and names the one commit of the recipe its bootstrap line installs | wired, site v0.79.0 |
| **The Oracle's wallet** | the wallet the Oracle signs in with: thirdweb's in-app wallet for Google, email or passkey, or MetaMask or WalletConnect | the Oracle's browser or device | the only key that orders a machine | wired |
| **The door** | `fleetd`, a small web service on each machine: takes signed requests, publishes the machine's facts, hands out copies, and shows or makes a world's admin code for a signed Oracle | numinia-assets `open-worlds/machine/fleetd.py`, behind the machine's Caddy at `https://<alias>.numinia.com/fleet/v1/` | the request numbers already used; it reads each world's code to show it and makes the new one a creation or a change of code carries, but never writes a key file | wired on open-1 |
| **The reconciler** | the machine's worker: checks each request again, changes the machine's book, writes each world's keys and code, and makes the containers match the book | numinia-assets `open-worlds/machine/reconcile.py`, run every minute and on each request | root on the machine | wired: open-1 runs recipe `2ca8e2c…` |
| **The book** | one order per world: id, card, state, machine, address, engine image, limits | on each machine, written only by its reconciler | no secret; which wallet signed the creation | wired on open-1, which adopted its first orders once from numinia-assets `open-worlds/`; `prueba.json` and `pablofm.json` still sit there, and no machine takes them again |
| **The worlds** | one container per world, running one of the house's two engine images (the Hyperfy fork or Numinia Engine, told apart by image) pinned to one build, with Caddy in front for HTTPS | on each machine | the world's data, each person's rank among it, and its keys — a JWT secret and the world's own admin code — made by the machine | three on open-1 at 20:27 UTC: `p1` running, `dani` and `pablofm` stopped |
| **The recipe** | one bootstrap line that turns a fresh server into a fleet machine, or updates one: it names one reviewed commit of numinia-assets (`FLEET_REF`) and installs exactly that one — a value that is not a whole commit stops it, and none at all installs `main`, flagged *NOT pinned* — and the machine says which it runs | numinia-assets `open-worlds/machine/`; the line, in the worlds room | nothing secret | wired: the room's line names `2ca8e2c…`, which open-1 runs |
| **DNS** | wildcard records `*.numinia.com` and `*.numen.games` pointing at open-1, DNS only | Cloudflare, set by an Oracle | — | wired while there is one machine |
| **The world's card** | what the world is: an entity card in `objects/` (`ADR-069`) | this archive | nothing secret | not wired: no world has one yet |

### A world is born

1. The Oracle signs in to numinia.com (`SYS-015`) and opens *Worlds*. The
   room's data comes from one endpoint that answers 403 to anyone whose
   signed session lacks the permission to manage worlds (numinia-web
   `apps/store/src/pages/api/admin/worlds.ts`).
2. The room reads each machine's public window (`/fleet/v1/machine`,
   `/worlds`, `/log`), the world cards from this archive, and each world's
   own `/status`. A machine that answers shows the recipe it runs — the
   first seven characters of its commit — and whether it obeys, from when
   its reconciler last ran and what waits for it; one that runs another
   recipe than the room's, or says none, shows a warning and its line to
   run again. A machine whose window does not answer shows as closed, with
   the one line that bootstraps it — the signed-in wallet already written
   into it — and a Copy button.
3. *New world* asks for four things: a name, which names the world, its
   order and its card alike; the machine and the address, a name under
   numinia.com or numen.games that the browser checks against public DNS;
   the engine, a pinned build of one of the house's two engine images (the
   Hyperfy fork or Numinia Engine); and the limits, by
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
   requests from one address in five minutes. It makes the new world's own
   admin code, 16 hexadecimal characters, drops the request in the machine's
   inbox with that code, and answers with it. A refusal names its reason,
   which the room puts in plain words: `not-an-oracle-here`, `expired`,
   `replayed`, `exists`, `address-taken`, `still-deleting` (a world of that
   name or address is still being deleted) and `refused` (the order breaks
   the machine's rules).
7. The reconciler checks the signature, the signer, the machine and every
   field again, writes the order, writes the world's keys — a JWT secret of
   its own and the code the request carries — and the code's file the door
   reads, starts the container and gives Caddy the new address. That reload
   keeps the other worlds' visitors connected: a reload replaces Caddy's
   whole configuration and by default closes every WebSocket it carries, so
   each world's site keeps its connections open across one
   (`stream_close_delay 12h`, numinia-assets pull request 19).
8. The room shows the world being born, with its own admin code, and the
   world opens at its address over HTTPS in under a minute. `/admin <code>`
   typed in the world's chat makes that browser an administrator of the
   world, who can then build in it; the world keeps that rank in its own
   database.

### Another build of the engine, and a world back from its zip

One signed `UpdateWorld` (machine, world, image) moves a running world to
another build of its own engine, pinned by image like a creation; a signed
`PinWorld` holds a world on one build so an automatic update skips it, an
empty image releasing the pin. A world's zip — the one *Download* makes, or
an older copy — comes back as a new world, always created **stopped**, with
one signed `ImportWorld` (the creation's fields plus the zip's exact size
and hash) and one upload; the reconciler unpacks only the database and the
world's files, checks the database is sound, and gives it fresh keys, never
the zip's. A zip signed with the `numinia-engine` image also passes the
engine's own `comprobar`/`importar` check before it is accepted
(numinia-assets `open-worlds/machine/README.md`, "Two engines" and "Another
build of the engine: UpdateWorld").

### Stop, start, download, delete, a world's code

One signed request each, from the world's card in the room. Once the
machine takes a request, the room leaves the work to it and shows it on the
world's card — *Creating…*, *Stopping…*, *Starting…*, *Deleting…* — and only
a download waits in its dialog, for the zip.

| Action | What the machine does | What stays |
|---|---|---|
| Stop | waits for the world's next save — one save interval, 10 seconds, and 2 more — since the engine writes to disk only on its timer, then takes the container down | the data and the keys |
| Start | brings it back with its data | — |
| Download | after the world's next save, zips the world whole: a consistent copy of its database, its files, a compose file that runs it on `localhost:3000` with the same engine build, fresh keys, a SHA-256 manifest and a short guide; the link works for a day | the world, untouched |
| Delete | after the Oracle types the world's address, removes the order, the container, the world's folder, its keys, its code and its copies; the address is part of what is signed, and until the folder and keys are gone the door refuses a new world under that name or address (`still-deleting`) | the card, if there is one, and any copy already downloaded |
| Show a world's code | returns that world's own admin code to the Oracle who signed; the log says who asked, never the code | — |
| Change a world's code | makes a new code, shows it once to the Oracle who signed, and restarts that world alone after its next save; a stopped world takes it when it starts | the world's JWT secret, so everyone keeps who they are; and the rank of whoever was already its administrator (`DBT-025`) |

A request for a world's code is refused `missing` when the world is not on
the machine, `still-deleting` while it is being deleted, `busy` while its
creation or a change of its code still waits, and `no-admin-code` when the
machine has no code it can read for it; the room words each. The machine
still accepts `ShowAdminCode`, the machine-wide code, as legacy; the room no
longer asks for it.

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
request went, and a copy's state. `/machine` also says which commit of the
recipe the machine runs (`recipe`), when its reconciler last ran and how
that run ended (`lastRun`), and how many requests wait and since when
(`waiting`): a time that stops moving is a machine that stopped obeying, and
the room says so on its line. Each world answers `/status`: uptime, people
inside, engine build. The room shows nothing an outsider could not read,
except a world's admin code, which only a signed request reveals.

### What the machine refuses, and what a theft gives

The machine refuses an image outside the house's registry
(`ghcr.io/numengames/`) or not pinned to one build; an address that is not
one name under a house zone, or under a client domain listed on that
machine; and any order field that does not match its strict pattern. A
world created through the door gets its own code with its keys, or is not
created; a running world with no keys — an order adopted from the public
book — is started only on a machine with an old shared code to key it with,
since an empty code would make every visitor an administrator.

| If this is stolen | The thief gets | And does not get |
|---|---|---|
| numinia.com | nothing on the machines; it could show a false page and ask for a signature, and the wallet shows exactly what is signed | any machine, any key |
| an Oracle's wallet | every action on the machines that list it, including showing and changing the admin code of each of their worlds | code execution, images outside the registry, addresses outside the zones |
| a machine | its worlds' data and keys, each world's admin code among them | GitHub, the other machines, any wallet |
| a world's admin code | administrator of that world — of every world still on the machine's old shared code, if it is that one — and the rank outlives a change of code (`DBT-025`) | the machine itself, and the worlds with codes of their own |
| a signed request | nothing more: one machine, one world, fifteen minutes | anything else |
| a merge on numinia-assets' `main` | nothing on a machine by itself: a machine installs only the commit its line names | the machines, until someone hands out and runs a line with that commit |

The full table, with the door and the download links, is in the
[machine's README](https://github.com/numengames/numinia-assets/blob/main/open-worlds/machine/README.md).

### Not wired yet

Each is a debt of the trial, kept with what pays it in `DBT-025`:

- changing a world's code demotes nobody: whoever became its administrator
  with the old code stays one (`MIS-175`);
- the worlds keyed before each had its own code keep the machine's old
  shared one until an Oracle changes theirs; on open-1 those are `p1` and
  `pablofm`, created or adopted before that build reached it, and its log
  holds no change of code yet;
- no nightly copy (`MIS-158`), although numen.games/hosting offers one;
- the book lives only on its machine;
- a world is born without its card;
- a world's limits cannot be changed after it is created; its engine build
  can, by a signed `UpdateWorld` (above);
- what a world costs is not shown (`MIS-161`).

---

## 3. How to verify it

```
$ curl -s https://numinia.com/version.json
{"commit":"080f176…","builtAt":"2026-10-12T19:47:13.740Z"}    the room that signs is live
$ curl -s https://open-1.numinia.com/fleet/v1/machine
{"machine": "open-1", …, "recipe": "2ca8e2c…", …}            the recipe the machine runs
$ curl -s https://open-1.numinia.com/fleet/v1/worlds
a JSON list of worlds and their phases                          the door is up
$ curl -s https://p1.numen.games/status
{"uptime":…,"protected":true,"connectedUsers":[],"commitHash":"0e2045370989d051e73f81c7c9d53121d5c374b3"}
```

`recipe` must equal `FLEET_REF` in numinia-web's `fleet.ts`, the commit the
room's bootstrap line names; when it does not, the room warns on that
machine's line. `commitHash` must equal the build pinned in the world's
order. On a machine, `journalctl -u fleet-reconcile -n 20` says what the
last runs did, and `fleet-reconcile --dry-run` shows the plan without
touching anything. In the repositories, numinia-assets' tests verify every
request type against signed vectors (`tests/fleet_vectors.json`), the two
for a world's code included, and numinia-web's `fleet.test.ts` hashes the
same messages, so the web and the machine cannot drift apart silently.

---

## 4. Accuracy

**Verified against:** numinia-web `main` at `080f176` (site v0.79.0),
numinia-assets `main` at `2ca8e2c`, and the live addresses, on 2026-10-12 at
22:27 Madrid time. Version 0.1.0 was verified against `1bc7bef` (v0.77.0)
and `a593e13` at 11:56.

- **open-1 runs recipe `2ca8e2c…`**, the commit the room's line names: its
  door says so. Its log holds eighteen requests, all done and all signed by
  the Oracle's wallet, and every kind the room signed before this build
  among them: create, delete, stop, start, download, and the machine-wide
  code once. Since this build reached it, the machine has created `dani`,
  stopped it and `pablofm`, and deleted `prueba`. The requests for a
  world's own code (`ShowWorldCode`, `RotateWorldCode`) await the Oracle's
  live check of v0.79.0.
- The refusals, the paths on the machine and which code each world holds
  are read from the code and its README, not from the machine.
- No world has a card in `objects/` yet, although `ADR-069` asks for the
  card first; the room marks such a world *No card*.
- Refreshed 2026-10-18 against numinia-assets `55c75ad`
  (`open-worlds/machine/README.md`): the machine now runs two engine images
  (Hyperfy fork and Numinia Engine, told apart by image), a running world's
  engine build can be changed with a signed `UpdateWorld` or held with
  `PinWorld`, and a world's zip comes back with a signed `ImportWorld`. The
  room side of `UpdateWorld`/`ImportWorld` (numinia-web `fleet.ts`) was not
  re-read for this refresh: *to confirm*.

---

## References

| ID | Title | Why it is cited |
|---|---|---|
| `ADR-069` | A world has a card, an order and a key, each in its place | the decision this fleet carries out |
| `MIS-156` | The first machine of the public fleet obeys the order book | the mission that builds it |
| `MIS-170` | Each world has its own admin code | the per-world code, built and in review |
| `MIS-173` | A machine installs one reviewed commit of its recipe | the pinned recipe, built and in review |
| `MIS-175` | Changing a world's code leaves no one its administrator | what pays the rank that outlives a change of code |
| `SYS-015` | Signing in to numinia.com, as wired | how the Oracle rank is held |
| `SYS-013` | The repositories, as wired | where each piece's repository sits |
| `DBT-025` | The worlds fleet runs on shortcuts no technical reviewer has checked | what is not wired yet, and what pays it |
