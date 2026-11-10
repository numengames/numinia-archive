// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// dataset-helper.mjs — the telemetry dataset is generated, not committed, so a test that reads
// machine/telemetry/{latest.json,docs.json,history.jsonl} makes sure they exist first.
//
// CI generates them in a step of its own before `npm test`; on a laptop the first run does it
// here. The instrument fills the ledger from origin/data/telemetry, then from the commit that
// last tracked it, so no network is needed once the repository has its history.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const FILES = ['latest.json', 'docs.json', 'latest.md', 'history.jsonl'];

export function ensureDataset() {
  const dir = path.join(ROOT, 'machine', 'telemetry');
  if (FILES.every((f) => existsSync(path.join(dir, f)))) return;
  execFileSync('node', [path.join(ROOT, 'machine', 'scripts', 'telemetry.mjs')], { cwd: ROOT, stdio: ['ignore', 'ignore', 'inherit'], maxBuffer: 1 << 26 });
}
