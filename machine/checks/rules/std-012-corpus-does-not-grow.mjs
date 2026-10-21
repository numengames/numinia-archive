#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-012-corpus-does-not-grow — the guard of STD-012 for how a document
// leaves: nothing is deleted while cited, and a record still in force names
// no heir.
//
// DEF-009  nothing is deleted while cited. This corpus cites documents THREE
//          ways and only one was ever visible to a link checker:
//            1. Markdown links   [text](../path/doc.md)
//            2. Plain-text ids   "see MIS-085"
//            3. Bare filenames   "see credential-map.md" — the only way to
//               cite a document that declares itself exempt from the
//               identifier scheme, and so has no id to cite
//          A citation resolves against what the tree HAS (file names, `id:`,
//          `absorbs:`, `former_id:`) and what the tree HAD (git log of
//          deleted .md — a deleted document's identifier still resolves, to
//          the file that carried it). Closed records are photographs
//          (CIT-053) and are not walked as citers; they are still indexed,
//          so a living document citing them keeps resolving.
// DEF-008  the heir is a field: `superseded_by` on a record whose status is
//          not `withdrawn` is a document pointing past itself while claiming
//          to bind.
// DEF-004, DEF-010, DEF-011  the old name has left: an identifier named in
//          `absorbs:` or `former_id:` is no longer held by a document that
//          stays in the tree (see oldNamesStill below).
// Where a retired address leads is STD-028 URL-005, checked by
// check-url-shape and check-url-lifecycle.
//
// Scope: DEF-009 walks every tracked .md (web/ included — a page that cites
// a document is a citer); DEF-008 the bound corpus (not apparatus, not
// outward-facing, STD-009).
//
// Run from anywhere: node machine/checks/rules/std-012-corpus-does-not-grow.mjs

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { execute, isMain } from '../lib/guard.mjs';
import { loadRules, prefixToDir, stripFM, isApparatus } from '../../scripts/lib/frontmatter.mjs';
import { isPhotograph } from '../../scripts/lib/rings.mjs';

export const meta = { family: 'DEF', plates: ['DEF-004', 'DEF-008', 'DEF-009', 'DEF-010', 'DEF-011'] };

const RULES = loadRules();
const PREFIX_DIR = prefixToDir(RULES);   // includes retired prefixes (D-): they must keep resolving
// opportunities/ names its documents OPP-YYYY-NNN and PRP-YYYY-NNN, and its
// standards use the same letters for their rule codes (OPP-001, PRP-004). The
// resolver below reads `PFX-NNN` as a document; for these two it would read
// every rule code as a missing record. Their citations are resolved by the
// pipeline tool (PRP-009), not here — as before the series was governed.
for (const [p, dir] of Object.entries(PREFIX_DIR)) if (RULES.series[dir]?.naming === false) delete PREFIX_DIR[p];
// lore/** is the game (the RPG manual, the codex matter): prose the archive
// HOLDS, not documents it governs — no series, no header ring. Opaque to the
// rules, like reports/evidence/. Each file declares its own licence.
const OUTWARD = /^(AGENTS|CLAUDE|CODE_OF_CONDUCT|CONTRIBUTING|CHANGELOG|SECURITY|TRADEMARKS|README)\.md$|^\.github\/|^web\/|^lore\//;

/* ---------- DEF-009: the resolver ---------- */

