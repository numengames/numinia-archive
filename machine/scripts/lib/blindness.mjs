// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// blindness — D-025: every guard declares what it cannot see, in its own
// output, on success as well as failure.
//
// WHY THIS EXISTS
// ---------------
// A green result answers "did what I check pass?" and is read as "is the
// repository sound?". The gap between those two questions is exactly the size
// of the blind spot, and until now it was never printed. Three separate debt
// entries are instances of that gap:
//
//   D-039  a green ratchet certified 85 corrupted files
//   D-047  the reference resolver is blind to the folder in a path
//   D-049  the enumerators are blind to untracked files
//
// The knowledge already existed in the scripts. It never reached the reader.
//
// HOW TO USE
// ----------
//   import { declareBlindSpots } from './lib/blindness.mjs';
//   declareBlindSpots('check-templates');
//
// Call it once, near the top. It registers an exit hook, so the declaration
// prints on every path out of the process — including `process.exit(1)` from
// inside a failure branch, which is where a reader is least likely to go
// looking for it and most likely to need it.
//
// WHAT IT IS BLIND TO (this module included, D-025 applies to itself):
// it prints what the registry claims. It cannot check that the claim is
// complete — that a guard has no blind spot nobody thought of. The test suite
// verifies the claims that ARE made; it cannot verify the ones that are not.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const REGISTRY_PATH = path.join(HERE, '..', 'blind-spots.json');

export function loadRegistry() {
  return JSON.parse(readFileSync(REGISTRY_PATH, 'utf8'));
}

/** Render one guard's blind spots as printable lines. Pure — the test calls
 *  this directly rather than scraping stdout. */
export function formatBlindSpots(guardId, registry = loadRegistry()) {
  const entry = registry.guards[guardId];
  if (!entry) {
    throw new Error(
      `blindness: no registry entry for "${guardId}". Add one to machine/scripts/blind-spots.json — ` +
      `a guard with no declared blind spots is a claim, not an omission (D-025).`
    );
  }
  const lines = [`  BLIND TO (D-025) — this guard did not look at:`];
  for (const b of entry.blind_to) {
    lines.push(`    · ${b.spot}`);
    const tail = [];
    if (b.covered_by) tail.push(`covered by: ${b.covered_by}`);
    else tail.push(`NOT covered by any guard`);
    if (b.debt) tail.push(`tracked as ${b.debt}`);
    lines.push(`        ${tail.join(' · ')}`);
  }
  return lines;
}

/** Register the declaration to print when the process exits, whatever the
 *  exit code. Returns the lines it will print, for testability. */
export function declareBlindSpots(guardId) {
  const lines = formatBlindSpots(guardId);
  process.on('exit', () => {
    // stderr: survives `| head`, and keeps machine-readable stdout parseable
    // for anything piping a guard's normal output.
    console.error('');
    for (const l of lines) console.error(l);
  });
  return lines;
}
