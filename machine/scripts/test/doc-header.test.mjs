#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// doc-header.test.mjs — the home quotes a document, it does not transcribe it.
//
// WHAT IS UNDER TEST
// web/src/lib/doc-header.ts reads the quoted block every document opens with
// (STD-004: Summary, Epistemic, Pragmatic, Audience) out of the canonical .md
// at build time. The home renders it for STD-027.
//
// WHY THE READING IS THE THING WORTH TESTING
// The failure mode this module exists to prevent is the one the home had for
// months in another form: prose about the corpus, written once, true on the
// day it was written. A transcribed header goes stale silently — the document
// is edited, the home keeps quoting the old sentence, and nothing complains.
// So the tests below do not assert what STD-027 says today. They build a
// SCRATCH archive with a header of their own and check that the module
// reports THAT — and that it throws, loudly, when the block is missing or the
// file has moved. A build that fails is a stale quote that never shipped.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MODULE = path.resolve(HERE, '..', '..', '..', 'web', 'src', 'lib', 'doc-header.ts');

/* A minimal archive: one document, and a `web/` to run from — the module
   resolves the archive from the working directory's parent, exactly as the
   Astro build does. */
function scratch(relPath, body) {
  const dir = mkdtempSync(path.join(tmpdir(), 'doc-header-'));
  mkdirSync(path.join(dir, 'web'), { recursive: true });
  if (body !== null) {
    mkdirSync(path.join(dir, path.dirname(relPath)), { recursive: true });
    writeFileSync(path.join(dir, relPath), body);
  }
  return dir;
}

/* Returns { code, out }. A throw is a build failure, and half of these tests
   are about the build failing loudly rather than printing something wrong. */
function ask(dir, expression) {
  const script =
    `import(${JSON.stringify(MODULE)}).then((m) => {` +
    `  console.log(JSON.stringify(${expression}));` +
    `}).catch((e) => { console.error(e.message); process.exit(1); });`;
  try {
    const out = execFileSync('node', ['--experimental-strip-types', '-e', script], {
      cwd: path.join(dir, 'web'),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout ?? '') + (e.stderr ?? '') };
  }
}

const DOC = `---
id: "STD-999"
title: "A scratch standard"
---

# A scratch standard

> **Summary:** What this scratch document is.
> **Epistemic:** What a reader learns from it.
> **Pragmatic:** What a reader can do with it.
> **Audience:** Agents · Oracles

---

Body prose that is not part of the header block.
`;

test('it reads the four fields of the header block', () => {
  const dir = scratch('standards/STD-999-scratch.md', DOC);
  try {
    const { code, out } = ask(dir, 'm.headerOf("standards/STD-999-scratch.md")');
    assert.equal(code, 0, out);
    const h = JSON.parse(out);
    assert.equal(h.summary, 'What this scratch document is.');
    assert.equal(h.epistemic, 'What a reader learns from it.');
    assert.equal(h.pragmatic, 'What a reader can do with it.');
    assert.equal(h.audience, 'Agents · Oracles');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a field wrapped over several lines is joined, not truncated', () => {
  // STD-027's own Summary wraps onto three lines. Reading only the first
  // would print half a sentence on the home and look entirely correct.
  const wrapped = DOC.replace(
    '> **Summary:** What this scratch document is.',
    '> **Summary:** What this scratch document is, said at a length that\n' +
      '> does not fit on one line of the file.',
  );
  const dir = scratch('standards/STD-999-scratch.md', wrapped);
  try {
    const { code, out } = ask(dir, 'm.headerOf("standards/STD-999-scratch.md")');
    assert.equal(code, 0, out);
    const h = JSON.parse(out);
    assert.equal(
      h.summary,
      'What this scratch document is, said at a length that does not fit on one line of the file.',
    );
    assert.equal(h.epistemic, 'What a reader learns from it.');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('prose after the block is not read into the last field', () => {
  const dir = scratch('standards/STD-999-scratch.md', DOC);
  try {
    const { out } = ask(dir, 'm.headerOf("standards/STD-999-scratch.md")');
    const h = JSON.parse(out);
    assert.ok(!h.audience.includes('Body prose'), `audience bled into the body: ${h.audience}`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a document with no header block fails the build', () => {
  const dir = scratch('standards/STD-999-scratch.md', '# Just a title\n\nNo block here.\n');
  try {
    const { code, out } = ask(dir, 'm.headerOf("standards/STD-999-scratch.md")');
    assert.equal(code, 1, 'a missing header block must throw, not return empty strings');
    assert.match(out, /summary/i);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a header missing one field names the field it wants', () => {
  const dir = scratch(
    'standards/STD-999-scratch.md',
    DOC.replace('> **Pragmatic:** What a reader can do with it.\n', ''),
  );
  try {
    const { code, out } = ask(dir, 'm.headerOf("standards/STD-999-scratch.md")');
    assert.equal(code, 1);
    assert.match(out, /pragmatic/i);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a moved or renamed document fails the build, and says which path', () => {
  const dir = scratch('standards/STD-999-scratch.md', null);
  try {
    const { code, out } = ask(dir, 'm.headerOf("standards/STD-999-scratch.md")');
    assert.equal(code, 1, 'a page must not silently render a document that is gone');
    assert.match(out, /STD-999-scratch\.md/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('the document the home quotes exists and carries its block', () => {
  // The one test against the real archive, and deliberately: it asserts the
  // COUPLING — that the path web/src/pages/index.astro names still resolves —
  // not the wording, which the tests above cover without pinning today's text.
  const root = path.resolve(HERE, '..', '..', '..');
  const script =
    `import(${JSON.stringify(MODULE)}).then((m) => {` +
    `  const h = m.headerOf("standards/STD-027-the-classification-scheme.md");` +
    `  console.log(JSON.stringify(h));` +
    `}).catch((e) => { console.error(e.message); process.exit(1); });`;
  const out = execFileSync('node', ['--experimental-strip-types', '-e', script], {
    cwd: path.join(root, 'web'),
    encoding: 'utf8',
  });
  const h = JSON.parse(out);
  for (const field of ['summary', 'epistemic', 'pragmatic', 'audience']) {
    assert.ok(h[field].length > 0, `STD-027's ${field} is empty`);
  }
});
