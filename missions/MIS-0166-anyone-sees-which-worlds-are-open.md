---
id: "MIS-166"
uid: ""
title: "Anyone sees which worlds are open and how many people are inside: a public list on numinia.com, fed by the machines, with no person in it"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-12T13:11:36+02:00"
updated: "2026-10-12T13:11:36+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, metrics, privacy, numinia-web]
license: "CC0-1.0"

priority: medium
effort: M
executor: hybrid
assigned_to: null
completed: null

depends_on: ["MIS-162"]
requires_oracle_approval: true
context: "2026-10-12T13:04:00+02:00"
paths: [system/SYS-014-the-worlds-fleet-as-wired.md]
related: ["MIS-162", "MIS-165", "MIS-164", "SYS-014", "ADR-069"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-166 — Anyone sees which worlds are open

> **Summary:** numinia.com has no page where a visitor finds the house's
> worlds: only the Oracle's room lists them. This mission adds the public
> list — cover, name, open or asleep, people inside now, *Enter* — read from
> the machines' doors, and closes each world's `/status` to outsiders, which
> today hands anyone every visitor's id, name and live position.
> **Epistemic:** Which of the house's worlds are open to play right now, and
> where the people are.
> **Pragmatic:** A visitor reaches a world from the city without knowing its
> address; an event's audience sees which world is full.
> **Audience:** Agents · Oracles · Players

---

## 1. Scope

- **The page:** on numinia.com, in the five languages, open to anyone,
  signed in or not.
- **Which worlds it lists:** the public fleet's worlds marked to be listed —
  a mark in the order, off by default, so that test worlds stay out —
  with their card's cover, or their own page's image while they have no
  card.
- **Where its numbers come from:** the machines' doors (`MIS-162`), counts
  only, cached a minute; never a person.
- **Each world's `/status` closes to outsiders** once the room and the list
  read their counts from the doors: the machine's Caddy keeps it for the
  machine itself. The room then reads people inside from the doors too.
- The hand-run server's five worlds stay off the list: that machine is not
  the fleet's to change.

### Standards to select when the mission opens (not the selection)

| Area | What it covers here | Candidates |
|---|---|---|
| What a public count may say | people inside, never who | GDPR data minimisation, Article 5(1)(c) |
| How a list of live worlds reads | open, full, asleep, enter | the server browsers of online games; status-page conventions |

The choice and its reason go in this mission's execution log.

Out of scope: who sees more than the public numbers (`MIS-165`); search,
filters or categories on the page; worlds of other organisations; the five
worlds of the hand-run server.

---

## 2. Acceptance criteria

- [ ] numinia.com serves, in its five languages, a page that lists every
  listed, running world of the fleet with its cover, name, people inside and
  *Enter*, to a visitor who has not signed in. Today: no such page; the only
  worlds page is the Oracle's room (`/lap/admin/worlds/`), whose data answers
  403 without an Oracle session.
- [ ] Nothing the page reads carries a person's name, id or position, and a
  test holds it. Today: no page.
- [ ] From outside the machine, `https://<world>/status` names no person.
  Today: it lists each connected person's id, name and live position (the
  engine at `0e20453`).
- [ ] The worlds room reads people inside from the doors, not from each
  world's `/status`. Today: the room asks each world's `/status`, like a
  visitor (numinia-web, the worlds source).
- [ ] A world whose order is not marked to be listed does not appear. Today:
  no list and no mark.

---

## 3. Closure

*(Fill when the mission closes.)*
