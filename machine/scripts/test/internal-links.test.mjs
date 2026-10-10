// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// internal-links.test.mjs — no link the site builds leads nowhere.
//
// Measured on 2026-10-10: 22 links on numinia.org answered 404. Two documents
// (agents/INDEX.md, stakeholders/README.md) link their neighbours the way a
// repository does, `ursa/SOUL.md`, `adigital.md`. GitHub resolves those; the
// site printed them as they were, so on /agents/ and /stakeholders/readme/ the
// browser resolved them against the page's own address
// (/agents/ursa/SOUL.md, /stakeholders/readme/adigital.md) and every one 404'd.
//
// Checked on the BUILT pages: every href the site writes as an address on
// numinia.org itself (relative or root-relative; absolute https URLs typed by
// an author are content, not build output) must resolve to a file in
// web/dist — a page, its .md view, an asset or a redirect page. Inline
// scripts are skipped: a template literal there is code, not a link.
//
// Run: npm test  (needs web/dist: `cd web && npm run build`)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';
import { siteAddressOf } from '../../../web/src/lib/rehype-doc-links.mjs';

test('a document path maps to the address the site serves it at', () => {
  assert.equal(siteAddressOf('agents/INDEX.md'), '/agents');
  assert.equal(siteAddressOf('agents/ursa/SOUL.md'), '/agents/ursa');
  assert.equal(siteAddressOf('stakeholders/adigital.md'), '/stakeholders/adigital');
  assert.equal(siteAddressOf('standards/STD-008-design-tokens.md'), '/standards/std-008-design-tokens');
  assert.equal(siteAddressOf('LICENSE'), null);
});

const DIST = path.join(ROOT, 'web', 'dist');
const built = existsSync(path.join(DIST, 'index.html'));
const skip = !built && 'web/dist not built';

/** Every built .html file, recursively. */
function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** The address a built file is served at: dist/a/b/index.html → /a/b/. */
function pageUrl(file) {
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  return '/' + rel.replace(/(^|\/)index\.html$/, '$1');
}

/** Does a site path resolve to something the build wrote? */
function resolves(pathname) {
  const p = decodeURIComponent(pathname).replace(/^\/+/, '');
  if (p === '') return true;
  return [p, `${p}.html`, `${p.replace(/\/$/, '')}/index.html`].some((c) => {
    const full = path.join(DIST, c);
    return existsSync(full) && statSync(full).isFile();
  });
}

test('every internal link on the built site resolves', { skip }, () => {
  const broken = [];
  for (const file of htmlFiles(DIST)) {
    const html = readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
    const base = new URL(pageUrl(file), 'https://numinia.org');
    for (const [, raw] of html.matchAll(/\shref="([^"]*)"/g)) {
      const href = raw.replace(/&amp;/g, '&');
      if (!href || href.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(href)) continue;
      const url = new URL(href, base);
      if (!resolves(url.pathname)) broken.push(`${base.pathname} → ${url.pathname}`);
    }
  }
  assert.deepEqual([...new Set(broken)].sort(), [], `links that 404:\n${[...new Set(broken)].join('\n')}`);
});
