// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT

/**
 * telemetry families `contradictions` (D4) and `figures` (D5). Counted and located, never touched.
 *
 * contradictions, layer 1 — extractor classes: a class is a claim the instrument knows how to
 *   extract; a contradiction is a class with ≥ 2 distinct values, every value located.
 *   Built: status_vocabulary, ci_guards_vs_ci_markers, id_form_per_series.
 *   Not built (no extractor yet, said here so nobody assumes it): pages_built, series_registered.
 * contradictions, layer 2 — verified register `machine/telemetry/claims.json`: found by reading (MIS-135),
 *   each entry carries path + exact quote; every run checks the quote → open (still there) ·
 *   resolved (gone from that file) · moved (gone there, found in another tracked .md).
 * figures — `live`: lines outside machine/telemetry/ that state a corpus-shaped figure with no
 *   `@ <head>` beside it (heuristic, predicate in the definition); `stale_citations`: cited
 *   `key = value @ head` whose value at HEAD differs from the cited one.
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../frontmatter.mjs';
import { ciScripts } from './corpus.mjs';
import { trackedFiles } from '../corpus.mjs';

const fig = (value, unit, definition) => ({ value, unit, definition });
const count = (m, k) => { m[k] = (m[k] ?? 0) + 1; };
const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;

export const contradictions = {
  measure({ docs, rules }) {
    // status_vocabulary: values used in frontmatter vs rules.json `status` (mirror of STD-016): every lifecycle list
    const declared = new Set(Object.entries(rules.status).filter(([k]) => !k.startsWith('_') || k === '_default').flatMap(([, v]) => v));
    const used = {}; const undeclared = {};
    for (const d of docs) { if (d.status == null) continue; count(used, d.status); if (!declared.has(d.status)) (undeclared[d.status] ??= []).push(d.path); }
    // ci_guards_vs_ci_markers: scripts the runner runs in CI vs scripts named in the Check tables of standards/
    const inCi = ciScripts(trackedFiles());
    const marked = []; const markedScripts = new Set();
    for (const std of docs.filter((d) => d.path.startsWith('standards/'))) {
      for (const m of std.text.matchAll(/^\|.*`([a-z0-9/-]+\.mjs)`.*$/gm)) {
        // A Check row cites either a bare filename (assumed machine/scripts/, the
        // shelf every guard sat on until R3) or a path with a slash already
        // in it (machine/guards/rules/…, machine/tools/…) — normalise only the bare form.
        const scripts = [...m[0].matchAll(/`([a-z0-9/-]+\.mjs)`/g)].map((x) => x[1].includes('/') ? x[1] : `machine/scripts/${x[1]}`);
        marked.push({ file: std.path, line: lineOf(std.text, m.index), scripts }); scripts.forEach((s) => markedScripts.add(s));
      }
    }
    const markedNotInCi = [...markedScripts].filter((s) => !inCi.includes(s));
    const inCiNotMarked = inCi.filter((s) => !markedScripts.has(s));
    // id_form_per_series: digit widths cited per prefix across the corpus
    const widths = {};
    const prefixes = Object.values(rules.series).flatMap((s) => s.prefix ?? []);
    const re = new RegExp(`\\b(${prefixes.join('|')})-(\\d{3,4})\\b`, 'g');
    for (const d of docs) for (const m of d.text.matchAll(re)) count((widths[m[1]] ??= {}), String(m[2].length));
    const mixed = Object.fromEntries(Object.entries(widths).filter(([, w]) => Object.keys(w).length > 1));
    // layer 2
    const reg = path.join(ROOT, 'machine/telemetry/claims.json');
    const claims = existsSync(reg) ? JSON.parse(readFileSync(reg, 'utf8')).claims : [];
    const byState = { open: 0, resolved: 0, moved: 0 }; const rows = [];
    for (const c of claims) {
      // the path may be outside the .md corpus (web/, config): read it from the tree
      const f = path.join(ROOT, c.path);
      const text = docs.find((d) => d.path === c.path)?.text ?? (existsSync(f) ? readFileSync(f, 'utf8') : '');
      const there = text.indexOf(c.quote);
      let state = 'resolved', where = null;
      if (there >= 0) { state = 'open'; where = `${c.path}#L${lineOf(text, there)}`; }
      else { const other = docs.find((d) => d.path !== c.origin && d.dir !== 'telemetry' && d.text.includes(c.quote)); if (other) { state = 'moved'; where = other.path; } }
      count(byState, state); rows.push({ id: c.id, severity: c.severity, state, where: where ?? c.path, claim: c.claim });
    }
    return {
      status_vocabulary_used: fig(used, 'documents', 'frontmatter status values in the corpus with counts'),
      status_vocabulary_undeclared: fig(undeclared, 'documents', 'status values in use that machine/scripts/lib/rules.json does not declare (STD-016 lifecycles), with the docs carrying them — a contradiction between a document and the vocabulary'),
      ci_markers_std001: fig(marked.length, 'rows', 'table rows of STD-001 carrying `[CI]`'),
      ci_marked_scripts_not_in_ci: fig(markedNotInCi, 'scripts', 'scripts a Check row of a standard names that the runner does not run in CI — a norm claiming a machine check that does not happen'),
      ci_scripts_not_marked: fig(inCiNotMarked, 'scripts', 'scripts the runner runs in CI that no Check row of any standard names — a check the norm does not claim'),
      id_form_per_series: fig(widths, 'citations', 'per series prefix, citations by digit width (3 vs 4) across the corpus; S1 fixes 4 for MIS files, 3 in `id:`'),
      id_form_mixed: fig(Object.keys(mixed), 'prefixes', 'prefixes cited with more than one digit width — the class is contradictory for these'),
      claims_open: fig(byState.open, 'claims', 'claims.json entries whose exact quote is still at its path'),
      claims_resolved: fig(byState.resolved, 'claims', 'entries whose quote is no longer in any tracked .md'),
      claims_moved: fig(byState.moved, 'claims', 'entries whose quote left its path and is found in another tracked .md — meaningful only for quotes unique to one file; a short quote (`status: draft`) can only be open or resolved at its own path'),
      claims: fig(rows, 'claims', 'the register, verified this run: id, severity (MIS-135: A norm↔norm/guard · B norm↔corpus · C housekeeping), state, where (path#line when open), claim'),
    };
  },
};

const HEAD_RE = /@\s*`?[0-9a-f]{7}`?/;
const FIGURE_RE = /\b\d{1,3}(?:[.,]\d{3})+\s*(?:tokens|documents?|docs|files|ficheros|documentos)\b|\b\d{1,4}\s*\/\s*\d{1,4}\b(?!\s*[·%]*\s*\d)|\b\d{1,3}(?:[.,]\d+)?\s*%|\b\d{1,4}\s+(?:missions?|misiones|documents?|documentos|docs|files|ficheros|tokens)\b/g;
const CITE_RE = /`([a-z]+\.[A-Za-z0-9_]+)\s*=\s*([^`@]+?)\s*@\s*([0-9a-f]{7})`/g;

export const figures = {
  measure({ docs, latest }) {
    const live = {}; let liveTotal = 0;
    const stale = [];
    for (const d of docs) {
      if (d.dir === 'telemetry' || d.apparatus) continue;
      const lines = d.text.split('\n'); let inCode = false;
      lines.forEach((l, i) => {
        if (/^\s*```/.test(l)) inCode = !inCode;
        if (inCode || /^---/.test(l) || i < 40 && /^[a-z_]+:/.test(l)) return;
        for (const m of l.matchAll(CITE_RE)) {
          const cur = latest?.figures?.[m[1]];
          if (cur && String(cur.value) !== m[2].trim()) stale.push([`${d.path}#L${i + 1}`, m[1], m[2].trim(), String(cur.value)]);
        }
        if (HEAD_RE.test(l)) return;
        if (FIGURE_RE.test(l)) { count(live, d.path); liveTotal++; }
      });
    }
    return {
      live: fig(liveTotal, 'lines', 'lines in non-apparatus docs outside machine/telemetry/ (frontmatter and code fences excluded) that state a corpus-shaped figure — "N tokens|documents|files|missions", "N/M", "N %" — with no `@ <7-hex head>` on the line. A detector, not a verdict: dated tables and closed records legitimately carry such lines'),
      live_by_doc: fig(Object.fromEntries(Object.entries(live).sort((a, b) => b[1] - a[1]).slice(0, 15)), 'lines', 'the fifteen docs with most such lines'),
      cited: fig(docs.reduce((n, d) => n + [...d.text.matchAll(CITE_RE)].length, 0), 'citations', 'citations in the §10.5 form `key = value @ head` across the corpus'),
      stale_citations: fig(stale, 'citations', 'cited `key = value @ head` whose value in latest.json at this HEAD differs from the cited value: [where, key, cited, current]. A stale citation is not an error — the head beside it says when it was true'),
    };
  },
};
