---
id: "ADR-081"
uid: ""
title: "A zone is a bubble the game director places anywhere, its rules are little flags planted around it, the file stays the truth, and what changes the world is thrown from a capsule out of the director's box"
type: adr
status: draft
version: "0.1.0"
created: "2026-10-19T22:50:17+00:00"
updated: "2026-10-19T22:50:17+00:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Technology"
tags: [decisions, adr, virtual-worlds, engine, zones, flags, capsules, game-director, server-authority]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "A zone is a bubble the game director (the role dirigir: today the Oracles, and the Vernaculars with them) places anywhere in a world. Its type gives its colour (safe blue, PvE green, PvP red) and its shape is a sphere, a box or an upward cylinder; the bubble shows in the world and on the minimap, with an icon beside the colour, and may be set invisible. Its rules are flags (pvp, creatures, build, entry, sound and music, hour, weather, light, ground, dice, waves, greeting and farewell, loot); an undefined flag inherits from the world, whose entorno.json is the global zone. Where zones overlap the most aggressive type wins by default and an explicit priority overrides it; the server alone resolves which flags govern each person, and light, hour, weather and sound cross-fade on crossing. The flags are physical little flags the director plants around the bubble, each with an icon and a tooltip: planting one writes it into the zone's file entorno/zonas.json, pulling it out deletes it; the file is the truth and the flags its editable view. The director carries a physical toolbox, a branded box of capsules only the director sees; a capsule is an act: thrown, it opens and the server places what it holds. Everything that changes the world is an object, even when a list also reflects it. Box and capsules are born as engine primitives in the house palette; a detail model may be added later without changing the logic."
related: ["ADR-078", "ADR-079", "ADR-080", "STD-052", "STD-023"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-081 — Zones are bubbles with planted flags; acts are thrown from capsules

> **Summary:** The game director places coloured bubbles anywhere in a
> world and plants little flags around them; each flag is a rule written
> into the world's files, the server resolves which rules govern each
> person, and anything that changes the world is thrown from a capsule out
> of the director's box.
> **Epistemic:** The Oracle's rulings of 2026-10-19, in three rounds on the
> same day: first the zones as coloured bubbles where «the most aggressive
> wins» and inside which sound, time, ground, light, dice, creatures and
> loot change; then «the flags are flags», physical little flags planted
> around the bubble and taken from the director's toolbox; then the
> capsules, the box and the three shapes, «to production». The explicit
> priority, the file format and the single instanced mesh are Ursa's
> transformations of what the industry already does.
> **Pragmatic:** A zone is one piece with one list of flags; four things the
> engine already had apart (the PvP zone, the sound bubble, the wave zone,
> the nature zone) become one concept, built flag by flag.
> **Audience:** Agents · Oracles

---

## 1. Context

The engine already has spherical zones with enter and leave events and a
list of who is inside, a PvP flag per zone, bubbles of sound and video with
a radius, shared counters, teleport, creature fights with the ladder of
States, a creative mode for building, and a `dirigir` role. Each of these
carries its own notion of «an area where something is different», each
with its own file and its own code path. Lighting, hour and weather belong
to the whole world; nothing is yet drawn where an area begins.

The Oracle asked for a tool for game directors: large bubbles whose colour
says what may happen inside, where two bubbles overlapping are settled by
the more aggressive one, and inside which audio, time, ground, light, dice,
monsters and loot can be changed or added. He then asked that the rules of
a bubble be visible things, not a menu; and that what a director brings
into a world be an object that is thrown.

The design copies, transforms and combines what the industry has settled
on. WorldGuard's regions carry flags (`pvp`, `mob-spawning`, `entry`,
`greeting`/`farewell`, `time-lock`, `weather-lock`) over a global region
that supplies defaults, and resolve overlaps by an explicit priority, the
higher region that defines the flag winning. Fortnite's Mutator Zone is a
volume the creator places from the editor that applies effects on entry and
exit. Unreal's post-process and audio volumes carry a priority and a blend,
so light and reverb fade when a player crosses. EVE Online shows the risk
of a system as a colour on the map. World of Warcraft lets a sanctuary sit
inside contested land and runs chat by channel. Left 4 Dead's director
meters waves and rests. The engine takes the flag list and the global
region from the first, the placeable device from the second, the blend from
the third, the colour as the language of risk from the fourth, and leaves
the metering director for later.

