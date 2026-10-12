---
id: "MIS-176"
uid: ""
title: "The house enters a client's world only when the client asks or for security: the signed request says why, the door's log keeps it, and the contract says so"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-12T22:13:00+02:00"
updated: "2026-10-12T22:13:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, admin-code, data-protection, contracts, numinia-assets, numinia-web]
license: "CC0-1.0"

priority: medium
effort: S
executor: hybrid
assigned_to: null
completed: null

requires_oracle_approval: true
context: "2026-10-12T22:13:00+02:00"
paths: [legal/LEG-002-terms-and-conditions-numengames.md, system/SYS-014-the-worlds-fleet-as-wired.md]
related: ["MIS-169", "MIS-159", "MIS-165", "LEG-002"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-176 — The house enters a client's world only when the client asks or for security

> **Summary:** Once a client's world runs on the fleet, the house holds two
> ways into it: it operates the machine, and an Oracle can see or change
> the world's admin code with one signature (`MIS-170`), and with it act
> inside the world. This mission keeps the two apart. The house operates
> every machine; inside a client's world the owner is the client, and the
> house enters only when the client asks or for security, with the reason
> signed in the request and kept in the door's log — and the hosting terms
> and the data processing agreement say so.
> **Epistemic:** Who may enter a client's world, why, and where each entry
> is written down.
> **Pragmatic:** A client reads in its contract when the house may enter
> its world, and finds every entry in the machine's public log.
> **Audience:** Agents · Oracles · Clients

---

## 1. Scope

- **Two roles.** The house operates every machine: it stops, starts,
  copies and deletes any world, for security, illegal content or
  non-payment. Inside a client's world the owner is the client. In
  Numinia's and Numen Games' own worlds the house is owner and operator.
- **A reason, signed and logged.** `ShowWorldCode` and `RotateWorldCode`
  carry a reason the wallet shows before it signs — the client asked,
  security, or the house's own world — and the door keeps the reason in
  its public log beside the short wallet, never the code. Until orders name
  their owner (`MIS-159`), the Oracle who signs declares which of the three
  it is, and the signature answers for it.
- **The contract.** The hosting terms and the data processing agreement
  that `LEG-002` promises with each business agreement state the two roles,
  that the house acts inside a client's world only on the client's
  documented instructions or for security, and that each entry is signed
  and recorded: the processor's duty in GDPR article 28(3)(a), processing
  only on the controller's documented instructions.

### Standards to select when the mission opens (not the selection)

| Area | What it covers here | Candidates |
|---|---|---|
| The provider's way into a client's data | when an Oracle may enter a client's world, and how each entry is recorded | break-glass access (a rare, signed and logged emergency way in); Google Cloud Access Approval (the client approves each access first) and Access Transparency (a log of each access with its justification, such as support the customer asked for or a review for security, fraud or abuse) |

The choice and its reason go in this mission's execution log.

Out of scope, for later: the client signs Show and Change for its own
worlds (`MIS-159`, `MIS-165`); an owner rank the engine recognises by
wallet, a change for the engine's maintainer (`DBT-025`); a world stopped
by itself when its payment stops (`MIS-169`).

---

## 2. Acceptance criteria

- [ ] Every signed `ShowWorldCode` and `RotateWorldCode` carries its reason
  — the client asked, security, or the house's own world — in the typed
  data the wallet shows; the door refuses one without it, and its line in
  the door's public log names the reason. Today: both requests carry only
  the machine, the world, a number and an expiry (numinia-assets
  `walletsig.py` at `2ca8e2c`, where `grep -c reason` returns 0), and a log
  line holds the time, the type, the world, the short wallet and the state
  (`reconcile.py`, `answer`).
- [ ] The worlds room asks for the reason before the wallet signs, in its
  five languages. Today: its change-of-code and show-code dialog asks for
  nothing but the signature (numinia-web `WorldDialogs.tsx` at `080f176`).
- [ ] The hosting terms and a data processing agreement template state the
  two roles: the house operates every machine and may stop, start, copy or
  delete a world for security, illegal content or non-payment; inside a
  client's world the client is the owner, and the house enters only on the
  client's documented request or for security, each entry signed and
  recorded. Today: `LEG-002`, numen.games' terms, never mention hosting or
  a world (`grep -ciE 'hosting|world'` returns 0) and promise a data
  processing agreement with each business agreement; the archive holds no
  template of one, and item 20 of `DBT-022` records that none is on file
  with any provider.

---

## 3. Closure

*(Fill when the mission closes.)*
