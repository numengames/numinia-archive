#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// run-checks.mjs — run the checks, and say what ran.
//
//   node machine/scripts/run-checks.mjs              every check whose input is present
//   node machine/scripts/run-checks.mjs --rules      only the rule checks (read the tree)
//   node machine/scripts/run-checks.mjs --build      only the build checks (read web/dist)
//   node machine/scripts/run-checks.mjs --list       print what would run, run nothing
//   --quiet                                  summary line per check, no detail
//
// Which scripts are checks is read from machine/scripts/blind-spots.json, the one
// place that already lists them; a script missing from that file is not a
// check and is not run here. A registered script outside machine/scripts/ (machine/tools/)
// declares its blind spots but takes arguments and is run by hand.
//
// A rule check reads the tree and hands its findings to the regime. A build
// check (registered as `build_check`) verifies an artefact and bites
// regardless of any standard's state; its registry entry says what it needs
// (`needs`: a path that must exist) and how it is invoked (`run`: extra
// arguments). Without --rules/--build both sets run, and a check whose
// input is absent is skipped with a printed line. With --build a missing
// input fails the run: asking for build checks and having nothing to check
// is a pipeline defect, not a skip.
//
// Exit 1 if any check that ran failed, 2 if the run itself could not happen.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const args = new Set(process.argv.slice(2));
const QUIET = args.has('--quiet');
const LIST = args.has('--list');
const onlyRules = args.has('--rules');
const onlyBuild = args.has('--build');
const registry = JSON.parse(readFileSync(path.join(HERE, 'blind-spots.json'), 'utf8'));
// A registry entry names every declared check (ENG-032, D-025). Some entries
// are tools that take arguments and are run by hand (`manual: <why>`); the
// rest are checks the runner runs, wherever their script sits — a check's
// location is not a signal of whether CI runs it (that used to be
// `startsWith('machine/scripts/')`, which silently stopped discovering a check the
// moment R3 moved it out of machine/scripts/).
const all = Object.entries(registry.checks)
  .filter(([, g]) => !g.manual)
  .map(([name, g]) => ({ name, script: path.join(ROOT, g.script), build: Boolean(g.build_check), run: g.run ?? [], needs: g.needs ? path.join(ROOT, g.needs) : null }))
  .sort((a, b) => a.name.localeCompare(b.name));

let selected = all;
if (onlyRules) selected = all.filter((g) => !g.build);
if (onlyBuild) selected = all.filter((g) => g.build);

const absent = selected.filter((g) => g.needs && !existsSync(g.needs));
if (onlyBuild && absent.length) {
  for (const g of absent) console.error(`run-checks: ${g.name} needs ${path.relative(ROOT, g.needs)}, which does not exist.`);
  process.exit(2);
}

if (LIST) {
  for (const g of selected) console.log(`${g.build ? 'build' : 'rule '}  ${g.name}${g.run.length ? '  ' + g.run.join(' ') : ''}`);
  process.exit(0);
}

let failed = 0;
for (const g of selected) {
  if (!existsSync(g.script)) { console.log(`?? ${g.name} — registered, no script at ${path.relative(ROOT, g.script)}`); failed += 1; continue; }
  if (g.needs && !existsSync(g.needs)) { console.log(`-- ${g.name} — skipped, needs ${path.relative(ROOT, g.needs)}`); continue; }
  const r = spawnSync('node', [g.script, ...g.run], { cwd: ROOT, encoding: 'utf8' });
  const out = (r.stdout || '') + (r.stderr || '');
  const summary = /(\d+) finding\(s\), (\d+) enforced/.exec(out);
  const tag = r.status === 0 ? 'ok' : 'FAIL';
  console.log(`${tag.padEnd(4)} ${g.name}${summary ? ` — ${summary[1]} findings, ${summary[2]} enforced` : ''}`);
  if (!QUIET && (r.status !== 0 || summary?.[1] !== '0')) console.log(out.replace(/^/gm, '     '));
  if (r.status !== 0) failed += 1;
}
console.log(`\n${selected.length} checks, ${failed} failed`);
process.exit(failed ? 1 : 0);
