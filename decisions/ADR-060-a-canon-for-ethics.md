---
id: "ADR-060"
uid: ""
title: "A canon for ethics, opened in draft: leave things better than you found them"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-24T17:00:00+02:00"
updated: "2026-09-24T17:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, ethics, conduct]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "CAN-010 is created at 0.1.0, in draft and said to be so in its body: the house's ethics is the sentence that closes every canon — leave things better than you found them — applied to people, their data, the commons and the acts of a digital agent. It infers four commitments from what the corpus already holds and states no rule of its own; the Oracle asked for it short, open and inferred, to be argued with."
related: ["CAN-010", "CAN-002", "CAN-005", "CAN-009", "STD-029", "ADR-052", "ADR-059"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-060 — A canon for ethics, opened in draft

> **Summary:** The Oracle's note on the canon of brand and culture called it
> *a first step towards an ethical construction*, and asked that the
> construction be its own canon — short, in draft, inferred from the corpus.
> This opens it.
> **Epistemic:** What the corpus already commits to, read as one belief
> instead of four rules.
> **Pragmatic:** A place to argue the ethics of the house, with a text on the
> table.
> **Audience:** Agents · Oracles

---

## 1. Context

Reviewing `CAN-002` on 2026-09-23 the Oracle wrote: *primer paso hacia
construcción ética*. On 2026-09-24, asked whether the ethical construction
belonged in the next revision of that canon, he answered that it should be a
new canon of its own — *que sea cortito, que ponga que está en draft, que
infiera lo que ya hay en el resto del corpus*.

What the corpus already holds, read for this:

| Commitment | Where it is in force |
|---|---|
| Respect is unconditional; harassment ends participation; disagreement is wanted | `STD-029` CMS-001..007 |
| A person's data is their property: consent, minimal capture, portability | `STD-026` *data dignity*, *digital sovereignty*; `OPS-010` written from a measured inventory |
| Opening is irreversible; silence does not declare; the name is never opened | `CAN-005`; `STD-014` PUB-001..005 |
| No secret is written; an exposure is rotated before it is recorded | `STD-022` |
| An agent stops where a change is irreversible or the rule is at stake | `CAN-009` (proposed, `ADR-059`); five protocols |
| *Humans are not the problem*; *leave things better than we found them* | `CAN-008`, `CAN-002` — the sentence closes both |

Every one of these is a rule somewhere. None of them says what it is a rule
*for*. The sentence that closes the canons does, and nobody had made it the
subject.

## 2. Decision

**`CAN-010` is created at `0.1.0`, *Leave things better than you found
them*.** It binds whoever acts in Numinia's name, biological or digital.

It says that the closing sentence of the house is its ethics — a direction,
a before and after, and a burden on the one acting — and that the four
values of the house are what *better* means. It applies the sentence to four
things: **people** (the conduct standard's terms, and why they are the
terms), **their data** (property: consent, minimum, portability; where the
law asks less, the house does not take the difference), **the commons**
(a licence is a promise; silence does not declare), and **the acts of a
digital agent** (a citizen held to all of it, plus one commitment: it does
not decide for people where the decision is theirs, and what it refuses is
recorded too). It closes with one test to run before an act.

**It is opened in draft and says so in its body**, in a note under the card:
a first statement, inferred, to be argued with; where a commitment is
missing, that is the argument to have. This is the Oracle's instruction, and
it is also `PRE-006`: a draft states an intention and is quoted against
nobody. The note is the one place a canon of this house names its own
status, and it goes when the status does.

**It states no rule of its own.** Every commitment it names is already in
force in a standard or a canon; the References table points at each. The
canon says why; the plates stay where they are.

Body: 667 words. Version `0.1.0`, not `1.0.0`: the Oracle asked for a draft
to argue with, and the number should say so.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Write the ethics into `CAN-002`'s next revision | The Oracle chose a separate canon. `CAN-002` says what the house believes; this says what that belief obliges of an act. Together they would be the compilation document `ADR-052` split |
| Wait for the ethics to be decided before writing | The instruction was the opposite: put an inferred text on the table so there is something to argue with. An empty canon invites nothing |
| Make it a standard, since conduct binds an actor | The conduct terms are already a standard (`STD-029`). This is the reason behind them and behind three other standards; it plates nothing |
| Cover more — sustainability, pay, AI training data | Not in the corpus yet. Inferring beyond what is written would be inventing; the draft note says the missing ones are the argument |
| Open at `1.0.0` like `CAN-009` | `CAN-009` states what is already practised; this states what the house has not yet argued out. `0.1.0` is the honest number |

## 4. Consequences

- **Obliges:** nothing new. It gives four existing obligations their common
  reason and one place to cite it.
- **Costs:** the canon series counts nine documents; the reading order and
  the rule index change. A draft note in a canon body is a form the series
  did not have; it is temporary by its own terms.
- **Follow-up:** the Oracle's argument with the text. Promotion out of
  `0.x` records what was added or refused.
- **Reversal:** delete the file.

## 5. Status

Proposed, as a draft to be argued with. It takes effect — as a draft — when
the Oracle approves the pull request that carries it.
