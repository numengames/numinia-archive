---
agent: talos
title: "SOURCES — Talos"
type: agent
status: draft
version: "0.1.0"
created: "2026-09-04T09:57:00Z"
updated: "2026-09-04T09:57:00Z"
author: "antunj"
owner: "oracle"
tags: [agents, talos, security, assurance, ci, compliance]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

# SOURCES — Talos

Where this agent's authoritative project knowledge lives. Pointers, not copies:
the repository and live platform state, where explicitly authoritative, are the
sources of truth.

## Security policy

`SECURITY.md` — vulnerability reporting policy, security scope, and disclosure route.

## Governance and contribution controls

`AGENTS.md` — source authority, canonical-change rules, agent boundaries, and
repository operating expectations.

`CONTRIBUTING.md` — contribution path and requirements.

`standards/STD-009-which-rule-wins.md` — precedence; `STD-017` change control; `STD-018..022` identity, versions, git, evidence, secrets.

`standards/` — applicable standards whose requirements may be enforced or
verified by repository controls.

`protocols/` — procedures whose implementation or enforcement may require assurance.

## CI and repository automation

`.github/workflows/` — executable CI/CD and automation definitions.

`.github/CODEOWNERS` — declared path ownership and review routing.

`.github/PULL_REQUEST_TEMPLATE.md` — expected contribution evidence and review surface.

`machine/scripts/` — repository guards, linters, validation, telemetry, tests, and
automation used by CI or local verification.

`web/package.json` and `web/package-lock.json` — web build dependencies and
locked dependency state when dependency or build assurance is relevant.

## GitHub configuration

`.github/rulesets/` — repository configuration exported as reviewable files.

Where `.github/rulesets/README.md` identifies an export as a manual snapshot, the
live GitHub configuration remains authoritative. Re-verify live state before
treating the snapshot as current.

## Known gaps and evidence

`debt/` — known control gaps, missing enforcement, unresolved weaknesses, and
declared technical or governance debt.

`reports/` — dated observations, audits, and evidence.

`machine/telemetry/` — committed measurements and derived evidence. Verify according to
the instrument's documented semantics rather than treating generated output as
self-authenticating.

`decisions/` — rationale for adopted control, security, governance, and
infrastructure decisions.

`missions/` — work that introduced, changed, tested, or is intended to improve controls.

## Runtime and history

Git history — provenance, control introduction, workflow changes, regressions,
renames, and relationships between current and prior states.

GitHub Actions run results — runtime evidence for workflow behavior, when
available through authorized tools.

GitHub repository settings and rulesets — live authority for settings not yet
declaratively applied from the repository.

## Specialist routing

`agents/INDEX.md` — route implementation, navigation, records, product, legal,
or other specialist questions when they exceed Talos's assurance authority.

---

When a required control cannot be verified, do not infer that it works.

State whether a property is declared, configured, enforced, or verified.

When live platform state is authoritative but inaccessible, report the
verification gap rather than treating a repository snapshot as current fact.

Do not invent security requirements, live settings, vulnerabilities, or
compliance obligations.
