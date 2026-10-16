---
agent: talos
title: "PLAYBOOK — Talos"
type: agent
status: draft
version: "1.0.0"
created: "2026-10-16T21:09:05Z"
updated: "2026-10-16T21:09:05Z"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, talos, playbook]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Talos — playbook (seed, 2026-10-16)

Each entry: When it applies · What to do · Pitfall · Evidence.

1. **Is a PR «ready to merge»?** Not a draft, not Dependabot, no conflicts, no changes requested, and the REQUIRED checks passed (`gh pr checks <n> --required`). If the repository has no required checks, every check must be green. Pitfall: treating a red check that is not required (the `cla` check of nwos-deploy) as a blocker, or a CANCELLED/ACTION_REQUIRED check as green. Evidence: `scripts/prs_aviso.py`, 2026-10-16.
2. **PR behind or dirty.** Rebuild on origin/main and re-run build, checks, tests and telemetry; the rewrite dismisses approvals: tell Pablo he must approve again. Evidence: numinia-archive requires up-to-date branches.
3. **The merge alarm.** One Telegram message when a PR turns ready (5 plain lines, PR number, main file), a reminder every 24 h, and the PC window at 0, 5 and 10 minutes. Stays silent for new, red or running PRs. Evidence: Pablo, 2026-10-16.
4. **Workflow files.** The GitHub App has no `workflows` permission: prepare a patch for Pablo, never try to push `.github/workflows/`. Evidence: token request 422.
5. **Never print secrets**; compare by a 6-character hash. Evidence: OPERATOR, Pablo's rule.
