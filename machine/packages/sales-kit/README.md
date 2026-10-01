<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# sales-kit — the tool for opportunity records

The rules are `standards/STD-038` (the stages of an opportunity: kinds,
stages, events, steps, reasons, how it pays and the other closed lists),
`STD-039` (the record) and `STD-040` (the proposal); what the house holds
is its card, `operations/OPS-018`. This folder is one implementation of
them: one script that reads a folder of records and prints the pipeline.
The moulds live with every other mould, `machine/templates/OPP-TEMPLATE.md`
(one for every kind) and `PRP-TEMPLATE.md`. The records live in
`opportunities/`, public, with nobody's name in them.

```
sales-kit/
├── pipeline.mjs        ← node pipeline.mjs <folder> [--json] [--proposals]
│                         [--today YYYY-MM-DD] [--register PATH] [--card PATH]
├── fixtures/           ← invented records (OPP-2099-…), one per kind, and
│   ├── register.md       the register's and the card's tables, so the tests
│   ├── card.md           run whatever the real files say that day;
│   └── broken/           records that each break named rules
└── test/pipeline.test.mjs
```

**One record for every kind.** A sale, a public tender, a grant, a
collaboration and a partner are each one `OPP-YYYY-NNN.md` with a `kind`.
Its body carries a `## Timeline`, one line per thing that happened:

```
- 2026-09-28 · found · met at an event, wants …
- 2026-09-28 · out · `qualified` the demo built and the proposal drafted
- 2026-10-12 · next · meeting: show the demo, hand over the proposal
```

Events are `found · out · pos · neg · won · lost · next`. A backticked
stage at the head of the text moves the record there, only forward; a
`lost` line names its reason (`- DATE · lost · timing · …`). The tool
**computes** what used to be typed: the stage, the next step and whether
it is overdue, stale (per kind: none for tenders and grants, which run on
the other side's clock), the closing day, the reason, the five funnel
steps (detected · contacted · positive · won · again — AARRR adapted to
selling) and, for a call, the chance (`high` when every criteria row is
`yes`, `medium` when one is `check`). A call with a `no` row is refused:
it is not recorded; what it taught goes to the card.

`pipeline.mjs` reads every closed list from `STD-038`'s tables by heading
(one source) and the requirements, the turnover ceiling and what the house
does not make from `OPS-018` (headings may be numbered, `## 2. The card`).
It validates every `OPP-*.md` against `STD-039` — fields per kind, the
timeline grammar, nobody's e-mail or phone, the organisation by sector
before it agrees, the call read against the card — and exits 1 naming each
breach by plate and file, 2 when the folder, the register or a named card
cannot be read. Otherwise it prints a Markdown report — by kind · what's
due · overdue and stale · every record · the funnel per kind · reasons lost
· days per stage · the card with how many open records hinge on each row —
or, with `--json`, the same figures as data (`figures()`; the keys are the
contract the site reads: `today, kinds, steps, records, due, funnel,
byKind, reasons, daysPerStage, card, ceiling, overdue, stale`). The
`funnel` holds, for `all` and for each kind, `counts` (records that reached
each of the five steps) and `conversion` (each step's share of the step
before, a whole per cent; `null` for the first step and after an empty
one). Each `card` row carries `decides`: its place in the card's
*What decides most calls* list, or `null`; every row stays in `card`. A
name in that list the card holds no row for stops the tool (exit 2). With
`--proposals` it also checks each proposal a record points to against
`STD-040`'s mechanical rows.

Exports, for tests and the site: `parseFM`, `loadRegister`, `loadCard`,
`timelineOf`, `criteriaOf`, `validate`, `readFolder`, `duplicates`,
`validateProposal`, `figures`, `report`.

Zero dependencies. Runs wherever Node 22 runs: this repository's CI on
`opportunities/`, a laptop, a CRM export folder.

## Reading a tender from a regional portal with no content in its pages

Some regions publish tenders in an application whose pages hold no text
(Andalusia's procurement profile is one). Its documents are reached through
the search service the application itself calls. For Andalusia, POST
`{"query":{"match":{"_id":"<idExpediente>"}}}` to
`https://www.juntadeandalucia.es/haciendayadministracionpublica/apl/pdc-front-publico/elastic/sirec_pdc_expedientes_details/_search`;
the answer lists each document with a direct download address (justification
memo, administrative and technical terms). For another region, open the
application's main script and look for an address ending in `/_search` or
`/elastic/`. Offers in Andalusia are filed in its own portal, SiREC, not the
state platform.
