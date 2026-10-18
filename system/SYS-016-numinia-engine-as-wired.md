---
id: "SYS-016"
uid: ""
title: "Numinia Engine, as wired"
type: documentation
subtype: reference
status: draft
version: "0.2.0"
created: "2026-10-16T15:05:00Z"
updated: "2026-10-18T23:00:00+02:00"
author: "ursa"
owner: "oracle"
digital_source_type: ai-assisted
section: "Technology"
tags: [system, reference, engine, numinia-engine, 3d, multiplayer, determinism]
license: "CC0-1.0"
related: ["MIS-195", "ADR-073", "ADR-074", "ADR-075", "ADR-076", "ADR-077", "ADR-078", "SYS-013", "SYS-014", "STD-026", "STD-050"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SYS-016 — Numinia Engine, as wired

> **Summary:** What Numinia Engine is made of today, which piece decides what,
> what has been measured and what has not: the reference a person or an agent
> reads before building on it or hosting it.
> **Epistemic:** Which packages make up the engine, who decides game state,
> what the engine promises about determinism, and which promises rest on a
> measurement.
> **Pragmatic:** Before adding a feature, changing the wire or promising a
> capacity to a client, know which layer owns it and whether the number you
> would quote was measured or estimated.
> **Audience:** Agents · Oracles

> **A system document is a reference manual, not a plan.** Pieces that do not
> exist yet are listed as *not wired*; nothing here says they run until they
> do.

---

## 1. Scope

The engine repository `numinia-engine` (public, AGPL-3.0-only; `SYS-013`) at
commit `f5afece` of 2026-10-16: its packages, its server, the plaza page, its
checks and the limits it publishes. The engine does not know what Numinia is:
it draws, synchronises, simulates and loads data (its `AGENTS.md`); the city,
the adventures and the rules of play are data and features it runs.

Not covered: why the engine exists and what it builds first (`ADR-073`); how a
world is stored and downloaded (`ADR-074`); who may build and where logic runs
(`ADR-075`); the fleet that would host it (`SYS-014`); and the rules that bind
whoever works on it, which are principles, standards and procedures of this
archive (`MIS-195`), not part of this reference.

---

## 2. How it works

### The pieces

Layers run from the bottom up: `core → schema → ecs → sim → net → feature →
{client, instance} → agent → server`, and `instance → cli`. `render` talks to
three.js and to nothing else; `agent` sits on the chain as its own process
(the service `numinia-habitantes`, below), not apart from it. A check,
`tools/layers.mjs` with its rules in `tools/layers.json`, refuses an import
the rules do not allow.

| Piece | What it is | State |
|---|---|---|
| **core** | fixed-point arithmetic, seeded random numbers, the state hash, the `Result` type | wired |
| **schema** | one description per component and message: defaults, validation with error paths, bits per field | wired |
| **ecs** | entities with one integer column per field; queries in ascending id | wired |
| **sim** | the 20 Hz deterministic step, snapshot, fingerprint and replay | wired |
| **net** | bit packing, quantised snapshots, area of interest, a transport interface with an in-memory loopback | wired |
| **feature** | the plug that game features load through; it refuses a feature with no accessible path | wired |
| **instance** | the authoritative loop and a headless bot that speaks the real protocol | wired |
| **server** | one port serving HTTP (`/health`, `/metrics`, public feature routes) and WebSocket (`/ws`) | wired |
| **client**, **render** | the page's logic and drawing; `render` is the only place that touches three.js | wired |
| **agent** | the service `numinia-habitantes`, apart from the tick: an inhabitant enters as a player with an agent ticket, follows a script, and may think with a language model that only proposes calls the code checks; without a key, over a cap or on a failure the script answers | wired |
| **cli** | headless runs and the command line | wired |
| **features/** | what a world does: chat, gestures, environment, elements, missions, placed objects, waking the plaza | wired; each loads through the plug and never touches the simulation |
| **apps/plaza** | the page: menu, map, builder, camera, chat | wired |
| **Voice** | spatial voice by proximity, server-relayed (Opus or µ-law), never to everyone and never recorded | wired |
| **WebTransport** | a faster transport behind the same interface | not wired |
| **Inside the fleet** | the engine as the image of a fleet world | wired: published as `ghcr.io/numengames/numinia-engine:sha-<commit>` on every merge to main; the fleet runs it beside the Hyperfy fork, told apart by image (`SYS-014`) |

### How it ships

Every merge to `main` runs the gates, then publishes a release — the
installer (`instalar-motor.sh`) and its checksums — and a container image
built from that same installer, for both amd64 and arm64:
`ghcr.io/numengames/numinia-engine:sha-<commit>`
(`.github/workflows/publicar-motor.yml`). A server installed from the
release can opt into checking every 10 minutes for a new one and
reinstalling itself, never touching the world's own folder; the image is
what the worlds fleet runs (`SYS-014`).

### What decides what

The server decides. A client sends inputs; the server applies them and sends
each client only what is near it (area of interest). An avatar advances only
when one of its own inputs is applied, so a client's prediction stays exact
whatever the network does (`numinia-engine:docs/DETERMINISM.md`, «One input = one step»).
Everything in `sim` is deterministic: integers and Q16.16 fixed point, no
clock and no `Math.random`. What the area of interest chooses to send, timing
measurements and anything a renderer does are allowed to vary and never write
into the state.

A reference fingerprint of the state is pinned in two tests. It stands at
`93b192c8` for simulation format 2 and wire format 2 (it was `fa94375e` for
format 1); changing it is a format change.

### How it is checked

`npm run gates` runs, in seconds and on one core: the unit tests, the layer
rules, determinism (the same seed gives the same hash), a bandwidth budget of
70 kbit/s per client at 50 visible, and a plaza of 1,000 with a tick p99 of at
most 25 ms. The browser check, `tools/auto.sh e2e`, drives two real tabs in
Chromium and Firefox. A change reaches `main` only when the gates are green.

Three commitments sit behind that gate, matching the industry's highest
standards for a project this size. The code is typed throughout — erasable
TypeScript only (no `enum`, no `namespace`, no constructor parameter
properties), so Node runs the `.ts` files directly and a type never outlives
what it describes (`numinia-engine:AGENTS.md`, «Style»). Nothing reaches
`main` without the tests that gate it, run before every commit and again
before every merge (above). And no jump is silent: a non-additive change — a
changed layout, a new pinned fingerprint — bumps the format version, re-pins
the fingerprint in its test, and is written out by name in the diary, never
folded into an ordinary commit message (`numinia-engine:AGENTS.md`,
«Autonomy»).

### What it has measured

All figures are on the Oracle's development machine unless the row says
otherwise, and each is stored with its test in `limits.json`.

| Quantity | Figure | State |
|---|---|---|
| Simulation step / snapshot rate | 20 Hz / 10 Hz | measured |
| 1,000 people, one thread | tick p99 16–23 ms | measured |
| Traffic per person | 27.2 kbit/s | measured |
| People per instance on the smallest rented server | about 500 | **estimated** |
| A phone or a headset at its frame rate | no real device yet | **not measured** |
| Safari's fingerprint | its test browser does not run on the build machine | **not measured** |

### Reading its limits

`limits.json` (schema `numinia-engine/limits@1`) holds every limit with an
axis (server size, device tier, browser engine, graphics backend), a value and
a state. `measured` names the test that measures it and the date;
`estimated` names its source. `numinia-engine:docs/FICHA-TECNICA.md` is the same table for
people.

---

## 3. Accuracy

**Verified against:** the repository at `f5afece` on 2026-10-16 —
`README.md`, `AGENTS.md`, `numinia-engine:docs/MAPA.md`, `numinia-engine:docs/DETERMINISM.md`,
`numinia-engine:docs/FICHA-TECNICA.md`, `limits.json`, `packages/agent/README.md` — and the
organisation's listing of public repositories.

- Who may build in a world was read from the technical sheet of 2026-10-15
  and from the commit that made building open to everyone by default; a
  version by role is on a branch. *To confirm* against `main`.
- No figure above was re-run for this document; each is the repository's own.
- The study folder behind the engine's decisions is in no repository, so a
  citation of it cannot be checked (`MIS-195`).
- Refreshed 2026-10-18 against `328ea0a` (v0.7.0): the layer chain, Voice and
  "Inside the fleet" rows were stale. `README.md`, `numinia-engine:docs/MAPA.md` and
  `numinia-engine:docs/JUGADOR.md` (row U10) all show proximity voice wired and `agent` on
  the chain, not apart from it; `.github/workflows/publicar-motor.yml` ships
  the image the fleet now runs (numinia-assets `55c75ad`,
  `open-worlds/machine/README.md`). `numinia-engine:docs/FICHA-TECNICA.md` still reads
  «voz: aún no implementada» — an internal contradiction of the engine
  repository against its own README and `numinia-engine:docs/JUGADOR.md`, left for the engine
  repository to fix; this document follows the code and the test that
  measures voice traffic (row «Voz por cercanía», `limits.json`).
