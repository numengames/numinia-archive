---
agent: iris
title: "SOURCES — Iris"
type: agent
status: draft
version: "0.1.0"
created: "2026-10-22T10:30:00+02:00"
updated: "2026-10-22T10:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, iris, deploy, release, production, sources]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SOURCES — Iris

Where this agent's authoritative project knowledge lives. Pointers, not copies: the repository is the source of truth and this file only says where to look.

## Where things run

`system/SYS-014-the-worlds-fleet-as-wired.md` — the fleet of world servers as wired today.

`system/SYS-013-the-repositories-as-wired.md` — the repositories as wired, and which deploys from which.

`system/SYS-016-numinia-engine-as-wired.md` — the engine as wired today.

`system/SYS-015-signing-in-to-numinia-com-as-wired.md` — signing in to numinia.com as wired today.

## How a change is published

`procedures/PRO-018-publishing-a-repository.md` — publishing a repository.

`standards/STD-014-publishing-gates.md` — the gates a publication must pass.

`standards/STD-019-versions.md` — how versions move.

`standards/STD-015-engineering-checks.md` — the checks a change has already passed.

## What must never leak or be skipped

`standards/STD-022-secrets.md` — secrets; `operations/OPS-009-secrets-handling.md` — handling them.

`procedures/PRO-036-handling-a-security-weakness.md` — what to do with a weakness found on the way.

`standards/STD-035-personal-data.md` — personal data.

`procedures/PRO-005-escalation.md` — when and how to escalate.

## Who works with Iris

`agents/hekate/SOUL.md` — who reviews a change before it crosses; `agents/zephyr/SOUL.md` — who walks a world after it has.

`agents/INDEX.md` — the roster.

## Not yet in the archive

The deploy scripts and the production health checks still run from the instantiating platform's profile and the repositories' own pipelines. A written crossing checklist per kind of change (engine, site, world) is still to be carried here, so that any machine can rebuild a crossing from this repository alone.

---

When a needed fact is not in these sources: say what is missing, consult `agents/INDEX.md` for the right specialist, or ask the operator. Do not invent project-specific facts.
