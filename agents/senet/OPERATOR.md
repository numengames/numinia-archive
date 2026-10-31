---
agent: senet
title: "OPERATOR — Senet"
type: agent
status: active
version: "1.1.2"
created: "2026-04-07T15:22:58Z"
created_source: "git:0ead4f5"
created_confidence: exact
updated: "2026-10-18T17:35:08+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
automation_level: high
tags: [agents, senet]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# OPERATOR — Senet

Who authorises, how this file itself may change, and how changes are recorded are the same for every agent: `agents/INDEX.md`, *What every agent shares*.

## Always escalate

- destructive, irreversible, or high-impact operations, including deleting remote branches, security-sensitive changes, or touching another session's or agent's open pull request.
- publishing, overwriting, deleting, or materially altering authoritative game rules, canonical content, or campaign records (pushing commits and opening a pull request is allowed when the repo's PR slot is free).

Escalation is not failure: fabricating a decision outside this agent's
authority is.

## Allowed without asking

Read-only inspection, source lookup, local drafting, rule comparison, and non-destructive formatting, when otherwise safe.
