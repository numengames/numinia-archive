---
id: "ADR-075"
uid: ""
title: "Game logic runs on the server; people and agents build live, each by the role their organisation gives them"
type: adr
status: draft
version: "0.1.0"
created: "2026-10-16T10:55:00+00:00"
updated: "2026-10-16T10:55:00+00:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Technology"
tags: [decisions, adr, virtual-worlds, engine, server, building, roles, agents]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "In Numinia's engine the server decides everything that matters: positions, who may do what, what a thing does when used; the page draws and sends intents, and a world's scripts, when they come, run in a sandbox on the server. Building happens live inside the world, as in Hyperfy: whoever has the permission places, moves, pins, names and deletes things and everyone sees it at once, with undo per person; uploads are named by their hash and accepted only from builders. Who may build is the permission «build in worlds» of the organisation's own roles (STD-052), never a role the engine invents. AI agents enter as players and build with the same verbs, under the same permission, never above the person who answers for them."
amends: []
related: ["ADR-071", "STD-051", "STD-052", "STD-050", "ADR-069"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-075 — Logic on the server; live building by the organisation's roles

> **Summary:** The server is the only authority in a world; building is live,
> inside the world, for whoever holds the organisation's «build in worlds»
> permission; agents build with the same verbs and permissions as people.
> Decided between 2026-10-13 and 2026-10-15 in the engine study; written here
> so it can be changed.
> **Epistemic:** The Oracle's rulings: the server decides (2026-10-13);
> «se construye en vivo, como en Hyperfy2» and «como mínimo el nivel de
> Hyperfy2» (2026-10-15); «cada organización tiene sus roles; de momento los
> de Numinia» and «los agentes tendrán también sus permisos» (2026-10-15).
> The measured reasons are Ursa's: Hyperfy relays each client's own position
> unvalidated and writes every packet to every socket.
> **Pragmatic:** No world rule lives in the page; no permission is invented
> in the engine; an agent cannot do more than a person with its role.
> **Audience:** Agents · Oracles

---

## 1. Context

Reading Hyperfy's source showed two things the engine would not repeat: the
client sends its own position and the server relays it unvalidated, and every
packet goes to every socket. A world where the page decides cannot be
audited and cannot be kept honest with a thousand people inside. The study
also found that building inside the world is what makes Hyperfy, Second Life
and Rec Room social: the Oracle asked for at least that level.

Roles were the second question. The first draft of the engine copied
Hyperfy's admin, builder and visitor. `ADR-071` had just given each
organisation on numinia.com its own ordered roles, and `STD-052` already
listed six permissions that are the world's business — enter, build, mute,
remove, ban, start and stop — so the engine had no reason to invent its own.

## 2. Decision

1. **The server decides.** Positions come from inputs the server applies;
   the page predicts only its own avatar. Every change to a world is an intent
   the server validates against the thing's declaration, the player's reach
   and the player's permission. World scripts, when they come, run in a
   sandbox on the server with a CPU budget; the page never runs a world's
   code.
2. **Building is live.** Whoever may build places a model from the library or
   an upload, moves, turns, scales, duplicates, pins, names and deletes it,
   and everyone in the zone sees it at once; each builder has undo and redo;
   a pinned thing stays put until unpinned. Uploads are stored under the
   SHA-256 the server computes, with a size cap per kind, and only builders
   may upload. What is built is saved as text (`ADR-074`).
3. **Permissions are the organisation's.** The engine reads the roles of the
   organisation that owns the world in the shape of `STD-051` and `STD-052`:
   «build in worlds» places and moves; mute, remove and ban act only below
   one's own height; owners alone download, upload and delete a world. A
   visitor without a pass from numinia.com has what the base role `@todos`
   has. The engine invents no role.
4. **Agents build like people.** An AI agent enters by the same protocol as a
   player, with its own signed ticket and the mark «· IA» the server adds to
   its name; it uses the same verbs, under the same permission and limits,
   and never more than the person responsible for it (`STD-050`).

## 3. Alternatives considered

- **Client authority** (Hyperfy's model). Simpler, unauditable; rejected on
  the measurements above.
- **Build only by pull request** (Blender plus a pipeline). Reviewable, but
  not social and not what the Oracle asked; it remains the way the shared
  city changes (`ADR-078`), not the way a room is built.
- **The engine's own roles** (admin, builder, visitor). One more list to keep
  in step with numinia.com; rejected on 2026-10-15.

## 4. Consequences

- Every feature of the engine asks the server «may this player do this»
  before changing anything; the page only hides what it knows is refused.
- numinia.com must sign a pass that carries a person's permissions into the
  engine; until it does, a world's owners grant roles from inside the world.
- An agent's actions are signed as its own and can be undone like anyone's.
- Live building needs budgets and a visible gauge (`ADR-078`), or the first
  builder fills the zone.

## 5. Status

Decided by the Oracle on 2026-10-13 and 2026-10-15. Built in numinia-engine:
server-applied movement, the live builder on desktop with undo, uploads by
hash, roles in the shape of `STD-052` with owners and chat commands, the
first agent that walks, talks and builds by permission. Pending: the signed
pass from numinia.com, the builder in VR and on phones, world scripts.
Recorded here on 2026-10-16, pending the Oracle's acceptance on the pull
request.
