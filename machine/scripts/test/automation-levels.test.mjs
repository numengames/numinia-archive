#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// automation-levels.test.mjs — the archive says what an agent may do without
// asking, level by level.
//
// THE PROBLEM THIS COVERS
// An agent asks the operator for permission many times a session, and each
// request arrives as a line of shell. The operator is not the one who wrote
// the shell; he is the one who answers for it. The archive held the answer in
// six places (who may change what, the approval protocol, the engineering
// protocol, each agent's OPERATOR.md, the transition regime, the Hermes
// config) and in none of them for the person who approves.
//
// WHAT IS UNDER TEST
// One data module, web/src/lib/automation-levels.ts, carries the five levels
// and the permission register the page /automation draws. The tests hold the
// data to the shape a reader can trust: five levels in order, every
// permission graded at every level, the grading monotone (a level never gives
// less than the one below it), the floor a floor at every level, and the
// sources named. A page that draws it is checked for existing and for
// carrying the shell-vs-prose pair the Oracle asked for.
//
// WHAT THESE TESTS REFUSE TO DO
// Pin the number of permissions or the prose of any row: the register grows
// as agents gain tools, and the words are the Oracle's to cut.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const DATA = path.resolve(ROOT, 'web', 'src', 'lib', 'automation-levels.ts');
const PAGE = path.resolve(ROOT, 'web', 'src', 'pages', 'automation.astro');
const LEVELS_DOC = path.resolve(ROOT, 'standards', 'STD-041-the-levels-of-automation.md');
const PERMS_DOC = path.resolve(ROOT, 'standards', 'STD-042-what-an-agent-may-do-without-asking.md');

/** The rows of the first markdown table under a `## heading` whose text matches. */
function tableUnder(text, heading) {
  const i = text.search(new RegExp(`^## ${heading}`, 'm'));
  assert.ok(i >= 0, `no "## ${heading}" section`);
  const rows = [];
  let inTable = false;
  for (const line of text.slice(i).split('\n').slice(1)) {
    if (line.startsWith('## ')) break;
    if (/^\|\s*-/.test(line)) { inTable = true; continue; }
    if (!line.startsWith('|')) { if (inTable) break; continue; }
    if (!inTable) continue;
    rows.push(line.split('|').slice(1, -1).map((c) => c.trim()));
  }
  return rows;
}

