---
id: "ADR-078"
uid: ""
title: "An object knows its class and its scope, acts through closed rules editable from both ends, and is found through one selector and one list"
type: adr
status: draft
version: "0.1.0"
created: "2026-10-16T10:55:00+00:00"
updated: "2026-10-16T10:55:00+00:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Technology"
tags: [decisions, adr, virtual-worlds, engine, objects, rules, escape-rooms, building, layers, limits]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "A placed object in Numinia's engine has a class (scenery, thing to take, control, door, place, code panel, sign, zone), a scope for its state — everyone or each person, with group added later — and, apart from what the builder configured, a game state that can be reset. Objects affect each other through rules «when → then» from a closed, versioned list, stored on the object that fires and editable from either end; who fired travels with the event; conditions are checked at that moment, never every frame; a copied set keeps its links among its copies. A target is chosen with one selector that accepts a click in the world, a row of a list showing only valid targets, a marker on the map or a typed id; only named things can be targets. A world is one live layer governed by its organisation's roles; «your room» is a world of your own; the shared city changes only by a published version with a note and a review; parcels inside the city wait for the Oracle's answer. The list of objects lives in the page, with «mine» answered by the server with the asker's own ids only. Each zone shows a gauge of objects, triangles, logic cost and media while building, and refuses to place more at one hundred per cent. The server's power to act on a player moves up right after the rules."
amends: []
related: ["ADR-073", "ADR-074", "ADR-075", "ADR-076", "ADR-077", "ADR-070", "STD-052", "PRI-012"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-078 — Objects: class and scope, closed rules, one selector, one list

> **Summary:** The object model the first escape room forces, and that the
> role-playing table and the mini-games reuse: what an object is and for
> whom its state counts; how a lever opens a door without code; how the
> builder picks the door; which layer is live and which is published; how
> two thousand objects are found; and a gauge that stops building before the
> phones heat up. Decided by the Oracle on 2026-10-16 on Ursa's design, which
> compared ten world-building systems from their current documentation.
> **Epistemic:** The Oracle's ruling of 2026-10-16 («vamos con lo
> recomendado») on the design document of the same day. The shape of the
> rules follows the two systems that let many people build logic without
> code — Fortnite's UEFN and Decentraland —; the parcel rules, when they come,
> follow Second Life's; the gauge follows Horizon Worlds. Every number named
> below is a proposal to be measured before it is published.
> **Pragmatic:** Decides the fields, the rule format and the three screens the
> engine builds next; nothing here is built yet.
> **Audience:** Agents · Oracles

---

## 1. Context

Today a placed object in the engine knows its model, its place, its name and
whether it is pinned; a quest thing is a separate text file with its position
written by hand; what a thing does lives in the quest's steps. An escape room
built inside the world without files (`ADR-073`) needs more: a door that
opens when a lever is used, a key that opens a chest, a power that changes
what a player can do, a zone that changes the rules for whoever is inside —
and a way to say, with a controller, a finger or a mouse, which door.

The Oracle asked five questions: how objects relate; how one is picked from
another; which layers are live and which published; how the list of objects
works; and whether the order and the three layers of logic (properties,
rules, code) are right. Ten systems were read from their current
documentation: Roblox Studio, UEFN and Fortnite Creative, Hyperfy, Rec Room,
Second Life, Decentraland, Minecraft, Horizon Worlds, Dreams and Core. The
two that let many people build logic without code use closed lists of
triggers and actions as data, with the target chosen from a list; those that
wire in 3D use the same pointing gesture on every controller; none documents
building from a phone; and none has at once a server that decides and a
per-person scope declared in the editor.

## 2. Decision

1. **Class and scope.** Every placed object has a class from a closed list
   that only grows — scenery, thing to take, control (lever, button), door,
   place, code panel, sign, zone — and each class brings its fields, its
   events and the actions it accepts. Its state has a scope: *everyone* (a
   door opened by one is open for the group) or *each person* (a clue read by
   you stays for the others); *group* is added when groups exist, without
   touching the rest. Each class has a default scope the builder may change.
   The engine's field names are `clase` and `ambito`, because `tipo` and
   `alcance` already mean the kind of file and how far a sound reaches.
2. **Configuration apart from game state.** What the builder set — place,
   code, rules — is the truth and is saved; what happens while playing —
   open, taken, on, a counter — lives apart, shared or per person on the
   server, never only in a page. «Reset» clears only the second: it is what
   «try from here» and the reset at the end of a group need.
