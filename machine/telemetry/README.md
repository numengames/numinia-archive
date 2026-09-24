---
id: "TELEMETRY-README"
title: "machine/telemetry/ — what is here and how to read it"
type: meta
status: active
version: "1.0.0"
created: "2026-09-02T17:55:00+02:00"
updated: "2026-09-02T17:55:00+02:00"
author: "ursa"
license: "CC0-1.0"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# machine/telemetry/

The one place this repository *states* figures about itself. Everything here is written by `machine/scripts/telemetry.mjs` (MIS-138); nothing here is typed by hand except `claims.json`.

| File | What | Who writes it |
|---|---|---|
| `latest.json` | Every figure: `value · unit · definition`, keyed `family.key`, with the `head`, `corpus_hash`, `measured_at` and `root_dirty` it was measured under | instrument |
| `latest.md` | `latest.json` rendered — the only document that *asserts* corpus figures | instrument |
| `docs.json` | One row per document of the corpus (path, series, status, apparatus, frozen, tokens) | instrument |
| `history.jsonl` | One line per distinct `corpus_hash` ever measured on a clean tree; append-only, guarded by test | instrument |
| `claims.json` | The verified register (D4 layer 2): claims found by reading, each with a locating quote; the instrument checks every quote each run → `open` · `resolved` · `moved`. Edited by people, never by the instrument | people |

## Run

```
node machine/scripts/telemetry.mjs                   # measure HEAD, write this directory
node machine/scripts/telemetry.mjs --check           # exit 1 if latest.json is not HEAD's
node machine/scripts/telemetry.mjs --key tokens.total
node machine/scripts/telemetry.mjs --print           # JSON to stdout, writes nothing
node machine/scripts/telemetry.mjs --fetch-tokenizer # cl100k rank file, verified by sha256 (needed once; tokens.* are null without it)
node machine/scripts/test/telemetry.test.mjs
```

Bare `node`, no dependencies. `corpus_hash` is a SHA-256 over the index with `machine/telemetry/` excluded, so a dataset can describe the commit it is committed in: stage → measure → `git add telemetry` → commit.

## Reading a figure

Every figure carries its predicate in `definition`. Two figures with different predicates may legitimately differ (`legacy.misiones_por_status` counts templates; `missions.by_status` does not) — the dataset **measures** discrepancies of criterion, it does not reconcile them. A figure quoted elsewhere is written `key = value @ head` (STD-001 §10.5, proposed); `figures.stale_citations` lists the ones whose value has since moved.

## Licence

CC0-1.0 (`REUSE.toml`): figures about a corpus are facts.
