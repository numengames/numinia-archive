#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// telemetry.mjs — the one instrument that counts the corpus. MIS-138.
//
// Every figure it emits carries value, unit and definition, and the dataset
// carries the HEAD and corpus_hash it was measured at. Whoever runs it
// carries no authority: anyone re-runs and compares hashes (D2).
//
//   node machine/scripts/telemetry.mjs            # measure → machine/telemetry/{latest.json,docs.json,latest.md,history.jsonl}: all four gitignored, none committed
//   node machine/scripts/telemetry.mjs --build    # the same for a site build: fresh ledger from origin/data/telemetry; needs the full git log and the tokenizer (fetched if absent), exit 1 without them
//   node machine/scripts/telemetry.mjs --history F  # read and append the ledger F (the post-merge workflow's data branch) instead of the local copy
//   node machine/scripts/telemetry.mjs --check    # exit 1 if the local, generated machine/telemetry/latest.json is not HEAD's corpus (a local aid; CI no longer runs it)
//   node machine/scripts/telemetry.mjs --print    # measure, print latest.json to stdout, write nothing (what CI runs: "the instrument runs")
//   node machine/scripts/telemetry.mjs --key a.b  # print one figure with its predicate
//   node machine/scripts/telemetry.mjs --fetch-tokenizer  # download cl100k_base.tiktoken into machine/scripts/lib/tokenizer/, verify sha256 (gitignored, ≈1.6 MB)
//
// Read-only over the corpus; writes only under machine/telemetry/ (or the ledger named by --history).
// Deterministic: same tree → same latest.json byte for byte (measured_at aside).
//
// Nothing this writes is committed to main (the ledger lives on the data branch, see
// lib/history.mjs): the dataset a page shows is measured in the build that publishes it.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { ROOT, loadRules } from './lib/frontmatter.mjs';
import { loadDocs, headInfo } from './lib/corpus.mjs';
import * as corpus from './lib/families/corpus.mjs';
import * as series from './lib/families/series.mjs';
import * as missions from './lib/families/missions.mjs';
import * as tokens from './lib/families/tokens.mjs';
import { headers, provenance } from './lib/families/provenance.mjs';
import { contradictions, figures as figuresFam } from './lib/families/claims.mjs';
import { RANK_URL, RANK_SHA256, RANK_PATH } from './lib/cl100k.mjs';
import { declareBlindSpots } from './lib/blindness.mjs';
import { appendRow, resolveHistory, ensureFullHistory, DATA_BRANCH } from './lib/history.mjs';

const VERSION = '0.5.0';
// Declared on every exit, like the guards (D-025). Silenced for --print/--key: their stdout is
// parsed by tests and pipes, and blindness prints to stderr only after the JSON — still, one channel per run.
if (!process.argv.some((a) => ['--print', '--key', '--fetch-tokenizer'].includes(a))) declareBlindSpots('telemetry');
const FAMILIES = { corpus, series, missions, tokens, headers, provenance, contradictions, figures: figuresFam };
const OUT = path.join(ROOT, 'machine', 'telemetry');
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const keyArg = args[args.indexOf('--key') + 1];
const historyArg = flag('--history') ? args[args.indexOf('--history') + 1] : null;

/** Download the cl100k rank file and verify it against the pinned sha256. { ok, bytes?, reason? }; writes only a verified file. */
async function fetchTokenizer() {
  const { createHash } = await import('node:crypto');
  // TELEMETRY_RANK_URL is for tests that must fail the download; the sha256 pin still judges the content.
  const url = process.env.TELEMETRY_RANK_URL ?? RANK_URL;
  let buf;
  try { buf = Buffer.from(await (await fetch(url)).arrayBuffer()); } catch (e) { return { ok: false, reason: `could not fetch ${url}: ${e.message}` }; }
  const sha = createHash('sha256').update(buf).digest('hex');
  if (sha !== RANK_SHA256) return { ok: false, reason: `fetched sha256 ${sha} ≠ pinned ${RANK_SHA256}; not written` };
  mkdirSync(path.dirname(RANK_PATH), { recursive: true }); writeFileSync(RANK_PATH, buf);
  return { ok: true, bytes: buf.length };
}

if (flag('--fetch-tokenizer')) {
  const r = await fetchTokenizer();
  if (!r.ok) { console.error(r.reason); process.exit(1); }
  console.log(`cl100k_base.tiktoken ${r.bytes} bytes, sha256 verified → ${path.relative(ROOT, RANK_PATH)}`); process.exit(0);
}

