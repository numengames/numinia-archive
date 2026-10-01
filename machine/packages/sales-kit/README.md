<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# sales-kit — the tool for opportunity records

The rules are `standards/STD-038` (the stages), `STD-039` (the record) and
`STD-040` (the proposal). This folder is one implementation of them: one
script that reads a folder of records and prints the pipeline. The moulds
to copy live with every other mould, `machine/templates/OPP-TEMPLATE.md`
and `PRP-TEMPLATE.md`. The records themselves live in `opportunities/`, public, with
nobody's name in them.

```
sales-kit/
├── pipeline.mjs        ← node pipeline.mjs <folder> [--proposals] [--json] [--today YYYY-MM-DD]
└── fixtures/           ← invented records the tests run against
```

`pipeline.mjs` reads the stages and reasons from `STD-038`'s tables in
this repository (one source), validates every `OPP-*.md` in the folder
against `STD-039` — fields, stage, next step, transitions, nobody's name,
the organisation by sector before it agrees — and exits 1 naming each
failure, then prints a
Markdown report: count and value per stage · overdue and stale records ·
the calendar (every open record by its next date, tenders with their
procedure and notice) · tenders by procedure · time per stage from the
transitions · won and lost with reasons · the funnel · by organisation. A
record with `source: tender` also carries `procedure` (from `STD-038`'s
procedures table) and `notice` (an address, except a minor contract); at
`proposed` it is exempt from stale, since the award comes on the
authority's clock. With `--proposals` it also checks each proposal a
record points to against `STD-040`'s mechanical rows. With `--json` it
prints the same figures as JSON for a site or a sheet to read.

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
