---
id: "ADR-059"
uid: ""
title: "A canon for the work: the archive is the organisation"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-24T16:00:00+02:00"
updated: "2026-09-24T16:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, archive, work, agents]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "CAN-009 is created: the organisation's memory is plain text in a public repository; a document is a claim and history is the record; only the three series of the axis oblige; work is a change to the text; a digital agent is a citizen bound by the same documents. It states as canon the reasoning that four standards carried in their Why sections and no canon owned."
related: ["CAN-009", "STD-024", "STD-009", "STD-020", "STD-006", "STD-012", "ADR-049"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-059 — A canon for the work

> **Summary:** The canon said what Numinia is and how it is told, and
> nothing about how the work is done. The reasoning existed, in pieces, under
> four standards. It is now one canon.
> **Epistemic:** Measured: 26 of 41 standards and protocols cite no canon,
> because there was none to cite.
> **Pragmatic:** A newcomer, person or agent, reads one document and knows
> what obliges them, what wins a conflict, and what a change costs.
> **Audience:** Agents · Oracles

---

## 1. Context

The canon series was read as a whole on 2026-09-23. Its eight documents fell
into three groups — the world (why it is narrated), the people (who lives
here), the house (what Numen Games is and how it shows) — and left a fourth
empty: **the work**. The archive's own name on the site is *NWOS, the archive
of Numen Games*, and no canon said what the archive is or why the company
works this way.

Measured on the tree:

| | |
|---|---|
| standards and protocols that cite no canon | 26 of 41 |
| *document* in standards + protocols / in canon | 228 / 5 |
| *git* | 149 / 13 |
| *guard* | 157 / 3 |
| *mission* | 111 / 4 |
| *agent* | 204 / 11 |

The reasoning was not missing; it was scattered. Four standards carry, in
their Why sections, one sentence each of what amounts to a founding belief:
*the file outlives every application that reads it* (`STD-006`); *who
committed what, and when, cannot be changed at any price worth paying*
(`STD-020`); *an archive that only adds becomes larger than any reader can
hold* (`STD-012`); *the corpus is read by agents that must know, without
asking, whether a sentence binds them* (`STD-024`). Together with the
precedence order of `STD-009`, that is a canon nobody had written. The
Oracle's word on 2026-09-24: *el de trabajo lo tenemos que hacer*.

The digital agent sat in the same gap. Two canons mention it in passing —
*biological or digital*, *including that of digital agents* — and five
protocols govern its sessions, missions, escalation and reviews. No canon
said that an agent is a citizen, bound like one and stopping where the rank
requires.

## 2. Decision

**`CAN-009` is created at `1.0.0`, *The archive is the organisation*.** It
binds every document of the archive, every change to it, and whoever works
from it. Five claims, each with its reasoning:

- **The memory is a text.** Plain text in a public repository, one document
  per file; every reader reads the file and never owns it. Not a format
  preference — the condition for the rest.
- **A document is a claim; the history is the record.** Nothing is true for
  being written here. History wins over document, direction decides between
  document and code, the costlier document wins between two, and no document
  holds authority by saying so.
- **Only what lives in the axis obliges.** Canon says why, a standard what an
  artefact must satisfy, a protocol how an actor acts; everything else
  records. An obligation elsewhere is a plan until a standard sustains it. A
  draft is quoted against nobody.
- **Work is a change to the text.** The change is the work, not its
  by-product; what left no change was a conversation. The text is what the
  guards check; every record has an exit, so the archive rolls up and does
  not grow.
- **An agent is a citizen.** Guild, rank, name, a place on the board, the
  same documents and the same records. Not a tool the organisation uses. It
  has no last word: where a change is irreversible or the rule itself is at
  stake, it stops — and stopping is the rank speaking. Every document is
  written for the two readers at once.

It closes with what a reader can do: tell on sight whether a sentence
obliges them, settle a conflict without asking, refuse a change that leaves
no record, and read a missing answer as a gap rather than a reason to ask
around.

**No rule moves.** The standards keep their plates and their Why sections;
the canon states the belief the plates apply. It names no tool, no clock,
no vendor: *git* appears as the name of the history, which is how the
archive itself names it in a standard's title, and *guards* as what checks
the text.

**It enters the reading order** after the canon of function and structure
and before the canon of the house: what this place is → why the fiction
works → how it works underneath → how the work is done → what the house is →
who lives here → what you may take. The reading note is rewritten to match.

Body: 945 words, budget 1 500.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Leave the reasoning in the four Why sections | A newcomer reads a standard only when a guard sends them there; the belief that makes the standards coherent is then met last, in pieces, or never. Measured: 26 of 41 rule documents had no canon to point at |
| Make it a standard | It plates nothing; it says why the plates are as they are. By the mould's own test it is canon: decided, not described; not falsifiable by a decision; executed by no one |
| Put the agent-as-citizen claim in `CAN-004` | That canon says what an agent is made of; this one says what it may do and where it stops. The line between them is attribute and obligation |
| Two canons — the archive and the agent | The agent is a citizen *because* the memory is a text anyone can read and act on. Split, the second canon has no ground |
| Name the axis documents by identifier in the body | Identifiers stay in `related:` and the References table; the body names the thing (ADR-049 style) |

## 4. Consequences

- **Obliges:** nothing that was not already in force by a standard; it
  gives those obligations their reasoning and one place to cite.
- **Costs:** the canon series returns to eight documents; the reading order
  and the site's rule index change; `AGENTS.md`'s canon line reads
  `CAN-001…CAN-009` with `CAN-003` absorbed.
- **Follow-up, not decided here:** the 26 rule documents with no canon
  citation may add `CAN-009` to `related:` as each is next touched — not in
  a sweep.
- **Reversal:** delete the file; nothing else depends on it yet.

## 5. Status

Proposed. It takes effect when the Oracle approves the pull request that
carries it.
