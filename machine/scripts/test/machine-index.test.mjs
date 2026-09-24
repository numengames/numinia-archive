#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// machine-index.test.mjs — the door a machine arrives at says what is behind it.
//
// WHAT IS UNDER TEST
// web/src/lib/machine-index.ts: the pure half of the machine-readable surface.
// It turns entries the routes collect into /index.json and /llms.txt, and it
// answers the one question this repository gets wrong most easily — WHICH
// LICENCE GOVERNS THIS DOCUMENT.
//
// THE RULE THE ORACLE RESTATED (2026-09-23): the licence is PER DOCUMENT, not
// per folder. `lore/` is not a reserved block and `canon/` is not an open one;
// each file carries its own `license:` and REUSE.toml is the declaration of
// record for the ones that do not. A summary that says "everything under X is
// Y" is the error this suite exists to prevent, so it is asserted twice: the
// resolver never generalises from a prefix, and the generated llms.txt never
// prints a folder-level licence sentence.
//
// WHY THE PURE HALF IS A SEPARATE MODULE
// The routes need `astro:content`, which only resolves inside an Astro build
// (composed-md.test.mjs states the same limit). Splitting the judgement out of
// the querying is what makes the judgement testable at all; the querying is
// covered by the build and by check-md-portability.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const MODULE = path.resolve(ROOT, 'web', 'src', 'lib', 'machine-index.ts');

/**
 * Load the module in a child node with type stripping, from web/ as cwd —
 * the same cwd the Astro build gives it, because the REUSE reader resolves
 * the repository root relative to itself and not to the caller.
 */
