/**
 * cl100k_base, from the rank file — no package. MIS-138 D1.3 / decision 5.
 *
 * The rank file (`cl100k_base.tiktoken`, ≈1.6 MB, one `base64(bytes) rank` per line) is
 * fetched by `telemetry.mjs --fetch-tokenizer` and verified against SHA256 below — the
 * same hash `tiktoken` (openai_public.py) checks. Absent → `null`, the family reports why.
 *
 * The pre-tokenizer regex is tiktoken's `pat_str` with its possessive quantifiers
 * (`?+`, `++`) written as ordinary ones: JS has no possessives; equality with
 * tiktoken over every document is criterion 6, checked by telemetry.test.mjs.
 * Special tokens are never produced (plain text encoding, like `encode_ordinary`).
 */
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const RANK_URL = 'https://openaipublic.blob.core.windows.net/encodings/cl100k_base.tiktoken';
export const RANK_SHA256 = '223921b76ee99bde995b7ff738513eef100fb51d18c93597a113bcffe865b2a7';
export const RANK_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), 'tokenizer', 'cl100k_base.tiktoken');
const PAT = /'(?:[sS]|[dD]|[mM]|[tT]|[lL][lL]|[vV][eE]|[rR][eE])|[^\r\n\p{L}\p{N}]?\p{L}+|\p{N}{1,3}| ?[^\s\p{L}\p{N}]+[\r\n]*|\s*[\r\n]+|\s+(?!\S)|\s+/gu;

/** { ok, reason?, ranks?, sha256? } — never throws on a missing or altered file. */
export function loadRanks(file = RANK_PATH) {
  if (!existsSync(file)) return { ok: false, reason: `rank file absent: ${path.relative(process.cwd(), file)} — run telemetry.mjs --fetch-tokenizer` };
  const buf = readFileSync(file);
  const sha256 = createHash('sha256').update(buf).digest('hex');
  if (sha256 !== RANK_SHA256) return { ok: false, reason: `rank file sha256 ${sha256.slice(0, 12)}… ≠ pinned ${RANK_SHA256.slice(0, 12)}…` };
  const ranks = new Map();
  for (const line of buf.toString('latin1').split('\n')) {
    if (!line) continue;
    const sp = line.indexOf(' ');
    ranks.set(Buffer.from(line.slice(0, sp), 'base64').toString('latin1'), Number(line.slice(sp + 1)));
  }
  return { ok: true, ranks, sha256, size: ranks.size };
}

function bpe(piece, ranks) {
  if (ranks.has(piece)) return 1;
  let parts = Array.from(piece); // latin1 string: one char per byte
  while (parts.length > 1) {
    let best = -1, bestRank = Infinity;
    for (let i = 0; i < parts.length - 1; i++) {
      const r = ranks.get(parts[i] + parts[i + 1]);
      if (r !== undefined && r < bestRank) { bestRank = r; best = i; }
    }
    if (best < 0) break;
    parts.splice(best, 2, parts[best] + parts[best + 1]);
  }
  return parts.length;
}

/** Token count of a UTF-8 text under cl100k_base (ordinary encoding). */
export function countTokens(text, ranks) {
  let n = 0;
  for (const m of text.matchAll(PAT)) n += bpe(Buffer.from(m[0], 'utf8').toString('latin1'), ranks);
  return n;
}