export function measureAll() {
  const rules = loadRules();
  const docs = loadDocs(rules);
  // `ctx.latest` is this run's own figures, filled family by family: `figures` (last) checks the
  // citations in the corpus against them. It used to read the committed latest.json, which is gone
  // from git; reading a leftover local file instead would make a build and a laptop disagree.
  const figures = {};
  const ctx = { docs, rules, latest: { figures } };
  for (const [fam, mod] of Object.entries(FAMILIES))
    for (const [k, fig] of Object.entries(mod.measure(ctx))) figures[`${fam}.${k}`] = fig;
  const info = headInfo();
  const latest = {
    instrument: `machine/scripts/telemetry.mjs v${VERSION}`,
    head: info.head, corpus_hash: info.corpus_hash, root_dirty: info.root_dirty,
    measured_at: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
    families: Object.keys(FAMILIES),
    figures,
  };
  const rows = docs.map((d) => ({ path: d.path, dir: d.dir, series: d.series, type: d.type, status: d.status, chars: d.chars, apparatus: d.apparatus, archived: d.archived, tokens: d.tokens ?? null }));
  return { latest, docs: rows };
}

function values(latest) {
  return Object.fromEntries(Object.entries(latest.figures).map(([k, f]) => [k, f.value]));
}

/** One table cell: backslashes first, then pipes, then newlines — nothing a definition contains can break the row. */
const cell = (s) => String(s).replace(/\\/g, '\\\\').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');

function render(latest) {
  const scalar = (v) => (typeof v === 'object' && v !== null ? null : v);
  const lines = [
    '---', 'id: "TELEMETRY"', 'uid: ""', 'title: "Telemetry — latest measurement"', 'type: meta', 'status: active',
    `version: "${VERSION}"`, `created: "2026-09-02T14:30:00Z"`, `updated: "${latest.measured_at}"`,
    'author: "machine/scripts/telemetry.mjs"', 'owner: "oracle"', 'license: "CC0-1.0"', 'registration: exempt',
    'registration_reason: "generated dataset view — rebuilt by the instrument, never edited by hand"', '---', '',
    '# Telemetry — latest measurement', '',
    `> **Summary:** The only document in this corpus that states figures. Generated by \`${latest.instrument}\`; every number below names its unit and predicate.`,
    '> **Epistemic:** A figure here is true of the tree at `head` / `corpus_hash` and of nothing else. Other documents cite a key and a `HEAD`; they do not restate values (STD-001 §10.5, MIS-138 D5).',
    '> **Pragmatic:** Re-run `node machine/scripts/telemetry.mjs` and compare `corpus_hash`; a conflict on any file under `machine/telemetry/` is resolved by re-running, never by hand.',
    '', `- head: \`${latest.head}\`  · corpus_hash: \`${latest.corpus_hash.slice(0, 16)}…\`  · measured_at: ${latest.measured_at}  · root_dirty: ${latest.root_dirty}`, '',
  ];
  for (const fam of latest.families) {
    lines.push(`## ${fam}`, '', '| key | value | unit | definition |', '|---|---|---|---|');
    for (const [k, f] of Object.entries(latest.figures).filter(([k]) => k.startsWith(fam + '.'))) {
      const s = scalar(f.value);
      lines.push(`| \`${k}\` | ${s === null ? '(table below)' : s} | ${cell(f.unit)} | ${cell(f.definition)} |`);
    }
    lines.push('');
    for (const [k, f] of Object.entries(latest.figures).filter(([k]) => k.startsWith(fam + '.'))) {
      if (scalar(f.value) !== null) continue;
      // Lists of paths (evidence rows) stay in latest.json: the page states figures, and
      // historical paths would read as broken links to the DEF-009 guard.
      if (Array.isArray(f.value)) { lines.push(`### \`${k}\``, '', `${f.value.length} rows (${f.unit}) — in \`latest.json\`.`, ''); continue; }
      lines.push(`### \`${k}\``, '');
      const v = f.value;
      // A null or empty table is a legitimate figure — zero findings, or a
      // measurer with nothing to say for this tree. Render it as such instead
      // of throwing on Object.values(null).
      if (v === null || v === undefined || Object.keys(v).length === 0) { lines.push(`(none — 0 rows)`, ''); continue; }
      const first = Object.values(v)[0];
      if (typeof first === 'object' && first !== null) {
        const cols = Object.keys(first);
        lines.push(`| | ${cols.join(' | ')} |`, `|---|${cols.map(() => '---').join('|')}|`);
        for (const [row, obj] of Object.entries(v)) lines.push(`| ${cell(row)} | ${cols.map((c) => cell(obj[c] ?? '')).join(' | ')} |`);
      } else {
        lines.push('| | ' + f.unit + ' |', '|---|---|');
        for (const [row, n] of Object.entries(v)) lines.push(`| ${cell(row)} | ${n} |`);
      }
      lines.push('');
    }
  }
  return lines.join('\n');
}

