// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// translator.test.mjs — the business's areas and the city's guilds, one table.
//
// The Oracle, 2026-10-01: the archive is read two ways, by a company's areas
// (the new moon) and by the city's guilds and factions (the full moon), and
// what joins them must be written once and be very clear. The world's
// vocabulary (STD-030) holds that translator. This test keeps it whole:
//
//   SECTIONS   the front door's sections, each with a line of 15 words at
//              most — the site prints that line under the title;
//   AREAS      every business area sits in one declared section; every house
//              it names is a house of the guild tables above it; every house
//              of those tables carries at least one area;
//   GAPS       an area with no house says so with a dash, and is listed;
//   LINES      every faction of the factions table carries exactly one
//              business line and one district.
//
// Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const STD = readFileSync(path.join(ROOT, 'standards/STD-030-the-worlds-vocabulary.md'), 'utf8');

/** The rows of the table under a `## heading`, as arrays of trimmed cells. */
function table(heading) {
  const at = STD.indexOf(`\n## ${heading}\n`);
  assert.ok(at >= 0, `STD-030 has no "## ${heading}" section`);
  const rest = STD.slice(at + heading.length + 5);
  const end = rest.search(/\n## /);
  const body = end < 0 ? rest : rest.slice(0, end);
  return body.split('\n')
    .filter((l) => l.startsWith('|') && !/^\|\s*-/.test(l))
    .slice(1)
    .map((l) => l.slice(1, -1).split('|').map((c) => c.trim().replace(/\*\*/g, '')));
}

const words = (s) => s.split(/\s+/).filter(Boolean).length;

/** Every house: the rows of the four guild tables that are not the guild or a branch. */
const GUILDS = ['Alchemists', 'Exegetes', 'Procurators', 'Sentinels'];
const BRANCHES = ['Handcrafters', 'Engineers', 'Chroniclers', 'Scholars', 'Legates', 'Trustees', 'Seraphs', 'Archangels'];
const houses = () => GUILDS.flatMap((g) => table(`Guilds — ${g}`).map((r) => r[0]))
  .filter((n) => !GUILDS.includes(n) && !BRANCHES.includes(n));

test('sections: each has a line of fifteen words at most', () => {
  const rows = table('Sections of the front door');
  assert.ok(rows.length >= 8, 'at least eight sections');
  const long = rows.filter((r) => words(r[1]) > 15).map((r) => `${r[0]} (${words(r[1])} words)`);
  assert.deepEqual(long, [], 'a section line is 15 words at most');
});

test('areas: each sits in a declared section and names real houses', () => {
  const sections = new Set(table('Sections of the front door').map((r) => r[0]));
  const all = new Set(houses());
  const bad = [];
  for (const [area, section, guild, branch, house] of table('Business areas')) {
    if (!sections.has(section)) bad.push(`${area}: section "${section}" is not declared`);
    if (house === '—') continue;
    if (!GUILDS.includes(guild)) bad.push(`${area}: "${guild}" is not a guild`);
    if (!BRANCHES.includes(branch)) bad.push(`${area}: "${branch}" is not a branch`);
    if (!all.has(house)) bad.push(`${area}: "${house}" is not a house of the guild tables`);
  }
  assert.deepEqual(bad, []);
});

test('areas: every house of the guild tables carries at least one area', () => {
  const named = new Set(table('Business areas').map((r) => r[4]));
  const idle = houses().filter((h) => !named.has(h));
  assert.equal(houses().length, 16, 'four guilds, two branches each, two houses per branch');
  assert.deepEqual(idle, [], 'a house with no business area');
});

test('gaps: an area no house carries is listed with a dash, and there is at least one', () => {
  const gaps = table('Business areas').filter((r) => r[4] === '—');
  assert.ok(gaps.length > 0, 'the gaps are part of the translator, not hidden');
  for (const r of gaps) assert.equal(r[2], '—', `${r[0]}: a gap names no guild either`);
});

test('lines: every faction carries one business line and one district', () => {
  const factions = table('Factions').map((r) => r[0]);
  const lines = table('Business lines');
  assert.deepEqual(lines.map((r) => r[1]).sort(), [...factions].sort(), 'one row per faction, no more');
  for (const [line, , district] of lines) {
    assert.ok(line && district, `${line}: needs a line and a district`);
  }
});
