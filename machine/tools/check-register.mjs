#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
/**
 * check-register.mjs — the register of checks is itself checked.
 *
 * THE PROBLEM THIS SOLVES
 *
 * STD-015 lists every practice this organisation holds itself to, and against
 * each one, the machine that checks it. That column was prose. Prose does not
 * fail. A cell could claim `[AUTO: gitleaks]` for months with no gitleaks in
 * the tree, and the register — the document whose entire job is to say what is
 * watched — was the one artefact nothing watched.
 *
 * Measured before this existed: of 29 rows claiming AUTO, 7 named a mechanism
 * that did not exist. Three further rows claimed MANUAL for work a guard had
 * been doing for weeks. A hand-written register drifts in both directions: it
 * over-promises, and it hides what you already built.
 *
 * WHAT A CHECK CELL MAY SAY
 *
 * Four forms, each verifiable. Anything else is a defect.
 *
 *   [AUTO: <path>]          a file in this tree does it. Must be tracked.
 *   [AUTO: npm <script>]    a package.json script does it. Must exist.
 *   [AUTO: scorecard <C>]   OpenSSF Scorecard does it. Needs scorecard.yml
 *                           and <C> must be a real Scorecard check name.
 *   [AUTO: github <path>]   a GitHub setting. Read over the API with
 *                           --github; without a credential it is UNKNOWN,
 *                           which is not the same as clean.
 *   [GATE: <auto-ref> → <human act>]
 *                           the machine verifies <auto-ref> in full; a person
 *                           performs the irreversible act. The machine half is
 *                           checked exactly like an AUTO cell — a gate whose
 *                           evidence is unverified is just a manual step with
 *                           better manners.
 *   [DEBT: <what is missing> — <owner>, <YYYY-MM-DD>]
 *                           nobody checks this yet. Must name who owes it and
 *                           when it was booked. Debt without an owner is a
 *                           wish.
 *
 * MANUAL is not a form. An organisation that runs itself does not get to
 * write "a person will remember".
 *
 * WHAT ELSE IT CHECKS
 *
 * TRC-006 says a guard is verified by its step in the job, never by the run's
 * colour — a green run and a workflow missing the guard are indistinguishable
 * from the conclusion. That row said MANUAL, and it is the one failure that
 * hides every other: silence and success look identical. Here it is mechanical.
 * A guard is discovered through machine/scripts/blind-spots.json, so a rule file that
 * no registry entry names never runs, and the run is green for not looking.
 *
 *   node machine/tools/check-register.mjs            local rows only (CI runs this)
 *   node machine/tools/check-register.mjs --github   also the GitHub settings rows
 *   node machine/tools/check-register.mjs --list     print the register as parsed
 *
 * Exit 0 every checked row holds · 1 a row is wrong or a mechanism is missing
 *      · 2 asked for GitHub rows and could not read them.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execute, isMain } from '../guards/lib/guard.mjs';

/* The plates this guard speaks for. ENG-067 decides whether a finding fails
   the build from the state of the standard that holds the plate — this module
   only reports. REG-001 is the register's own rows; REG-002 is discovery and
   the pipeline the rows rest on. */
export const meta = { family: 'REG', plates: ['REG-001', 'REG-002'] };

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const REGISTER = 'standards/STD-015-engineering-checks.md';

const args = new Set(process.argv.slice(2));
const WANT_GITHUB = args.has('--github');
const LIST = args.has('--list');

/* Filled by `run`, read by the standalone printer: the rows as parsed, and the
   rows whose mechanism is a GitHub setting. Under the runner nobody reads
   them; `--list` and `--github` do. */
let lastRows = [];
const remoteRows = [];

const tracked = new Set(
  execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' }).trim().split('\n'),
);

/* The Scorecard checks this organisation may cite. Naming one Scorecard does
   not run is the same lie as naming a script that does not exist, one level
   further out. */
