---
id: "STD-038"
uid: ""
title: "The stages of an opportunity"
type: standard
subtype: register
status: draft
version: "0.11.0"
created: "2026-09-28T13:00:00+02:00"
updated: "2026-10-08T14:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Sales and partners"
tags: [standards, register, sales, pipeline, opportunity, stages, timeline, funnel, tenders, grants, public-procurement, chance]
license: "CC0-1.0"
related: ["STD-039", "STD-040", "OPS-018", "PRO-035", "PRI-009", "PRI-011", "STD-048", "STD-049"]
derived_from: "PRI-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# The stages of an opportunity

> **Summary:** The five kinds of opportunity — a sale, a tender, a grant, a
> collaboration, a partner — and the stages each passes through, from the
> day it is found to won or lost: what each stage means and which line of
> the record's timeline puts it there. The events a timeline is written in,
> the five steps of the funnel they mark, the closed list of reasons an
> opportunity is lost, how the money arrives, what a funder gives, where an
> opportunity came from, and — for a call from a public body — the
> procedure it buys by, where it was read and what it really buys; and the
> house's chance of any open opportunity. The record standard cites these values; the pipeline tool
> reads them here and nowhere else. A register records: nothing in it binds
> by itself.
> **Epistemic:** Which stages does an opportunity pass through, and what moves it?

## The kinds

Each kind keeps its own stages. A sale, a collaboration and a partner move
on the house's clock, so a record left without a line goes stale; a tender
and a grant move on the other side's clock — the day the call closes, the
day it resolves — so they are only ever overdue, never stale.

| Kind | Is | Stale after |
|---|---|---|
| `sale` | a client buys what the house makes | 21 days |
| `tender` | a public buyer's call for offers | — |
| `grant` | public money that is not a sale: a grant, a loan, a prize, a programme | — |
| `collaboration` | work done with or for someone for no money or little; what comes back is written | 30 days |
| `partner` | another organisation the house bids or sells beside | 21 days |

## The stages

Every record starts at its kind's first stage, on the day of its `found`
line. A line of the timeline whose text begins with a stage of the record's
kind, in backticks, moves the record to that stage on that day. Stages only
move forward; a `won` or `lost` line closes the record. A closed record
that reopens is a new record that names the old one.

| Kind | Stage | Means | Evidence that puts a record here |
|---|---|---|---|
| `sale` | `lead` | someone showed a need, or the house chose to approach them | the `found` line |
| `sale` | `qualified` | it fits what the house makes, and the house chose to pursue it | a line marked `qualified`: the fit question answered yes; the decision to pursue, with what is known of who signs and from which budget |
| `sale` | `analysed` | the need is understood, in the client's words | a line marked `analysed`; the four things written in the Need: objectives · learners and their devices · conditions · what the responsible will see, and at which level |
| `sale` | `proposed` | a proposal meeting the proposal standard has been sent | an `out` line marked `proposed`; the proposal's path in the header |
| `sale` | `agreed` | the client said yes to the proposal; the agreement is being written | a `pos` line marked `agreed`; the role of whoever signs for them |
| `sale` | `won` | the agreement is signed | the `won` line; the agreement's path; the value handed to the ledger |
| `sale` | `lost` | it will not happen | the `lost` line and a reason from the list below |
| `tender` | `found` | the notice has been seen | the `found` line |
| `tender` | `read` | the terms are read and the criteria written | a line marked `read`; the criteria table, every row yes or check |
| `tender` | `bidding` | the house decided to bid; the dossier is in preparation | a line marked `bidding`, with the Oracle's decision |
| `tender` | `filed` | the offer is filed | an `out` line marked `filed`; the platform's receipt |
| `tender` | `awarded` | the authority proposed the house as awardee | a `pos` line marked `awarded`; the award proposal |
| `tender` | `won` | the contract is formalised | the `won` line |
| `tender` | `lost` | another bid won, the offer was excluded, or the house let it go | the `lost` line and a reason from the list below |
| `grant` | `foreseen` | the call is expected: last year's, or a funder's plan of subsidies | the `found` line; the days marked estimated |
| `grant` | `open` | the call is published and accepting applications | a line marked `open`; the extract in the official gazette |
| `grant` | `applied` | the application is filed | an `out` line marked `applied`; the e-office's receipt |
| `grant` | `granted` | the funder resolved in the house's favour | a `pos` line marked `granted`; the resolution and the amount |
| `grant` | `justified` | the work is done and its justification filed | an `out` line marked `justified`; the justification's receipt |
| `grant` | `won` | paid: the money is in the bank | the `won` line; the amount handed to the ledger |
| `grant` | `lost` | denied, or the house declined | the `lost` line and a reason from the list below |
| `collaboration` | `lead` | someone proposed working together, or the house did | the `found` line |
| `collaboration` | `agreed` | both sides said what each gives | a `pos` line marked `agreed` |
| `collaboration` | `won` | done; what came back is written in `gives_back` or the line | the `won` line |
| `collaboration` | `lost` | it will not happen | the `lost` line and a reason from the list below |
| `partner` | `lead` | an organisation to bid or sell beside has been found | the `found` line |
| `partner` | `talking` | the other side answered and the two are talking | a `pos` line marked `talking` |
| `partner` | `agreed` | the split is agreed: who signs, who does what, the house's share | a `pos` line marked `agreed`; the share as the value |
| `partner` | `filed` | the joint offer, or the partner's with the house named, is filed | a line marked `filed`; the receipt |
| `partner` | `won` | the joint offer won | the `won` line |
| `partner` | `lost` | it will not happen | the `lost` line and a reason from the list below |

