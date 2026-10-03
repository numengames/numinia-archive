---
# Copy this file to opportunities/OPP-YYYY-NNN.md and fill it in. One mould
# for every kind of opportunity: a sale, a tender, a grant, a collaboration,
# a partner. The record is PUBLIC: its rules are STD-039 (the record) and
# STD-038 (kinds, stages, events, reasons, how it pays, when the organisation
# is named). Nobody's name, e-mail or phone, anywhere in it.
# The header is every document's (STD-004), then the opportunity's own
# fields, which machine/packages/sales-kit/pipeline.mjs reads. The stage,
# the next step, the closing day, the reason and the chance are NOT here:
# the tool computes them from the ## Timeline and the ## Criteria table.
id: "OPP-YYYY-NNN"
uid: ""
title: "The organisation, by sector and size"
type: opportunity
# status: the DOCUMENT's state. active while the record is kept; withdrawn
# only if it was opened by mistake. Where the opportunity stands is computed.
status: active
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "2026-10-02T12:00:00+02:00"
author: "agent-id"
owner: "oracle"
guild: "Procurators"
section: "Knowledge and quality"
tags: [opportunities]
license: "CC0-1.0"

# EVERY KIND — required on every record.
# kind: sale | tender | grant | collaboration | partner (STD-038 The kinds)
kind: "sale"
# organisation: sector and size until it agreed to be named (disclosure:
# open); a lost record is never named. A grant's funder and a tender's
# buyer published their call and may be named.
organisation: "a large retailer"
# sector: retail | public-sector | education | technology | events | non-profit | other
sector: "retail"
# source: referral | inbound | outbound | event | platform (a procurement platform or an official gazette)
source: "referral"
# value: a number, before tax. sale: the price · tender: the notice's
# estimated value · grant: the most the house could receive · partner: the
# house's agreed share, 0 until agreed · collaboration: 0 or the money involved.
value: 0
currency: "EUR"
# pays: advance | milestones | on-delivery | on-justification | in-kind | to-ask (STD-038 How it pays)
pays: "to-ask"
# contact_role: the role of who asked, never a name.
contact_role: "head of learning"
# contact_channel: email | phone | meeting | form
contact_channel: "email"
opened: "YYYY-MM-DD"

# WHEN DUE — absent until due; never written empty. Uncomment as they come.
# offer: "OPS-NNN"
#   the offer record it sells: REQUIRED for a sale and a tender
# advance: 30
#   0-100, the share paid before the work: REQUIRED when pays is advance or milestones
# proposal: "PRP-YYYY-NNN.md"
#   a sale: REQUIRED once a `proposed` line is written
# decider_role: "who can sign for the client"
#   a sale: REQUIRED at agreed and won
# agreement: "path to the signed agreement"
#   a sale: REQUIRED at won
# disclosure: "open"
#   open | unnamed: open once told the house works in the open and it did not object
# follows: "OPP-YYYY-NNN"
#   the earlier record this comes from: a repeat client or a referral
# gives_back: "a case, a contact, visibility"
#   a collaboration only: what came back instead of money
#
# A TENDER or a GRANT (a call) adds:
# call: "https://..."
#   the notice's or the call's address; a tender by a minor contract has none
# closes: "YYYY-MM-DD"
#   the day offers or applications close
# read_from: "terms"
#   terms | notice: a summary is never enough to record
#
# A TENDER only adds:
# procedure: "simplified-abridged"
#   minor | simplified-abridged | simplified | open (STD-038)
# file_ref: "the buyer's file number"
#   REQUIRED: one file, one record
# object: "build"
#   build | deliver: what the technical terms really buy
# turnover_asked: 0
#   from the terms, EUR; above the card's ceiling it is not recorded
# works_asked: 0
#   from the terms, past works asked, EUR
# starts: "YYYY-MM-DD"
#   the day the service starts
#
# A GRANT only adds:
# instrument: "grant"
#   grant | loan | prize | programme (STD-038 What the funder gives)
# opens: "YYYY-MM-DD"
#   the day the call opens
# estimated: "yes"
#   yes while the days are last year's; no once the call is out
#
# related: ["OPS-NNN"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# OPP-YYYY-NNN — the organisation

> **Summary:** Who it is, what it is about, where it stands and what happens
> next — in two or three lines a stranger understands without the header.
> **Epistemic:** Is this opportunity worth pursuing, and what is still
> unknown about it?
> **Pragmatic:** Prepare the next step, or decide to drop it.
> **Audience:** Sales · Oracles

## Need

A sale: the four things, in the client's words, written at `analysed`.
Other kinds: what it is about, in free prose, or delete the section.

- **Objectives.** What the learners will be able to do when it is over.
- **Learners.** Who, how many, what they know already, from which devices they enter.
- **Conditions.** When, where, with what support from the client.
- **What the responsible will see.** The level at which learning is judged —
  reaction · learning · behaviour · results — and its indicator.

## Criteria

A tender or a grant: REQUIRED, one row per requirement of the call, named as
the house's card (OPS-018) names it. Meets is `yes` or `check`. A requirement
the house fails is never written `no`: a call that fails one is not recorded;
what it taught goes to the card. Other kinds: delete the section.

| Requirement | The call asks | We have | Meets |
|---|---|---|---|
| Turnover | … | … | yes |
| Tax and Social Security | … | … | check |

## Timeline

One line per thing that happened, oldest first:
`- YYYY-MM-DD · event · text`, events found · out · pos · neg · won · lost ·
next. `found` is the first line, once. A text may open with a backticked
stage of the record's kind; the record moves there that day, only forward.
`lost` carries a reason from STD-038 after the event. An open record ends
with exactly one `next` line; a closed one has none.

- YYYY-MM-DD · found · how it reached the house
- YYYY-MM-DD · out · `qualified` what the house did, and why it fits
- YYYY-MM-DD · next · the one planned step

<!--
The stages and the lines each kind adds (STD-038):
  sale           lead · qualified · analysed · proposed · agreed · won · lost
                 - DATE · out · `proposed` PRP-YYYY-NNN sent
                 - DATE · pos · `agreed` the client's written yes
                 - DATE · won · the agreement signed
  tender         found · read · bidding · filed · awarded · won · lost
                 - DATE · out · `read` the terms read, the criteria written
                 - DATE · out · `filed` the offer filed; receipt kept
                 - DATE · lost · outbid · the award published
  grant          foreseen · open · applied · granted · justified · won (paid) · lost
                 - DATE · out · `open` the call published in the gazette
                 - DATE · out · `applied` the application filed; receipt kept
                 - DATE · won · the money in the bank
  collaboration  lead · agreed · won (done) · lost
                 - DATE · pos · `agreed` both said yes
                 - DATE · won · done; what came back, also in gives_back
  partner        lead · talking · agreed · filed · won · lost
                 - DATE · pos · `talking` they answered
                 - DATE · out · `agreed` who signs, who does what, the house's share
-->

## Notes

What was said and decided, dated, without anyone's name: the record is
public. Who said it stays where the conversation happened.
