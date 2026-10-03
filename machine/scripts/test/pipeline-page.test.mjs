#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// pipeline-page.test.mjs — /system/pipeline states no figure of its own.
//
// The page reads opportunities/ through the sales kit's own tool at build
// time (web/src/lib/pipeline.ts) and renders every state as real HTML: a
// funnel per kind on top, then one panel per kind and view; its inline
// script only chooses which ones show. So the checks here are: the library
// calls the tool and fails the build on a breach; the page types no amount,
// no requirement and composes no address; the built page carries the tool's
// figures unchanged — the funnel's counts and conversions, the record count
// on each kind button, the deciding rows of the card in the card's order —
// with Timeline the default view; the template link is there; and the
// script, run against the built markup in a minimal stand-in for the DOM,
// shows exactly one panel and one funnel for each choice of kind and view.
//
// Run: npm test  (needs web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const PAGE = path.join(ROOT, 'web', 'src', 'pages', 'system', 'pipeline.astro');
const LIB = path.join(ROOT, 'web', 'src', 'lib', 'pipeline.ts');
const TOOL = path.join(ROOT, 'machine', 'packages', 'sales-kit', 'pipeline.mjs');
const BUILT = path.join(ROOT, 'web', 'dist', 'system', 'pipeline', 'index.html');
const BUILT_MD = path.join(ROOT, 'web', 'dist', 'system', 'pipeline.md');
const BUILT_TEMPLATES = path.join(ROOT, 'web', 'dist', 'templates', 'index.html');
const notBuilt = !existsSync(BUILT) && 'web/dist not built';

