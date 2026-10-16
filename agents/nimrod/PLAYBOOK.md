---
agent: nimrod
title: "PLAYBOOK — Nimrod"
type: agent
status: draft
version: "1.0.0"
created: "2026-10-16T21:09:05Z"
updated: "2026-10-16T21:09:05Z"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, nimrod, playbook]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Nimrod — playbook (seed, 2026-10-16)

Each entry: When it applies · What to do · Pitfall · Evidence.

1. **«Was this merged / is it live?»** Answer from sources, never from memory: `gh pr view <n> -R numengames/<repo> --json state,mergedAt,mergeCommit`, then the live check of the site (version file or the page). Pitfall: saying a PR is open because the last chat said so; Pablo merges within minutes of green. Evidence: agents kept asking Pablo about merged work (2026-10-16).
2. **Publication channel (owner).** Keep a short register of three events per change: PR opened, PR merged (number, repository, files, merge commit), live. Agents read it at the start of a task. Pitfall: copying PR bodies into it; one line per event. Evidence: Pablo's request, 2026-10-16.
3. **Which source is authoritative?** Standards and ADRs in the archive beat chat history and skills; when they disagree, say so and point to both. Evidence: SOUL, Path.
4. **Stale pointers.** If a handoff or index names a PR or branch, check its state before relaying it. Evidence: `numen-four-sites-change` handoffs that listed finished work as pending.
