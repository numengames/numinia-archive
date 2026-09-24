#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// agent-context.test.mjs — AGENTS.md is held to the tree it describes.
//
// AGT-001 makes AGENTS.md the file every runtime reads, and until now nothing
// read it back. It drifted exactly where a hand-written description always
// drifts: it claimed a protocol count the folder contradicted, omitted two top-level
// directories, named three reserved `operations/` files where REUSE.toml pins
// four, and carried a copy of the roster that `agents/INDEX.md` owns — seven
// agents where the tree has ten. Each is a count a machine can take.
//
// WHAT THIS DOES NOT CHECK
// Whether the prose is any good, whether the transition regime still reflects
// the Oracle's intent, or whether a section earns its tokens. Those are
// editorial and stay the operator's. This only asks: does the file state
// something about this repository that the repository contradicts?
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { licenceOfFile } from '../lib/reuse.mjs';
import { ROOT } from '../lib/frontmatter.mjs';

const AGENTS = readFileSync(path.join(ROOT, 'AGENTS.md'), 'utf8');
const tracked = execFileSync('git', ['-C', ROOT, 'ls-files'], { encoding: 'utf8' }).split('\n').filter(Boolean);
const countIn = (dir, prefix) =>
  tracked.filter((f) => f.startsWith(`${dir}/${prefix}`) && f.endsWith('.md')).length;

test('AGT-001: AGENTS.md opens with the audit instruction', () => {
  const first = AGENTS.split('\n').find((l) => /^\*\*First instruction/.test(l.trim()));
  assert.ok(first, 'no **First instruction** line');
  assert.match(first, /audit/i);
});

test('every protocol is draft, as AGENTS.md says, and no count is typed', () => {
  // "Every protocol in this archive is `status: draft`" — the sentence the
  // whole transition regime rests on. It used to carry "(N of N)", and the
  // number drifted twice (12 over 11, then 11 over 12). The Oracle's word
  // (2026-09-24): do not state how many there are. So the file states no
  // count, and this test checks the claim itself: every PRO- file is draft.
  assert.match(AGENTS, /Every protocol in this archive is\s+`status: draft`/, 'the regime sentence is gone');
  assert.ok(!/\(\s*\d+\s+of\s+\d+\s*\)/.test(AGENTS), 'AGENTS.md types a "(N of N)" count again');
  const files = tracked.filter((f) => /^protocols\/PRO-/.test(f));
  assert.ok(files.length > 0, 'no protocols found');
  for (const f of files) {
    const head = readFileSync(path.join(ROOT, f), 'utf8').slice(0, 2000);
    assert.match(head, /status:\s*draft/, `${f} is not draft, but AGENTS.md says every protocol is`);
  }
});

test('every top-level directory of the corpus appears in the map', () => {
  // A map that omits a folder is worse than no map: the agent infers the
  // folder does not exist. `objects/` and `system/` were both missing.
  const dirs = new Set(
    tracked.map((f) => f.split('/')[0])
      .filter((d) => statSync(path.join(ROOT, d), { throwIfNoEntry: false })?.isDirectory()),
  );
  const exempt = new Set(['.github', 'LICENSES']);   // furniture, not corpus
  const missing = [...dirs].filter((d) => !exempt.has(d) && !AGENTS.includes(`\`${d}/\``));
  assert.deepEqual(missing, [], `the repository map never names: ${missing.join(', ')}`);
});

test('the reserved operations/ files are the ones that declare themselves reserved', () => {
  // Each file carries its own licence (Oracle, 2026-09-24); the reserved ones
  // are found by reading them, not by reading a list kept somewhere else.
  const reserved = readdirSync(path.join(ROOT, 'operations'))
    .filter((f) => f.endsWith('.md'))
    .filter((f) => licenceOfFile(`operations/${f}`) === 'LicenseRef-Numen-AllRightsReserved')
    .map((f) => /^(OPS-\d{3})-/.exec(f)?.[1]).filter(Boolean);
  assert.ok(reserved.length, 'no operations/ file declares itself reserved');
  const absent = reserved.filter((id) => !AGENTS.includes(id));
  assert.deepEqual(absent, [], `AGENTS.md does not name the reserved ${absent.join(', ')}`);
});

test('the roster is not copied: agents/INDEX.md owns it', () => {
  // web/src/lib/agents.ts parses that table at build time — it is the source.
  // A second copy here went stale at seven agents while the tree grew to ten.
  const names = readdirSync(path.join(ROOT, 'agents'))
    .filter((d) => statSync(path.join(ROOT, 'agents', d)).isDirectory())
    .filter((d) => !d.startsWith('_') && d !== 'skills');
  const listed = names.filter((n) => new RegExp(`\\b${n}\\b`, 'i').test(AGENTS));
  assert.ok(
    listed.length <= 1,
    `AGENTS.md names ${listed.length} agents (${listed.join(', ')}) — the roster belongs to agents/INDEX.md, which the site reads`,
  );
  assert.match(AGENTS, /agents\/INDEX\.md/, 'AGENTS.md must point at the roster it does not copy');
});

test('the commands AGENTS.md prints are commands this repository has', () => {
  // Two package.json files: the root one holds the guards and the tests, and
  // web/ holds the site's. A command is checked against the manifest that
  // would run it — the file says which, by the heading it sits under.
  const root = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const web = JSON.parse(readFileSync(path.join(ROOT, 'web/package.json'), 'utf8'));
  const webSection = AGENTS.slice(AGENTS.indexOf('Inside `web/`'));
  for (const m of AGENTS.matchAll(/`npm run ([a-z:-]+)[^`]*`/g)) {
    const inWeb = m.index >= AGENTS.indexOf('Inside `web/`');
    const pkg = inWeb ? web : root;
    assert.ok(
      pkg.scripts?.[m[1]],
      `AGENTS.md prints \`npm run ${m[1]}\` ${inWeb ? 'under "Inside web/"' : 'as a root command'}, which that package.json does not define`,
    );
  }
  assert.ok(webSection.length, 'AGENTS.md must say which commands run inside web/');
  for (const m of AGENTS.matchAll(/`node (machine\/[^\s`]+)[^`]*`/g))
    assert.ok(tracked.includes(m[1]), `AGENTS.md prints ${m[1]}, which is not tracked`);
});

test('CLAUDE.md is an adapter, not a second copy of the licensing standard', () => {
  // DBT-020: the same 620-word block lived by hand in CLAUDE.md and STD-010,
  // and `reuse lint` reported its two defects twice — one defect, two copies.
  const claude = readFileSync(path.join(ROOT, 'CLAUDE.md'), 'utf8');
  assert.match(claude, /AGENTS\.md/, 'CLAUDE.md must point at AGENTS.md');
  assert.doesNotMatch(
    claude,
    /^\*\*Emit:\*\*/m,
    'CLAUDE.md restates the STD-010 licence table; it must cite the standard instead (DBT-020)',
  );
  assert.ok(
    claude.length < 4000,
    `CLAUDE.md is ${claude.length} chars — an adapter points, it does not restate`,
  );
});
