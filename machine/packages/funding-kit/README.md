<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# funding-kit — the tool for grant records

The rules are `standards/STD-045` (the stages of a grant), `STD-046` (the
record) and the house's chance in `STD-038`. This folder is one
implementation of them: one script that reads a folder of grant records and
prints what the house might receive. The mould to copy is
`machine/templates/GRA-TEMPLATE.md`; the records live in `funding/`.

```
funding-kit/
├── funding.mjs        ← node funding.mjs <folder> [--json] [--today YYYY-MM-DD]
├── fixtures/          ← invented records the tests run against
└── test/
```

`funding.mjs` reads the stages, instruments, payments and reasons from
`STD-045`'s tables and the four chances from `STD-038` (one source each),
validates every `GRA-*.md` against `STD-046` — fields, stage, next step,
transitions, the criteria table and a chance that does not contradict it,
nobody's name — exits 1 naming each failure, then prints the report: by
stage, by chance, what is overdue, the calendar of closing days (estimated
ones marked), every call with its criteria met, failed and still to check.
With `--json` it prints the same figures for the pipeline page.

Zero dependencies; Node 22.
