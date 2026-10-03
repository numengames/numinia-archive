#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// core-flow.test.mjs — the core reads as a flow: each canon, the standards
// that make it concrete, the procedures that carry it out.
//
// THE PROBLEM THIS COVERS
// The Oracle reviews the core by listening to it end to end (2026-09-27).
// Read shelf by shelf, the canon, the standards and the procedures are three
// lists; the question he brings is causal — this belief, these rules, these
// steps. Cross-citations cannot answer it: a standard cites several canons,
// and fifteen standards cited none. So each standard and each procedure names
// the one canon it comes from in its header (`derived_from`, a relation
// STD-004 already registers), and /core is built from that field alone.
//
// WHAT IS UNDER TEST
//   1. every standard and procedure in the tree names exactly one canon that
//      exists (the fact lives in one place, and a missing anchor fails here);
//   2. web/src/lib/core.ts groups a scratch archive by that field, reads the
//      body without the Check and References apparatus, and throws on a
//      document with no anchor rather than dropping it from the page;
//   3. /core is an address the site admits.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { ROOT, parseFM } from '../lib/frontmatter.mjs';

const CORE = path.join(ROOT, 'web', 'src', 'lib', 'core.ts');
const ls = (glob) => execFileSync('git', ['-C', ROOT, 'ls-files', glob], { encoding: 'utf8' })
  .split('\n').filter(Boolean);

test('every standard and procedure names the one canon it comes from', () => {
  const canons = new Set(ls('canon/CAN-*.md').map((f) => f.match(/CAN-\d{3}/)[0]));
  const docs = [...ls('standards/STD-*.md'), ...ls('procedures/PRO-*.md')];
  assert.ok(docs.length >= 40, `only ${docs.length} rule documents found`);
  const bad = [];
  for (const f of docs) {
    const fm = parseFM(readFileSync(path.join(ROOT, f), 'utf8')) ?? {};
    const v = fm.derived_from;
    if (typeof v !== 'string' || !canons.has(v)) bad.push(`${f}: derived_from ${JSON.stringify(v)}`);
  }
  assert.deepEqual(bad, [], `each needs derived_from: "CAN-NNN" naming an existing canon:\n  ${bad.join('\n  ')}`);
});

const doc = (id, title, extra = '', body = '') =>
  `---\nid: "${id}"\ntitle: "${title}"\nstatus: draft\n${extra}---\n\n<!--\nSPDX\n-->\n\n# ${title}\n\n> **Summary:** S of ${id}.\n> **Epistemic:** Q of ${id}?\n\n${body}`;

function scratch() {
  const dir = mkdtempSync(path.join(tmpdir(), 'core-'));
  mkdirSync(path.join(dir, 'web'), { recursive: true });
  for (const d of ['canon', 'standards', 'procedures']) mkdirSync(path.join(dir, d));
  writeFileSync(path.join(dir, 'canon', 'CAN-001-a.md'), doc('CAN-001', 'Belief A'));
  writeFileSync(path.join(dir, 'canon', 'CAN-002-b.md'), doc('CAN-002', 'Belief B'));
  writeFileSync(path.join(dir, 'standards', 'STD-001-x.md'),
    doc('STD-001', 'Rule X', 'derived_from: "CAN-001"\n',
      '## Rules\n\n**Keep it.** It MUST be kept.\n\n## Check\n\n| Plate | Rule |\n|---|---|\n| X-001 | Keep it |\n\n## Why\n\nBecause.\n\n## References\n\n| ID | Title |\n|---|---|\n'));
  writeFileSync(path.join(dir, 'procedures', 'PRO-001-y.md'),
    doc('PRO-001', 'Steps Y', 'derived_from: "CAN-001"\n', '## 1. Trigger\n\nWhen asked.\n'));
  return dir;
}

function ask(dir, expression) {
  const script = `import(${JSON.stringify(CORE)}).then((c) => console.log(JSON.stringify(${expression})))` +
    `.catch((e) => { console.error(e.message); process.exit(1); });`;
  try {
    return { code: 0, out: execFileSync('node', ['--experimental-strip-types', '-e', script],
      { cwd: path.join(dir, 'web'), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout ?? '') + (e.stderr ?? '') };
  }
}

test('the flow groups each canon with its standards and procedures, from the header alone', () => {
  const dir = scratch();
  try {
    const { code, out } = ask(dir, 'c.coreFlow()');
    assert.equal(code, 0, out);
    const flow = JSON.parse(out);
    assert.deepEqual(flow.map((c) => c.id), ['CAN-001', 'CAN-002']);
    assert.deepEqual(flow[0].standards.map((d) => d.id), ['STD-001']);
    assert.deepEqual(flow[0].procedures.map((d) => d.id), ['PRO-001']);
    assert.deepEqual(flow[1].standards, []);
    assert.equal(flow[0].question, 'Q of CAN-001?');
    assert.equal(flow[0].href, '/core/can-001-a');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('the reading keeps the rules and the why, and leaves out the Check and References apparatus', () => {
  const dir = scratch();
  try {
    const { code, out } = ask(dir, 'c.coreFlow()[0].standards[0].reading');
    assert.equal(code, 0, out);
    const md = JSON.parse(out);
    assert.match(md, /It MUST be kept/);
    assert.match(md, /Because\./);
    assert.doesNotMatch(md, /X-001/);
    assert.doesNotMatch(md, /## References/);
    assert.doesNotMatch(md, /^---/);
    assert.doesNotMatch(md, /^# Rule X/m, 'the page prints the title itself');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('no comment opener survives the reading, even nested or unclosed', () => {
  const dir = scratch();
  try {
    writeFileSync(path.join(dir, 'standards', 'STD-001-x.md'),
      doc('STD-001', 'Rule X', 'derived_from: "CAN-001"\n', '<!--<!-- x -->-->\n\nKept.\n\n<!-- open\n'));
    const { code, out } = ask(dir, 'c.coreFlow()[0].standards[0].reading');
    assert.equal(code, 0, out);
    assert.doesNotMatch(JSON.parse(out), /<!--/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a standard with no canon fails the build rather than vanishing from the flow', () => {
  const dir = scratch();
  try {
    writeFileSync(path.join(dir, 'standards', 'STD-002-z.md'), doc('STD-002', 'Orphan'));
    const { code, out } = ask(dir, 'c.coreFlow()');
    assert.equal(code, 1, `expected a throw, got: ${out}`);
    assert.match(out, /STD-002/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('/core is an address the site admits', () => {
  const shape = readFileSync(path.join(ROOT, 'machine', 'scripts', 'check-url-shape.mjs'), 'utf8');
  assert.match(shape, /'\/core',/);
  assert.ok(existsSync(path.join(ROOT, 'web', 'src', 'pages', 'core.astro')), 'web/src/pages/core.astro is missing');
});
