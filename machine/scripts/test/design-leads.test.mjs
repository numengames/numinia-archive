// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// design-leads.test.mjs — numinia.org leads the design, and what it does is
// what the system writes down (the Oracle, 2026-09-24 and 2026-09-29). These
// cases keep the written system and the site that leads it saying the same
// thing, so the other three sites can copy either one.
//
//   ICONS      The house subset in the kit is exactly the glyphs the site
//              serves from web/src/icons — no more, no fewer.
//   RADII      Two radii and nothing else: control 6 px, frame 8 px, plus the
//              circle and the capsule. No Tailwind scale step, no stray value.
//   MOTION     The kit's agent instruction counts the living animations of
//              the catalogue in STD-023 §14 correctly, and the site's entrance
//              runs at the catalogued duration.
//   ETIQUETA   The label type in the kit is the one the site's bar uses.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const read = (p) => readFileSync(path.join(ROOT, p), 'utf8');
const tokens = JSON.parse(read('machine/packages/design-kit/sistema.tokens.json'));

function walk(dir, out = []) {
  for (const name of readdirSync(path.join(ROOT, dir))) {
    const rel = path.join(dir, name);
    if (statSync(path.join(ROOT, rel)).isDirectory()) walk(rel, out);
    else if (/\.(astro|ts|css|mjs)$/.test(name)) out.push(rel);
  }
  return out;
}
// The update log records what was written at the time; it is history.
const SOURCE = walk('web/src').filter((f) => !f.endsWith('data/updates.ts'));

test('ICONS: the kit subset is exactly the glyphs web/src/icons serves', () => {
  const served = readdirSync(path.join(ROOT, 'web/src/icons'))
    .filter((f) => f.endsWith('.svg')).map((f) => f.slice(0, -4)).sort();
  const subset = [...tokens.icon.subconjunto.$value].sort();
  assert.deepEqual(subset, served);
});

test('ICONS: STD-023 §11 names every glyph of the subset', () => {
  const std = read('standards/STD-023-design-values.md');
  const s11 = std.slice(std.indexOf('## 11. '), std.indexOf('## 12. '));
  const missing = tokens.icon.subconjunto.$value.filter((n) => !s11.includes(`\`${n}\``));
  assert.deepEqual(missing, []);
});

test('RADII: no Tailwind radius step in web/src — only rounded-[6px], rounded-[8px], rounded-full, rounded-none', () => {
  const allowed = /^rounded(-[trblse]{1,2})?-(\[6px\]|\[8px\]|full|none)$/;
  const bad = [];
  for (const f of SOURCE) {
    for (const m of read(f).matchAll(/(?<![\w-])rounded(?:-[a-z0-9]+)*(?:-\[[^\]]+\])?(?![\w-])/g)) {
      if (!allowed.test(m[0])) bad.push(`${f}: ${m[0]}`);
    }
  }
  assert.deepEqual(bad, []);
});

test('RADII: every border-radius in web/src is 6px, 8px, a circle, a capsule, 0 or a variable', () => {
  const ok = /^(6px|8px|50%|999px|9999px|99px|0|var\(--[\w-]+\)|8px 8px 0 0|\$\{[^}]+\})$/;
  const bad = [];
  for (const f of SOURCE) {
    for (const m of read(f).matchAll(/border-radius:\s*([^;"}\n]+)/g)) {
      const v = m[1].trim();
      if (!ok.test(v)) bad.push(`${f}: ${v}`);
    }
    for (const m of read(f).matchAll(/--(?:cc-modal-border-radius|radius(?:-[a-z0-9]+)?):\s*([^;\n]+);/g)) {
      const v = m[1].trim();
      if (!/^(6px|8px|var\(--[\w-]+\))$/.test(v)) bad.push(`${f}: ${m[0]}`);
    }
  }
  assert.deepEqual(bad, []);
});

test('MOTION: the kit instruction counts the living animations of STD-023 §14', () => {
  const std = read('standards/STD-023-design-values.md');
  const s14 = std.slice(std.indexOf('## 14. '), std.indexOf('## 15. '));
  const rows = s14.split('\n').filter((l) => /^\| \**\d{2}\** \|/.test(l));
  const living = rows.filter((l) => !/RETIRED/.test(l)).length;
  const words = { 14: 'catorce', 15: 'quince', 16: 'dieciséis', 17: 'diecisiete' };
  const prompt = read('machine/packages/design-kit/sistema.prompt.txt');
  assert.match(prompt, new RegExp(`solo estas ${words[living]}`), `the prompt should say «solo estas ${words[living]}»`);
});

test('MOTION: the entrance (16) runs at the catalogued duration, rise and stagger', () => {
  const css = read('web/src/styles/global.css');
  const d = tokens.duration.entrada?.$value;
  assert.equal(d, '600ms');
  const lines = css.match(/--animate-slide-up[\w-]*:[^;]+;/g) ?? [];
  assert.ok(lines.length > 0, 'no entrance animation declared');
  for (const l of lines) assert.match(l, /slideUp 600ms var\(--ease-ciclo\|cubic-bezier\(0\.2, 0, 0, 1\)\)|slideUp 600ms cubic-bezier\(0\.2, 0, 0, 1\)/);
  assert.match(css, /translateY\(24px\)/);
  assert.doesNotMatch(css, /@keyframes twinkle/, 'twinkle is not in the catalogue');
});

test('ETIQUETA: the kit label type is the bar\'s: 0.7rem, tracking 0.15em', () => {
  assert.equal(tokens.fontSize.etiqueta.$value, '0.700rem');
  const kitCss = read('machine/packages/design-kit/sistema.css');
  assert.match(kitCss, /\.etiqueta\{[^}]*font-size:\.7rem[^}]*letter-spacing:\.15em/);
});
