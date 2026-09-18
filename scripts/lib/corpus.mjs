/**
 * scripts/lib/corpus.mjs — one read of the tracked corpus, shared by the
 * telemetry families. MIS-138 D1: every family measures the same list of
 * files, read once, classified by rules.json.
 *
 * `HEAD` semantics: files come from `git ls-files` (the index), text from the
 * working tree. `corpusHash` is over `git ls-tree -r HEAD` excluding
 * `telemetry/` — so a dirty tree is reported (`root_dirty`), never hidden.
 */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { ROOT, parseFM, loadRules, isApparatus, seriesDirs } from './frontmatter.mjs';

const git = (...args) => execFileSync('git', ['-C', ROOT, ...args], { encoding: 'utf8' }).trimEnd();

/* Retired 2026-09-03 (Oracle ruling): a filename is not a state. This pattern
   used to mark a document "frozen" because its name began with a date, which
   contradicted STD-001 — where `frozen` is a mission state meaning
   "deliberately paused, returns to any state", not "permanently fixed".
   State is read from the `status` field, like everywhere else in the corpus
   and like ISO stage codes, IETF `Category:` and W3C status sections. The
   naming shape itself still exists and is checked by std-006/std-018; it just
   no longer implies anything about lifecycle. */
export const DATED_ARTIFACT_RE = /^\d{4}_\d{2}_\d{2}-.+-v\d+\.\d+\.\d+\.md$/;

/** All tracked paths at HEAD's index, `telemetry/` excluded: the dataset does not measure itself (same exclusion as corpusHash). */
export function trackedFiles() {
  return git('ls-files').split('\n').filter((f) => f && !f.startsWith('telemetry/'));
}

/**
 * Paths the corpus seal ignores: dependency manifests, lockfiles and the CI
 * workflow files. A version bump there changes bytes the archive does not
 * measure — every figure stays identical — yet it would shift the hash and
 * turn every Dependabot pull request STALE at birth. ALTERED still guards
 * the figures themselves: a workflow edit that changes `scripts_in_ci` is
 * caught by the value comparison, not by the seal.
 */
export const SEAL_EXEMPT_RE = /(^|\/)(package\.json|package-lock\.json|npm-shrinkwrap\.json|pnpm-lock\.yaml|yarn\.lock)$|^\.github\/(workflows|dependabot\.yml)/;

/**
 * SHA-256 over the INDEX (`git ls-files -s`: mode, blob, stage, path), telemetry/
 * and SEAL_EXEMPT_RE excluded. The index, not HEAD's tree, so that a dataset
 * can describe the very commit it is committed in: stage everything, measure,
 * add telemetry/, commit — the hash names the resulting tree. `--check` in CI
 * (index == HEAD) agrees.
 */
export function corpusHash() {
  const lines = git('ls-files', '-s').split('\n').filter((l) => {
    if (!l || /\ttelemetry\//.test(l)) return false;
    const p = l.slice(l.indexOf('\t') + 1);
    return !SEAL_EXEMPT_RE.test(p);
  });
  return createHash('sha256').update(lines.join('\n')).digest('hex');
}

export function headInfo() {
  // dirty = unstaged modifications + untracked files outside telemetry/: what the index does not describe.
  const unstaged = git('diff', '--name-only', '--', '.', ':!telemetry').split('\n').filter(Boolean);
  const untracked = git('ls-files', '--others', '--exclude-standard', '--', '.', ':!telemetry').split('\n').filter(Boolean);
  const staged = git('diff', '--cached', '--name-only', '--', '.', ':!telemetry').split('\n').filter(Boolean);
  const short = git('rev-parse', '--short=7', 'HEAD');
  return {
    head: staged.length ? `${short}+index` : short, // "+index": measured on staged changes not yet in HEAD
    head_full: git('rev-parse', 'HEAD'), root_dirty: unstaged.length + untracked.length, corpus_hash: corpusHash(),
  };
}

/**
 * One row per tracked .md outside web/: path, dir, base, fm, body, chars,
 * plus the classifications every family needs.
 */
export function loadDocs(rules = loadRules()) {
  const series = new Set(seriesDirs(rules));
  return trackedFiles().filter((f) => f.endsWith('.md') && !f.startsWith('web/')).map((rel) => {
    const text = readFileSync(path.join(ROOT, rel), 'utf8');
    const fm = parseFM(text);
    const parts = rel.split('/');
    const top = parts.length > 1 ? parts[0] : '';
    const base = parts[parts.length - 1];
    return {
      path: rel, dir: top, base, fm, has_fm: fm !== null, chars: text.length, text,
      type: fm?.type ?? null, status: fm?.status ?? null,
      series: series.has(top) ? top : null,
      apparatus: isApparatus(rel, fm ?? {}, rules),
      /* `archived` replaced `frozen` on 2026-09-03: read from the declared
         exemption, never from the filename. A name is not a state. */
      archived: fm?.registration === 'exempt' && !!fm?.registration_exemption,
      evidence_annex: rel.startsWith('reports/evidence/'),
      template_dir: rel.includes('/_template/'),
    };
  });
}

/** Sorted object from a Map/obj of counts — stable JSON. */
export function sortedCounts(obj) {
  return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
}
export function tally(items, keyFn) {
  const out = {};
  for (const it of items) { const k = keyFn(it) ?? '(none)'; out[k] = (out[k] || 0) + 1; }
  return sortedCounts(out);
}
