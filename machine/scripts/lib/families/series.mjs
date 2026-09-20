/**
 * telemetry family `series` — registration per series. MIS-138 D3.
 *
 * Reproduces count-evidence.py `matricula` (2026-09-02) key for key, with the
 * same exclusions: `_template/` dirs, `reports/evidence/` annexes, apparatus
 * (rules.json), frozen artefacts by FILENAME SHAPE (two of the five in the
 * corpus carry the shape and not the field — DBT-001, "El fallo frozen-artifact").
 * agents/ is folder-named, no register (ADR-005 v1.1.0).
 */
import { readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT, seriesDirs } from '../frontmatter.mjs';
import { sortedCounts } from '../corpus.mjs';

export function registrationBySeries(docs, rules) {
  const out = {};
  for (const dir of seriesDirs(rules)) {
    const sch = rules.series[dir];
    if (sch.naming === false) continue;
    const pat = new RegExp(`^(?:${sch.prefix.join('|')})-\\d{${sch.digits}}-`);
    const daily = sch.dailyDate ? /^RPT-\d{4}-\d{2}-\d{2}\.md$/ : null;
    let apparatus = 0, archived = 0; const sel = [];
    for (const d of docs) {
      if (d.dir !== dir || d.template_dir || d.evidence_annex) continue;
      if (d.apparatus) { apparatus++; continue; }
      if (d.archived) { archived++; continue; }
      sel.push(d);
    }
    const registered = sel.filter((d) => pat.test(d.base) || (daily && daily.test(d.base))).length;
    out[dir] = { registered, total: sel.length, apparatus, archived, pct: sel.length ? Math.round((1000 * registered) / sel.length) / 10 : null };
  }
  return sortedCounts(out);
}

export function measure({ docs, rules }) {
  const reg = registrationBySeries(docs, rules);
  const totals = Object.values(reg).reduce((a, r) => ({ registered: a.registered + r.registered, total: a.total + r.total }), { registered: 0, total: 0 });
  const agentsDir = path.join(ROOT, 'agents');
  const agents = existsSync(agentsDir) ? readdirSync(agentsDir, { withFileTypes: true }).filter((e) => e.isDirectory() && e.name !== '_template').length : 0;
  return {
    registration: { value: reg, unit: 'documents', definition: 'per series with a naming scheme (rules.json): documents whose filename matches `<PREFIX>-<NNN>-` (or the daily `RPT-<date>` form in reports/) over documents in the series — excluding `_template/`, `reports/evidence/`, apparatus and frozen artefacts (by filename shape). Same predicate as `count-evidence.py matricula`.' },
    registered_total: { value: totals.registered, unit: 'documents', definition: 'sum of `registration[*].registered`' },
    registrable_total: { value: totals.total, unit: 'documents', definition: 'sum of `registration[*].total`' },
    agents_folder_named: { value: agents, unit: 'directories', definition: 'directories under `agents/` other than `_template` — identified by folder name, no prefix by design (ADR-005 v1.1.0)' },
  };
}
