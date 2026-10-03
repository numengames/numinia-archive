---
id: "opportunities-index"
title: "Opportunities — index"
type: meta
status: active
version: "0.5.1"
created: "2026-09-28T14:05:55+02:00"
created_source: "git:d620635"
created_confidence: exact
updated: "2026-10-03T19:40:00+02:00"
author: "ursa"
owner: "oracle"
section: "Sales and partners"
tags: [opportunities, index]
license: "CC0-1.0"
registration: exempt
registration_reason: "the folder's own guide, not a record of the series"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# opportunities/ — every opportunity, as a public record

> **Summary:** One file per opportunity of any kind — a sale, a tender, a
> grant, a collaboration, a partner — each with its timeline, and the
> proposals beside them. Public, with nobody's name in it.
> **Epistemic:** Where are the opportunity records, and how is one written?
> **Pragmatic:** Open a record or a proposal from its mould; write a line
> each time something happens; read the pipeline from the tool.
> **Audience:** Sales · Oracles · anyone

One file per opportunity, `OPP-YYYY-NNN.md`, whatever its kind; its
proposals beside it as `PRP-YYYY-NNN.md`. The rules are
`standards/STD-039` (the record), `STD-040` (the proposal) and `STD-038`
(the kinds, their stages, the events, the reasons, when the organisation is
named); what calls ask against what the house holds is
`operations/OPS-018`. The steps are `protocols/PRO-028`, `PRO-029`,
`PRO-030` for a sale, a collaboration or a partner, `PRO-033` and
`PRO-031` for a tender, `PRO-032` for a grant.

**To open a record,** copy `machine/templates/OPP-TEMPLATE.md` to the next
free number, set `kind`, and fill the header the mould marks as required
for that kind. A tender or a grant first passes the house's card: its
`## Criteria` rows are yes or check, and one that fails a requirement is
not recorded at all — what it taught goes to the card. The header carries
no stage, no next step and no chance: the tool computes them.

**The timeline.** Under `## Timeline`, one line per thing that happened:
`- YYYY-MM-DD · event · text`, the event one of `found` (first, once),
`out` (what the house did), `pos` and `neg` (the other side's answer),
`won` and `lost` (closing; a lost line's text begins with a reason), and
`next` (the planned step: the last line of an open record, none on a closed
one). A text that begins with a stage of the record's kind in backticks
moves the record to that stage on that day; dates never go backwards.

`status` is the document's (`active` while the record is kept; a proposal
is `draft` until sent); the stage is the opportunity's, read from the
timeline.

The records are public. They carry nobody's name, e-mail or phone — who
said what stays where the conversation happened — and they name the
organisation by sector and size until it has been told the house works in
the open, never once a sale is lost; a tender's authority and a grant's
funder publish their call and are named. CI runs
`node machine/packages/sales-kit/pipeline.mjs opportunities` on every
change and fails on a record that breaks a rule; run it yourself to read
the pipeline.
