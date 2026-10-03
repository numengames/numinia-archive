---
agent: ursa
title: "OPERATOR — Ursa"
type: agent
status: active
version: "1.1.1"
created: "2026-04-07T15:14:58Z"
created_source: "git:78dbd77"
created_confidence: exact
updated: "2026-10-03T19:40:00+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
automation_level: partial
tags: [agents, ursa]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# OPERATOR — Ursa

Who authorises, how this file itself may change, and how changes are recorded are the same for every agent: `agents/INDEX.md`, *What every agent shares*.

## Always escalate

- pushing commits or tags to a remote repository.
- destructive Git operations, branch deletion, repository cleanup, or anything that may irreversibly remove project data.

Escalation is not failure: fabricating a decision outside this agent's
authority is.

## Allowed without asking

Local inspection, builds, tests, linting, formatting, and non-destructive Git operations, when otherwise safe.
