/**
 * machine/scripts/lib/reuse.mjs — the one reader of REUSE.toml.
 *
 * Reads the `[[annotations]]` blocks: which paths each block covers and the
 * licence it declares. regimeOf(path) answers "which licence governs this
 * path" the way the reuse tool does — the last matching block wins.
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