## The events

A timeline line is `- YYYY-MM-DD · event · text`, the three parts joined by
a middle dot between spaces. The event is one of these.

| Event | Means | Step it marks |
|---|---|---|
| `found` | the house detected it; the first line, and only one | `detected` |
| `out` | something the house did towards the other side: a contact, a proposal or an offer filed, an application, an e-mail | `contacted` |
| `pos` | the other side answered in favour, without closing | `positive` |
| `neg` | the other side answered against, without closing | — |
| `won` | closed in the house's favour: signed, formalised, paid, done, the joint offer won | `won` |
| `lost` | closed against; the text begins with a reason from the list below | — |
| `next` | the one planned step: the last line of an open record, absent from a closed one | — |

## The steps

The funnel every kind shares, read from the events. It is AARRR adapted to
selling — acquisition is detected and contacted, activation is positive,
revenue is won, retention and referral are again (Dave McClure, "Startup
Metrics for Pirates", 2007). A later step counts the earlier ones too.

| Step | Means |
|---|---|
| `detected` | the record exists: it has its `found` line |
| `contacted` | the house did something towards the other side: an `out` line |
| `positive` | the other side answered in favour: a `pos` or a `won` line |
| `won` | closed in the house's favour: a `won` line |
| `again` | another record names it in `follows`: a repeat, or a referral |

## Reasons an opportunity is lost

| Reason | Means |
|---|---|
| `not-a-fit` | what they need is not learnt by walking it, or not made of participation; or the call funds what the house does not make |
| `no-budget` | no budget line exists for it |
| `no-decider` | nobody who can sign was ever reached |
| `price` | they wanted it and would not pay what it costs |
| `timing` | they wanted it, later; or the day came before the dossier could |
| `chose-another` | they bought it elsewhere |
| `silence` | two follow-ups unanswered |
| `we-declined` | the house chose not to pursue it |
| `outbid` | another bid or application scored higher |
| `excluded` | the bid or the application was excluded, or the call withdrawn |
| `not-eligible` | a condition of who may apply fails |
| `no-cash` | the house cannot carry the work until it is paid, or put in its share |

## How it pays

How and when the money arrives decides whether a house with no cushion can
take the work at all.

| Pays | Means |
|---|---|
| `advance` | all or part before the work; the record's `advance` says which share |
| `milestones` | in parts as the work is delivered; `advance` says the share before it starts |
| `on-delivery` | once, when the work is delivered and accepted |
| `on-justification` | after the work is done and justified; the house carries it until then |
| `in-kind` | no money changes hands: services, visibility, a case |
| `to-ask` | not yet known: the next conversation asks it |

The General Subsidies Law pays after justification unless the bases allow
an advance (Law 38/2003, art. 34.4); the bases decide. A public buyer pays
within thirty days of accepting the service, and owes interest from the
thirty-first (LCSP art. 198.4).

## What the funder gives

| Instrument | Means |
|---|---|
| `grant` | money that is not paid back, if the work is done as promised |
| `loan` | public money lent on soft terms: paid back |
| `prize` | money for what was already done; no work to justify after |
| `programme` | services, not money: incubation, mentoring, space, credits |

## The sources

| Source | Means |
|---|---|
| `referral` | someone who knows the house sent them |
| `inbound` | they came to the house: a form, an e-mail, a call |
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

A public body buys by a procedure the law names, and the procedure decides
what a bidder must hold before the offer. A tender record carries one of
these values; the thresholds are the 2026 ones.

| Procedure | Services, estimated value before tax | What it asks of the bidder | Source |
|---|---|---|---|
| `minor` | under 15,000 € | no notice: the authority asks for an offer and awards directly; no solvency to prove; the award is published quarterly — object, duration, amount, awardee | [LCSP](https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902) arts. 118, 63.4 |
| `simplified-abridged` | under 60,000 €, not for intellectual services | inscribed in the bidders' register (ROLECE), or the application filed before offers close; no solvency to prove; one envelope; at least ten working days to bid; criteria by formula only | LCSP art. 159.6 |
| `simplified` | under 140,000 € (the State) or 216,000 € (every other authority) | inscribed in ROLECE or the application filed; solvency as the terms ask — none asked below 35,000 € unless the terms say so; judgement criteria at most a quarter | LCSP art. 159.1–5; [RGLCAP](https://www.boe.es/buscar/act.php?id=BOE-A-2001-19995) art. 11.5; [Orden HAC/1517/2025](https://www.boe.es/buscar/doc.php?id=BOE-A-2025-26605) |
| `open` | any | solvency as the terms ask; the full dossier | LCSP arts. 156–158 |

## Where a call was read

A summary is not the call. Aggregators and alert e-mails paraphrase a title
and can invent the object; only the buyer's or the funder's own documents
say what it buys or funds. A call known only from a summary is not
recorded.

| Read from | Means |
|---|---|
| `terms` | the authority's own administrative and technical terms, or the call's bases, downloaded and read |
| `notice` | the notice on the authority's profile, the procurement platform or the gazette, not yet the terms |

## What the buyer really buys

Read from the technical terms, never from the title or the code. A tender
for another maker's product, a licence or hardware passed on, or for what
the house does not make, is not recorded; the card's list of what the house
does not make keeps it out of the next sweep.

| Object | Means |
|---|---|
| `build` | something the house designs and develops: a world, a game, an interactive piece |
| `deliver` | something the house runs: a workshop, an event, a gamified training |

## The house's chance

How likely an open opportunity is to end won, from two questions answered
yes or no: is it in one of the lines the house sells (the house's card), and
has the house already won something in that line — another record with a
`won` line? The tool computes it from the record's `line` and the other
records; it is written nowhere. A closed record has none. A call's criteria
stay a gate, not a grade: a call that fails a requirement has no record.

| Chance | Means |
|---|---|
| `high` | both: in a line the house sells, and the house has won in that line before |
| `medium` | one of the two |
| `low` | neither: outside the house's lines, with no win behind it |

## A watch's verdict

What a watch says of a call before anyone has decided on it, read from its
terms against the house's card (`PRO-035`). It is written in the watch's
feed, never in a record: a record's chance is the tool's, computed from its
line and the house's wins. The last column is the feed's filter: in doubt the watch keeps a
call, and what could fall is the Oracle's to drop.

| Verdict | Means | Goes to the feed |
|---|---|---|
| `high` | read from the terms, every requirement met | yes |
| `medium` | some requirement still to check, none failed | yes |
| `low` | a requirement fails today, and one named thing — a partner, a registration, a published game — would unlock it before the close | yes, with the unlock |
| `none` | outside what the house makes, or a requirement no one can meet before the close | no: it stays in the watch's own memory |

## Weighing a tender

What makes a tender that survives the criteria worth the dossier, read from
its terms. The screening procedure scores each row; a tender mostly in the
last column is declined unless the Oracle says otherwise.

| What | Good | Fair | Poor |
|---|---|---|---|
| Weight of the judgement criteria | over 50 % | 25–50 % | under 25 % — the price decides |
| Working days to the closing day | over 10 | 5–10 | under 5 |
| Definitive guarantee | none, or under 3 % | 5 % | over 5 %, or a provisional one as well |
| Profiles the terms require in the team | 1–3 | 4–6 | 7 or more |
| Length | a closed project, in months | one year | several years with extensions |
| Cash | paid in stages, or nothing to buy first | one payment after acceptance | material bought first, paid after acceptance |

## Naming the organisation

The house works in the open, and says so in every proposal. The record
names the organisation when the organisation knows it may be named.

| When | The organisation is written as |
|---|---|
| before a proposal is sent, or when the client was never told | its sector and size: *a large retailer*, *a provincial police force* |
| from the proposal sent, told in it, and the client did not ask otherwise | its name |
| the client asked not to be named, at any stage | its sector and size |
| `lost`, always | its sector and size — the reason is public, the name is not |
| a tender's authority, a grant's funder | its name, at any stage: a public body that publishes its own call |

Records are public and hold nobody's name at any stage; they are kept as
they stand, since the statistics are made from them. A public buyer met
outside a call is named in a sale only once told, like any other client; a
tender's authority and a grant's funder publish the call themselves, so the
record names them and links the call. What a contracting authority
publishes about a minor contract — object, duration, amount, awardee — is
public in any case once awarded. The house's own price in a tender is not
written until the authority publishes the award, since a bidder's offer is
confidential until then (LCSP art. 133).
