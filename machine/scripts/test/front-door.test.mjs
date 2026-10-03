#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// front-door.test.mjs — the first thing a newcomer reads says what binds.
//
// A person lands on GitHub and reads README.md; an agent clones and reads it
// too, or arrives at numinia.org and reads the home page. On 2026-09-28 the
// README still called the repository by its old name, sent agents first to
// a procedure the transition regime had put in draft, and cited sibling
// repositories that do not exist; the home page never mentioned /llms.txt,
// the .md twin of every page, or /binding. Everything the reader needed was
// published — just not at the door.
//
// This pins the door to the tree: the name, the first two links, that no
// link on the way in leads to a draft, and that every relative link exists.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const README = readFileSync(path.join(ROOT, 'README.md'), 'utf8');
const NAME = 'numinia-archive';

const startHere = () => {
  const m = /^## Start here\n([\s\S]*?)(?=^## |$(?![\s\S]))/m.exec(README);
  assert.ok(m, 'README has no "## Start here" section');
  return m[1];
};
const relLinks = (md) =>
  [...md.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]).filter((h) => !/^(https?:|mailto:|#)/.test(h));

test('the README and package.json use the repository\'s name', () => {
  const h1 = /^# (.+)$/m.exec(README)?.[1]?.trim();
  assert.equal(h1, NAME);
  assert.ok(!/^---\n/.test(README), 'README opens with a YAML header GitHub renders as a table');
  assert.equal(JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8')).name, NAME);
});

test('"Start here" leads to what binds today, first', () => {
  const s = startHere();
  assert.match(s, /https:\/\/numinia\.org\/binding/, 'Start here does not link /binding');
  assert.match(s, /\(AGENTS\.md\)/, 'Start here does not link AGENTS.md');
  assert.match(s, /https:\/\/numinia\.org\/llms\.txt/, 'Start here does not tell agents about /llms.txt');
});

test('no link on the way in leads to a draft', () => {
  for (const href of relLinks(startHere())) {
    const file = path.join(ROOT, href.split('#')[0]);
    if (!href.endsWith('.md') || !existsSync(file)) continue;
    const head = readFileSync(file, 'utf8').slice(0, 1500);
    assert.ok(!/^status:\s*draft/m.test(head), `Start here routes the newcomer to a draft: ${href}`);
  }
});

test('every relative link in the README exists', () => {
  const missing = relLinks(README).filter((h) => !existsSync(path.join(ROOT, h.split('#')[0])));
  assert.deepEqual(missing, []);
});

test('the site advertises its machine-readable doors', () => {
  const layout = readFileSync(path.join(ROOT, 'web/src/layouts/Layout.astro'), 'utf8');
  assert.match(layout, /<link rel="alternate"[^>]*href="\/llms\.txt"/, 'Layout <head> does not point at /llms.txt');
  assert.match(layout, /<link rel="alternate"[^>]*href="\/index\.json"/, 'Layout <head> does not point at /index.json');
  const home = readFileSync(path.join(ROOT, 'web/src/pages/index.astro'), 'utf8');
  for (const href of ['/binding', '/llms.txt'])
    assert.ok(home.includes(`href="${href}"`), `the home panel does not link ${href}`);
});
