---
id: "MIS-192"
uid: ""
title: "Bring the four opportunity standards into force"
type: mission
status: done
version: "0.2.0"
created: "2026-10-15T12:01:28Z"
updated: "2026-10-25T18:00:00Z"
author: "ursa"
owner: "oracle"
section: "Sales and partners"
tags: [standards, sales, opportunity, activation, regime]
license: "CC0-1.0"

priority: medium
effort: S
executor: agent
assigned_to: "ursa"
completed: "2026-10-15T12:20:29Z"

started: "2026-10-15T12:01:28Z"
requires_oracle_approval: true
context: "2026-10-15T12:01:28Z"
in_review_at: "2026-10-15T12:03:26Z"
paths: [standards/STD-038-the-stages-of-an-opportunity.md, standards/STD-039-an-opportunity-has-a-record.md, standards/STD-054-a-client-is-named-by-consent.md, standards/STD-055-only-a-call-that-passes-is-recorded.md, AGENTS.md, machine/scripts/test/regime.test.mjs]
related: ["MIS-190", "MIS-191", "PRO-023", "STD-038", "STD-039", "STD-054", "STD-055"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-192 — Bring the four opportunity standards into force

> **Summary:** The register of an opportunity's stages (`STD-038`), the
> record (`STD-039`), who may be named in it (`STD-054`) and which calls
> are recorded (`STD-055`) leave draft together, by `PRO-023`: every row
> of their Check tables is verified by the pipeline tool that runs in CI,
> and the Oracle saw the activation in chat before this branch.
> **Epistemic:** Does the first business standard in force bind with a
> machine behind every row, and nothing else?
> **Pragmatic:** From the merge, a malformed opportunity record fails the
> build instead of warning.
> **Audience:** Agents · Oracles

---

## 1. Scope

- The four headers: `status: active`, version `1.0.0`, `updated` now; no
  text change.
- `AGENTS.md`'s *In force* list names the four; the rule index follows.
- A test in `regime.test.mjs` holds the activation.
- `CHANGELOG.md` entry; telemetry regenerated last.

Out of scope: any other draft; any change to what the four standards say.

---

## 2. Acceptance criteria

- [x] `loadHolders().status` reads `active` for the four, and a plate of
  each of `STD-039`, `STD-054` and `STD-055` binds. Today: all four `draft`.
- [x] `AGENTS.md` names the four in force and `door-resolves.test.mjs`
  passes. Today: none named.
- [x] `npm test`, both check sets, the web build and `rule-index --check`
  pass; `web/dist/binding/index.html` shows the four as in force.

---

## 3. Closure

- **What was done:** the four headers read `status: active`, `1.0.0`,
  `updated` 2026-10-15T12:02:04Z, nothing else; `AGENTS.md` names them in
  force and the rule index counts 36 in force; one test in
  `regime.test.mjs` holds the activation (seen failing first: "STD-038 is
  draft, want active").
- **What diverged, and why:** the Oracle's plan named three standards;
  `STD-038` joined on the agent's recommendation, accepted in chat, since
  `STD-039` takes its values from that register and the tool reads it as
  its one source. A dry run on `origin/main` before the branch showed the
  only reds were the two that are part of the change (the *In force* list
  and the rule index).
- **Evidence:** `npm test` 967 tests, 0 failed; `--rules` 12 checks, 0
  failed; `--build` 10 checks, 0 failed; `web/dist/binding/index.html`
  shows the four as *in force*; `pipeline.mjs opportunities --proposals`
  exits 0 on the records as they stand.
- **Closed:** 2026-10-15, when the Oracle merged #702 · **by:** the Oracle
