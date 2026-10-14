---
id: "PRO-038"
uid: ""
title: "Choosing the brain that agents in worlds think with"
type: procedure
status: draft
version: "0.2.0"
created: "2026-10-14T13:08:11+02:00"
updated: "2026-10-14T19:48:28+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [procedures, agents, worlds, hermes, claude, security, ai]
license: "CC0-1.0"
applies_to: [oracles]
related: ["PRO-037", "PRO-039", "PRO-040", "STD-022", "PRO-036"]
derived_from: "PRI-010"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-038 — Choosing the brain that agents in worlds think with

> **Summary:** The model an agent in a world thinks with: a Claude key by
> default — nothing to run — or, optionally, a Hermes of our own on its own
> machine, with every tool taken away from its API.
> **Epistemic:** Which brain gives a world's agent good answers at the
> lowest risk, and what must a Hermes never carry into a stranger's chat?
> **Pragmatic:** Make a Claude key with a spending limit; only if Hermes is
> wanted, raise it with an empty memory and no API tools.
> **Audience:** Oracles

**Binds:** the Oracle who holds the brain's key. An agent may prepare files
and read results, never hold the key (STD-022).

---

## 1. Purpose and trigger

An agent placed in a world (PRO-037) asks the bridge (PRO-039) for every
answer, and the bridge asks a brain. The bridge can hold up to three brains
and tries them in order, so one failing does not silence the agent. The
trigger is the first agent placed in a world, a key replaced, or a brain
added.

| Brain | When | Why |
|---|---|---|
| **Claude, by its API** (the default) | always, as the first brain | nothing to install or keep running; the key and its monthly limit live in Anthropic's console |
| **Hermes on its own machine** | only when the house wants its own agent loop behind the answers | more control, more to look after: a machine, its updates, its door (PRO-039 §3, last step) |

A Hermes Cloud instance is not used: it shows its dashboard behind the Nous
Portal sign-in, and its API being reachable from outside is not confirmed.

---

## 2. Preconditions

1. An Anthropic console account (the API is paid by use, apart from any
   Claude subscription).
2. A password manager to keep each new key.
3. For Hermes only: a small VPS of its own (OVH VPS-1 is enough), an SSH key
   pair, and a Nous Portal account.

---

## 3. Procedure

**A. Claude (always)**

1. In the Anthropic console, set a **monthly spending limit** (e.g. 20 $) —
   the hard ceiling.
2. **API Keys → Create Key**, named `puente-mundo`; copy it into the password
   manager. It starts with `sk-ant-`. It never goes into a chat, a
   repository or a world: only into the bridge's installer (PRO-039).

**B. Hermes (optional)**

3. **Rent the VPS** (Ubuntu 24.04) with the Oracle's SSH key, and **close
   password logins before installing anything** — OVH's image re-enables
   them, and the first file SSH reads wins:

   ```bash
   printf 'PasswordAuthentication no\nKbdInteractiveAuthentication no\nPermitRootLogin prohibit-password\n' | sudo tee /etc/ssh/sshd_config.d/00-solo-llaves.conf
   sudo sshd -t && sudo systemctl reload ssh
   ```

4. **Install Hermes** (`curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`),
   log out and in, then `hermes portal`: approve the code, pick a fast,
   cheap model, decline the Tool Gateway.
5. **Keep its memory empty.** Hermes adds its two memory files (what it
   remembers, and who its user is) to every API prompt, tools or not: this
   install is the brain only, never anyone's assistant.
6. **Make the key:** `openssl rand -hex 32`. Hermes leaves its API **off,
   silently,** with a key under 16 characters.
7. **Open the API on loopback** — append to `~/.hermes/.env`:
   `API_SERVER_ENABLED=true`, `API_SERVER_HOST=127.0.0.1`,
   `API_SERVER_PORT=8642`, `API_SERVER_KEY=<the key>`.
8. **Take the tools away from the API only** — in `~/.hermes/config.yaml`:

   ```yaml
   platform_toolsets:
     api_server: []
   gateway:
     api_server:
       max_concurrent_runs: 5
   ```

   Not `agent.disabled_toolsets`: it switches tools off for every platform
   of that Hermes, not only the API.
9. **Run it for good:** `hermes gateway install`,
   `sudo loginctl enable-linger ubuntu`, `hermes gateway restart`.

Each Hermes answer is a stored session. The bridge sends a fresh marker per
visitor and deletes the session after each turn, so two visitors never
share one and nothing piles up.

---

## 4. Verification

| Step | Check | Must show |
|---|---|---|
| 1 | the console's limits page | the monthly limit set |
| 2 | PRO-039's installer, stage 3/6 | `✓ Clave aceptada por Anthropic` |
| 3 | `sudo sshd -T \| grep -i -E '^(passwordauthentication\|kbdinteractiveauthentication)'` | both `no` |
| 9 | `curl -s http://127.0.0.1:8642/health` | `{"status": "ok"}` |
| 9 | a chat completion with the key, `"model":"hermes-agent"` | a greeting |
| 9 | `GET /v1/toolsets` with the key | no tools in any toolset |
| 9 | a chat completion asking it to run `ls /` | a refusal, never `bin`, `etc`, `home`… |

---

## 5. Escalation

| What you see | Do |
|---|---|
| the installer rejects the Claude key | copy it again from the console; check the account has credit |
| answers stop mid-month | the spending limit was reached: raise it or wait |
| Hermes `/health` silent | the key is under 16 characters, or `API_SERVER_ENABLED` is missing |
| `401` from Hermes | the key in the request is not the one in `.env` |
| a tool listed, or it lists folders | stop; send the output to Ursa |
| a key was exposed | PRO-036: make it useless first (revoke it in the console, or a new Hermes key), then write about it |

Anything else: stop, keep the output, hand it to Ursa.
