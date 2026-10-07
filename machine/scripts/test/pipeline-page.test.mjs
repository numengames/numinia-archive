#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// pipeline-page.test.mjs — /system/pipeline states no figure of its own.
//
// The page reads opportunities/ through the sales kit's own tool at build
// time (web/src/lib/pipeline.ts) and renders every record as real HTML: the
// agenda (Today, Next 7 days, All open, Closed), a filter bar, a list with
// one row per record — what it is about, its next step, its deadline, its
// value and the tool's chance —, a timeline, the deciding requirements and
// the funnel per kind. Its script only places the tool's days against the
// reader's calendar, with the functions of web/src/lib/pipeline-agenda.mjs,
// which are proven here on their own. So the checks are: the library calls
// the tool and fails the build on a breach; the page types no amount, no
// requirement and composes no address; the built page carries the tool's
// figures unchanged; every record has its row with the tool's values; the
// agenda's rules hold on fixed days.
//
// Run: npm test  (needs web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';
import * as A from '../../../web/src/lib/pipeline-agenda.mjs';

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
  // the conversion is the tool's: the page never divides one step by another
  assert.doesNotMatch(page, /counts\[i\s*-\s*1\]|n\[i\s*-\s*1\]/, 'the page does not compute the conversion');
  // the chance is the tool's: the page never weighs a line or a win
  assert.doesNotMatch(page, /doneBefore|\.fits\b/, 'the page does not compute the chance');
  // which requirements decide is the card's mark, never a list typed in the page
  assert.doesNotMatch(page, /"Bidders' register"|'Bidders\\' register'|"Past works"/, 'no requirement is named in the page');
  assert.match(page, /from "@\/lib\/pipeline-agenda\.mjs"/, 'the script reads the reader\'s day through the tested functions');
  assert.doesNotMatch(page, /innerHTML/, 'the script writes text, never markup');
});

// ---- the reader's day, on fixed days -----------------------------------------
const C = { today: '2026-10-07' };
const row = (o) => ({ id: 'OPP-1', kind: 'sale', open: true, next: '', closes: '', closed: '', chance: 'medium', value: 0, q: '', ...o });

test('the agenda: late and today\'s steps are Today, the week holds steps and deadlines, closed apart', () => {
  const late = row({ next: '2026-10-05' }), today = row({ next: '2026-10-07' }), soon = row({ next: '2026-10-12' });
  const far = row({ next: '2026-12-01' }), deadline = row({ next: '2026-12-01', closes: '2026-10-10' }), closed = row({ open: false, closed: '2026-09-29' });
  assert.deepEqual([late, today, soon, far, closed].map((r) => A.inAgenda(r, 'today', C)), [true, true, false, false, false]);
  assert.deepEqual([late, today, soon, far, deadline, closed].map((r) => A.inAgenda(r, 'week', C)), [true, true, true, false, true, false]);
  assert.deepEqual([late, far, closed].map((r) => A.inAgenda(r, 'open', C)), [true, true, false]);
  assert.deepEqual([late, closed].map((r) => A.inAgenda(r, 'closed', C)), [false, true]);
  assert.deepEqual([late, today, soon, far, closed].map((r) => A.groupOf(r, C)), ['late', 'today', 'week', 'later', 'closed']);
  assert.equal(A.isLate(late, C), true);
  assert.equal(A.isLate(today, C), false, 'a step due today is not late yet');
});

test('the When filter: presets keep what falls in them and what is late; dates keep a range', () => {
  const late = row({ next: '2026-10-01' }), in20 = row({ next: '2026-10-27' }), dl = row({ next: '2027-01-01', closes: '2026-10-20' });
  const closed = row({ open: false, closed: '2026-09-29' });
  assert.deepEqual([late, in20, dl, closed].map((r) => A.inRange(r, '7', C)), [true, false, false, false]);
  assert.deepEqual([late, in20, dl, closed].map((r) => A.inRange(r, '30', C)), [true, true, true, false]);
  assert.deepEqual([late, in20, dl, closed].map((r) => A.inRange(r, 'custom', C, '2026-09-01', '2026-09-30')), [false, false, false, true]);
  assert.equal(A.inRange(in20, 'custom', C, '2026-10-20', ''), true, 'an open end');
  assert.equal(A.inRange(closed, 'any', C), true);
});

