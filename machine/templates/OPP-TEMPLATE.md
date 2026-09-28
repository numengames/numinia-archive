---
# Copy this file to opportunities/OPP-YYYY-NNN.md and fill it in. The record
# is PUBLIC: its rules are STD-039 (the record) and STD-038 (stages, reasons,
# when the organisation is named). Nobody's name, e-mail or phone, anywhere
# in it. The organisation by sector and size until it agrees.
# The header is every document's (STD-004), then the sale's own fields,
# which machine/packages/sales-kit/pipeline.mjs reads.
id: "OPP-YYYY-NNN"
uid: ""
title: "The organisation, by sector and size"
type: opportunity
# status: the DOCUMENT's state. active while the record is kept; withdrawn
# only if it was opened by mistake. How the SALE goes is `state`, below.
status: active
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
guild: "Procurators"
territory: "Sales"
tags: [opportunities, sales]
license: "CC0-1.0"

# THE SALE — every field below is read by the pipeline tool.
# organisation: sector and size until `agreed`; its name from then on.
organisation: "a large retailer"
# sector: retail | public-sector | education | technology | events | other
sector: "retail"
# offer: the offer record this sells.
offer: "OPS-NNN"
# source: referral | inbound | outbound | event | partner
source: "referral"
# state: lead | qualified | analysed | proposed | agreed | won | lost (STD-038)
state: "lead"
# value: without tax; the proposal's figure once there is one.
value: 0
currency: "EUR"
# contact_role: the role of who asked, never a name.
contact_role: "head of learning"
# contact_channel: email | phone | meeting | form
contact_channel: "email"
next_action: "what happens next, in one line"
# next_date: every open record has one.
next_date: "YYYY-MM-DD"
opened: "YYYY-MM-DD"

# WHEN DUE — absent until the stage asks for them; never written empty.
# decider_role: "who can sign for the client"   # from agreed
# proposal: "PRP-YYYY-NNN.md"                    # once sent
# agreement: "path to the signed agreement"      # once won
# closed: "YYYY-MM-DD"                           # at won or lost
# reason: "not-a-fit"                            # lost only: not-a-fit | no-budget | no-decider | price | timing | chose-another | silence | we-declined
# related: ["OPS-NNN"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# OPP-YYYY-NNN — the organisation

> **Summary:** Who asked, for what, where the sale stands and what happens
> next — in two or three lines a stranger understands without the header.
> **Epistemic:** Is this opportunity worth pursuing, and what is still
> unknown about it?
> **Pragmatic:** Prepare the next step, or decide to drop it.
> **Audience:** Sales · Oracles

## Need

The four things, in the client's words, written at `analysed`:

- **Objectives.** What the learners will be able to do when it is over.
- **Learners.** Who, how many, what they know already, from which devices they enter.
- **Conditions.** When, where, with what support from the client.
- **What the responsible will see.** The level at which learning is judged —
  reaction · learning · behaviour · results — and its indicator.

## Transitions

| Date | From | To | By | Evidence |
|---|---|---|---|---|
| YYYY-MM-DD | — | lead | who heard of it | how it reached us |

## Notes

What was said and decided, dated, without anyone's name: the record is
public. Who said it stays where the conversation happened.
