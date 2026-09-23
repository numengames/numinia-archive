#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// binding.test.mjs — the archive publishes what binds today, not only what is written.
//
// THE PROBLEM THIS COVERS
// Every protocol in this archive is `status: draft`, and `draft` is defined
// on the site as "written, not yet in force — it binds nobody". Both halves
// are published; the sentence they leave hanging is not. A reader — a person
// or an agent arriving through /llms.txt, which is the door this site
// advertises — reads eleven step-by-step procedures, learns that none of them
// binds, and has nowhere to go for the rule that DOES apply while they are
// draft. That rule exists: it is the transition regime the Oracle wrote in
// AGENTS.md, a file the site does not serve and a reader outside the
// repository never sees.
//
// So the site published the derogated ceremony as if it were live, and kept
// the governing instruction private by accident.
//
// WHAT IS UNDER TEST
// The chain that closes the gap: AGENTS.md carries the regime between stable
// markers, web/src/lib/binding.ts reads it and counts the corpus's states
// from the tree, composed-md turns both into a page that has its own
// markdown, and the machine surface points at it.
//
// WHAT THESE TESTS REFUSE TO DO
// Assert today's regime, today's counts, or today's prose. A test that pins
// "eleven protocols, all draft" goes red the day a protocol is promoted —
// which is the change this whole page exists to make visible. So the reading
// is verified against a SCRATCH archive with states of its own, exactly as
// composed-md.test.mjs and classification.test.mjs do.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const BINDING = path.resolve(ROOT, 'web', 'src', 'lib', 'binding.ts');
const COMPOSED = path.resolve(ROOT, 'web', 'src', 'lib', 'composed-md.ts');
const MACHINE_INDEX = path.resolve(ROOT, 'web', 'src', 'lib', 'machine-index.ts');
const URL_SHAPE = path.resolve(ROOT, 'machine', 'scripts', 'check-url-shape.mjs');
const SLUG_PAGE = path.resolve(ROOT, 'web', 'src', 'pages', '[...slug].astro');

const BEGIN = 'transition-regime:begin';
const END = 'transition-regime:end';

// ---------------------------------------------------------------------------
// The source: AGENTS.md
// ---------------------------------------------------------------------------

test('AGENTS.md marks the regime that governs while the protocols are draft', () => {
  // Markers, not a heading match: the heading is prose the Oracle may reword,
  // and a parser that breaks on a reworded title would take the page down
  // silently. The markers are a contract; the text between them is his.
  const agents = readFileSync(path.join(ROOT, 'AGENTS.md'), 'utf8');
  const begin = agents.indexOf(BEGIN);
  const end = agents.indexOf(END);
  assert.ok(begin >= 0, `AGENTS.md carries no <!-- ${BEGIN} --> marker`);
  assert.ok(end > begin, `AGENTS.md carries no <!-- ${END} --> marker after the opening one`);
  const body = agents.slice(agents.indexOf('-->', begin) + 3, end).trim();
  assert.ok(body.length > 200, `the marked regime is ${body.length} chars — that is not the regime`);
});

// ---------------------------------------------------------------------------
// The reading: web/src/lib/binding.ts
// ---------------------------------------------------------------------------

const AGENTS_FIXTURE = `# Agent Context

Preamble that must not reach the page.

<!-- ${BEGIN} -->

## Transition regime

Oracle instruction. While a document is draft it DESCRIBES a practice; it
does not BIND. Until a protocol is promoted, an agent does NOT open a
mission card for a task asked for in chat.

What still holds: one pull request per repository per cut; CI green.

<!-- ${END} -->

## Commands

Trailing prose that must not reach the page either.
`;

const doc = (id, status) => `---\nid: "${id}"\ntitle: "${id}"\nstatus: ${status}\n---\n# ${id}\n`;

function scratch() {
  const dir = mkdtempSync(path.join(tmpdir(), 'binding-'));
  mkdirSync(path.join(dir, 'web'), { recursive: true });
  for (const d of ['canon', 'standards', 'protocols']) mkdirSync(path.join(dir, d), { recursive: true });
  writeFileSync(path.join(dir, 'AGENTS.md'), AGENTS_FIXTURE);
  writeFileSync(path.join(dir, 'protocols', 'PRO-001-a.md'), doc('PRO-001', 'draft'));
  writeFileSync(path.join(dir, 'protocols', 'PRO-002-b.md'), doc('PRO-002', 'draft'));
  writeFileSync(path.join(dir, 'protocols', 'PRO-003-c.md'), doc('PRO-003', 'active'));
  writeFileSync(path.join(dir, 'standards', 'STD-001-a.md'), doc('STD-001', 'draft'));
  writeFileSync(path.join(dir, 'canon', 'CAN-001-a.md'), doc('CAN-001', 'active'));
  return dir;
}