const SCORECARD_CHECKS = new Set([
  'Binary-Artifacts', 'Branch-Protection', 'CI-Tests', 'CII-Best-Practices',
  'Code-Review', 'Contributors', 'Dangerous-Workflow', 'Dependency-Update-Tool',
  'Fuzzing', 'License', 'Maintained', 'Packaging', 'Pinned-Dependencies',
  'SAST', 'Security-Policy', 'Signed-Releases', 'Token-Permissions',
  'Vulnerabilities', 'Webhooks', 'Contributing',
]);

// ── parse ────────────────────────────────────────────────────────────────────

export function parseRegister(text) {
  const rows = [];
  for (const line of text.split('\n')) {
    if (!line.startsWith('| ')) continue;
    const cells = line.split('|').map((c) => c.trim());
    if (cells.length < 7) continue;
    const [, profile, plate, practice, level, check] = cells;
    if (plate === 'Plate' || /^-+$/.test(plate)) continue;
    rows.push({ profile, plate, practice, level, check });
  }
  return rows;
}

/* A cell's label is what sits inside the first bracket pair. Read it once,
   here, so every caller agrees on what a row claims. */
export function classify(check) {
  const m = /^`\[(AUTO|GATE|DEBT):\s*([^\]]+)\]`(.*)$/.exec(check);
  if (!m) return { kind: 'MALFORMED', body: check };
  return { kind: m[1], body: m[2].trim(), trailer: m[3].trim() };
}

// ── the four forms ───────────────────────────────────────────────────────────

function checkAutoRef(body, problems, where) {
  const npm = /^npm\s+(\S+)$/.exec(body);
  const scorecard = /^scorecard\s+(\S+)$/.exec(body);
  const github = /^github\s+(.+)$/.exec(body);

  if (npm) {
    const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
    if (!pkg.scripts?.[npm[1]]) problems.push(`${where}: no npm script named "${npm[1]}"`);
    return { remote: false };
  }
  if (scorecard) {
    if (!tracked.has('.github/workflows/scorecard.yml'))
      problems.push(`${where}: cites Scorecard, but .github/workflows/scorecard.yml is not in the tree`);
    else if (!SCORECARD_CHECKS.has(scorecard[1]))
      problems.push(`${where}: "${scorecard[1]}" is not an OpenSSF Scorecard check name`);
    return { remote: false };
  }
  if (github) return { remote: true, query: github[1] };

  /* Otherwise it is a path, and a path must be a file this repository has.
     A trailing argument list is allowed: the cell may name how to invoke it. */
  const file = body.split(/\s+/)[0];
  if (!tracked.has(file)) problems.push(`${where}: names ${file}, which is not tracked in this repository`);
  return { remote: false };
}

function checkGate(body, problems, where) {
  /* A gate is an AUTO plus a signature. Both halves are stated, and the
     machine half is held to the same standard as any AUTO cell. */
  const parts = body.split('→').map((s) => s.trim());
  if (parts.length !== 2 || !parts[1])
    return problems.push(`${where}: a GATE must read "<machine evidence> → <the human act>"`), { remote: false };
  return checkAutoRef(parts[0], problems, where);
}

function checkDebt(body, problems, where) {
  /* Debt with no owner and no date is not debt, it is a mood. */
  const m = /—\s*([a-z][a-z0-9-]*),\s*(\d{4}-\d{2}-\d{2})\s*$/.exec(body);
  if (!m) problems.push(`${where}: a DEBT must end "— <owner>, <YYYY-MM-DD>"; got "${body}"`);
  return { remote: false };
}

// ── the structural checks ────────────────────────────────────────────────────

/* TRC-006, mechanically. Discovery runs through the registry, so a rule file
   that no entry names is never executed and the run is green for not looking.
   This is the failure that hides the others: nothing about a green run
   distinguishes "checked and clean" from "never ran". */
