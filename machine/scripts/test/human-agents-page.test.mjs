#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// human-agents-page.test.mjs — an Oracle with a card has a page (MIS-281).
//
// agents/INDEX.md links an Oracle to `<id>/PERSON.md` once the person has a
// card. The site must then answer /agents/<id> with the card and its parts,
// link the roster name to it, and publish a .md twin. The AI agents' pages
// must not change shape. The source checks run always; the built-page checks
// run when web/dist exists (as in every dist test of this repository).
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const read = (p) => readFileSync(path.join(ROOT, p), 'utf8');
const INDEX = read('agents/INDEX.md');
const oracles = INDEX.split(/^## /m).find((s) => s.startsWith('Oracles')) ?? '';
const linked = [...oracles.matchAll(/\|\s*\[([^\]]+)\]\(([a-z0-9-]+)\/PERSON\.md\)\s*\|/g)].map((m) => ({ name: m[1], id: m[2] }));

test('at least one Oracle is linked to a PERSON.md card, and the card exists', () => {
  assert.ok(linked.length > 0, 'no Oracle row links a PERSON.md card');
  for (const p of linked) {
    assert.ok(existsSync(path.join(ROOT, 'agents', p.id, 'PERSON.md')), `agents/${p.id}/PERSON.md is missing`);
  }
});

test('the route builds a page for human agents next to the digital ones', () => {
  const page = read('web/src/pages/agents/[agent].astro');
  assert.match(page, /humanAgents\(\)/, 'getStaticPaths does not read humanAgents()');
  assert.match(page, /digitalAgents\(\)\.map/, 'the digital agents lost their paths');
  assert.ok(!/\bshares\b/.test(page.replace(/\/\/.*$/gm, '').replace(/`shares`/g, '')), 'the page must not print shares (unverified personal data)');
});

test('the roster links a human name to the page only when a card exists', () => {
  const lib = read('web/src/lib/agents.ts');
  assert.match(lib, /PERSON\\\.md/, 'humanAgents() does not look for PERSON.md links');
  const view = read('web/src/views/AgentView.astro');
  assert.match(view, /person\.href \?/, 'AgentView does not link the Oracle name');
});

const dist = path.join(ROOT, 'web', 'dist');
const built = existsSync(path.join(dist, 'agents', 'index.html')) || existsSync(path.join(dist, 'agent', 'index.html'));

for (const p of linked) {
  test(`built: /agents/${p.id} carries the card and its parts`, { skip: !built && 'web/dist not built' }, () => {
    const html = readFileSync(path.join(dist, 'agents', p.id, 'index.html'), 'utf8');
    assert.ok(html.includes(p.name), 'the name is missing');
    for (const part of ['who', 'working-with', 'cv', 'projects']) {
      assert.ok(html.includes(`id="${part}"`), `the ${part} part is missing`);
    }
    // The page prints no shareholding field of its own. (The card's own prose
    // still says in its Pending list that the figure is unverified; that text
    // is the document's, not this page's, and is flagged in the PR.)
    assert.ok(!/data-shares|Shareholding</.test(html), 'the page prints a shareholding field');
    assert.ok(existsSync(path.join(dist, 'agents', `${p.id}.md`)), 'the .md twin is missing');
  });

  test(`built: the roster links ${p.name} to /agents/${p.id}`, { skip: !built && 'web/dist not built' }, () => {
    const html = readFileSync(path.join(dist, 'agent', 'index.html'), 'utf8');
    assert.ok(html.includes(`href="/agents/${p.id}"`), 'no link from /agent');
  });
}
