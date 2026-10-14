---
id: "PRO-039"
uid: ""
title: "Opening the brain to the worlds"
type: procedure
status: draft
version: "0.2.0"
created: "2026-10-14T13:08:11+02:00"
updated: "2026-10-14T19:48:28+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [procedures, agents, worlds, bridge, security, ai]
license: "CC0-1.0"
applies_to: [oracles]
related: ["PRO-037", "PRO-038", "PRO-040", "STD-022", "PRO-036", "SYS-013"]
derived_from: "PRI-010"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-039 — Opening the brain to the worlds

> **Summary:** How a world's machine gets the bridge between its agents and
> the brain: one installer, run once on each machine that hosts worlds,
> which keeps the key, the limits and the door inside that machine.
> **Epistemic:** Who may ask the brain a question, and what stands between a
> visitor and the model's key?
> **Pragmatic:** Copy the installer, run it, paste the key, read its six
> stages; open an HTTPS door only for a Hermes on another machine.
> **Audience:** Oracles

**Binds:** the Oracle who holds the brain's key (STD-022).

---

## 1. Purpose and trigger

```
world's machine
 ├─ worlds (Hyperfy, in Docker) ── /talk ──▶ bridge (holds the key) ──▶ Claude, or a Hermes (PRO-038)
 └─ bridge, answering only this machine's containers
```

A world must never hold a key, because every visitor downloads its agent
component (PRO-037). The **bridge** holds it. It answers only the machine's
own worlds, limits each visitor (10 messages a minute), the whole bridge (120
a minute) and the day (2,000), adds the chosen agent's published identity,
reads the agent's links, and tries the next brain when one fails. It keeps
nothing between questions. Living beside the worlds, it needs no domain, no
certificate and no other machine.

The trigger is a machine that hosts worlds getting its first agent, a key
replaced, or a brain added.

---

## 2. Preconditions

1. The Claude key from PRO-038 step 2, in the password manager.
2. SSH access to the world's machine with `sudo`.
3. The installer, `instalar-puente.sh`: one file with the bridge inside,
   held by Ursa until it is published in the hyperfy-components repository
   (SYS-013).

---

## 3. Procedure

1. **Copy and run it:**

   ```bash
   scp instalar-puente.sh ubuntu@<the machine>:
   ssh ubuntu@<the machine>
   sudo bash instalar-puente.sh
   ```

2. **Answer its two questions.** The key does not show while typed; the
   installer checks it with Anthropic before saving it. Enter accepts the
   fast, cheap model. A Hermes address and key are asked for only if one
   exists (PRO-038 B).
3. **Read the six stages** (§4). It installs Node if missing, makes a system
   user `puente` with no shell, writes the settings to
   `/etc/puente/puente.env` (readable by `root` and `puente` only), runs the
   bridge as a locked-down service, and proves it from inside each world.
4. **Leave the agents' *Puente* field empty** (PRO-037 step 7): from inside
   Docker they find the bridge at the machine's gateway address.
5. **Changing a key later:** `sudo bash instalar-puente.sh --claves`.
6. **A Hermes on another machine** (PRO-038 B) needs a door of its own: on
   that machine, a DNS `A` record with **DNS only** (grey cloud — Spanish
   ISPs block Cloudflare's ranges during football), Caddy in front passing
   only `/v1/` and `/api/sessions/` to Hermes (the bridge deletes each answer's
   session there), and `ufw` opening 22, 80 and 443. Its address
   (`https://<its name>/v1`) is the one asked in step 2.

---

## 4. Verification

| Stage | Must show |
|---|---|
| 1/6 | `✓ Node … ya está` or `✓ Node … instalado` |
| 3/6 | `✓ Clave aceptada por Anthropic` and `✓ Guardado en /etc/puente/puente.env (permisos 640, root:puente)` |
| 4/6 | with Docker, `✓ ufw: el puerto 8787 solo se abre a los contenedores Docker de esta máquina` |
| 5/6 | `✓ Contesta: …` and `✓ Procyon responde: {"reply":"…"}` |
| 6/6 | `✓ <each world> lo alcanza en http://172.x.0.1:8787` |
| after | *Probar conexión* on an agent in that world shows **✓ Conectado** (PRO-037 step 8) |

---

## 5. Escalation

| What you see | Do |
|---|---|
| `ufw no está activo` | the bridge still refuses every caller but this machine (403); enable `ufw` to also close the port |
| stage 5/6 in yellow | the key or its credit: check the console, then `sudo systemctl restart puente` |
| a world `NO lo alcanza` | write the address the installer printed into that agent's *Puente* field |
| *Ahora mismo no consigo pensar* | `sudo journalctl -u puente -n 30`; then stage 5/6 again |
| the key or `puente.env` was exposed | PRO-036: revoke the key first, then `--claves` with a new one, then write about it |

Anything else: stop, keep the output, hand it to Ursa.
