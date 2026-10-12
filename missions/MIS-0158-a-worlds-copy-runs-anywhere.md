---
id: "MIS-158"
uid: ""
title: "A world's copy runs anywhere: each fleet machine makes, every night, a self-contained zip of each world it serves"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-10T12:00:00+02:00"
updated: "2026-10-10T12:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, backups, portability, alchemists-tower]
license: "CC0-1.0"

priority: high
effort: M
executor: hybrid
assigned_to: null
completed: null

depends_on: ["MIS-156"]
requires_oracle_approval: true
context: "2026-10-10T12:00:00+02:00"
paths: [principles/PRI-012-what-is-yours-stays-with-you.md, system/]
related: ["MIS-156", "MIS-160", "ADR-069", "PRI-012"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-158 — A world's copy runs anywhere

> **Summary:** Every night, each fleet machine packs each world it serves
> into one zip that runs on its own: the world's state and files, a
> `docker-compose.yml`, an `.env` with fresh keys, a `world.json`, a README
> and step-by-step guides for running it on a laptop or on a cloud. Unpack,
> `docker compose up`, and the world is yours, anywhere.
> **Epistemic:** This is the Alchemists' Tower backup format
> (`numengames/alchemists-tower`, `lib/backup/*`), the best-built part of
> that panel, ported as a pattern. Our worlds already live as a folder
> (`db.sqlite` + `assets/`), so the Tower's database export step
> disappears.
> **Pragmatic:** Closes `PRI-012` for worlds: what is yours can leave. It is
> also the restore path when a machine dies.
> **Audience:** Agents · Oracles · Clients

---

## 1. Scope

- **The zip** (one per world per night, on the machine's disk, kept 14
  days):
  - `world/db.sqlite` taken with `sqlite3 .backup` (never the live file)
    and `world/assets/…`;
  - `docker-compose.yml` pinned to the order's engine image;
  - `.env` with **freshly generated** `JWT_SECRET` and `ADMIN_CODE` — never
    the ones in production;
  - `world.json`: id, card, original domain, engine image, export date, file
    count and bytes, rows per table;
  - a README and four deploy guides (local, AWS, Azure, GCP) rendered with
    the world's values.
- **The script** lives with the fleet machine's files, has no dependencies
  beyond `sqlite3` and `zip`, and has tests for every rendered file.
- **The feed**: when the night's copies are done, one line per machine in
  numinia-archive-feed, written by an automation that cannot write to
  numinia-assets (`ADR-069`, decision 5).

Out of scope: uploading the zip off the machine and showing it in the
console (`MIS-160`, `MIS-159`); bundling the engine image inside the zip
(a later cut, once the zip is proven); copies on demand.

---

## 2. Acceptance criteria

- [ ] On `open-1`, each served world has a zip dated within the last 24
  hours, and none older than 14 days. Today: no copy.
- [ ] A copy unpacked on a laptop with Docker runs with `docker compose up`
  and serves the world at `http://localhost:3000`, with the `.env`'s admin
  code opening build mode. Today: not possible.
- [ ] The zip's `.env` shares no value with the machine's `env/<id>.env`:
  the admin code in the copy does not open the live world. Today: no copy to
  compare.
- [ ] The script's tests cover every rendered file and pass on the
  machine's Node or shell. Today: no script.
- [ ] numinia-archive-feed holds a copies line per machine dated within the
  last 24 hours, and its writer cannot push to numinia-assets. Today: no
  line.

---

## 3. Closure

*(Fill when the mission closes.)*
