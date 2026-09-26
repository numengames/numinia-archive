#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// blindness.test.mjs — D-025 closure condition 3.
//
// "The blind spots are verified by test, not asserted — a guard claiming to
//  see .ts files is checked against a .ts file that breaks."
//
// A declared blind-spot list nobody verified is a claim about coverage with
// the shape of evidence. This suite makes each claim falsifiable:
//
//   STRUCTURAL  every guard in CI has a registry entry; every registry entry
//               points at a script that exists and actually imports the
//               declaration module. Catches a guard added without declaring,
//               and a declaration for a guard that was deleted.
//
//   BEHAVIOURAL the declaration is printed on SUCCESS, not only on failure.
//               That was the whole complaint: green is when the reader most
//               needs to know what was not checked.
//
//   FIXTURE     the interesting blind spots are PROVEN. A file that should
//               trip the guard is built in a scratch clone, the guard is run,
//               and the test asserts the guard stays green — demonstrating
//               the blindness is real and the declaration is honest.
//
// Run: npm test

import { execFileSync, execSync, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync, mkdirSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegistry, formatBlindSpots } from '../lib/blindness.mjs';
import { citationRe } from '../lib/citation-pattern.mjs';

const ROOT = execSync('git rev-parse --show-toplevel').toString().trim();
const registry = loadRegistry();

import test from 'node:test';
const check = (name, fn) => test(name, () => { fn(); });
function assert(cond, msg) { if (!cond) throw new Error(msg); }

/* ---------- STRUCTURAL ---------- */

// What runs in CI is what the runner finds: every registered script under
// machine/scripts/ (ENG-032). A script there with no registry entry never runs, so
// the first check is the other way round from before: no script may sit in
// machine/scripts/ unregistered, or it is a guard that CI silently does not run.
const guardScripts = readdirSync(path.join(ROOT, 'machine', 'scripts'))
  .filter((f) => f.endsWith('.mjs') && f !== 'run-guards.mjs')
  .map((f) => `machine/scripts/${f.replace(/\.mjs$/, '')}`);
const registered = new Set(Object.values(registry.guards).map((g) => g.script.replace(/\.mjs$/, '')));

check('every script in machine/scripts/ is a registered guard, so the runner runs it', () => {
  const missing = guardScripts.filter((g) => !registered.has(g));
  assert(missing.length === 0,
    `these scripts sit in machine/scripts/ but have no registry entry, so CI never runs them: ${missing.join(', ')}`);
});

check('every guard the runner runs is a build guard or answers to the regime (ENG-067)', () => {
  // ENG-067's exception is declared, not assumed: a guard that bites regardless
  // of any standard's state says so in its registry entry (`build_guard`), and
  // every other guard hands its findings to machine/scripts/lib/regime.mjs. A guard
  // that is neither is exactly the defect of DBT-017 — code obliging where no
  // document obliges. `manual` entries are tools run by hand, not by the
  // runner, and are out of scope here (same test as run-guards.mjs's filter).
  const offenders = [];
  for (const [id, entry] of Object.entries(registry.guards)) {
    if (entry.manual) continue;
    if (entry.build_guard) continue;
    const src = readFileSync(path.join(ROOT, entry.script), 'utf8');
    // A guard under machine/guards/ answers through machine/guards/lib/guard.mjs, which is
    // where regime.mjs is called for it (machine/guards/test/contract.test.mjs
    // proves the file fulfils that contract). A guard still in machine/scripts/
    // calls the regime itself.
    if (!src.includes('lib/regime.mjs') && !src.includes('lib/guard.mjs')) offenders.push(id);
  }
  assert(offenders.length === 0,
    `these guards neither declare build_guard nor use regime.mjs: ${offenders.join(', ')}`);
});

check('a build guard says what it needs, so the runner can skip or refuse instead of crashing', () => {
  for (const [id, entry] of Object.entries(registry.guards)) {
    if (!entry.build_guard || entry.manual) continue;
    assert(typeof entry.needs === 'string' && entry.needs.length > 0,
      `${id}: build_guard with no \`needs\` path`);
  }
});