The rule of the house applies: every function of the engine is a piece
any space can switch on with little, and the server decides so nobody
cheats. A zone is such a piece; its truth is a file in the world's archive
(`ADR-079`); its rules act through closed rules as any object's do
(`ADR-078`).

## 2. Decision

1. **A zone is a bubble the director places.** Whoever holds the role
   `dirigir` — today the Oracles, and the Vernaculars with them — places a
   zone anywhere in a world. A zone has a **type** and the type gives its
   colour: **safe** is blue, **PvE** is green, **PvP** is red. The bubble
   is drawn in the world and on the minimap as a translucent volume of
   that colour with a livelier edge and an icon (shield, sword, skull) for
   people who do not tell the colours apart; a zone may be set
   **invisible** when the director wants it discreet. A zone has a
   **shape** with its measures: a **sphere** (radius), a **box** (width ·
   length · height) or an **upward cylinder** (radius · height), the last
   for aerial battles.
2. **A zone carries flags; the world is the global zone.** The rules of a
   zone are flags: `pvp`, `creatures`, `build`, `entry`, `sound` and
   `music`, `hour` (a time-lock), `weather`, `light`, `ground` material,
   `dice`, `waves` (a horde), `greeting` and `farewell`, `loot`. Every flag
   is optional; a flag a zone does not define is inherited from the next
   zone below it and, at the end, from the world, whose `entorno.json` is
   the global zone. Where zones overlap, the **most aggressive type wins
   by default** (PvP over PvE over safe); an optional explicit
   **priority** overrides the default, so a sanctuary can sit inside a PvP
   arena. The winning zone defines only the flags it has; the rest
   inherit.
3. **The server resolves; the client never decides.** From the enter and
   leave events the server derives which flags govern each person at each
   moment, and every other piece (PvP, creatures, building, chat
   greetings, waves) reads from that resolution. Light, hour, weather and
   sound **cross-fade** over about 0.8 s when a person crosses a boundary;
   they do not jump.
4. **The flags are flags.** In director mode the flags of a zone are
   physical little flags the director **plants around the bubble**, each
   with an icon from the house set (Phosphor, as the design system
   `STD-023` already uses: sword for pvp, skull for creatures, hammer for
   build, door for entry, clock for the time-lock, cloud for weather, bulb
   for light, speaker for sound, chest for loot, die for dice, wave for
   waves) and a tooltip that says what it does. Planting a flag writes
   that flag into the zone's entry in the world's file `entorno/zonas.json`
   (format `zonas@1`); pulling it out deletes the entry. **The file is the
   truth** (`ADR-079`): the flags are its editable view, and the zone
   governs the same with the flags hidden. A flag is a thing with
   `bandera: {clave, valor}` anchored to a zone, placed, moved, removed and
   undone with the same builder as any thing; all flags of a world render
   as **one instanced mesh** with an icon atlas, one draw call.
5. **The director has a physical toolbox.** A box of about 30 × 20 cm
   holding capsules of different colours in a row, marked «Numi» or «NM»
   with a very small Numinia mark and a colour stripe. This is an explicit
   exception by the Oracle to the rule that the engine's interface carries
   no brand: the box is a diegetic object of the world, not the interface.
   Only the director sees and opens it; in VR it hangs from the wrist menu
   and its contents are taken by hand.
6. **A capsule is an act.** Thrown, a capsule opens (reusing the teleport
   beam effect) and the server places what it holds at the landing point:
   a wave of monsters, a house, a vehicle, or nothing yet — an empty
   capsule the director fills. A flag is a rule that stays; a capsule is an
   act that happens once. The rule that binds both: **everything that
   changes the world is an object**, even when a list also reflects it.
