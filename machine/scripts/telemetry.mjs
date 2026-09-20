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
//   node machine/scripts/telemetry.mjs            # measure → machine/telemetry/{latest.json,docs.json,latest.md}; append history.jsonl
//   node machine/scripts/telemetry.mjs --check    # exit 1 if machine/telemetry/latest.json is not HEAD's corpus (stale/altered)
//   node machine/scripts/telemetry.mjs --print    # measure, print latest.json to stdout, write nothing
//   node machine/scripts/telemetry.mjs --key a.b  # print one figure with its predicate
//   node machine/scripts/telemetry.mjs --fetch-tokenizer  # download cl100k_base.tiktoken into machine/scripts/lib/tokenizer/, verify sha256 (gitignored, ≈1.6 MB)
//
// Read-only over the corpus; writes only under machine/telemetry/. Deterministic:
// same tree → same latest.json byte for byte (measured_at aside).
import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
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

const VERSION = '0.5.0';
// Declared on every exit, like the guards (D-025). Silenced for --print/--key: their stdout is
// parsed by tests and pipes, and blindness prints to stderr only after the JSON — still, one channel per run.
if (!process.argv.some((a) => ['--print', '--key', '--fetch-tokenizer'].includes(a))) declareBlindSpots('telemetry');
const FAMILIES = { corpus, series, missions, tokens, headers, provenance, contradictions, figures: figuresFam };
const OUT = path.join(ROOT, 'machine', 'telemetry');
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const keyArg = args[args.indexOf('--key') + 1];

if (flag('--fetch-tokenizer')) {
  const { createHash } = await import('node:crypto');
  const buf = Buffer.from(await (await fetch(RANK_URL)).arrayBuffer());
  const sha = createHash('sha256').update(buf).digest('hex');
  if (sha !== RANK_SHA256) { console.error(`fetched sha256 ${sha} ≠ pinned ${RANK_SHA256}; not written`); process.exit(1); }
  mkdirSync(path.dirname(RANK_PATH), { recursive: true }); writeFileSync(RANK_PATH, buf);
  console.log(`cl100k_base.tiktoken ${buf.length} bytes, sha256 verified → ${path.relative(ROOT, RANK_PATH)}`); process.exit(0);
}

export function measureAll() {
  const rules = loadRules();
  const docs = loadDocs(rules);
  const ctx = { docs, rules, latest: existsSync(path.join(OUT, 'latest.json')) ? JSON.parse(readFileSync(path.join(OUT, 'latest.json'), 'utf8')) : null };
  const figures = {};
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
      // historical paths would read as broken links to the GIT-048 guard.
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

const { latest, docs } = measureAll();

if (keyArg && flag('--key')) {
  const f = latest.figures[keyArg];
  if (!f) { console.error(`no key ${keyArg}; keys: ${Object.keys(latest.figures).join(', ')}`); process.exit(2); }
  console.log(JSON.stringify({ key: keyArg, ...f, head: latest.head }, null, 2)); process.exit(0);
}
if (flag('--print')) { console.log(JSON.stringify(latest, null, 2)); process.exit(0); }
if (flag('--check')) {
  const p = path.join(OUT, 'latest.json');
  if (!existsSync(p)) { console.error('telemetry --check: machine/telemetry/latest.json missing — run the instrument'); process.exit(1); }
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
const hist = path.join(OUT, 'history.jsonl');
const seen = existsSync(hist) && readFileSync(hist, 'utf8').split('\n').filter(Boolean).some((l) => JSON.parse(l).corpus_hash === latest.corpus_hash);
// History records committed trees only: a dirty tree has no stable hash to cite.
const histNote = latest.root_dirty ? '· history untouched (tree dirty)' : seen ? '· history unchanged (same corpus_hash)' : '· history +1';
if (!latest.root_dirty && !seen) appendFileSync(hist, JSON.stringify({ head: latest.head, corpus_hash: latest.corpus_hash, measured_at: latest.measured_at, values: values(latest) }) + '\n');
console.log(`telemetry: ${Object.keys(latest.figures).length} figures in ${latest.families.length} families at ${latest.head} (dirty ${latest.root_dirty}) → machine/telemetry/  ${histNote}`);
