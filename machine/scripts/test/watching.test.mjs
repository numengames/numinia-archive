#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// watching.test.mjs — the watch is designed in the archive, not only run on
// a machine (the Oracle, 2 October 2026: "the design goes ahead of what we
// implement").
//
// The tender radar ran, wrote to the feed and showed on the pipeline page
// before any procedure said so: the flow lived in one platform's skill. This
// holds the flow in the archive: a procedure from the sweep to the Oracle's
// decision; the watch's verdicts as a register the feed's filter reads; the
// rule on the feed pointing at the procedure and saying what checks it; the
// watcher's card sending to the procedure instead of saying "not yet in the
// archive"; the two screening procedures starting from it; and the playbook
// opening with it and walking every kind, not only a sale.
//
// Run: npm test  (the built-page checks need web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const read = (p) => readFileSync(path.join(ROOT, p), 'utf8');
const proFile = readdirSync(path.join(ROOT, 'procedures')).find((f) => /^PRO-\d{3}-watching-for-opportunities\.md$/.test(f));
const DIST = path.join(ROOT, 'web', 'dist');
const notBuilt = !existsSync(path.join(DIST, 'index.html')) && 'web/dist not built';
const body = (t) => t.replace(/^---[\s\S]*?\n---\n/, '');

test('a procedure holds the watch, from the sweep to the Oracle\'s decision', () => {
  assert.ok(proFile, 'procedures/PRO-NNN-watching-for-opportunities.md exists');
  const t = read(`procedures/${proFile}`);
  const b = body(t);
  assert.match(t, /^derived_from: "PRI-\d{3}"/m);
  assert.match(b, /\*\*Epistemic:\*\*[^\n]*\?/);
  for (const [what, re] of [
    ['the feed, by its repository', /numinia-archive-feed/],
    ['the rule it follows', /AUT-069/],
    ['the name check', /OPP-006/],
    ['the pipeline page that shows it', /\/system\/pipeline/],
    ['the register of verdicts', /STD-038/],
    ['the two screenings it hands to', /PRO-033[\s\S]*PRO-032|PRO-032[\s\S]*PRO-033/],
    ['the qualifying procedure for a sale', /PRO-028/],
    ['a reviewed pull request as the only way in', /pull request/],
    ['the rule of taking only what the house can take alone', /alone/i],
    ['the retuning of a filter', /retun|filter/i],
  ]) assert.match(b, re, `the procedure names ${what}`);
  assert.ok(b.split(/\s+/).filter(Boolean).length <= 900, 'under the 900-word cap');
});

test('the watch\'s verdicts are a register, and the feed\'s filter is in it', () => {
  const t = read('standards/STD-038-the-stages-of-an-opportunity.md');
  const sec = t.slice(t.indexOf('\n## A watch\'s verdict'));
  assert.ok(t.includes('\n## A watch\'s verdict'), 'STD-038 has the section');
  const rows = sec.split('\n').filter((l) => /^\| `[a-z]+` \|/.test(l));
  assert.deepEqual(rows.map((r) => r.match(/^\| `([a-z]+)`/)[1]), ['high', 'medium', 'low', 'none']);
  const feed = rows.map((r) => r.split('|').map((c) => c.trim())).map((c) => c[c.length - 2]);
  assert.deepEqual(feed.map((f) => /^yes/.test(f)), [true, true, false, false], 'high and medium go to the feed; low and none do not (the Oracle, 2026-10-08)');
});

test('the rule on the feed points at the procedure and says what checks it', () => {
  const row = read('standards/STD-017-who-may-change-what.md').split('\n').find((l) => l.startsWith('| AUT-069 |'));
  assert.doesNotMatch(row, /not read here/, 'the archive reads the feed now');
  assert.match(row, /web\/src\/lib\/feed\.ts/);
  assert.match(row, new RegExp(proFile.slice(0, 7)));
});

test('the watcher\'s card sends to the procedure; nothing of the flow is "not yet in the archive"', () => {
  const src = read('agents/kairos/SOURCES.md');
  assert.match(src, new RegExp(proFile.slice(0, 7)));
  assert.doesNotMatch(src, /The watching procedure itself[^\n]*\n[^\n]*still live/, 'the old "not yet in the archive" paragraph is gone');
  const op = read('agents/kairos/OPERATOR.md');
  assert.match(op, /numinia-archive-feed/, 'the operator file allows the write to the feed, by name');
});

test('the screenings start from the watch', () => {
  const id = proFile.slice(0, 7);
  for (const f of ['procedures/PRO-033-screening-a-tender.md', 'procedures/PRO-032-applying-for-a-grant.md']) {
    const b = body(read(f));
    assert.match(b, new RegExp(id), `${f} names the watch`);
    assert.ok(b.split(/\s+/).filter(Boolean).length <= 900, `${f} under the cap`);
  }
});

test('the playbook opens with the watch and walks every kind', { skip: notBuilt }, () => {
  const html = readFileSync(path.join(DIST, 'playbook', 'index.html'), 'utf8');
  const watch = html.indexOf('data-before-record');
  assert.ok(watch > 0, 'a chapter before the record');
  assert.ok(watch < html.indexOf('data-kind="sale"'), 'and it comes first');
  assert.match(html.slice(watch, html.indexOf('data-kind="sale"')), new RegExp(`/procedures/${proFile.replace(/\.md$/, '').toLowerCase()}`));
  for (const k of ['sale', 'tender', 'grant', 'collaboration', 'partner']) assert.match(html, new RegExp(`data-kind="${k}"`), `a chapter for ${k}`);
  for (const p of ['pro-033-screening-a-tender', 'pro-031-bidding-for-a-tender', 'pro-032-applying-for-a-grant']) assert.match(html, new RegExp(`/procedures/${p}`));
  const md = readFileSync(path.join(DIST, 'playbook.md'), 'utf8');
  assert.match(md, /Before the record/);
});