// Registers that live in prose, not as documents (CON, FLAG, SEC, ARC, G,
// MISSION) and the OLD designs slug scheme (BP-; DES-NNN resolves).
const IGNORED_PREFIX = /^(CON|FLAG|SEC|ARC|G|MISSION|BP)-/;
// One range of decision records lives in the web repository, not this one.
// The rule is to cite them qualified (web:<id>); about twenty briefs predate
// that rule and cite them bare. They are not missing: they are elsewhere.
const WEB_ADR_RANGE = (n) => n >= 6 && n <= 22;
const isExample = (id) => id === 'MIS-999';
// A path qualified by a sibling repository lives elsewhere, not gone —
// like the web ADR range above.
const ELSEWHERE = /^(numinia-web|numengames-web|nwos-deploy|numinia-assets)\//;
// CHANGELOG.md is a photograph entry by entry: each is closed the day it is
// written and names what the tree had that day (CIT-053, a closed record's
// broken link may stand). Rewriting history to satisfy a resolver would
// falsify it.
const isChangelog = (rel) => rel === 'CHANGELOG.md';
const ID_RE = new RegExp(`\\b(${Object.keys(PREFIX_DIR).join('|')})-(\\d{1,4}|\\d{4}-\\d{2}-\\d{2})\\b`, 'g');
const LINK_RE = /\[[^\]]*\]\(([^)\s#]+\.md)(?:#[^)]*)?\)/g;
// Kind 3: a bare filename in prose outside link syntax, resolved by basename —
// citations are casual and rarely carry the folder, so a wrong folder reads
// as green: that blindness is declared, not hidden.
const BARE_FILENAME_RE = /(?:^|[\s(`"'])((?:[\w-]+\/)*[\w][\w.-]*\.md)\b/g;
// A placeholder is a shape, not a document: MIS-NNNN-slug.md, RPT-YYYY-MM-DD.md
// and <title>.md never resolve, by design — they are the template of a citation.
const PLACEHOLDER_RE = /(^|[^A-Za-z])(N{3,}|X{3,}|YYYY|MM|DD|PREFIX|SLUG|TITLE|vX\.Y\.Z)([^A-Za-z]|$)/;
const isPlaceholder = (cited) => PLACEHOLDER_RE.test(cited) || /[<>{}]/.test(cited) || /\bslug\b/.test(cited);

/** What the tree had: id -> last path that carried it, from deleted .md in
 *  git log. Exported for the test. */
/** A shallow clone (`git clone --depth 1`, what most agents and CI caches make)
 *  has no log to read, so "this name was deleted once" cannot be told from
 *  "this name never existed". Judging anyway reports dozens of false findings
 *  on a clean tree, so the history-dependent answers become "cannot tell":
 *  every retired name resolves (run-checks.mjs says so in one line). Exported for the tests,
 *  which skip when they need the real log. */
export function isShallow(root) {
  try {
    return execFileSync('git', ['rev-parse', '--is-shallow-repository'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() === 'true';
  } catch { return false; }   // no repository at all (a test's scratch corpus): nothing to be shallow
}
const CANNOT_TELL = { has: () => true, size: 0 };
const cannotTell = (root) => isShallow(root);   // run-checks.mjs prints the one-line note

export function retiredIds(root) {
  if (cannotTell(root)) return CANNOT_TELL;
  const retired = new Map();
  // One letter is a prefix too: the old debt, procedure and standard series
  // used one (D-, P-, S-), and their files are in the log.
  for (const line of deletedMd(root)) {
    const base = path.basename(line, '.md');
    const m = base.match(/^([A-Z]{1,5})-(\d{3,4})/);
    if (m && !retired.has(`${m[1]}-${m[2]}`)) retired.set(`${m[1]}-${m[2]}`, line);
  }
  return retired;
}

/** Every .md path the tree once had and left, by deletion or rename. */
function deletedMd(root) {
  // A rename leaves the old path behind as surely as a deletion: `git mv
  // P-010-how-to-archive.md PRO-010-…` retires the name P-010. So both count,
  // deletions (D) and the old side of renames (R).
  const log = execFileSync('git', ['log', '--diff-filter=DR', '--name-status', '--format=', '--', '*.md'], { cwd: root, encoding: 'utf8' });
  const out = [];
  for (const line of log.split('\n')) {
    const cols = line.trim().split('\t');
    if (cols.length >= 2 && /^[DR]/.test(cols[0]) && cols[1].endsWith('.md')) out.push(cols[1]);
  }
  return out;
}

/** What the tree had, by file name: a bare filename resolves if any deleted
 *  .md carried it (MEMORY.md, web/DESIGN.md), not only an identified one.
 *  Exported for the test. */
export function retiredBasenames(root) {
  if (cannotTell(root)) return CANNOT_TELL;
  return new Set(deletedMd(root).map((p) => path.basename(p)));
}

/** What the tree has: every identifier and basename that resolves. */
function index(corpus) {
  const known = new Set();
  const basenames = new Set();
  for (const rel of corpus.files) {
    const base = path.basename(rel, '.md');
    const m = base.match(/^([A-Z]+)-(\d{1,4}|\d{4}-\d{2}-\d{2})/);
    if (m) known.add(`${m[1]}-${m[2]}`);
    basenames.add(path.basename(rel));
    const fm = corpus.fm(rel);
    if (!fm) continue;
    const decl = typeof fm.id === 'string' ? /^([A-Z]+-[\w-]+)/.exec(fm.id) : null;
    if (decl) known.add(decl[1]);
    // An absorbed identifier resolves to the record that swallowed it: the
    // document is gone, the obligation it carried is not.
    if (Array.isArray(fm.absorbs)) for (const id of fm.absorbs) if (id) known.add(id);
    // A renumbered document declares its old id in former_id, so the old
    // identifier resolves here rather than nowhere.
    const former = typeof fm.former_id === 'string' ? /^([A-Z]+-[\w-]+)/.exec(fm.former_id) : null;
    if (former) known.add(former[1]);
  }
  return { known, basenames };
}

/** Does an identifier resolve — to a document the tree has, one it absorbed
 *  or renamed, or one it once had and deleted (git is the archive)? The same
 *  answer DEF-009 gives a citation in the body; the header's relations
 *  (HDR-016) ask it too. Exported for that guard and the test. */
export function makeResolver(corpus) {
  const { known } = index(corpus);
  // A corpus with no repository behind it (a test's) has no history to read.
  const retired = existsSync(path.join(corpus.root, '.git')) ? retiredIds(corpus.root) : new Map();
  return (id) => known.has(id) || retired.has(id)
    || (/^ADR-\d+$/.test(id) && WEB_ADR_RANGE(Number(id.slice(4))));
}

function brokenReferences(corpus) {
  const { known, basenames } = index(corpus);
  const retired = retiredIds(corpus.root);
  const retiredBase = retiredBasenames(corpus.root);
  const out = [];
  const F = (from, kind, target) => out.push({ plate: 'DEF-009', what: `${kind} -> ${target}`, where: from });

  for (const rel of corpus.files) {
    const text = corpus.text(rel);
    if (isPhotograph(rel, corpus.fm(rel)?.status, RULES) || isChangelog(rel)) continue;   // CIT-053: a closed record is a photograph
    const abs = path.join(corpus.root, rel);
    const body = stripFM(text);
    const ownBase = path.basename(rel);

    const linkRanges = [];
    for (const m of body.matchAll(LINK_RE)) {
      linkRanges.push([m.index, m.index + m[0].length]);
      const target = m[1];
      if (/^(https?:|mailto:)/.test(target)) continue;
      if (!existsSync(path.normalize(path.join(path.dirname(abs), target)))) F(rel, 'LINK', target);
    }
    const insideLink = (i) => linkRanges.some(([s, e]) => i >= s && i < e);

    const seen = new Set();
    for (const m of body.matchAll(ID_RE)) {
      const id = `${m[1]}-${m[2]}`;
      if (seen.has(id)) continue;
      seen.add(id);
      if (IGNORED_PREFIX.test(id) || isExample(id)) continue;
      if (id === path.basename(rel, '.md').slice(0, id.length)) continue;   // self
      if (known.has(id) || retired.has(id)) continue;
      if (m[1] === 'ADR' && WEB_ADR_RANGE(Number(m[2]))) continue;          // elsewhere, not gone
      F(rel, 'ID', id);
    }

    const seenFile = new Set();
    for (const m of body.matchAll(BARE_FILENAME_RE)) {
      if (insideLink(m.index)) continue;
      const cited = m[1];
      const bare = path.basename(cited);
      if (bare === ownBase || isPlaceholder(cited) || ELSEWHERE.test(cited) || seenFile.has(bare)) continue;
      seenFile.add(bare);
      if (basenames.has(bare) || retiredBase.has(bare)) continue;
      F(rel, 'FILE', cited);
    }
  }
  return out;
}

/* ---------- DEF-008 ---------- */

function heirs(corpus) {
  const out = [];
  for (const rel of corpus.files) {
    if (OUTWARD.test(rel)) continue;
    const fm = corpus.fm(rel) ?? {};
    if (isApparatus(rel, fm)) continue;
    const heir = String(fm.superseded_by ?? '').trim();
    if (heir && !['null', '~', '""', "''"].includes(heir) && fm.status !== 'withdrawn')
      out.push({ plate: 'DEF-008', what: `status ${fm.status} names an heir "${fm.superseded_by}" — only a withdrawn record has one`, where: rel });
  }
  return out;
}

/* ---------- DEF-004, DEF-010, DEF-011: the old name has left ---------- */

// A document that names an old identifier as its own — `former_id:` (it
// moved series under a new name) or `absorbs:` (it carried the other in) —
// says the old document has left. If a file in the tree still holds that
// identifier, it has not:
//   DEF-004  a report's `absorbs:` names a record still in the tree: the
//            record was carried up but not deleted in the same change;
//   DEF-011  any other absorber names a document still in the tree that is
//            not withdrawn naming it as its replacement;
//   DEF-010  a `former_id:` is still held by a document that is not withdrawn
//            naming the new one as its replacement.
// An absorbed identifier that once left the tree (git log) and was later
// given to a new document is a reuse — STD-018's question, not this one —
// so it is not a stay. Exported for the test.
export function oldNamesStill(corpus, retired = existsSync(path.join(corpus.root, '.git')) ? retiredIds(corpus.root) : new Map()) {
  const holders = new Map();
  for (const rel of corpus.files) {
    const id = corpus.fm(rel)?.id;
    if (typeof id === 'string' && id) (holders.get(id) ?? holders.set(id, []).get(id)).push(rel);
  }
  const out = [];
  const namesHeir = (rel, heir) => {
    const fm = corpus.fm(rel) ?? {};
    return fm.status === 'withdrawn' && String(fm.superseded_by ?? '').trim() === heir;
  };
  for (const rel of corpus.files) {
    const fm = corpus.fm(rel) ?? {};
    if (isApparatus(rel, fm)) continue;
    const self = typeof fm.id === 'string' ? fm.id : '';
    const isReport = rel.startsWith('reports/');
    if (Array.isArray(fm.absorbs)) for (const old of fm.absorbs) {
      if (!old || old === self || retired.has(old)) continue;
      for (const held of holders.get(old) ?? []) {
        if (held === rel) continue;
        if (isReport) out.push({ plate: 'DEF-004', what: `absorbs ${old}, which is still in the tree — a record carried up is deleted in the same change`, where: rel });
        else if (!namesHeir(held, self)) out.push({ plate: 'DEF-011', what: `absorbs ${old}, but ${held} is still in the tree and not withdrawn naming ${self || rel}`, where: rel });
      }
    }
    const former = typeof fm.former_id === 'string' ? fm.former_id.trim() : '';
    if (former && former !== self) for (const held of holders.get(former) ?? []) {
      if (held !== rel && !namesHeir(held, self))
        out.push({ plate: 'DEF-010', what: `former_id ${former} is still held by ${held}, which is not withdrawn naming ${self || rel}`, where: rel });
    }
  }
  return out;
}

export function run(corpus) {
  return [...brokenReferences(corpus), ...heirs(corpus), ...oldNamesStill(corpus)];
}

if (isMain(import.meta)) await execute(import.meta, meta, run);
