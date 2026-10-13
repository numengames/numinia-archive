---
id: "MIS-186"
uid: ""
title: "A machine obeys a world's owners and the till: the order names the world's account and owners, only an owner signs the delicate, a team pass with the person's own signature does the daily, a client's world starts only with credit, and stops for balance after saving"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T08:24:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [fleet, signatures, eip-712, capabilities, teams, numinia-assets, numinia-web]
license: "CC0-1.0"

priority: high
effort: L
executor: hybrid
assigned_to: null
completed: null

parent_mission: "MIS-169"
depends_on: ["MIS-179", "MIS-181"]
requires_oracle_approval: true
context: "2026-10-13T08:24:00+02:00"
paths: [system/SYS-014-the-worlds-fleet-as-wired.md, decisions/ADR-069-a-world-has-a-card-an-order-and-a-key-each-in-its-place.md, decisions/ADR-070-a-world-is-paid-for-by-the-day-from-a-prepaid-balance.md]
related: ["ADR-070", "ADR-069", "MIS-169", "MIS-159", "MIS-165", "MIS-176", "MIS-178", "MIS-181", "MIS-183", "SYS-014", "DBT-025"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-186 — A machine obeys a world's owners and the till

> **Summary:** A fleet machine obeys only its Oracles today (`SYS-014`).
> To sell worlds, it must also obey a world's owners and the till, each
> within its reach (`ADR-070`). A world's order names its account and its
> owners' wallets; only an owner — or an Oracle — signs deleting it,
> seeing or changing its code and downloading it; a member creates, starts
> or stops with a team pass from the till beside their own signature; a
> client's world is created or started only with the till's "has credit";
> and the till's "stop for balance" stops a world after its save, like any
> stop.
> **Epistemic:** Who may move a client's world, with which signatures, and
> what a stolen till still cannot do.
> **Pragmatic:** Lucía's team runs its worlds from the worlds room with no
> Oracle involved, and nobody but its owners can delete or copy them.
> **Audience:** Agents · Oracles · Technical reviewers

---

## 1. Scope

- **The order** gains the world's account and its owners' wallets; an
  owner may add another with their signature. The house's own worlds
  belong to the house's account, and Oracles keep acting on every world as
  today; inside a client's world the house enters only as `MIS-176` says.
- **The delicate — delete, show or change the code, download —** needs the
  signature of an owner of that world or of an Oracle.
- **The daily — create, start, stop —** for a client's world needs the
  person's own signature and a valid team pass for the world's account
  whose role allows the act (`MIS-181`); create and start also need the
  till's "has credit" for that size.
- **Stop for balance** from the till stops the world after its save, as any
  stop does, and the door's log says why.
- **The till's keys:** each machine lists the till's public addresses for
  passes and for money, set by the bootstrap, two of each during a change.
- **The worlds room** asks the till for a pass, signs with the person's
  wallet, shows a member only their team's worlds, and shows owners on
  each world (`MIS-159`, `MIS-165`).
- **Tests** read the file of examples the till produced (`MIS-181`), as the
  fleet's requests are tested today.

Out of scope: deleting worlds kept at zero when their date comes, which
reuses the delete with the till's word and is written here only once the
deletion rules are settled with counsel (`DBT-022`); the team lock signed by
owners alone, which the identity design weighs for later.

---

## 2. Acceptance criteria

- [ ] A world's order names its account and at least one owner's wallet,
  and an order without them is created only by an Oracle, for the house.
  Today: an order holds its id, state, domain, image and limits
  (numinia-assets `reconcile.py` at `9eb226f`) and names no owner —
  `grep -c -i -E 'owner|account'` over `walletsig.py` returns 0.
- [ ] Deleting a world, showing or changing its code and downloading it are
  refused unless an owner of that world or an Oracle signed them. Today:
  only an Oracle's signature is accepted, for any world.
- [ ] Creating, starting or stopping a client's world is accepted from a
  member's wallet only with a valid team pass for the world's account whose
  role allows it, and creating or starting only with the till's "has
  credit" for that size. Today: only an Oracle's signature is accepted.
- [ ] The till's "stop for balance" stops a world after its save, and the
  door's log names the reason. Today: no request comes from a service.
- [ ] The worlds room lets a team member sign with their own wallet and
  shows them only their team's worlds. Today: the room answers 403 to
  anyone who is not an Oracle.

---

## 3. Closure

*(Fill when the mission closes.)*
