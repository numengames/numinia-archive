---
id: "MIS-159"
uid: ""
title: "The Worlds room shows machines, copies and owners: an owner sees and downloads their own worlds, the Oracle sees all"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-10T12:00:00+02:00"
updated: "2026-10-10T12:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, console, numinia-web, multi-tenant, ranks]
license: "CC0-1.0"

priority: medium
effort: M
executor: hybrid
assigned_to: null
completed: null

depends_on: ["MIS-156", "MIS-158"]
requires_oracle_approval: true
context: "2026-10-10T12:00:00+02:00"
paths: [standards/STD-003-platform-ranks.md, decisions/ADR-069-a-world-has-a-card-an-order-and-a-key-each-in-its-place.md]
related: ["MIS-156", "MIS-158", "MIS-160", "MIS-157", "ADR-069", "STD-003"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-159 — The Worlds room shows machines, copies and owners

> **Summary:** The Worlds room on numinia.com (`/lap/admin/worlds`, site
> v0.74.0) already proposes orders as pull requests. This mission adds what
> the Alchemists' Tower had and the room lacks: each machine as a thing you
> can see, each world's copies with a *Download* button, and owners — a
> wallet named in a world's order sees only its worlds, with their copies
> and their admin code; the Oracle sees all.
> **Epistemic:** The Tower's organisations become wallets; its "show admin
> code" and "download a backup" become the two things an owner comes for.
> Which store the room reads them from is `MIS-160`'s question; this mission
> builds the room so it can read from either.
> **Pragmatic:** A client of the hosting offer can operate their world
> without asking the house: see it, turn it off and on, take it home.
> **Audience:** Agents · Oracles · Clients

---

## 1. Scope

- **Machines.** The by-server view names each machine with its alias, how
  many worlds it carries and their states; a machine with no order is
  listed empty.
- **Copies.** A world's card gets a *Copies* block: date, size, "expires in
  N days", *Download*. The link is signed at click time and lives one hour.
  A world with no copy yet says so.
- **Admin code.** A *Show admin code* button on the card, for the world's
  owner and the Oracle; each read is logged.
- **Owners.** An order may name `owners: [<wallet>, …]`. A signed-in wallet
  with no `manage-worlds` rank sees only the worlds whose orders name it,
  and may stop, start, download and read the admin code of those; closing
  and creating stay with `manage-worlds`. Rights are checked server-side,
  route by route (`MIS-157`'s standards).
- **Help.** A folded *What the states and buttons mean* block at the foot of
  the room, and a distinct "the order book is unreachable" message apart
  from "the order is invalid".
- numinia-assets' order test accepts `owners` (wallets only, checksummed).

Out of scope: the source of copies and keys (`MIS-160`); copies on demand;
a zip of zips; any analytics page; users with passwords, 2FA or lockouts
(the site signs in with a wallet).

---

## 2. Acceptance criteria

- [ ] An order with `owners` passes numinia-assets' tests; one with a name,
  e-mail or IP in `owners` fails. Today: the field does not exist.
- [ ] Signed in with a wallet named in one order, `/lap/admin/worlds` shows
  that world and no other, with *Download* and *Show admin code*; the
  create and close buttons are absent and their routes answer 403. Today:
  anyone below `manage-worlds` gets 403 on the room.
- [ ] *Download* hands a link that fetches the world's latest zip and stops
  working after one hour. Today: no copies in the room.
- [ ] Every admin-code read appears in the room's history with the wallet
  that asked. Today: no such read.
- [ ] Per-file coverage and the visual gate pass; the room's version entry
  is written. Today: v0.74.0.

---

## 3. Closure

*(Fill when the mission closes.)*
