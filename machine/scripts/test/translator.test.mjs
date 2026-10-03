// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// translator.test.mjs — a company's sections and the city's guilds, one table.
//
// The Oracle, 2026-10-01: the archive is read two ways, the way a company
// reads itself (the new moon) and by the city's guilds and factions (the full
// moon), and what joins them must be written once and be very clear. The
// world's vocabulary (STD-030) holds that translator; web/src/lib/translator.mjs
// reads it for the site and for this test. Kept whole here:
//
//   SECTIONS     unique names, a line of 7 to 15 words (the site prints it
//                under the title), an APQC category with its number;
//   DISCIPLINES  each sits in a declared section and names a real guild,
//                branch and house in that order; every house carries at least
//                one; each match says whether a source states it or it is
//                proposed; gaps have a dash all along;
//   COVERAGE     every section has at least one discipline or gap;
//   LINES        every faction carries one business line and one district;
//   DECIDES      every document cited in "Who decides" exists;
//   HEADER       (ADR-066) every record that carries a header carries exactly
//                one `section`, it is one of the ten, and the header guard's
//                list is STD-030's list, word for word.
//
// Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT, parseFM } from '../lib/frontmatter.mjs';
import { table, sections, disciplines, businessLines, whoDecides, guilds, servedBy, GUILD_TABLES } from '../../../web/src/lib/translator.mjs';

const words = (s) => s.split(/\s+/).filter(Boolean).length;
const APQC = /^(1[0-3]|[1-9])\.0 /;

test('the parser refuses a missing table and a row of the wrong width', () => {
  assert.throws(() => table('Nowhere', '# x\n'), /no "## Nowhere"/);
  const bad = '## T\n\n| a | b |\n|---|---|\n| 1 | 2 | 3 |\n';
  assert.throws(() => table('T', bad), /3 cells where the header has 2/);
  const esc = '## T\n\n| a | b |\n|---|---|\n| x \\| y | 2 |\n';
  assert.deepEqual(table('T', esc), [{ a: 'x | y', b: '2' }]);
});

test('sections: unique, a line of 7 to 15 words, an APQC category', () => {
  const rows = sections();
  const names = rows.map((r) => r.Section);
  assert.equal(new Set(names).size, names.length, 'a section is named once');
  const bad = rows.filter((r) => words(r.Line) < 7 || words(r.Line) > 15).map((r) => `${r.Section} (${words(r.Line)} words)`);
  assert.deepEqual(bad, [], 'a section line is 7 to 15 words');
  const noApqc = rows.filter((r) => !APQC.test(r['APQC category'])).map((r) => r.Section);
  assert.deepEqual(noApqc, [], 'each section names its APQC category by number');
});

test('disciplines: each names a declared section and a real guild, branch and house', () => {
  const declared = new Set(sections().map((r) => r.Section));
  const map = new Map();
  for (const g of guilds()) for (const b of g.branches) for (const h of b.houses) map.set(h, { guild: g.guild, branch: b.branch });
  const bad = [];
  for (const r of disciplines()) {
    if (!declared.has(r.Section)) bad.push(`${r.Discipline}: section "${r.Section}" is not declared`);
    if (r.House === '—') {
      if (r.Guild !== '—' || r.Branch !== '—' || r.Basis !== '—') bad.push(`${r.Discipline}: a gap is a dash all along`);
      continue;
    }
    const at = map.get(r.House);
    if (!at) { bad.push(`${r.Discipline}: "${r.House}" is not a house of the guild tables`); continue; }
    if (at.guild !== r.Guild || at.branch !== r.Branch) bad.push(`${r.Discipline}: ${r.House} is ${at.guild} · ${at.branch}, not ${r.Guild} · ${r.Branch}`);
    if (!['stated', 'proposed'].includes(r.Basis)) bad.push(`${r.Discipline}: basis "${r.Basis}" is neither stated nor proposed`);
  }
  assert.deepEqual(bad, []);
});

test('disciplines: every house of the four guilds carries at least one', () => {
  const houses = guilds().flatMap((g) => g.branches.flatMap((b) => b.houses));
  assert.equal(GUILD_TABLES.length, 4);
  assert.equal(houses.length, 16, 'four guilds, two branches each, two houses per branch');
  const named = new Set(disciplines().map((r) => r.House));
  assert.deepEqual(houses.filter((h) => !named.has(h)), [], 'a house with no discipline');
});

test('coverage: every section has at least one discipline or gap', () => {
  const empty = sections().map((r) => r.Section)
    .filter((s) => { const x = servedBy(s); return !x.houses.length && !x.gaps.length; });
  assert.deepEqual(empty, []);
});

test('business lines: every faction carries one line and one district', () => {
  const factions = table('Factions').map((r) => r['In-world']);
  const rows = businessLines();
  assert.deepEqual(rows.map((r) => r.Faction).sort(), [...factions].sort(), 'one row per faction, no more');
  for (const r of rows) assert.ok(r['Business line'] && r.District, `${r.Faction}: needs a line and a district`);
});

test('who decides: every document it cites exists', () => {
  const tracked = execFileSync('git', ['ls-files', '*.md'], { cwd: ROOT, encoding: 'utf8' });
  const cited = whoDecides().flatMap((r) => Object.values(r).join(' ').match(/`([A-Z]{3}-\d{3})`/g) ?? [])
    .map((s) => s.replace(/`/g, ''));
  assert.ok(cited.length > 0);
  const missing = [...new Set(cited)].filter((id) => !new RegExp(`/${id}-`).test(tracked));
  assert.deepEqual(missing, []);
});

test('header: every record carries exactly one section, and it is one of the ten', () => {
  // The series folders carry a header ring; lore/, web/ and machine/ do not
  // (the header guard's OUTWARD), and the moulds show a placeholder value.
  const names = new Set(sections().map((r) => r.Section));
  const files = execFileSync('git', ['ls-files', '*.md'], { cwd: ROOT, encoding: 'utf8' }).split('\n')
    .filter((f) => /\//.test(f) && !/^(web|machine|lore|home|\.github|LICENSES)\//.test(f) && !/\/(README|_template\/.*)\.md$/.test(f));
  assert.ok(files.length > 200, `only ${files.length} record(s) found`);
  const wrong = [];
  for (const f of files) {
    const text = readFileSync(path.join(ROOT, f), 'utf8');
    if (!text.startsWith('---')) continue;
    const found = [...text.split('---')[1].matchAll(/^section:\s*"(.*)"\s*$/gm)].map((m) => m[1]);
    if (found.length !== 1 || !names.has(found[0])) wrong.push(`${f}: ${found.join(' | ') || '(none)'}`);
    if (/^territory:/m.test(text.split('---')[1])) wrong.push(`${f}: still carries territory`);
  }
  assert.deepEqual(wrong, []);
});

test('header: the guard lists the ten sections of STD-030, word for word', () => {
  const guard = readFileSync(path.join(ROOT, 'machine/guards/rules/std-004-the-header.mjs'), 'utf8');
  const m = guard.match(/^\s*section: \[(.*)\],\s*$/m);
  assert.ok(m, 'the header guard has no `section` vocabulary');
  const listed = [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
  assert.deepEqual(listed, sections().map((r) => r.Section));
});
