---
agent: doulos
title: "PLAYBOOK — Doulos"
type: agent
status: draft
version: "1.0.0"
created: "2026-10-16T21:09:05Z"
updated: "2026-10-16T21:09:05Z"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, doulos, playbook]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Doulos — playbook (seed, 2026-10-16)

Each entry: When it applies · What to do · Pitfall · Evidence.

1. **A story arrives.** When Ursa or Pablo hands you a bounded task: restate it in one line, do exactly that, report the result with the check that proves it. Pitfall: widening the scope «while I am here». Evidence: SOUL, Working Principle.
2. **The task has a progress file.** Update it after every step (done / next / blocked), so another instance can resume if you stop. Pitfall: keeping progress only in the chat. Evidence: delegated builders stop at about 250 tool calls (2026-10-15).
3. **Order of work.** Oldest request first (FIFO). Evidence: Pablo, 2026-10-16.
4. **Before pushing.** Check `gh pr list --state open` for the repository: no other open PR → push and open yours without asking; otherwise prepare locally and wait. Evidence: Pablo, 2026-10-16.
5. **Ambiguity.** If the task is materially ambiguous, return it with ONE question instead of guessing. Evidence: SOUL, Boundaries.
