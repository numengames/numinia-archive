---
id: "MIS-292"
uid: ""
title: "Publish every engine release with its semantic version and its notes"
type: mission
status: todo
version: "0.1.0"
created: "2026-11-06T12:45:00Z"
updated: "2026-11-06T12:45:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [engine, releases, versions, changelog]
license: "CC0-1.0"

priority: high
weight: 5
model_planned: sonnet
budget_usd: 0.00
budget_minutes: 30
executor: agent
assigned_to: "ursa"
completed: null

parent_mission: "MIS-291"
context: "2026-11-06T12:45:00Z"
paths: ["tools/publicar-version.sh", "tools/juntar-cambios.mjs", ".changeset/README.md", "docs/VERSIONES.md"]
related: ["MIS-0291", "MIS-0290"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-292 — Publish every engine release with its semantic version and its notes

> **Summary:** A release of `numinia-engine` names itself only by its commit.
> This mission makes each release also say the semantic version it ships
> and the notes of every change since the last release, in a form a machine
> can read.
> **Epistemic:** Which semantic version a given engine build is, and what it brought.
> **Pragmatic:** numinia.com reads one file per release and shows version and notes.
> **Audience:** Agents · Oracles

---

## 1. Story

As the Oracle reading the Worlds room, I want each engine release to say
its version number and what it brought, so that `0.106.0` means something
to me and a build code does not.

---

## 2. Scope

`numinia-engine` only, one pull request. On 2026-11-06 at 12:30 UTC:

- The latest release is `motor-30c0431`. Its `imagen.json` holds `image`, `commit`, `build` and `digest`, with no version.
- `package.json` says `0.105.1`, and 15 merged `.changeset/` fragments wait for a `chore(release)` pull request to join them, so the number in `package.json` lags behind what is live.

The mission:

- makes `tools/publicar-version.sh`, which writes `imagen.json` at release, add `version`: the number the pending fragments give (`npm run cambios:juntar -- --comprobar`), or `package.json`'s when none are pending;
- adds a release asset `novedades.json`: one entry per fragment or `numinia-engine/docs/RUNLOG.md` entry since the previous release, each with its kind (patch, minor, major) and its text;
- updates `numinia-engine/docs/VERSIONES.md`.

The machine updater (`release.py` in `numinia-assets`) reads `imagen.json` and ignores fields it does not know. Its tests must still pass, unchanged.

If the change needs `.github/workflows/publicar-motor.yml`, the mission stops and the Oracle opens the gate for that one file.

---

## 3. Acceptance criteria

- [ ] `curl -sL https://github.com/numengames/numinia-engine/releases/latest/download/imagen.json` holds a `version` field that is a valid semantic version (today: no such field).
- [ ] `curl -sL https://github.com/numengames/numinia-engine/releases/latest/download/novedades.json` returns JSON with at least one entry, each entry with `kind` and `text` (today: 404).
- [ ] A test in `test/` builds both files from a fixture of fragments and fails if either field is missing (today: no such test).
- [ ] `numinia-engine/docs/VERSIONES.md` says where a release publishes its version and its notes (today: it says only that the page shows the version at the foot of the settings).

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 5 «sube el nivel».
- Why this card: the release script writes what every machine reads, so `release.py` must stay unchanged (Talos).
- Process: blind round 1 on 2026-11-06, agreed (doulos 3, talos 5, senet 3); sealed by Ursa as Scrum Master.

**Time — how much work there is**
- 30 minutes, in one board card titled `MIS-292 · …`.
- Like: the fragments change in `numinia-engine` (#306).
- Biggest risk: the release workflow file, which needs the Oracle.

---

## 5. What we learned

*(Written at the end.)*

---

## 6. Invoice

*(Pasted by the invoice script.)*
