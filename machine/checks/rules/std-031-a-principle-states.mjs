#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-031-a-principle-states — the check of STD-031 for what a principle
// leaves out. Whether a principle states, argues and leaves the reader able
// to act is read by the reviewers (the reading list in the pull request
// template); what it must not carry can be found by a machine, and is.
//
// STA-006  No tool: a vendor, product or application named in the prose.
//          The list below is built from the tools the repository itself
//          names (its suppliers, its stack, its agents' runtimes). Matched as
//          a whole word, case-sensitive, so "notion" and "node" pass.
// STA-007  No clock, no byline: a four-digit year (19xx/20xx), an ISO date,
//          a month name with a day (English or Spanish), an hour (10:00,
//          9 am), and a person's name by the sales kit's own detector
//          (personNames() in machine/packages/sales-kit/pipeline.mjs).
// STA-011  Document names at the foot: a bare document id (PRI-004,
//          STD-031) anywhere before the References section. A section
//          cited by number is CIT-050's (std-021-evidence-and-citation).
// STA-012  The manual names the world: a Spanish name from the manual's
//          glossary (lore/game/manual/glossary-es-en.md, every table headed
//          `| Español | English |`) written in an English principle outside
//          a «quotation». A name the same in both languages is not a term.
//
// Read: every tracked principles/*.md that is not apparatus, a template or
// withdrawn. A finding in a principle whose own header is not `active` is
// marked on trial: it warns and never blocks, even with STD-031 in force.
// Never read: the header, HTML comments (the licence block),
// fenced code, a link's address, a bare URL, and the References section to
// the next `## ` heading. Positions are kept, so every finding names its line.
//
// Run from anywhere: node machine/checks/rules/std-031-a-principle-states.mjs

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { execute, isMain } from '../lib/guard.mjs';
import { ROOT, rawFM, loadRules, prefixToDir, isApparatus, isTemplate } from '../../scripts/lib/frontmatter.mjs';
import { personNames } from '../../packages/sales-kit/pipeline.mjs';

export const meta = { family: 'STA', plates: ['STA-006', 'STA-007', 'STA-011', 'STA-012'] };

/* ---------- STA-006: the tools the repository names ---------- */

// Case-sensitive, whole words. Ambiguous English words (Linear, Unity, Word,
// Meta, Apple, Steam) are left out: a false alarm on a common word teaches
// people to ignore the check.
export const TOOLS = [
  'GitHub', 'GitLab', 'Git', 'git', 'Cloudflare', 'Astro', 'Notion', 'Discord', 'Hermes', 'Claude', 'ChatGPT',
  'OpenAI', 'Anthropic', 'Gemini', 'Copilot', 'Hyperfy', 'thirdweb', 'Stripe', 'AWS', 'Amazon Web Services',
  'Obsidian', 'Figma', 'Slack', 'Google', 'Gmail', 'npm', 'Node.js', 'Node', 'LiveKit', 'OVH', 'OVHcloud',
  'DocuSign', 'LastPass', 'Microsoft', 'Roll20', 'Telegram', 'WhatsApp', 'Vercel', 'Netlify', 'Docker',
  'Jira', 'Trello', 'Excel', 'Zoom', 'YouTube', 'Twitter', 'Instagram', 'LinkedIn', 'Facebook', 'Patreon',
  'Twitch', 'Blender', 'Unreal', 'Midjourney', 'ElevenLabs', 'Dependabot', 'Playwright', 'Ethereum',
  'MetaMask', 'Supabase', 'Firebase', 'Cursor',
];
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const word = (alts) => new RegExp(`(?<![\\p{L}\\p{N}_.-])(?:${alts.map(esc).join('|')})(?![\\p{L}\\p{N}_-]|\\.[\\p{L}])`, 'gu');
const TOOL_RE = word([...TOOLS].sort((a, b) => b.length - a.length));

/* ---------- STA-007: the clock ---------- */

const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December'
  + '|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre';
const DAY = '(?:[12]\\d|3[01]|0?[1-9])(?:st|nd|rd|th)?';
const CLOCK = [
  ['an ISO date', /(?<![\d-])(?:19|20)\d{2}-[01]\d-[0-3]\d(?![\d])/g],
  ['a month with a day', new RegExp(`\\b(?:(?:${MONTHS})\\s+${DAY}|${DAY}\\s+(?:of\\s+|de\\s+)?(?:${MONTHS}))\\b`, 'g')],
  ['a year', /(?<![\d,.\-:/])(?:19|20)\d{2}(?![\d,.\-:/]\d|\d)/g],
  ['an hour', /(?<![\d:])(?:(?:[01]?\d|2[0-3]):[0-5]\d(?![\d:])|(?:1[0-2]|0?[1-9])\s?(?:am|pm|a\.m\.|p\.m\.)(?![\p{L}]))/gu],
];

/* ---------- STA-011: document ids ---------- */

const DOC_PREFIXES = [...new Set([...Object.keys(prefixToDir(loadRules())), 'CAN', 'BLU', 'HIS'])];
const ID_RE = new RegExp(`\\b(?:${DOC_PREFIXES.join('|')})-\\d{3,4}\\b`, 'g');

/* ---------- STA-012: the manual's glossary ---------- */

export const GLOSSARY = 'lore/game/manual/glossary-es-en.md';
const clean = (s) => s.replace(/\([^)]*\)/g, '').replace(/\*/g, '').trim();
const alternatives = (cell) => cell.split(/\s+\/\s+|,\s+/).map(clean).filter(Boolean);

