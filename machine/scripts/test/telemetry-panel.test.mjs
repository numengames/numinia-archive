#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// telemetry-panel.test.mjs — /telemetry is a panel a product manager and a
// CTO can decide from, not a census.
//
// THE PROBLEM THIS COVERS
// The instrument already measured every document's tokens (docs.json) and
// kept a ledger of 400+ measurements (history.jsonl), and the page said
// "there is no chart". Four counters on the site each counted something
// else (259 · 261 · 333 · per-folder tiles), nobody counted by function, and
// half of the archive's tokens sat in files with no page without a word.
//
// WHAT IS UNDER TEST
//   1. The instrument counts every tracked file by kind (text, code, image,
//      data…), files and bytes, so the repository's make-up is measured.
//   2. web/src/lib/telemetry-panel.ts reads the dataset — never the tree —
//      into one row per text file (function, series, state, tokens, and why
//      it has no page when it has none) and one point per measured day,
//      skipping a measurement whose tokens are null instead of drawing a 0.
//   3. The page carries the panel: a period selector, the Product / CTO
//      lens, and one action line per panel with its threshold.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const MODULE = path.resolve(ROOT, 'web', 'src', 'lib', 'telemetry-panel.ts');
const PAGE = path.resolve(ROOT, 'web', 'src', 'pages', 'telemetry.astro');
const read = (p) => readFileSync(p, 'utf8');
const latest = () => JSON.parse(read(path.join(ROOT, 'machine', 'telemetry', 'latest.json')));

function ask(expression) {
  const script =
    `import(${JSON.stringify(MODULE)}).then(async (m) => {` +
    `  console.log(JSON.stringify(await (${expression})));` +
    `}).catch((e) => { console.error(e.stack || e.message); process.exit(1); });`;
  try {
    return JSON.parse(execFileSync('node', ['--experimental-strip-types', '--no-warnings', '-e', script], {
      cwd: path.join(ROOT, 'web'), encoding: 'utf8', maxBuffer: 1 << 26, stdio: ['ignore', 'pipe', 'pipe'],
    }));
  } catch (e) {
    throw new Error(`module call failed: ${(e.stdout ?? '') + (e.stderr ?? '')}`);
  }
}

// ── 1 · the instrument ──────────────────────────────────────────────────────

test('the instrument counts every tracked file by kind, files and bytes', () => {
  const f = latest().figures['corpus.files_by_kind'];
  assert.ok(f, 'latest.json has no corpus.files_by_kind');
  for (const k of ['Text', 'Code', 'Image', 'Data']) {
    assert.ok(f.value[k], `no "${k}" row in corpus.files_by_kind`);
    assert.ok(f.value[k].files > 0 && f.value[k].bytes > 0, `${k} has no files or no bytes`);
  }
  const files = Object.values(f.value).reduce((s, v) => s + v.files, 0);
  assert.equal(files, latest().figures['corpus.files_total'].value, 'the kinds do not add up to files_total');
});

// ── 2 · the reading ─────────────────────────────────────────────────────────

test('one row per text file the instrument measured, each with function, state, tokens and why', () => {
  const docs = JSON.parse(read(path.join(ROOT, 'machine', 'telemetry', 'docs.json')));
  const rows = ask(`m.panelRows(new Set(["standards/STD-004-the-header.md"]))`);
  assert.equal(rows.length, docs.length);
  const std004 = rows.find((r) => r.path === 'standards/STD-004-the-header.md');
  assert.equal(std004.why, 'page');
  assert.equal(std004.fn, 'Governance');
  assert.equal(std004.state, 'active');
  assert.ok(std004.tokens > 0);
  const manual = rows.find((r) => r.path.startsWith('lore/game/manual/es/'));
  assert.equal(manual.fn, 'Creation');
  assert.notEqual(manual.why, 'page', 'the manual has no page and the row must say why');
  for (const r of rows) assert.ok(r.why && r.fn && typeof r.tokens === 'number', `incomplete row ${r.path}`);
});

test('one point per measured day, never a zero for a measurement with no tokens', () => {
  const pts = ask(`m.panelSeries()`);
  assert.ok(pts.length >= 2, 'fewer than two days measured');
  const days = pts.map((p) => p.day);
  assert.deepEqual(days, [...new Set(days)].sort(), 'days repeat or are out of order');
  for (const p of pts) {
    assert.ok(p.tokens > 0, `${p.day} drawn with ${p.tokens} tokens`);
    const sum = Object.values(p.byFn).reduce((s, v) => s + v, 0);
    assert.equal(sum, p.tokens, `${p.day}: the functions do not add up to the total`);
  }
});

test('every folder the instrument measures falls in a function of the scheme, or the repository root', () => {
  const fns = ask(`m.functionOfDir`);
  for (const dir of ['canon', 'standards', 'protocols', 'decisions', 'blueprints', 'missions', 'reports', 'debt', 'machine', 'agents', 'lore', 'objects', 'operations', 'opportunities', 'legal', 'system'])
    assert.ok(fns[dir], `${dir}/ has no function`);
});

// ── 3 · the page ────────────────────────────────────────────────────────────

test('/telemetry is a panel: period, lens, an action line per panel', () => {
  const page = read(PAGE);
  for (const w of ['Week', 'Month', 'Quarter', 'All']) assert.match(page, new RegExp(`>${w}<`), `no "${w}" period`);
  assert.match(page, /type="date"/, 'no date range');
  assert.match(page, />Product</);
  assert.match(page, />CTO</);
  assert.match(page, /data-panel-action/, 'no action line');
  assert.doesNotMatch(page, /There is no chart/);
  assert.doesNotMatch(page, /Pablo FM/);
});
