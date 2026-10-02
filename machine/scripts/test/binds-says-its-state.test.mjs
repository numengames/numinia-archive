#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// binds-says-its-state.test.mjs — "Binds:" never claims more than the status.
//
// THE DEFECT THIS HOLDS SHUT
// Every rule document opens with `**Binds:** every agent, in every session`.
// That line is the first thing a reader meets, person or agent, and on a
// `draft` document it is false today: draft binds nobody (STD-004). /binding
// said so, and a band under the title said so, but the line itself went on
// saying the opposite — and AGENTS.md carried the same claim in its rule
// index, forty rows of "binds every agent" with no column saying which of
// them are in force. A reader had to cross-reference two pages to learn that
// a sentence in the imperative was a description.
//
// So the state travels with the claim, in both places a reader meets it:
//   1. the rule index in AGENTS.md has a State column, read from the header;
//   2. on the site, a draft's `Binds:` label reads "On trial, for:".
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';
import { buildIndex } from '../../tools/rule-index.mjs';
import rehypeBindsState, { DRAFT_LABEL } from '../../../web/src/lib/rehype-binds-state.mjs';

const el = (tagName, children = []) => ({ type: 'element', tagName, properties: {}, children });
const txt = (value) => ({ type: 'text', value });
const bindsPara = () => el('p', [el('strong', [txt('Binds:')]), txt(' every agent, in every session.')]);
const run = (status, tree) => {
  rehypeBindsState()(tree, { data: { astro: { frontmatter: { status } } } });
  return tree;
};
const label = (tree) => tree.children[0].children[0].children[0].value;

test('the rule index says, row by row, whether the rule is in force', () => {
  const { rows, block } = buildIndex(ROOT);
  assert.match(block, /^\| Rule \| What it rules \| State \| Binds \|$/m, 'the index has no State column');
  for (const r of rows) {
    const head = readFileSync(path.join(ROOT, r.file), 'utf8').slice(0, 2000);
    const status = /^status:\s*"?([a-z-]+)/m.exec(head)?.[1];
    const want = status === 'active' ? 'in force' : status === 'draft' ? 'draft' : status;
    const line = block.split('\n').find((l) => l.startsWith(`| \`${r.id}\` |`));
    assert.ok(line, `${r.id} is missing from the block`);
    assert.equal(line.split(' | ')[2], want, `${r.id} is ${status} and the index says otherwise`);
  }
});

test('the footnote says how many of the rules are in force', () => {
  const { rows, block } = buildIndex(ROOT);
  const active = rows.filter((r) => r.state === 'in force').length;
  assert.match(block, new RegExp(`${active} (is|are) in force`), 'the footnote does not count the rules in force');
});

test('on a draft, the Binds label says it is on trial', () => {
  assert.equal(label(run('draft', el('root', [bindsPara()]))), DRAFT_LABEL);
  assert.match(DRAFT_LABEL, /on trial/i);
});

test('on an active rule, and on anything that is not a Binds line, nothing changes', () => {
  assert.equal(label(run('active', el('root', [bindsPara()]))), 'Binds:');
  const other = el('root', [el('p', [el('strong', [txt('Summary:')]), txt(' x')])]);
  assert.equal(label(run('draft', other)), 'Summary:');
});

test('the site renders documents through the plugin', () => {
  const cfg = readFileSync(path.join(ROOT, 'web/astro.config.mjs'), 'utf8');
  assert.match(cfg, /rehypePlugins:\s*\[[^\]]*rehypeBindsState/, 'astro.config.mjs does not register rehypeBindsState');
});

test('the agent context carries the repository\'s name, not a retired one', () => {
  const agents = readFileSync(path.join(ROOT, 'AGENTS.md'), 'utf8');
  const h1 = /^# (.+)$/m.exec(agents)?.[1]?.trim();
  assert.match(h1, /^numinia-archive\b/, `AGENTS.md is titled "${h1}"`);
  const page = readFileSync(path.join(ROOT, 'web/src/pages/[...slug].astro'), 'utf8');
  assert.ok(!/Corpus NWOS/.test(page), 'every document page is titled "Corpus NWOS"');
});