check('every registry entry points at a script that exists and imports the module', () => {
  for (const [id, g] of Object.entries(registry.guards)) {
    const abs = path.join(ROOT, g.script);
    let src;
    try { src = readFileSync(abs, 'utf8'); }
    catch { throw new Error(`${id}: registry names ${g.script}, which does not exist`); }
    if (src.includes('lib/guard.mjs')) {
      // guard.mjs declares for the guard, under the guard's file name — so
      // the registry key must BE that name, or the declaration throws at
      // runtime for an id nobody registered.
      assert(path.basename(g.script, '.mjs') === id,
        `${id}: ${g.script} is under the machine/guards/ contract, which declares as "${path.basename(g.script, '.mjs')}" — the registry key must match the file name`);
      continue;
    }
    assert(src.includes('blindness.mjs'),
      `${id}: ${g.script} has a registry entry but never imports lib/blindness.mjs — ` +
      `it would declare nothing at runtime`);
    assert(src.includes(`declareBlindSpots('${id}')`) || src.includes(`declareBlindSpots("${id}")`),
      `${id}: ${g.script} imports the module but does not call declareBlindSpots('${id}')`);
  }
});

check('every declared blind spot names a coverer or admits there is none', () => {
  for (const [id, g] of Object.entries(registry.guards)) {
    assert(g.blind_to.length > 0, `${id}: declares an empty blind-spot list — that is a claim, not an omission`);
    for (const b of g.blind_to) {
      assert(typeof b.spot === 'string' && b.spot.length > 20,
        `${id}: a blind spot must be described concretely, got ${JSON.stringify(b.spot)}`);
      assert('covered_by' in b,
        `${id}: "${b.spot.slice(0, 40)}…" does not say which guard covers it (use null for none)`);
    }
  }
});

check('formatBlindSpots refuses an unknown guard', () => {
  let threw = false;
  try { formatBlindSpots('no-such-guard'); } catch { threw = true; }
  assert(threw, 'an unregistered guard id must throw, not silently print nothing');
});

