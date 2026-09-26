#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// template guard — MIS-145 v2.
//
// WHY THIS EXISTS
// ---------------
// Until now nothing checked the templates. Every other document in the archive
// is read by std-004-the-header, machine/guards/lib/naming.mjs, std-012-corpus-does-not-grow and the rest; the
// moulds those documents are copied FROM were exempt from all of them, because
// `^machine/templates/` is apparatus and apparatus is skipped. The result was measured
// on 2026-09-04, before this guard existed:
//
//   · 12 of the 14 files carried no `.md` extension, so every markdown tool in
//     the repository — the reference resolver included — was blind to them.
//   · STD-TEMPLATE.md wrote `status: draft  # draft|active|...` on one line,
//     and the telemetry instrument duly registered a status bucket called
//     "draft          # draft|active|superseded|withdrawn". The template
//     taught the exact defect (D-009) that its own sibling warns about.
//   · Six templates declared a `license:` contradicting REUSE.toml for the
//     path they live in — invisible, because the licence guard (std-010-licensing) reads
//     the file's OWN path, and machine/templates/** is CC0-1.0 whatever the target is.
//
// A template is not a document of its series. It is the mould, and its
// frontmatter is a WORKED EXAMPLE of that series' contract: it must be right
// for the DESTINATION, not for machine/templates/. That is the one thing the general
// guards structurally cannot check, and it is exactly what this one does.
//
// WHAT IT CHECKS
// --------------
//   T-01  every machine/templates/*.md parses as frontmatter + body
//   T-02  the filename is <PREFIX>-TEMPLATE.md for a registered prefix
//         (plus the sanctioned -EXAMPLE / -CHANGES companions, and README.md)
//   T-03  no inline `# comment` after a scalar value — the D-009 shape
//   T-04  `license:` names a licence this repository ships a text for
//         (LICENSES/). A folder has no licence (Oracle, 2026-09-24), so
//         the mould cannot be held to one: the author of each document
//         picks its licence and declares it in the file.
//   T-05  `type` matches what STD-004 §5 maps to the destination series
//   T-06  `status` is in the destination series' lifecycle
//   T-07  every frontmatter key is in ring 1, 2 or the destination's ring 3
//   T-08  version is bare SemVer and opens at 0.1.0 (STD-019 VER-021)
//   T-09  the context card is present, with Summary, Epistemic and Pragmatic
//   T-10  every registered series has a template
//   T-11  every standard in standards/ has the template's shape and no log of itself
//
// Run from anywhere: node machine/scripts/check-templates.mjs

import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { ROOT, parseFM, rawFM, stripFM, loadRules, seriesDirs } from './lib/frontmatter.mjs';
import { RING1, RING2, RING3, RING3_ALL, lifecycleFor, isTerminalStatus } from './lib/rings.mjs';
import { declareBlindSpots } from './lib/blindness.mjs';
import { Findings } from './lib/regime.mjs';
declareBlindSpots('check-templates');

const RULES = loadRules();

/* Which series each template scaffolds. The map is explicit rather than
   derived from the prefix, because two of these files are companions of a
   template (a filled example, a design record) and not templates themselves. */
const DEST = {};
for (const dir of seriesDirs(RULES)) {
  const pfx = RULES.series[dir].prefix[0];
  if (pfx) DEST[`${pfx}-TEMPLATE.md`] = dir;
}
const COMPANIONS = { 'MIS-TEMPLATE-EXAMPLE.md': 'missions', 'MIS-TEMPLATE-CHANGES.md': 'missions' };
const EXEMPT = new Set(['README.md']);

/* Ring 1, ring 2 and the per-series registry come from lib/rings.mjs — the
   same registry std-004-the-header enforces on the documents. Lifecycles come
   from rules.json, series before type (STD-004 §6). */

const SEMVER = /^\d+\.\d+\.\d+$/;

// --- the licences this repository can grant --------------------------------

/* Every licence with a text in LICENSES/. A mould that names anything else
   teaches a declaration `reuse lint` rejects. */
const SHIPPED = new Set(readdirSync(path.join(ROOT, 'LICENSES'))
  .filter((f) => f.endsWith('.txt')).map((f) => f.slice(0, -4)));

// --- the check -------------------------------------------------------------
/* ENG-067: each T-code answers to one plate, and the finding binds by the
   state of the standard that holds it. T-01/T-07 are the header contract
   (HDR-000/HDR-030, STD-004); T-02 is the file name (TXT-001, STD-006); T-03
   is a well-formed header (TXT-002, STD-006); T-04 the licence regime
   (LIC-008, STD-010); T-05/T-06 the closed vocabularies (HDR-003/HDR-004,
   STD-004); T-08 the opening version (VER-021, STD-019); T-09/T-10/T-11 the
   shape of a document and its mould (DOC-009/DOC-010, STD-007). */
