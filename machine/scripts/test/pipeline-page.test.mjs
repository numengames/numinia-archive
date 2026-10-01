#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// pipeline-page.test.mjs — /system/pipeline states no figure of its own.
//
// The page reads opportunities/ through the sales kit's own tool at build
// time (web/src/lib/pipeline.ts) and renders every panel — one per kind and
// view — as real HTML; its inline script only chooses which one shows. So
// the checks here are: the library calls the tool and fails the build on a
// breach; the page types no amount and composes no address; the built page
// carries the tool's figures unchanged, both button rows, one panel per kind
// and view with only the default (All · What's due) visible, a one-line note
// for a kind with no record and never a table beside it; and the script,
// run against the built markup in a minimal stand-in for the DOM, shows
// exactly one panel for each choice of kind and view.
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
/** The slice of html from one panel's opening tag to the next panel's (or the next section). */
function panelSlices(html) {
  const tags = openingTags(html, /<div ([^>]*\bpq-panel\b[^>]*)>/g);
  const end = html.indexOf('How this page is made');
  return tags.map((t, i) => ({ ...t, body: html.slice(t.index, i + 1 < tags.length ? tags[i + 1].index : end) }));
}

test('the built page carries the real folder through the tool', { skip: notBuilt }, async () => {
  const built = readFileSync(BUILT, 'utf8');
  const m = built.match(/id="pq-data"[^>]*>([\s\S]*?)<\/script>/);
  assert.ok(m, 'the data island is in the built page');
  const data = JSON.parse(m[1]);
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
  for (const h of ['## Key figures', '## What\'s due', '## Every record', '## Funnel', '## Asked / we have']) assert.ok(md.includes(h), `the twin has ${h}`);
});

test('two button rows choose one panel; the default is server-rendered', { skip: notBuilt }, async () => {
  const built = readFileSync(BUILT, 'utf8');
  const data = JSON.parse(built.match(/id="pq-data"[^>]*>([\s\S]*?)<\/script>/)[1]);
  const kinds = data.kinds.map((k) => k.kind);
  const kindBtns = openingTags(built, /<button ([^>]*\bdata-k="[^"]*"[^>]*)>/g);
  const viewBtns = openingTags(built, /<button ([^>]*\bdata-v="[^"]*"[^>]*)>/g);
  assert.deepEqual(kindBtns.map((b) => b.attrs['data-k']), ['all', ...kinds], 'Kind: All, then every kind of the register');
  assert.deepEqual(viewBtns.map((b) => b.attrs['data-v']), ['due', 'timeline', 'funnel', 'card'], 'View: what\'s due, timeline, funnel, asked / we have');
  assert.deepEqual(kindBtns.filter((b) => b.attrs['aria-pressed'] === 'true').map((b) => b.attrs['data-k']), ['all']);
  assert.deepEqual(viewBtns.filter((b) => b.attrs['aria-pressed'] === 'true').map((b) => b.attrs['data-v']), ['due']);

  const panels = panelSlices(built);
  assert.equal(panels.length, 3 * (kinds.length + 1) + 1, 'one panel per kind for three views, one card for all');
  const visible = panels.filter((p) => !('hidden' in p.attrs));
  assert.deepEqual(visible.map((p) => `${p.attrs['data-view']}/${p.attrs['data-kind']}`), ['due/all'], 'without a script, All · What\'s due shows');
  for (const r of data.due) assert.ok(visible[0].body.includes(`href="/opportunities/${r.id.toLowerCase()}"`), `${r.id} is due and in the default panel`);

  // a kind with no record: one line, and never a table or a card beside it
  for (const p of panels) {
    const k = p.attrs['data-kind'];
    if (k === 'any' || k === 'all') continue;
    const n = data.byKind[k].records;
    if (n === 0) {
      assert.match(p.body, /Nothing of this kind yet\./, `${k}/${p.attrs['data-view']} says so`);
      assert.doesNotMatch(p.body, /<table|pq-card|pq-g-row|pq-f-row/, `${k}/${p.attrs['data-view']} has nothing under the note`);
    } else {
      assert.doesNotMatch(p.body, /Nothing of this kind yet/, `${k}/${p.attrs['data-view']} has records`);
    }
  }

  // the funnel bars carry the tool's counts
  const fAll = panels.find((p) => p.attrs['data-view'] === 'funnel' && p.attrs['data-kind'] === 'all');
  const counts = [...fAll.body.matchAll(/class="pq-f-n"[^>]*>(\d+)</g)].map((x) => Number(x[1]));
  assert.deepEqual(counts, data.funnel.all, 'the funnel for All is figures.funnel.all');
  // the card: one row per requirement of OPS-018, with its state mark
  const card = panels.find((p) => p.attrs['data-view'] === 'card');
  assert.deepEqual(openingTags(card.body, /<tr ([^>]*\bdata-req="[^"]*"[^>]*)>/g).map((t) => t.attrs['data-req']), data.card.map((c) => c.requirement));
  assert.ok(card.body.includes('href="/operations/ops-018-the-house-card"'), 'the card links its document');
});

test('the script shows exactly one panel for each kind and view', { skip: notBuilt }, () => {
  const built = readFileSync(BUILT, 'utf8');
  const scripts = [...built.matchAll(/<script>([\s\S]*?)<\/script\s*>/gi)].map((x) => x[1]);
  const script = scripts.find((s) => s.includes('pq-panel'));
  assert.ok(script, 'the page has its switching script');
  // a stand-in DOM: the buttons and panels the built page holds
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
  const kpis = openingTags(built, /<div ([^>]*\bpq-kpis\b[^>]*)>/g).map((t) => el(t.attrs));
  const SEL = { '#pq-kind .cq-tab': kindBtns, '#pq-view .cq-tab': viewBtns, '.pq-panel': panels, '.pq-kpis': kpis };
  const document = { querySelectorAll: (s) => { assert.ok(SEL[s], `selector ${s} is known`); return SEL[s]; } };
  new Function('document', script)(document);
  const shown = () => panels.filter((p) => !p.hidden).map((p) => `${p.dataset.view}/${p.dataset.kind}`);
  assert.deepEqual(shown(), ['due/all']);
  const pick = (btns, key, v) => btns.find((b) => b.dataset[key] === v).click();
  for (const k of kindBtns.map((b) => b.dataset.k)) {
    pick(kindBtns, 'k', k);
    for (const v of viewBtns.map((b) => b.dataset.v)) {
      pick(viewBtns, 'v', v);
      assert.deepEqual(shown(), [`${v}/${v === 'card' ? 'any' : k}`], `${k} · ${v}: one panel`);
      assert.deepEqual(kindBtns.filter((b) => b.attrs['aria-pressed'] === 'true').map((b) => b.dataset.k), [k]);
      assert.deepEqual(viewBtns.filter((b) => b.attrs['aria-pressed'] === 'true').map((b) => b.dataset.v), [v]);
      assert.deepEqual(kpis.filter((x) => !x.hidden).map((x) => x.dataset.kind), [k], 'the figures follow the kind');
    }
  }
});
