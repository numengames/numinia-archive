#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// templates-page.test.mjs — /templates states nothing of its own.
//
// The page puts every template's header side by side (web/src/lib/templates.ts
// reads machine/templates/ at build time). Checked here: every template writes
// the common header in the one order the page's table lists it — the point of
// the page is to make a divergence visible, and the templates start clean — and
// the built page and its markdown twin carry every template and every field the
// folder holds, counted from the files, not from the page.
//
// Run: npm test  (the last two need web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT, parseFM } from '../lib/frontmatter.mjs';

const DIR = path.join(ROOT, 'machine', 'templates');
const TEMPLATES = readdirSync(DIR).filter((f) => /^[A-Z]{3}-TEMPLATE\.md$/.test(f)).sort();
const LIB = readFileSync(path.join(ROOT, 'web', 'src', 'lib', 'templates.ts'), 'utf8');
const COMMON = JSON.parse(/COMMON_ORDER = (\[[^\]]+\])/.exec(LIB)[1].replace(/\s+/g, ' '));
const fm = (f) => parseFM(readFileSync(path.join(DIR, f), 'utf8'));

test('every template writes the common header in the same order', () => {
  for (const f of [...TEMPLATES, 'MIS-TEMPLATE-EXAMPLE.md']) {
    const common = Object.keys(fm(f)).filter((k) => COMMON.includes(k));
    const sorted = [...common].sort((a, b) => COMMON.indexOf(a) - COMMON.indexOf(b));
    assert.deepEqual(common, sorted, `${f} writes the common header out of order`);
  }
});

test('the mission template and its example carry the same fields in the same order', () => {
  const blank = Object.keys(fm('MIS-TEMPLATE.md'));
  const filled = Object.keys(fm('MIS-TEMPLATE-EXAMPLE.md')).filter((k) => blank.includes(k));
  assert.deepEqual(filled, blank.filter((k) => filled.includes(k)), 'the example orders its fields like the template');
  for (const k of ['id', 'uid', 'title', 'type', 'status', 'priority', 'effort', 'guild', 'section', 'executor', 'assigned_to', 'completed'])
    assert.ok(k in fm('MIS-TEMPLATE-EXAMPLE.md'), `the example fills ${k}`);
});

const DIST = path.join(ROOT, 'web', 'dist');
const built = existsSync(path.join(DIST, 'templates', 'index.html'));

test('the built page shows every template and every field in the folder', { skip: !built && 'web/dist not built' }, () => {
  const html = readFileSync(path.join(DIST, 'templates', 'index.html'), 'utf8');
  const fields = new Set();
  for (const f of TEMPLATES) {
    const p = f.slice(0, 3);
    assert.match(html, new RegExp(`id="${p.toLowerCase()}"`), `the page has a section for ${p}`);
    for (const k of Object.keys(fm(f))) fields.add(k);
  }
  for (const k of fields) assert.match(html, new RegExp(`<code>${k}</code>`), `the table lists ${k}`);
  const shown = /Header fields<\/span><span class="tp-v">(\d+)</.exec(html);
  assert.ok(shown, 'the page prints its field count');
  assert.ok(Number(shown[1]) >= fields.size, `the count covers at least the written fields (${fields.size})`);
});

test('the markdown twin carries the same templates', { skip: !built && 'web/dist not built' }, () => {
  const md = readFileSync(path.join(DIST, 'templates.md'), 'utf8');
  for (const f of TEMPLATES) assert.match(md, new RegExp('`' + f.replace('.', '\\.') + '`'), `the .md lists ${f}`);
  assert.match(md, /Cite the source documents, not this view/);
});