test('search, order and the words of a day', () => {
  const r = row({ q: 'opp-2026-001 a police academy training: a crime scene' });
  assert.equal(A.matches(r, 'Police  crime'), true);
  assert.equal(A.matches(r, 'police fire'), false);
  const rows = [row({ id: 'a', next: '2026-10-09', chance: 'low' }), row({ id: 'b', next: '2026-10-20', chance: 'high' }),
    row({ id: 'c', open: false, closed: '2026-09-01' }), row({ id: 'd', open: false, closed: '2026-09-29' }), row({ id: 'e', next: '2026-10-08', chance: 'medium' })];
  assert.deepEqual(A.sortRows(rows, 'date').map((x) => x.id), ['e', 'a', 'b', 'd', 'c'], 'open by day, then closed newest first');
  assert.deepEqual(A.sortRows(rows, 'chance').map((x) => x.id), ['b', 'e', 'a', 'd', 'c'], 'open by the tool\'s chance, then closed');
  assert.deepEqual(['2026-10-04', '2026-10-06', '2026-10-07', '2026-10-08', '2026-10-17'].map((d) => A.relative(d, C)), ['3 days late', '1 day late', 'today', 'tomorrow', 'in 10 days']);
  assert.equal(A.left('2026-10-01', C), 'passed');
  assert.equal(A.addDays('2026-10-25', 7), '2026-11-01', 'across the change of hour');
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
  for (const r of fig.records) if (r.operation) assert.ok(md.includes(r.operation.replace(/[\\|]/g, (c) => '\\' + c)), `${r.id}'s operation is in the twin`);
  const heads = ['## Funnel', '## Asked / we have', '## Key figures', '## What\'s due', '## Every record', '## Reasons lost', '## Days per stage'];
  const at = heads.map((h) => md.indexOf(h));
  for (const [i, h] of heads.entries()) assert.ok(at[i] > 0, `the twin has ${h}`);
  assert.deepEqual([...at].sort((a, b) => a - b), at, 'the twin opens with the funnel, then the deciding requirements, then the rest');
  for (const c of fig.card.filter((x) => x.decides)) assert.ok(md.includes(`| ${c.requirement} |`), `${c.requirement} is in the twin`);
  for (const c of fig.card.filter((x) => !x.decides)) assert.ok(!md.includes(`| ${c.requirement} |`), `${c.requirement} does not decide: only the card holds it`);
});

