#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// contract.test.mjs — every file in machine/guards/rules/ is a guard.
//
// The contract is small and it is all a reader may rely on: a guard exports
// `meta` (family, plates) and `run(corpus) -> Finding[]`, is registered under
// its own file name, emits only plates it declared, and neither prints nor
// exits while running. Everything else — the regime, the blind-spot
// declaration, the exit code — belongs to machine/guards/lib/guard.mjs, tested once.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadCorpus, isMain, nameOf } from '../lib/guard.mjs';
import { citationRe } from '../../scripts/lib/citation-pattern.mjs';
import { ROOT } from '../../scripts/lib/frontmatter.mjs';
import { loadRegistry } from '../../scripts/lib/blindness.mjs';

const RULES = path.join(ROOT, 'machine', 'guards', 'rules');
const PLATE = /^[A-Z]{2,4}-\d{3}$/;
const registry = loadRegistry();
const corpus = loadCorpus();

const guards = readdirSync(RULES).filter((f) => f.endsWith('.mjs') && !f.endsWith('.test.mjs'));

test('machine/guards/rules/ is not empty', () => {
  assert.ok(guards.length > 0, 'no guard to test');
});

for (const file of guards) {
  const name = file.replace(/\.mjs$/, '');
  const abs = path.join(RULES, file);

  test(`${name}: exports meta {family, plates} and run()`, async () => {
    const mod = await import(pathToFileURL(abs).href);
    assert.equal(typeof mod.run, 'function', 'no run() export');
    assert.ok(mod.meta && typeof mod.meta === 'object', 'no meta export');
    assert.match(mod.meta.family, /^[A-Z]{2,4}$/, `family "${mod.meta.family}" is not a plate prefix`);
    assert.ok(Array.isArray(mod.meta.plates) && mod.meta.plates.length > 0, 'meta.plates is empty');
    for (const p of mod.meta.plates) {
      assert.match(p, PLATE, `plate "${p}" is not shaped NNN-000`);
      assert.ok(p.startsWith(`${mod.meta.family}-`), `plate ${p} is outside family ${mod.meta.family}`);
    }
  });

  test(`${name}: is registered under its file name, at its path`, () => {
    const entry = registry.guards[name];
    assert.ok(entry, `blind-spots.json has no entry "${name}"`);
    assert.equal(entry.script, `machine/guards/rules/${file}`, 'registry points elsewhere');
    assert.ok(!entry.build_guard, 'a rule guard is registered as a build guard');
  });

  test(`${name}: run(corpus) returns well-formed findings under declared plates, silently`, async () => {
    const mod = await import(pathToFileURL(abs).href);
    const spoken = [];
    const orig = { log: console.log, error: console.error, exit: process.exit };
    console.log = (...a) => spoken.push(a);
    console.error = (...a) => spoken.push(a);
    process.exit = (c) => { throw new Error(`run() called process.exit(${c})`); };
    let findings;
    try { findings = mod.run(corpus); }
    finally { Object.assign(console, { log: orig.log, error: orig.error }); process.exit = orig.exit; }
    assert.equal(spoken.length, 0, `run() printed ${spoken.length} line(s); a guard returns, it does not report`);
    assert.ok(Array.isArray(findings), 'run() did not return an array');
    const declared = new Set(mod.meta.plates);
    for (const f of findings) {
      assert.ok(declared.has(f.plate), `emitted ${f.plate}, not in meta.plates`);
      assert.equal(typeof f.what, 'string', `${f.plate}: "what" is not a string`);
      assert.equal(typeof f.where, 'string', `${f.plate}: "where" is not a string`);
    }
  });

  test(`${name}: importing it runs nothing`, () => {
    // The file ends by asking isMain(); under the test runner that is false.
    const src = readFileSync(abs, 'utf8');
    assert.match(src, /isMain\(import\.meta\)/, 'the guard does not gate its standalone entry on isMain()');
    assert.doesNotMatch(src.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, ''), /process\.exit|console\.(log|error)/,
      'the guard prints or exits on its own; that is guard.mjs\'s job');
  });
}

test('isMain/nameOf read the entry script, not the cwd', () => {
  // node --test starts each file as its own process, so this file IS the
  // entry; a guard it imports is not, whatever the cwd.
  assert.equal(isMain(import.meta), true, 'the test file is the entry script under node --test');
  const guard = { url: pathToFileURL(path.join(RULES, 'std-010-licensing.mjs')).href };
  assert.equal(isMain(guard), false, 'an imported guard read itself as main');
  assert.equal(nameOf(guard), 'std-010-licensing');
});

test('every plate a guard declares is held by one standard', async () => {
  const { holderOf } = await import('../../scripts/lib/regime.mjs');
  for (const file of guards) {
    const mod = await import(pathToFileURL(path.join(RULES, file)).href);
    for (const p of mod.meta.plates) assert.ok(holderOf(p), `${file}: ${p} has no holder in the axis`);
  }
});

/* A comment says what the code checks and why that is hard. It does not send
   the reader to a document: documents move, are renumbered, are absorbed or
   are withdrawn, and the comment stays behind asserting something no longer
   true. What stays is the vocabulary — a plate (HDR-030, CIT-050, ENG-067)
   and the standard that holds it (STD-016). What goes is every pointer at a
   mission, a decision, a debt, a report, a pull request, a date, and every
   citation of a SECTION: a § number is the most perishable thing a document
   has, and the rule against citing one binds the code that enforces it.

   The pattern itself lives in machine/scripts/lib/citation-pattern.mjs, shared with
   the registry's copy of this test: one definition of what a citation is. */
const CITATION = citationRe();

/* A citation inside "double quotes" is a specimen: the shape the rule reads,
   quoted so a reader can see it. Masking it is the same allowance the corpus
   gets, where a backticked span is not read as a citation — quoting a bad
   citation is how a rule is taught.

   A literal whose WHOLE content is an identifier is a value the code compares,
   not prose that points at a document: there is no reason to say instead of
   it, because the guard stops working without it. Prose that merely contains
   an id is not exempt — the literal has to be the identifier and nothing
   else. */
const SPECIMEN = /"[^"\n]*"/g;
const VALUE = /(['"`])[A-Z]{2,5}-[0-9]{3,4}\1/g;

/** Every .mjs under machine/guards/ except this shelf: a test may quote what it forbids. */
function guardSources(dir = path.join(ROOT, 'machine', 'guards')) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === 'test' ? [] : guardSources(abs);
    return e.name.endsWith('.mjs') ? [abs] : [];
  });
}

test('the code cites plates, not prose', () => {
  const hits = [];
  for (const abs of guardSources()) {
    const rel = path.relative(ROOT, abs);
    readFileSync(abs, 'utf8').split('\n').forEach((line, i) => {
      const probe = line.replace(SPECIMEN, (s) => ' '.repeat(s.length)).replace(VALUE, (s) => ' '.repeat(s.length));
      for (const m of probe.matchAll(CITATION)) hits.push(`${rel}:${i + 1}  ${m[0]}  ${line.trim().slice(0, 96)}`);
    });
  }
  assert.equal(hits.length, 0,
    `${hits.length} citation(s) to a document in guard code; say the reason instead:\n  ${hits.join('\n  ')}`);
});
