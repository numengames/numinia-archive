---
id: "PRO-008"
uid: ""
title: "Requesting approval, issuing rulings"
type: procedure
status: draft
version: "5.2.2"
created: "2026-04-07T15:00:00Z"
updated: "2026-10-03T21:00:00+02:00"
author: "nimrod"
owner: "oracle"
guild: "Alchemists"
section: "Strategy and governance"
tags: [approval, human-in-the-loop, security, procedure, rulings, falsifiability]
license: "CC0-1.0"
applies_to: [all-agents]
mandatory: true
related: ["STD-017", "STD-042", "PRO-005", "PRO-016"]
derived_from: "CAN-004"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-008 — Requesting approval, issuing rulings

> **Summary:** The two directions of the decision interface: how an agent
> requests approval, and how the Oracle issues a ruling that can be caught
> when wrong.
> **Epistemic:** How does an agent ask for approval, and how is a ruling given so it can be checked?
> **Pragmatic:** Before any action needing human approval, and when issuing
> or executing a ruling.
> **Audience:** Agents · Oracles

**Binds:** any agent requesting approval; any Oracle issuing a ruling; any
agent executing one.

## 1. Purpose and trigger

An action the agent may not take alone (`PRO-005`; a task classified
irreversible under `PRO-016`); or a ruling the Oracle issues that asserts a
fact about the repository. Executor: the agent for the request, the Oracle
for the ruling, the agent again for its execution.

## 2. Preconditions

- A direct channel to the Oracle.
- Every artefact the request names already pushed, so each has a web
  address.
- For a ruling: the repository in a state the executor can measure.

## 3. Procedure

**Request**

1. **Send one complete request, in the approver's words first.** Header
   `APPROVAL REQUEST — Score {X}/10`; then, in plain words before anything
   else, what you are about to do, what could go wrong, and whether it can
   be undone — the person who answers did not write the command and answers
   for it; then agent, mission, context, the exact action (an execution
   request carries the command, beneath the plain words; a design request
   carries the proposal), its epistemic and pragmatic effect, and what
   happens without an answer; then `Approve? Yes / No / Defer / Modify`.
   Which permission the action needs, and whether the agent's level grants
   it alone, is read in the register of what an agent may do without asking.
2. **Link every artefact by its web address** next to its first mention —
   never a filesystem path.
3. **Score it on the scale below.** The score guides attention, not
   responsibility: the agent proposes, the person decides, at any score.
   No agent modifies the scale.
4. **At 7 or above, write a document.** Add the discarded alternatives,
   what a good and a bad outcome would reveal, the impact at a day and a
   week, and reversibility.

| Score | Level | Answer within |
|---|---|---|
| 1–2 | routine — no approval | — |
| 3–6 | operational, tactical — reversible | 24h |
| 7–8 | strategic — architecture | 12h |
| 9 | systemic — canon, operator, security | immediate |
| 10 | foundational — irreversible, reputation, money | immediate, and a meeting |

**Ruling**

5. **State what would make it wrong.** The issuer names the facts the
   ruling depends on, in checkable form, and what to do if one is false;
   the default is stop and report. *Use this prefix, it is unused in the
   corpus* can be checked; *use this prefix* cannot. A ruling of preference
   carries no condition and is declared as preference.
6. **Measure before executing.** The executor measures every stated fact
   and puts the command in its report.
7. **Stop if a fact is false,** before any file changes; report which fact
   and what was measured.
8. **Execute if the facts hold** — including when you disagree. Check the
   facts, not the priorities.
9. **Record the correction where the ruling was issued:** fact asserted,
   measurement, outcome.

## 4. Verification

| Check | Evidence |
|---|---|
| Request complete | every field of step 1 present, the mission among them; addresses resolve |
| Ruling checkable | at least one falsifiable fact stated, or *preference* declared |
| Ruling verified | the measuring command in the executor's report |

## 5. Escalation

No answer within the score's window: after 48 hours, only the reversible
option, as `PRO-005` step 6 says. A ruling that asserts a repository fact
without stating it: return it to the issuer before execution.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-017` | Who may change what | `AUT-065`: rank sets who may approve |
| `PRO-005` | Escalating to the Oracle | the request's other half: when to ask, how long to wait |
| `PRO-016` | Applying the engineering standard | the task classification that marks an action irreversible |
| `STD-042` | What an agent may do without asking | which permission an action needs, and whether the agent's level grants it alone |
