#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// rename-residue.test.mjs — the repository was numengames/numinia-nwos and is
// numengames/numinia-archive since 2026-09-17. GitHub redirects the old name
// today; the day someone creates a repository called numinia-nwos, every link
// still spelled the old way lands on a stranger's code. This test pins the
// LIVE surfaces — code, configuration, the documents that describe the
// repository as it is — to the current name.
//
// Not covered, on purpose: closed missions, reports, operations, the
// CHANGELOG, telemetry and lore/ are records of their day and keep the name
// the repository had then (AGENTS.md: the old document stays the photograph
// it is). The Cloudflare Worker keeps its historical service name
// `numinia-nwos` in web/wrangler.toml: that is not an org/repo path and does
// not match here.
//
// Run: npm test
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { ROOT } from '../lib/frontmatter.mjs';

// Built in two halves so this file does not match itself. The lookahead keeps
// numengames/numinia-nwos-viewer (the old viewer, a different repository) out.
const OLD_PATH = ['numengames', 'numinia-nwos'].join('/');
const OLD_RE = `${OLD_PATH}(?![A-Za-z0-9-])`;

const LIVE = [
  'package.json', 'README.md', 'SECURITY.md', 'CLAUDE.md', 'AGENTS.md', 'CONTRIBUTING.md', 'REUSE.toml',
  '.github', 'scripts', 'tools', 'packages', 'guards', 'standards', 'agents', 'system', 'machine/templates/MIS-TEMPLATE.md',
  'web/src', 'web/public', 'web/README.md', 'web/wrangler.toml', 'web/astro.config.mjs', 'web/package.json',
];

test('no live surface still spells the repository by its old name', () => {
  let out = '';
  try {
    out = execFileSync('git', ['-C', ROOT, 'grep', '-l', '-P', OLD_RE, '--', ...LIVE], { encoding: 'utf8' });
  } catch (e) {
    // git grep exits 1 when nothing matches — that is the pass.
    if (e.status !== 1) throw e;
  }
  const files = out.split('\n').filter(Boolean).filter((f) => f !== path.posix.join('scripts', 'test', 'rename-residue.test.mjs'));
  assert.deepEqual(files, [], `still point at ${OLD_PATH}: ${files.join(', ')}`);
});
