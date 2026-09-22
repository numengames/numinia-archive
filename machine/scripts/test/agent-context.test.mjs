#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// agent-context.test.mjs — AGENTS.md is held to the tree it describes.
//
// AGT-001 makes AGENTS.md the file every runtime reads, and until now nothing
// read it back. It drifted exactly where a hand-written description always
// drifts: it claimed 12 protocols over a folder of 11, omitted two top-level
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

test('the protocol count is the number of protocols', () => {
  // "Every protocol in this archive is `status: draft` (N of N)" — the sentence
  // the whole transition regime rests on. It said 12 over a folder of 11.
  const n = countIn('protocols', 'PRO-');
  const m = /\(\s*(\d+)\s+of\s+(\d+)\s*\)/.exec(AGENTS);
  assert.ok(m, 'AGENTS.md states no "(N of N)" protocol count');
  assert.equal(Number(m[2]), n, `AGENTS.md says ${m[2]} protocols, protocols/ holds ${n}`);
  assert.equal(Number(m[1]), n, 'the two halves of the count disagree');
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

test('the reserved operations/ files are the ones REUSE.toml pins', () => {
  const reuse = readFileSync(path.join(ROOT, 'REUSE.toml'), 'utf8');
  const pinned = [...reuse.matchAll(/operations\/(OPS-\d{3})-/g)].map((m) => m[1]);
  const unique = [...new Set(pinned)].sort();
  assert.ok(unique.length, 'REUSE.toml pins no operations/ file');
  // The map names them one by one; every pinned identifier must be there.
  const absent = unique.filter((id) => !AGENTS.includes(id));
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
