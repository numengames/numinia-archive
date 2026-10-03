#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// semantic-census.test.mjs — the census of Numinia's entities is ONE system
// document (its index, SYS-011) and one card per entity in the folder beside
// it. The cards are entries of that document, not documents of the series,
// so the naming guards must not hold them to SYS-NNN-<slug>.md.
//
//   ENTRIES          rules.json `entries` names the folder and its owner; the
//                    owner exists; the naming guard leaves an entry alone and
//                    still holds a stray file in system/ to SYS-NNN.
//   CARDS            each card's id is <owner>:<file name>, its type is
//                    `entity`, and category, stage and confidence take the
//                    values the index declares.
//   ONE LIST         the index table and the folder list the same cards —
//                    a card missing from either is a second copy drifting.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT, loadRules, parseFM } from '../lib/frontmatter.mjs';
import { classify } from '../../checks/lib/naming.mjs';

const RULES = loadRules();
const DIR = 'system/semantic-census';
const OWNER = 'SYS-011';
const INDEX = path.join(ROOT, 'system', 'SYS-011-semantic-census.md');

const CATEGORIES = ['guild', 'faction', 'district', 'rank', 'force', 'institution', 'artefact', 'resource'];
const STAGES = ['draft', 'validated', 'approved', 'explicit'];
const CONFIDENCE = ['high', 'medium', 'low'];

const cards = () => (existsSync(path.join(ROOT, DIR))
  ? readdirSync(path.join(ROOT, DIR)).filter((f) => f.endsWith('.md')).sort() : []);

test('entries: rules.json registers the census folder under its owner', () => {
  assert.equal(RULES.entries?.[`${DIR}/`], OWNER);
});

test('entries: the owner of the folder exists', () => {
  assert.ok(existsSync(INDEX), `${OWNER} must exist at ${path.relative(ROOT, INDEX)}`);
});

test('entries: a card is an entry, not a series document; a stray file still is one', () => {
  const card = classify(`${DIR}/guild-exegetes.md`, { id: `${OWNER}:guild-exegetes` });
  assert.equal(card.kind, 'series');
  assert.equal(card.scheme, null, 'an entry carries no series filename scheme');
  const stray = classify('system/guild-exegetes.md', {});
  assert.ok(stray.scheme, 'a file directly in system/ is still held to SYS-NNN-<slug>.md');
  const deeper = classify('system/other-folder/x.md', {});
  assert.ok(deeper.scheme, 'only a registered folder is an entry folder');
});

test('cards: at least one card, each shaped as the index declares', () => {
  const list = cards();
  assert.ok(list.length > 0, 'the census has no card');
  for (const f of list) {
    const fm = parseFM(readFileSync(path.join(ROOT, DIR, f), 'utf8')) ?? {};
    const slug = f.replace(/\.md$/, '');
    assert.equal(fm.id, `${OWNER}:${slug}`, `${f}: id`);
    assert.equal(fm.type, 'entity', `${f}: type`);
    assert.ok(CATEGORIES.includes(fm.category), `${f}: category "${fm.category}"`);
    assert.ok(slug.startsWith(`${fm.category}-`), `${f}: the file name opens with its category`);
    assert.ok(STAGES.includes(fm.stage), `${f}: stage "${fm.stage}"`);
    assert.ok(CONFIDENCE.includes(fm.confidence), `${f}: confidence "${fm.confidence}"`);
  }
});

test('one list: the index table and the folder name the same cards', () => {
  const text = readFileSync(INDEX, 'utf8');
  const listed = [...text.matchAll(/semantic-census\/([a-z0-9-]+)(?:\.md|\/)/g)].map((m) => `${m[1]}.md`);
  const onDisk = cards();
  assert.deepEqual([...new Set(listed)].sort(), onDisk);
});

test('one list: the index declares the same categories, stages and confidence the test holds', () => {
  const text = readFileSync(INDEX, 'utf8');
  for (const w of [...CATEGORIES, ...STAGES, ...CONFIDENCE])
    assert.ok(new RegExp(`\`${w}\``).test(text), `the index does not declare \`${w}\``);
});
