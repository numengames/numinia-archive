---
agent: senet
title: "SOURCES — Senet"
type: agent
status: active
version: "1.0.0"
created: "2026-08-28T09:54:16Z"
created_source: "git:eba0b00"
created_confidence: exact
updated: "2026-08-28T09:54:16Z"
author: "ursa"
owner: "oracle"
tags: [agents, senet]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SOURCES — Senet

Where this agent's authoritative knowledge lives. Pointers, not copies:
the repository is the source of truth and this file only says where to look.

## The game itself

lore/game/manual-v0.6.0.md — the RPG manual, CC0 (home in this repository since 2026-09-17; before that, `numinia-lore`); authoritative for mechanics, chronology, factions, geography. lore/adventures/ — the modules; lore/world/ — identity texts

## Session Zero

lore/adventures/session-zero.md — the four introductory escape rooms

## World identity

canon/CAN-001…CAN-004 — world identity, CC0

## Guild context

canon/CAN-004 — the guild hierarchy; agents/*/AGENT.yaml `guild:` — who belongs where

---

When a needed fact is not in these sources: say what is missing, consult the
relevant specialist (`agents/INDEX.md`), or ask the operator. Do not invent
project-specific facts (AGENTS.md, Source Authority).
