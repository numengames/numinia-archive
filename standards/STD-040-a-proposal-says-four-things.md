---
id: "STD-040"
uid: ""
title: "A proposal says four things"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-09-28T13:00:00+02:00"
updated: "2026-09-28T13:00:00+02:00"
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
> the three questions any charge must answer, it is reviewed before it is
> sent, and one record renders both the document and the page.
> **Epistemic:** What must a proposal contain before it is sent?
> **Pragmatic:** Write a proposal from the mould and check it against ten
> rules before the Oracle sees it. This is not legal advice.
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

**Reviewed before commitment.** A proposal MUST be checked against these
rules by someone other than its writer, and approved by the Oracle, before
it is sent. The review is noted in the opportunity record.

**One record, two renderings.** A proposal MUST be one file from which the
document sent and any page shown to the client are both rendered. Neither
is edited on its own.

**Kept with its opportunity.** A sent proposal MUST be kept, unchanged,
beside the opportunity record that points to it. A revised proposal is a
new file; the record points to the current one.

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
| PRP-007 | Reviewed before commitment | [ISO 9001:2015](https://www.iso.org/standard/62085.html) 8.2.3, review before committing to supply (clause unverified) | by hand: the review row in the opportunity record's transitions |
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
| `STD-038` | The stages of a sale | the stage a sent proposal puts an opportunity in |
| `STD-033` | Every charge delivers something | the whole price, tax visible |
| `LEG-002` | Terms and conditions (Numen Games) | the house's terms a proposal names |
