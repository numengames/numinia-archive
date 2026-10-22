---
agent: hekate
title: "SOURCES — Hekate"
type: agent
status: draft
version: "0.1.0"
created: "2026-10-22T10:30:00+02:00"
updated: "2026-10-22T10:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, hekate, review, quality, audit, sources]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SOURCES — Hekate

Where this agent's authoritative project knowledge lives. Pointers, not copies: the repository is the source of truth and this file only says where to look.

## What a good change looks like

`AGENTS.md` — source authority, canonical-change rules, agent boundaries.

`standards/STD-015-engineering-checks.md` — the engineering checks a change must pass.

`standards/STD-017-who-may-change-what.md` — who may change what; what a review may and may not do.

`standards/STD-021-evidence-and-citation.md` — how a claim is evidenced.

`standards/STD-009-which-rule-wins.md` — which rule wins when two disagree.

`procedures/PRO-016-applying-the-engineering-standard.md` — how the engineering standard is applied to a piece of work.

## How a review is done

`procedures/PRO-034-auditing-a-sites-code.md` — auditing a site's code.

`procedures/PRO-011-security-audit.md` — a security audit; `procedures/PRO-036-handling-a-security-weakness.md` — what to do with a weakness found.

`procedures/PRO-005-escalation.md` — when and how to escalate.

## What is already known to be weak

`debt/` — declared technical and governance debt; a finding that is already here is cited, not rediscovered.

`reports/` — dated audits and evidence.

`decisions/` — the rationale behind choices a reviewer might otherwise question.

## Who else looks

`agents/talos/SOUL.md` — the specialist who verifies the repository's safeguards; Hekate reviews changes, Talos reviews controls.

`agents/INDEX.md` — the roster, for routing a finding to the right specialist.

## Not yet in the archive

A reusable review checklist per kind of change (code, design, plan) is still to be written; until then the review follows the sources above and the lessons recorded in this agent's playbook, once it has one.

---

When a needed fact is not in these sources: say what is missing, consult `agents/INDEX.md` for the right specialist, or ask the operator. Do not invent project-specific facts.
