---
id: "STD-040"
uid: ""
title: "A proposal says four things"
type: documentation
subtype: standard
status: draft
version: "0.4.1"
created: "2026-09-28T13:00:00+02:00"
updated: "2026-10-02T12:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Sales"
tags: [standards, sales, proposal, learning-services, training, evaluation]
license: "CC0-1.0"
related: ["STD-039", "STD-038", "STD-033", "CAN-011", "LEG-002"]
derived_from: "CAN-011"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A proposal says four things

> **Summary:** Before a proposal leaves the house it says what the client
> will be able to do afterwards, why the house can deliver it, how it will
> teach and how it will measure, and what it costs on what terms. It answers
> the three questions any charge must answer, it is read by whoever sends
> it, and one record renders both the document and the page.
> **Epistemic:** What must a proposal contain before it is sent?
> **Pragmatic:** Write a proposal from the mould and check it against nine
> rules before it is sent. This is not legal advice.
> **Audience:** Agents · Oracles

**Binds:** every proposal for a service that Numen Games sends to an
organisation, and whoever writes, reviews or approves one.

## Rules

### The four things

**Objectives, in the client's words.** A proposal MUST state what the
learners will be able to do when it is over, in the words the client used
to say it, and for whom: how many, what they know already, and from which
devices they will enter.

**Capacity, shown.** A proposal MUST show the house can deliver: at least one
earlier case with the client unnamed, the profile of whoever will facilitate,
and what the technology requires of the client. A demonstration is built
before signing only when no earlier case can be shown.

**How it teaches, and how it measures.** A proposal MUST describe the
experience on one page the client recognises as their own procedure, name
the level at which learning will be judged — that they liked it, that they
learnt it, that they do it at work, or that a figure of the organisation
moved — with its indicator, and say what trace each learner leaves.

**Price, terms and conditions.** A proposal MUST state the price with tax
visible, the dates, what is delivered and under which licence, when it is
invoiced, and the house's terms that will govern the agreement.

### Before it is sent

**What the client must know first.** A proposal MUST let the client read,
before agreeing, the title and objectives, any prerequisite of competence
or technology, how the service will be delivered and assessed, and how it
ends: everything the international standard for learning services lists
as information owed before acquisition.

**The three questions answered.** A proposal MUST answer, inside itself,
what whoever pays takes away, where that is written, and whether the whole
price can be seen.

**Read before it is sent.** A proposal MUST be read against these rules by
whoever sends it, who is never its writer alone; sending it is the approval.
The evidence is the opportunity record's transition to proposed, dated and
signed by whoever sent it — no field in the proposal says so twice. Who
signs the agreement is written in the agreement, which is where signatures
live.

**In the open, said first.** A proposal MUST end by telling the client
that the house works in the open and publishes its proposals, and that
the client may ask not to be named. What the house offers and at what
price is the house's to publish; the client's name is theirs to withhold.

**One record, two renderings.** A proposal MUST be one file from which the
document sent and any page shown to the client are both rendered. Neither
is edited on its own.

**Kept with its opportunity.** A sent proposal MUST be kept, unchanged,
beside the opportunity record that points to it. A revised proposal is a
new file; the record points to the current one. It opens with the header
every document carries: draft while it is written, active once sent,
withdrawn when a revision replaces it or it lapses unanswered.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| PRP-001 | Objectives, in the client's words | [ISO 29993:2017](https://www.iso.org/standard/70357.html) 5.2 a), 7 needs analysis (clause 7 unverified) | `machine/packages/sales-kit/pipeline.mjs` `--proposals`: the section exists and is not the mould's text; by hand for the words |
| PRP-002 | Capacity, shown | [ISO 29993:2017](https://www.iso.org/standard/70357.html) 5.2 b) | `pipeline.mjs --proposals`: the section exists; by hand |
| PRP-003 | How it teaches, and how it measures | [ISO 29993:2017](https://www.iso.org/standard/70357.html) 5.2 c); [Kirkpatrick, the four levels](https://www.kirkpatrickpartners.com/the-kirkpatrick-model/) | `pipeline.mjs --proposals`: the section exists and names a level from the four; by hand for the map |
| PRP-004 | Price, terms and conditions | [ISO 29993:2017](https://www.iso.org/standard/70357.html) 5.2 d), 14 invoicing (clause 14 unverified); `STD-033` PAY-001 | `pipeline.mjs --proposals`: the section exists and states a tax rate; by hand |
| PRP-005 | What the client must know first | [ISO 29993:2017](https://www.iso.org/standard/70357.html) 6 (items beyond title, objectives and prerequisites unverified) | by hand, at the review |
| PRP-006 | The three questions answered | `CAN-011` | `pipeline.mjs --proposals`: the three answers present; by hand for their truth |
| PRP-007 | Read before it is sent | [ISO 9001:2015](https://www.iso.org/standard/62085.html) 8.2.3, review before committing to supply (clause unverified) | `pipeline.mjs`: a record at `proposed` has a transition row to it with a date and a name in *By*; the reading itself, by hand |
| PRP-010 | In the open, said first | customer-reference practice (consent to be named, withdrawable); `CAN-009` | `pipeline.mjs --proposals`: the section *In the open* exists |
| PRP-008 | One record, two renderings | `CAN-009` | by hand until a renderer exists |
| PRP-009 | Kept with its opportunity | [ISO 15489-1:2016](https://www.iso.org/standard/62542.html) (clause unverified) | `pipeline.mjs`: a proposed record's `proposal` path resolves |

## Why

Numen Games has lost sales it could have won because there was nothing
ready to send, and what was sent promised feelings rather than a result
anyone could check. The international standard for learning services says
in four lines what a proposal owes a buyer; the four-level model says how
a result is judged. A proposal that carries both stops being a brochure and
becomes a thing a client can hold the house to — which is the only kind a
client signs.

## References

| ID | Name | Why cited |
|---|---|---|
| `CAN-011` | What has value also makes a bond | the three questions every proposal answers |
| `STD-039` | An opportunity has a record | the record a proposal is kept beside |
| `STD-038` | The stages of an opportunity | the stage a sent proposal puts a sale in |
| `STD-033` | Every charge delivers something | the whole price, tax visible |
| `LEG-002` | Terms and conditions (Numen Games) | the house's terms a proposal names |