function checkGuardDiscovery(problems) {
  const registry = JSON.parse(readFileSync(path.join(ROOT, 'machine/scripts/blind-spots.json'), 'utf8'));
  const registered = new Set(
    Object.values(registry.guards).filter((g) => !g.manual).map((g) => g.script),
  );
  /* Read the directory, not just the index. A guard written and not yet
     committed is the likeliest unregistered guard there is — the author is
     mid-change — and reading `git ls-files` alone would answer "all clear"
     about a file sitting right there. The index is what CI sees; the working
     tree is what the author sees, and both get told. */
  const dir = path.join(ROOT, 'machine/guards/rules');
  const onDisk = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.mjs')).map((f) => `machine/guards/rules/${f}`) : [];
  for (const file of new Set([...onDisk, ...[...tracked].filter((f) => /^guards\/rules\/.+\.mjs$/.test(f))])) {
    if (registered.has(file)) continue;
    const untracked = !tracked.has(file) ? ' (not committed yet)' : '';
    problems.push(`guard discovery: ${file} is a rule guard that no registry entry names${untracked} — it never runs, and the run is green`);
  }
  for (const [name, g] of Object.entries(registry.guards)) {
    if (g.manual) continue;
    if (!existsSync(path.join(ROOT, g.script)))
      problems.push(`guard discovery: registry entry "${name}" names ${g.script}, which does not exist`);
  }
}

/* A guard that runs nowhere protects nothing. The register's promises rest on
   CI actually invoking the runner and the tests. */
function checkPipelineInvokes(problems) {
  const ci = readFileSync(path.join(ROOT, '.github/workflows/ci.yml'), 'utf8');
  for (const [what, needle] of [['the rule guards', 'run: npm run guards -- --rules'], ['the tests', 'run: npm test']])
    if (!ci.includes(needle)) problems.push(`pipeline: .github/workflows/ci.yml never invokes ${what} (looked for \`${needle}\`)`);
}

/* Four rows name this script as their machine, so this script has to actually
   perform them. A presence check that nobody wrote is the same lie in a newer
   font. Each entry: the plate, what must exist, and why the absence matters. */
const PRESENCE = [
  ['SEC-010', ['.github/CODEOWNERS'], 'no file says who must review a change'],
  ['TRC-002', ['.github/PULL_REQUEST_TEMPLATE.md', '.github/ISSUE_TEMPLATE/task.md'], 'work arrives with no stated definition of done'],
  ['AGT-001', ['AGENTS.md'], 'an agent has no standing instruction to audit before assuming'],
];

function checkPresence(problems) {
  for (const [plate, files, why] of PRESENCE)
    for (const f of files)
      if (!tracked.has(f)) problems.push(`${plate}: ${f} is missing — ${why}`);

  /* AGT-001 is not satisfied by the file existing: the row says the FIRST
     instruction is to audit the branch. An AGENTS.md that opens with anything
     else fails the practice while passing a presence check.

     The file read here is AGENTS.md, not CLAUDE.md. CLAUDE.md is one runtime's
     adapter; AGENTS.md is the platform-neutral layer every runtime loads, and
     guarding the adapter left the file the others read unguarded. */
  const agents = readFileSync(path.join(ROOT, 'AGENTS.md'), 'utf8');
  const firstDirective = agents.split('\n').find((l) => /^\*\*First instruction/.test(l.trim()));
  if (!firstDirective)
    problems.push('AGT-001: AGENTS.md does not open with a **First instruction** line');
  else if (!/audit/i.test(firstDirective))
    problems.push('AGT-001: AGENTS.md\'s first instruction does not tell the agent to audit the branch');

  /* SEC-010 names the paths that must carry an owner. A rule covers a path if
     it is that path or a parent of it: `/.github/` owns `/.github/workflows/`.
     Comparing the literal strings would demand a redundant, more specific rule
     and call a correct file broken. */
  const owners = readFileSync(path.join(ROOT, '.github/CODEOWNERS'), 'utf8');
  const rules = owners.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
    .map((l) => l.split(/\s+/)[0]);
  const covers = (needed) => rules.some((r) => {
    const base = r.replace(/\*$/, '');
    return needed === r || needed.startsWith(base);
  });
  for (const needed of ['/LICENSE', '/.github/workflows/'])
    if (!covers(needed)) problems.push(`SEC-010: .github/CODEOWNERS does not cover ${needed}`);
}

/* The summary says how many practices the register holds. Counting them is
   the least a register can do about itself. */
