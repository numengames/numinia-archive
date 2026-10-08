---
id: "register-fixture"
title: "The stages of an opportunity — a fixture of the register's tables"
type: meta
status: active
version: "0.1.0"
created: "2026-10-02T12:00:00+02:00"
updated: "2026-10-02T12:00:00+02:00"
license: "CC0-1.0"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A fixture of STD-038's tables

The tables the pipeline tool reads, as the spec of 2 October 2026 sets
them, so the kit's tests run whatever the real register says that day.

## The kinds

| Kind | Is | Stale after |
|---|---|---|
| `sale` | a client buys what the house makes | 21 days |
| `tender` | a public buyer's call for offers | — |
| `grant` | public money that is not a sale: grant, loan, prize, programme | — |
| `collaboration` | work done with or for someone for no money or little; what comes back is written | 30 days |
| `partner` | another organisation the house bids or sells beside | 21 days |

## The stages

| Kind | Stage | Means | Evidence that puts a record here |
|---|---|---|---|
| `sale` | `lead` | someone showed a need, or the house chose to approach them | the record exists |
| `sale` | `qualified` | it fits what the house makes, and the house chose to pursue it | the fit question answered yes |
| `sale` | `analysed` | the need is understood, in the client's words | the four things written |
| `sale` | `proposed` | a proposal has been sent | the proposal's path |
| `sale` | `agreed` | the client said yes to the proposal | the client's yes; the role of whoever signs |
| `sale` | `won` | the agreement is signed | the agreement's path |
| `sale` | `lost` | it will not happen | a reason from the list |
| `tender` | `found` | the notice is seen | the record exists |
| `tender` | `read` | the terms are read, the criteria written | the criteria table |
| `tender` | `bidding` | the house decided to bid; the dossier in preparation | the decision line |
| `tender` | `filed` | the offer is filed | the receipt |
| `tender` | `awarded` | the house is proposed as awardee | the proposal of award |
| `tender` | `won` | the contract is formalised | the contract |
| `tender` | `lost` | it will not happen | a reason from the list |
| `grant` | `foreseen` | the call is expected | the record exists, its days estimated |
| `grant` | `open` | the call is published | the extract in the gazette |
| `grant` | `applied` | the application is filed | the receipt |
| `grant` | `granted` | the funder resolved in the house's favour | the resolution |
| `grant` | `justified` | the work is justified | the justification's receipt |
| `grant` | `won` | paid: the money in the bank | the payment |
| `grant` | `lost` | denied, or the house declined | a reason from the list |
| `collaboration` | `lead` | someone proposed working together | the record exists |
| `collaboration` | `agreed` | both said yes | the agreed terms |
| `collaboration` | `won` | done; what came back written | gives_back or the line |
| `collaboration` | `lost` | it will not happen | a reason from the list |
| `partner` | `lead` | a possible partner seen | the record exists |
| `partner` | `talking` | the conversation is open | an answer |
| `partner` | `agreed` | the split agreed: who signs, who does what, the house's share | the agreement |
| `partner` | `filed` | the joint offer filed with the house named | the receipt |
| `partner` | `won` | the joint offer won | the award |
| `partner` | `lost` | it will not happen | a reason from the list |

## The events

| Event | Means | Step it marks |
|---|---|---|
| `found` | the house detected it | detected |
| `out` | something the house did towards the other side | contacted |
| `pos` | the other side answered yes, without closing | positive |
| `neg` | the other side answered no, without closing | — |
| `won` | closed in the house's favour | won |
| `lost` | closed against, with a reason | — |
| `next` | the one planned step | — |

## The steps

| Step | Means |
|---|---|
| `detected` | the house found it |
| `contacted` | the house acted towards the other side |
| `positive` | the other side said yes to something |
| `won` | closed in the house's favour |
| `again` | another record follows it: a repeat or a referral |

## Reasons an opportunity is lost

| Reason | Means |
|---|---|
| `not-a-fit` | not what the house makes |
| `no-budget` | no budget line exists for it |
| `no-decider` | nobody who can sign was reached |
| `price` | they would not pay what it costs |
| `timing` | they wanted it, later |
| `chose-another` | they bought it elsewhere |
| `silence` | two follow-ups unanswered |
| `we-declined` | the house chose not to pursue it |
| `outbid` | another bid or application scored higher |
| `excluded` | excluded, or the call withdrawn |
| `not-eligible` | a condition of who may apply fails |
| `no-cash` | the house cannot carry the work until paid |

## How it pays

| Pays | Means |
|---|---|
| `advance` | all or part before the work; `advance` says which share |
| `milestones` | in parts as the work is delivered |
| `on-delivery` | once, when the work is accepted |
| `on-justification` | after the work is justified |
| `in-kind` | no money changes hands |
| `to-ask` | not yet known: the next conversation asks it |

## What the funder gives

| Instrument | Means |
|---|---|
| `grant` | money not paid back |
| `loan` | money lent on soft terms |
| `prize` | money for what was already done |
| `programme` | services, not money |

## The sources

| Source | Means |
|---|---|
| `referral` | someone sent them |
| `inbound` | they came to the house |
| `outbound` | the house went to them |
| `event` | met at an event |
| `platform` | a procurement platform or an official gazette |

## The doors

How the house first reached the other side (`STD-048`); which doors are
open in each country is `STD-049`. An e-mail goes only through `published`,
`asked`, `inbound` or `former-client`.

| Door | Means |
|---|---|
| `published` | the organisation published a channel to receive exactly this: a call, a tender, a request for suppliers, partners, sponsors or speakers |
| `call` | a person phoned the organisation's published number |
| `letter` | a letter by post to the organisation |
| `in-person` | met in person, at an event or a visit |
| `introduction` | someone both sides know introduced the house |
| `asked` | they asked to hear from the house, and the yes is kept |
| `inbound` | they came to the house first |
| `former-client` | a client of the house, about services like the ones they bought |

## When the buyer publishes a notice

| Procedure | Services, estimated value before tax | What it asks of the bidder | Source |
|---|---|---|---|
| `minor` | under 15,000 € | no notice | LCSP art. 118 |
| `simplified-abridged` | under 60,000 € | ROLECE or its application | LCSP art. 159.6 |
| `simplified` | under 140,000 € or 216,000 € | ROLECE; solvency as asked | LCSP art. 159.1–5 |
| `open` | any | the full dossier | LCSP arts. 156–158 |

## Where a call was read

| Read from | Means |
|---|---|
| `terms` | the buyer's or funder's own terms or bases |
| `notice` | the notice or extract, not yet the terms |

## What the buyer really buys

| Object | Means |
|---|---|
| `build` | something the house designs and develops |
| `deliver` | something the house runs |

## The house's chance

| Chance | Means |
|---|---|
| `high` | in a line the house sells, and the house has won in that line before |
| `medium` | one of the two |
| `low` | neither |
