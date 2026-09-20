// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// guard.mjs — the contract every guard under machine/guards/ fulfils, and the one
// place that turns a guard's findings into a process.
//
// A guard is a module that exports two things:
//
//   export const meta = { family: 'LIC', plates: ['LIC-008'] };
//   export function run(corpus) { return [{ plate, what, where }, ...]; }
//
// `meta.family` is the plate prefix the guard speaks for; `meta.plates` lists
// every plate it can emit, so a reader (and the contract test) knows what a
// guard covers without running it. `run` reads the corpus and returns
// findings. It never prints, never exits, never decides whether a finding
// fails the build — that is the regime's question, answered by the state of
// the standard that holds the plate.
//
// A finding may carry `should: true`: the plate is a SHOULD in its standard
// (a budget, a size), so it is measured and counted but never handed to the
// regime. The guard says so because the standard says so in prose; there is
// no machine-readable severity to derive it from.
//
// `execute` is the standalone entry: it declares the guard's blind spots,
// loads the corpus once, runs the guard, hands the findings to the regime and
// exits with its verdict. A guard's last line is:
//
//   if (isMain(import.meta)) await execute(import.meta, meta, run);
//
// so importing the module (the contract test does) runs nothing.
//
// The guard's registry name is its file name without `.mjs`: one name for
// the file, the registry entry and the printed summary.

import { execFileSync } from 'node:child_process';
import { readFileSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { declareBlindSpots } from '../../scripts/lib/blindness.mjs';
import { ROOT, parseFM } from '../../scripts/lib/frontmatter.mjs';
import { Findings } from '../../scripts/lib/regime.mjs';

/** Every tracked .md, read on demand and cached: `files`, `text(rel)`,
 *  `fm(rel)`. Tracked means the index — an untracked file is not seen, and
 *  the guards' blind-spot declarations say so. */
export function loadCorpus(root = ROOT) {
  const files = execFileSync('git', ['ls-files', '*.md'], { cwd: root, encoding: 'utf8' })
    .split('\n').filter(Boolean);
  const texts = new Map();
  const fms = new Map();
  const text = (rel) => {
    if (!texts.has(rel)) texts.set(rel, readFileSync(path.join(root, rel), 'utf8'));
    return texts.get(rel);
  };
  const fm = (rel) => {
    if (!fms.has(rel)) fms.set(rel, parseFM(text(rel)));
    return fms.get(rel);
  };
  return { root, files, text, fm };
}

/** True when this module is the script node was started with, false when it
 *  was imported. */
export function isMain(importMeta) {
  if (!process.argv[1]) return false;
  let entry;
  try { entry = realpathSync(process.argv[1]); } catch { return false; }
  return pathToFileURL(entry).href === importMeta.url;
}

/** The guard's name: its file name without the extension. */
export function nameOf(importMeta) {
  return path.basename(fileURLToPath(importMeta.url), '.mjs');
}

/** A guard on the contract reads the INDEX. A .md on disk that has not been
 *  `git add`ed is invisible to it, and a green verdict says nothing about it
 *  — so the guard names what it could not see, on stderr, before it judges.
 *  Every registry entry that claims "its own untracked-file warning" is
 *  honoured here, once. */
export function warnUntracked(name, root = ROOT) {
  const untracked = execFileSync('git', ['ls-files', '--others', '--exclude-standard', '*.md'], { cwd: root, encoding: 'utf8' })
    .split('\n').filter(Boolean).filter((f) => !f.startsWith('web/'));
  if (!untracked.length) return [];
  console.warn(`\n\u26a0 ${name}: ${untracked.length} untracked .md file(s) — NOT scanned (this guard reads the git index):`);
  for (const f of untracked) console.warn(`    ${f}`);
  console.warn('  A green result here says nothing about them. `git add` them first.\n');
  return untracked;
}

/** Run one guard as a process: declare, load, run, judge, exit. SHOULD
 *  findings are counted on one line and kept out of the regime. */
export async function execute(importMeta, meta, run, { corpus = loadCorpus() } = {}) {
  const name = nameOf(importMeta);
  declareBlindSpots(name);
  warnUntracked(name, corpus.root);
  const out = new Findings(name);
  const measured = new Map();
  for (const f of run(corpus)) {
    if (f.should) { measured.set(f.plate, (measured.get(f.plate) ?? 0) + 1); continue; }
    out.add(f.plate, f.what, f.where);
  }
  if (measured.size) {
    const parts = [...measured].sort().map(([p, n]) => `${p} ×${n}`);
    console.log(`${name}: measured, not judged (SHOULD): ${parts.join(', ')}`);
  }
  out.finish({ ok: `${meta.plates.join(' ')} — all hold.` });
}