function checkSelfCount(text, rows, problems) {
  const m = /\*\*Summary:\*\*\s*The (\d+) practices/.exec(text.replace(/\n>\s*/g, ' '));
  if (!m) return problems.push('summary: the register does not state how many practices it holds');
  if (Number(m[1]) !== rows.length)
    problems.push(`summary: says ${m[1]} practices, table has ${rows.length}`);
}

// ── run ──────────────────────────────────────────────────────────────────────

/* The guard contract: read, return findings, judge nothing. Every problem
   carries the plate it offends, what is wrong and where — `execute` hands
   them to the regime, which decides from the state of STD-015 whether they
   fail the build (ENG-067). */
export function run() {
  const text = readFileSync(path.join(ROOT, REGISTER), 'utf8');
  const rows = parseRegister(text);
  const rowProblems = [];
  const structural = [];
  remoteRows.length = 0;

  for (const row of rows) {
    const where = `${row.plate}`;
    const { kind, body } = classify(row.check);
    if (kind === 'MALFORMED') {
      rowProblems.push(`${where}: check cell is not one of [AUTO: …] [GATE: …] [DEBT: …] — got ${row.check || '(empty)'}`);
      continue;
    }
    const r = kind === 'AUTO' ? checkAutoRef(body, rowProblems, where)
      : kind === 'GATE' ? checkGate(body, rowProblems, where)
        : checkDebt(body, rowProblems, where);
    if (r?.remote) remoteRows.push({ plate: row.plate, query: r.query });
  }

  checkSelfCount(text, rows, rowProblems);
  checkPresence(rowProblems);
  checkGuardDiscovery(structural);
  checkPipelineInvokes(structural);

  lastRows = rows;
  return [
    ...rowProblems.map((p) => ({ plate: 'REG-001', what: p, where: REGISTER })),
    ...structural.map((p) => ({ plate: 'REG-002', what: p, where: REGISTER })),
  ];
}

/* Standalone, with the flags a person needs. `--check` is the plain verdict
   without the regime, for running it by hand or from another script. */
function main() {
  const findings = run();

  if (LIST) {
    for (const row of lastRows) console.log(`${row.plate.padEnd(8)} ${classify(row.check).kind.padEnd(9)} ${row.practice.slice(0, 62)}`);
    const tally = lastRows.reduce((a, r) => (a[classify(r.check).kind] = (a[classify(r.check).kind] ?? 0) + 1, a), {});
    console.log(`\n${lastRows.length} practices — ` + Object.entries(tally).map(([k, v]) => `${v} ${k}`).join(', '));
    process.exit(0);
  }

  if (WANT_GITHUB) {
    for (const { plate, query } of remoteRows) {
      try {
        execFileSync('gh', ['api', query], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
      } catch (e) {
        const msg = (e.stderr || e.message || '').trim().split('\n')[0];
        console.error(`register: cannot read the GitHub setting for ${plate} — ${msg}`);
        console.error('This is unknown, not clean. Run it with a credential that administers the organisation.');
        process.exit(2);
      }
    }
  }

  if (findings.length) {
    console.log(`register: ${findings.length} problem(s) — STD-015 claims what this tree does not do.`);
    for (const f of findings) console.log(`  · ${f.what}`);
    console.log('\nA register nobody checks is the one document that can lie without failing.');
    process.exit(1);
  }

  const counted = lastRows.reduce((a, r) => (a[classify(r.check).kind] = (a[classify(r.check).kind] ?? 0) + 1, a), {});
  const shape = ['AUTO', 'GATE', 'DEBT'].filter((k) => counted[k]).map((k) => `${counted[k]} ${k}`).join(', ');
  console.log(`register: ${lastRows.length} practices hold their claims (${shape})${WANT_GITHUB ? `, ${remoteRows.length} GitHub setting(s) verified` : `, ${remoteRows.length} GitHub row(s) not checked without --github`}.`);
}

/* Two entries, one body of work. `--check`, `--list` and `--github` are the
   standalone verdict; under the runner it answers to the regime like every
   other guard. */
if (isMain(import.meta)) {
  if (LIST || WANT_GITHUB || args.has('--check')) main();
  else await execute(import.meta, meta, run);
}
