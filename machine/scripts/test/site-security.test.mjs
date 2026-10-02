// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// site-security.test.mjs — what numinia.org sends a browser, and what CI can
// still refuse.
//
// THE DEFECTS THIS HOLDS SHUT (audit of the four sites, 2026-10-02, PRO-034)
// 1. numinia.org answered with no security header at all: no HSTS, no CSP,
//    no frame refusal. Cloudflare Workers static assets read web/public/_headers
//    (copied to dist/ by the build); the block for /* is the site's policy.
// 2. The search loaded Pagefind through `new Function`, which only runs under
//    'unsafe-eval' — a CSP that allowed it would allow any string as code.
// 3. CI ran `npm test 2>&1 | tee …` in GitHub's implicit shell, which has no
//    pipefail: the step reported tee's status, and a failing test on main
//    left CI green.
// 4. The Dependabot auto-merge workflow granted write to every job from the
//    top level; the narrowest grant is read-all, write only on the job.
// 5. numinia.org gave a researcher no machine-readable way to report
//    (RFC 9116 security.txt).
// 6. The cookie notice's STORED_KEYS omitted `numinia-narrative`, a key the
//    site writes and LEG-003 §3.2 names.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const read = (...p) => readFileSync(path.join(ROOT, ...p), 'utf8');

/** The headers of the `/*` block of a Cloudflare `_headers` file. */
function rootBlock(text) {
  const out = {};
  let inBlock = false;
  for (const line of text.split('\n')) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    if (!/^\s/.test(line)) { inBlock = line.trim() === '/*'; continue; }
    if (!inBlock) continue;
    const i = line.indexOf(':');
    out[line.slice(0, i).trim().toLowerCase()] = line.slice(i + 1).trim();
  }
  return out;
}

test('numinia.org sends the security headers on every path', () => {
  const file = path.join(ROOT, 'web', 'public', '_headers');
  assert.ok(existsSync(file), 'web/public/_headers is missing');
  const h = rootBlock(readFileSync(file, 'utf8'));
  assert.equal(h['strict-transport-security'], 'max-age=31536000; includeSubDomains');
  assert.equal(h['x-content-type-options'], 'nosniff');
  assert.equal(h['referrer-policy'], 'strict-origin-when-cross-origin');
  assert.equal(h['permissions-policy'], 'camera=(), microphone=(), geolocation=()');
  assert.equal(h['x-frame-options'], 'DENY');
  const csp = h['content-security-policy'] ?? '';
  for (const d of ["default-src 'self'", "frame-ancestors 'none'", "base-uri 'self'", "form-action 'self'", "object-src 'none'"])
    assert.ok(csp.includes(d), `CSP lacks ${d}`);
  assert.doesNotMatch(csp, /'unsafe-eval'/, "the CSP must not allow 'unsafe-eval'");
  assert.doesNotMatch(csp, /https:(?!\/\/)|\*/, 'the CSP must not allow any host wholesale');
});

test('the site evaluates no string as code (the CSP refuses it)', () => {
  const src = read('web', 'src', 'components', 'SiteSearch.astro');
  assert.doesNotMatch(src, /new Function\s*\(/);
  assert.doesNotMatch(src, /\beval\s*\(/);
});

test('numinia.org publishes security.txt (RFC 9116), valid for at most a year', () => {
  const file = path.join(ROOT, 'web', 'public', '.well-known', 'security.txt');
  assert.ok(existsSync(file), 'web/public/.well-known/security.txt is missing');
  const t = readFileSync(file, 'utf8');
  assert.match(t, /^Contact: mailto:legal@numengames\.com$/m);
  assert.match(t, /^Policy: https:\/\/github\.com\/numengames\/numinia-archive\/blob\/main\/SECURITY\.md$/m);
  assert.match(t, /^Preferred-Languages: es, en$/m);
  const exp = t.match(/^Expires: (.+)$/m);
  assert.ok(exp, 'Expires is required');
  const days = (Date.parse(exp[1]) - Date.parse('2026-10-02T00:00:00Z')) / 864e5;
  assert.ok(days > 0 && days <= 366, `Expires ${exp[1]} is not within a year of 2026-10-02`);
});

test('a failing test fails the CI step (pipefail on the tests pipe)', () => {
  const ci = read('.github', 'workflows', 'ci.yml');
  const step = ci.slice(ci.indexOf('- name: tests\n'), ci.indexOf('- name: tests — coverage'));
  assert.match(step, /run: npm test 2>&1 \| tee/);
  assert.ok(/shell: bash\b/.test(step) || /set -o pipefail/.test(step), 'the tests step pipes into tee without pipefail');
  // The tests import web/src/lib/rehype-*.mjs, whose dependencies are web's.
  assert.ok(ci.indexOf('- name: install') < ci.indexOf('- name: tests\n'), 'the web install must come before the tests');
  const pkg = JSON.parse(read('web', 'package.json'));
  assert.ok(pkg.dependencies['unist-util-visit'], 'web/package.json must declare unist-util-visit, which the rehype plugins import');
});

test('the Dependabot auto-merge workflow is read-only except for its job', () => {
  const wf = read('.github', 'workflows', 'dependabot-auto-merge.yml');
  const top = wf.slice(0, wf.indexOf('\njobs:')).split('\n').filter((l) => !l.trimStart().startsWith('#')).join('\n');
  assert.match(top, /^permissions: read-all$/m);
  assert.doesNotMatch(top, /write/);
  const job = wf.slice(wf.indexOf('\njobs:'));
  assert.match(job, /\n {4}permissions:\n {6}contents: write\n {6}pull-requests: write\n/);
});

test('the cookie notice lists every key LEG-003 names for numinia.org', () => {
  const policy = read('legal', 'LEG-003-cookie-policy-numengames.md');
  const org = policy.slice(policy.indexOf('### 3.2'), policy.indexOf('### 3.3'));
  const named = [...org.matchAll(/^\| `([^`]+)`/gm)].map((m) => m[1]);
  const notice = read('web', 'src', 'lib', 'cookie-notice.ts');
  const listed = JSON.parse(notice.match(/STORED_KEYS = (\[[^\]]*\])/)[1]);
  assert.deepEqual(named.filter((k) => !listed.includes(k)), [], 'named in LEG-003 §3.2 but missing from STORED_KEYS');
});
