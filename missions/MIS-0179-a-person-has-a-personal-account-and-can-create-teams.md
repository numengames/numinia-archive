---
id: "MIS-179"
uid: ""
title: "A person has a personal account and can create teams: four roles, invitations by email that expire in seven days, and each role does only what its row allows"
type: mission
status: todo
version: "0.3.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-15T10:48:49+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [payments, teams, roles, multi-tenant, identity, numinia-web]
license: "CC0-1.0"

priority: high
effort: M
executor: agent
assigned_to: null
completed: null

parent_mission: "MIS-169"
depends_on: ["MIS-177"]
requires_oracle_approval: false
context: "2026-10-13T08:24:00+02:00"
paths: [decisions/ADR-070-a-world-is-paid-for-by-the-day-from-a-prepaid-balance.md, standards/STD-003-platform-ranks.md]
related: ["ADR-070", "ADR-071", "STD-051", "STD-052", "MIS-169", "MIS-177", "MIS-180", "MIS-181", "MIS-157", "STD-003", "SYS-015"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-179 — A person has a personal account and can create teams

> **Summary:** As in Nous Portal, every person has a personal account of
> their own and may create teams that share a balance, worlds and billing
> details. A team has four roles — owner, administration, finance and
> member — and the till checks each act against the role table of
> `ADR-070`. People join by an invitation sent by email, which carries its
> role and expires in seven days.
> **Epistemic:** Who may pay, create, start, delete or invite, in a team
> and alone, and how a team keeps an owner.
> **Pragmatic:** Lucía's studio tops up once and its four people work on
> the same worlds, each as far as their role goes.
> **Audience:** Agents · Oracles · Clients

---

## 1. Scope

- **A person** is whoever numinia.com signs in, today by a wallet. The till
  keys each person by an id of its own and records the wallet as one way
  in, so how a person signs in can change without moving their accounts.
  That change belongs to the identity design, still open with the Oracle
  (`MIS-157`).
- **The personal account** is created on a person's first use. It admits no
  members.
- **A team** may be created by anyone, who becomes its owner, and says
  whether it is a company; a company's tax ID is collected on Stripe's page
  at its first top-up (`MIS-180`).
- **The role table** (`ADR-070`):

| Act | Owner | Administration | Finance | Member |
|---|:-:|:-:|:-:|:-:|
| See worlds, usage and invoices | ✓ | ✓ | ✓ | ✓ |
| Start and stop worlds | ✓ | ✓ | — | ✓ |
| Create worlds | ✓ | ✓ | — | — |
| Delete a world, see or change its code, download it | ✓ | — | — | — |
| Top up and change billing details | ✓ | ✓ | ✓ | — |
| Invite, remove and change roles | ✓ | ✓ | — | — |
| Close the team or hand it over | ✓ | — | — | — |

- **Owners.** A team always has one: the last owner cannot leave or be
  removed. Nobody changes their own role, and administration changes
  finance and members, never owners or other administrators — nobody acts
  upward, as `STD-003` already keeps for ranks.
- **Invitations** carry their role, go by email (`MIS-182` carries the
  mail), are accepted once within seven days from the link sent to that
  address, can be withdrawn, and die when the person who sent them leaves.
  Whether the person must also sign in with that same address is for the
  identity design.
- **A team role is not a rank** of the city: it grants nothing outside its
  team, and buying makes nobody a Pilgrim.

Out of scope: the machine obeying team members (`MIS-186`), the screens
(`MIS-183`), agents as members and the house's access to a client's world
(the identity design and `MIS-176`).

---

## 2. Acceptance criteria

- [ ] A person's first request to the till creates their personal account,
  and it admits no members. Today: numinia.com knows a wallet and a rank,
  and no account, team or member — `git grep -i -c -E '\bteams?\b'` over the
  site's library at `5811252` counts 0.
- [ ] A test walks every cell of the role table for the four roles, and
  each refused act answers with the role it needs and who in the team holds
  it. Today: no role exists.
- [ ] The last owner cannot leave or be removed, nobody changes their own
  role, and administration cannot touch an owner or another administrator.
  Today: no team exists.
- [ ] An invitation carries its role, is accepted once within seven days
  from its link, can be withdrawn, and dies when the person who sent it
  leaves the team. Today: no invitation exists.

## Execution log

### 2026-10-14 — the roles become each organisation's own (`ADR-071`)

The Oracle decided that each organisation runs its own roles, as a Discord
server does. The four roles of the table above become the Team template of
`STD-052`: the roles a team is born with, which its owners may change
afterwards. Ownership becomes a mark of the person rather than a role, and
the acts in the owners' column stay theirs alone. The criteria keep
holding: the test that walks every cell of the table walks the Team
template. The rules are `STD-051`.

### 2026-10-15 — any member tops up; billing details stay with finance

The Oracle split the table's row «Top up and change billing details»:
adding to the team's balance takes nothing from anyone, and the ledger
keeps who paid, so every member may top up, as the till already let them;
changing the billing details stays with owners, administration and finance.
`STD-052` 0.2.0 says so: `manage-balance` now carries only the billing
details. The test that walks every cell of the table walks the split row.

---

## 3. Closure

*(Fill when the mission closes.)*
