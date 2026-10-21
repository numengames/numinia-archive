#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// setup.mjs — make a fresh clone able to run everything.
//
//   npm run setup
//
// A fresh clone is missing three things, and each used to surface as a red
// check that looked like a defect in the tree:
//   1. web/node_modules   -> `cd web && npm ci` (tests that import the site's
//                            libraries skip, saying so, until it exists)
//   2. the tokenizer file -> `telemetry.mjs --fetch-tokenizer` (gitignored,
//                            ≈1.6 MB; without it token figures are null)
//   3. the git history    -> `git fetch --unshallow` (a `--depth 1` clone
//                            cannot tell a deleted document from a broken
//                            reference, so DEF-009 / HDR-016 stay silent)
//
// It does the first two and only reports the third: deepening a clone moves a
// lot of data and is the owner of the clone's call. Safe to run twice.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const run = (cmd, args, cwd = ROOT) => spawnSync(cmd, args, { cwd, stdio: 'inherit' }).status === 0;
const step = (label, ok) => console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}`);

let failed = 0;
const need = (label, ok) => { step(label, ok); if (!ok) failed += 1; };

if (existsSync(path.join(ROOT, 'web', 'node_modules'))) step('web dependencies already installed', true);
else need('web dependencies (npm ci in web/)', run('npm', ['ci', '--no-audit', '--no-fund'], path.join(ROOT, 'web')));

if (existsSync(path.join(ROOT, 'machine', 'scripts', 'lib', 'tokenizer', 'cl100k_base.tiktoken'))) step('tokenizer already fetched', true);
else need('tokenizer (cl100k_base.tiktoken, sha256 verified)', run('node', ['machine/scripts/telemetry.mjs', '--fetch-tokenizer']));

const shallow = spawnSync('git', ['rev-parse', '--is-shallow-repository'], { cwd: ROOT, encoding: 'utf8' }).stdout?.trim() === 'true';
if (shallow) console.log('note shallow clone: run `git fetch --unshallow` for the checks that read history (DEF-009, HDR-016)');
else step('full git history', true);

console.log(failed ? `\n${failed} step(s) failed` : '\nReady: npm run checks · npm test · cd web && npm run build');
process.exit(failed ? 1 : 0);
