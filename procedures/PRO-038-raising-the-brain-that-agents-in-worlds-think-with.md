---
id: "PRO-038"
uid: ""
title: "Raising the brain that agents in worlds think with"
type: procedure
status: draft
version: "0.1.0"
created: "2026-10-14T13:08:11+02:00"
updated: "2026-10-14T13:08:11+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [procedures, agents, worlds, hermes, security, ai]
license: "CC0-1.0"
applies_to: [oracles]
related: ["PRO-037", "PRO-039", "STD-022", "PRO-036"]
derived_from: "PRI-010"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-038 — Raising the brain that agents in worlds think with

> **Summary:** How to raise, once, the machine that thinks for every agent in
> our 3D worlds: a separate VPS with Hermes signed in to the Nous Portal,
> listening only inside the machine, with every tool taken away.
> **Epistemic:** Why a machine of our own rather than a Hermes Cloud
> instance, and what makes Hermes safe to put in front of strangers?
> **Pragmatic:** Rent, lock SSH, install and sign in, open the API on
> loopback, strip the tools, prove each part before PRO-039.
> **Audience:** Oracles

**Binds:** the Oracle who holds the brain's key. An agent may prepare files
and read results, never hold the key (STD-022).

---

## 1. Purpose and trigger

An agent placed in a world (PRO-037) asks the brain for every answer. This
procedure raises the brain's machine and its Hermes; PRO-039 then puts the
bridge and the HTTPS door in front of it. The trigger is the first agent
placed in a world, or the machine being replaced.

| Choice | Why |
|---|---|
| **Its own machine, apart from any world** | if the brain hangs or overloads, the worlds keep running and the agent says it cannot think right now |
| **Not a Hermes Cloud instance** | an instance from the Nous Portal exposes only its dashboard, behind the portal sign-in; its API is not reachable from outside (read from Hermes' source, October 2026). The same Hermes on our machine, signed in to the same Portal account, gives the same models with a door we control |
| **No tools** | Hermes can run commands and read files; a visitor could try to talk it into doing so |

---

## 2. Preconditions

1. An account at the hosting provider (the house uses OVH) and an SSH key
   pair on the Oracle's computer.
2. A Nous Portal account with an active subscription.
3. A password manager to keep one new key.

---

## 3. Procedure

1. **Rent a small VPS** (OVH VPS-1 is enough): Ubuntu 24.04, in the worlds'
   country, with the Oracle's SSH public key added at order time.
2. **Close password logins before installing anything.** OVH's image ships
   `50-cloud-init.conf`, which turns them back on. SSH keeps the first value
   it reads, in alphabetical order, so a `00-` file wins:

   ```bash
   printf 'PasswordAuthentication no\nKbdInteractiveAuthentication no\nPermitRootLogin prohibit-password\n' | sudo tee /etc/ssh/sshd_config.d/00-solo-llaves.conf
   sudo sshd -t && sudo systemctl reload ssh
   ```

   Keep this session open until a second key login works.
3. **Install Hermes:** `curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`,
   then log out and in.
4. **Sign in to the Portal:** `hermes portal`. It prints an address and a
   code: approve it on any device, pick a fast, cheap model, and decline the
   Tool Gateway.
5. **Make the key:** `openssl rand -hex 32`, stored in the password manager.
   It never goes into a chat, a repository or a world.
6. **Open the API on loopback only** — append to `~/.hermes/.env`:
   `API_SERVER_ENABLED=true`, `API_SERVER_HOST=127.0.0.1`,
   `API_SERVER_PORT=8642`, `API_SERVER_KEY=<the key>`, one per line.
7. **Take away every tool** — append to `~/.hermes/config.yaml`, merging into
   any of the three keys that already exist:

   ```yaml
   platform_toolsets:
     api_server: []
   agent:
     disabled_toolsets: [terminal, file, code_execution, browser, computer_use, memory, session_search, cronjob, delegation, web, search, skills, image_gen, video_gen, tts, kanban]
   gateway:
     api_server:
       max_concurrent_runs: 5
   ```

8. **Run it for good:** `hermes gateway install`, then
   `sudo loginctl enable-linger ubuntu` (or Hermes stops when SSH closes),
   then `hermes gateway restart`.

---

## 4. Verification

Run on the machine. A tool listed, or a real folder list, is a stop: do not
start PRO-039 until it is fixed.

| Step | Check | Must show |
|---|---|---|
| 2 | `sudo sshd -T \| grep -i -E '^(passwordauthentication\|kbdinteractiveauthentication)'` | both `no` |
| 4 | `hermes portal info` | logged in, Nous as provider |
| 8 | `curl -s http://127.0.0.1:8642/health` | `{"status": "ok"}` |
| 8 | `POST /v1/chat/completions` with the key, `"model":"hermes-agent"`, asking for a one-line hello | a greeting |
| 8 | `GET /v1/toolsets` with the key | an empty list, or toolsets with no tools in them |
| 8 | a chat completion asking it to run `ls /` | a refusal, never `bin`, `etc`, `home`… |

---

## 5. Escalation

| What you see | Do |
|---|---|
| `hermes: command not found` | log out and in |
| not logged in after `hermes portal` | run it again and approve the code |
| `401` from the API | the key in the request is not the one in `.env` |
| a tool in `/v1/toolsets`, or it lists folders | stop; send the output to Ursa |
| the key was exposed | PRO-036: make it useless first (new key in steps 5 and 6, and in PRO-039 step 1), then write about it |

Anything else: stop, keep the output, hand it to Ursa.
