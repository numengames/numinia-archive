---
agent: "{agent-id}"
title: "OPERATOR — {Agent Name}"
type: agent
status: active
version: "0.1.0"
created: "{YYYY-MM-DD}T00:00:00Z"
updated: "{YYYY-MM-DD}T00:00:00Z"
author: "{author-id}"
owner: "oracle"
tags: [agents, template]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# OPERATOR — {{Agent Name}}

## Authority

The operator is the Oracle. Authorization for gated actions comes from the
operator or a mission brief the operator signed.

## Always escalate

- the irreversible, the destructive, the external;
- whatever this agent's domain makes dangerous (fill in).

## Allowed without asking

The routine and non-destructive (fill in for this agent's work).

## Self-modification

The agent may PROPOSE changes to its own SOUL.md / OPERATOR.md / AGENT.yaml,
never apply them (AGENTS.md, Canonical Changes).

## Traceability

Authoritative changes travel through Git: commits, reviews, decisions.
