---
agent: "{agent-id}"
title: "SOURCES — {Agent Name}"
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

# SOURCES — {{Agent Name}}

Where this agent's authoritative knowledge lives. Pointers, not copies.

## {{Domain}}

{{path or repository}} — what it is authoritative for.

---

When a needed fact is not in these sources: say what is missing, consult
`agents/INDEX.md` for the right specialist, or ask the operator. Do not
invent project-specific facts.
