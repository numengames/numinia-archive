---
id: "TELEMETRY-README"
title: "machine/telemetry/ — what is here and how to read it"
type: meta
status: active
version: "1.0.2"
created: "2026-09-02T17:55:00+02:00"
updated: "2026-10-31T13:47:54+01:00"
author: "ursa"
license: "CC0-1.0"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# machine/telemetry/

The one place this repository *states* figures about itself. Everything here is written by `machine/scripts/telemetry.mjs` (MIS-138); nothing here is typed by hand except `claims.json`.

**Nothing generated is committed.** Four of the five files are produced on demand and are in `.gitignore`; a pull request never contains them, so two pull requests never conflict on them. What `/telemetry` and `telemetry.json` show is measured by the build that publishes them, from the commit being published.

| File | What | In git? | Who writes it |
|---|---|---|---|
| `latest.json` | Every figure: `value · unit · definition`, keyed `family.key`, with the `head`, `corpus_hash`, `measured_at` and `root_dirty` it was measured under | no, generated | the tooling, in the web build |
| `latest.md` | `latest.json` rendered — the only document that *asserts* corpus figures | no, generated | the tooling, in the web build |
| `docs.json` | One row per document of the corpus (path, series, status, apparatus, frozen, tokens) | no, generated | the tooling, in the web build |
| `history.jsonl` | One line per distinct `corpus_hash` measured on a clean tree of main; append-only, never rewritten | no: lives on the branch `data/telemetry`; this path holds a local copy | the post-merge workflow `.github/workflows/telemetry-history.yml` |
| `claims.json` | The verified register (D4 layer 2): claims found by reading, each with a locating quote; the tooling checks every quote each run → `open` · `resolved` · `moved`. Edited by people, never by the tooling | **yes** | people |

## Run

```
node machine/scripts/telemetry.mjs                   # measure HEAD, write this directory (the dataset the tests and the site read)
node machine/scripts/telemetry.mjs --build           # the same for a site build: ledger refreshed from origin/data/telemetry, stops if the git log is cut short
node machine/scripts/telemetry.mjs --history F       # extend the ledger file F instead of the local copy (what the workflow does)
node machine/scripts/telemetry.mjs --key tokens.total
node machine/scripts/telemetry.mjs --print           # JSON to stdout, writes nothing (CI: "the instrument runs")
node machine/scripts/telemetry.mjs --check           # exit 1 if the local latest.json is not HEAD's; a local aid, CI does not run it
node machine/scripts/telemetry.mjs --fetch-tokenizer # cl100k rank file, verified by sha256 (needed once; tokens.* are null without it)
node machine/scripts/test/telemetry.test.mjs
```

Bare `node`, no dependencies. `cd web && npm run build` and `npm run dev` run the instrument first (`prebuild`, `predev`), and `npm test` generates the dataset if it is not there. You never run it to "refresh" a pull request: there is nothing in the pull request to refresh. `corpus_hash` is a SHA-256 over the index with `machine/telemetry/` excluded.

## Where the history lives

`history.jsonl` is the only part with memory: a measurement needs the earlier ones. It was committed by every pull request (5.7 MB, one line each), which made any two open pull requests conflict. It now lives on the data branch **`data/telemetry`**, and:

- **Written** by `.github/workflows/telemetry-history.yml`, on every push to main, with `contents: write`: it measures the new main, appends one line if that `corpus_hash` is new, and pushes to `data/telemetry`. It never writes to main. If the branch is missing it is created as an orphan and seeded from the last commit of main that still carried the file.
- **Read** by the web build and by CI: `lib/history.mjs` fetches `origin/data/telemetry`; if that is unreachable it falls back to the same seed in the git log, then to an empty ledger.
- **Append-only**: `appendRow` only ever adds a line, and `telemetry.test.mjs` holds that. The branch's own log is the audit trail.

A merge reaches production before its own line is on the branch (the workflow runs after the merge). The build appends its own measurement to its local copy, so the page is complete either way; the next workflow run records the same line (a known `corpus_hash` adds nothing).

## Reading a figure

Every figure carries its predicate in `definition`. Two figures with different predicates may legitimately differ (`legacy.misiones_por_status` counts templates; `missions.by_status` does not) — the dataset **measures** discrepancies of criterion, it does not reconcile them. A figure quoted elsewhere is written `key = value @ head` (STD-001 §10.5, proposed); `figures.stale_citations` lists the ones whose value, in the run that produced it, has since moved.

## If a conflict or a leftover shows up

A branch cut before this change may still carry `latest.json`, `latest.md`, `docs.json` or `history.jsonl`. After rebasing on main, delete them from the branch (`git rm`); they are generated now, and the old `cut.mjs seal` commit is not needed (`seal` prints that and does nothing).

## Licence

CC0-1.0 (`REUSE.toml`): figures about a corpus are facts.
