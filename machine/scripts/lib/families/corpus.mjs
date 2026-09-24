// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT

/**
 * telemetry family `corpus` — what is in the tree. MIS-138 D3.
 * Every key: { value, unit, definition }. Definitions are the predicate, in words.
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../frontmatter.mjs';
import { trackedFiles, tally } from '../corpus.mjs';

const CODE_EXT = { '.py': 'python', '.mjs': 'node', '.js': 'node', '.sh': 'shell', '.ts': 'typescript' };

export function measure({ docs, rules }) {
  const files = trackedFiles();
  const ext = (f) => { const m = f.match(/(\.[A-Za-z0-9]+)$/); return m ? m[1].toLowerCase() : '(none)'; };
  const scripts = files.filter((f) => f.startsWith('machine/scripts/') && CODE_EXT[ext(f)]);
  const md = docs; // tracked .md outside web/
  return {
    files_total: { value: files.length, unit: 'files', definition: '`git ls-files` at HEAD, every path' },
    files_by_ext: { value: tally(files, ext), unit: 'files', definition: 'tracked files by lowercase extension; `(none)` when no extension' },
    md_total: { value: files.filter((f) => f.endsWith('.md')).length, unit: 'files', definition: 'tracked `.md` anywhere, including `web/`' },
    docs_total: { value: md.length, unit: 'documents', definition: 'tracked `.md` outside `web/` — the corpus every other family measures' },
    docs_by_dir: { value: tally(md, (d) => d.dir || '(root)'), unit: 'documents', definition: 'corpus documents by top-level directory; root files under `(root)`' },
    docs_by_type: { value: tally(md, (d) => d.type), unit: 'documents', definition: 'corpus documents by frontmatter `type`; `(none)` when absent' },
    docs_without_frontmatter: { value: md.filter((d) => !d.has_fm).length, unit: 'documents', definition: 'corpus documents with no `---` block at the top' },
    apparatus: { value: md.filter((d) => d.apparatus).length, unit: 'documents', definition: 'corpus documents classified apparatus by rules.json (`type: meta`, listed basename, or template path)' },
    scripts_total: { value: scripts.length, unit: 'files', definition: 'files under `machine/scripts/` with a code extension (.py .mjs .js .sh .ts)' },
    scripts_by_language: { value: tally(scripts, (f) => CODE_EXT[ext(f)]), unit: 'files', definition: 'those scripts by language, from the extension' },
    scripts_in_ci: { value: ciScripts(files).length, unit: 'files', definition: 'guards the runner runs in CI: registered scripts under `machine/scripts/` (ENG-032)' },
  };
}

/** Scripts CI runs: what the runner finds — every registered, non-manual
 * guard (ENG-032). The workflow calls the runner and names no guard, so the
 * registry, not the YAML, is the record. A guard's own path is not a signal
 * of whether CI runs it — `manual` is (mirrors run-guards.mjs's filter).
 * Only tracked files count. */
export function ciScripts(files) {
  const p = path.join(ROOT, 'machine', 'scripts', 'blind-spots.json');
  if (!existsSync(p)) return [];
  const registry = JSON.parse(readFileSync(p, 'utf8'));
  const tracked = new Set(files);
  return [...new Set(Object.values(registry.guards).filter((g) => !g.manual).map((g) => g.script))]
    .filter((s) => tracked.has(s)).sort();
}
