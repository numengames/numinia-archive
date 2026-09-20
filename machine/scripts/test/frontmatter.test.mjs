#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// frontmatter.test.mjs — the one header reader, proven two ways.
//
//   UNIT   the shapes the headers use, one case each, expected value spelled out.
//   ORACLE parseFM agrees with js-yaml's failsafe schema on every tracked
//          document. js-yaml is read from web/node_modules, where Astro
//          already brings it; when that folder is absent the oracle case is
//          a named skip, never a silent pass.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { ROOT, parseFM, rawFM, stripFM, NESTED } from '../lib/frontmatter.mjs';

const fm = (block) => parseFM(`---\n${block}\n---\nbody`);

test('no frontmatter → null', () => assert.equal(parseFM('# no fm'), null));
test('plain and quoted scalars are text, quotes stripped once', () => {
  assert.deepEqual(fm('a: x\nb: "y: z"\nc: \'w\''), { a: 'x', b: 'y: z', c: 'w' });
});
test('nothing is typed: numbers, booleans, dates, null stay words', () => {
  assert.deepEqual(fm('v: 1.10\nb: no\nd: 2026-01-01\nn: null\nt: ~'), { v: '1.10', b: 'no', d: '2026-01-01', n: 'null', t: '~' });
});
test('trailing comment removed on plain scalars, kept inside quotes', () => {
  assert.deepEqual(fm('a: digital  # digital|hybrid\nb: "x # y"'), { a: 'digital', b: 'x # y' });
});
test('empty value is "", not null — the header rule for empties needs the distinction', () => {
  assert.deepEqual(fm('uid:\nx: ""'), { uid: '', x: '' });
});
test('flow sequence → array of text; empty flow → []', () => {
  assert.deepEqual(fm('tags: [a, "b, c", d]\nrelated: []'), { tags: ['a', 'b, c', 'd'], related: [] });
});
test('flow sequence continued over lines', () => {
  assert.deepEqual(fm('paths: [\n  "a/b",\n  "c/d"\n]\nnext: ok'), { paths: ['a/b', 'c/d'], next: 'ok' });
});
test('block sequence of scalars → array; of mappings → NESTED', () => {
  assert.deepEqual(fm('paths:\n  - a\n  - "b"\nfondos:\n  - id: canon\n    n: 1\nafter: x'), { paths: ['a', 'b'], fondos: NESTED, after: 'x' });
});
test('nested mapping → NESTED', () => {
  assert.deepEqual(fm('call:\n  a: 1\n  b: 2\nz: y'), { call: NESTED, z: 'y' });
});
test('block scalars: literal keeps lines, folded joins them', () => {
  assert.deepEqual(fm('l: |\n  one\n  two\nf: >\n  one\n  two\nz: y'), { l: 'one\ntwo\n', f: 'one two\n', z: 'y' });
});
test('comment lines and indented stray lines are skipped', () => {
  assert.deepEqual(fm('# note\na: 1\n  stray\nb: 2'), { a: '1', b: '2' });
});
test('rawFM and stripFM split the document at the fence', () => {
  const t = '---\na: 1\n---\nbody';
  assert.equal(rawFM(t), 'a: 1');
  assert.equal(stripFM(t), '\nbody');
});

/* ---- ORACLE ---- */
const files = execFileSync('git', ['ls-files', '*.md'], { cwd: ROOT, encoding: 'utf8' }).trim().split('\n').filter((f) => f && !f.startsWith('web/'));
const webPkg = path.join(ROOT, 'web', 'package.json');
let yaml = null;
try { if (existsSync(webPkg)) yaml = createRequire(webPkg)('js-yaml'); } catch { yaml = null; }

test('oracle: parseFM equals js-yaml failsafe on every tracked document', (t) => {
  if (!yaml) return t.skip('js-yaml not present under web/node_modules');
  const flat = (v) => {
    if (v === null) return '';
    if (typeof v === 'string') return v;
    if (Array.isArray(v)) return v.every((x) => typeof x === 'string') ? v : NESTED;
    return NESTED;
  };
  const bad = [];
  for (const f of files) {
    const text = readFileSync(path.join(ROOT, f), 'utf8');
    const mine = parseFM(text);
    if (mine === null) continue;
    const real = yaml.load(rawFM(text), { schema: yaml.FAILSAFE_SCHEMA });
    if (!real || typeof real !== 'object' || Array.isArray(real)) { bad.push(`${f}: yaml gave ${typeof real}`); continue; }
    const theirs = Object.fromEntries(Object.entries(real).map(([k, v]) => [k, flat(v)]));
    try { assert.deepEqual(mine, theirs); } catch (e) { bad.push(`${f}\n${e.message}`); }
  }
  assert.deepEqual(bad, [], `${bad.length} document(s) read differently:\n${bad.slice(0, 5).join('\n\n')}`);
});
