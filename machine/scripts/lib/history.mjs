// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT

/**
 * machine/scripts/lib/history.mjs — where the telemetry ledger (history.jsonl) lives and how it is read.
 *
 * The ledger is the one part of the dataset with memory: one line per distinct
 * `corpus_hash` measured on a clean tree, append-only. It is NOT committed to
 * main. A workflow (.github/workflows/telemetry-history.yml) appends a line
 * after every merge and pushes it to the data branch `data/telemetry`; a build
 * reads it from there. Main never carries it, so no pull request ever edits it.
 *
 * Where a reader finds the ledger, first hit wins (`resolveHistory`):
 *   1. the data branch `origin/data/telemetry` (fetched, fail-soft)
 *   2. the last commit of this checkout that still carried
 *      machine/telemetry/history.jsonl: the seed, from before the ledger moved
 *   3. nothing: an empty ledger (the page then draws a series of one point)
 *
 * No dependency: bare node and the git CLI, like the instrument.
 */
import { execFileSync } from 'node:child_process';
import { ROOT } from './frontmatter.mjs';

export const DATA_BRANCH = 'data/telemetry';
/** The file inside the data branch. */
export const DATA_FILE = 'history.jsonl';
/** Where the ledger lived on main until it moved; also the local, gitignored working copy. */
export const LEGACY_PATH = 'machine/telemetry/history.jsonl';
const REMOTE_REF = `refs/remotes/origin/${DATA_BRANCH}`;

const BIG = 1 << 28;
const git = (root, ...args) => execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', maxBuffer: BIG, stdio: ['ignore', 'pipe', 'pipe'] });
const tryGit = (root, ...args) => { try { return git(root, ...args); } catch { return null; } };

/** The non-empty lines of a ledger, parsed. A line that is not JSON throws: a corrupt ledger must not be extended silently. */
export function parseLedger(text) {
  return (text ?? '').split('\n').filter(Boolean).map((l, i) => {
    try { return JSON.parse(l); } catch { throw new Error(`history line ${i + 1} is not JSON`); }
  });
}

/**
 * The ledger with `row` appended, unless a line with the same corpus_hash is already in it.
 * Only ever appends: every existing byte stays where it was.
 */
export function appendRow(text, row) {
  const base = text ?? '';
  const seen = parseLedger(base).some((r) => r.corpus_hash === row.corpus_hash);
  if (seen) return { text: base, added: false };
  const sep = base === '' || base.endsWith('\n') ? '' : '\n';
  return { text: base + sep + JSON.stringify(row) + '\n', added: true };
}

/** The ledger as the data branch holds it, after a fetch; null when the branch is unreachable and not known locally. */
export function fromDataBranch(root = ROOT, { fetch = true } = {}) {
  if (fetch) tryGit(root, 'fetch', '--quiet', '--no-tags', 'origin', `+${DATA_BRANCH}:${REMOTE_REF}`);
  return tryGit(root, 'show', `${REMOTE_REF}:${DATA_FILE}`);
}

/**
 * The ledger as the last commit that still tracked it left it: HEAD itself while the file is
 * tracked, otherwise the parent of the commit that deleted it. Needs the history (not a depth-1 clone).
 */
export function fromLegacy(root = ROOT) {
  if (tryGit(root, 'cat-file', '-e', `HEAD:${LEGACY_PATH}`) !== null) return { text: git(root, 'show', `HEAD:${LEGACY_PATH}`), from: 'HEAD' };
  const del = tryGit(root, 'log', '-1', '--format=%H', '--diff-filter=D', '--', LEGACY_PATH)?.trim();
  if (!del) return null;
  const text = tryGit(root, 'show', `${del}^:${LEGACY_PATH}`);
  return text === null ? null : { text, from: `${del.slice(0, 7)}^` };
}

/** { text, source } — see the header for the order. Never throws on a missing source. */
export function resolveHistory(root = ROOT, { fetch = true } = {}) {
  const branch = fromDataBranch(root, { fetch });
  if (branch !== null && branch.trim() !== '') return { text: branch, source: `origin/${DATA_BRANCH}` };
  const legacy = fromLegacy(root);
  if (legacy) return { text: legacy.text, source: `seed (${legacy.from})` };
  return { text: '', source: 'empty' };
}

/** True when the checkout has no full log (a depth-1 clone); the provenance figures would measure another repository. */
export function isShallow(root = ROOT) {
  return tryGit(root, 'rev-parse', '--is-shallow-repository')?.trim() === 'true';
}

/** Ask origin for the rest of a shallow checkout, once. True when the log is whole afterwards. */
export function ensureFullHistory(root = ROOT) {
  if (!isShallow(root)) return true;
  tryGit(root, 'fetch', '--quiet', '--unshallow', 'origin');
  return !isShallow(root);
}