function ask(expression) {
  const script =
    `import(${JSON.stringify(MODULE)}).then((m) => {` +
    `  console.log(JSON.stringify(${expression}));` +
    `}).catch((e) => { console.error(e.stack || e.message); process.exit(1); });`;
  try {
    const out = execFileSync('node', ['--experimental-strip-types', '-e', script], {
      cwd: path.join(ROOT, 'web'),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return JSON.parse(out);
  } catch (e) {
    throw new Error(`module call failed: ${(e.stdout ?? '') + (e.stderr ?? '')}`);
  }
}

// A document as the routes hand it over: address, file, and whatever the
// frontmatter declared.
const doc = (over = {}) => ({
  url: '/canon/can-001-welcome-to-numinia',
  filePath: '../canon/CAN-001-welcome-to-numinia.md',
  title: 'Welcome to Numinia',
  id: 'CAN-001',
  series: 'canon',
  status: 'draft',
  updated: '2026-09-01',
  license: 'CC0-1.0',
  ...over,
});

// ---------------------------------------------------------------------------
// THE LICENCE IS THE DOCUMENT'S, NEVER THE FOLDER'S
// ---------------------------------------------------------------------------

test('the licence comes from the document that declares one', () => {
  const got = ask(`m.licenceOf(${JSON.stringify(doc({ license: 'CC-BY-4.0' }))})`);
  assert.equal(got, 'CC-BY-4.0');
});

test('a document with no licence field answers with the SPDX comment it carries', () => {
  // Not its folder's "usual" licence: the one the FILE declares in its own
  // SPDX comment. The lore documents carry no frontmatter at all, which is
  // exactly the case where a folder-shaped guess would be invented.
  //
  // THE EXACT VALUE, not merely "a non-empty string". The weaker assertion is
  // what let the first implementation ship broken: under bare node the REUSE
  // reader resolved fine, inside the Astro build it silently found no
  // REUSE.toml and returned null for all eleven header-less documents. A test
  // that accepts any answer cannot tell "resolved" from "gave up".
  const got = ask(
    `m.licenceOf(${JSON.stringify(
      doc({ url: '/lore/codex/glosario', filePath: '../lore/codex/glosario.md', license: undefined }),
    )})`,
  );
  assert.equal(got, 'CC0-1.0');
});

test('a path REUSE.toml does not cover resolves to null, never to a guess', () => {
  const got = ask(
    `m.licenceOf(${JSON.stringify(
      doc({ url: '/nowhere/x', filePath: '../nowhere/x.md', license: undefined }),
    )})`,
  );
  assert.equal(got, null);
});

test('two documents in one folder may resolve to two different licences', () => {
  // The property the per-document rule IS. If this ever collapses to one
  // answer per folder the resolver has started generalising.
  const entries = [
    doc({ url: '/a/one', filePath: '../canon/CAN-001-welcome-to-numinia.md', license: 'CC0-1.0' }),
    doc({ url: '/a/two', filePath: '../canon/CAN-001-welcome-to-numinia.md', license: 'LicenseRef-Numen-AllRightsReserved' }),
  ];
  const got = ask(`${JSON.stringify(entries)}.map(m.licenceOf)`);
  assert.deepEqual(got, ['CC0-1.0', 'LicenseRef-Numen-AllRightsReserved']);
});

// ---------------------------------------------------------------------------
// /index.json — one row per address, and it says what each row IS
// ---------------------------------------------------------------------------

test('every document row carries its address, its markdown address and its licence', () => {
  const got = ask(`m.indexJson({ documents: [${JSON.stringify(doc())}], views: [] })`);
  const row = got.documents[0];
  assert.equal(row.url, '/canon/can-001-welcome-to-numinia');
  assert.equal(row.md, '/canon/can-001-welcome-to-numinia.md');
  assert.equal(row.license, 'CC0-1.0');
  assert.equal(row.id, 'CAN-001');
  assert.equal(row.status, 'draft');
});

test('a view is marked as a view and declares what it was generated from', () => {
  // The distinction the archive already makes in prose (composed-md's
  // preamble: "cite those, never this file"). A machine that cannot tell a
  // record from a view of it will cite the view.
  const view = { url: '/scheme', sources: ['standards/STD-027-the-classification-scheme.md'] };
  const got = ask(`m.indexJson({ documents: [], views: [${JSON.stringify(view)}] })`);
  assert.equal(got.views[0].kind, 'view');
  assert.deepEqual(got.views[0].sources, ['standards/STD-027-the-classification-scheme.md']);
  assert.ok(!('license' in got.views[0]), 'a view holds no rights of its own to declare');
});

test('the index states the convention that makes it useful', () => {
  const got = ask(`m.indexJson({ documents: [${JSON.stringify(doc())}], views: [] })`);
  assert.match(JSON.stringify(got.about ?? ''), /\.md/, 'the .md convention is stated, not left to be guessed');
  assert.equal(got.documents.length, 1);
  assert.equal(got.counts.documents, 1);
});

// ---------------------------------------------------------------------------
// /llms.txt — the same facts, for a reader that arrived with no schema
// ---------------------------------------------------------------------------

test('llms.txt names the .md convention in its first lines', () => {
  const txt = ask(`m.llmsTxt({ documents: [${JSON.stringify(doc())}], views: [], version: 'v0.18.0' })`);
  const head = txt.split('\n').slice(0, 25).join('\n');
  assert.match(head, /\.md/);
  assert.match(head, /numinia\.org/);
});

test('llms.txt prints each document with its own licence beside it', () => {
  const docs = [
    doc({ url: '/a', license: 'CC0-1.0', title: 'A' }),
    doc({ url: '/b', license: 'LicenseRef-Numen-AllRightsReserved', title: 'B' }),
  ];
  const txt = ask(`m.llmsTxt({ documents: ${JSON.stringify(docs)}, views: [], version: 'v0.18.0' })`);
  assert.match(txt, /CC0-1\.0/);
  assert.match(txt, /LicenseRef-Numen-AllRightsReserved/);
});

test('llms.txt never claims a licence for a folder', () => {
  // THE REGRESSION THIS SUITE WAS WRITTEN FOR. Earlier drafts of this work
  // summarised rights as "everything outside lore/ is open" — false, and the
  // kind of false a machine repeats downstream. No sentence may bind a
  // licence to a directory.
  const docs = [doc({ url: '/lore/x', filePath: '../lore/codex/glosario.md', license: undefined })];
  const txt = ask(`m.llmsTxt({ documents: ${JSON.stringify(docs)}, views: [], version: 'v0.18.0' })`);
  const offenders = txt
    .split('\n')
    .filter((l) => /(lore|canon|agents|standards|missions)\/\S*\s/.test(l))
    .filter((l) => /\b(is|are|carry|carries|under)\b[^.]*\b(CC0|CC-BY|reserved|licen[cs]ed?)\b/i.test(l));
  assert.deepEqual(offenders, [], `a folder-level licence claim was generated:\n${offenders.join('\n')}`);
  assert.match(txt, /per document|each document|document by document/i);
});

test('llms.txt says what draft means, because most of the corpus says draft', () => {
  const txt = ask(`m.llmsTxt({ documents: [${JSON.stringify(doc())}], views: [], version: 'v0.18.0' })`);
  assert.match(txt, /draft/);
  assert.match(txt, /binds nobody|not yet in force/i);
});

test('llms.txt is generated, and says so rather than posing as a record', () => {
  const txt = ask(`m.llmsTxt({ documents: [${JSON.stringify(doc())}], views: [], version: 'v0.18.0' })`);
  assert.match(txt, /generated|built at/i);
});

// ---------------------------------------------------------------------------
// The module's own contract
// ---------------------------------------------------------------------------

test('the module touches no collection, so its judgement stays testable', () => {
  // The import, not the word: the module's own comments explain WHY it stays
  // clear of astro:content, and a test that forbade the mention would forbid
  // the explanation.
  const src = readFileSync(MODULE, 'utf8');
  assert.ok(
    !/^\s*import[^;]*["']astro:content["']/m.test(src),
    'machine-index.ts imports astro:content — the pure half must stay loadable outside a build',
  );
});
