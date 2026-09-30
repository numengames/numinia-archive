---
id: "opportunities-index"
title: "Opportunities — index"
type: meta
status: active
version: "0.4.0"
created: "2026-09-28T14:05:55+02:00"
created_source: "git:d620635"
created_confidence: exact
updated: "2026-09-30T21:00:00+02:00"
author: "ursa"
owner: "oracle"
tags: [opportunities, index]
license: "CC0-1.0"
registration: exempt
registration_reason: "the folder's own guide, not a record of the series"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# opportunities/ — every chance to sell something, as a public record

> **Summary:** One file per chance to sell something, and its proposals
> beside it. Public, with nobody's name in it.
> **Epistemic:** Where are the sales records, and how is one written?
> **Pragmatic:** Open a record or a proposal from its mould; read the
> pipeline from the tool.
> **Audience:** Sales · Oracles · anyone

One file per opportunity, `OPP-YYYY-NNN.md`, copied from
`machine/templates/OPP-TEMPLATE.md`; its proposals beside it as
`PRP-YYYY-NNN.md`, from `machine/templates/PRP-TEMPLATE.md`. Both open with
the header every document carries (`STD-004`), then their own fields. The
rules are `standards/STD-039` (the record), `STD-040` (the proposal) and
`STD-038` (the stages, the reasons, when the organisation is named); the
steps are `protocols/PRO-028`, `PRO-029`, `PRO-030`.

Two states, two meanings: `status` is the document's (`active` while the
record is kept; a proposal is `draft` until sent), `state` is the sale's
(`lead` … `won` or `lost`).

A public tender is a record like any other, with `source: tender`, the
procedure the authority buys by (`STD-038` names four and what each asks
of a bidder) and the address of its notice. Its value is the estimated
value the notice states; the house's price is written once the award is
public. The pipeline page reads every open record's next date into a
calendar, tenders marked, so the days offers close are never typed.

The records are public. They carry nobody's name, e-mail or phone — who
said what stays where the conversation happened — and they name the
organisation by sector and size until the proposal has told the client the
house works in the open — never once a sale is lost. CI runs
`node machine/packages/sales-kit/pipeline.mjs opportunities` on every
change and fails on a record that breaks a rule; run it yourself to read
the pipeline.
