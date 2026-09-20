// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// regime — ENG-067 (STD-005): a guard bites by the state of its rule.
//
// A finding fails the build only while the standard that HOLDS the plate it
// cites is `active`. While the holder is `draft`, the finding is reported and
// the guard exits zero. The holder's state is read from its header at run
// time, never configured in the guard, so ratifying a standard is what turns
// its guards on (PRE-006: a draft binds nobody).
//
// HOW A PLATE FINDS ITS HOLDER
// ----------------------------
// Every rule in the axis is written once, in bold, as `**XXX-NNN — Title.**`
// inside one canon, standard or protocol. This module scans the axis for
// those definitions. A plate cited by a guard resolves to the document that
// defines it; a plate that no document defines but whose PREFIX one document
// owns resolves to that document (a guard may check a rule the standard
// states in a table rather than in bold — STD-016's field table is the case).
// A plate with no holder at all has no state to read and, by ENG-067, MUST
// NOT fail a build: it is reported as `unheld`, which is a defect in the
// guard or a rule nobody wrote (ENG-066).
//
// HOW TO USE
// ----------
//   import { Findings } from './lib/regime.mjs';
//   const out = new Findings('check-something');
//   out.add('HDR-004', 'status "closed" is not in the lifecycle', rel);
//   out.finish();   // prints, exits 1 only if an ENFORCED finding exists
//
// Build guards — those that verify the artefact rather than a rule (STD-005
// ENG-067 exception) — do not use this module; they exit as they always did.
//
// WHAT IT IS BLIND TO: it reads `status` and trusts it. A holder marked
// `active` that nobody ratified enforces exactly as one that was. Whether the
// signature happened is git history (PRE-001), not this file.

import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { ROOT } from './frontmatter.mjs';

const AXIS = ['canon', 'standards', 'protocols'];
const PLATE = /^[A-Z]{2,4}-\d{3}$/;

let _index = null;

/** Scan the axis once: plate -> holder, prefix -> holder, holder -> status. */
export function loadHolders(root = ROOT) {
  if (_index) return _index;
  const files = execFileSync('git', ['ls-files', ...AXIS.map((d) => `${d}/*.md`)], { cwd: root, encoding: 'utf8' })
    .split('\n').filter(Boolean);
  const byPlate = new Map();
  const byPrefix = new Map();
  const status = new Map();
  const title = new Map();
  for (const rel of files) {
    const text = readFileSync(`${root}/${rel}`, 'utf8');
    const fm = text.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) continue;
    const id = fm[1].match(/^id:\s*"?([A-Z]+-\d+)"?/m)?.[1];
    if (!id) continue;
    status.set(id, fm[1].match(/^status:\s*"?([\w-]+)"?/m)?.[1] ?? 'draft');
    title.set(id, fm[1].match(/^title:\s*"?([^"\n]+?)"?\s*$/m)?.[1] ?? id);
    const body = text.slice(fm[0].length);
    for (const m of body.matchAll(/^\*\*([A-Z]{2,4})-(\d{3})\b[^*\n]*\*\*/gm)) {
      const plate = `${m[1]}-${m[2]}`;
      if (!byPlate.has(plate)) byPlate.set(plate, id);
      if (!byPrefix.has(m[1])) byPrefix.set(m[1], new Set());
      byPrefix.get(m[1]).add(id);
    }
  }
  _index = { byPlate, byPrefix, status, title };
  return _index;
}

/** The document that holds `plate`, or null when nothing in the axis does. */
export function holderOf(plate, index = loadHolders()) {
  if (!PLATE.test(plate)) return null;
  if (index.byPlate.has(plate)) return index.byPlate.get(plate);
  const owners = index.byPrefix.get(plate.slice(0, plate.indexOf('-')));
  return owners && owners.size === 1 ? [...owners][0] : null;
}

/** ENG-067: does a finding under `plate` fail the build today?
 *  Returns { binds, holder, status } — `binds` is true only for an `active`
 *  holder. An unheld plate never binds. */
export function bindsFor(plate, index = loadHolders()) {
  const holder = holderOf(plate, index);
  if (!holder) return { binds: false, holder: null, status: 'unheld' };
  const status = index.status.get(holder) ?? 'draft';
  return { binds: status === 'active', holder, status };
}

/** Collects a guard's findings and applies the regime on finish(). */
export class Findings {
  constructor(guard, { index = loadHolders(), log = console } = {}) {
    this.guard = guard;
    this.index = index;
    this.log = log;
    this.items = [];
  }

  add(plate, what, where) {
    this.items.push({ plate, what, where });
    return this;
  }

  get enforced() { return this.items.filter((f) => bindsFor(f.plate, this.index).binds); }
  get reported() { return this.items.filter((f) => !bindsFor(f.plate, this.index).binds); }

  /** The holders this run touched, with their state — printed so a reader
   *  knows WHY a red finding was red and a grey one was grey. */
  holders() {
    const seen = new Map();
    for (const f of this.items) {
      const b = bindsFor(f.plate, this.index);
      const key = b.holder ?? `(unheld: ${f.plate})`;
      if (!seen.has(key)) seen.set(key, b);
    }
    return seen;
  }

  /** Print every finding, then the count; exit 1 only if something binds.
   *  `exit` is injectable so tests can observe the code without dying. */
  finish({ exit = (code) => process.exit(code), ok = 'all hold.' } = {}) {
    const { log } = this;
    for (const [key, b] of this.holders()) {
      if (!b.holder) log.log(`  ${key} — no holder in the axis: reporting only (ENG-066)`);
      else log.log(`  ${b.holder} (\`${b.status}\`) — ${b.binds ? 'ENFORCING' : 'reporting only'}`);
    }
    const hard = this.enforced;
    for (const f of this.items) {
      const binds = bindsFor(f.plate, this.index).binds;
      (binds ? log.error : log.log)(`  ${binds ? '✗' : '·'} ${f.plate}  ${f.what}\n      ${f.where}`);
    }
    if (!this.items.length) {
      log.log(`${this.guard}: ${ok}`);
      return exit(0);
    }
    log.log(`\n${this.guard}: ${this.items.length} finding(s), ${hard.length} enforced (ENG-067).`);
    if (hard.length) return exit(1);
    log.log('Not enforced: the holding standards await ratification.');
    return exit(0);
  }
}
