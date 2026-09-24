// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// THE LICENCE IS THE FILE'S, NEVER THE FOLDER'S (Oracle, 2026-09-24).
//
// Until that date REUSE.toml handed licences to whole folders — `lore/**`,
// `canon/**`, `missions/**` — and a file inherited whatever its shelf said.
// A new file got a licence nobody chose for it; moving a file changed its
// licence without anyone touching it. These tests hold the replacement:
// every text file declares its own licence in an SPDX comment, and
// REUSE.toml names only files that cannot, one exact path each.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';
import { declaredIn, licenceOfFile, loadAnnotations } from '../lib/reuse.mjs';

const tracked = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);
const annotations = loadAnnotations();

test('there is one REUSE.toml, at the root', () => {
  // Two had crept in (web/src/icons/, the fonts of /design); a nested one is
  // a second place to look and a second place to forget.
  const nested = tracked.filter((f) => f.endsWith('/REUSE.toml'));
  assert.deepEqual(nested, []);
});

test('REUSE.toml names files, never folders: no glob in any path', () => {
  const globs = annotations.flatMap((b) => b.paths).filter((p) => /[*?[]/.test(p));
  assert.deepEqual(globs, [], `folder-shaped declarations are back: ${globs.join(', ')}`);
});

test('every path REUSE.toml names is a tracked file', () => {
  // A path that matches nothing is a declaration about a file that is gone.
  const set = new Set(tracked);
  const stale = annotations.flatMap((b) => b.paths).filter((p) => !set.has(p));
  assert.deepEqual(stale, [], `REUSE.toml names files that do not exist: ${stale.join(', ')}`);
});

test('a text file declares its licence itself, not through REUSE.toml', () => {
  // REUSE.toml is for what cannot hold a comment. A Markdown or code file
  // listed there is a licence someone could have written in the file.
  const TEXT = /\.(md|mjs|js|ts|astro|ya?ml|toml|css|txt|sh)$/;
  const named = new Set(annotations.flatMap((b) => b.paths));
  const PINNED = /^(web\/public\/design\/|machine\/packages\/design-kit\/|machine\/telemetry\/|machine\/templates\/)|^objects\/CHECK\.md$|^lore\/game\/manual-v0\.6\.0\.md$/;
  const wrong = tracked.filter((f) => TEXT.test(f) && named.has(f) && !PINNED.test(f));
  assert.deepEqual(wrong, [], `text files licensed from outside: ${wrong.join(', ')}`);
});

test('every tracked file resolves to exactly one licence', () => {
  // Licence texts and the declaration file itself are what the reuse tool
  // ignores by name (LICENSE*, COPYING*, REUSE.toml): they are not works.
  const exempt = (f) => f.startsWith('LICENSES/') || /(^|\/)(LICENSE[^/]*|COPYING[^/]*|REUSE\.toml)$/.test(f);
  const missing = tracked.filter((f) => !exempt(f) && !licenceOfFile(f));
  assert.deepEqual(missing, [], `files with no licence: ${missing.join(', ')}`);
});

test('two files in one folder may carry two different licences', () => {
  // The property the rule IS: operations/ holds CC-BY-4.0 records and
  // reserved legal texts side by side, each saying so itself.
  assert.equal(licenceOfFile('operations/OPS-001-continuity.md'), 'CC-BY-4.0');
  assert.equal(licenceOfFile('operations/OPS-003-privacy-policy-numengames.md'), 'LicenseRef-Numen-AllRightsReserved');
});

test('the declaration read is the file\'s own SPDX comment', () => {
  assert.equal(declaredIn('<!--\nSPDX-FileCopyrightText: 2026 X\nSPDX-License-Identifier: CC0-1.0\n-->\n# T'), 'CC0-1.0');
  assert.equal(declaredIn('// SPDX-License-Identifier: MIT\n'), 'MIT');
  assert.equal(declaredIn('# SPDX-License-Identifier: CC-BY-4.0\nkey: v\n'), 'CC-BY-4.0');
  assert.equal(declaredIn('No declaration here.\n'), null);
  // Quoted in a fence, it is an example, not a declaration.
  assert.equal(declaredIn('Write:\n```\nSPDX-License-Identifier: MIT\n```\n'), null);
});

test('a document header and its SPDX comment agree', () => {
  // std-010-licensing enforces this; the test pins that the corpus is clean
  // today, so a regression shows up in `npm test` as well as in the guard.
  const disagree = [];
  for (const f of tracked.filter((x) => x.endsWith('.md') && !x.startsWith('machine/templates/'))) {
    const text = readFileSync(path.join(ROOT, f), 'utf8');
    const fm = /^---\s*\n[\s\S]*?^license:\s*"?([^"\n]+)"?\s*$/m.exec(text.split(/\n---\s*\n/)[0] + '\n');
    if (!fm) continue;
    const own = licenceOfFile(f);
    if (fm[1].trim() !== own) disagree.push(`${f}: header ${fm[1].trim()}, SPDX ${own}`);
  }
  assert.deepEqual(disagree, []);
});
