---
id: "PRO-008"
uid: ""
title: "Requesting approval, issuing rulings"
type: protocol
status: draft
version: "4.0.2"
created: "2026-04-07T15:00:00Z"
updated: "2026-09-26T14:43:00+02:00"
author: "nimrod"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [approval, human-in-the-loop, security, protocol, rulings, falsifiability]
license: "CC0-1.0"
applies_to: [all-agents]
mandatory: true
related: ["STD-017", "PRO-005"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-008 — Requesting approval, issuing rulings

> **Summary:** The two directions of the decision interface: how an agent
> requests approval, and how the Oracle issues a ruling that can be caught
> when wrong.
> **Epistemic:** What makes a decision checkable rather than merely obeyed.
> **Pragmatic:** Before any action needing human approval, and when issuing
> or executing a ruling.
> **Audience:** Agents · Oracles

**Binds:** any agent requesting approval; any Oracle issuing a ruling; any
agent executing one.

## 1. Trigger

An action the agent may not take alone (`PRO-005`, `TSK-002`); or a ruling
the Oracle issues that asserts a fact about the repository. Executor: the
agent for the request, the Oracle for the ruling, the agent again for its
execution.

## 2. Rules

**APV-001 — A request is a complete unit.** Every approval request MUST
carry agent, mission, context, exact action, epistemic and pragmatic
effect, what happens without an answer, and a score.

**APV-002 — Every artefact carries its web address.** Anything presented
for a decision MUST link its canonical address, next to its first mention.
Never a filesystem path.

**APV-003 — The score guides attention, not responsibility.** The agent
proposes; the person decides, at any score. No agent MAY modify the scale.

**APV-004 — Seven and above is a document.** A request scored 7+ MUST be a
document, adding the discarded alternatives, what a good and a bad outcome
would reveal, the impact at a day and a week, and reversibility.

**APV-005 — A ruling states what would make it wrong.** The issuer MUST
name the facts the ruling depends on, in checkable form, and what to do if
one is false; the default is stop and report. *Use this prefix, it is
unused in the corpus* can be checked; *use this prefix* cannot.

**APV-006 — The executor verifies before executing.** Every stated fact
MUST be measured, the command in the report. If one is false, the executor
MUST stop before any file changes.

**APV-007 — The correction lives with the decision.** A ruling caught by
its condition MUST be recorded where it was issued: fact asserted,
measurement, outcome.

**APV-008 — Facts, not reasoning.** The executor checks the stated facts,
not the priorities. If the facts hold, it executes — including when it
disagrees. Rulings of preference carry no condition.

## 3. Procedure

**Request.** Execution (carries the command) or design (carries a
proposal). Header `APPROVAL REQUEST — Score {X}/10`, then the `APV-001`
fields, then `Approve? Yes / No / Defer / Modify`.

| Score | Level | Answer within |
|---|---|---|
| 1–2 | routine — no approval | — |
| 3–6 | operational, tactical — reversible | 24h |
| 7–8 | strategic — architecture | 12h |
| 9 | systemic — canon, operator, security | immediate |
| 10 | foundational — irreversible, reputation, money | immediate, and a meeting |

**Ruling.** Issuer states facts and fallback (`APV-005`); executor measures
(`APV-006`); if false, reports which fact and what was measured; correction
recorded (`APV-007`).

## 4. Verification

| Check | Evidence |
|---|---|
| Request complete | every `APV-001` field present; addresses resolve |
| Ruling checkable | at least one falsifiable fact stated, or *preference* declared |
| Ruling verified | the measuring command in the executor's report |

## 5. Escalation

No answer within the score's window: `ESC-003`. A ruling that asserts a
repository fact without stating it: returned to the issuer before execution.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-017` | Who may change what | `AUT-065`: rank sets who may approve |
| `PRO-005` | Escalating to the Oracle | the request's other half: when to ask, how long to wait |
