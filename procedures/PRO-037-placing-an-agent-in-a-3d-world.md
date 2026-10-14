---
id: "PRO-037"
uid: ""
title: "Placing an agent in a 3D world"
type: procedure
status: draft
version: "0.1.0"
created: "2026-10-14T13:08:11+02:00"
updated: "2026-10-14T13:08:11+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [procedures, agents, worlds, hyperfy, avatars, ai]
license: "CC0-1.0"
applies_to: [oracles, all-agents]
related: ["PRO-038", "PRO-039", "STD-003", "STD-022", "SYS-013"]
derived_from: "PRI-001"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-037 — Placing an agent in a 3D world

> **Summary:** How one of the house's agents gets a body in a Hyperfy world:
> drop the agent component in, choose who it is and what it knows, and prove
> it answers.
> **Epistemic:** What must be true for an agent standing in a world to talk
> with the people around it, and what may it never carry?
> **Pragmatic:** Drop the component, fill its panel, press *Probar conexión*,
> talk to it, record it.
> **Audience:** Oracles · Agents

**Binds:** whoever places an agent in a world of ours — an Oracle, or an
agent acting for one.

---

## 1. Purpose and trigger

A world, an organisation or an event wants a guide inside it: an avatar that
walks, greets and answers questions about the place with the identity of one
of our agents. The trigger is the request to put an agent in a named world.

The agent is one **component** (a `.hyp` file, Hyperfy's app format): a VRM
body plus a script, and nothing secret. It does not think by itself; it asks
the **brain**, a service on its own machine that holds the model keys
(PRO-038 raises it, PRO-039 opens it to the worlds). Only the half of the
script that runs on the world's server calls the brain; the half in each
visitor's browser draws the avatar, the bubble and the prompt. That is why
the brain can accept the world's address and refuse everyone else.

Version 0.1 talks by text only and acts on nothing; each later ability
comes with its own permission (STD-003). It remembers each visitor's last
ten messages while the world runs, and nothing after.

---

## 2. Preconditions

1. **The brain answers:** `https://<the brain's name>/health` shows
   `"ok":true` (PRO-039).
2. **The world's server IPv4** is in the brain's allowed list (PRO-039 step 2).
3. **The component file**, *Agente-IA.hyp*. Its source is held by Ursa until
   it is published in the hyperfy-components repository (SYS-013).
4. **Builder rights** in the world (you can drag files into it).
5. **What it must know there:** the public web address of the world or event,
   and a few lines of notes. Nothing personal.

> **The component carries no secret, ever.** Every visitor downloads its
> script and every value of its panel (STD-022).

---

## 3. Procedure

1. **Enter the world** with builder rights.
2. **Drag *Agente-IA.hyp*** into the world window. The avatar appears with
   the name tag *Procyon · IA*.
3. **Open its panel:** select it. The panel is in Spanish; labels are quoted
   as shown.
4. **Personalidad → Agente:** pick the agent. Its identity is read from its
   published files in the archive (`agents/<name>/SOUL.md` and
   `OPERATOR.md`), so the choice alone changes how it speaks.
5. **Personalidad → Nombre visible** and **Avatar (VRM)**, both optional:
   empty keeps the agent's name and the body inside the file.
6. **Lo que sabe → Web del mundo:** the public address. The brain reads its
   `llms.txt` if there is one, else the page, and keeps it 30 minutes.
7. **Lo que sabe → Notas:** what it must know and cannot read on the web
   (what the place is, times, rules, whom to ask), up to 4,000 characters.
8. **Comportamiento:** *Escucha a (m)* (default 6 — it answers people within
   it, or anyone who writes its name), *Saluda al acercarse*, *Se acerca a
   quien le habla*, *Pasea*, *Zona de paseo (m)*.
9. **Conexión → Puente:** `https://<the brain's name>/talk`.
10. **Press *Probar conexión*.** Administrators see, above its head,
    **✓ Conectado. Cerebros: …** in green, or a red line naming what is missing.
11. **Talk to it:** walk close (it greets you and says it is an artificial
    intelligence), press Enter, ask about the place. It turns, walks closer,
    shows dots while thinking, and answers in the bubble and the chat.
12. **Record it** in the world's entity card in `objects/` (ADR-069): which
    agent stands there and which brain it uses.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 2 | The avatar stands with its name tag; no grey crash block |
| 4 | Changing *Agente* changes the name tag |
| 10 | The green **✓ Conectado** line, naming the model |
| 11 | An answer in the language you wrote in, using a fact from the notes or the website |
| 11 | Someone beyond *Escucha a* writes without its name and gets no answer |
| 12 | The world's card names the agent |

---

## 5. Escalation

| What you see | Do |
|---|---|
| Red *No llego al puente* | the address must start with `https://` and end with `/talk`; open `/health` in a browser; if it fails, PRO-039 §5 |
| Red *El puente responde, pero no tiene ningún cerebro* | PRO-039 step 1 |
| *Ahora mismo no consigo pensar* | the world's IPv4 must be allowed (PRO-039 step 2), then PRO-039 §5 |
| *Dame un momento, hay mucha gente hablándome* | nothing: the limits worked (5 at once, 10 messages a minute per person) |
| It invents facts | add them to *Notas*; it is told to say it does not know |

Anything else: stop, screenshot the panel, and hand it to the brain's Oracle.