test('the page states no figure: its data comes through the tool', () => {
  const lib = readFileSync(LIB, 'utf8');
  assert.match(lib, /machine", "packages", "sales-kit", "pipeline\.mjs"/, 'the page library imports the tool itself');
  assert.match(lib, /tool\.figures\(/, 'the figures are the tool\'s');
  assert.match(lib, /tool\.loadCard\(/, 'the card the tool reads is the one the page shows');
  assert.match(lib, /throw new Error\(`opportunities\/:/, 'a breach fails the build, as it fails CI');
  assert.doesNotMatch(lib, /funding/i, 'one tool: the funding kit is gone');
  const page = readFileSync(PAGE, 'utf8');
  assert.doesNotMatch(page, /\b1[0-9],[0-9]{3}\b|€\s?\d/, 'no amount is typed in the page');
  assert.doesNotMatch(page, /href="\/[^"]*\$\{/, 'no address is composed in the browser: the link guard reads every href="/… out of the built HTML, template or not');
  // overdue and stale are the tool's verdicts; the page never compares dates to decide them
  assert.doesNotMatch(page, /\.date\s*<\s*TODAY|next\.date\s*</, 'overdue is read from the tool, not recomputed');
  // the conversion is the tool's: the page never divides one step by another
  assert.doesNotMatch(page, /counts\[i\s*-\s*1\]|n\[i\s*-\s*1\]/, 'the page does not compute the conversion');
  // which requirements decide is the card's mark, never a list typed in the page
  assert.doesNotMatch(page, /"Bidders' register"|'Bidders\\' register'|"Past works"/, 'no requirement is named in the page');
});

// ---- the built markup, read as a list of opening tags -----------------------
// Only the opening tags are read (their attributes), never markup stripped
// to text; text is taken between a known tag and its close.
const ENTITY = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" };
const decode = (t) => t.replace(/&(?:amp|lt|gt|quot|#39);/g, (e) => ENTITY[e]);
function openingTags(html, re) {
  const out = [];
  for (const m of html.matchAll(re)) {
    const attrs = {};
    for (const a of m[1].matchAll(/([\w:-]+)(?:="([^"]*)")?/g)) attrs[a[1]] = a[2] === undefined ? '' : decode(a[2]);
    out.push({ attrs, index: m.index });
  }
  return out;
}
/** Slices of html from each opening tag matched by `re` to the next one (or to `endMark`). */
function slices(html, re, endMark) {
  const tags = openingTags(html, re);
  const end = html.indexOf(endMark);
  return tags.map((t, i) => ({ ...t, body: html.slice(t.index, i + 1 < tags.length ? tags[i + 1].index : end) }));
}
const panelSlices = (html) => slices(html, /<div ([^>]*\bpq-panel\b[^>]*)>/g, 'id="pq-new"');
const funnelSlices = (html) => slices(html, /<div ([^>]*\bpq-fun\b[^>]*)>/g, 'id="pq-figures"');
const dataOf = (built) => JSON.parse(built.match(/id="pq-data"[^>]*>([\s\S]*?)<\/script>/)[1]);

test('the built page carries the real folder through the tool', { skip: notBuilt }, async () => {
  const built = readFileSync(BUILT, 'utf8');
  assert.match(built, /id="pq-data"/, 'the data island is in the built page');
  const data = dataOf(built);
  const tool = await import(TOOL);
  const raw = tool.readFolder(path.join(ROOT, 'opportunities'));
  const fig = tool.figures(raw, tool.loadRegister(), tool.loadCard(), data.today);
  for (const r of data.records) {
    assert.equal(r.url, `/opportunities/${r.id.toLowerCase()}`, 'each record carries its address, made at build');
    delete r.url;
  }
  assert.deepEqual(data, fig, 'the page holds exactly the figures the tool computes for its day');
  for (const r of fig.records) assert.ok(built.includes(`href="/opportunities/${r.id.toLowerCase()}"`), `${r.id} is linked`);
  assert.ok(existsSync(BUILT_MD), 'the markdown twin is built');
  const md = readFileSync(BUILT_MD, 'utf8');
  for (const r of fig.records) assert.ok(md.includes(`[${r.id}](/opportunities/${r.id.toLowerCase()})`), `${r.id} is in the twin`);
  const heads = ['## Funnel', '## Asked / we have', '## Key figures', '## What\'s due', '## Every record', '## Reasons lost', '## Days per stage'];
  const at = heads.map((h) => md.indexOf(h));
  for (const [i, h] of heads.entries()) assert.ok(at[i] > 0, `the twin has ${h}`);
  assert.deepEqual([...at].sort((a, b) => a - b), at, 'the twin opens with the funnel, then the deciding requirements, then the rest');
  for (const c of fig.card.filter((x) => x.decides)) assert.ok(md.includes(`| ${c.requirement} |`), `${c.requirement} is in the twin`);
  for (const c of fig.card.filter((x) => !x.decides)) assert.ok(!md.includes(`| ${c.requirement} |`), `${c.requirement} does not decide: only the card holds it`);
});

test('the funnel is on top, per kind, with the tool\'s counts and conversions', { skip: notBuilt }, () => {
  const built = readFileSync(BUILT, 'utf8');
  const data = dataOf(built);
  const kinds = data.kinds.map((k) => k.kind);
  const funnels = funnelSlices(built);
  assert.deepEqual(funnels.map((f) => f.attrs['data-kind']), ['all', ...kinds], 'one funnel per kind');
  assert.deepEqual(funnels.filter((f) => !('hidden' in f.attrs)).map((f) => f.attrs['data-kind']), ['all'], 'All shows without a script');
  assert.ok(built.indexOf('class="pq-fun') < built.indexOf('id="pq-kind"'), 'the funnel comes before the switches');
  for (const f of funnels) {
    const k = f.attrs['data-kind'];
    const steps = openingTags(f.body, /<div ([^>]*\bpq-step\b[^>]*)>/g).map((t) => t.attrs);
    assert.deepEqual(steps.map((s) => s['data-step']), data.steps.map((s) => s.step), `${k}: the five steps of the register`);
    assert.deepEqual(steps.map((s) => Number(s['data-n'])), data.funnel[k].counts, `${k}: the tool's counts`);
    assert.deepEqual(steps.map((s) => (s['data-cv'] === '' ? null : Number(s['data-cv']))), data.funnel[k].conversion, `${k}: the tool's conversions`);
    for (const [i, cv] of data.funnel[k].conversion.entries())
      if (cv !== null) assert.ok(f.body.includes(`${cv} % of the step before`), `${k}: step ${i + 1} prints its conversion`);
    // the note on positive answers is there exactly when the tool counts none
    const [detected, , positive] = data.funnel[k].counts;
    const note = /No positive answer is on record yet: from now on every reply goes into its record(&#39;|')s timeline\./.test(f.body);
    assert.equal(note, detected > 0 && positive === 0, `${k}: the positive-answer note follows the data`);
  }
});

test('the switches: kinds with their counts, three views, Timeline by default', { skip: notBuilt }, () => {
  const built = readFileSync(BUILT, 'utf8');
  const data = dataOf(built);
  const kinds = data.kinds.map((k) => k.kind);
  const kindBtns = slices(built, /<button ([^>]*\bdata-k="[^"]*"[^>]*)>/g, 'id="pq-view"');
  const viewBtns = openingTags(built, /<button ([^>]*\bdata-v="[^"]*"[^>]*)>/g);
  assert.deepEqual(kindBtns.map((b) => b.attrs['data-k']), ['all', ...kinds], 'Kind: All, then every kind of the register');
  for (const b of kindBtns) {
    const k = b.attrs['data-k'];
    const n = k === 'all' ? data.records.length : data.byKind[k].records;
    assert.match(b.body, new RegExp(`class="pq-n"[^>]*>${n}<`), `${k} carries its record count, ${n}`);
  }
  assert.deepEqual(viewBtns.map((b) => b.attrs['data-v']), ['timeline', 'due', 'card'], 'View: timeline, what\'s due, asked / we have — no funnel tab');
  assert.deepEqual(kindBtns.filter((b) => b.attrs['aria-pressed'] === 'true').map((b) => b.attrs['data-k']), ['all']);
  assert.deepEqual(viewBtns.filter((b) => b.attrs['aria-pressed'] === 'true').map((b) => b.attrs['data-v']), ['timeline']);

  const panels = panelSlices(built);
  assert.equal(panels.length, 2 * (kinds.length + 1) + 1, 'one panel per kind for two views, one card for all');
  const visible = panels.filter((p) => !('hidden' in p.attrs));
  assert.deepEqual(visible.map((p) => `${p.attrs['data-view']}/${p.attrs['data-kind']}`), ['timeline/all'], 'without a script, All · Timeline shows');

  // the timeline: every record, open first, each name linking its record with a second line
  const rows = openingTags(visible[0].body, /<div ([^>]*\bpq-g-row\b[^>]*\bdata-id="[^"]*"[^>]*)>/g).map((t) => t.attrs['data-id']);
  const open = data.records.filter((r) => r.open).map((r) => r.id);
  assert.deepEqual(new Set(rows), new Set(data.records.map((r) => r.id)), 'every record has a row');
  assert.deepEqual(rows.slice(0, open.length).sort(), [...open].sort(), 'open records first, then closed');
  assert.equal((visible[0].body.match(/class="pq-g-sub"/g) ?? []).length, data.records.length, 'each name has its value · how it pays line');
  assert.match(visible[0].body, /pq-today/, 'a today line');
  assert.match(visible[0].body, /class="pq-legend"/, 'a legend above');
  assert.match(visible[0].body, /Reasons lost/, 'reasons lost sit under the timeline');
  assert.match(visible[0].body, /Days per stage/, 'days per stage sit under the timeline');

  // a kind with no record: one line, and never a table or a card beside it
  for (const p of panels) {
    const k = p.attrs['data-kind'];
    if (k === 'any' || k === 'all') continue;
    if (data.byKind[k].records === 0) {
      assert.match(p.body, /Nothing of this kind yet\./, `${k}/${p.attrs['data-view']} says so`);
      assert.doesNotMatch(p.body, /<table|pq-card|pq-g-row/, `${k}/${p.attrs['data-view']} has nothing under the note`);
    } else {
      assert.doesNotMatch(p.body, /Nothing of this kind yet/, `${k}/${p.attrs['data-view']} has records`);
    }
  }

  // the card: only the rows the card marks as deciding, in the card's order
  const card = panels.find((p) => p.attrs['data-view'] === 'card');
  const deciding = data.card.filter((c) => c.decides).sort((a, b) => a.decides - b.decides);
  assert.ok(deciding.length > 0, 'the card marks what decides');
  const trs = openingTags(card.body, /<tr ([^>]*\bdata-req="[^"]*"[^>]*)>/g).map((t) => t.attrs['data-req']);
  assert.deepEqual(trs, deciding.map((c) => c.requirement), 'exactly the deciding rows, in the card\'s order');
  assert.ok(card.body.includes('href="/operations/ops-018-the-house-card"'), 'the card links its document');
  assert.match(card.body, /The full card — every requirement, with sources — is/);

  // the template link, at the bottom of the panel area
  const tl = openingTags(built, /<a ([^>]*\bid="pq-new"[^>]*)>/g);
  assert.equal(tl.length, 1, 'one link to open a new opportunity');
  assert.equal(tl[0].attrs.href, '/templates#opp', 'it points at the opportunity template on /templates');
  if (existsSync(BUILT_TEMPLATES)) assert.match(readFileSync(BUILT_TEMPLATES, 'utf8'), /id="opp"/, '/templates has the #opp anchor');
  assert.ok(tl[0].index > panels[panels.length - 1].index, 'below the panels');
});

test('the script shows exactly one panel and one funnel for each kind and view', { skip: notBuilt }, () => {
  const built = readFileSync(BUILT, 'utf8');
  const scripts = [...built.matchAll(/<script>([\s\S]*?)<\/script\s*>/gi)].map((x) => x[1]);
  const script = scripts.find((s) => s.includes('pq-panel'));
  assert.ok(script, 'the page has its switching script');
  // a stand-in DOM: the buttons, panels and funnels the built page holds
  const el = (attrs) => {
    const e = { attrs: { ...attrs }, hidden: 'hidden' in attrs, listeners: {} };
    e.dataset = Object.fromEntries(Object.entries(attrs).filter(([k]) => k.startsWith('data-')).map(([k, v]) => [k.slice(5), v]));
    e.setAttribute = (k, v) => { e.attrs[k] = String(v); };
    e.getAttribute = (k) => e.attrs[k] ?? null;
    e.addEventListener = (ev, fn) => { (e.listeners[ev] ??= []).push(fn); };
    e.click = () => { for (const f of e.listeners.click ?? []) f(); };
    return e;
  };
  const kindBtns = openingTags(built, /<button ([^>]*\bdata-k="[^"]*"[^>]*)>/g).map((t) => el(t.attrs));
  const viewBtns = openingTags(built, /<button ([^>]*\bdata-v="[^"]*"[^>]*)>/g).map((t) => el(t.attrs));
  const panels = panelSlices(built).map((p) => el(p.attrs));
  const funnels = funnelSlices(built).map((f) => el(f.attrs));
  const kpis = openingTags(built, /<div ([^>]*\bpq-kpis\b[^>]*)>/g).map((t) => el(t.attrs));
  const SEL = { '#pq-kind button': kindBtns, '#pq-view button': viewBtns, '.pq-panel': panels, '.pq-fun': funnels, '.pq-kpis': kpis };
  const document = { querySelectorAll: (s) => { assert.ok(SEL[s], `selector ${s} is known`); return SEL[s]; } };
  new Function('document', script)(document);
  const shown = () => panels.filter((p) => !p.hidden).map((p) => `${p.dataset.view}/${p.dataset.kind}`);
  assert.deepEqual(shown(), ['timeline/all']);
  const pick = (btns, key, v) => btns.find((b) => b.dataset[key] === v).click();
  for (const k of kindBtns.map((b) => b.dataset.k)) {
    pick(kindBtns, 'k', k);
    for (const v of viewBtns.map((b) => b.dataset.v)) {
      pick(viewBtns, 'v', v);
      assert.deepEqual(shown(), [`${v}/${v === 'card' ? 'any' : k}`], `${k} · ${v}: one panel`);
      assert.deepEqual(kindBtns.filter((b) => b.attrs['aria-pressed'] === 'true').map((b) => b.dataset.k), [k]);
      assert.deepEqual(viewBtns.filter((b) => b.attrs['aria-pressed'] === 'true').map((b) => b.dataset.v), [v]);
      assert.deepEqual(funnels.filter((x) => !x.hidden).map((x) => x.dataset.kind), [k], 'the funnel follows the kind');
      assert.deepEqual(kpis.filter((x) => !x.hidden).map((x) => x.dataset.kind), [k], 'the figures follow the kind');
    }
  }
});
