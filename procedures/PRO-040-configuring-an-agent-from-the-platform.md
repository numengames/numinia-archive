---
id: "PRO-040"
uid: ""
title: "Configuring an agent from the platform"
type: procedure
status: draft
version: "0.2.1"
created: "2026-10-14T19:48:28+02:00"
updated: "2026-10-20T00:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [procedures, agents, worlds, platform, communities, ai]
license: "CC0-1.0"
applies_to: [oracles, all-agents]
related: ["PRO-037", "PRO-038", "PRO-039", "STD-050", "ADR-070", "STD-022"]
derived_from: "PRI-012"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-040 — Configuring an agent from the platform

> **Summary:** How a community adds an AI on numinia.com, configures
> everything about it there, and chooses which of its worlds it appears in —
> without entering any world.
> **Epistemic:** Where should an agent's identity, knowledge and permissions
> live so that one change reaches every world, and nothing private is
> downloaded by visitors?
> **Pragmatic:** Panel of the community → *Agentes* → *Añadir una IA*; fill
> its page; switch on its worlds; save.
> **Audience:** Oracles · Agents

**Binds:** whoever manages a community's agents, and the platform pieces
that carry the configuration to the worlds.

---

## 1. Purpose and trigger

Configuring an agent inside each world (PRO-037) repeats every change world
by world, and visitors download every value of its panel. Here it is
configured once, on the community's panel at numinia.com, and the platform
carries it to the worlds. The trigger is a community that wants an AI in its
worlds, or a change to one.

**Today:** the community panel and its *Agentes* piece are published on
numinia.com (since 2026-10-16). Where a world's community has not yet
configured an agent there, PRO-037 remains the way.

| Piece | Where it lives | Why |
|---|---|---|
| The agent: identity, links, documents, behaviour | the community's files (its memory), like `agents/<name>/` here | it is the community's, downloadable with the rest (PRI-012) |
| In each world | a component carrying only the agent's id | nothing to read in it but which agent it is |
| Placing and removing it | the platform, with the fleet's key to each world | the agent never holds a world's administration code |
| The model key | the bridge on the world's machine (PRO-039) | never in a world, never on the panel |

---

## 2. Preconditions

1. A member of the community whose role grants **managing agents**. By
   default only the role with administration has it (the team roles of
   ADR-070).
2. At least one world of the community on the fleet.
3. The bridge installed on that world's machine (PRO-039).
4. The community's balance covers the questions (each one costs what the
   brain charges).

---

## 3. Procedure

1. **Open the community's panel → *Agentes* → *Añadir una IA*.**
2. **Pick where it starts from:** a house agent (*Procyon*, *Senet*,
   *Calliope*, *Nimrod*, *Doulos*) or *En blanco*; the community's layer goes
   on top.
3. **Name it, switch on the worlds it appears in, and press *Crearla*.** The
   person who creates it is its responsible person; it can be handed to
   another member.
4. **Fill its page**, one tab at a time:
   - ***Identidad*:** name, how it is and how it speaks, language, avatar
     (from the Bazar or an uploaded `.vrm`). That it says it is an AI is
     fixed and cannot be turned off (EU AI Act, article 50).
   - ***Lo que sabe*:** up to five links and five `.md` documents, kept in
     the community's memory, plus notes. It also reads each world's card,
     the space's own `.md` (STD-050), and what the world contains.
   - ***Cómo se porta*:** `/p` always on; by name; greeting; short answers;
     which gestures it may make; and for each role of the community,
     *Manda*, *Le habla* or *Nada*.
   - ***Dónde aparece*:** a switch per world and the spot (the entrance,
     beside the stage, or chosen inside).
   - ***Consumo*:** today's and the month's questions and cost, and a daily
     limit.
5. **Press *Guardar*.** Every world it is in uses the new configuration from
   its next question.
6. **To take it out of a world**, switch that world off; to stop it
   everywhere, *Pausar*.

**Whatever is configured,** the platform keeps STD-050 — links, documents,
cards and names are material it never obeys; what is removed is forgotten;
roles, not the chat, say who commands — and writes every answer, change and
placement in its *Registro*.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 3 | The agent stands in each switched-on world within a minute, with its name tag and the *IA* mark |
| 4 | `/p` with a question answered only by an uploaded document: the answer uses it |
| 4 | Remove that document, ask again: it says it does not know |
| 4 | A member whose role is *Le habla* gives an order: it answers but does not obey |
| 5 | A change of name reaches every world at the next question |
| 6 | The world switched off no longer shows it |

---

## 5. Escalation

| What you see | Do |
|---|---|
| *Aparecerá al encender la sede* | the world is asleep: it appears when the world is switched on |
| Missing from a running world | hand the *Registro* line to the house |
| *Ahora mismo no consigo pensar* | the bridge or its brain: PRO-039 §5 |
| It answers *vuelvo mañana* | the daily limit was reached: raise it in *Consumo* |

Anything else: stop, screenshot the agent's page, and hand it to the house.