check('the registry cites plates, not prose', () => {
  // Same rule the guard sources answer to (machine/guards/test/contract.test.mjs),
  // on the other artefact that describes them. This text is PRINTED on every
  // run, so a reader meets a pointer here more often than one in a comment,
  // and it rots the same way: the document moves and the line stays.
  //
  // `debt` and `covered_by` are exempt: a debt id in a structured field is
  // the register's key, and `covered_by` names the guard that covers the
  // spot. Both are data the runner reads. Prose is `spot`, `sees`, `manual`
  // and `$comment` — that is where a reason belongs instead of a pointer.
  //
  // A `backticked` span is exempt too: the corpus does not read one as a
  // citation, so a rule may quote a citation shape to teach it.
  const CITATION = citationRe();
  const hits = [];
  const walk = (node, trail) => {
    if (Array.isArray(node)) return node.forEach((v, i) => walk(v, [...trail, String(i)]));
    if (node && typeof node === 'object') return Object.entries(node).forEach(([k, v]) => walk(v, [...trail, k]));
    if (typeof node !== 'string') return;
    if (['debt', 'covered_by'].includes(trail.at(-1))) return;
    const probe = node.replace(/`[^`\n]*`/g, (s) => ' '.repeat(s.length));
    for (const m of probe.matchAll(CITATION)) hits.push(`${trail.join('.')}  ${m[0]}  …${node.slice(Math.max(0, m.index - 40), m.index + 40)}…`);
  };
  walk(JSON.parse(readFileSync(path.join(ROOT, 'machine/scripts/blind-spots.json'), 'utf8')), []);
  assert(hits.length === 0,
    `${hits.length} citation(s) to a document in the blind-spot registry; say the reason instead:\n  ${hits.join('\n  ')}`);
});

/* ---------- BEHAVIOURAL ---------- */

check('the declaration is printed on SUCCESS, not only on failure', () => {
  // std-006 exits 0 on the tree today (its holder is draft): the success path.
  const res = spawnGuard('machine/guards/rules/std-006-plain-text.mjs', ROOT);
  assert(res.status === 0, `expected a green run to test success output, got exit ${res.status}`);
  assert(/BLIND TO \(D-025\)/.test(res.stderr),
    'a green guard run did not print its blind spots — this is the exact failure D-025 describes');
});

check('the declaration survives a failing run too', () => {
  // Force a failure: an unparseable fence in a scratch clone. TXT-002 bites
  // only while its holder STD-006 is `active` (ENG-067); the fixture sets
  // that state itself so the test reads the guard, not the tree's lifecycle.
  const clone = scratchClone();
  try {
    const holder = path.join(clone, 'standards/STD-006-plain-text-is-sovereign.md');
    writeFileSync(holder, readFileSync(holder, 'utf8').replace(/^status: \w+$/m, 'status: active'));
    writeFileSync(path.join(clone, 'debt/D-000-fence-broken.md'), '---\nid: "D-000"\n---# glued\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const res = spawnGuard('machine/guards/rules/std-006-plain-text.mjs', clone);
    assert(res.status === 1, `expected the guard to fail on a glued fence, got exit ${res.status}`);
    assert(/BLIND TO \(D-025\)/.test(res.stderr),
      'the blind-spot declaration vanished on the failure path');
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

/* ---------- FIXTURE: the blindness is real ---------- */

check('D-047 fixture — a wrong FOLDER in a path citation really does read green', () => {
  const clone = scratchClone();
  try {
    // guilds/alquimistas/GLD-001-charter.md exists; agents/guilds/... does not.
    writeFileSync(path.join(clone, 'debt/D-000-probe.md'),
      '---\nid: "D-000"\nlicense: "CC-BY-4.0"\n---\n\nSee `agents/guilds/alquimistas/GLD-001-charter.md`.\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const res = spawnGuard('machine/guards/rules/std-012-corpus-does-not-grow.mjs', clone);
    assert(res.status === 0,
      `the reference guard CAUGHT a wrong folder — D-047 may be fixed; update the registry ` +
      `and delete this fixture (exit ${res.status})`);
    assert(/falls back to basename|FOLDER in a path citation/.test(res.stderr),
      'the guard is blind to the folder but does not say so');
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

check('D-049 fixture — an untracked .md with a BROKEN citation is not scanned, and is named', () => {
  // The contract fixture below proves the warning; this one proves the guard
  // did not READ the file either: the citation is broken and exit is 0.
  const clone = scratchClone();
  try {
    // Untracked, and broken: a citation to a file that does not exist anywhere.
    writeFileSync(path.join(clone, 'debt/D-000-untracked.md'),
      '---\nid: "D-000"\n---\n\nSee `canon/C-999-does-not-exist.md`.\n');
    const res = spawnGuard('machine/guards/rules/std-012-corpus-does-not-grow.mjs', clone);
    assert(res.status === 0,
      `the guard scanned an untracked file — D-049 may be fixed (exit ${res.status})`);
    assert(/NOT scanned/.test(res.stderr),
      'the untracked file was skipped WITHOUT any warning — silent blindness is the bug');
    assert(/D-000-untracked\.md/.test(res.stderr),
      'the warning fired but did not NAME the file it could not see');
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

check('license guard fixture — a .md with no license: field is skipped, as declared', () => {
  const clone = scratchClone();
  try {
    writeFileSync(path.join(clone, 'debt/D-000-nolicense.md'), '---\nid: "D-000"\n---\n\nNo licence field.\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const res = spawnGuard('machine/guards/rules/std-010-licensing.mjs', clone);
    assert(res.status === 0,
      `the licence guard flagged a file with no license: field — the declaration is now wrong (exit ${res.status})`);
    assert(/no `license:` field|files with no `license:` field/.test(res.stderr),
      'the guard skips unlicensed files but does not declare that it does');
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

check('license guard fixture — a header that contradicts REUSE.toml is reported as LIC-008, not a crash', () => {
  // The failure path is the one a move breaks: the guard resolves its regime
  // helper by a relative path only when a file actually contradicts, so a
  // green corpus proves nothing about it. debt/ is CC-BY-4.0 in REUSE.toml;
  // a header saying MIT must come out as a finding under the plate, and the
  // process must end through the regime (exit 0 while STD-010 is not
  // active), never through an unresolved import.
  const clone = scratchClone();
  try {
    writeFileSync(path.join(clone, 'debt/D-000-wronglicense.md'), '---\nid: "D-000"\nlicense: "MIT"\n---\n\nWrong licence.\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const res = spawnGuard('machine/guards/rules/std-010-licensing.mjs', clone);
    assert(!/ERR_MODULE_NOT_FOUND|Cannot find module/.test(res.stderr),
      `the licence guard crashed on its failure path instead of reporting:\n${res.stderr}`);
    assert(/LIC-008/.test(res.stdout + res.stderr),
      `a contradicting header did not surface as LIC-008 (exit ${res.status}):\n${res.stdout}${res.stderr}`);
    assert(/1 finding\(s\), \d+ enforced/.test(res.stdout + res.stderr),
      'the finding did not pass through the regime (no "finding(s), enforced" line)');
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

check('shape guard fixture — a missing card binds through the regime, an over-budget body never reaches it', () => {
  // STD-007's two faces in one file: no card (DOC-002, form, MUST) and a
  // body far past the 500-word budget (DOC-006, size, SHOULD). The first must
  // come out as a regime finding under its plate; the second must be counted
  // on the "measured, not judged" line and NOT appear as a finding — a guard
  // that hands a SHOULD to the regime is the bug this guard was written to
  // avoid. Plus one bare id in prose in standards/ (DOC-008).
  const clone = scratchClone();
  try {
    const long = Array.from({ length: 700 }, (_, i) => `word${i}`).join(' ');
    writeFileSync(path.join(clone, 'standards/STD-999-probe.md'),
      '---\nid: "STD-999"\ntitle: "Probe"\nstatus: draft\n---\n\n# Probe\n\n' +
      '**Binds:** nothing.\n\n**PRB-001 — A rule.** Cites STD-004 in prose.\n\n' + long + '\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const res = spawnGuard('machine/guards/rules/std-007-one-page.mjs', clone);
    const all = res.stdout + res.stderr;
    assert(!/ERR_MODULE_NOT_FOUND|Cannot find module|TypeError/.test(all), `the shape guard crashed:\n${res.stderr}`);
    assert(/DOC-002\s+S-02 card has no \*\*Summary:\*\*\n\s+standards\/STD-999-probe\.md/.test(all),
      `a missing card did not surface as DOC-002 for the probe:\n${all}`);
    assert(/DOC-008\s+PW-01 STD-004\n\s+standards\/STD-999-probe\.md/.test(all),
      `a bare id in standards/ prose did not surface as DOC-008:\n${all}`);
    assert(/measured, not judged \(SHOULD\):.*DOC-006/.test(all),
      'the over-budget body was not counted as measured');
    assert(!/[·✗] DOC-006/.test(all),
      'DOC-006 (a SHOULD) reached the regime as a finding');
    assert(/finding\(s\), \d+ enforced/.test(all), 'the form findings did not pass through the regime');
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

check('plain-text guard fixture — a broken YAML header, a versioned name and a bad slug each surface under their plate', () => {
  // The three TXT-001/002 paths a clean corpus never runs: an indented line
  // under a closed root key (what deleting a key with children leaves), a
  // filename with a version suffix, and a slug that is not kebab-case.
  // Each must come out under its own plate with its N-code / message, and
  // the file that is clean must NOT appear.
  const clone = scratchClone();
  try {
    writeFileSync(path.join(clone, 'debt/DBT-990-orphan-child.md'), '---\nid: "DBT-990"\nnote: "closed"\n  - child: orphan\n---\n\nbody\n');
    writeFileSync(path.join(clone, 'debt/DBT-991-versioned-v2.md'), '---\nid: "DBT-991"\n---\n\nbody\n');
    writeFileSync(path.join(clone, 'debt/DBT-992-Bad_Slug.md'), '---\nid: "DBT-992"\n---\n\nbody\n');
    writeFileSync(path.join(clone, 'debt/DBT-993-clean.md'), '---\nid: "DBT-993"\n---\n\nbody\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const res = spawnGuard('machine/guards/rules/std-006-plain-text.mjs', clone);
    const all = res.stdout + res.stderr;
    assert(!/ERR_MODULE_NOT_FOUND|Cannot find module|TypeError/.test(all), `the plain-text guard crashed:\n${res.stderr}`);
    assert(/TXT-002\s+line 3: indented under a closed key.*\n\s+debt\/DBT-990-orphan-child\.md/.test(all), `orphan child not reported as TXT-002:\n${all}`);
    assert(/TXT-001\s+N-02 filename carries a version suffix.*\n\s+debt\/DBT-991-versioned-v2\.md/.test(all), `version suffix not reported as TXT-001 N-02:\n${all}`);
    assert(/TXT-001\s+N-05 slug "Bad_Slug" is not lowercase kebab-case.*\n\s+debt\/DBT-992-Bad_Slug\.md/.test(all), `bad slug not reported as TXT-001 N-05:\n${all}`);
    assert(!/DBT-993-clean/.test(all), 'the clean control file was reported');
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

check('identifier guard fixture — state in a name, a version in a name and a reused id each surface under their plate', () => {
  // IDN-012/013/014 never fire on a clean tree. A scratch clone with one of
  // each, a `-not-frozen` name (a negation, not a state claim) and a clean
  // control: each defect under its plate, the negation and the control silent.
  const clone = scratchClone();
  try {
    writeFileSync(path.join(clone, 'debt/DBT-980-something-draft.md'), '---\nid: "DBT-980"\n---\n\nbody\n');
    writeFileSync(path.join(clone, 'debt/DBT-981-thing-v1.2.md'), '---\nid: "DBT-981"\n---\n\nbody\n');
    writeFileSync(path.join(clone, 'debt/DBT-982-first.md'), '---\nid: "DBT-982"\n---\n\nbody\n');
    writeFileSync(path.join(clone, 'debt/DBT-983-second.md'), '---\nid: "DBT-982"\n---\n\nbody\n');
    writeFileSync(path.join(clone, 'debt/DBT-984-x-not-frozen.md'), '---\nid: "DBT-984"\n---\n\nbody\n');
    writeFileSync(path.join(clone, 'debt/DBT-985-clean.md'), '---\nid: "DBT-985"\n---\n\nbody\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const res = spawnGuard('machine/guards/rules/std-018-one-identifier.mjs', clone);
    const all = res.stdout + res.stderr;
    assert(!/ERR_MODULE_NOT_FOUND|Cannot find module|TypeError/.test(all), `the identifier guard crashed:\n${res.stderr}`);
    assert(/IDN-012\s+filename encodes state\n\s+debt\/DBT-980-something-draft\.md/.test(all), `state in a name not reported as IDN-012:\n${all}`);
    assert(/IDN-013\s+filename carries a version\n\s+debt\/DBT-981-thing-v1\.2\.md/.test(all), `version in a name not reported as IDN-013:\n${all}`);
    assert(/IDN-014\s+id DBT-982 is held by two documents\n\s+debt\/DBT-982-first\.md \+ debt\/DBT-983-second\.md/.test(all), `reused id not reported as IDN-014:\n${all}`);
    assert(!/DBT-984-x-not-frozen/.test(all), 'a negation (-not-frozen) was read as a state claim');
    assert(!/DBT-985-clean/.test(all), 'the clean control file was reported');
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

check('D-049 on the contract — a guard under machine/guards/ names the untracked .md it cannot see', () => {
  // lint-naming carried this warning itself; on the contract it is execute()'s.
  // Same three properties as the D-049 fixture above.
  const clone = scratchClone();
  try {
    writeFileSync(path.join(clone, 'debt/DBT-970-untracked-draft.md'), '---\nid: "DBT-970"\n---\n\nbody\n');
    const res = spawnGuard('machine/guards/rules/std-018-one-identifier.mjs', clone);
    assert(res.status === 0, `the guard scanned an untracked file — D-049 may be fixed (exit ${res.status})`);
    assert(/NOT scanned/.test(res.stderr), 'the untracked file was skipped WITHOUT any warning — silent blindness is the bug');
    assert(/DBT-970-untracked-draft\.md/.test(res.stderr), 'the warning fired but did not NAME the file it could not see');
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

check('archive guard fixture — absorbed and former ids resolve, a closed record is not a citer, a live record names no heir', () => {
  // DEF-009 on the tree today: 74 real findings, all of them plain breakage.
  // What the tree never exercises: the three ways a citation to a vanished
  // file is NOT broken (absorbs:, former_id:, a deleted file in git log — the
  // last one the tree does exercise), the CIT-053 exemption, and DEF-008.
  const clone = scratchClone();
  const hdr = (id, extra = '') => `---\nid: "${id}"\nlicense: "CC-BY-4.0"\nstatus: "active"\n${extra}---\n\n# T\n\n`;
  try {
    // DBT-981 absorbs DBT-982 and used to be DBT-983: both ids resolve to it.
    writeFileSync(path.join(clone, 'debt/DBT-981-absorber.md'), hdr('DBT-981', 'absorbs: ["DBT-982"]\nformer_id: "DBT-983"\n') + 'body\n');
    // A live citer: two citations that resolve through the header, one that resolves nowhere.
    writeFileSync(path.join(clone, 'debt/DBT-984-citer.md'), hdr('DBT-984') + 'See DBT-982 and DBT-983, and DBT-985.\n');
    // A closed record with the same broken citation: a photograph, not a citer.
    writeFileSync(path.join(clone, 'debt/DBT-986-closed.md'), hdr('DBT-986').replace('status: "active"', 'status: "done"') + 'See DBT-985.\n');
    // DEF-008: a live record naming an heir.
    writeFileSync(path.join(clone, 'debt/DBT-987-heir.md'), hdr('DBT-987', 'superseded_by: "DBT-981"\n') + 'body\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const res = spawnGuard('machine/guards/rules/std-012-corpus-does-not-grow.mjs', clone);
    const all = res.stdout + res.stderr;
    assert(!/DBT-984-citer[\s\S]{0,80}DBT-98[23]\b/.test(all) && !/ID -> DBT-98[23]\b/.test(all), 'an absorbed or former id was reported as broken');
    assert(/DBT-984-citer[\s\S]{0,200}ID -> DBT-985|ID -> DBT-985[\s\S]{0,200}DBT-984-citer/.test(all), 'the genuinely missing DBT-985 was not reported from the live citer');
    assert(!/DBT-986-closed/.test(all), 'a closed record (status done) was walked as a citer — CIT-053');
    assert(/DEF-008[\s\S]{0,200}DBT-987-heir|DBT-987-heir[\s\S]{0,200}DEF-008/.test(all), 'a live record naming an heir was not reported as DEF-008');
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

/* ---------- helpers ---------- */

// execFileSync THROWS on a non-zero exit, which would make every failure-path
// assertion unreachable. spawnSync returns the status instead, which is the
// thing under test here.
function spawnGuard(rel, cwd) {
  // Run the guard's copy INSIDE the target tree. These scripts resolve ROOT
  // from their own file location (import.meta.url), not from process.cwd(),
  // so invoking the original binary against a scratch clone would silently
  // inspect the original repo — the fixture would prove nothing.
  const r = spawnSync('node', [path.join(cwd, rel)], {
    cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (r.error) throw r.error;
  return { status: r.status, stdout: r.stdout ?? '', stderr: r.stderr ?? '' };
}

// A scratch copy of the WORKING TREE, not `git clone` and not `git ls-files`
// — both are index-bound (D-049, the very blindness under test): a brand-new
// machine/scripts/lib/blindness.mjs is invisible to them, so the fixtures would run
// guards that cannot import it. Copy what is ON DISK.
function scratchClone() {
  const dir = mkdtempSync(path.join(tmpdir(), 'blindness-'));
  const SKIP = new Set(['.git', 'node_modules', 'dist', '.astro', '.hermes']);
  (function copyDir(from, to) {
    mkdirSync(to, { recursive: true });
    for (const ent of readdirSync(from, { withFileTypes: true })) {
      if (SKIP.has(ent.name)) continue;
      const src = path.join(from, ent.name);
      const dst = path.join(to, ent.name);
      if (ent.isDirectory()) copyDir(src, dst);
      else if (ent.isFile()) writeFileSync(dst, readFileSync(src));
    }
  })(ROOT, dir);
  execFileSync('git', ['-C', dir, 'init', '--quiet'], { stdio: 'ignore' });
  execFileSync('git', ['-C', dir, 'add', '-A'], { stdio: 'ignore' });
  // One commit, or the branch is unborn and `git log` is fatal: the reference
  // guard reads the deletion history (git log --diff-filter=D) at load, and
  // an unborn branch made every fixture crash with 128 before it could prove
  // anything — which read as "the blindness may be fixed". It was not.
  execFileSync('git', ['-C', dir, '-c', 'user.name=fixture', '-c', 'user.email=fixture@test',
    'commit', '--quiet', '--allow-empty-message', '-m', ''], { stdio: 'ignore' });
  return dir;
}

