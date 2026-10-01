---
id: "STD-038"
uid: ""
title: "The stages of a sale"
type: documentation
subtype: register
status: draft
version: "0.6.0"
created: "2026-09-28T13:00:00+02:00"
updated: "2026-10-01T15:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Sales"
tags: [standards, register, sales, pipeline, opportunity, stages, tenders, public-procurement, chance]
license: "CC0-1.0"
related: ["STD-039", "STD-040", "CAN-009", "CAN-011"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# The stages of a sale

> **Summary:** The seven states a sale passes through, from the first sign
> of a need to a signed agreement or a closed door: what each state means,
> the evidence that puts an opportunity there, who moves it, and how many
> days without movement make it stale. The closed list of reasons a sale is
> lost, from which stage the organisation is named, and — when the buyer is
> a public body that publishes a notice — which procedure it buys by and
> what each asks of a bidder, the four values of the house's chance, where a
> tender was read and what the buyer really buys. The standard of the opportunity record cites
> these values; the pipeline tool reads them here and nowhere else. A
> register records: nothing in it binds by itself.
> **Epistemic:** Which stages does a sale pass through, and what moves it?

## The stages

| Stage | Means | Evidence that puts an opportunity here | Moved by | Stale after |
|---|---|---|---|---|
| `lead` | someone showed a need, or the house chose to approach them | the record exists | whoever hears of it | 14 days |
| `qualified` | it fits what the house makes, and the house chose to pursue it | the fit question answered yes; the decision to pursue, with what is known of who signs and from which budget | whoever sells | 30 days |
| `analysed` | the need is understood, in the client's words | the four things written: objectives · learners and their devices · conditions · what the responsible will see, and at which level | whoever sells, with the specialist | 21 days |
| `proposed` | a proposal meeting the proposal standard has been sent | the proposal's path and a next date written | whoever sells, after the Oracle's approval | 21 days |
| `agreed` | the client said yes to the proposal; the agreement is being written | the client's yes, written in the record; the role of whoever signs for them | whoever sells | 30 days |
| `won` | the agreement is signed | the agreement's path and the closing date; the value handed to the ledger | the Oracle | — |
| `lost` | it will not happen | the closing date and a reason from the list below | whoever sells | — |

An opportunity moves forward one stage at a time, and from any open stage to
`lost`. `won` and `lost` are closed: a closed opportunity that reopens is a
new record that names the old one.

## Reasons a sale is lost

| Reason | Means |
|---|---|
| `not-a-fit` | what they need is not learnt by walking it, or not made of participation |
| `no-budget` | no budget line exists for it |
| `no-decider` | nobody who can sign was ever reached |
| `price` | they wanted it and would not pay what it costs |
| `timing` | they wanted it, later |
| `chose-another` | they bought it elsewhere |
| `silence` | two follow-ups unanswered |
| `we-declined` | the house chose not to pursue it |
| `outbid` | a tender: another bid scored higher |
| `excluded` | a tender: the bid was excluded, or the authority withdrew the tender |

## When the buyer publishes a notice

A public body buys by a procedure the law names, and the procedure decides
what a bidder must hold before the offer and how long the money takes
afterwards. A record whose source is a tender carries one of these values;
the thresholds are the 2026 ones.

| Procedure | Services, estimated value before tax | What it asks of the bidder | Source |
|---|---|---|---|
| `minor` | under 15,000 € | no notice: the authority asks for an offer and awards directly; no solvency to prove; the award is published quarterly — object, duration, amount, awardee | [LCSP](https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902) arts. 118, 63.4 |
| `simplified-abridged` | under 60,000 €, not for intellectual services | inscribed in the bidders' register (ROLECE), or the application filed before offers close; no solvency to prove; one envelope; at least ten working days to bid; criteria by formula only | LCSP art. 159.6 |
| `simplified` | under 140,000 € (the State) or 216,000 € (every other authority) | inscribed in ROLECE or the application filed; solvency as the terms ask — none asked below 35,000 € unless the terms say so; judgement criteria at most a quarter | LCSP art. 159.1–5; [RGLCAP](https://www.boe.es/buscar/act.php?id=BOE-A-2001-19995) art. 11.5; [Orden HAC/1517/2025](https://www.boe.es/buscar/doc.php?id=BOE-A-2025-26605) |
| `open` | any | solvency as the terms ask; the full dossier | LCSP arts. 156–158 |

Whatever the procedure, the authority pays within thirty days of accepting
the service, and owes interest from the thirty-first (LCSP art. 198.4).

A tender moves on the authority's clock, not the seller's: the offer closes
on a day the notice names, and the award comes when the authority decides.
So a tender at `proposed` is never stale, only overdue — its next date is
the day to look for the award. The stages read the same as any sale:
`lead` when the notice is seen, `qualified` when the house decides to bid,
`analysed` when the terms have been read into the four things, `proposed`
when the offer is filed and the receipt is the evidence, `agreed` when the
authority proposes the house as awardee, `won` when the contract is
formalised, `lost` with `outbid` or `excluded`.

## The house's chance

How likely the house is to get the money, read from the call's criteria
against the house's own cards — the one for tenders and the one for grants.
A tender record and a grant record carry one of these values; the grant
register reads them from this table.

| Chance | Means |
|---|---|
| `high` | every requirement is met, the money fits the house's cash, and the competition is bounded |
| `medium` | every requirement is met; what stands in the way is competition, or one fact still unknown |
| `low` | eligible on paper, but blocked by a requirement the house can only meet with a partner or a change |
| `none` | a hard requirement fails: the reason is the failed row of the criteria |

## Where a tender was read

A summary is not the tender. Aggregators and alert e-mails paraphrase a
title and can invent the object; only the authority's own documents say
what it buys.

| Read from | Means |
|---|---|
| `terms` | the authority's own administrative and technical terms, downloaded and read |
| `notice` | the notice on the authority's profile or the procurement platform, not yet the terms |
| `aggregator` | a third party's summary only |

## What the buyer really buys

Read from the technical terms, never from the title or the code.

| Object | Means |
|---|---|
| `build` | something the house designs and develops: a world, a game, an interactive piece |
| `deliver` | something the house runs: a workshop, an event, a gamified training |
| `resale` | another maker's product, a licence or hardware the house would only pass on |
| `other` | what the house does not make: teaching, managing a centre, children's entertainment, corporate communication |

## Naming the organisation

The house works in the open, and says so in every proposal. The record
names the organisation when the organisation knows it may be named.

| When | The organisation is written as |
|---|---|
| before a proposal is sent, or when the client was never told | its sector and size: *a large retailer*, *a provincial police force* |
| from the proposal sent, told in it, and the client did not ask otherwise | its name |
| the client asked not to be named, at any stage | its sector and size |
| `lost`, always | its sector and size — the reason is public, the name is not |

Records are public and hold nobody's name at any stage; they are kept as
they stand, since the statistics are made from them. A buyer bound by
public procurement is named only when it has been told, like any other:
what a contracting authority itself publishes about a minor contract —
object, duration, amount, awardee — is public in any case once awarded.
A tender's notice is already public, so the record links it; the house's
own price is not written until the authority publishes the award, since a
bidder's offer is confidential until then (LCSP art. 133).
