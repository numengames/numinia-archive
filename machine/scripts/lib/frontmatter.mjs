// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT

/**
 * machine/scripts/lib/frontmatter.mjs — the one frontmatter reader and the one rules loader.
 *
 * Every guard, the telemetry instrument and the tools read a document's header
 * through parseFM(). It reads the subset of YAML the headers actually use, with
 * the semantics of YAML's failsafe schema: every scalar is text, a flow or block
 * sequence is an array of text, a block scalar (| or >) is text. Nothing is
 * typed by guessing — `version: 1.10` stays "1.10", `guild: no` stays "no",
 * `superseded_by: null` stays the word "null" for the guard that owns that
 * rule to judge. A mapping nested under a key, or a sequence of mappings, is
 * reported as the NESTED sentinel: no rule reads inside them, and a guard that
 * needs to will extend this reader rather than grow its own.
 *
 * One deliberate departure from failsafe: `key:` with nothing after it and no
 * indented children reads as '' (the empty header value a header rule reports),
 * not as null.
 *
 * Why not a YAML library: guards run in CI before any dependency is installed,
 * and the headers need none of YAML's typing. machine/scripts/test/frontmatter.test.mjs
 * compares this reader with js-yaml's failsafe schema over every tracked
 * document whenever web/node_modules is present; a disagreement is a test
 * failure, not a footnote.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

/** Sentinel for a key whose value is a nested mapping or a sequence of mappings. */
export const NESTED = '\u0000nested\u0000';

const FM_RE = /^---\s*\n([\s\S]*?)\n---(\n|$)/;
const KEY_RE = /^([A-Za-z_][A-Za-z0-9_.-]*):(?:\s+(.*))?$/;

/** One scalar written on a line: quotes stripped once, a trailing comment removed when unquoted. */
function scalar(raw) {
  const s = raw.trim();
  const q = /^"(.*)"\s*(#.*)?$/.exec(s) ?? /^'(.*)'\s*(#.*)?$/.exec(s);
  if (q) return q[1];
  return s.replace(/\s+#.*$/, '').trim();
}

/** Items of a flow sequence `[a, "b, c", d]`, quotes respected. */
function flowItems(inner) {
  const out = []; let cur = ''; let quote = null;
  for (const ch of inner) {
    if (quote) { cur += ch; if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'") { quote = ch; cur += ch; continue; }
    if (ch === ',') { if (cur.trim()) out.push(scalar(cur)); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(scalar(cur));
  return out;
}

const indentOf = (line) => /^[ \t]*/.exec(line)[0].length;

/**
 * Parse the frontmatter block of `text`. null if the text has no block.
 * Values: string | string[] | NESTED. Unknown lines are skipped, as a header
 * rule — not this reader — decides what to say about them.
 */
export function parseFM(text) {
  const m = text.match(FM_RE);
  if (!m) return null;
  const fields = {};
  const lines = m[1].split('\n');
  let i = 0;
  const nextContent = (from) => { let j = from; while (j < lines.length && !lines[j].trim()) j++; return j; };

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.startsWith('#') || indentOf(line) > 0) { i++; continue; }
    const kv = KEY_RE.exec(line);
    if (!kv) { i++; continue; }
    const key = kv[1];
    const rest = (kv[2] ?? '').trim();
    i++;

    /* Block scalar: `key: |` or `key: >`, children are the indented lines. */
    const block = /^([|>])([+-]?)\s*(#.*)?$/.exec(rest);
    if (block) {
      const body = [];
      while (i < lines.length && (!lines[i].trim() || indentOf(lines[i]) > 0)) body.push(lines[i++]);
      while (body.length && !body[body.length - 1].trim()) body.pop();
      const ind = Math.min(...body.filter((l) => l.trim()).map(indentOf), Infinity);
      const stripped = body.map((l) => l.slice(Math.min(ind, indentOf(l))));
      const joined = block[1] === '|' ? stripped.join('\n') : stripped.join(' ').replace(/ +/g, ' ');
      fields[key] = block[2] === '-' ? joined : `${joined}\n`;
      continue;
    }

    /* Flow sequence, possibly continued on the following lines until `]`. */
    if (rest.startsWith('[')) {
      let buf = rest;
      while (!/\]\s*(#.*)?$/.test(buf) && i < lines.length) buf += ` ${lines[i++].trim()}`;
      const inner = buf.slice(1, buf.lastIndexOf(']'));
      fields[key] = /[{[]/.test(inner.replace(/"[^"]*"|'[^']*'/g, '')) ? NESTED : flowItems(inner);
      continue;
    }

    /* Value on the same line. */
    if (rest !== '' && !rest.startsWith('#')) { fields[key] = scalar(rest); continue; }

    /* Nothing on the line: children decide. */
    const j = nextContent(i);
    if (j < lines.length && indentOf(lines[j]) > 0) {
      const items = [];
      let nested = false;
      while (i < lines.length && (!lines[i].trim() || indentOf(lines[i]) > 0)) {
        const l = lines[i++].trim();
        if (!l || l.startsWith('#')) continue;
        const item = /^-\s*(.*)$/.exec(l);
        if (!item || /^[A-Za-z_][A-Za-z0-9_.-]*:(\s|$)/.test(item[1])) nested = true;
        else items.push(scalar(item[1]));
      }
      fields[key] = nested ? NESTED : items;
    } else {
      fields[key] = '';
    }
  }
  return fields;
}

/** The raw frontmatter text (between the fences), or '' if none. */
export function rawFM(text) {
  const m = text.match(FM_RE);
  return m ? m[1] : '';
}

/** Body without the frontmatter block. */
export function stripFM(text) {
  return text.replace(/^---\s*\n[\s\S]*?\n---/, '');
}

let _rules = null;
/** rules.json, parsed once. */
export function loadRules() {
  if (!_rules) _rules = JSON.parse(readFileSync(path.join(ROOT, 'machine', 'scripts', 'lib', 'rules.json'), 'utf8'));
  return _rules;
}

/** Every top-level series key (has a naming scheme or not). */
export function seriesDirs(rules = loadRules()) {
  return Object.keys(rules.series).filter((k) => !k.startsWith('_'));
}

/** prefix → directory, including retired prefixes (for reference resolution). */
export function prefixToDir(rules = loadRules()) {
  const out = {};
  for (const dir of seriesDirs(rules)) for (const p of rules.series[dir].prefix) out[p] = dir;
  for (const [p, dir] of Object.entries(rules.retiredPrefixes)) if (!p.startsWith('_')) out[p] = dir;
  return out;
}

/** Is this tracked path apparatus (scaffolding around a series, not a member of it)? `fm` optional. */
export function isApparatus(rel, fm = null, rules = loadRules()) {
  const base = path.basename(rel);
  const a = rules.apparatus;
  if (a.basenames.includes(base)) return true;
  if (a.pathPatterns.some((p) => new RegExp(p).test(rel))) return true;
  return !!(fm && fm.type === 'meta');
}

/** Template files, whose dates are not held to the header's date rule. */
export function isTemplate(rel, rules = loadRules()) {
  return rules.apparatus.templatePatterns.some((p) => new RegExp(p).test(rel));
}
