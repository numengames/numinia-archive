---
agent: procyon
title: "SOURCES — Procyon"
type: agent
status: active
version: "1.0.1"
created: "2026-08-28T09:54:16Z"
created_source: "git:eba0b00"
created_confidence: exact
updated: "2026-09-10T09:00:00+02:00"
author: "ursa"
owner: "oracle"
tags: [agents, procyon]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SOURCES — Procyon

Where this agent's authoritative knowledge lives. Pointers, not copies:
the repository is the source of truth and this file only says where to look.

## The front door

README.md and canon/CAN-001-welcome-to-numinia.md — what a newcomer sees first

## The public site

web/ — numinia.org, the archive as visitors experience it

## Who is who

agents/INDEX.md and `guild:` in each agents/<id>/AGENT.yaml — the roster and its structure (ADR-045)

## The map

system/SYS-003-archive-fondos.md — how the archive is organized for reading

---

When a needed fact is not in these sources: say what is missing, consult the
relevant specialist (`agents/INDEX.md`), or ask the operator. Do not invent
project-specific facts (AGENTS.md, Source Authority).
