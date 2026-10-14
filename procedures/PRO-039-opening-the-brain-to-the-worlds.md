---
id: "PRO-039"
uid: ""
title: "Opening the brain to the worlds"
type: procedure
status: draft
version: "0.1.0"
created: "2026-10-14T13:08:11+02:00"
updated: "2026-10-14T13:08:11+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [procedures, agents, worlds, bridge, security, ai]
license: "CC0-1.0"
applies_to: [oracles]
related: ["PRO-037", "PRO-038", "STD-022", "PRO-036", "SYS-013"]
derived_from: "PRI-010"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-039 — Opening the brain to the worlds

> **Summary:** How the brain raised in PRO-038 gets one door the worlds can
> use: a bridge that holds the key and the limits, behind HTTPS, answering
> only our worlds' addresses.
> **Epistemic:** Who may ask the brain a question, and what stands between a
> visitor and the model's key?
> **Pragmatic:** Install the bridge, list the worlds, name the machine, put
> Caddy and a firewall in front, prove it from outside.
> **Audience:** Oracles

**Binds:** the Oracle who holds the brain's key (STD-022).

---

## 1. Purpose and trigger

```
world's server ── HTTPS /talk ──▶ Caddy ──▶ bridge ──▶ Hermes (loopback) ──▶ models
                                  └────────── the brain's machine ──────────┘
```

A world must never hold a key, because every visitor downloads its agent
component (PRO-037). The **bridge** holds it. It accepts only the listed
worlds' addresses, limits each visitor (10 messages a minute) and the whole
brain (120), adds the chosen agent's published identity, reads the world's
website, and can fall back to a second model. It keeps nothing between
questions. It is a small Node program with its own tests; its source is held
by Ursa until it is published in the hyperfy-components repository (SYS-013).

The trigger is PRO-038 passing its verification, or a new world joining.

---

## 2. Preconditions

1. PRO-038 verified on this machine.
2. The **public IPv4 of every world's server** that will use the brain.
3. DNS access for the name the brain will have (e.g. `brain.` under one of
   our domains, on Cloudflare).
4. The bridge's five files from Ursa: the logic file, the serving file, the
   example settings, the service unit, the Caddy configuration.

---

## 3. Procedure

1. **Install the bridge.** Node 22 from NodeSource; the five files in
   `~/puente`; the example settings renamed `puente.env`, permissions `600`.
   Its brain lines point at Hermes on the same machine:
   `BRAIN_1_URL=http://127.0.0.1:8642/v1`, `BRAIN_1_MODEL=hermes-agent`,
   `BRAIN_1_KEY=<the key from PRO-038>`. A `BRAIN_2_*` set is optional and
   answers when the first fails.
2. **List the worlds:** `ALLOWED_IPS=` their IPv4 addresses, comma-separated.
   Keep `TRUST_PROXY=1`, so the bridge reads the caller's address Caddy
   passes on. A new world later means adding its address here.
3. **Run it for good:** copy the unit to `/etc/systemd/system/puente.service`,
   then `sudo systemctl daemon-reload && sudo systemctl enable --now puente`.
4. **Name the machine:** a DNS `A` record pointing at it, **DNS only** (grey
   cloud). No `AAAA` record: a world calling over IPv6 would arrive from an
   unlisted address. DNS only also keeps the door off the Cloudflare ranges
   Spanish ISPs block during football matches.
5. **Put the lock on:** install Caddy from its official repository, put the
   Caddy configuration (the brain's name; only `/talk` and `/health` pass,
   anything else 404) in `/etc/caddy/Caddyfile`, `sudo systemctl reload caddy`.
   Caddy obtains the certificate itself.
6. **Close the rest:** `sudo ufw allow OpenSSH`, `sudo ufw allow 80,443/tcp`,
   `sudo ufw --force enable`. Hermes and the bridge listen on loopback only.
7. **Hand the address over:** `https://<the brain's name>/talk` goes in the
   *Puente* field of every agent (PRO-037 step 9).

---

## 4. Verification

| Step | Check | Must show |
|---|---|---|
| 3 | on the machine: `curl -s http://127.0.0.1:8787/health` | `"ok":true` and the model |
| 3 | on the machine: `ls -l ~/puente/puente.env` | `-rw-------` |
| 5 | any browser: `https://<the brain's name>/health` | the same, with a valid certificate |
| 5 | any browser: `https://<the brain's name>/` | 404 |
| 6 | `sudo ufw status` | only 22, 80, 443 |
| 7 | *Probar conexión* on an agent in a listed world (PRO-037 step 10) | **✓ Conectado** in green |
| 7 | a question from that world | an answer, not *Ahora mismo no consigo pensar* |

---

## 5. Escalation

| What you see | Do |
|---|---|
| bridge `/health` silent | `sudo journalctl -u puente -n 30` |
| no certificate | wait five minutes for DNS; make sure the record is DNS only |
| *Ahora mismo no consigo pensar* | the world's IPv4 must be in `ALLOWED_IPS`; then `sudo systemctl restart puente` and `hermes gateway restart` |
| a setting changes | edit `~/puente/puente.env`, `sudo systemctl restart puente` |
| the key or `puente.env` was exposed | PRO-036: make the key useless first (new key in PRO-038 steps 5–6 and step 1 here, restart both), then write about it |

Anything else: stop, keep the output, hand it to Ursa.
