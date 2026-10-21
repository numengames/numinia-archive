#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// cut.mjs — the mechanical half of cutting a change.
//
//   node machine/tools/cut.mjs status   what this change still needs; changes nothing; exit 1 if anything
//   node machine/tools/cut.mjs bump     version + updated on every edited document that did not move them
//   node machine/tools/cut.mjs gate     stage, build if the site changed, run the checks and the tests,
//                                       one line per step, the names of what failed, nothing else
//   node machine/tools/cut.mjs seal     refresh the telemetry snapshot and commit it on its own
//
// Why it exists: a cut was a dozen hand steps (bump each document, write the
// changelog line, build, checks, tests, telemetry in its own commit) and each
// forgotten one cost a red CI run. The judgement stays with the author — what
// changed, the changelog sentence, the commit message. This does the counting.
//
// Base for "what changed" is the merge-base with origin/main, so an old branch
// is judged by what it adds, not by how far main has moved.
import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trimEnd();

/* ---- pure helpers (tested) ------------------------------------------- */

/** 1.2.3 -> 1.2.4. Anything that is not MAJOR.MINOR.PATCH is returned as null: the author decides. */
export function bumpPatch(v) {
  const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(v ?? '');
  return m ? `${m[1]}.${m[2]}.${Number(m[3]) + 1}` : null;
}

/** An ISO time with the local offset, the form `date -Iseconds` prints (a midnight `T00:00:00Z` fails HDR-006). */
export function isoLocal(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  const off = -d.getTimezoneOffset();
  const sign = off >= 0 ? '+' : '-';
  const o = Math.abs(off);
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}${sign}${p(Math.floor(o / 60))}:${p(o % 60)}`;
}

const FM = /^---\n([\s\S]*?)\n---/;
const field = (fm, k) => new RegExp(`^${k}:\\s*"?([^"\\n]*)"?\\s*$`, 'm').exec(fm)?.[1];

/** The version and updated stamp of a document's header, or null when it has none. */
export function headerOf(text) {
  const fm = FM.exec(text)?.[1];
  if (fm === undefined) return null;
  return { version: field(fm, 'version'), updated: field(fm, 'updated') };
}

/** Did the edit leave the header untouched? `base` null = a new file, nothing to bump. */
export function needsBump(baseText, nowText) {
  if (baseText == null) return false;
  const b = headerOf(baseText), n = headerOf(nowText);
  if (!b || !n || !b.version || !n.version) return false;
  if (baseText === nowText) return false;
  return b.version === n.version;
}

