---
id: "PRO-023"
uid: ""
title: "Bringing a rule into force"
type: procedure
status: active
version: "1.1.3"
created: "2026-09-27T14:30:00+02:00"
updated: "2026-10-03T21:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "Knowledge and quality"
tags: [procedure, lifecycle, draft, active, promotion, checks]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-004", "STD-005", "STD-009", "STD-017", "STD-019", "STD-024"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-023 — Bringing a rule into force

> **Summary:** How a canon, standard or procedure leaves `draft` and starts
> to bind, without breaking the build and without surprising anyone.
> **Epistemic:** What has to be true before a rule may bind?
> **Pragmatic:** The steps from a candidate to `status: active`, and what to
> show the Oracle before the change.
> **Audience:** Agents · Oracles

**Binds:** whoever proposes, prepares or approves a document leaving draft.

---

## 1. Purpose and trigger

A draft is on trial: it is followed, its check warns and never blocks,
and what does not fit is noted. The day it becomes `active`, two things
change at once: every finding its check reports stops being a warning and
fails the build, and every person and agent is held to what it says. This procedure makes that moment deliberate.

It starts when the Oracle names a document to bring into force, or when an
agent proposes one. The **agent** prepares the change and shows it; the
**Oracle** decides.

---

## 2. Preconditions

- A clone of `main`, with `npm ci` run at the root and in `web/`.
- The candidate is `status: draft` in `canon/`, `standards/` or `procedures/`.
- The checks and tests pass on `main` as it stands.

---

## 3. Procedure

1. **Run the checks.** `npm run guards -- --rules`, and keep the output.
2. **Find the candidate's check.** Each check names the standard it belongs
   to (`std-004-the-header` belongs to `STD-004`). A document with no check
   is checked only by people; say so in step 7.
3. **List what would fail.** Every finding under the candidate's check fails
   the build once it is `active`. Write the list down: file, rule, what is
   wrong.
4. **Fix each finding in the file that carries it.** Fix the document that
   breaks the rule, not the rule. If the rule itself is wrong, stop and go
   to Escalation.
5. **Run the checks again.** The candidate's check must say *all hold*.
6. **Read every requirement for a yes or no.** For each MUST, ask whether
   someone holding the thing made could answer *met* or *not met*. Note any
   that cannot be answered; no one can be held to them in practice.
7. **List the checks made by hand.** The rows of the candidate's Check table
   verified *by hand* become a reviewer's duty the day it binds. Name them.
8. **Show the Oracle the activation.** In plain words, before the branch:
   what will now fail the build, what reviewers must now read for, the
   findings fixed in step 4 and the requirements noted in step 6. Wait for
   his answer.
9. **Change the header.** `status: active`, a minor version bump — or
   `1.0.0` if the document is still below it, since reaching one is the
   version's own way of saying it now promises — and `updated` set to now.
   The text does not change in the same step.
10. **For a procedure, restore its ceremony in `AGENTS.md`.** The transition
    regime suspends procedure ceremony while procedures are draft; say in the
    regime which procedure now binds, and update the test that checks every
    procedure is draft.
11. **Record it.** A `CHANGELOG.md` entry naming what now binds and why this
    one, then a pull request against `main`, never against another branch.
12. **Check it landed.** After the merge, `git show origin/main:<file>` shows
    `status: active`, and numinia.org/binding lists it as in force.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1–5 | The check's line for the candidate reads *all hold* in the pull request's CI log |
| 6–8 | The Oracle's answer in the conversation, quoted in the pull request |
| 9 | The header diff: `status`, `version`, `updated` and nothing else |
| 10 | For a procedure: the `AGENTS.md` diff and the passing test |
| 11 | The merged pull request and its `CHANGELOG.md` entry |
| 12 | `/binding` shows the document as in force |

---

## 5. Escalation

If a finding can only be fixed by changing what the rule says, stop: the
rule changes first, in its own pull request, and the activation waits. If
the Oracle says no, the document stays draft and the pull request records
why. If an active rule blocks work nobody foresaw, bring it to the Oracle;
returning it to draft is his decision, never the agent's.
