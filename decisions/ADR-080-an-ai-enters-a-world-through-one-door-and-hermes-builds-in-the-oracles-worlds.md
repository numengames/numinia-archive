---
id: "ADR-080"
uid: ""
title: "An AI enters a world from wherever it lives through one door — its own key, the world's tools, a connection it opens — and the house's builder in the Oracle's worlds is Hermes, with any model"
type: adr
status: draft
version: "0.1.0"
created: "2026-10-16T14:30:00+00:00"
updated: "2026-10-16T14:30:00+00:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Technology"
tags: [decisions, adr, virtual-worlds, engine, agents, ai, hermes, mcp]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "The Numinia engine does not know where an AI lives nor which model it uses. Every AI agent enters a world through one door with three parts: a key of its own (the private half stays where the agent runs; the public half is listed in the world's files, or the agent arrives as a member of the world's organisation with a pass numinia.com signs); the world's tools (look, say, go, place, move, delete, undo), served by the world and checked by the same permission as a person's act; and a connection the agent opens towards the world, so no port is opened anywhere. The same agent may enter several worlds and may be called into a world on demand. In the Oracle's worlds the builder is Hermes, which may run any model, a free one included, on the Oracle's computer, on a house server or on Hermes Cloud. The brain inside the engine stays for worlds without an agent."
amends: ["ADR-075"]
related: ["ADR-079", "ADR-074", "ADR-071", "STD-050", "STD-052"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-080 — One door for AI agents; Hermes builds in the Oracle's worlds

> **Summary:** An AI enters a world with its own key, uses tools the world
> serves and opens the connection itself; where it runs and which model it
> uses are not the world's business. In the Oracle's worlds the builder is
> Hermes, with any model.
> **Epistemic:** The Oracle's rulings of 2026-10-16: first, a house key with
> a spending cap per world, calls through the till and a panel in the
> world's settings on numinia.com; then, the same day, «poder vincular Hermes
> a mis mundos», because Hermes can switch models, run several and a free
> one «con toda la información que tiene de Numen», instead of tying the
> engine to one provider; then «dejarse las puertas abiertas a distintas
> configuraciones», one AI in several worlds of an organisation, invoked into
> a world, added from the platform or from the world. The door and the
> reading of the terms below are Ursa's.
> **Pragmatic:** The engine adds no provider, key or model of its own for
> outside agents; whoever builds an agent builds it against the door.
> **Audience:** Agents · Oracles

---

## 1. Context

`ADR-075` let agents enter as players and build with a person's verbs under
the organisation's permission. The first agent, Lía, lives on the world's own
machine: her ticket is signed with a secret that never leaves it and her
model key is set by the installer. That works for an AI that is part of a
world; it does not let an AI that lives elsewhere — the Oracle's Hermes, on
his computer or in the cloud — come in, and it ties the world to one
provider.

Hermes already carries the house's knowledge (its skills, its memory, the
engine's design), can change model in the middle of a task, can rotate
between accounts and can run on a laptop, a server or Hermes Cloud, which
Nous Research hosts and bills by the day. The world only needs to let it in
safely.

## 2. Decision

1. **One door, three parts.**
   - **A key of its own.** An agent holds a key pair; the private half never
     leaves where the agent runs. A world admits it because its public half
     is listed in the world's files (`ADR-079`), with the agent's name (the
     server adds «· IA»), the person who answers for it and its role; or
     because the agent is a member of the world's organisation on
     numinia.com and carries the pass numinia.com signs for people. Removing
     an agent is removing its lines, or its membership.
   - **The world's tools.** The world serves what an agent may do — look at
     the zone, say, go to, place, move, delete, undo — over the Model Context
     Protocol, which Hermes and other agents already speak. Each act passes
     the same permission check as a person's (`ADR-075`); the agent is never
     above the person who answers for it (`STD-050`).
   - **A connection it opens.** The agent connects to the world, as a person
     does; nothing connects to the agent. It works the same from a laptop
     behind a home router, a server or the cloud.
2. **Several worlds, and on demand.** The same agent enters every world
   that lists it, or every world of its organisation. A world may list an
   agent as always present or as called on demand: a person with the right
   presses «call», and a small listener beside the agent, with no model
   and no cost, wakes it.
3. **Two ways to add one, one result.** An agent is added from the world's
   settings on numinia.com or from the settings inside the world; both
   write the world's files (`ADR-079`), so a world downloaded and run on a
   laptop keeps its agents.
4. **Hermes builds in the Oracle's worlds.** The house's builder is Hermes,
   with whatever model fits the task, a free one included. Where it runs
   is open: the Oracle's computer first, a house server or Hermes Cloud
   later, without changing the engine.
5. **The brain inside stays.** An AI inhabitant with its brain on the
   world's machine (Lía) remains, for worlds without an outside agent and
   as the fallback when none is connected: without a model it keeps its
   script. Its model key stays on the machine.

## 3. Alternatives considered

- **A house key in the engine, calls through the till, a meter per world.**
  The Oracle's first ruling of the same day. It ties every world to one
  provider and keeps the house's knowledge out of the world; kept only for
  an inside brain whose owner has no agent of their own.
- **The world signs tickets for outside agents with its own secret.** It
  would mean handing the secret out; rejected: a public key in the world's
  files carries no secret.
- **The world calls the agent (a webhook).** It needs a port open where the
  agent runs, which a laptop at home does not have; rejected.

## 4. Consequences

- The engine builds the door: agent keys listed in the world's files, its
  tools served over MCP, the listener for agents called on demand.
- What an AI costs in a world is measured where the AI runs: for Hermes, its
  sessions, tagged by world, counted with the rest of the house's AI use.
- The terms of Anthropic's consumer plans (in force from 2025-10-08) forbid
  reaching the service «through automated or non-human means, whether
  through a bot, script, or otherwise» except with an API key or explicit
  permission. In Ursa's reading, an AI that answers a world's visitors on
  its own, at any hour, runs on an API key or on Nous Portal, not on a
  consumer plan.
- What people say near an outside agent reaches that agent's model
  provider; each provider's terms and retention are checked before it
  serves a public world.
- A free or cheap model is trusted to build only after it has been measured
  building through the door.

## 5. Status

Decided by the Oracle on 2026-10-16. Nothing of the door is built yet:
the engine has the inside brain (Lía) and the agent's verbs. Recorded here
on 2026-10-16, pending the Oracle's acceptance on the pull request.