/** Spanish name → English name, from every `| Español | English |` table of
 *  the manual's glossary. Alternatives split on " / "; parentheses dropped;
 *  a name the same in both languages, or shorter than four letters (PJ, LAP),
 *  is not a term. */
export function glossaryTerms(file = path.join(ROOT, GLOSSARY)) {
  const out = new Map();
  let inTable = false;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    if (/^\|\s*Español\s*\|\s*English\s*\|/.test(line)) { inTable = true; continue; }
    if (!line.startsWith('|')) { inTable = false; continue; }
    if (!inTable || /^\|\s*-/.test(line)) continue;
    const [es, en] = line.split('|').slice(1, 3).map((c) => c.trim());
    if (!es || !en) continue;
    const ens = alternatives(en.replace(/:.*$/, ''));
    const lowEn = new Set(ens.map((e) => e.toLowerCase()));
    for (const name of alternatives(es.replace(/:.*$/, ''))) {
      if (name.length < 4 || lowEn.has(name.toLowerCase()) || /^(?:de|del|la|el)\s/.test(name)) continue;
      if (!out.has(name)) out.set(name, ens[0] ?? en);
    }
  }
  return out;
}

let _terms = null;
const terms = () => {
  if (!_terms) {
    const g = glossaryTerms();
    const names = [...g.keys()].sort((a, b) => b.length - a.length);
    _terms = { g, re: word(names) };
  }
  return _terms;
};

/* ---------- reading a principle ---------- */

const blank = (m) => m.replace(/[^\n]/g, ' ');

/** The prose of a principle, with every place the rules do not read blanked
 *  out character for character, so an index still names its line. */
export function prose(text) {
  let t = text;
  const raw = rawFM(text);
  if (raw) {
    const end = text.indexOf(raw) + raw.length + '\n---'.length;
    t = blank(text.slice(0, end)) + text.slice(end);
  }
  t = t
    .replace(/<!--[\s\S]*?-->/g, blank)
    .replace(/```[\s\S]*?```/g, blank)
    .replace(/(\]\()([^)\s]*)(\))/g, (m, a, url, b) => a + ' '.repeat(url.length) + b)
    .replace(/https?:\/\/\S+/g, blank);
  const lines = t.split('\n');
  let inRefs = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^##\s/.test(lines[i])) inRefs = /^##\s+(?:\d+\.\s+)?References\b/.test(lines[i]);
    if (inRefs) lines[i] = ' '.repeat(lines[i].length);
  }
  return lines.join('\n');
}

const lineOf = (t, idx) => t.slice(0, idx).split('\n').length;

function read(rel, text) {
  const out = [];
  const t = prose(text);
  const at = (plate, idx, what) => out.push({ plate, what, where: `${rel}:${lineOf(t, idx)}` });

  for (const m of t.matchAll(TOOL_RE)) at('STA-006', m.index, `"${m[0]}" names a tool — state the capability; the tool belongs in the system notes or a procedure`);

  const taken = [];
  for (const [kind, re] of CLOCK) {
    for (const m of t.matchAll(re)) {
      const from = m.index, to = m.index + m[0].length;
      if (taken.some(([a, b]) => from < b && to > a)) continue;
      taken.push([from, to]);
      at('STA-007', from, `"${m[0]}" is ${kind} — a principle keeps no clock`);
    }
  }
  const seen = new Set();
  for (const name of personNames(t)) {
    const re = new RegExp(name.split(/\s+/).map(esc).join('\\s+'), 'u');
    const m = re.exec(t);
    const key = `${name}@${m ? m.index : -1}`;
    if (seen.has(key)) continue;
    seen.add(key);
    at('STA-007', m ? m.index : 0, `"${name}" reads as a person's name — a principle carries no byline`);
  }

  for (const m of t.matchAll(ID_RE)) at('STA-011', m.index, `"${m[0]}" mid-prose — name the document in words; its code goes in the header and the References table`);

  const { g, re } = terms();
  const unquoted = t.replace(/«[^»\n]*»/g, blank).replace(/`[^`\n]*`/g, blank);
  for (const m of unquoted.matchAll(re)) at('STA-012', m.index, `"${m[0]}" is the manual's Spanish — in English write "${g.get(m[0])}"`);

  return out.sort((a, b) => a.where.localeCompare(b.where, 'en', { numeric: true }));
}

export function run(corpus) {
  const findings = [];
  for (const rel of corpus.files) {
    if (!/^principles\/[^/]+\.md$/.test(rel)) continue;
    if (/\/(INDEX|README)\.md$/.test(rel)) continue;
    if (isApparatus(rel) || isTemplate(rel)) continue;
    const fm = corpus.fm(rel);
    if (!fm || fm.status === 'withdrawn') continue;
    if (fm.lang && fm.lang !== 'en') continue;   // the rule reads English principles
    // A principle not yet in force is on trial: under STD-031 in force its
    // findings warn and never block; once its own header says `active`, they
    // fail the build like any rule in force (regime.mjs, Findings).
    const onTrial = fm.status !== 'active';
    findings.push(...read(rel, corpus.text(rel)).map((f) => (onTrial ? { ...f, onTrial } : f)));
  }
  return findings;
}

if (isMain(import.meta)) await execute(import.meta, meta, run);
