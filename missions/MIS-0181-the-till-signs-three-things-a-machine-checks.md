---
id: "MIS-181"
uid: ""
title: "The till signs three things a machine checks — a short team pass, 'this account has credit for a world of this size' and 'stop this world for balance' — with keys of its own that change without stopping a machine"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T08:24:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [payments, fleet, signatures, eip-712, capabilities, security, numinia-web]
license: "CC0-1.0"

priority: high
effort: S
executor: agent
assigned_to: null
completed: null

parent_mission: "MIS-169"
depends_on: ["MIS-179"]
requires_oracle_approval: false
context: "2026-10-13T08:24:00+02:00"
paths: [decisions/ADR-070-a-world-is-paid-for-by-the-day-from-a-prepaid-balance.md, system/SYS-014-the-worlds-fleet-as-wired.md]
related: ["ADR-070", "ADR-069", "MIS-169", "MIS-178", "MIS-179", "MIS-186", "SYS-014", "STD-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-181 — The till signs three things a machine checks

> **Summary:** Money and machines never touch directly (`ADR-070`). The
> till signs three short statements a machine can check by itself: a team
> pass, "this wallet is a member of this team with this role until this
> time"; "this account has credit for a world of this size until this
> time"; and "stop this world for balance". None of them deletes, copies
> or opens a world. They are signed with keys of the till's own, one for
> passes and one for money, that a machine can change without stopping.
> **Epistemic:** What the till may vouch for, and why a stolen till still
> cannot delete or copy a world.
> **Pragmatic:** The machine's side (`MIS-186`) is built against a file of
> signed examples the till produces here, with no wait between the two.
> **Audience:** Agents · Oracles · Technical reviewers

---

## 1. Scope

- **Typed data** in the fleet's signature format (EIP-712), under a domain
  of the till's own, so that no signature of the till can pass for an
  Oracle's request on the fleet's domain.
- **The three statements:**
  - *team pass* — machine, account, wallet, role and expiry, at most 15
    minutes ahead; with it and the person's own signature, a machine lets
    that role create, start or stop the account's worlds (`MIS-186`);
  - *has credit* — account, machine, size and expiry; signed only while the
    account's balance covers the tariff's minimum balance for that size;
  - *stop for balance* — machine, world, account, a number used once and
    an expiry; signed only for a running world of an account at or below
    zero (`MIS-178`).
- **Two keys,** one for passes and one for money, set by an Oracle as the
  till's secrets (`STD-022`). Each machine lists the till's public
  addresses; during a change it accepts both the old and the new one.
- **A file of examples,** made once from throwaway keys — each statement's
  digest and signature, and one that must fail — which the till's tests
  read and the machine's tests will read too, as the fleet's own requests
  are tested today.

Out of scope: the machine checking them (`MIS-186`); the passes a room
asks for, and when (`MIS-183`).

---

## 2. Acceptance criteria

- [ ] The till signs a team pass only for a wallet that is a member of that
  team, with that member's role, expiring at most 15 minutes ahead, and a
  member removed from the team gets no new pass. Today: nothing signs for
  a team; a machine checks only an Oracle's signature.
- [ ] The till signs "has credit" only while the account's balance covers
  the tariff's minimum for that size, and "stop for balance" only for a
  running world of an account at or below zero. Today: no account has a
  balance.
- [ ] The three statements, their domain and the file of examples exist,
  the till's tests read that file, and a till signature checked as a fleet
  request fails. Today: the fleet's typed data has one domain, `Numinia
  Fleet`, and nine request types, all signed by an Oracle (numinia-assets
  `walletsig.py` at `9eb226f`).
- [ ] Passes and money are signed with two different keys, and the till's
  README says how to change each one without stopping a machine. Today:
  the till holds no key.

---

## 3. Closure

*(Fill when the mission closes.)*