test('the agenda comes first, then the filters, then one row per record with the tool\'s values', { skip: notBuilt }, () => {
  const built = readFileSync(BUILT, 'utf8');
  const data = dataOf(built);
  const at = (s) => built.indexOf(s);
  assert.ok(at('id="pq-ag"') > 0 && at('id="pq-ag"') < at('id="pq-q"') && at('id="pq-q"') < at('id="pq-list"'), 'agenda, then filters, then the list');
  assert.ok(at('id="pq-list"') < at('class="pq-fun'), 'the funnel comes after the work');
  const agenda = openingTags(built, /<button ([^>]*\bdata-a="[^"]*"[^>]*)>/g);
  assert.deepEqual(agenda.map((b) => b.attrs['data-a']), ['today', 'week', 'open', 'closed']);
  assert.deepEqual(agenda.filter((b) => b.attrs['aria-pressed'] === 'true').map((b) => b.attrs['data-a']), ['today'], 'Today is pressed first');
  const kinds = openingTags(built, /<button ([^>]*\bdata-k="[^"]*"[^>]*)>/g).map((b) => b.attrs['data-k']);
  assert.deepEqual(kinds, ['all', ...data.kinds.map((k) => k.kind)], 'Kind: All, then every kind of the register');
  assert.deepEqual(openingTags(built, /<button ([^>]*\bdata-r="[^"]*"[^>]*)>/g).map((b) => b.attrs['data-r']), A.RANGES, 'When: the agenda module\'s ranges');
  assert.match(built, /id="pq-from"[^>]*type="date"|type="date"[^>]*id="pq-from"/, 'a range of dates');
  const views = openingTags(built, /<button ([^>]*\bdata-v="[^"]*"[^>]*)>/g);
  assert.deepEqual(views.map((b) => b.attrs['data-v']), ['list', 'timeline', 'card'], 'View: list, timeline, asked / we have');
  assert.deepEqual(views.filter((b) => b.attrs['aria-pressed'] === 'true').map((b) => b.attrs['data-v']), ['list']);
  assert.deepEqual(openingTags(built, /<button ([^>]*\bdata-s="[^"]*"[^>]*)>/g).map((b) => b.attrs['data-s']), ['date', 'chance'], 'order by date or by chance');

  const rows = slices(built, /<article ([^>]*\bpq-row\b[^>]*)>/g, 'id="pq-empty"');
  assert.deepEqual(new Set(rows.map((r) => r.attrs['data-id'])), new Set(data.records.map((r) => r.id)), 'every record has a row');
  const open = data.records.filter((r) => r.open).map((r) => r.id);
  assert.deepEqual(rows.slice(0, open.length).map((r) => r.attrs['data-id']).sort(), [...open].sort(), 'open records first, then closed');
  const by = Object.fromEntries(data.records.map((r) => [r.id, r]));
  for (const r of rows) {
    const x = by[r.attrs['data-id']];
    assert.equal(r.attrs['data-open'], x.open ? '1' : '0');
    assert.equal(r.attrs['data-next'], x.next?.date ?? '', `${x.id}: the tool's next day`);
    assert.equal(r.attrs['data-closes'], x.closes ? x.closes.slice(0, 10) : '', `${x.id}: the tool's deadline`);
    assert.equal(r.attrs['data-chance'], x.chance ?? '', `${x.id}: the tool's chance`);
    assert.equal(Number(r.attrs['data-value']), x.value);
    if (x.operation) assert.ok(r.body.includes('What:'), `${x.id} says what it is about`);
    if (x.chance) assert.match(r.body, new RegExp(`cq-ch--${x.chance}`), `${x.id} shows its chance`);
    assert.ok(r.body.includes(x.closes ? 'Deadline' : 'no deadline'), `${x.id} names its deadline or its absence`);
    assert.ok(r.attrs['data-q'].includes(x.id.toLowerCase()), 'the search reads the id');
  }
  const groups = openingTags(built, /<h3 ([^>]*\bpq-grp\b[^>]*)>/g).map((g) => g.attrs['data-g']);
  assert.deepEqual(groups, ['late', 'today', 'week', 'later', 'closed'], 'the list\'s groups, in order');
});

test('the timeline, the requirements and the funnel keep the tool\'s figures', { skip: notBuilt }, () => {
  const built = readFileSync(BUILT, 'utf8');
  const data = dataOf(built);
  const panels = openingTags(built, /<div ([^>]*\bpq-panel\b[^>]*)>/g);
  assert.deepEqual(panels.map((p) => p.attrs['data-view']), ['list', 'timeline', 'card']);
  assert.deepEqual(panels.filter((p) => !('hidden' in p.attrs)).map((p) => p.attrs['data-view']), ['list'], 'without a script, the list shows');
  const tl = openingTags(built, /<div ([^>]*\bpq-g-row\b[^>]*\bdata-id="[^"]*"[^>]*)>/g).map((t) => t.attrs['data-id']);
  assert.deepEqual(new Set(tl), new Set(data.records.map((r) => r.id)), 'every record on the timeline');
  const marks = (built.match(/class="pq-dot pq-dl-mark"/g) ?? []).length;
  assert.equal(marks, data.records.filter((r) => r.closes).length, 'one deadline mark per record with a deadline');
  assert.match(built, /pq-today/, 'a today line');
  assert.match(built, /Reasons lost/);
  assert.match(built, /Days per stage/);

  const card = slices(built, /<div ([^>]*\bid="pq-card"[^>]*)>/g, '<div class="pq-fun" ')[0];
  const deciding = data.card.filter((c) => c.decides).sort((a, b) => a.decides - b.decides);
  assert.ok(deciding.length > 0, 'the card marks what decides');
  const trs = openingTags(card.body, /<tr ([^>]*\bdata-req="[^"]*"[^>]*)>/g).map((t) => t.attrs['data-req']);
  assert.deepEqual(trs, deciding.map((c) => c.requirement), 'exactly the deciding rows, in the card\'s order');
  assert.ok(card.body.includes('href="/operations/ops-018-the-house-card"'), 'the card links its document');

  const funnels = slices(built, /<div ([^>]*\bpq-fun\b[^>]*)>/g, 'pq-feed');
  const kinds = data.kinds.map((k) => k.kind);
  assert.deepEqual(funnels.map((f) => f.attrs['data-kind']), ['all', ...kinds], 'one funnel per kind');
  assert.deepEqual(funnels.filter((f) => !('hidden' in f.attrs)).map((f) => f.attrs['data-kind']), ['all'], 'All shows without a script');
  for (const f of funnels) {
    const k = f.attrs['data-kind'];
    const steps = openingTags(f.body, /<div ([^>]*\bpq-step\b[^>]*)>/g).map((t) => t.attrs);
    assert.deepEqual(steps.map((s) => s['data-step']), data.steps.map((s) => s.step), `${k}: the five steps of the register`);
    assert.deepEqual(steps.map((s) => Number(s['data-n'])), data.funnel[k].counts, `${k}: the tool's counts`);
    assert.deepEqual(steps.map((s) => (s['data-cv'] === '' ? null : Number(s['data-cv']))), data.funnel[k].conversion, `${k}: the tool's conversions`);
    const [detected, , positive] = data.funnel[k].counts;
    const note = /No positive answer is on record yet: from now on every reply goes into its record(&#39;|')s timeline\./.test(f.body);
    assert.equal(note, detected > 0 && positive === 0, `${k}: the positive-answer note follows the data`);
  }

  const tlink = openingTags(built, /<a ([^>]*\bid="pq-new"[^>]*)>/g);
  assert.equal(tlink.length, 1, 'one link to open a new opportunity');
  assert.equal(tlink[0].attrs.href, '/templates#opp', 'it points at the opportunity template on /templates');
  if (existsSync(BUILT_TEMPLATES)) assert.match(readFileSync(BUILT_TEMPLATES, 'utf8'), /id="opp"/, '/templates has the #opp anchor');
});
