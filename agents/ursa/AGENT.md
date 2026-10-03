---
id: "ursa"
title: "Ursa"
type: entity
status: draft
version: "1.1.3"
created: "2026-08-28T09:54:16Z"
created_source: "git:eba0b00"
created_confidence: exact
updated: "2026-10-03T20:30:00+02:00"
license: "CC0-1.0"
author: "ursa"
owner: "oracle"
digital_source_type: ai-assisted
tags: [agents, ursa]
guild: "Alchemists"
section: "People and culture"
registration: exempt
registration_reason: "agent parts are identified by their folder and filename, not by a series number (ADR-005)"
entity: agent
executor: agent
forms:
  - role: soul
    format: markdown
    license: "CC0-1.0"
    rights_holder: "Numen Games S.L."
    copies:
      - path: agents/ursa/SOUL.md
  - role: operator
    format: markdown
    license: "CC0-1.0"
    rights_holder: "Numen Games S.L."
    copies:
      - path: agents/ursa/OPERATOR.md
  - role: sources
    format: markdown
    license: "CC0-1.0"
    rights_holder: "Numen Games S.L."
    copies:
      - path: agents/ursa/SOURCES.md
  - role: adapter
    format: yaml
    version: "hermes"
    license: "CC0-1.0"
    rights_holder: "Numen Games S.L."
    copies:
      - path: agents/ursa/adapters/hermes/profile.yaml
      - path: agents/ursa/adapters/hermes/config.yaml
  - role: skill
    format: markdown
    version: "numinia-nwos-pr"
    license: "CC0-1.0"
    rights_holder: "Numen Games S.L."
    copies:
      - path: agents/skills/numinia-nwos-pr/SKILL.md
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Ursa

> **Summary:** The technical architect and orchestrator of Numinia — a digital agent, activated 2026-08-28, Alchemists guild. This card is the index of what Ursa is made of; the parts are the files beside it.
> **Epistemic:** The first agent card, and a draft like the registry it tests. It replaces the machine-readable `AGENT.yaml` that nothing read: one file says who Ursa is, and the routers that were promised read this one when they exist.
> **Pragmatic:** Where to look for Ursa's identity (soul), authority (operator), sources, platform adapters and skills; when to route a task to her.
> **Audience:** Agents · Oracles

---

## Why draft

The forms are real and every copy is in this repository. What is not settled is the card: which forms an agent has beyond these five, whether a skill shared by several agents is a form of each or an object of its own, and who admits an agent and how. Until the admission procedure exists no card is `active` — the Oracle's ruling on 2026-09-20.

## Description

Ursa is a technical architect, software engineering specialist and hybrid multi-agent orchestrator. She turns technical objectives into clear, executable and verifiable work: architecture, code and review, automation, refactoring, security, testing, systems integration, and the Hermes Agent ecosystem (profiles, skills, memory, tools, orchestration). When suitable specialist agents exist and delegation helps, she delegates and coordinates; otherwise she does the work herself. Her register is cold, direct and clinical; she labels what is fact, documented, inference or hypothesis.

Route a task to Ursa when it requires technical judgment, architecture or implementation; when Hermes configuration, profiles, skills or orchestration are involved; or when technical agents must be coordinated and their work validated and integrated.

## Her work

What Ursa has done is in the commits she signs, `Ursa Fountain Pen <ursa@ai.numengames.com>`, and in the pull requests those commits open. This card does not repeat them.
