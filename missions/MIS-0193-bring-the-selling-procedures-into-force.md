---
id: "MIS-193"
uid: ""
title: "Bring the seven selling procedures into force"
type: mission
status: in-review
version: "0.1.0"
created: "2026-10-15T12:21:57Z"
updated: "2026-10-15T12:26:21Z"
author: "ursa"
owner: "oracle"
section: "Sales and partners"
tags: [procedures, sales, opportunity, activation, regime]
license: "CC0-1.0"

priority: medium
effort: S
executor: agent
assigned_to: "ursa"
completed: null

started: "2026-10-15T12:21:57Z"
requires_oracle_approval: true
context: "2026-10-15T12:21:57Z"
in_review_at: "2026-10-15T12:26:21Z"
depends_on: ["MIS-192"]
paths: [procedures/PRO-028-qualifying-an-opportunity.md, procedures/PRO-029-making-a-proposal.md, procedures/PRO-030-closing-a-sale.md, procedures/PRO-031-bidding-for-a-tender.md, procedures/PRO-032-applying-for-a-grant.md, procedures/PRO-033-screening-a-tender.md, procedures/PRO-035-watching-for-opportunities.md, AGENTS.md, machine/scripts/test/regime.test.mjs]
related: ["MIS-192", "PRO-023", "STD-038", "STD-039", "STD-054", "STD-055"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-193 — Bring the seven selling procedures into force

> **Summary:** Qualifying an opportunity, making a proposal, closing a
> sale, bidding for a tender, applying for a grant, screening a tender and
> watching for opportunities leave draft together, by `PRO-023`. The four
> standards they move a record by are in force (the mission before this one); a procedure has
> no Check table, so what it needs is the regime naming it (step 10).
> **Epistemic:** Can the procedures of selling bind the day their
> standards do, without a step the regime suspends?
> **Pragmatic:** From the merge, an opportunity moves only by their steps,
> and each step's evidence is a line the pipeline tool reads.
> **Audience:** Agents · Oracles

---

## 1. Scope

- The seven headers: `status: active`, version `1.0.0`, `updated` now; no
  text change.
- `AGENTS.md`'s *In force* line names the seven with what each restores;
  the rule index follows.
- A test in `regime.test.mjs` holds the activation.
- `CHANGELOG.md` entry; telemetry regenerated last.

Out of scope: `PRO-020` and `PRO-021` (sale and month's close, which
lean on `STD-044` and `STD-036`, still draft); any change to what the
seven procedures say.

---

## 2. Acceptance criteria

- [ ] The seven headers read `active` and `AGENTS.md` names them in force;
  `agent-context.test.mjs` passes. Today: all seven `draft`, none named.
- [ ] Each procedure read whole against the regime: no step asks for
  something the regime suspends. Today: not recorded.
- [ ] `npm test`, both check sets, the web build and `rule-index --check`
  pass; `web/dist/binding/index.html` shows the seven as in force.

---

## 3. Closure

- **What was done:** the seven headers read `status: active`, `1.0.0`,
  `updated` 2026-10-15T12:22Z, nothing else; `AGENTS.md`'s *In force*
  line names each with what it restores ("an opportunity's record moves
  only by their steps"); the rule index counts 10 procedures in force; one
  test in `regime.test.mjs` holds it (seen failing first: "PRO-028 is not
  active"). Each procedure was read whole against the regime: every step's
  evidence is a line or field of the record the pipeline tool reads, and
  none asks for a ceremony the regime suspends.
- **What diverged, and why:** the branch was cut from `main` before
  MIS-192 merged, so the card could not cite it until the rebase (a
  relation to a document on another open branch fails HDR-016); the
  rebase also met `AGENTS.md`'s new 20 KB cap (#703): the sentence adds
  360 bytes, the file stays at 18.7 KB.
- **Evidence:** `npm test` 967 tests, 0 failed; `--rules` 12 checks, 0
  failed; `--build` 10 checks, 0 failed; `web/dist/binding/index.html`
  lists 10 procedures in force.
- **Closed:** pending the Oracle's review · **by:** ursa
