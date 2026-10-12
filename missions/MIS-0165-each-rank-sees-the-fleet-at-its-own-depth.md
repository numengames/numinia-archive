---
id: "MIS-165"
uid: ""
title: "Each rank sees the fleet at its own depth: an owner sees their worlds, an Archon every number without acting, the Oracle everything — written in STD-003 and built in the worlds room"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-12T13:11:36+02:00"
updated: "2026-10-12T13:11:36+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, metrics, ranks, multi-tenant, numinia-web]
license: "CC0-1.0"

priority: medium
effort: M
executor: agent
assigned_to: null
completed: null

depends_on: ["MIS-162"]
requires_oracle_approval: true
context: "2026-10-12T13:04:00+02:00"
paths: [standards/STD-003-platform-ranks.md, system/SYS-014-the-worlds-fleet-as-wired.md, system/SYS-015-signing-in-to-numinia-com-as-wired.md]
related: ["MIS-159", "MIS-157", "MIS-162", "MIS-163", "MIS-166", "STD-003", "SYS-015"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-165 — Each rank sees the fleet at its own depth

> **Summary:** The worlds room is all or nothing today: an Oracle sees and
> does everything, anyone else gets 403. With the numbers of `MIS-162`, this
> mission writes who sees what about machines and worlds — by rank and by
> ownership — into `STD-003`, and builds it in the room.
> **Epistemic:** What each rank may read about the fleet, and whether that
> limit is the room's display or the machine's lock.
> **Pragmatic:** A world's owner or an Archon follows the worlds without
> asking the house and without the power to change them.
> **Audience:** Agents · Oracles

---

## 1. Scope

**Who sees what**, a hypothesis to settle when the mission opens; ranks add
up (`STD-003`):

| Who | Sees | Does |
|---|---|---|
| Anyone, signed in or not | the public list: open worlds and people inside (`MIS-166`) | enters a world |
| A world's owner, a wallet named in its order (`MIS-159`) | that world: its numbers for 24 hours and 7 days, restarts, copies | what `MIS-159` gives: stop, start, download |
| Archon | every world's and every machine's numbers, and the machines' activity log | nothing on the fleet |
| Oracle | all of it, plus each machine's room and health (`MIS-163`) | create, stop, start, download, delete, bring back |

- **The lock.** Every fact a machine publishes is public today, and the room
  only chooses what to show (`SYS-014`). Decide when the mission opens
  whether the numbers stay public facts — enough for the public fleet:
  counts and machine numbers, no person — or the door answers detail only
  to a signed reading pass, which a private fleet, or a client who asks,
  would need.
- **The code:** a permission to read the fleet, at Archon, beside the
  Oracle's `manage-worlds`; owners by relation (`MIS-159`), not by rank;
  every check on the server, route by route (`MIS-157`'s standards).
- **History in the room:** per world, the last 24 hours and 7 days of
  people inside, memory and processor (`MIS-162`); per machine, its room
  over the same span.
- `STD-003` changes in the same change (RNK-007).

### Standards to select when the mission opens (not the selection)

| Area | What it covers here | Candidates |
|---|---|---|
| Access by rank | what each rank reads and does | NIST role-based access control, already `STD-003`'s base |
| Access by ownership | an owner's own worlds | relationship-based access control (Google's Zanzibar; OpenFGA) |
| A reading pass for detail | the lock, if detail stops being public | Sign-In with Ethereum (EIP-4361); a short-lived signed token |
| One tenant's numbers | a client never sees another's | organisation-scoped metrics, as Fly.io's managed Prometheus serves them |

The choice and its reason go in this mission's execution log.

Out of scope: what owners may do (`MIS-159`); the public page (`MIS-166`);
alerts; a private fleet.

---

## 2. Acceptance criteria

- [ ] `STD-003` says, in one table, what each rank and a world's owner see
  and do in the worlds room, and numinia-web's permissions match it. Today:
  `STD-003` names the worlds room under the Oracle only.
- [ ] Signed in as an Archon, the room shows every world's and machine's
  numbers and the activity log, with no button that changes the fleet, and
  every route that writes answers 403. Today: the room's data endpoint
  answers 403 to every rank but Oracle; `manage-worlds` is the Oracle's
  alone and no permission reads the fleet.
- [ ] Signed in as a world's owner, the room shows that world and no other,
  with its numbers for 24 hours and 7 days. Today: no world has an owner
  (`MIS-159`).
- [ ] Each world card shows its last 24 hours and 7 days of people inside,
  memory and processor. Today: the room shows only the present — people
  inside and time up.
- [ ] The lock's decision — public facts or a signed reading — is written in
  this mission's execution log with its reason. Today: not decided.

---

## 3. Closure

*(Fill when the mission closes.)*
