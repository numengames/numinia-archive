// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT

/**
 * machine/scripts/lib/reuse.mjs — the one reader of licence declarations.
 *
 * A licence belongs to the FILE (Oracle, 2026-09-24). A text file declares it
 * in its own SPDX comment — declaredIn() reads that. REUSE.toml holds only the
 * files that cannot carry a comment, one exact path each — regimeOf() reads
 * that, the way the reuse tool does (the last matching block wins).
 * licenceOfFile() is the two in order, and is what every reader should ask.
 *
 * Only the two keys the guards need are read (path, SPDX-License-Identifier);
 * this is not a TOML parser.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './frontmatter.mjs';

/** A glob as REUSE uses it: `**` crosses directories, `*` does not. */
export function globToRegExp(glob) {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '\u0000').replace(/\*/g, '[^/]*').replace(/\u0000/g, '.*');
  return new RegExp(`^${escaped}$`);
}

/** [{ paths: string[], license: string|null }] in file order. */
export function parseAnnotations(toml) {
  const blocks = []; let cur = null;
  const lines = toml.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].replace(/(^|\s)#.*$/, '').trim();
    if (!line) continue;
    if (line === '[[annotations]]') { cur = { paths: [], license: null }; blocks.push(cur); continue; }
    if (!cur) continue;
    if (/^path\s*=/.test(line)) {
      let rhs = line.slice(line.indexOf('=') + 1).trim();
      while (rhs.startsWith('[') && !rhs.endsWith(']') && i + 1 < lines.length) rhs += lines[++i].replace(/(^|\s)#.*$/, '').trim();
      cur.paths = [...rhs.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    } else if (/^SPDX-License-Identifier\s*=/.test(line)) {
      cur.license = /"([^"]+)"/.exec(line)?.[1] ?? null;
    }
  }
  return blocks;
}

let _annotations = null;
/** The repository's REUSE.toml, parsed once. [] when the file is absent. */
export function loadAnnotations() {
  if (_annotations) return _annotations;
  const f = path.join(ROOT, 'REUSE.toml');
  _annotations = existsSync(f) ? parseAnnotations(readFileSync(f, 'utf8')) : [];
  return _annotations;
}

/** Licence governing `rel` (repo-relative path), or null if no block covers it. */
export function regimeOf(rel, annotations = loadAnnotations()) {
  let regime = null;
  for (const block of annotations) {
    if (block.paths.some((p) => globToRegExp(p).test(rel))) regime = block.license;
  }
  return regime;
}

/**
 * The licence a file declares in its OWN text: the `SPDX-License-Identifier`
 * of the SPDX comment in its first lines (`<!-- … -->`, `//`, `#`). null when
 * the file carries none — then only REUSE.toml can answer, by its exact path.
 *
 * The first tag wins, as in the reuse tool. A tag inside a fenced code block is
 * not a declaration: documents that TEACH the SPDX syntax quote it in fences.
 */
export function declaredIn(text) {
  const head = String(text).replace(/```[\s\S]*?```/g, '');
  // REUSE-IgnoreStart
  const m = /SPDX-License-Identifier:\s*([^\s`|>*]+)/.exec(head);
  // REUSE-IgnoreEnd
  return m ? m[1].trim() : null;
}

/**
 * The licence governing ONE file, per file and never per folder: what the
 * file declares in itself, else what REUSE.toml says about that exact path.
 * `root` is the repository root (the web build passes its own anchor).
 */
export function licenceOfFile(rel, { root = ROOT, annotations = loadAnnotations() } = {}) {
  let own = null;
  try { own = declaredIn(readFileSync(path.join(root, rel), 'utf8')); } catch { /* absent or binary */ }
  return own ?? regimeOf(rel, annotations);
}
