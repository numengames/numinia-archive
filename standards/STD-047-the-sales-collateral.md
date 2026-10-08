---
id: "STD-047"
uid: ""
title: "The sales collateral"
type: standard
subtype: register
status: draft
version: "0.2.0"
created: "2026-10-02T21:00:00+02:00"
updated: "2026-10-08T12:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Sales and partners"
tags: [standards, register, sales, collateral, playbook, opportunity, templates]
license: "CC0-1.0"
related: ["STD-038", "STD-039", "STD-040", "OPS-012", "OPS-018", "PRO-028", "PRO-029", "PRO-030"]
derived_from: "PRI-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# The sales collateral

> **Summary:** What each stage of a sale hands to the other side — a sheet,
> an e-mail, a video, a proposal — what each piece is made from,
> what stops it from being made, the template that makes it and whether it
> has earned its place, and how a first contact asks: the price in the
> open, one week, one question, yes or no. A piece is made from the opportunity's record, the
> offer it points at and the house's card, never from memory; the sales kit
> renders it and names what is missing. The menu grows and is pruned by
> real sales. A register records: nothing in it binds by itself.
> **Epistemic:** Which collateral does each stage of a sale hand over, and what is it made from?

## The pieces

A piece belongs to the stage at which it is first handed over; any piece of
an earlier stage may be made again later. *Made from* names the sections
the kit reads: the record's header and its `## Pitch` table (`STD-039`),
the offer's *Packages* (`OPS-012`), the house's card (`OPS-018`).
*Missing when* is what the kit reports instead of rendering. *Template* is
the file under `machine/packages/sales-kit/templates/`, or — while the
piece is still made by hand.

| Stage | Piece | What it does | Made from | Missing when | Template | State |
|---|---|---|---|---|---|---|
| `lead` | Research note | says who decides, how they buy, where the house fits and by which channels to reach them | public sources only: the buyer's plans, its awarded contracts, its transparency portal | — | — | trial |
| `qualified` | First-contact sheet, A4 | wins the first meeting, and only that: the buyer's gap in a headline, what the learner lives in the demo, one checkable study with its limits, what is delivered, the weeks and the payments, the price with and without tax, three questions for the buyer, and one ask — yes or no within a week | the record's header and Pitch; the offer's Packages and its First-contact sheet table; the contact typed at render time | the Pitch lacks a service, an audience, a headline, a lead, a demo, a picture, the evidence or the questions; the offer has no Packages or no First-contact sheet table | `first-contact-sheet.html` | trial |
| `qualified` | First-contact sheet, mobile | the same sheet in one column, 100 mm wide, with links that can be tapped — for WhatsApp or a phone | as the A4 | as the A4 | `first-contact-sheet-mobile.html` | trial |
| `qualified` | First-contact e-mail | carries the A4 sheet: one hook in the buyer's own words, the promise, the price, the ask, the date it expires and a P. D. that welcomes a no | the record's header and Pitch; the offer's Packages | the Pitch lacks a subject, a hook, a promise, the ask or the service; the record has no contact channel | `first-contact-email.txt` | trial |
| `qualified` | Expiry e-mail | sent once, the day after the week ends with no answer: asks the buyer to confirm the no, so the sale closes either way | the record's Pitch; the day the sheet was sent | the Pitch lacks a subject | `expiry-email.txt` | trial |
| `qualified` | First-contact deck | asked for a first meeting in four pages; the one-page sheet replaced it on 8 October 2026 | the record's Pitch and Where it fits | — | — | retired |
| `qualified` | Ninety-second video | the demonstration walked in ninety seconds, for the follow-up | the offer's earlier case and its demonstration | no demonstration address | — | trial |
| `analysed` | First-meeting script | what to show, and the questions the needs analysis must leave answered | the record's Need and `PRO-029` step 1 | — | — | trial |
| `proposed` | Proposal | the four things a proposal says | the record's Need, the offer, the template | a thing of the four is missing (`STD-040`) | `PRP-TEMPLATE.md` | works |
| `proposed` | Follow-up e-mails | one line each, on the stage's cadence | the record's timeline | — | — | trial |
| `agreed` | Agreement and papers | the agreement from the house's terms, and the certificates a public buyer asks | the proposal and the card | the decider's role is not known | — | trial |
| `won` · `lost` | Hand-over and lessons | the need, the map and the scope to whoever builds; what the sale taught, to the offer | the record and the proposal | — | — | trial |

