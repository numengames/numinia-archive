#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-020-git-is-the-archive — the guard of STD-020.
//
// Git is the archive: nothing is deleted while cited, a record still in
// force names no heir, and a commit says one thing on its subject line.
//
// GIT-048  nothing is deleted while cited. This corpus cites documents THREE
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
// GIT-045  the heir is a field: `superseded_by` on a record whose status is
//          not `withdrawn` is a document pointing past itself while claiming
//          to bind.
// GIT-026  a commit subject is one line (last 400 commits).
// GIT-025/030 are branch protection; GIT-027/028 telemetry and the design
// kit; GIT-046 url-lifecycle; GIT-029/047/049 manual.
//
// Scope: GIT-048 walks every tracked .md (web/ included — a page that cites
// a document is a citer); GIT-045 the bound corpus (not apparatus, not
// outward-facing, STD-009).
//
// Run from anywhere: node machine/guards/rules/std-020-git-is-the-archive.mjs

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { execute, isMain } from '../lib/guard.mjs';
import { loadRules, prefixToDir, stripFM, isApparatus } from '../../scripts/lib/frontmatter.mjs';
import { isPhotograph } from '../../scripts/lib/rings.mjs';

export const meta = { family: 'GIT', plates: ['GIT-026', 'GIT-045', 'GIT-048'] };

const RULES = loadRules();
const PREFIX_DIR = prefixToDir(RULES);   // includes retired prefixes (D-): they must keep resolving
// lore/** is the reserved corpus (the RPG manual, the codex matter): prose
// the archive HOLDS, not documents it governs — no series, no header ring.
// Opaque to the rules, like reports/evidence/. Its regime is REUSE.toml's.
const OUTWARD = /^(AGENTS|CLAUDE|CONTRIBUTING|CHANGELOG|SECURITY|TRADEMARKS|README)\.md$|^\.github\/|^web\/|^lore\//;

/* ---------- GIT-048: the resolver ---------- */

// Registers that live in prose, not as documents (CON, FLAG, SEC, ARC, G,
// MISSION) and the OLD blueprints slug scheme (BP-; BLU-NNN resolves).
const IGNORED_PREFIX = /^(CON|FLAG|SEC|ARC|G|MISSION|BP)-/;
// One range of decision records lives in the web repository, not this one.
// The rule is to cite them qualified (web:<id>); about twenty briefs predate
// that rule and cite them bare. They are not missing: they are elsewhere.
const WEB_ADR_RANGE = (n) => n >= 6 && n <= 22;
const isExample = (id) => id === 'MIS-999';
const ID_RE = new RegExp(`\\b(${Object.keys(PREFIX_DIR).join('|')})-(\\d{1,4}|\\d{4}-\\d{2}-\\d{2})\\b`, 'g');
const LINK_RE = /\[[^\]]*\]\(([^)\s#]+\.md)(?:#[^)]*)?\)/g;
// Kind 3: a bare filename in prose outside link syntax, resolved by basename —
// citations are casual and rarely carry the folder, so a wrong folder reads
// as green: that blindness is declared, not hidden.
const BARE_FILENAME_RE = /(?:^|[\s(`"'])((?:[\w-]+\/)*[\w][\w.-]*\.md)\b/g;
// A placeholder is a shape, not a document: MIS-NNNN-slug.md, RPT-YYYY-MM-DD.md
// and <title>.md never resolve, by design — they are the mould of a citation.
const PLACEHOLDER_RE = /(^|[^A-Za-z])(N{3,}|X{3,}|YYYY|MM|DD|PREFIX|SLUG|TITLE|vX\.Y\.Z)([^A-Za-z]|$)/;
const isPlaceholder = (cited) => PLACEHOLDER_RE.test(cited) || /[<>{}]/.test(cited) || /\bslug\b/.test(cited);

/** What the tree had: id -> last path that carried it, from deleted .md in
 *  git log. Exported for the test. */
export function retiredIds(root) {
  const retired = new Map();
  const log = execFileSync('git', ['log', '--diff-filter=D', '--name-only', '--format=', '--', '*.md'], { cwd: root, encoding: 'utf8' });
  for (const line of log.split('\n')) {
    const base = path.basename(line.trim(), '.md');
    const m = base.match(/^([A-Z]{2,5})-(\d{3,4})/);
    if (m && !retired.has(`${m[1]}-${m[2]}`)) retired.set(`${m[1]}-${m[2]}`, line.trim());
  }
  return retired;
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

function brokenReferences(corpus) {
  const { known, basenames } = index(corpus);
  const retired = retiredIds(corpus.root);
  const retiredBase = new Set([...retired.values()].map((p) => path.basename(p)));
  const out = [];
  const F = (from, kind, target) => out.push({ plate: 'GIT-048', what: `${kind} -> ${target}`, where: from });

  for (const rel of corpus.files) {
    const text = corpus.text(rel);
    if (isPhotograph(rel, corpus.fm(rel)?.status, RULES)) continue;   // CIT-053: a closed record is a photograph
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
      if (bare === ownBase || isPlaceholder(cited) || seenFile.has(bare)) continue;
      seenFile.add(bare);
      if (basenames.has(bare) || retiredBase.has(bare)) continue;
      F(rel, 'FILE', cited);
    }
  }
  return out;
}

/* ---------- GIT-045 / GIT-026 ---------- */

function heirs(corpus) {
  const out = [];
  for (const rel of corpus.files) {
    if (OUTWARD.test(rel)) continue;
    const fm = corpus.fm(rel) ?? {};
    if (isApparatus(rel, fm)) continue;
    const heir = String(fm.superseded_by ?? '').trim();
    if (heir && !['null', '~', '""', "''"].includes(heir) && fm.status !== 'withdrawn')
      out.push({ plate: 'GIT-045', what: `status ${fm.status} names an heir "${fm.superseded_by}" — only a withdrawn record has one`, where: rel });
  }
  return out;
}

function subjects(root) {
  const log = execFileSync('git', ['log', '-400', '--format=%s'], { cwd: root, encoding: 'utf8' });
  return log.split('\n').filter(Boolean)
    .filter((s) => s.includes('\n'))
    .map((s) => ({ plate: 'GIT-026', what: 'multi-line subject', where: s.slice(0, 60) }));
}

export function run(corpus) {
  return [...brokenReferences(corpus), ...heirs(corpus), ...subjects(corpus.root)];
}

if (isMain(import.meta)) await execute(import.meta, meta, run);
