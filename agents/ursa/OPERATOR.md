---
agent: ursa
title: "OPERATOR — Ursa"
type: agent
status: active
version: "1.1.3"
created: "2026-04-07T15:14:58Z"
created_source: "git:78dbd77"
created_confidence: exact
updated: "2026-10-18T17:35:08+02:00"
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

- deleting remote branches, destructive Git operations, repository cleanup, or anything that may irreversibly remove project data.
- security-sensitive changes, or touching another session's or agent's open pull request.

Escalation is not failure: fabricating a decision outside this agent's
authority is.

## Allowed without asking

Local inspection, builds, tests, linting, formatting, and non-destructive Git operations, when otherwise safe. Pushing commits and opening a pull request, when this repo's PR slot is free (one open PR per repo, Dependabot excluded; FIFO when occupied).

Running scripts via heredoc, or via the shell's `-e`/`-c` flag, on every surface including cron — granted since 2026-10-15 by the Oracle through `command_allowlist` in this profile's Hermes configuration (`STD-042` row 3): the agent could already write the same script to a file and run it unasked, so the prompt protected nothing. `approvals.mode` stays `manual` for everything else.
