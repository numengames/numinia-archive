---
id: "SYS-007"
uid: ""
title: "The instruments: what checks, measures and moulds the archive"
type: documentation
subtype: reference
status: active
version: "0.1.1"
created: "2026-09-21T18:00:00+02:00"
updated: "2026-09-25T15:00:00+02:00"
author: "ursa"
owner: "oracle"
tags: [system, reference, instruments, guards, tools, scripts, telemetry, templates]
territory: "Archive"
license: "CC0-1.0"
related: ["STD-027", "STD-001", "STD-015", "SYS-003"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SYS-007 — The instruments

> **Summary:** Everything under `machine/` — the five folders the
> classification scheme lists as instruments: what each one is, what it
> verifies or produces, how it is run, and where it is read.
> **Epistemic:** Why a folder that appears in the classification has no
> documents and no page of its own, and what it does instead.
> **Pragmatic:** Find the instrument that checks a rule, and the command that
> runs it, without opening the repository blind.
> **Audience:** Agents · Oracles

> **A system document is a reference manual, not a plan.** It describes what
> exists. What could exist belongs in `blueprints/`; what must be built
> belongs in a mission.

---

## 1. Scope

The five folders under `machine/` that `STD-027` classifies — `guards/`,
`tools/`, `scripts/`, `telemetry/` and `templates/` — and `packages/`, which
it does not. An instrument is a short-lived record that never binds (`STD-027`
CLS-002): it carries no identifier, is kept only while current, and may be
cited as evidence of what it measured, never as a rule. It is
classified because the archive is classified by the activity that produced
it, and *Verifying*, *Measuring* and *Templating* are activities of the
organisation. It is not published because it is code, read where code is read.

This manual does not cover the site's own build scripts (`web/scripts/`) nor
the CI workflow (`.github/workflows/`), which follow the platform they serve.

---

## 2. How it works

### `machine/guards/` — Verifying

The rules, one file per standard, that run on every change. A guard is a
module that declares the plates it speaks for and returns findings against
them; `guards/lib/guard.mjs` is the contract and the one place a finding is
turned into a pass or a fail according to the standard's own state (a `draft`
standard reports, an `active` one bites — `STD-015` ENG-067). Eight rule
guards today, `std-004-the-header` through `std-021-evidence-and-citation`,
each named after the standard it enforces.

Run: `npm run guards -- --rules` from the repository root.
Read: [machine/guards/](https://github.com/numengames/numinia-archive/tree/main/machine/guards)

### `machine/tools/` — Verifying

Instruments an operator runs by hand, or CI runs against the repository's
own registers: `check-register` (does every `[AUTO]` cell of `STD-015` name a
script that exists?), `check-deletable` (may this document be deleted?),
`check-responsive` (the design system's web numbers, measured in a browser),
`generate-design-kit` (the kit published at `/design/kit`, byte-checked
against its source), `rename-series` and `ruleset-export` (the branch
protection, as a file that can be diffed).

Run: `node machine/tools/<name>.mjs`, each prints its own usage.
Read: [machine/tools/](https://github.com/numengames/numinia-archive/tree/main/machine/tools)

### `machine/scripts/` — Verifying

The build and CI scripts. `run-guards` runs the guards and says what ran.
The build guards read `web/dist` after the site is built and verify the
artefact, not the prose: `check-url-shape` (every address is
`/<series>/<id>`, `STD-028`), `check-url-lifecycle` (which addresses a cut
removed), `check-internal-links`, `check-orphan-content`, `check-templates`
and `check-version-bump` (a change to the site must say what it changed).
`telemetry` is the instrument that writes the next folder; `entities` walks
the entity cards. `blind-spots.json` is the registry: which scripts are
guards, and what each is blind to.

Run: `npm run guards -- --build` after `cd web && npm run build`.
Read: [machine/scripts/](https://github.com/numengames/numinia-archive/tree/main/machine/scripts)

### `machine/telemetry/` — Measuring

The one place the repository states figures about itself. Every file is
written by `machine/scripts/telemetry.mjs`; nothing is typed by hand except
`claims.json`, the register of figures other documents cite. `latest.json`
carries every figure with the head and corpus hash it was measured under;
`docs.json` one row per document; `history.jsonl` one line per distinct
tree ever measured. The dataset is rendered at `/telemetry`, which is where a
reader meets it.

Run: `node machine/scripts/telemetry.mjs` (measure) · `--check` (is
`latest.json` HEAD's?).
Read: [machine/telemetry/](https://github.com/numengames/numinia-archive/tree/main/machine/telemetry)
· [/telemetry](/telemetry)

### `machine/templates/` — Templating

The moulds, one per series: `CAN-TEMPLATE.md`, `STD-TEMPLATE.md`,
`PRO-TEMPLATE.md`, `ADR-TEMPLATE.md`, `MIS-TEMPLATE.md`, `RPT-TEMPLATE.md`,
`BLU-TEMPLATE.md`, `DBT-TEMPLATE.md`, `OPS-TEMPLATE.md`, `SYS-TEMPLATE.md`. A
document is copied from its mould, filled, and the guidance deleted; the
mould's own `README.md` says how. `check-templates` holds the moulds to the
same header rules as the documents cut from them.

Run: copy the mould to its series with the destination's own filename.
Read: [machine/templates/](https://github.com/numengames/numinia-archive/tree/main/machine/templates)

### `machine/packages/` — not classified

`design-kit/` is the source of the published design kit
(`@numengames/design-kit`): tokens, base CSS, base JS and the agent
instruction. `STD-027` does not list it because it is a product's source, not
an activity of the archive; `generate-design-kit` in `tools/` is what checks
it. Named here so a reader who finds the folder is not surprised by it.

---

## 3. How to verify it

```
$ ls machine
guards  packages  scripts  telemetry  templates  tools

$ npm run guards -- --list
rule   std-004-the-header
…
build  check-url-shape
…
```

Every folder this manual names appears in the first listing; every guard it
names appears in the second. `node machine/tools/check-register.mjs` fails
when an `[AUTO]` cell of `STD-015` names a script that is not in the tree —
which is the same check, from the register's side.

---

## 4. Accuracy

Written from the tree and the scripts' own headers. The count of rule guards
(eight) and the names of the build guards are the ones in
`machine/scripts/blind-spots.json` on the date below; a guard added later
appears in `--list` before it appears here.

**Verified against:** `main` at f8da4b0, on 2026-09-21.
