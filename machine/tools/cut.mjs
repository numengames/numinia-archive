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
//   node machine/tools/cut.mjs log <Kind> "<sentence>"
//                                       put the sentence as the newest CHANGELOG line under today's
//                                       day heading; refuses an unknown kind or a line over 320 chars
//   node machine/tools/cut.mjs site <ADD|CHG|FIX|DEL> "<sentence>"
//                                       add the sentence to web/src/data/updates.ts: the first time on
//                                       this branch it opens the next minor version, then it adds to it
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

/** Today as YYYY-MM-DD in UTC: the day headings and the site timeline are dated in UTC. */
export function dayUtc(d = new Date()) { return d.toISOString().slice(0, 10); }

export const LOG_KINDS = ['Added', 'Changed', 'Deprecated', 'Removed', 'Fixed', 'Security', 'Debt'];
export const LOG_MAX = 320;

/** The CHANGELOG with `- **Kind** sentence` as the newest line of `day` under [Unreleased]. Throws on a bad kind or a long line. */
export function addChangelogLine(text, kind, sentence, day) {
  if (!LOG_KINDS.includes(kind)) throw new Error(`kind must be one of ${LOG_KINDS.join(', ')}`);
  const s = (sentence ?? '').trim();
  if (!s || /\n/.test(s)) throw new Error('the sentence is one non-empty line');
  const line = `- **${kind}** ${s}`;
  if (line.length > LOG_MAX) throw new Error(`the line is ${line.length} chars, the cap is ${LOG_MAX}: shorten it`);
  const head = '## [Unreleased]\n';
  const at = text.indexOf(head);
  if (at < 0) throw new Error('CHANGELOG.md has no "## [Unreleased]" section');
  const after = at + head.length;
  const rest = text.slice(after);
  const first = /^\n*### (\d{4}-\d{2}-\d{2})\n/.exec(rest);
  if (first && first[1] === day) {
    const cut = after + first[0].length;
    return text.slice(0, cut) + line + '\n' + text.slice(cut);
  }
  return text.slice(0, after) + `\n### ${day}\n${line}\n` + rest;
}

export const SITE_TYPES = ['ADD', 'CHG', 'FIX', 'DEL'];

/** v0.169.0 -> v0.170.0 (the rule of updates.ts: a pull request that changes web/src raises the minor). */
export function nextMinor(v) {
  const m = /^v(\d+)\.(\d+)\.(\d+)$/.exec(v ?? '');
  return m ? `v${m[1]}.${Number(m[2]) + 1}.0` : null;
}

/**
 * updates.ts with the entry added. `opened` = this branch already added its version
 * (then the entry joins the newest version); otherwise a new version opens on top.
 */
export function addSiteEntry(text, type, sentence, day, opened) {
  if (!SITE_TYPES.includes(type)) throw new Error(`type must be one of ${SITE_TYPES.join(', ')}`);
  const s = (sentence ?? '').trim();
  if (!s || /\n/.test(s)) throw new Error('the sentence is one non-empty line');
  const entry = `      { type: "${type}", text: ${JSON.stringify(s)} },\n`;
  const anchor = 'export const UPDATES: readonly UpdateVersion[] = [\n';
  const at = text.indexOf(anchor);
  if (at < 0) throw new Error('updates.ts: the UPDATES list was not found');
  const after = at + anchor.length;
  const newest = /^ {2}\{\n {4}version: "(v[^"]+)",\n {4}date: "[^"]*",\n {4}entries: \[\n/.exec(text.slice(after));
  if (!newest) throw new Error('updates.ts: the newest version does not have the expected shape');
  if (opened) {
    const cut = after + newest[0].length;
    return text.slice(0, cut) + entry + text.slice(cut);
  }
  const next = nextMinor(newest[1]);
  if (!next) throw new Error(`updates.ts: ${newest[1]} is not vMAJOR.MINOR.PATCH`);
  const block = `  {\n    version: "${next}",\n    date: "${day}",\n    entries: [\n${entry}    ],\n  },\n`;
  return text.slice(0, after) + block + text.slice(after);
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
  if (meaningful.length && !files.includes('CHANGELOG.md')) todo.push('changelog: CHANGELOG.md has no new line for this change (cut.mjs log <Kind> "<sentence>")');
  if (files.some((f) => /^web\/src\//.test(f)) && !files.includes('web/src/data/updates.ts')) todo.push('site version: web/src changed but web/src/data/updates.ts has no new entry (cut.mjs site <TYPE> "<sentence>")');
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

function step(label, cmd, args, cwd = ROOT, { pending } = {}) {
  const t0 = Date.now();
  const r = spawnSync(cmd, args, { cwd, encoding: 'utf8', maxBuffer: 1 << 28 });
  const out = (r.stdout || '') + (r.stderr || '');
  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  const names = [...new Set(out.split('\n').filter((l) => /^(FAIL|✖|\?\?) /.test(l)).map((l) => l.replace(/ \(\d+(\.\d+)?ms\)$/, '')))];
  // A check that only `seal` can satisfy (the snapshot embeds the head) is pending, not red.
  const waiting = r.status !== 0 && pending && names.length > 0 && names.every((l) => l === `FAIL ${pending}`);
  const ok = r.status === 0 || waiting;
  console.log(`${waiting ? 'wait' : ok ? 'ok  ' : 'FAIL'} ${label} (${secs}s)${waiting ? ` — ${pending} waits for seal` : ''}`);
  if (!ok) {
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
  ok = step('checks', 'node', ['machine/scripts/run-checks.mjs', '--quiet'], ROOT, { pending: 'telemetry' }) && ok;
  ok = step('tests', 'npm', ['test']) && ok;
  console.log(ok ? '\ngate green (telemetry reads the HEAD: commit the content, then `cut.mjs seal`)' : '\ngate RED');
  return ok ? 0 : 1;
}

const TOKENIZER = 'machine/scripts/lib/tokenizer/cl100k_base.tiktoken';

function log(kind, sentence) {
  const p = path.join(ROOT, 'CHANGELOG.md');
  try { writeFileSync(p, addChangelogLine(readFileSync(p, 'utf8'), kind, sentence, dayUtc())); }
  catch (e) { console.log(`not written: ${e.message}`); return 1; }
  console.log(`CHANGELOG.md: ${kind} line added under ${dayUtc()}`);
  return 0;
}

const UPDATES_TS = 'web/src/data/updates.ts';
const newestVersion = (text) => /version: "(v[^"]+)"/.exec(text.slice(text.indexOf('export const UPDATES')))?.[1];

function site(type, sentence) {
  const p = path.join(ROOT, UPDATES_TS);
  const now = readFileSync(p, 'utf8');
  const before = baseText(UPDATES_TS);
  const opened = before != null && newestVersion(before) !== newestVersion(now);
  let out;
  try { out = addSiteEntry(now, type, sentence, dayUtc(), opened); }
  catch (e) { console.log(`not written: ${e.message}`); return 1; }
  writeFileSync(p, out);
  console.log(`${UPDATES_TS}: ${type} entry ${opened ? 'added to' : 'opens'} ${newestVersion(out)}`);
  return 0;
}

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
  const table = { status, bump, gate, seal, log, site };
  if (!table[cmd]) { console.error('usage: cut.mjs status | bump | gate | seal | log <Kind> "<sentence>" | site <TYPE> "<sentence>"'); process.exit(2); }
  process.exit(table[cmd](...process.argv.slice(3)));
}
