#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// pipeline-page.test.mjs — /system/pipeline states no figure of its own.
//
// The page reads opportunities/ through the sales kit's own tool at build
// time (web/src/lib/pipeline.ts) and cuts the records in the browser. Two
// things are checked here without a browser: that the page's data island is
// the tool's figures and nothing else, and that the browser script — run
// against the kit's fixtures (won, lost, stale, overdue) in a minimal DOM —
// puts those figures in the tables and charts a reader sees. The fixtures
// have movement; the real folder may not yet.
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
const FIXTURES = path.join(ROOT, 'machine', 'packages', 'sales-kit', 'fixtures');
const TODAY = '2026-10-15';

test('the page states no figure: its data comes through the tool', () => {
  const lib = readFileSync(LIB, 'utf8');
  assert.match(lib, /machine", "packages", "sales-kit", "pipeline\.mjs"/, 'the page library imports the tool itself');
  assert.match(lib, /tool\.figures\(/, 'the figures are the tool\'s');
  assert.match(lib, /throw new Error\(`opportunities\/:/, 'a breach fails the build, as it fails CI');
  const page = readFileSync(PAGE, 'utf8');
  assert.doesNotMatch(page, /\b1[0-9],[0-9]{3}\b|€\s?\d/, 'no amount is typed in the page');
});

// ---- a DOM just wide enough for the page script ------------------------------
function makeDom(html) {
  // Elements: id, class, dataset, innerHTML/textContent, children, listeners.
  class El {
    constructor(tag, attrs = {}) { this.tag = tag; this.attrs = attrs; this.children = []; this.listeners = {}; this._html = ''; this.hidden = false; }
    get id() { return this.attrs.id ?? ''; }
    get className() { return this.attrs.class ?? ''; }
    set className(v) { this.attrs.class = v; }
    get classList() {
      const self = this;
      return {
        toggle(c, force) { const has = self.className.split(/\s+/).includes(c); const want = force ?? !has; self.className = self.className.split(/\s+/).filter((x) => x && x !== c).concat(want ? [c] : []).join(' '); },
        remove(c) { this.toggle(c, false); },
        add(c) { this.toggle(c, true); },
        contains(c) { return self.className.split(/\s+/).includes(c); },
      };
    }
    get dataset() { return Object.fromEntries(Object.entries(this.attrs).filter(([k]) => k.startsWith('data-')).map(([k, v]) => [k.slice(5), v])); }
    setAttribute(k, v) { this.attrs[k] = String(v); }
    getAttribute(k) { return this.attrs[k] ?? null; }
    get clientWidth() { return 0; }
    addEventListener(ev, fn) { (this.listeners[ev] ??= []).push(fn); }
    click() { for (const f of this.listeners.click ?? []) f(); }
    set innerHTML(h) { this._html = h; this.children = parseChildren(h); }
    get innerHTML() { return this._html; }
    set textContent(t) { this._html = t; this.children = []; }
    get textContent() { return this.children.length ? this.children.map((c) => c.textContent).join('') : this._html.replace(/<[^>]+>/g, ''); }
    querySelector(s) { return this.querySelectorAll(s)[0] ?? null; }
    querySelectorAll(s) { return select(this, s); }
  }
  class Text { constructor(t) { this.text = t; } get textContent() { return this.text; } get children() { return []; } get tag() { return '#text'; } get attrs() { return {}; } }
  const TAG = /<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>/g;
  function parseChildren(h) {
    const root = new El('#root'); const stack = [root]; let last = 0;
    for (const m of h.matchAll(TAG)) {
      const text = h.slice(last, m.index); if (text.trim()) stack.at(-1).children.push(new Text(decode(text)));
      last = m.index + m[0].length;
      const [, close, tag, rawAttrs, selfClose] = m;
      if (close) { if (stack.length > 1) stack.pop(); continue; }
      const attrs = {}; for (const a of rawAttrs.matchAll(/([\w-:]+)(?:="([^"]*)")?/g)) attrs[a[1]] = a[2] ?? '';
      const el = new El(tag.toLowerCase(), attrs); stack.at(-1).children.push(el);
      if (!selfClose && !['br', 'i', 'line', 'rect', 'text', 'input'].includes(tag.toLowerCase()) || tag.toLowerCase() === 'text') { if (!selfClose && !['br', 'input', 'line', 'rect'].includes(tag.toLowerCase())) stack.push(el); }
    }
    const tail = h.slice(last); if (tail.trim()) stack.at(-1).children.push(new Text(decode(tail)));
    return root.children;
  }
  const decode = (t) => t.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  function walk(el, out = []) { for (const c of el.children) { if (c instanceof El) { out.push(c); walk(c, out); } } return out; }
  function matches(el, part) {
    const m = part.match(/^([a-z]+)?(#[\w-]+)?((?:\.[\w-]+)*)((?:\[[^\]]+\])*)$/);
    if (!m) return false;
    const [, tag, id, classes, attrs] = m;
    if (tag && el.tag !== tag) return false;
    if (id && el.id !== id.slice(1)) return false;
    for (const c of classes.split('.').filter(Boolean)) if (!el.classList.contains(c)) return false;
    for (const a of attrs.matchAll(/\[([\w-]+)(?:="([^"]*)")?\]/g)) { if (!(a[1] in el.attrs)) return false; if (a[2] !== undefined && el.attrs[a[1]] !== a[2]) return false; }
    return true;
  }
  function select(root, selector) {
    // descendant combinators only; enough for the page
    const parts = selector.trim().split(/\s+/);
    let set = [root];
    for (const p of parts) set = set.flatMap((el) => walk(el).filter((e) => matches(e, p)));
    return [...new Set(set)];
  }
  const document = new El('#document'); document.innerHTML = html;
  document.getElementById = (id) => document.querySelector(`#${id}`);
  document.body = document;
  return { document, El };
}

function pageScript() {
  const page = readFileSync(PAGE, 'utf8');
  const m = page.match(/<script is:inline>\n([\s\S]*?)<\/script>/);
  assert.ok(m, 'the page has one inline script');
  return m[1];
}
function pageHtml() {
  // the markup between the two <section> tags, with the data island filled
  const page = readFileSync(PAGE, 'utf8');
  const body = page.slice(page.indexOf('<section'), page.indexOf('</Layout>'));
  return body;
}

test('the browser script puts the tool\'s figures where each reader looks', async () => {
  const tool = await import(TOOL);
  const reg = tool.loadRegister();
  const raw = tool.readFolder(FIXTURES);
  const figures = tool.figures(raw, reg, TODAY);
  const records = raw.filter((r) => r.fm).map((r) => ({ ...r.fm, value: Number(r.fm.value), slug: r.fm.id.toLowerCase(), transitions: r.transitions }));
  const html = pageHtml() + `<script id="pq-data" type="application/json">${JSON.stringify({ today: TODAY, register: reg, records, figures })}</script>`;
  const { document } = makeDom(html);
  const g = globalThis;
  const saved = { document: g.document, addEventListener: g.addEventListener, window: g.window };
  g.document = document; g.addEventListener = () => {}; g.window = { Event: class {} };
  try {
    new Function(pageScript())();
    const rows = (s) => document.querySelectorAll(`${s} tbody tr`).map((tr) => tr.querySelectorAll('td').map((td) => td.textContent.trim()));
    const kpis = () => document.querySelectorAll('#pq-kpis .cq-kpi').map((k) => [k.querySelector('.cq-k').textContent, k.querySelector('.cq-v').textContent]);
    // whoever sells
    const k = kpis();
    assert.equal(k.length, 4);
    assert.deepEqual(k.map((x) => x[1]), ['2', '1', '2', '1'], 'open, overdue, stale, proposals out — from the fixtures');
    const open = rows('#pq-open');
    assert.equal(open.length, 2, 'two open records');
    assert.equal(open[0][0], 'OPP-2026-002', 'the overdue one first');
    assert.match(open[0][4], /overdue/);
    assert.match(open[1][6], /stale/, 'the stale one second');
    // the funnel and the periods, everyone
    assert.equal(document.querySelectorAll('#pq-funnel rect').length, figures.funnel.length, 'one bar per open stage');
    const wonMonth = rows('#pq-ptable').find((r) => r[4] === '1');
    assert.ok(wonMonth && wonMonth[6] === '€18,000', 'the month with the win shows its value');
    document.querySelector('#pq-gran [data-g="year"]').click();
    const years = rows('#pq-ptable');
    assert.deepEqual(years.map((r) => r[0]), ['2026', '2025'], 'years, newest first');
    assert.equal(years[1][5], '1', '2025 lost one');
    // management
    document.querySelector('#pq-lens [data-l="manage"]').click();
    const m = kpis();
    assert.equal(m[1][1], `${figures.winRate} %`);
    assert.equal(m[2][1], `${figures.cycleDays} d`);
    assert.equal(m[3][1], '€18,000');
    assert.match(document.querySelector('#pq-stagedays').innerHTML, /--yellow/, 'a stage held past its days is flagged');
    assert.deepEqual(rows('#pq-reasons')[0], ['not-a-fit', '1']);
    // anyone
    document.querySelector('#pq-lens [data-l="anyone"]').click();
    assert.ok(document.querySelector('[data-lens="sell"]').classList.contains('cq-hidden'));
    assert.ok(document.querySelector('[data-lens="manage"]').classList.contains('cq-hidden'));
    assert.equal(rows('#pq-all').length, 4, 'every record');
    assert.doesNotMatch(document.textContent, /[\w.]+@[\w.]+\.\w{2,}/, 'no email on the page');
  } finally {
    Object.assign(g, saved);
  }
});

test('the built page carries the real folder through the tool', { skip: !existsSync(path.join(ROOT, 'web', 'dist', 'system', 'pipeline', 'index.html')) && 'web/dist not built' }, async () => {
  const built = readFileSync(path.join(ROOT, 'web', 'dist', 'system', 'pipeline', 'index.html'), 'utf8');
  const m = built.match(/id="pq-data"[^>]*>([\s\S]*?)<\/script>/);
  assert.ok(m, 'the data island is in the built page');
  const data = JSON.parse(m[1]);
  const tool = await import(TOOL);
  const raw = tool.readFolder(path.join(ROOT, 'opportunities'));
  assert.equal(data.records.length, raw.filter((r) => r.fm).length, 'as many records as the folder holds');
  assert.deepEqual(data.figures.byStage, tool.figures(raw, tool.loadRegister(), data.today).byStage, 'the same figures the tool computes today');
  assert.ok(existsSync(path.join(ROOT, 'web', 'dist', 'system', 'pipeline.md')), 'the markdown twin is built');
});
