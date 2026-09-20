#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-006-plain-text — the guard of STD-006.
//
// Plain text is sovereign: a corpus document is Markdown under a series
// folder with a name that says what it is (TXT-001), its header is plain
// text between correct delimiters that any parser reads (TXT-002), and no
// content lives only outside the tree (TXT-003, partial: prose in web
// components). TXT-004..007 are judgements about meaning and stay manual.
//
// TXT-001  N-01 a root document is UPPERCASE.md
//          N-02 a living document's name carries no version or date
//          N-05 the slug is lowercase kebab-case
//          (N-04, the identifier the name carries, is IDN-011 → std-018)
// TXT-002  the frontmatter fence closes on its own line. One commit once
//          glued seventy-nine of them to the line above and five guards
//          stayed green; a strict parser reads NO header in such a file
//          the header is structurally sound YAML — an indented line under a
//          closed key is what deleting a key with children leaves behind, and
//          four guards were green over a corpus the web could not build.
//          Checked without js-yaml: CI ran the guards before npm install once
//          and the lesson stuck.
// TXT-003  characters of prose living in .astro/.tsx files that read no .md.
//          A file that reads the archive (getCollection, import.meta.glob…)
//          is not counted however much it renders; the measure is text that
//          exists ONLY in code. One finding per file, sized — a ratchet needs
//          a number that cannot go up by accident, not precision.
//
// Run from anywhere: node machine/guards/rules/std-006-plain-text.mjs

import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { execute, isMain } from '../lib/guard.mjs';
import { classify, ROOT_UPPERCASE_RE, KEBAB_SLUG_RE, VERSION_SUFFIX_RE } from '../lib/naming.mjs';

export const meta = { family: 'TXT', plates: ['TXT-001', 'TXT-002', 'TXT-003'] };

/* ---------- TXT-001: the name ---------- */

function naming(rel, fm) {
  const c = classify(rel, fm);
  const F = (what) => ({ plate: 'TXT-001', what, where: rel });
  if (c.kind === 'root') {
    return ROOT_UPPERCASE_RE.test(c.base) ? [] : [F(`N-01 root document "${c.base}" is not UPPERCASE.md`)];
  }
  if (c.kind === 'legacy') {
    if (!c.declaredArchive && c.legacyDated)
      return [F('N-02 filename carries a date prefix; a dated name is a legacy shape and says nothing about the state of the document')];
    return [];
  }
  if (c.kind !== 'series') return [];
  const out = [];
  if (VERSION_SUFFIX_RE.test(c.base))
    out.push(F('N-02 filename carries a version suffix — version: lives in the header, where it can be read; a name has to be renamed'));
  if (c.slug !== null && !KEBAB_SLUG_RE.test(c.slug))
    out.push(F(`N-05 slug "${c.slug}" is not lowercase kebab-case`));
  return out;
}

/* ---------- TXT-002: the fence and the YAML ---------- */

function fence(rel, txt) {
  if (!txt.startsWith('---')) return [];
  // The FIRST \n--- after the opening is the closing fence. A `---` further
  // down the body (a horizontal rule) says nothing about the header.
  const close = /\n---/.exec(txt.slice(3));
  if (!close) return [{ plate: 'TXT-002', what: 'opens with --- but never closes it', where: rel }];
  const after = txt.slice(3 + close.index + 4);
  if (/^[ \t]*(\r?\n|$)/.test(after)) return [];
  return [{ plate: 'TXT-002', what: `closing --- glued to ${JSON.stringify(after[0])}`, where: rel }];
}

