---
id: "OPS-009"
uid: ""
title: "Secrets handling — what never enters the repository, and where it lives instead"
type: protocol
status: active
version: "2.0.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-09-01T22:05:00+02:00"
author: "nimrod"
owner: "oracle"
territory: "Archive"
tags: [operations, security, credentials]
license: "CC-BY-4.0"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# OPS-009 — Secrets handling

> **Summary:** The rule about secret material in this repository, the
> checklist that applies it, and the inventory of where credentials actually
> live — structure only, never values.
> **Epistemic:** One subject, previously split across two documents that
> each pointed at the other.
> **Pragmatic:** Read before any commit; consult the map when configuring a
> new agent or service.
> **Audience:** Agents

---

## 1. What NEVER goes in this repository

| Category | Examples | Where it goes instead |
|----------|---------|----------------------|
| Credentials | Passwords, API keys, tokens | Server config (SSH only) |
| Server IPs | VPS addresses, internal IPs | Private documentation |
| Personal data | Private emails, phone numbers | Not documented |
| Private conversations | Chat logs, session transcripts | Local workspace |

## 2. Rule

When in doubt about whether something is sensitive: **don't commit it**. Ask first.

This rule comes from SIM-5.4 (simulation 54 of 100): an agent accidentally
committed a credential to a public repo. Impact: security exposure.
Prevention: the doubt = don't commit rule.

## 3. Pre-commit checklist (mental)

Before any commit, verify:
- [ ] No real passwords or tokens
- [ ] No real IPs or server addresses
- [ ] No real personal data of third parties
- [ ] No internal configuration files

---

## 4. Credential map — structure, not values

This section shows WHERE things live, not WHAT they are. **Real values are
never documented here** — an intent this inventory asserted while it was
untrue elsewhere in the corpus; see §5.

### 4.1 Google Workspace

| Service | Account | Where configured |
|---------|---------|-----------------|
| Gmail | khepri@ai.numengames.com | OpenClaw config (server) |
| Calendar | khepri@ai.numengames.com | OpenClaw config (server) |
| Drive | khepri@ai.numengames.com | OpenClaw config (server) |
| Auth method | OAuth2 via gog CLI | /home/node/.config/gogcli/ |

### 4.2 GitHub

| Service | Account | Where configured |
|---------|---------|-----------------|
| Personal access token (PabloFMM) | PabloFMM | GitHub Settings → Tokens |
| Org access (numengames) | PabloFMM | Via existing PAT |

### 4.3 Infrastructure

| Service | Notes |
|---------|-------|
| VPS server | IP not documented here. **This row asserted "documented privately. Not in this repo." from 2026-04-06 to 2026-08-25; the assertion was false — see §5.** |
| OpenClaw config | /home/node/.openclaw/ on server |
| Umami Analytics | Port configured via Caddy reverse proxy |
| Cal.com | Port configured via Caddy reverse proxy |

### 4.4 Services in design phase

| Service | Notes |
|---------|-------|
| Anthropic API key (usage) | Pending — needed for cost tracking |
| Ollama (on-premises) | Pending — when dedicated PC arrives |

---

## 5. Correction record — 2026-08-25 (§2.1.2)

**What this document asserted.** The `VPS server` row read *"IP documented
privately. Not in this repo."* — from `84a9f71` (2026-04-06) to `392ffc6`
(2026-08-25). **141 days.**

**What was true.** The VPS IPv4 address was committed to this repository on
`e56f6e8` (2026-04-07, *"migración completa desde pablofm.com"*) and was present
in **7 tracked files**, reaching **13 built pages** and live on numinia.org at
`/agente/`, `/corpus/agents/ursa/memory/` and `/corpus/agents/nimrod/status/`.
**140 days published**, in a public repository with clonable history.

**How it was detected.** Not by a guard — none covers this. It surfaced from a
regex sweep for secret material across all 282 corpus documents while
classifying this document at the Oracle's request. The sweep was looking for
tokens and keys; the contradiction was incidental. **Nothing in the system was
watching this claim.**

**What was done.** The string was retired from the 6 `.md` files under
`fix/retire-vps-ip-from-corpus` and replaced with an explicit pointer. One
occurrence remains in `web/src/pages/agente.astro` — deliberately: it is not
`.md`, no corpus measurement reaches it, and the orphan-content guard must be
the thing that finds it. Tracked in `D-032`.

**What was NOT done, and why.** History was not rewritten. The address has been
public for 140 days and is discoverable by DNS regardless; `filter-branch` would
not unpublish it and would break every signature in the repository. The Oracle
ruled it an **identifier, not a value** — no credential was exposed and no
rotation is implied. The residual risk is aggregation: the address sat beside
host sizing, internal ports and this very credential inventory. **That control
is a network control, not a documentary one**, and is verified externally by the
Oracle.

**The general defect.** This document made a falsifiable compliance claim that
nothing falsified. It is not unique: `D-033` measures **145 such assertions
across the corpus, 132 of them unverified**.

---