3. **Rules.** An object acts through a list of rules «when → if → then»
   from a closed, versioned list (`reglas@1`): *when* it is taken, used,
   turned on or off, opened or closed, someone arrives or leaves, the code is
   right or wrong, a quest reaches a step, it is reset; *if* up to four
   conditions, checked at that moment and never every frame (another object
   is in a state, who fired has a thing, who fired is at a quest step, the
   counter equals a number); *then* up to four actions in order (open, close,
   lock, turn on or off, appear or disappear, play a sound from the list,
   say a line to who fired or to the zone, give or take a thing from who
   fired, advance a quest step for who fired, reset an object, count). Who
   fired travels with the event; for whom an effect counts is decided by the
   target's scope. Rules are stored on the object that fires and can be
   added from either end: from the door, «opens when…» writes the rule on
   the lever. A deleted target leaves the rule marked, never broken. A copied
   set keeps its links among its copies. Rules run on the server, by events,
   with a chain cut at four, and under published limits: eight rules per
   object, four conditions, four actions, and per zone the number of objects
   with rules and of zones with enter and leave events, both measured first.
4. **One selector.** The target of a rule is chosen in a mode that accepts
   four gestures and highlights the candidate in the world: a click or a ray
   on the thing, a row of a list that shows only the classes the action
   accepts (nearest first, with search), a marker on the map, or a typed id.
   Only named things can be targets; scenery is offered a name on the spot.
   The same selector on desktop, phones and headsets; an agent uses the id.
5. **Layers.** A world is one live layer governed by its organisation's
   roles (`ADR-075`): «your room» is a world of your own, the one rented by
   the day (`ADR-070`). The shared city, when it opens, is a world where the
   base role does not build and that changes only by a published version: the
   world's archive (`ADR-074`) with a mandatory note, reviewed before it is
   imported; restoring an older version creates a new one; a failed review
   never touches what is live. Parcels inside the city wait for the Oracle's
   answer on whether citizens get one; when they come, an object belongs to
   the parcel that holds its anchor, moving it where one may not build is
   refused before it is dropped, what is left where one may no longer build is
   returned to its author's own list and never deleted, and the border also
   decides who may actuate. A private copy to design in waits for copies of a
   zone. Building together shows each person's selection in their colour
   before any lock is added.
6. **The list.** The list of a zone's objects lives in the page, built from
   what already reaches it: search by name and id; filters by class, with
   rules, unnamed, pinned, «points at the selected one», and «mine», which the
   server answers with the asker's own ids only, so nobody else's authorship
   leaves the server; a count of links per object. From a row: highlight, move
   the camera while building, mark it as a destination on the minimap;
   teleporting the avatar comes with the server's power to act on a player.
   On the map, while building, touching a marker selects the object. Agents
   and screen readers read the same cards (`ADR-076`).
7. **The gauge.** While building, each zone shows bars for objects,
   triangles, logic cost per tick priced per class, and sounds and videos:
   yellow at seventy-five per cent, red at one hundred, when placing more is
   refused; with the ten heaviest things listed. The prices are measured
   before they are published.
8. **Order.** The three layers of logic stay; combat adds no fourth. The
   server's power to act on a player — teleport, seat, speed, health — moves
   up right after the rules, because powers, combat zones and the table's
   seats need it.

## 3. Alternatives considered

- **A field that points at another object, and nothing else** (Roblox's
  object reference, Horizon, Core — always with code behind). One to one;
  «the three levers open the door» does not fit; kept as the simplest form of
  a rule.
- **Named signals** (Hyperfy's text events, Fortnite's old numbered
  channels, Dreams' wireless pairs). Many to many without picking, but Epic
  abandoned channels for planning, renumbering and a cap, and a renamed
  signal breaks silently; may come later as a declared, listed addition.
- **Rules stored on the receiver** (UEFN). Equivalent; a target can be a
  person, not only an object, so the firing object holds them, and the two
  views and the two entry points cover the other reading. If builders still
  think from the door, the storage moves without changing the format.
- **Code first.** The third layer, sandboxed on the server, later.
- **Parcels now.** Puts a parcel system before the role-playing table;
  deferred to the Oracle's answer.
- **A list served by the server.** The only one that knows authorship, which
  must not leave the server; kept for «mine» alone.

## 4. Consequences

- The escape room is built in three visible steps: class and scope in the
  inspector, with quests citing objects by id; the «what it does» tab with
  the rules, the selector and the two views; «try from here» and «reset the
  room». Nothing of it is built before this decision is accepted.
- The two local engine branches that touch objects and quest things land
  first; the new fields take names that do not collide with theirs.
- Limits for rules, zones and the gauge's prices are measured with a thousand
  people and published with the engine's limits.
- A public «author» on objects, if credits are ever wanted, is a change of
  privacy (`PRI-012`) and needs its own decision.
- Building from a phone is designed here without precedent in the ten
  systems read; it is tested with people before it is called done.

## 5. Status

Decided by the Oracle on 2026-10-16 on the design document «Diseño de los
objetos» of the engine study, pending his acceptance on the pull request.
Nothing built; the first engine work is step one of the escape room.
