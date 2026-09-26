---
agent: ursa
title: "SOURCES — Ursa"
type: agent
status: active
version: "1.1.0"
created: "2026-08-28T09:54:16Z"
created_source: "git:eba0b00"
created_confidence: exact
updated: "2026-09-10T08:00:00+02:00"
author: "ursa"
owner: "oracle"
tags: [agents, ursa]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SOURCES — Ursa

Where this agent's authoritative knowledge lives. Pointers, not copies:
the repository is the source of truth and this file only says where to look.

## Engineering standard

standards/STD-005-when-a-rule-bites.md — this repository's own operative standard
protocols/PRO-016-applying-the-engineering-standard.md — how a task applies it

## Platform adapter

CLAUDE.md — Claude Code runtime context; AGENTS.md — the multi-platform context

## The code

web/ (Astro viewer), machine/scripts/ (guards), .github/ (CI, rulesets)

## Decisions

decisions/ — ADRs that constrain technical choices; debt/ — known defects

---

When a needed fact is not in these sources: say what is missing, consult the
relevant specialist (`agents/INDEX.md`), or ask the operator. Do not invent
project-specific facts (AGENTS.md, Source Authority).

## Skills

../skills/numinia-nwos-pr/SKILL.md — how a pull request is opened in this repository: one at a time, guards before push, telemetry last, fixed reviewers; canon is discussed before any branch
