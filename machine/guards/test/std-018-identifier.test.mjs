// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// Fixture tests for IDN-011, the reports/ rule (ADR-005 v1.2.0), on
// machine/guards/rules/std-018-one-identifier.mjs.
//
// Written 2026-09-01 for lint-naming.mjs with the reports/ normalisation;
// moved with the rule in R3. The guard is a module on the contract, so the
// fixture calls run() on a corpus built from a throwaway git repo — no
// process, no copied libraries. Nothing here touches the real tree.
//
// What is pinned:
//   - RPT-YYYY-MM-DD.md is legal in reports/ ONLY when subtype: daily
//   - a daily with a numbered id is a violation; a non-daily with a dated id is one too
//   - the date shape is not legal anywhere else (missions/RPT-2026-01-01.md fails)
//   - reports/evidence/** is not held to the series scheme
//   - AUD- is no longer a shape reports/ accepts
//
// Run: npm test

import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { loadCorpus } from '../lib/guard.mjs';
import { run } from '../rules/std-018-one-identifier.mjs';

const fixtures = {
  'reports/RPT-2026-01-01.md':               'subtype: daily',
  'reports/RPT-2026-01-02.md':               'subtype: audit',
  'reports/RPT-2026-01-03-with-slug.md':     'subtype: analysis',
  'reports/RPT-001-numbered-daily.md':       'subtype: daily',
  'reports/RPT-003-wardley-map.md':          'subtype: analysis',
  'reports/AUD-2026-08-17-stack.md':         'subtype: audit',
  'reports/evidence/RPT-011/captured.md':    'subtype: audit',
  'missions/RPT-2026-01-01.md':              'subtype: daily',
  'missions/MIS-0001-clean.md':              '',
};

const expect = [
  ['reports/RPT-2026-01-01.md',            null,   'daily with a dated id is clean'],
  ['reports/RPT-2026-01-02.md',            'N-04', 'audit with a dated id fails (date form is for daily only)'],
  ['reports/RPT-2026-01-03-with-slug.md',  'N-04', 'dated id with a slug matches neither shape'],
  ['reports/RPT-001-numbered-daily.md',    'N-04', 'daily with a numbered id fails'],
  ['reports/RPT-003-wardley-map.md',       null,   'RPT-NNN analysis is clean'],
  ['reports/AUD-2026-08-17-stack.md',      'N-04', 'AUD- is retired'],
  ['reports/evidence/RPT-011/captured.md', null,   'evidence annex is not held to the series scheme'],
  ['missions/RPT-2026-01-01.md',           'N-04', 'the date form is not legal outside reports/'],
  ['missions/MIS-0001-clean.md',           null,   'control: an ordinary series file is clean'],
];

const dir = mkdtempSync(path.join(tmpdir(), 'std-018-'));
let findings = [];

before(() => {
  for (const [rel, sub] of Object.entries(fixtures)) {
    const abs = path.join(dir, rel);
    mkdirSync(path.dirname(abs), { recursive: true });
    const id = path.basename(rel, '.md');
    writeFileSync(abs, `---\nid: "${id}"\ntype: report\n${sub}\nstatus: active\n---\n# ${id}\n`);
  }

  const git = (...a) => execFileSync('git', ['-C', dir, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  git('init', '-q');
  git('add', '-A');
  findings = run(loadCorpus(dir)).filter((f) => f.plate === 'IDN-011');
});
after(() => rmSync(dir, { recursive: true, force: true }));

for (const [rel, check, why] of expect) {
  test(`${rel} — ${why}`, () => {
    const hits = findings.filter((f) => f.where === rel);
    assert.equal(hits.length, check ? 1 : 0, `expected ${check ? 'one IDN-011' : 'no IDN-011'}, got ${hits.length}: ${hits.map((f) => f.what).join(' | ') || JSON.stringify(findings)}`);
  });
}
