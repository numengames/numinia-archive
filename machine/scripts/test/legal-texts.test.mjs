// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// THE LEGAL TEXTS SAY WHAT THE SITE DOES, AND NOTHING FOR INSIDERS.
//
// The masters in legal/ are published as they are: every word below the
// frontmatter reaches a visitor. Review notes, template leftovers and old
// addresses belong in the frontmatter's review_flags, where the site never
// shows them. And the cookie policy is a list of what the site stores: a
// key the code writes and the policy does not name is a false policy.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const LEGAL = path.join(ROOT, 'legal');
const masters = readdirSync(LEGAL).filter((f) => /^LEG-\d{3}-.+\.md$/.test(f));
const bodyOf = (f) => {
  const text = readFileSync(path.join(LEGAL, f), 'utf8');
  return text.slice(text.indexOf('\n---\n', 4) + 5);
};

// What a reader must never meet in a published legal text.
const FORBIDDEN = [
  /\bDRAFT\b/, /\[PENDING/i, /\bFLAG-\d/, /review flags?/i, /frontmatter/i,
  /Audience:\*\*\s*Oracle/i, /pending Oracle/i, /scope is under review/i,
  /archival note/i, /nota de archivo/i, /cuota de socio/i,
  /startupvalencia/i, /gm@numengames\.com/i,
];

test('the four legal masters exist: privacy, terms, cookies, legal notice', () => {
  for (const id of ['LEG-001', 'LEG-002', 'LEG-003', 'LEG-004'])
    assert.ok(masters.some((f) => f.startsWith(id)), `${id} missing from legal/`);
});

for (const f of masters) {
  test(`${f}: no internal note reaches the reader`, () => {
    const body = bodyOf(f);
    for (const re of FORBIDDEN) assert.doesNotMatch(body, re, `${f} shows ${re}`);
  });

  test(`${f}: the only address for legal matters is legal@numengames.com`, () => {
    const emails = [...bodyOf(f).matchAll(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g)].map((m) => m[0]);
    assert.deepEqual([...new Set(emails)].filter((e) => e !== 'legal@numengames.com'), []);
  });
}

test('the legal notice names the company, its tax ID and its address', () => {
  const body = bodyOf(masters.find((f) => f.startsWith('LEG-004')));
  for (const fact of ['NUMEN GAMES S.L.', 'B70735949', 'Calle Chile 10', '28290', 'legal@numengames.com'])
    assert.ok(body.includes(fact), `LEG-004 lacks ${fact}`);
});

// LSSI art. 10.1.b: the Mercantile Registry entry, as the registration
// notice gives it (DBT-022 #1). Never a placeholder.
test('the legal notice gives the Mercantile Registry entry', () => {
  const body = bodyOf(masters.find((f) => f.startsWith('LEG-004')));
  for (const fact of ['Mercantile Registry of Madrid', 'volume 46518', 'folio 130', 'sheet M-816810', 'entry 1'])
    assert.ok(body.includes(fact), `LEG-004 lacks ${fact}`);
  assert.doesNotMatch(body, /\[PENDING|TODO|XXX/);
});

test('the privacy policy and the legal notice state the age of 18', () => {
  for (const id of ['LEG-001', 'LEG-004'])
    assert.match(bodyOf(masters.find((f) => f.startsWith(id))), /aged\s+18\s+or\s+over/);
});

// Every key numinia.org's code writes must appear in LEG-003 §3.2.
test('numinia.org stores nothing the cookie policy does not name', () => {
  const src = path.join(ROOT, 'web', 'src');
  const files = [];
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(astro|ts|tsx|js|mjs)$/.test(e.name)) files.push(p);
    }
  };
  walk(src);
  const keys = new Set();
  for (const f of files) {
    const code = readFileSync(f, 'utf8');
    for (const m of code.matchAll(/(?:local|session)Storage\.setItem\(\s*["'`]([^"'`$]+)/g)) keys.add(m[1]);
    for (const m of code.matchAll(/const\s+\w*KEY\w*\s*=\s*["'`]([^"'`$]+)/g)) keys.add(m[1]);
    for (const m of code.matchAll(/CONSENT_COOKIE\s*=\s*["']([^"']+)/g)) keys.add(m[1]);
  }
  const policy = bodyOf(masters.find((f) => f.startsWith('LEG-003')));
  const org = policy.slice(policy.indexOf('### 3.2'), policy.indexOf('### 3.3'));
  const missing = [...keys].filter((k) => !org.includes('`' + k));
  assert.deepEqual(missing, [], 'keys stored by numinia.org but absent from LEG-003 §3.2');
});
