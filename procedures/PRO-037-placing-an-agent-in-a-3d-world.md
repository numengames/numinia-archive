---
id: "PRO-037"
uid: ""
title: "Placing an agent in a 3D world"
type: procedure
status: draft
version: "0.2.0"
created: "2026-10-14T13:08:11+02:00"
updated: "2026-10-14T19:48:28+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [procedures, agents, worlds, hyperfy, avatars, ai]
license: "CC0-1.0"
applies_to: [oracles, all-agents]
related: ["PRO-038", "PRO-039", "PRO-040", "STD-003", "STD-022", "SYS-013"]
derived_from: "PRI-001"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-037 — Placing an agent in a 3D world

> **Summary:** How one of the house's agents gets a body in a Hyperfy world
> today: drop the agent component in, fill its panel, and prove it answers
> when called.
> **Epistemic:** What must be true for an agent standing in a world to talk
> with the people around it, and what may it never carry?
> **Pragmatic:** Drop the component, fill its panel, press *Probar conexión*,
> call it with `/p`, record it.
> **Audience:** Oracles · Agents

**Binds:** whoever places an agent in a world of ours — an Oracle, or an
agent acting for one.

---

## 1. Purpose and trigger

A world, an organisation or an event wants a guide inside it: an avatar that
greets, answers questions about the place and goes along with people, with
the identity of one of our agents. The trigger is the request to put an
agent in a named world.

The agent is one **component** (a `.hyp` file, Hyperfy's app format): a VRM
body plus a script, and nothing secret. It does not think by itself; it asks
the **bridge**, a small program on the world's own machine that holds the
model key (PRO-039) and calls the brain (PRO-038). Only the half of the
script that runs on the world's server calls the bridge; the half in each
visitor's browser draws the avatar and the bubble.

This is the way **until the platform does it**: PRO-040 moves the whole panel
to numinia.com, out of the world.

---

## 2. Preconditions

1. **The bridge runs on the world's machine** (PRO-039 verified), from the
   same release as the component: an older bridge ignores the links of
   step 4.
2. **The component file**, *Agente-IA.hyp*. Its source is held by Ursa until
   it is published in the hyperfy-components repository (SYS-013).
3. **Builder rights** in the world (you can drag files into it).
4. **What it must know there:** up to five public addresses and a few lines
   of notes. Nothing personal.

> **The component carries no secret, ever.** Every visitor downloads its
> script and every value of its panel (STD-022).

---

## 3. Procedure

1. **Enter the world** with builder rights and **drag *Agente-IA.hyp*** in.
   The avatar appears with the name tag *Procyon · IA*.
2. **Open its panel** (labels are quoted as shown, in Spanish).
3. **Personalidad:** *Agente* picks the identity, read from its published
   files (`agents/<name>/SOUL.md` and `OPERATOR.md`); *Nombre visible* and
   *Avatar (VRM)* are optional.
4. **Lo que sabe → Enlace 1, Enlace 2…:** public pages it reads (a site's
   front page: its `llms.txt` first). Filling the last one opens another, up
   to five; an emptied one is forgotten at the next question.
5. **Lo que sabe → Notas:** what it cannot read on the web (times, rules,
   whom to ask), up to 4,000 characters.
6. **Comportamiento:** *Saluda a (m)* (default 6), *Saluda al acercarse*,
   *Aparece delante de quien le llama*, *Pasea*, *Zona de paseo (m)*.
7. **Conexión:** *Cerebro* — *Automático* unless one is wanted; *Puente*
   **empty**: it finds the bridge on its own machine.
8. **Press *Probar conexión*.** Administrators see **✓ Conectado. Cerebros: …**
   in green, or a red line naming what is missing.
9. **Call it:** write `/p` and a question in the chat (the question does not
   show; the agent repeats it, then answers), or its name in a sentence. It
   appears in front of you, facing you. It ignores any other chat line.
10. **Short orders, decided by its script, not by the model:** *sígueme*
    (it appears behind you whenever you move away) and *quieto*. An
    administrator's question goes ahead of visitors waiting; a visitor
    cannot take it away from an administrator it follows.
11. **Record it** in the world's entity card in `objects/` (ADR-069): which
    agent stands there and which brain it uses.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1 | The avatar stands with its name tag; no grey crash block |
| 8 | The green **✓ Conectado** line, naming the model |
| 9 | `/p` with a question about a fact from a link or the notes: the question appears once in the chat, then an answer in the language you wrote in |
| 9 | A chat line without `/p` or its name gets no answer |
| 10 | *sígueme*, then walk ten metres: it appears behind you |
| 11 | The world's card names the agent |

---

## 5. Escalation

| What you see | Do |
|---|---|
| Red *No encuentro el puente en esta máquina* | install it (PRO-039) |
| Red *No llego al puente* | empty the *Puente* field, or write the address PRO-039 printed |
| Red *El puente no tiene Claude* | the bridge has another brain; it answers with that one — or PRO-039 `--claves` |
| *Ahora mismo no consigo pensar* | PRO-039 §5 |
| *Dame un momento, hay mucha gente hablándome* | nothing: the limits worked |
| It invents facts | add them to a link or the notes; it is told to say it does not know |

Anything else: stop, screenshot the panel, and hand it to the world's Oracle.