/** Load the module in a child process with the scratch `web/` as cwd, as the build does. */
function ask(dir, expression) {
  const script =
    `import(${JSON.stringify(BINDING)}).then((b) => {` +
    `  console.log(JSON.stringify(${expression}));` +
    `}).catch((e) => { console.error(e.message); process.exit(1); });`;
  try {
    return {
      code: 0,
      out: execFileSync('node', ['--experimental-strip-types', '-e', script], {
        cwd: path.join(dir, 'web'),
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      }),
    };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout ?? '') + (e.stderr ?? '') };
  }
}

test('the regime is read from AGENTS.md, and only what the markers enclose', () => {
  const dir = scratch();
  try {
    const { code, out } = ask(dir, 'b.transitionRegime()');
    assert.equal(code, 0, out);
    const regime = JSON.parse(out);
    assert.match(regime.body, /does not BIND/);
    assert.match(regime.body, /What still holds/);
    assert.doesNotMatch(regime.body, /must not reach the page/);
    assert.equal(regime.source, 'AGENTS.md');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a tree with no marked regime fails loudly rather than publishing an empty page', () => {
  // The expensive failure mode: the markers are dropped in an edit, the page
  // still builds, and the archive serves a heading that answers nothing under
  // the title "what binds today".
  const dir = scratch();
  try {
    writeFileSync(path.join(dir, 'AGENTS.md'), '# Agent Context\n\nNo markers here.\n');
    const { code, out } = ask(dir, 'b.transitionRegime()');
    assert.equal(code, 1, `expected a throw, got: ${out}`);
    assert.match(out, /transition-regime/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('the states are counted from the tree, never typed', () => {
  const dir = scratch();
  try {
    const { code, out } = ask(dir, 'b.lifecycle()');
    assert.equal(code, 0, out);
    const rows = JSON.parse(out);
    const byFolder = Object.fromEntries(rows.map((r) => [r.folder, r]));
    assert.deepEqual(byFolder['protocols/'].states, { draft: 2, active: 1 });
    assert.equal(byFolder['protocols/'].total, 3);
    assert.deepEqual(byFolder['standards/'].states, { draft: 1 });
    assert.deepEqual(byFolder['canon/'].states, { active: 1 });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('promoting a document out of draft changes the page with no edit to it', () => {
  // The whole point of reading rather than writing: the day the Oracle
  // promotes a protocol, the page says so by itself.
  const dir = scratch();
  try {
    writeFileSync(path.join(dir, 'protocols', 'PRO-001-a.md'), doc('PRO-001', 'active'));
    const { code, out } = ask(dir, 'b.lifecycle()');
    assert.equal(code, 0, out);
    const protocols = JSON.parse(out).find((r) => r.folder === 'protocols/');
    assert.deepEqual(protocols.states, { draft: 1, active: 2 });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// The page, and the signs pointing at it
// ---------------------------------------------------------------------------

test('the page is a composed view with its own markdown', () => {
  const src = readFileSync(COMPOSED, 'utf8');
  assert.match(src, /export function bindingPage\b/, 'composed-md exports no bindingPage');
  assert.match(src, /bindingPage\(\)/, 'allComposedPages does not include the binding page');
  // A view, not a record: it must name what it was generated from, like the rest.
  const generator = src.slice(src.indexOf('export function bindingPage'));
  assert.match(generator.slice(0, 4000), /sources:/, 'bindingPage declares no sources');
});

test('a draft document says what binds instead of it', () => {
  // The corpus mirror renders canon, standards and protocols. Until now it
  // printed the bare word `draft` as a chip and left the reader to guess.
  const page = readFileSync(SLUG_PAGE, 'utf8');
  assert.match(page, /\/binding/, '[...slug].astro never points a draft document at /binding');
});

test('the machine surface advertises the page', () => {
  // An agent reads /llms.txt and nothing else before deciding what to obey.
  const src = readFileSync(MACHINE_INDEX, 'utf8');
  assert.match(src, /\/binding\.md/, 'llms.txt does not point at /binding.md');
});

test('the address is declared, so the URL guard admits it', () => {
  const src = readFileSync(URL_SHAPE, 'utf8');
  const standalone = src.slice(src.indexOf('const STANDALONE'), src.indexOf('const SPANISH'));
  assert.match(standalone, /'\/binding'/, "check-url-shape's STANDALONE set does not declare /binding");
});