function load() {
  const script =
    `import(${JSON.stringify(DATA)}).then((m) => {` +
    `  console.log(JSON.stringify({ LEVELS: m.LEVELS, PERMISSIONS: m.PERMISSIONS, SOURCES: m.SOURCES, AGENTS: m.agentMarks() }));` +
    `}).catch((e) => { console.error(e.message); process.exit(1); });`;
  const out = execFileSync('node', ['--experimental-strip-types', '-e', script], {
    cwd: path.join(ROOT, 'web'),
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return JSON.parse(out);
}

const RANK = { never: 0, ask: 1, alone: 2 };

test('five levels, in order from the least to the most automated', () => {
  const { LEVELS } = load();
  assert.equal(LEVELS.length, 5, 'the scale has five levels (ISO/IEC 22989 levels 1–5; level 6 is out of the map by design)');
  assert.deepEqual(LEVELS.map((l) => l.id), [0, 1, 2, 3, 4]);
  for (const l of LEVELS) {
    assert.ok(l.name && l.line && l.you && l.where && l.alone && l.asks, `level ${l.id} misses a field`);
    assert.doesNotMatch(l.name, /ISO|level \d/i, `a level is named by what it is, not by its ISO number: ${l.name}`);
  }
  assert.equal(LEVELS.filter((l) => l.today).length, 1, 'exactly one level is marked as where Ursa is today');
});

test('every permission is graded at every level, and a level never gives less than the one below', () => {
  const { LEVELS, PERMISSIONS } = load();
  assert.ok(PERMISSIONS.length >= 10, `only ${PERMISSIONS.length} permissions`);
  const bad = [];
  for (const p of PERMISSIONS) {
    assert.equal(p.levels.length, LEVELS.length, `${p.name}: graded at ${p.levels.length} levels, not ${LEVELS.length}`);
    for (const g of p.levels) assert.ok(g in RANK, `${p.name}: unknown grade "${g}"`);
    for (let i = 1; i < p.levels.length; i++) {
      if (RANK[p.levels[i]] < RANK[p.levels[i - 1]]) bad.push(`${p.name}: ${p.levels[i - 1]} → ${p.levels[i]} between levels ${i - 1} and ${i}`);
    }
    for (const k of ['lets', 'wrong', 'undo', 'who']) assert.ok(p[k], `${p.name} misses "${k}"`);
  }
  assert.deepEqual(bad, [], `a higher level gives less than a lower one:\n  ${bad.join('\n  ')}`);
});

test('the floor is a floor: what no level grants alone stays "never" at every level, and there is a floor', () => {
  const { PERMISSIONS } = load();
  const floor = PERMISSIONS.filter((p) => p.floor);
  assert.ok(floor.length >= 3, `only ${floor.length} floor permissions`);
  const leaks = floor.filter((p) => p.levels.some((g) => g === 'alone') && !p.floorOpensAt);
  assert.deepEqual(leaks.map((p) => p.name), [], 'a floor permission is granted alone at some level without saying which level opens it');
  const identity = PERMISSIONS.find((p) => /quién es|who it is|identity/i.test(p.name));
  assert.ok(identity, 'the register names the permission to change the agent\'s own identity');
  assert.ok(identity.levels.every((g) => g === 'never'), 'no level lets an agent edit its own identity (STD-017)');
});

test('the sources are named, and the levels cite the open reproduction of the ISO scale, not a purchase', () => {
  const { SOURCES } = load();
  assert.ok(SOURCES.length >= 4);
  const iso = SOURCES.find((s) => /22989/.test(s.text));
  assert.ok(iso, 'the scale cites ISO/IEC 22989');
  assert.match(iso.text, /SPDX/, 'the ISO scale is cited as reproduced by the open SPDX vocabulary');
  assert.match(iso.text, /unverified/i, 'a paywalled clause is marked unverified, as the rest of the archive does');
});

test('the page exists and shows the same request as shell and as prose', () => {
  assert.ok(existsSync(PAGE), 'web/src/pages/automation.astro is missing');
  const page = readFileSync(PAGE, 'utf8');
  assert.match(page, /canonicalPath="\/automation"/);
  assert.match(page, /git clone/, 'the page shows the real shell of a request');
  assert.match(page, /Qué puede salir mal|What could go wrong/, 'the page shows the same request in the approver\'s words');
  assert.doesNotMatch(page, /href="\/[^"]*\$\{/, 'addresses are made at build time, never composed in the browser');
});

// ---------------------------------------------------------------------------
// The level is declared where the agent is operated, not typed on the page.
// ---------------------------------------------------------------------------

const OPERATORS = execFileSync('git', ['-C', ROOT, 'ls-files', 'agents/*/OPERATOR.md'], { encoding: 'utf8' })
  .split('\n').filter((f) => f && !f.includes('/_template/'));

function field(text, name) {
  const m = text.match(new RegExp(`^${name}:\\s*"?([^"\\n]*)"?\\s*$`, 'm'));
  return m ? m[1].trim() : undefined;
}

test('every agent\'s OPERATOR.md declares its automation level, one of the five', () => {
  const { LEVELS } = load();
  const names = new Set(LEVELS.map((l) => l.name.toLowerCase()));
  assert.ok(OPERATORS.length >= 10, `only ${OPERATORS.length} operator files`);
  const bad = OPERATORS
    .map((f) => [f, field(readFileSync(path.join(ROOT, f), 'utf8'), 'automation_level')])
    .filter(([, v]) => !v || !names.has(v))
    .map(([f, v]) => `${f}: automation_level ${v === undefined ? 'missing' : `"${v}" is not one of ${[...names].join('/')}`}`);
  assert.deepEqual(bad, [], `an agent without a declared level is treated as Assisted, but must say so:\n  ${bad.join('\n  ')}`);
});

test('the template declares the field, so a new agent cannot forget it', () => {
  const t = readFileSync(path.join(ROOT, 'agents', '_template', 'OPERATOR.md'), 'utf8');
  assert.match(t, /^automation_level:/m, 'agents/_template/OPERATOR.md carries no automation_level');
});

test('the page reads each agent\'s level from its OPERATOR.md — the marks are not typed in the data module', () => {
  const { AGENTS } = load();
  const declared = new Map(OPERATORS.map((f) => [f.split('/')[1], field(readFileSync(path.join(ROOT, f), 'utf8'), 'automation_level')]));
  const drift = AGENTS.filter((a) => a.id && declared.has(a.id))
    .filter((a) => a.levelName.toLowerCase() !== declared.get(a.id).toLowerCase())
    .map((a) => `${a.id}: page says ${a.levelName}, OPERATOR.md says ${declared.get(a.id)}`);
  assert.deepEqual(drift, [], `the page and the operator files disagree:\n  ${drift.join('\n  ')}`);
  const withFile = AGENTS.filter((a) => a.id).map((a) => a.id).sort();
  assert.deepEqual(withFile, [...declared.keys()].sort(), 'every agent with an OPERATOR.md is on the page, and nobody else with an id');
});

// ---------------------------------------------------------------------------
// The two registers in standards/ are the source; the module reads them.
// ---------------------------------------------------------------------------

test('the levels register exists, is a register, and its five rows are the module\'s five levels in order', () => {
  assert.ok(existsSync(LEVELS_DOC), 'standards/STD-041-the-levels-of-automation.md is missing');
  const doc = readFileSync(LEVELS_DOC, 'utf8');
  assert.match(doc, /^subtype: register$/m);
  assert.match(doc, /^derived_from: "CAN-004"$/m, 'the levels derive from the roles canon: rank sets the reach');
  const rows = tableUnder(doc, 'The levels');
  const { LEVELS } = load();
  assert.deepEqual(rows.map((r) => r[0].replace(/`/g, '')), LEVELS.map((l) => l.name), 'the register\'s level names, in order, are what the page draws');
  assert.match(doc, /## Outside the scale/, 'the register names the two ends outside the scale');
});

test('the permissions register exists, is a register, cites the levels register, and its rows are the module\'s permissions', () => {
  assert.ok(existsSync(PERMS_DOC), 'standards/STD-042-what-an-agent-may-do-without-asking.md is missing');
  const doc = readFileSync(PERMS_DOC, 'utf8');
  assert.match(doc, /^subtype: register$/m);
  assert.match(doc, /^related: \[[^\]]*"STD-041"/m, 'the permissions register cites the levels register');
  const rows = tableUnder(doc, 'The permissions');
  const { PERMISSIONS, LEVELS } = load();
  assert.equal(rows.length, PERMISSIONS.length, 'as many rows as permissions the page draws');
  rows.forEach((r, i) => {
    assert.equal(r[1], PERMISSIONS[i].name, `row ${i + 1}: name`);
    const grades = r.slice(2, 2 + LEVELS.length).map((c) => c.replace(/`/g, ''));
    assert.deepEqual(grades, PERMISSIONS[i].levels.map((g) => ({ alone: 'alone', ask: 'asks', never: 'never' })[g]), `row ${i + 1} (${r[1]}): grades`);
  });
});

test('the module reads the two registers rather than carrying the tables (one fact, one place)', () => {
  const src = readFileSync(DATA, 'utf8');
  assert.match(src, /STD-041/, 'the module names the levels register');
  assert.match(src, /STD-042/, 'the module names the permissions register');
  assert.doesNotMatch(src, /levels:\s*g\("/, 'the grades are not typed in the module any more');
});