7. **Primitives first, a model later.** The box and the capsules are born
   as engine primitives in the house palette (solarpunk leaning, as the
   house's mix of styles allows); no binary asset enters the repository. A
   detail model may be added later, from the assets depot, without
   changing the logic. Mixing models with graphics the engine draws itself
   is a house style, kept deliberately.

### What the file holds

One file per world, `entorno/zonas.json`, travelling in the world's
archive. Each zone carries an `id`, a name, a position, a `forma` with its
measures, a `tipo`, an optional `prioridad`, an optional `visible`, and a
`banderas` object where every key is optional. The existing spherical
zones become the `esfera` case of the same file; the PvP list by zone, the
sound bubble and the wave zone become flags in it.

## 3. Alternatives considered

- **«The most aggressive wins», alone.** The Oracle's first wording. Kept
  as the default; without a priority a sanctuary inside an arena cannot
  exist, which is the most common case in the games studied, so priority
  was added as the explicit override.
- **Flags as a menu in the zone's card.** Kept as the fallback (chat orders
  and a tabbed card while the flags are not built), rejected as the main
  way: a rule that is a visible object in the world tells whoever enters
  what governs without reading anything, and works the same on PC, phone
  and VR.
- **A box that is interface, not an object.** Rejected by the Oracle: the
  box is a thing of the world the director carries, which is why it may
  carry the mark that the interface may not.
- **One file per kind of area** (a PvP file, a sound file, a wave file).
  Rejected: four lists with four code paths for one idea; one file with
  one flag list is less code and fewer questions.

## 4. Consequences

- The engine extends its zone resolution from spheres to boxes and
  cylinders, and moves every per-area rule (PvP, sound, waves, creatures,
  ground) to read from the resolution of `entorno/zonas.json`.
- Light, hour, weather and ground become settable per zone, with a fade;
  today they are set for the whole world.
- Director mode gains the planted flag as a thing, the box with its
  capsules, and the throw-and-open act; the builder's place, move, delete
  and undo are reused, and a flag never adds a draw call of its own.
- A zone is the unit that other pieces anchor to: a wave horde is a zone
  with the `waves` flag; a sound bubble is a zone with `sound` and
  `visible: false`.
- Nothing of this changes what a person may do beyond the zone's rules:
  the permission check stays the organisation's (`STD-052`), and an agent
  that enters through the door of `ADR-080` is governed by the same flags
  as a person.
- The instanced flags and the fade on crossing are measured on the house's
  reference headset before the flags leave draft; the draw-call budget of
  the world, not the triangle count, is what they must respect.

## 5. Related decisions of the same day

Recorded here so the day's rulings sit together; each is a smaller piece
with its own queue.

- **Groups.** A party is 2 to 8 people, formed inside a world and lasting
  the session, with a «Group» chat channel heard anywhere in that world
  beside «Near» and «Zone»; it is built without an account, the server
  keeping the members per entity. A band is not a new thing of the engine:
  it **is** the organisation of numinia.com (`STD-052`), read from the
  signed pass, with a «Band» channel for its members connected to the
  world. Band chat across worlds needs a hub (numinia.com or a light relay)
  and waits for the open decision on identity.
- **Waves.** The `waves` flag runs 8 waves by default, a boss on the last,
  loot when the horde closes, the zone being PvE while it lasts. The «level
  system» tested with the waves is the fight's ladder of States (Alerta →
  Herido → Colapsado → Aletargado), not experience points; the horde is
  lost when everyone in the zone reaches Aletargado.

## 6. Status

Decided by the Oracle on 2026-10-19. Of this, the engine has the spherical
zones, the PvP flag by zone, the sound bubble, counters, teleport, the
creative mode and the `dirigir` role; the visible bubble, the shapes, the
flag list with inheritance and priority, the planted flags, the box and
the capsules are not built. Recorded here on 2026-10-19, pending the
Oracle's acceptance on the pull request.