function yamlShape(rel, txt) {
  const m = txt.match(/^---\s*\n([\s\S]*?)\n---[ \t]*(\r?\n|$)/);
  if (!m) return [];                       // no header: HDR-000's business
  const lines = m[1].split('\n');
  let inBlockScalar = false, blockIndent = 0;
  // The last ROOT key: open (no inline value, may hold children) or closed?
  // Deleting `fondos:` leaves `  - id: canon` indented under the previous
  // root key `extraction_note: "..."`, which is closed and admits no children.
  let rootOpen = false, sawAnyRootKey = false;
  const bad = (what) => [{ plate: 'TXT-002', what, where: rel }];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const indent = line.match(/^[ \t]*/)[0].length;
    if (inBlockScalar) { if (indent > blockIndent) continue; inBlockScalar = false; }
    if (/^[ \t]*#/.test(line)) continue;
    const isKey = /^[ \t]*[A-Za-z_][\w.-]*:/.test(line);
    const isItem = /^[ \t]*-/.test(line);
    if (indent === 0) {
      if (isKey) {
        sawAnyRootKey = true;
        const rest = line.replace(/^[A-Za-z_][\w.-]*:/, '');
        if (/^\s*[|>][-+]?\s*$/.test(rest)) { inBlockScalar = true; blockIndent = 0; rootOpen = false; }
        else rootOpen = /^\s*(#.*)?$/.test(rest);
      } else if (isItem) {
        if (!rootOpen) return bad(`line ${i + 1}: list item under no open key — "${line.trim().slice(0, 46)}"`);
      } else {
        return bad(`line ${i + 1}: not a key, not a list item — "${line.slice(0, 46)}"`);
      }
      continue;
    }
    if (!rootOpen) {
      return bad(sawAnyRootKey
        ? `line ${i + 1}: indented under a closed key — "${line.trim().slice(0, 46)}"`
        : `line ${i + 1}: indented line with no parent key — "${line.trim().slice(0, 46)}"`);
    }
    if (isKey && /:\s*[|>][-+]?\s*$/.test(line)) { inBlockScalar = true; blockIndent = indent; }
  }
  return [];
}

/* ---------- TXT-003: prose that lives only in code ---------- */

const SCAN_ROOTS = ['web/src/pages', 'web/src/views', 'web/src/components'];
const EXTS = new Set(['.astro', '.tsx']);
// A file containing any of these reads content from the archive at build
// time, so its prose is not "only here".
const READS_ARCHIVE = /getCollection|getEntry|import\.meta\.glob|astro:content/;

function walk(dir) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return []; }
  const out = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else if (EXTS.has(path.extname(e.name))) out.push(full);
  }
  return out;
}

/** Prose characters in one source file: quoted literals (the data-array
 *  pattern) and text nodes between tags, both ≥ 60 chars — roughly one
 *  sentence — and filtered of paths, URLs and Tailwind class lists. */
export function proseChars(src) {
  const frags = [];
  for (const m of src.matchAll(/["'`]([^"'`<>{}]{60,})["'`]/g)) frags.push(m[1]);
  for (const m of src.matchAll(/>\s*([\p{L}][^<>{}]{60,}?)\s*</gu)) frags.push(m[1]);
  const isClassList = (f) => !/[.!?,;:]/.test(f) && /^[a-z0-9:\-[\]/.%\s]+$/.test(f);
  return frags
    .filter((f) => f.includes(' ') && !f.startsWith('/') && !f.startsWith('http') && !isClassList(f))
    .reduce((n, f) => n + f.length, 0);
}

function proseInCode(root) {
  const out = [];
  for (const scan of SCAN_ROOTS) {
    for (const file of walk(path.join(root, scan))) {
      const src = readFileSync(file, 'utf8');
      if (READS_ARCHIVE.test(src)) continue;
      const chars = proseChars(src);
      if (chars > 0) out.push({ plate: 'TXT-003', what: `${chars} characters of prose live only in this component`, where: path.relative(root, file).replaceAll('\\', '/') });
    }
  }
  return out.sort((a, b) => a.where.localeCompare(b.where));
}

export function run(corpus) {
  const findings = [];
  for (const rel of corpus.files) {
    if (rel.startsWith('web/')) continue;
    const txt = corpus.text(rel);
    findings.push(...fence(rel, txt), ...yamlShape(rel, txt), ...naming(rel, corpus.fm(rel) ?? {}));
  }
  findings.push(...proseInCode(corpus.root));
  return findings;
}

if (isMain(import.meta)) await execute(import.meta, meta, run);