## How a first contact asks

The Oracle's rules of 8 October 2026, for every first contact of a sale:

1. **The price is on the sheet**, with and without tax. A public buyer
   cannot approve a spend it has no figure for (LCSP art. 118), and a sheet
   without one forces a second exchange before anyone can decide.
2. **One week.** The sheet is valid seven days from the day it is sent; its
   header, its second step, the e-mail and the P. D. all name that day.
3. **One question: yes or no.** The sheet asks for one word before the
   date. A yes buys one hour to close the scope; a no closes the sale, and
   the record gets a `lost` line with the buyer's reason.
4. **The no is welcome.** The sheet and the e-mail say so in a P. D. When
   the week ends with no answer, the expiry e-mail asks the buyer to
   confirm the no — once. Silence after it is a `lost` line, `silence`.
5. **No sign of need.** No chasing, no discount to rescue a sale, no
   «we would love to work with you», no list of what else the house could
   sell. The sheet asks the buyer three questions instead: what fails
   today, who decides and signs, and which budget it goes on.
6. **Two formats from the same fields.** The A4 travels with the e-mail;
   the mobile one goes where the buyer reads on a phone. Both are printed
   to PDF under the client's file name, without accents, date or plate.
7. **Evidence the buyer can open.** One primary study, its DOI printed and
   its limits shown; nothing read only in someone else's summary.

Why: the aim is a short decision, not a long courtship. Jim Camp's
*Start with No* (2002) holds that giving the other side the right to say
no lowers their guard and shortens the decision, and that a seller who
shows need loses the negotiation; Isra Bravo's school of copy asks for one
reader, short sentences, one ask and a P. D. Naming the price first
anchors the talk: in three experiments, whichever side made the first
offer reached the better outcome (Galinsky & Mussweiler 2001, *Journal of
Personality and Social Psychology* 81, 657–669,
doi.org/10.1037/0022-3514.81.4.657). And buyers want to decide without a
seller in the room: 75 % of 771 business buyers surveyed by Gartner at the
end of 2022 said they prefer a buying experience without a sales
representative. These are rules on trial, like the pieces: the closing
step of each sale (`PRO-030`, *Learn*) records whether they helped.

## The states

| State | Means | Moves when |
|---|---|---|
| `trial` | in use, not yet shown to help | the closing step of a sale (`PRO-030`, *Learn*) records that the piece moved a buyer — then `works` |
| `works` | has helped close at least one sale | three closed sales in a row record that it did not help — then `retired` |
| `retired` | no longer made | a new version of the piece enters as `trial` |

## Why

A buyer meets the house through what it hands over before they meet anyone
in it. Kept as a register, the menu is one list every seller and every
agent reads, and each piece points at where its words come from, so a price
changed in the offer changes in every sheet. Sales practice calls these
pieces *sales collateral* and the work of keeping the right one ready at
each stage *sales enablement*; the stages are this house's own (`STD-038`).

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-038` | The stages of an opportunity | the stages a piece belongs to |
| `STD-039` | An opportunity has a record | the record and its Pitch, the pieces' source |
| `STD-040` | A proposal says four things | the one piece with a standard of its own |
| `OPS-012` | Training — the offer | the Packages the sheet prices, and its First-contact sheet table |
| `PRO-028` | Qualifying an opportunity | the step that sends the first contact |
| `PRO-030` | Closing a sale | the follow-up, the expiry and the no |
| `OPS-018` | The house's card | what the house holds, and who may be named |
| `PRI-009` | The archive is the organisation | why a piece is made from the records and not from memory |