// --build: the dataset is measured in the build that publishes it, so the build must be able to see
// the log (first-add dates, renames). A checkout cut off from it would publish figures about another
// repository, so it stops instead; the page that is live stays live.
if (flag('--build') && !ensureFullHistory()) {
  console.error('telemetry --build: this checkout is shallow and `git fetch --unshallow origin` failed; the provenance figures would describe another repository. Not writing.');
  process.exit(1);
}
// The tokenizer rank file is gitignored, so a fresh build checkout does not have it. Without it every
// token figure is null and the /telemetry panel would be drawn from nothing: fetch it (sha256-pinned)
// or stop. The page that is live stays live.
if (flag('--build') && !existsSync(RANK_PATH)) {
  const r = await fetchTokenizer();
  if (!r.ok) { console.error(`telemetry --build: no tokenizer rank file and it cannot be fetched (${r.reason}); the token figures would be null. Not writing.`); process.exit(1); }
  console.log(`telemetry --build: fetched the tokenizer rank file (${r.bytes} bytes, sha256 verified)`);
}

const { latest, docs } = measureAll();

if (keyArg && flag('--key')) {
  const f = latest.figures[keyArg];
  if (!f) { console.error(`no key ${keyArg}; keys: ${Object.keys(latest.figures).join(', ')}`); process.exit(2); }
  console.log(JSON.stringify({ key: keyArg, ...f, head: latest.head }, null, 2)); process.exit(0);
}
if (flag('--print')) { console.log(JSON.stringify(latest, null, 2)); process.exit(0); }
if (flag('--check')) {
  const p = path.join(OUT, 'latest.json');
  if (!existsSync(p)) { console.error('telemetry --check: machine/telemetry/latest.json missing — run `node machine/scripts/telemetry.mjs`'); process.exit(1); }
  const prev = JSON.parse(readFileSync(p, 'utf8'));
  if (prev.corpus_hash !== latest.corpus_hash) { console.error(`telemetry --check: STALE — latest.json is for corpus ${prev.corpus_hash.slice(0, 12)} (head ${prev.head}), tree is ${latest.corpus_hash.slice(0, 12)} (head ${latest.head}). Re-run node machine/scripts/telemetry.mjs.`); process.exit(1); }
  // Figures marked `volatile` depend on commit dates, which squash-merge rewrites between the
  // branch and main (see provenance.mjs `dated`). They are published, never compared here.
  const compared = Object.entries(latest.figures).filter(([, f]) => !f.volatile);
  const diff = compared.filter(([k, f]) => JSON.stringify(f.value) !== JSON.stringify(prev.figures[k]?.value));
  if (diff.length) { console.error(`telemetry --check: ALTERED — same corpus, ${diff.length} figure(s) differ from a fresh run: ${diff.map(([k]) => k).join(', ')}`); process.exit(1); }
  const skipped = Object.keys(latest.figures).length - compared.length;
  console.log(`telemetry --check: OK — latest.json matches HEAD ${latest.head} (${compared.length} figures compared, ${skipped} commit-dated figures published but not compared)`); process.exit(0);
}

mkdirSync(OUT, { recursive: true });
writeFileSync(path.join(OUT, 'latest.json'), JSON.stringify(latest, null, 2) + '\n');
writeFileSync(path.join(OUT, 'docs.json'), JSON.stringify(docs, null, 1) + '\n');
writeFileSync(path.join(OUT, 'latest.md'), render(latest) + '\n');

// The ledger. --history F names the file to extend (the data branch's); otherwise the local, gitignored
// copy. An absent or empty ledger is filled from the data branch, then from the commit that last
// tracked it (the seed); --build always refreshes from the data branch first.
const hist = historyArg ? path.resolve(historyArg) : path.join(OUT, 'history.jsonl');
const have = existsSync(hist) ? readFileSync(hist, 'utf8') : '';
let ledger = have, source = historyArg ? `${path.basename(hist)}` : 'local copy';
if (flag('--build') || have.trim() === '') ({ text: ledger, source } = resolveHistory());
const row = { head: latest.head, corpus_hash: latest.corpus_hash, measured_at: latest.measured_at, values: values(latest) };
// History records committed trees only: a dirty tree has no stable hash to cite.
const { text: next, added } = latest.root_dirty ? { text: ledger, added: false } : appendRow(ledger, row);
if (next !== have || !existsSync(hist)) { mkdirSync(path.dirname(hist), { recursive: true }); writeFileSync(hist, next); }
const histNote = latest.root_dirty ? '· history untouched (tree dirty)' : added ? '· history +1' : '· history unchanged (same corpus_hash)';
console.log(`telemetry: ${Object.keys(latest.figures).length} figures in ${latest.families.length} families at ${latest.head} (dirty ${latest.root_dirty}) → ${path.relative(ROOT, OUT)}/  ${histNote} [ledger: ${source}, ${next.split('\n').filter(Boolean).length} lines; main keeps none of it, see ${DATA_BRANCH}]`);