const PLATE = {
  'T-01': 'HDR-000', 'T-02': 'TXT-001', 'T-03': 'TXT-002', 'T-04': 'LIC-008',
  'T-05': 'HDR-003', 'T-06': 'HDR-004', 'T-07': 'HDR-030', 'T-08': 'VER-021',
  'T-09': 'DOC-009', 'T-10': 'DOC-009', 'T-11': 'DOC-010',
};
const out = new Findings('template guard');
let failures = 0;
const F = (code, file, msg) => { failures += 1; out.add(PLATE[code], `${code} ${msg}`, file); };

const files = execFileSync('git', ['ls-files', 'machine/templates/*'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n').filter(Boolean);

let checked = 0;
for (const rel of files) {
  const base = path.basename(rel);

  // T-02: shape of the name. Everything in machine/templates/ is a .md file.
  if (!rel.endsWith('.md')) {
    F('T-02', rel, 'is not a .md file — every markdown tool in the repo is blind to it');
    continue;
  }
  if (EXEMPT.has(base)) continue;

  const dir = DEST[base] ?? COMPANIONS[base];
  if (!dir) {
    F('T-02', rel, `does not name a registered series: expected <PREFIX>-TEMPLATE.md for one of ${Object.keys(DEST).length} prefixes`);
    continue;
  }
  checked++;

  const text = readFileSync(path.join(ROOT, rel), 'utf8');
  const fm = parseFM(text);
  if (!fm) { F('T-01', rel, 'no frontmatter — the mould teaches a document with no header'); continue; }

  // T-03: the D-009 shape. An inline `#` after a value lands INSIDE the value
  // in the readers this corpus actually uses.
  for (const line of rawFM(text).split('\n')) {
    const m = /^([A-Za-z_][\w.-]*):\s*(\S.*?)\s+#\s/.exec(line);
    if (m) F('T-03', rel, `inline comment after "${m[1]}" — put it on its own line (this is how D-009's corrupt value was made)`);
  }

  // The companions are records, not moulds: their frontmatter documents a real
  // mission, so the destination checks below do not apply to them.
  if (COMPANIONS[base]) continue;

  // T-04: a licence the repository can actually grant.
  if (!SHIPPED.has(fm.license))
    F('T-04', rel, `license "${fm.license}" has no text in LICENSES/ — a document copied from this mould declares a licence the repository does not ship`);

  // T-05: type ↔ series, STD-004 §5.
  const allowedTypes = Object.entries(RULES.types.series)
    .filter(([, d]) => d === dir).map(([t]) => t);
  if (fm.type && allowedTypes.length && !allowedTypes.includes(fm.type))
    F('T-05', rel, `type "${fm.type}" does not belong to ${dir}/ (expected ${allowedTypes.join(' | ')})`);

  // T-06: status ↔ lifecycle, STD-004 §6 (series beats type).
  const life = lifecycleFor(dir, fm.type, RULES);
  if (fm.status && !life.includes(fm.status))
    F('T-06', rel, `status "${fm.status}" is not in ${dir}/'s lifecycle [${life.join(' ')}]`);

  // T-07: no field the destination does not register (STD-004 §7, HDR-030's rule
  // applied one step earlier — at the mould instead of at its copies).
  const ring3 = RING3[dir] ?? [];
  for (const k of Object.keys(fm)) {
    if (RING1.includes(k) || RING2.includes(k) || RING3_ALL.includes(k)) continue;
    if (ring3.includes(k)) continue;
    if (k === 'subtype') continue;                 // std-004-the-header allows it corpus-wide
    F('T-07', rel, `field "${k}" is registered for no ring of ${dir}/ — a document copied from this mould fails HDR-030`);
  }

  // T-01 ring 1 presence: a mould that omits a mandatory field teaches its absence.
  for (const k of RING1)
    if (!(k in fm) || fm[k] === '')
      F('T-01', rel, `missing mandatory field "${k}" — the mould must carry the whole ring 1`);

  // T-08: SemVer, opening at 0.1.0 (STD-019 VER-021: every artifact starts there).
  if (fm.version && !SEMVER.test(fm.version))
    F('T-08', rel, `version "${fm.version}" is not bare SemVer`);
  else if (fm.version && fm.version !== '0.1.0' && dir !== 'reports')
    F('T-08', rel, `version "${fm.version}" — a new artifact opens at 0.1.0 (VER-021), and the mould is what teaches that`);

  // T-09: the context card, STD-004 §8.1.
  const body = stripFM(text);
  for (const part of ['Summary', 'Epistemic', 'Pragmatic'])
    if (!new RegExp(`^>\\s\\*\\*${part}:\\*\\*`, 'm').test(body))
      F('T-09', rel, `context card has no **${part}:** line`);
}

// T-10: coverage. A registered series with no mould is the gap this library exists to close.
for (const dir of seriesDirs(RULES)) {
  const pfx = RULES.series[dir].prefix[0];
  if (!pfx) continue;                       // agents/ is folder-named: its scaffold is agents/_template/
  if (!files.includes(`machine/templates/${pfx}-TEMPLATE.md`))
    F('T-10', `machine/templates/${pfx}-TEMPLATE.md`, `absent — ${dir}/ is a registered series with no mould to copy from`);
}

/* T-11: the standards took the shape of their template. Two shapes are
   legal while the series is cut over (ADR-043):
     OLD  §1..N numbered; §1 "Purpose and scope"; the last three are
          Conformance, "What this standard does NOT do", References.
     NEW  unnumbered ## Rules · ## Check · ## Why · ## References, in that
          order (STD-007 DOC-004/005/007). A register (subtype: register)
          is a Summary and a table, and needs none of these headings.
   A file that is in neither shape fails. And no log of itself in either:
   no "Version history", "Changelog" or "Amendment" heading, because git is
   the archive (ADR-041). A withdrawn standard is a stub and exempt.
   When the last standard is cut, delete the OLD branch. */
/* Standards whose shape is known debt and scheduled for a rewrite. Emptied
   2026-09-09 when STD-008, the last entry, took the ADR-043 shape. Kept as a
   hook: add a path here only with the PR that schedules its rewrite. */
const T11_BASELINE = new Set();
const LOG = /^##+\s.*\b(version history|changelog|change log|amendment)\b/i;
const NEW_SHAPE = ['Rules', 'Check', 'Why', 'References'];
const standards = execFileSync('git', ['ls-files', 'standards/STD-*.md'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n').filter(Boolean);
for (const rel of standards) {
  const text = readFileSync(path.join(ROOT, rel), 'utf8');
  const fm = parseFM(text);
  if (isTerminalStatus(fm?.status, RULES)) continue;
  if (T11_BASELINE.has(rel)) continue;   // shape debt named, not hidden — see the set above
  const body = stripFM(text);
  const h2 = body.split('\n').filter((l) => /^## /.test(l));
  for (const h of body.split('\n').filter((l) => /^##+ /.test(l)))
    if (LOG.test(h)) F('T-11', rel, `carries a log of itself: "${h.replace(/^#+ /, '')}" — git log --follow is the history (ADR-041)`);
  if (fm?.subtype === 'register') {
    if (!/^>\s*\*\*Summary:\*\*/m.test(body)) F('T-11', rel, 'register has no **Summary:** line');
    if (!/^\|/m.test(body)) F('T-11', rel, 'register has no table — a register is a Summary and a table (DOC-009)');
    continue;
  }
  const plain = h2.map((h) => h.slice(3).trim());
  const numbered = h2.filter((h) => /^## \d+\. /.test(h));
  // NEW shape: the four headings, unnumbered, in order; nothing else at ## level.
  if (numbered.length === 0) {
    const idx = NEW_SHAPE.map((n) => plain.indexOf(n));
    const missing = NEW_SHAPE.filter((_, i) => idx[i] < 0);
    if (missing.length) F('T-11', rel, `new shape is missing ## ${missing.join(', ## ')} (STD-007)`);
    else if (idx.some((v, i) => i > 0 && v < idx[i - 1])) F('T-11', rel, `sections are ${plain.join(' · ')} — the shape is Rules · Check · Why · References, in that order`);
    const extra = plain.filter((p) => !NEW_SHAPE.includes(p));
    if (extra.length) F('T-11', rel, `unexpected section(s) at ## level: ${extra.join(' · ')} — a norm has four`);
    continue;
  }
  // OLD shape, until the file is cut.
  const titles = numbered.map((h) => h.replace(/^## \d+\. /, '').trim());
  const nums = numbered.map((h) => Number(/^## (\d+)\./.exec(h)[1]));
  if (h2.length !== numbered.length)
    F('T-11', rel, `${h2.length - numbered.length} unnumbered section(s): ${h2.filter((h) => !/^## \d+\. /.test(h)).map((h) => h.slice(3)).join(' · ')}`);
  if (nums.some((n, i) => n !== i + 1))
    F('T-11', rel, `sections are numbered ${nums.join(',')} — the template numbers them 1..N without gaps`);
  if (titles.length < 4) { F('T-11', rel, `has ${titles.length} numbered section(s); the old shape needs Purpose, the norm, Conformance, NOT do, References`); continue; }
  if (!/^Purpose and scope$/.test(titles[0])) F('T-11', rel, `§1 is "${titles[0]}" — the old shape opens with "Purpose and scope"`);
  const [conf, not, refs] = titles.slice(-3);
  if (!/^Conformance/.test(conf)) F('T-11', rel, `third-from-last section is "${conf}" — the old shape puts Conformance there`);
  if (!/^What this (standard|register) does NOT do/i.test(not)) F('T-11', rel, `second-from-last section is "${not}" — the old shape puts "What this standard does NOT do" there`);
  if (!/^References$/.test(refs)) F('T-11', rel, `last section is "${refs}" — the shape ends with References`);
}

if (failures) {
  console.error(`template guard: ${failures} finding(s) across ${checked} template(s) — a template is a worked example of its DESTINATION series' contract. Fix the mould, not the documents copied from it.\n`);
  out.finish();
}
console.log(`template guard: ${checked} template(s) · every registered series covered · destination contracts hold`);
