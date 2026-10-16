---
id: "DES-019"
uid: ""
title: "Where an object's logic lives: rules first, code by class, nothing foreign runs"
type: design
status: draft
version: "0.1.0"
created: "2026-10-16T20:05:00Z"
updated: "2026-10-16T20:05:00Z"
author: "ursa"
owner: "oracle"
digital_source_type: ai-assisted
section: "Technology"
tags: [design, engine, numinia-engine, objects, logic, sandbox, ai, budgets]
license: "CC0-1.0"
related_missions: []
related: ["ADR-075", "ADR-077", "ADR-078", "SYS-016", "PRI-016", "PRI-017", "PRI-018"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# DES-019 — Where an object's logic lives: rules first, code by class, nothing foreign runs

> **Summary:** In Numinia Engine an object carries its own logic. This page
> says in what form, so that a zone with a thousand people and two thousand
> objects holds, phones stay cool, and an AI can write, read and repair that
> logic. Three floors: closed rules for everything placed, code written per
> class of object when the rules fall short, and only rules for objects that
> come from another world.
> **Epistemic:** In what form should an object carry its logic, so that the
> engine stands the load and an AI writes it well?
> **Pragmatic:** An agent re-evaluates this page every six hours against new
> sources and measurements; any change reaches it as a pull request the
> Oracle approves. Build work cites it from a mission.
> **Audience:** Agents · Oracles

> **A design describes what is not yet built.** It is not a decision, not a
> mission, and not a description of what exists. If it has been built, its
> description belongs in `system/`; if it must be built, the work belongs in a
> mission that cites this design.

---

## 1. Current state

As of 16 October 2026, `ADR-078` decided that an object knows its class and
acts through closed «when → if → then» rules, and `ADR-075` that game logic
runs on the server. Neither the rules nor code attached to objects is built.
What exists (`SYS-016`): placed things are data (model, position, name,
pinned, solid) and do nothing; adventure files hold quests, people and things
to pick up; the server runs a deterministic simulation at 20 ticks a second
with a seeded random generator.

---

## 2. Future state

### 2.1 What the evidence says

- **A script inside every object does not scale.** Second Life measured that
  every idle script costs time each frame[1], and Roblox tells creators to tag
  objects and drive each kind from a single script rather than attach one to
  every instance[2]. What lasts is data on the object, one system per kind,
  fired by events.
- **The cost is logic that looks every tick, not the number of objects with
  logic.** Measured on one desktop (Node 24, 2,000 objects, 1,000 people):
  every object checking every person each tick took 1.7 ms in plain
  JavaScript and 8–90 ms inside a sandbox; the same rule as one engine system
  over a spatial grid took 0.26 ms (own measurement, not repeated on the
  server or a phone).
- **The server decides.** Roblox[3] and Decentraland[4] both added
  server-authoritative modes in 2025–26. Decentraland kills a scene for
  everyone when it passes 10 s in one turn or 256 MB[4]: a budget has to be
  per tick and per object, and going over must defer work, not break the
  world.
- **Budgets for foreign code are counted, not timed.** Shopify Functions runs
  third-party code in production against an exact instruction limit, with
  named errors for each limit, and says the exact count lets an AI agent
  optimise its own code[5][6]. A clock gives different answers on different
  machines; our simulation must give the same answer everywhere.
- **JavaScript maths is not the same everywhere.** The language standard
  leaves sine, exponent and power to each implementation[7]; on one desktop,
  the server's and the browser's engines disagreed on 6.3 % of 100,000 values
  (own measurement).
- **What an AI writes best depends on the logic.** Choosing from closed
  options under a schema is close to perfect: OpenAI reports 100 % schema
  compliance with structured outputs[8]. Once logic needs loops or arithmetic,
  code beats JSON by up to 20 points[9]. A node graph read as code beats the
  same graph as JSON[10]. Models are strongest in mainstream languages[11]
  and type checking roughly halves compile errors[12]; a vendor benchmark of
  Fortnite's new language Verse found 17 % compiling on the first try[13].
- **Even the best model fails half of non-trivial game tasks alone.**
  Roblox's benchmark puts the best at 51.7 % on one try, and agents that
  inspect the objects involved before editing do better[14].
- **Logic that travels between owners is refused or fenced.** Roblox rejects
  scripts in marketplace items[15]; Decentraland's smart wearables run only
  for the wearer and any scene can turn them off[16]; the one open federation,
  OpenSimulator's Hypergrid, ships switches to refuse script assets at the
  border and warns that a hostile host can copy or wipe a visitor's
  inventory[17][18]. glTF's interactivity extension is for one user and lets a
  graph touch only its own asset[19].

### 2.2 The three floors

**Floor 1 · Closed rules (decided in `ADR-078`, not built).** «When I am
used → if the lever is on → open the door.» The logic is stored on the
object; the engine runs it. Added by this design:

- Triggers belong to the engine, never to the object: coming near, entering
  or leaving a zone, a timer (at least half a second), a change of state, a
  use. One system serves every object. The rules have no per-tick hook.
- A logic budget published in the engine's limits file and checked by its
  tests: rule firings per tick, actions per rule, chain depth (four), and
  total logic time per tick (proposed: 2 ms at p99). Work over budget fires
  on the next tick in a fixed order; nothing is dropped silently.
- The builder and the AI see the cost of each object and a bar for the zone,
  yellow at 75 %, red at 100 %, where placing more stops.
- For the AI: each class of object publishes a schema of what it accepts, so
  a model can only write valid rules; each rule also reads as one line of
  text; errors name the allowed values; one call shows what an object does
  and what points at it; another fires events without playing and returns
  what changed and which rules fired.

**Floor 2 · New classes written in code (engine row M20).** When the list
falls short (a dice with house rules, a counter with arithmetic, a
mini-game), a new class of object is written in TypeScript against a small
typed interface, and from outside it is used like any other class: it shows
in the same catalogue, with its schema and its cost. It runs on the server in
a sandbox, one context per class and not per object, metered by an exact
step count, using the simulation's fixed-point maths, never the language's.
A rule set can graduate into a class when it outgrows the list. Never a
language of our own; never a node graph as the stored form (a graph may be
drawn from the rules for people who like wires).

**Floor 3 · Objects from another world (later).** They travel only as data
plus floor-1 rules, with their origin and a signature. The host re-checks
every rule against its own catalogue and chooses, by origin and by zone,
whether the object arrives still (seen only), local (works only for whoever
carries it) or live (affects others), with permissions per kind of action and
a cap per person. Floor-2 code does not travel.

### 2.3 What not to do

- One program with its own machine inside each object.
- Object logic running on every screen.
- Any hook that looks every tick.
- A scripting language of our own.
- Running another world's code on our server.

---

## 3. The gap

- **Measure on the real server and a phone or headset.** Every figure above
  marked as own measurement came from one desktop.
- **No platform publishes a CPU cap per object on the server.** The 2 ms per
  tick and the caps in floor 1 are proposals until measured with a thousand
  people.
- **No study compares closed rules against code for game logic directly.**
  The choice rests on neighbouring evidence.
- **The sandbox's step counter is coarse:** one step ranged from 0.15 ms to
  171 ms in the measurement. Floor 2 needs a memory cap, a clock backstop
  and guarded bulk operations, or a finer counter.
- **What would change this design:** escape rooms that need more than four
  conditions or timers everywhere (then new classes, not code); a provider
  that cannot hold our schema; a cheap deterministic sandbox per object.

---

## 4. Cost and risk

- **Floor 1:** part of the escape-room work already planned; the new pieces
  are the trigger systems, the budget and the "test without playing" call.
- **Floor 2:** the largest piece. Risk: a sandbox escape or a runaway class;
  contained by the step count, the memory cap and the server deciding
  everything.
- **Floor 3:** not before two worlds want to exchange objects.
- **Risk of the whole design:** that the rule list proves too narrow and
  people ask for code early. The answer is new classes, which keep one
  catalogue for people and AIs alike.

---

## Sources

The full study, with verbatim quotes and saved copies, is in the engine's
study folder (notes 45–48, read 16 October 2026); it lives outside git.

1. Second Life wiki, *LSL Script Efficiency* (old page, 2009 measurements): https://wiki.secondlife.com/wiki/LSL_Script_Efficiency
2. Roblox Creator Docs, *Script locations* and *CollectionService*: https://github.com/Roblox/creator-docs
3. Roblox Creator Docs, *Server authority*: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/projects/server-authority/index.md
4. Decentraland docs, *Authoritative servers*: https://raw.githubusercontent.com/decentraland/docs/main/creator/sdk7/networking/authoritative-servers.md
5. Shopify, *Functions API limits (2026-01)*: https://shopify.dev/docs/api/functions/2026-01.md
6. Shopify, *Optimize instruction counts*: https://shopify.dev/docs/apps/build/functions/optimize-instruction-counts.md
7. ECMA-262 2025, §21.3.2 *Function properties of the Math object*: https://tc39.es/ecma262/2025/multipage/numbers-and-dates.html
8. OpenAI, *Introducing Structured Outputs in the API* (6 August 2024): https://openai.com/index/introducing-structured-outputs-in-the-api/
9. Wang et al., *Executable Code Actions Elicit Better LLM Agents* (CodeAct, ICML 2024): https://arxiv.org/abs/2402.01030
10. Xue et al., *ComfyBench* (2024): https://arxiv.org/abs/2409.01392
11. Cassano et al., *MultiPL-E* (2022): https://arxiv.org/abs/2208.08227
12. Mündler et al., *Type-Constrained Code Generation* (PLDI 2025): https://arxiv.org/abs/2504.09246
13. UEFN Central, *AI model bake-off for Verse* (community vendor, updated 6 October 2026): https://uefncentral.com/blog/ai-model-bakeoff-uefn-verse-2026
14. Roblox, *OpenGameEval* (October 2026): https://arxiv.org/abs/2610.02563
15. Roblox Creator Docs, *Marketplace validation system*: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/marketplace/validation-system.md
16. Decentraland docs, *Smart wearables*: https://raw.githubusercontent.com/decentraland/docs/main/creator/sdk7/projects/smart-wearables.md
17. OpenSimulator, *StandaloneCommon.ini.example*: https://raw.githubusercontent.com/opensim/opensim/master/bin/config-include/StandaloneCommon.ini.example
18. OpenSimulator wiki, *Hypergrid Security* (undated, before 2025): http://opensimulator.org/index.php?title=Hypergrid_Security
19. Khronos, *KHR_interactivity* specification: https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_interactivity
