#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// narrative-levels.test.mjs — one name for the site per narrative level, and
// the dial says which level it is on.
//
// THE PROBLEM THIS COVERS
// The site called itself seven things in the browser tab: "the Summa",
// "numinia-archive", "Numen Games CAO", "NWOS", "Numinia", "Numen Games" and
// "Pablo FM", depending on which page wrote its own title. And the dial that
// chooses how the archive speaks showed three moons with no name a person
// could say aloud.
//
// WHAT IS UNDER TEST
//   1. The site has one name per level, each copied from an archive file:
//      L1 "numinia.org, the archive of Numen Games", L2 "the archive of
//      Numinia", L3 "the Summa Archive". The page as served carries L1, the
//      level search engines, link cards and agents read.
//   2. Every page's title is its own name followed by the site's: whatever
//      suffix a page wrote by hand is replaced, so no retired name survives.
//   3. The dial names its levels L1, L2, L3, and the tab follows the level.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { STOPS, SITE_NAME, siteTitle, pageTitleOf } from '../../../web/src/lib/narrative-words.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const read = (p) => readFileSync(path.join(ROOT, p), 'utf8');

// A retired name used as the site's name: at the end of a title, after a dash
// or a dot. NWOS inside a page's own name ("Configure NWOS") is the product.
const RETIRED = /(—|·)\s*(numinia-archive|Numen Games CAO|NWOS|Pablo FM|the Summa|Numen Games|Numinia)\s*$/;

test('one site name per level, each copied from the archive file it cites', () => {
  assert.deepEqual(Object.keys(SITE_NAME), ['plain', 'bridge', 'numinia']);
  assert.equal(SITE_NAME.plain.text, 'numinia.org, the archive of Numen Games');
  assert.equal(SITE_NAME.bridge.text, 'the archive of Numinia');
  assert.equal(SITE_NAME.numinia.text, 'the Summa Archive');
  for (const [lvl, n] of Object.entries(SITE_NAME)) {
    // The site's own domain is not a word; a leading article may differ in the source.
    const quoted = n.text.replace(/^numinia\.org, /, '').replace(/^the /, '');
    assert.ok(read(n.source).toLowerCase().includes(quoted.toLowerCase()), `${lvl}: "${quoted}" is not in ${n.source}`);
  }
});

test('a page title is the page, then the site; the home is the site alone', () => {
  assert.equal(siteTitle('Telemetry'), 'Telemetry — numinia.org, the archive of Numen Games');
  assert.equal(siteTitle('Telemetry', 'bridge'), 'Telemetry — the archive of Numinia');
  assert.equal(siteTitle('Telemetry', 'numinia'), 'Telemetry — the Summa Archive');
  assert.equal(siteTitle(''), 'numinia.org, the archive of Numen Games');
});

test('every suffix a page wrote by hand gives way to the site name', () => {
  const cases = {
    'Missions — Numen Games CAO': 'Missions',
    'Glosario — numinia-archive': 'Glosario',
    'NWOS — Telemetry — Pablo FM': 'Telemetry',
    'What binds today — NWOS': 'What binds today',
    'Numinia — the Summa': '',
    'The Agents — Numinia': 'The Agents',
    'Privacy Policy — Numen Games': 'Privacy Policy',
    'Canon — NWOS, the archive of Numen Games': 'Canon',
    'Governance — how the archive is classified · Numen Games': 'Governance',
    'The archive — every series of Numen Games': 'The archive',
    'Ursa · Technical Architect & Orchestrator · Numinia': 'Ursa · Technical Architect & Orchestrator',
    'Open books — Numen Games S.L.': 'Open books',
    'NWOS — the archive of Numen Games': '',
    'Telemetry — numinia.org, the archive of Numen Games': 'Telemetry',
  };
  for (const [raw, page] of Object.entries(cases)) assert.equal(pageTitleOf(raw), page, raw);
});

test('no title written in the site source survives with a retired name', () => {
  const files = [];
  const walk = (d) => { for (const e of readdirSync(d)) { const p = path.join(d, e); statSync(p).isDirectory() ? walk(p) : /\.(astro|ts)$/.test(e) && files.push(p); } };
  walk(path.join(ROOT, 'web', 'src', 'pages'));
  const bad = [];
  for (const f of files) {
    for (const m of readFileSync(f, 'utf8').matchAll(/\btitle=(?:"([^"]+)"|\{`([^`]+)`\})/g)) {
      const raw = (m[1] ?? m[2]).replace(/\$\{[^}]+\}/g, 'X');
      if (RETIRED.test(pageTitleOf(raw))) bad.push(`${path.relative(ROOT, f)}: ${raw}`);
    }
  }
  assert.deepEqual(bad, []);
});

test('the layout titles every page through siteTitle, and the tab follows the level', () => {
  const layout = read('web/src/layouts/Layout.astro');
  assert.match(layout, /siteTitle\(/, 'Layout does not build the title with siteTitle');
  assert.match(layout, /data-nw-page=/, 'the <title> does not carry the page name for the dial');
  const dial = read('web/src/components/NarrativeDial.astro');
  assert.match(dial, /document\.title/, 'the dial does not set the tab');
});

test('the dial names its levels L1, L2, L3', () => {
  assert.deepEqual(STOPS.map((s) => s.level), ['L1', 'L2', 'L3']);
  const dial = read('web/src/components/NarrativeDial.astro');
  assert.match(dial, /Narrative level/);
  assert.match(dial, /\{s\.level\}/, 'the stops do not print their level');
});
