#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// feed.test.mjs — the archive reads the automation's feed, marked unreviewed
// (AUT-069), and checks it again.
//
// The tender radar publishes what passes its filter to the public repository
// numengames/numinia-archive-feed. The pipeline page reads it at build time
// and shows it apart from the records: marked unreviewed, never counted in
// the funnel, an item the archive already holds linked to its record instead
// of shown twice. The archive does not trust the feed: every item goes
// through the same name check as a record (OPP-006), and a closed call is
// dropped. An unreachable feed never breaks the build.
//
// Run: npm test  (the built-page checks need web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const LIB = path.join(ROOT, 'web', 'src', 'lib', 'feed.ts');
const PAGE = path.join(ROOT, 'web', 'src', 'pages', 'system', 'pipeline.astro');
const DIST = path.join(ROOT, 'web', 'dist');
const notBuilt = !existsSync(path.join(DIST, 'index.html')) && 'web/dist not built';

function readFeed(doc, today = '2026-10-02') {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'feed-'));
  const file = path.join(dir, 'board.json');
  writeFileSync(file, typeof doc === 'string' ? doc : JSON.stringify(doc));
  const script = `import(${JSON.stringify(LIB)}).then(async (m) => console.log(JSON.stringify(await m.radarFeed(${JSON.stringify(today)}))))`;
  return JSON.parse(execFileSync('node', ['--experimental-strip-types', '--no-warnings', '-e', script], {
    cwd: path.join(ROOT, 'web'), encoding: 'utf8', env: { ...process.env, NUMINIA_FEED_FILE: file }, stdio: ['ignore', 'pipe', 'pipe'],
  }));
}

const item = (over = {}) => ({ id: 'placsp:1', source: 'PLACSP', kind: 'licitacion', title: 'Feria de ciencia escolar', buyer: 'Ayuntamiento de Ejemplo', url: 'https://example.org/1', closes: '2026-10-16 23:59', chance: 'baja', fit: 'medio', blocker: 'pide equipo docente', next: 'buscar socio', ...over });

test('the feed is read, checked and kept apart', () => {
  const f = readFeed({ published: '2026-10-02T17:00+02:00', items: [
    item(),
    item({ id: 'placsp:2', title: 'Congreso joven', why: 'lo firma la concejala María López' }),
    item({ id: 'placsp:3', closes: '2026-09-30 23:59' }),
    item({ id: 'sedia:X', in_archive: 'OPP-2026-036' }),
  ] });
  assert.equal(f.state, 'read');
  assert.equal(f.published, '2026-10-02T17:00+02:00');
  assert.deepEqual(f.items.map((i) => i.id), ['placsp:1', 'sedia:X'], 'the named item and the closed call are dropped');
  assert.equal(f.held, 1, 'the named item is counted as held back, not shown');
  assert.equal(f.items[1].in_archive, 'OPP-2026-036');
});

test('a broken or missing feed never breaks the build', () => {
  assert.equal(readFeed('not json').state, 'unreachable');
  assert.equal(readFeed({ nothing: true }).state, 'unreachable');
});

test('the feed is read from the public repository, never typed', () => {
  const lib = readFileSync(LIB, 'utf8');
  assert.match(lib, /raw\.githubusercontent\.com\/numengames\/numinia-archive-feed\/main\/radar\/board\.json/);
  assert.match(lib, /personNames\(/, 'the archive runs its own name check on the feed');
  assert.match(lib, /AbortSignal\.timeout\(/, 'a slow feed cannot hold the build');
  assert.match(readFileSync(PAGE, 'utf8'), /radarFeed\(/);
});

test('the pipeline page shows the feed marked unreviewed, apart from the funnel', { skip: notBuilt }, () => {
  const html = readFileSync(path.join(DIST, 'system', 'pipeline', 'index.html'), 'utf8');
  const sec = html.match(/<section[^>]*data-feed[^>]*>[\s\S]*?<\/section>/)?.[0];
  assert.ok(sec, 'the page has a feed section');
  assert.match(sec, /data-feed-state="(read|unreachable)"/);
  assert.match(sec, /[Uu]nreviewed/);
  assert.match(sec, /github\.com\/numengames\/numinia-archive-feed/, 'it links the feed itself');
  if (/data-feed-state="read"/.test(sec)) {
    for (const m of sec.matchAll(/data-in-archive="(OPP-\d{4}-\d{3})"/g)) assert.match(sec, new RegExp(`href="/opportunities/${m[1].toLowerCase()}"`), `${m[1]} is linked to its record`);
  }
  const before = html.slice(0, html.indexOf(sec));
  assert.ok(/class="pq-fun"/.test(before), 'the feed comes after the funnel: it is not counted in it');
});
