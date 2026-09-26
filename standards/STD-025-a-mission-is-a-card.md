---
id: "STD-025"
uid: ""
title: "A mission is a card"
type: documentation
subtype: standard
status: draft
version: "1.0.4"
created: "2026-09-09T23:00:00+02:00"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
threshold: governed
license: "CC0-1.0"
tags: [standard, missions, board, lifecycle]
related: ["STD-001", "STD-018", "PRO-003", "ADR-030"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A mission is a card

> **Summary:** A mission is one piece of work, on the board before it
> starts, with its end stated, one person or agent doing it, a closed set of
> states, and a way out by deletion, never by editing.
> **Epistemic:** A mission is the only place where plan and outcome sit side
> by side. Every rule here protects that difference: it is the one thing a
> closed mission teaches.
> **Pragmatic:** Check any card against nine rules; know who may set each
> state and what mark it leaves; know when a card may leave the board.
> **Audience:** Agents · Oracles

**Binds:** every mission, and whoever sets a field on one.

## Rules

### Before the work

**Written down before it is done.** Work MUST exist as a committed card
before any of it happens. A card written after the fact is fiction.

**Done is stated before work starts.** A card MUST carry acceptance
criteria that are false when it opens and describe the finished state.
Scope and criteria are not edited after opening; what happened goes in the
closing notes.

**Read whole, never by title.** The agent MUST read the whole card — what
it delivers, the effort, the criteria, what it depends on, who does it —
before acting.

### While it is open

**Five states, no others.** A card MUST be in one of five states: to do, in
progress, in review, done, or frozen. The state lives only in the card; a
cancelled card is frozen, with that reason.

**Each state has its hand and its mark.** The information-security standard
keeps whoever authorises work apart from whoever does it, so no one approves
their own; the provenance vocabulary stamps when work started and ended. So
only the Oracle opens, closes and freezes a card, only its doer moves it
into progress and review, and each move MUST leave a date or a reason.

**Paused says why.** A frozen card MUST say why. Unfreezing sends it back
to to do and clears the reason.

**One doer.** The responsibility matrix gives each task exactly one person
responsible, so there is always someone to ask. An open card MUST name
exactly one person or agent, and only they edit it; work that splits becomes
child cards, one each.

**A parent waits for its children.** A card with children MUST NOT be done
while any child is neither done nor frozen as cancelled.

### When it ends

**Done cannot change; the way out is deletion.** The records standard holds
that a record stays complete and unaltered, so it still proves what
happened. A done card MUST NOT be edited once merged; it leaves the board
after the four deletion tests, and a frozen card too, once a living document
records why. Ninety quiet days in to do make a card stale.

## Check

Each rule, its code, its source and its check. No law requires any of it; it
is our choice.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| MSN-036 | Written down before it is done | — | by hand — the card's date against the work's first commit |
| MSN-037 | Done is stated before work starts | — (ours; Gherkin is a syntax for writing criteria and does not require them before work) | by hand — the section is checkable; whether it states a test is not |
| MSN-041 | Read whole, never by title | — | by hand — no trace tells a read from a skim; left a MUST, unauditable |
| MSN-001 | Five states, no others | — | `machine/guards/rules/std-004-the-header.mjs` (`HDR-004`) — the mission lifecycle |
| MSN-002 | Each state has its hand and its mark | [ISO/IEC 27001:2022, segregation of duties, control A.5.3](https://www.iso.org/standard/27001) (clause unverified) · [W3C PROV-O, startedAtTime and endedAtTime](https://www.w3.org/TR/prov-o/#startedAtTime) | by hand — no guard reads the stamp for the state yet |
| MSN-039 | Paused says why | — | by hand — no guard reads `freeze_reason` yet |
| MSN-003 | One doer | the responsibility assignment matrix (RACI), a convention, not a standard: exactly one Responsible | by hand — one name is a field; who edits is judgement |
| MSN-038 | A parent waits for its children | — | by hand — parent and child are declared in prose |
| MSN-004 | Done cannot change; the way out is deletion | [ISO 15489-1:2016, integrity, clause 5.2.2; disposition, clause 9.9](https://www.iso.org/standard/62542.html) (clauses unverified) | `machine/tools/check-deletable.mjs` for the exit; that done does not change, by hand |

| State | Field value | Who sets it | The mark it leaves |
|---|---|---|---|
| to do | `todo` | the Oracle | — |
| in progress | `in-progress` | the one doing it | `started` (PROV-O `startedAtTime`) |
| in review | `in-review` | the one doing it | `in_review_at` |
| done | `done` | the Oracle | `completed` (PROV-O `endedAtTime`) |
| frozen | `frozen` | the Oracle, from any state not yet final | `freeze_reason` (`cancelled` for a cancelled card) |

| In the reading | Exact form |
|---|---|
| the state | `status:` |
| its doer | `assigned_to:` |
| child cards | cards naming the parent; order by `depends_on:` |
| the closing notes | the card's Closure section |
| the four deletion tests | `ADR-030` |
| a living document records why | its name, title and freeze reason, in a living document |
| stale | ninety days in `todo` with no change: frozen or deleted at the next review |

## Why

Without these rules the board lies: work appears after it happened, cards
drift to match their outcome, two agents write one file, a parent closes
over an open child, and a finished card is quietly rewritten. Each rule
closes one way for a card to say something other than what occurred.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-004` | The header | the fields these rules set |
| `STD-018` | One document, one identifier | a card's name is permanent and never reused |
| `PRO-003` | Running a mission | how a mission is briefed, carried out and coordinated |
| `STD-007` | One page per document | the shape this file takes |
