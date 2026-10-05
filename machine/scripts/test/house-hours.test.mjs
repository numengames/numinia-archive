#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// house-hours.test.mjs — the house's hours are written down, and the header
// rule on dates sends a reader to them.
//
// Every header date carries a real hour (STD-004, HDR-045). Where the date's
// source gives none, the hour comes from a written convention, not from the
// writer's guess: the card operations/OPS-022. This test holds the card to
// the rulings it records — the zone, the office hours, the two clocks, the
// send windows and the hour each kind of date takes — and holds STD-004 to
// pointing at it.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { ROOT, parseFM } from '../lib/frontmatter.mjs';

const find = (dir, prefix) => readdirSync(path.join(ROOT, dir)).find((f) => f.startsWith(prefix));
const read = (dir, prefix) => {
  const f = find(dir, prefix);
  assert.ok(f, `${dir}/${prefix}* does not exist`);
  return readFileSync(path.join(ROOT, dir, f), 'utf8');
};

test('OPS-022 exists, a draft register with the header the operations cards carry', () => {
  const fm = parseFM(read('operations', 'OPS-022-'));
  assert.equal(fm.id, 'OPS-022');
  assert.equal(fm.type, 'documentation');
  assert.equal(fm.subtype, 'register');
  assert.equal(fm.status, 'draft');
  assert.equal(fm.section, 'Operations');
  for (const id of ['STD-004', 'OPS-018', 'PRO-028', 'PRO-029', 'PRO-036'])
    assert.ok([].concat(fm.related ?? []).includes(id), `related does not name ${id}`);
});

test('OPS-022 names the zone and the office hours: Monday to Thursday 09:00–18:00 with lunch, Friday 09:00–14:00, 37 h', () => {
  const t = read('operations', 'OPS-022-');
  assert.match(t, /Europe\/Madrid/);
  const row = t.split('\n').find((l) => l.startsWith('|') && /Monday to Thursday/.test(l));
  assert.ok(row, 'no office-hours row for Monday to Thursday');
  assert.match(row, /09:00[–-]18:00/);
  assert.match(t, /14:00[–-]15:00/, 'the lunch hour is not written');
  const fri = t.split('\n').find((l) => l.startsWith('|') && /Friday/.test(l) && /09:00/.test(l));
  assert.ok(fri, 'no office-hours row for Friday');
  assert.match(fri, /09:00[–-]14:00/);
  assert.match(t, /\b37 h\b/, 'the weekly total is not 37 h');
  assert.match(t, /\b40 h\b/, 'the legal maximum is not compared');
  assert.match(t, /37\.8 h/, 'the collective-agreement average is not compared');
});

test('OPS-022 draws the two clocks: people work office hours, digital agents work at any hour', () => {
  const t = read('operations', 'OPS-022-');
  assert.match(t, /two clocks/i);
  assert.match(t, /biological agents?|people/i);
  assert.match(t, /digital agents?/i);
  assert.match(t, /24\/7|any hour/i);
  assert.match(t, /Las Rozas de Madrid/, 'the local holidays are not named');
});

test('OPS-022 sets the send windows: Tuesday to Thursday 10:00 in the recipient\'s time, never late, never at weekends', () => {
  const t = read('operations', 'OPS-022-');
  assert.match(t, /Tuesday to Thursday/);
  assert.match(t, /10:00/);
  assert.match(t, /recipient'?s? (local )?time/i);
  assert.match(t, /after 18:00/);
  assert.match(t, /Friday after 14:00/);
  assert.match(t, /weekend/i);
});

test('OPS-022 gives the hour each kind of date takes when its source gives none: 23:59, 10:00, 09:00', () => {
  const t = read('operations', 'OPS-022-');
  const rows = t.split('\n').filter((l) => l.startsWith('|'));
  assert.ok(rows.some((l) => /23:59/.test(l) && /until|deadline|valid/i.test(l)), 'no 23:59 row for a deadline');
  assert.ok(rows.some((l) => /10:00/.test(l) && /review/i.test(l)), 'no 10:00 row for a scheduled review');
  assert.ok(rows.some((l) => /09:00/.test(l) && /happened|recorded/i.test(l)), 'no 09:00 row for a day whose hour nobody recorded');
  assert.ok(rows.some((l) => /09:00/.test(l) && /start/i.test(l)), 'no 09:00 row for a contract start');
});

test('STD-004: the rule on dates and HDR-045 point to the house\'s hours', () => {
  const t = read('standards', 'STD-004-');
  const rule = t.slice(t.indexOf("**Dates are written the internet's way.**"), t.indexOf('## Check'));
  assert.match(rule, /OPS-022/, 'the rule does not say where the hour comes from');
  const row = t.split('\n').find((l) => l.startsWith('| HDR-045 '));
  assert.ok(row, 'no HDR-045 row');
  assert.doesNotMatch(row, /by hand/, 'HDR-045 is still checked by hand');
  assert.match(row, /OPS-022/);
});
