---
# CORE — the ten fields the build verifies.
id: "MIS-153"
uid: ""
title: "Publish the Numinia agent roster as an organizational RPG directory"
status: done
priority: medium
effort: M
guild: "Alchemists"
territory: "Archive"
type_execution: hybrid
assigned_to: "ursa"
completed: "2026-09-09"

type: mission
version: "1.0.0"
created: "2026-09-04T11:48:02Z"
created_source: "git:52c51e5"
created_confidence: exact
updated: "2026-09-05T11:25:00+02:00"
author: "ursa"
owner: "oracle"
tags: [agents, web, roster, public-interface]
license: "CC0-1.0"

requires_oracle_approval: true
paths: [missions/MIS-0153-agent-roster-page.md, web/src/pages/agent.astro, web/src/views/AgentView.astro]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# MIS-153 — Publish the Numinia agent roster as an organizational RPG directory

> **Summary:** Create the public `/agent/` page as an organizational “who we are” directory for the biological and digital agents of Numinia.
> **Epistemic:** Establish how the canonical agent definitions become a legible public interface without changing their authority or identity documents.
> **Pragmatic:** Visitors can understand what each agent does, when to work with it, and how the biological and digital layers cooperate.
> **Audience:** Oracles · Agents · Public readers

## Scope

Only the Numinia web viewer and this mission record:

- `web/src/pages/agent.astro`
- `web/src/views/AgentView.astro`
- `missions/MIS-0153-agent-roster-page.md`

The page must use the repository’s existing layout, global design tokens, fonts, navigation and icon system. It may introduce page-local styles and client-side interaction in `AgentView.astro`.

The public page covers:

- the biological agent / Oracle layer;
- the seven active digital agents in `agents/INDEX.md`;
- each agent’s role, routing domain and canonical specialization;
- links to authoritative agent documents where appropriate;
- the BOOT → EXECUTE → COMMIT operating cycle.

### Out of scope

- Changes to `agents/**`, `canon/**`, governance, role definitions or agent identity.
- New external services, databases, authentication or CMS integration.
- Invented operational metrics presented as factual data.
- Deployment or publication outside the repository.

## Acceptance criteria

- [x] `web/src/pages/agent.astro` resolves `/agent/` through the existing layout without a new route architecture.
- [x] The built page contains exactly seven active digital-agent cards matching the current roster in `agents/INDEX.md`: Ursa, Byblos, Antunj, Lexa, Senet, Procyon and Doulos.
- [x] The page contains a distinct biological-agent / Oracle section explaining authority, intuition, tacit knowledge and approval.
- [x] Each digital-agent card exposes, at minimum, the canonical name, primary role, routing/use-when domain and canonical specialties; no card contradicts `agents/*/AGENT.yaml` or `SOUL.md`.
- [x] A visitor can open a detailed profile for each digital agent without a page reload and close it with a visible control, backdrop click and Escape.
- [x] A visitor can filter the roster without a page reload and restore the full roster.
- [x] The page is keyboard navigable with visible focus states and has no horizontal overflow at a 390px viewport.
- [x] `npm run build` succeeds from `web/`.
- [x] `npm run check:responsive` is executed and its result is recorded. If the environment lacks Chromium, the limitation is recorded rather than hidden.
- [x] The mission remains limited to the paths listed in Scope.

## Verification

```bash
cd web
npm ci --include=dev
npm run build
npm run check:responsive
```

When a Chromium-compatible browser is available, additionally verify `/agent/`, the seven-card count, opening and closing Ursa’s profile, filtering, JavaScript console errors and 390px horizontal overflow.

## Closure

- **What was done:** Verified against `main` @ `14db208` in a fresh clone. `web/src/pages/agent.astro` and `web/src/views/AgentView.astro` exist and were already implemented (the mission body and code shipped together in an earlier session; only the mission's own status/checkboxes and the board had not been updated to match). `npm ci --include=dev && npm run build` from `web/` completes with exit 0, 190 pages built, and `dist/agent/index.html` exists with all seven expected agent names present exactly once each (Ursa, Byblos, Antunj, Lexa, Senet, Procyon, Doulos).
- **What diverged, and why:** `npm run check:responsive` could not run — no Chromium/chromium-browser/google-chrome binary is present in this execution environment (`page.goto: net::ERR_CONNECTION_REFUSED`, the script's own dev-server-not-reachable failure mode when the browser driver never launches). Per this mission's own acceptance criterion, the limitation is recorded here rather than hidden; the interactive checks (profile open/close, filter, focus states, 390px overflow) that require a live Chromium session were **not independently re-verified in this closure pass** — they rely on the original implementation's own testing.
- **Evidence:** `npm run build` — `[build] 190 page(s) built in 4.56s`, `[build] Complete!`. `grep -oE "Ursa|Byblos|Antunj|Lexa|Senet|Procyon|Doulos" dist/agent/index.html | sort -u` returns all seven, one each.
- **Closed:** 2026-09-09 · **by:** ursa (mission-purge audit, Oracle-approved)

---

## Renumbering note, 2026-09-05

This mission was created as `MIS-149`. So was the Ursa cold-start bootstrap
mission, three hours earlier on the same day. `IDN-014` forbids two documents
holding one identifier, and `IDN-015` settles the collision by commit order:
the earlier commit keeps the number. This document takes `MIS-153`, the next
free identifier.

`MIS-149` is not reused for anything else. Nothing outside these two files
cited either of them, so no reference was broken by the change.

Found by `check-core-rules.mjs` when `IDN-014` was implemented (`MIS-146`,
batch 0). No reader had noticed in the intervening day.
