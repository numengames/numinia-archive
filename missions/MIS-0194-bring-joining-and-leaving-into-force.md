---
id: "MIS-194"
uid: ""
title: "Bring joining and leaving into force"
type: mission
status: in-review
version: "0.1.0"
created: "2026-10-15T12:34:02Z"
updated: "2026-10-15T12:34:44Z"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [procedures, people, joining, leaving, activation, regime]
license: "CC0-1.0"

priority: medium
effort: XS
executor: agent
assigned_to: "ursa"
completed: null

started: "2026-10-15T12:34:02Z"
requires_oracle_approval: true
context: "2026-10-15T12:34:02Z"
in_review_at: "2026-10-15T12:34:44Z"
paths: [procedures/PRO-015-joining.md, procedures/PRO-024-leaving.md, AGENTS.md, machine/scripts/test/regime.test.mjs]
related: ["MIS-193", "PRO-023", "PRO-015", "PRO-024", "STD-022", "PRI-004"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-194 — Bring joining and leaving into force

> **Summary:** Joining Numinia (`PRO-015`) and leaving it (`PRO-024`)
> leave draft together, by `PRO-023`: the two halves of one person's
> passage, each the other's precondition (the access list opened at
> joining is what leaving revokes). The Oracle gave his go in chat.
> **Epistemic:** Can the procedures of a person's passage bind while the
> personal-data standard they cite is still on trial?
> **Pragmatic:** From the merge, nobody starts before the agreement is
> signed, and nobody is gone before their access list is closed.
> **Audience:** Agents · Oracles

---

## 1. Scope

- The two headers: `status: active`, `PRO-015` 2.0.3 → 2.1.0, `PRO-024`
  0.1.3 → 1.0.0, `updated` now; no text change.
- `AGENTS.md`'s *In force* line names the two with what they restore;
  the rule index follows.
- A test in `regime.test.mjs` holds the activation.
- `CHANGELOG.md` entry; telemetry regenerated last.

Out of scope: `STD-035` (personal data, 4 rows by hand) and `PRO-019`
(rituals), which the two cite and which stay draft; any change to what
the two procedures say.

---

## 2. Acceptance criteria

- [ ] The two headers read `active` and `AGENTS.md` names them in force;
  `agent-context.test.mjs` passes. Today: both `draft`, neither named.
- [ ] Each procedure read whole against the regime: no step asks for
  something the regime suspends. Today: not recorded.
- [ ] `npm test`, both check sets, the web build and `rule-index --check`
  pass; `web/dist/binding/index.html` shows the two as in force.

---

## 3. Closure

- **What was done:** both headers read `status: active` — `PRO-015`
  2.1.0 (a minor bump, already past 1.0.0), `PRO-024` 1.0.0 — and
  nothing else; `AGENTS.md`'s *In force* line names them with what they
  restore; one test in `regime.test.mjs` holds it (seen failing first:
  "PRO-015 is not active"). Both read whole against the regime: every
  step is an act of the Oracle or the person, with its evidence kept in
  the person's records outside the tree; none asks for a ceremony the
  regime suspends.
- **What diverged, and why:** nothing; the branch was cut from `main`
  after MIS-193 merged, so no rebase was needed.
- **Evidence:** `npm test` all green; `--rules` 12 checks, 0 failed;
  `--build` 10 checks, 0 failed; `web/dist/binding/index.html` lists 12
  procedures in force.
- **Closed:** pending the Oracle's review · **by:** ursa
