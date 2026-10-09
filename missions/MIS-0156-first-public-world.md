---
id: "MIS-156"
uid: ""
title: "Bring up the first public 3D world from its card in the archive and its order in numinia-assets"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-09T17:30:00+02:00"
updated: "2026-10-09T17:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, gitops, numinia-assets]
license: "CC0-1.0"

priority: high
effort: L
executor: hybrid
assigned_to: null
completed: null

depends_on: []
requires_oracle_approval: true
context: "2026-10-09T17:30:00+02:00"
paths: [objects/, system/suppliers/, system/SYS-013-the-repositories-as-wired.md]
related: ["ADR-069", "SYS-013"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-156 — Bring up the first public 3D world from its card and its order

> **Summary:** Build the public fleet that `ADR-069` decides, and run the
> first world on it. The world gets a card in `objects/` and an order in
> numinia-assets. A server in France reads the order and brings the world
> up over HTTPS. A nightly copy goes to EU object storage, and a daily
> summary goes to the feed.
> **Epistemic:** What the smallest real fleet needs, end to end, and what
> each part proves.
> **Pragmatic:** When this closes, adding a public world means writing a card
> and an order, getting both approved and writing the keys on the server.
> **Audience:** Agents · Oracles

---

## 1. Scope

- **The folder in numinia-assets** (named open-worlds):
  - a README that says what an order is;
  - one order file per world, giving the card id, server, domain, engine
    image and limits;
  - its row in the depot's licence map (CC0);
  - a test, run by the depot's existing test command, that rejects an
    order with a missing field or a card id that does not exist.

  No workflow file changes.
- **The card in `objects/`:** an entity card with `entity: world` for the
  first world, holding no server, IP address or key.
- **One OVH server:**
  - a git-to-compose tool (Doco-CD is the candidate; try it first) that
    reads only the folder, with a read-only deploy key;
  - Caddy for HTTPS;
  - one container per world;
  - keys written on the server by an Oracle when the world is registered.
- **Copies and reports:**
  - a nightly copy of each world to Cloudflare R2 in the EU, kept 14 days;
  - a daily summary in numinia-archive-feed, written by an automation that
    has no write access to numinia-assets.
- **The records:**
  - supplier cards for OVH and for Cloudflare in `system/suppliers/`;
  - the fleet row of `SYS-013` moved to *wired*.

Out of scope:

- The fleet console on numinia.com, which is its own mission once the
  orders exist.
- The private fleet.
- The earlier setups (AWS, and the hand-run server's list), which stay as
  they are.
- Prices.

---

## 2. Acceptance criteria

- [ ] `https://<the first world's domain>/status` answers with uptime and an
  engine commit equal to the image named in its order. Today: no world runs
  on the new fleet.
- [ ] The first world's order exists in numinia-assets, and its card id
  resolves to a file in `objects/` whose header says `entity: world`. Today:
  neither exists.
- [ ] numinia-assets' tests fail on a temporary copy where an order's card
  id is changed to one that does not exist. Today: no such test.
- [ ] A change to an order merged on numinia-assets' main reaches the server
  with no one logging in. Proved by a change to the world's limits, read
  back from the container. Today: nothing reads the folder.
- [ ] `git grep -nE 'BEGIN .*PRIVATE KEY|JWT_SECRET=|ADMIN_CODE='` returns
  nothing in either repository. Today: no fleet files exist to check.
- [ ] R2 holds a copy of the world dated within the last 24 hours, and a test
  restore of that copy on a scratch container serves the world. Today: no
  copy.
- [ ] numinia-archive-feed holds a fleet summary dated within the last 24
  hours, and the automation that writes it cannot push to numinia-assets.
  Today: no summary.
- [ ] `system/suppliers/` has a card for OVH and one for Cloudflare. Today:
  neither exists.

---

## 3. Closure

*(Fill when the mission closes.)*
