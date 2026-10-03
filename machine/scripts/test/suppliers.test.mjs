#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// suppliers.test.mjs — the register of the services Numen Games contracts is
// ONE system document (its index, SYS-012) and one card per supplier in the
// folder beside it. The cards are entries of that document, not documents of
// the series, so the naming guards must not hold them to SYS-NNN-<slug>.md.
//
//   ENTRIES          rules.json `entries` names the folder and its owner; the
//                    owner exists; the naming guard leaves a card alone.
//   CARDS            each card's id is <owner>:<file name>, its type is
//                    `entity`, its category is one the index declares, and
//                    its file name opens with that category.
//   ONE LIST         the index table and the folder list the same cards.
//   NO PERSON        a card names a company, never a natural person: the
//                    people Numen Games pays enter only with their consent
//                    (DBT-022 §1.7), and not in this register.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT, loadRules, parseFM } from '../lib/frontmatter.mjs';
import { classify } from '../../checks/lib/naming.mjs';

const RULES = loadRules();
const DIR = 'system/suppliers';
const OWNER = 'SYS-012';
const INDEX = path.join(ROOT, 'system', 'SYS-012-suppliers.md');

const CATEGORIES = ['cloud', 'ai', 'software', 'advisory', 'studio', 'event', 'finance', 'membership'];

const cards = () => (existsSync(path.join(ROOT, DIR))
  ? readdirSync(path.join(ROOT, DIR)).filter((f) => f.endsWith('.md')).sort() : []);

test('entries: rules.json registers the suppliers folder under its owner', () => {
  assert.equal(RULES.entries?.[`${DIR}/`], OWNER);
});

test('entries: the owner of the folder exists', () => {
  assert.ok(existsSync(INDEX), `${OWNER} must exist at ${path.relative(ROOT, INDEX)}`);
});

test('entries: a supplier card is an entry, not a series document', () => {
  const card = classify(`${DIR}/cloud-aws.md`, { id: `${OWNER}:cloud-aws` });
  assert.equal(card.kind, 'series');
  assert.equal(card.scheme, null, 'an entry carries no series filename scheme');
});

test('cards: at least one card, each shaped as the index declares', () => {
  const list = cards();
  assert.ok(list.length > 0, 'the register has no card');
  for (const f of list) {
    const fm = parseFM(readFileSync(path.join(ROOT, DIR, f), 'utf8')) ?? {};
    const slug = f.replace(/\.md$/, '');
    assert.equal(fm.id, `${OWNER}:${slug}`, `${f}: id`);
    assert.equal(fm.type, 'entity', `${f}: type`);
    assert.ok(CATEGORIES.includes(fm.category), `${f}: category "${fm.category}"`);
    assert.ok(slug.startsWith(`${fm.category}-`), `${f}: the file name opens with its category`);
  }
});

test('cards: every card says who the supplier is and where it lives', () => {
  for (const f of cards()) {
    const text = readFileSync(path.join(ROOT, DIR, f), 'utf8');
    assert.match(text, /^\| Legal name \| .+ \|$/m, `${f}: no "Legal name" row`);
    assert.match(text, /^\| Website \| .+ \|$/m, `${f}: no "Website" row`);
  }
});

test('one list: the index table and the folder name the same cards', () => {
  const text = readFileSync(INDEX, 'utf8');
  const listed = [...text.matchAll(/suppliers\/([a-z0-9-]+)(?:\.md|\/)/g)].map((m) => `${m[1]}.md`);
  assert.deepEqual([...new Set(listed)].sort(), cards());
});

test('one list: the index declares the categories the test holds', () => {
  const text = readFileSync(INDEX, 'utf8');
  for (const w of CATEGORIES) assert.ok(new RegExp(`\`${w}\``).test(text), `the index does not declare \`${w}\``);
});
