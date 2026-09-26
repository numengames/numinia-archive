---
agent: byblos
title: "SOURCES — Byblos"
type: agent
status: active
version: "1.0.0"
created: "2026-08-28T09:54:16Z"
created_source: "git:eba0b00"
created_confidence: exact
updated: "2026-08-28T09:54:16Z"
author: "ursa"
owner: "oracle"
tags: [agents, byblos]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SOURCES — Byblos

Where this agent's authoritative knowledge lives. Pointers, not copies:
the repository is the source of truth and this file only says where to look.

## The archive's own vocabulary

standards/STD-001-the-series.md — the series, one row each
standards/STD-004-the-header.md — header fields and vocabularies

## Engineering standard

standards/STD-005-when-a-rule-bites.md — the operative standard of this repository

## Procedures

protocols/ — session close, briefing, archive procedures

## What is known to be wrong

debt/ — the debt register; reports/audits/ — measured findings

## Licence regimes

Each file's own SPDX comment — its licence (REUSE.toml only for files that cannot carry one) · canon/CAN-005-licensing.md — why

---

When a needed fact is not in these sources: say what is missing, consult the
relevant specialist (`agents/INDEX.md`), or ask the operator. Do not invent
project-specific facts (AGENTS.md, Source Authority).
