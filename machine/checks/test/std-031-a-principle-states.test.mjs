// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-031-a-principle-states.test.mjs — what a principle leaves out, read by
// a machine.
//
// Four rules of STD-031 are measurable and so are checked: no tool (STA-006),
// no clock and no byline (STA-007), document names at the foot (STA-011) and
// the manual's names for the world (STA-012). Each is exercised here on a
// synthetic corpus, with the places the rule never reads (the header, the
// licence comment, the References table, a link's address, a «quotation»)
// pinned as silent.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFM } from '../../scripts/lib/frontmatter.mjs';
import { meta, run, glossaryTerms } from '../rules/std-031-a-principle-states.mjs';

const HEAD = '---\nid: "PRI-900"\ntitle: "A thing is so"\ntype: principle\nstatus: draft\nupdated: "2026-10-12T10:00:00+02:00"\nauthor: "ursa"\n---\n\n'
  + '<!--\nSPDX-FileCopyrightText: 2026 Numen Games S.L.\nSPDX-License-Identifier: CC0-1.0\n-->\n\n# A thing is so\n\n';
const REFS = '\n## References\n\n| ID | Title | Relation |\n|---|---|---|\n| `STD-031` | A principle states | written on GitHub, 2026-09-24 |\n';
const principle = (body) => HEAD + body + REFS;
const corpus = (files) => ({ root: '/nowhere', files: Object.keys(files), text: (r) => files[r], fm: (r) => parseFM(files[r]) });
const found = (body, plate) => run(corpus({ 'principles/PRI-900-a-thing-is-so.md': principle(body) }))
  .filter((f) => !plate || f.plate === plate)
  .map((f) => `${f.plate} ${f.where.split(':').pop()} ${f.what}`);

test('meta: the check speaks for STA and emits only the four measurable plates', () => {
  assert.equal(meta.family, 'STA');
  assert.deepEqual([...meta.plates].sort(), ['STA-006', 'STA-007', 'STA-011', 'STA-012']);
});

test('a principle with none of the four says nothing, header, licence and References included', () => {
  assert.deepEqual(found('The memory is a text. We keep it so anyone can read it.\n'), []);
});

test('STA-006: a vendor named in the prose is a finding at its line; its address in a link is not', () => {
  const got = found('The archive lives in one place.\nWe keep it on GitHub and talk on Discord.\nSee [the guide](https://github.com/x/y).\n', 'STA-006');
  assert.equal(got.length, 2, got.join('\n'));
  assert.ok(got.every((g) => g.startsWith('STA-006 18 ')), got.join('\n'));
  assert.match(got.join('\n'), /GitHub/);
  assert.match(got.join('\n'), /Discord/);
});

test('STA-006: a common word is not a tool — "notion" and "node" in lower case pass', () => {
  assert.deepEqual(found('The notion of a node in a graph is old.\n', 'STA-006'), []);
});

test('STA-007: a year, an ISO date and a month with a day are a clock; the date counts once', () => {
  const got = found('In 2024 we met.\nOn 2026-09-24 it changed.\nEvery 3 March we read it, and on October 12th too.\n', 'STA-007');
  assert.equal(got.length, 4, got.join('\n'));
  assert.match(got[0], /^STA-007 17 .*2024/);
  assert.match(got[1], /^STA-007 18 .*2026-09-24/);
});

test('STA-007: a person\'s name is a byline, by the sales kit\'s own detector', () => {
  const got = found('As Pablo Ramírez wrote, the city opens.\n', 'STA-007');
  assert.equal(got.length, 1, got.join('\n'));
  assert.match(got[0], /Pablo Ramírez/);
});

test('STA-007: numbers that are not years pass', () => {
  assert.deepEqual(found('A body fits 1,500 words and forty, forty, twenty; 300 copies.\n', 'STA-007'), []);
});

test('STA-011: a document id mid-sentence is a finding; the same id in the References table is not', () => {
  const got = found('The six attributes are in PRI-004, and `STD-031` says how to write.\n', 'STA-011');
  assert.equal(got.length, 2, got.join('\n'));
  assert.match(got.join('\n'), /PRI-004/);
  assert.match(got.join('\n'), /STD-031/);
});

test('STA-012: the manual\'s Spanish name in English prose is a finding; inside «» it is a quotation', () => {
  const got = found('Beyond the Umbral lies the Prisma. In Spanish it is «Umbral».\nThe Threshold is enough.\n', 'STA-012');
  assert.equal(got.length, 2, got.join('\n'));
  assert.match(got.join('\n'), /"Umbral".*"Threshold"/);
  assert.match(got.join('\n'), /"Prisma".*"Prism"/);
});

test('STA-012: the glossary is read from the manual, and a name that is the same in both is not a term', () => {
  const g = glossaryTerms();
  assert.equal(g.get('Umbral'), 'Threshold');
  assert.equal(g.get('Archivo Summa'), 'Summa Archive');
  assert.ok(!g.has('Numinia'), 'Numinia is the same in both languages');
  assert.ok(g.size > 100, `only ${g.size} terms read`);
});

test('only principles are read: a standard naming GitHub in 2026 is not this check\'s business', () => {
  const files = { 'standards/STD-900-x.md': principle('We use GitHub since 2026 and PRI-004.\n') };
  assert.deepEqual(run(corpus(files)), []);
});

test('a withdrawn principle and the series index are not read', () => {
  const withdrawn = principle('We use GitHub.\n').replace('status: draft', 'status: withdrawn');
  const files = { 'principles/PRI-901-x.md': withdrawn, 'principles/INDEX.md': 'GitHub 2026 PRI-004 Umbral\n' };
  assert.deepEqual(run(corpus(files)), []);
});
