---
id: "MIS-156"
uid: ""
title: "The first machine of the public fleet obeys the order book: open-1 brings up the first world from its card and its order"
type: mission
status: todo
version: "0.2.0"
created: "2026-10-09T17:30:00+02:00"
updated: "2026-10-10T12:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, gitops, numinia-assets, reconciler]
license: "CC0-1.0"

priority: high
effort: M
executor: hybrid
assigned_to: null
completed: null

depends_on: []
requires_oracle_approval: true
context: "2026-10-10T12:00:00+02:00"
paths: [objects/, system/suppliers/, system/SYS-013-the-repositories-as-wired.md]
related: ["ADR-069", "SYS-013", "MIS-158", "MIS-159", "MIS-160", "MIS-161"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-156 — The first machine of the public fleet obeys the order book

> **Summary:** One new, small server in France (`open-1`) reads the order
> book that `ADR-069` decides (numinia-assets `open-worlds/`) and brings up,
> stops and starts the worlds whose orders name it. The first world gets a
> card in `objects/` and an order. Turning a world on or off becomes one
> word in one file and a merged pull request.
> **Epistemic:** The smallest fleet that proves the model: a machine that
> obeys git and nothing else. Copies, the console and keys are their own
> missions (`MIS-158`, `MIS-159`, `MIS-160`); the cost model is `MIS-161`.
> **Pragmatic:** When this closes, adding a machine means buying a small
> server and running one bootstrap with its alias; adding a world means a
> card, an order and a merge.
> **Audience:** Agents · Oracles

---

## 1. Scope

- **The order book** (done 2026-10-09, numinia-assets #8): the folder
  `open-worlds/`, its README, its CC0 row and the test that refuses a
  malformed or secret-bearing order.
- **The card in `objects/`:** an entity card with `entity: world` for the
  first world, holding no server, IP address or key.
- **One new OVH server, `open-1`.** The hand-run server that already serves
  five worlds is left as it is (`ADR-069`, decision 6); what this machine teaches is
  applied there later, if ever.
  - a **bootstrap** (cloud-init or one script) that turns a fresh VPS into
    a fleet machine: Docker, Caddy for HTTPS, the firewall, unattended
    upgrades and the reconciler with the machine's alias;
  - a **reconciler**: a small service that pulls `open-worlds/` on a timer
    with a read-only deploy key, keeps the orders whose `server` is its own
    alias, and makes the containers match them — `state: running` is up,
    `state: stopped` is down, a removed order is down and left on disk. The
    git-to-compose tool Doco-CD is the first candidate; a shell loop around
    `docker compose` is the fallback;
  - one container per world, limits and image taken from the order;
  - keys written on the server by an Oracle when the world is registered
    (`env/<id>.env`), until `MIS-160` moves them to the house's secret
    manager.
- **The records:** a supplier card for OVH in `system/suppliers/`; the
  fleet row of `SYS-013` moved to *wired*.

Out of scope, each its own mission:

- the copy of a world that runs anywhere (`MIS-158`);
- the console showing machines, copies and owners (`MIS-159`);
- keys and copies reaching the console through the house's AWS (`MIS-160`);
- what a world costs and how it is charged (`MIS-161`);
- the private fleet; the earlier setups (AWS cluster, hand-run server).

---

## 2. Acceptance criteria

- [ ] `https://<the first world's domain>/status` answers with uptime and an
  engine commit equal to the image named in its order. Today: no world runs
  on the new fleet.
- [ ] The first world's order exists in numinia-assets, and its card id
  resolves to a file in `objects/` whose header says `entity: world`. Today:
  neither exists.
- [ ] A change to an order merged on numinia-assets' main reaches the server
  with no one logging in: `state` flipped to `stopped` takes the world's
  `/status` down within five minutes, flipped back brings it up; a change to
  its limits is read back from the container. Today: nothing reads the
  folder.
- [ ] A second fresh VPS becomes a fleet machine by running the bootstrap
  with alias `open-2`, in under thirty minutes, with no step done by hand
  beyond the alias and the deploy key. Today: no bootstrap exists.
- [ ] The machine holds no credential that writes to GitHub: the deploy key
  is read-only, checked on the repository's deploy-keys page. Today: no key.
- [ ] `git grep -nE 'BEGIN .*PRIVATE KEY|JWT_SECRET=|ADMIN_CODE='` returns
  nothing in either repository. Today: no fleet files exist to check.
- [ ] `system/suppliers/` has a card for OVH. Today: it does not.

---

## 3. Closure

*(Fill when the mission closes.)*
