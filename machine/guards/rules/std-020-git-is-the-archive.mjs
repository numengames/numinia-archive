#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-020-git-is-the-archive — the guard of STD-020.
//
// Git is the archive: a commit says one thing on its subject line.
//
// GIT-026  a commit subject is one line (last 400 commits).
// GIT-025/030 are branch protection; GIT-027/028 telemetry and the design
// kit; GIT-029 manual. How a document is retired, and the citation resolver
// that goes with it, is STD-012's guard (std-012-corpus-does-not-grow).
//
// Run from anywhere: node machine/guards/rules/std-020-git-is-the-archive.mjs

import { execFileSync } from 'node:child_process';
import { execute, isMain } from '../lib/guard.mjs';

export const meta = { family: 'GIT', plates: ['GIT-026'] };

function subjects(root) {
  const log = execFileSync('git', ['log', '-400', '--format=%s'], { cwd: root, encoding: 'utf8' });
  return log.split('\n').filter(Boolean)
    .filter((s) => s.includes('\n'))
    .map((s) => ({ plate: 'GIT-026', what: 'multi-line subject', where: s.slice(0, 60) }));
}

export function run(corpus) {
  return subjects(corpus.root);
}

if (isMain(import.meta)) await execute(import.meta, meta, run);