/** The header with version and updated moved; the rest of the file byte-for-byte. null if the version is not plain semver. */
export function applyBump(text, now = new Date()) {
  const h = headerOf(text);
  const next = bumpPatch(h?.version);
  if (!next) return null;
  return text
    .replace(FM, (fm) => fm
      .replace(/^(version:\s*)"?[^"\n]*"?(\s*)$/m, `$1"${next}"$2`)
      .replace(/^(updated:\s*)"?[^"\n]*"?(\s*)$/m, `$1"${isoLocal(now)}"$2`));
}

/* ---- the repository side ---------------------------------------------- */

function base() { return git('merge-base', 'origin/main', 'HEAD'); }

function changedFiles() {
  const tracked = git('diff', '--name-only', '--diff-filter=AMR', base()).split('\n').filter(Boolean);
  const loose = git('ls-files', '--others', '--exclude-standard').split('\n').filter(Boolean);
  return [...new Set([...tracked, ...loose])];
}

function baseText(rel) {
  try { return git('show', `${base()}:${rel}`) + '\n'; } catch { return null; }
}

const DOC = /\.md$/;
const NOT_A_DOC = /^(CHANGELOG|README|AGENTS|CLAUDE|CONTRIBUTING|CODE_OF_CONDUCT|SECURITY|TRADEMARKS)\.md$|^web\/|^\.github\/|^machine\/telemetry\//;

function staleHeaders(files) {
  return files.filter((f) => DOC.test(f) && !NOT_A_DOC.test(f) && existsSync(path.join(ROOT, f)))
    .filter((f) => needsBump(baseText(f), readFileSync(path.join(ROOT, f), 'utf8')));
}

function status() {
  const files = changedFiles();
  const todo = [];
  for (const f of staleHeaders(files)) todo.push(`bump: ${f} changed and its version did not (cut.mjs bump)`);
  const meaningful = files.filter((f) => !/^machine\/telemetry\//.test(f) && f !== 'CHANGELOG.md');
  if (meaningful.length && !files.includes('CHANGELOG.md')) todo.push('changelog: CHANGELOG.md has no new line for this change');
  if (files.some((f) => /^web\/src\//.test(f)) && !files.includes('web/src/data/updates.ts')) todo.push('site version: web/src changed but web/src/data/updates.ts has no new entry');
  const t = spawnSync('node', ['machine/scripts/telemetry.mjs', '--check'], { cwd: ROOT, encoding: 'utf8' });
  if (t.status !== 0) todo.push('telemetry: the snapshot is stale (cut.mjs seal, after the content commit)');
  console.log(`${files.length} file(s) changed against ${base().slice(0, 7)}`);
  if (!todo.length) { console.log('nothing missing'); return 0; }
  for (const l of todo) console.log(`- ${l}`);
  return 1;
}

function bump() {
  let n = 0;
  for (const f of staleHeaders(changedFiles())) {
    const p = path.join(ROOT, f);
    const out = applyBump(readFileSync(p, 'utf8'));
    if (!out) { console.log(`skip ${f}: version is not MAJOR.MINOR.PATCH, bump it by hand`); continue; }
    writeFileSync(p, out);
    console.log(`bumped ${f}`);
    n += 1;
  }
  console.log(n ? `${n} header(s) moved. The changelog sentence and any citation of the old version are yours.` : 'nothing to bump');
  return 0;
}

function step(label, cmd, args, cwd = ROOT) {
  const t0 = Date.now();
  const r = spawnSync(cmd, args, { cwd, encoding: 'utf8', maxBuffer: 1 << 28 });
  const out = (r.stdout || '') + (r.stderr || '');
  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  const ok = r.status === 0;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label} (${secs}s)`);
  if (!ok) {
    const names = [...new Set(out.split('\n').filter((l) => /^(FAIL|✖|\?\?) /.test(l)).map((l) => l.replace(/ \(\d+(\.\d+)?ms\)$/, '')))];
    for (const l of (names.length ? names : out.split('\n').slice(-12)).slice(0, 25)) console.log(`     ${l}`);
  }
  return ok;
}

function gate() {
  git('add', '-A');
  const files = changedFiles();
  let ok = true;
  if (files.some((f) => /^web\//.test(f))) {
    if (!existsSync(path.join(ROOT, 'web', 'node_modules'))) ok = step('web dependencies', 'npm', ['ci', '--no-audit', '--no-fund'], path.join(ROOT, 'web')) && ok;
    ok = step('web build', 'npm', ['run', 'build'], path.join(ROOT, 'web')) && ok;
  }
  if (!existsSync(path.join(ROOT, TOKENIZER))) console.log('note no tokenizer: `npm run setup` before `seal`');
  ok = step('checks', 'node', ['machine/scripts/run-checks.mjs', '--quiet']) && ok;
  ok = step('tests', 'npm', ['test']) && ok;
  console.log(ok ? '\ngate green (telemetry reads the HEAD: commit the content, then `cut.mjs seal`)' : '\ngate RED');
  return ok ? 0 : 1;
}

const TOKENIZER = 'machine/scripts/lib/tokenizer/cl100k_base.tiktoken';

function seal() {
  // Without the tokenizer the snapshot records tokens:0 and still passes --check; the panel test then fails.
  if (!existsSync(path.join(ROOT, TOKENIZER))) { console.log('no tokenizer: run `npm run setup` first, or the snapshot records 0 tokens'); return 1; }
  if (git('status', '--porcelain', '--', '.', ':!machine/telemetry')) { console.log('uncommitted content: commit it first, the snapshot embeds the head'); return 1; }
  if (!step('telemetry', 'node', ['machine/scripts/telemetry.mjs'])) return 1;
  git('add', '-A');
  if (!git('status', '--porcelain')) { console.log('snapshot already current'); return 0; }
  execFileSync('git', ['commit', '-q', '-m', 'chore(telemetry): refresh snapshot'], { cwd: ROOT, stdio: 'inherit' });
  return step('telemetry --check', 'node', ['machine/scripts/telemetry.mjs', '--check']) ? 0 : 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const cmd = process.argv[2];
  const table = { status, bump, gate, seal };
  if (!table[cmd]) { console.error('usage: cut.mjs status | bump | gate | seal'); process.exit(2); }
  process.exit(table[cmd]());
}
