// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT

/**
 * telemetry family `tokens` — how big, in cl100k_base tokens. MIS-138 D1.3, D3.
 * Whole file with frontmatter, the tracked .md outside web/ (loadDocs' set), like the
 * brief's own census (595,479 @cb29f58) and MIS-127's ledger. Rank file pinned by
 * sha256 (machine/scripts/lib/cl100k.mjs); absent → every key null with the reason, exit 0.
 * Per-document counts go to docs.json (`tokens` column), not here.
 */
import { loadRanks, countTokens, RANK_SHA256 } from '../cl100k.mjs';

export function measure({ docs }) {
  const R = loadRanks();
  const unit = 'tokens';
  const fig = (value, definition, u = unit) => ({ value, unit: u, definition });
  const base = { tokenizer: fig(R.ok ? `cl100k_base sha256:${R.sha256.slice(0, 12)}` : null, `rank file cl100k_base.tiktoken, sha256 ${RANK_SHA256} (the hash tiktoken itself pins); encoder machine/scripts/lib/cl100k.mjs, equal to tiktoken.encode_ordinary over every document by test${R.ok ? '' : ' — ' + R.reason}`, 'identity') };
  if (!R.ok) {
    for (const k of ['total', 'by_dir', 'by_status', 'missions_share_pct', 'largest']) base[k] = fig(null, `unavailable: ${R.reason}`);
    for (const d of docs) d.tokens = null;
    return base;
  }
  const byDir = {}, byStatus = {}; let total = 0;
  for (const d of docs) {
    d.tokens = countTokens(d.text, R.ranks); total += d.tokens;
    byDir[d.dir] = (byDir[d.dir] ?? 0) + d.tokens;
    const s = d.status ?? '(none)'; byStatus[s] = (byStatus[s] ?? 0) + d.tokens;
  }
  const sorted = (o) => Object.fromEntries(Object.entries(o).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)));
  base.total = fig(total, 'Σ tokens over the corpus (every tracked .md outside web/, whole file, frontmatter included)');
  base.by_dir = fig(sorted(byDir), 'tokens per top-level dir, largest first');
  base.by_status = fig(sorted(byStatus), 'tokens per frontmatter status ((none) = no status), largest first');
  base.missions_share_pct = fig(Math.round((10000 * (byDir.missions ?? 0)) / total) / 100, '100·tokens(missions/)/total, rounded to 0.01', 'percent');
  base.largest = fig(docs.slice().sort((a, b) => b.tokens - a.tokens).slice(0, 5).map((d) => [d.path, d.tokens]), 'the five largest documents as [path, tokens]');
  return base;
}
