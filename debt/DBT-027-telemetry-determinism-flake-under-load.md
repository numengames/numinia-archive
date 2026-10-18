---
id: "DBT-027"
uid: ""
title: "telemetry.test.mjs's determinism check flakes when the suite runs under load"
type: documentation
status: active
version: "0.1.0"
created: "2026-10-18T18:10:00+02:00"
updated: "2026-10-18T18:10:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Knowledge and quality"
tags: [debt, tests, telemetry, flake]
license: "CC-BY-4.0"
severity: low
severity_reason: "nothing it measures is wrong; the check itself races against the rest of the suite. Re-running `npm test` alone shows corpus.files_by_kind is stable (three sequential telemetry.mjs runs agree byte for byte)"
detected: "2026-10-18T18:05:00+02:00"
visibility: "public"
visibility_reason: "anyone running the full suite deserves to know a lone red run is not their change's fault"
opened_by: "ursa"
related: ["MIS-138"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# DBT-027 — telemetry.test.mjs's determinism check flakes under load

> **Summary:** `machine/scripts/test/telemetry.test.mjs`'s "deterministic: two
> runs agree on every value" case runs `telemetry.mjs --print` twice and diffs
> the figures. On a clean checkout it passes every time; inside the full
> `npm test` run (977 tests, parallel by default) it fails about one run in
> three, always on `corpus.files_by_kind`. Three direct, sequential
> `node machine/scripts/telemetry.mjs --print` calls on the same tree agree
> byte for byte, so the corpus count itself is not wrong — something else the
> suite writes under the tree (a cache, a scratch clone, a build artefact)
> is still landing while this test's second run scans it.
> **Epistemic:** A check that sometimes fails on an unchanged tree teaches
> nothing when it is red; a reviewer cannot tell a real regression from this
> race without rerunning it.
> **Pragmatic:** Rerun `npm test` (or run `telemetry.test.mjs` alone) before
> treating this one case as a real failure. Repair: either give the
> determinism check its own scratch copy of the tree (as the truth check
> already does with `scratchClone()`), or move it out of the parallel test
> run.
