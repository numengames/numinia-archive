---
id: "STD-047"
uid: ""
title: "The sales collateral"
type: standard
subtype: register
status: draft
version: "0.2.0"
created: "2026-10-02T21:00:00+02:00"
updated: "2026-10-08T13:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Sales and partners"
tags: [standards, register, sales, collateral, playbook, opportunity, templates]
license: "CC0-1.0"
related: ["STD-038", "STD-039", "STD-040", "OPS-012", "OPS-018", "PRO-028", "PRO-029", "PRO-030", "STD-048"]
derived_from: "PRI-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# The sales collateral

> **Summary:** What each stage of a sale hands to the other side — a deck,
> an e-mail, a sheet, a video, a proposal — what each piece is made from,
> what stops it from being made, the template that makes it and whether it
> has earned its place. A piece is made from the opportunity's record, the
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
| `qualified` | First-contact deck | asks for a first meeting: the gap, what the house proposes, where it fits in the buyer's own plan, the price range, the ask | the record's header and Pitch; the offer's Packages | the Pitch lacks a headline, a promise, a gap, a first fit or the ask; the offer has no Packages | `first-contact-deck.html` | trial |
| `qualified` | First-contact e-mail | carries the deck: one hook in the buyer's own words, the promise, the ask | the record's header and Pitch | the Pitch lacks a subject, a hook, a promise or the ask; the record has no contact channel; nobody has asked for it and it answers no published call — an e-mail waits for a yes (`STD-048` CLD-002) | `first-contact-email.txt` | trial |
| `qualified` | One-page sheet | the deck in one page, to hand over at an event, where the yes to write is asked (`STD-048`) | the offer and the card | — | — | trial |
| `qualified` | Ninety-second video | the demonstration walked in ninety seconds, for the follow-up | the offer's earlier case and its demonstration | no demonstration address | — | trial |
| `analysed` | First-meeting script | what to show, and the questions the needs analysis must leave answered | the record's Need and `PRO-029` step 1 | — | — | trial |
| `proposed` | Proposal | the four things a proposal says | the record's Need, the offer, the template | a thing of the four is missing (`STD-040`) | `PRP-TEMPLATE.md` | works |
| `proposed` | Follow-up e-mails | one line each, on the stage's cadence | the record's timeline | — | — | trial |
| `agreed` | Agreement and papers | the agreement from the house's terms, and the certificates a public buyer asks | the proposal and the card | the decider's role is not known | — | trial |
| `won` · `lost` | Hand-over and lessons | the need, the map and the scope to whoever builds; what the sale taught, to the offer | the record and the proposal | — | — | trial |

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
changed in the offer changes in every deck. Sales practice calls these
pieces *sales collateral* and the work of keeping the right one ready at
each stage *sales enablement*; the stages are this house's own (`STD-038`).

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-038` | The stages of an opportunity | the stages a piece belongs to |
| `STD-039` | An opportunity has a record | the record and its Pitch, the pieces' source |
| `STD-040` | A proposal says four things | the one piece with a standard of its own |
| `OPS-012` | Training — the offer | the Packages a deck prices |
| `OPS-018` | The house's card | what the house holds, and who may be named |
| `PRI-009` | The archive is the organisation | why a piece is made from the records and not from memory |
| `STD-048` | Reaching someone who did not ask | the doors a first contact may go through |
