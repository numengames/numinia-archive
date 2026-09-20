/**
 * telemetry family `missions` — the board, counted. MIS-138 D3.
 * Predicates: `missions/MIS-*.md` by frontmatter; `## Closure` heading (MIS-134
 * strict form, tolerant form reported beside it).
 */
import { tally } from '../corpus.mjs';

const STRICT = /^## Closure\b/m;
const TOLERANT = /^## (Closure|Execution Reality|Real execution|What shipped|Premisas verificadas)\b/mi;
const NULLS = new Set(['', 'null', 'none', '~', '-', 'n/a', 'tba']);

export function missionDocs(docs) {
  return docs.filter((d) => d.dir === 'missions' && /^MIS-\d{4}-/.test(d.base) && d.has_fm);
}

export function measure({ docs }) {
  const ms = missionDocs(docs);
  const done = ms.filter((d) => d.status === 'done');
  const val = (d, k) => { const v = (d.fm[k] ?? '').trim(); return NULLS.has(v.toLowerCase()) ? null : v; };
  return {
    total: { value: ms.length, unit: 'missions', definition: 'files `missions/MIS-NNNN-*.md` with a frontmatter block' },
    by_status: { value: tally(ms, (d) => d.status), unit: 'missions', definition: 'by frontmatter `status`' },
    by_guild: { value: tally(ms, (d) => val(d, 'guild')), unit: 'missions', definition: 'by frontmatter `guild`; `(none)` when absent or null-like' },
    by_territory: { value: tally(ms, (d) => val(d, 'territory')), unit: 'missions', definition: 'by frontmatter `territory`; `TBA` folds into `(none)`, reported separately as `territory_tba`' },
    by_priority: { value: tally(ms, (d) => val(d, 'priority')), unit: 'missions', definition: 'by frontmatter `priority`' },
    by_effort: { value: tally(ms, (d) => val(d, 'effort')), unit: 'missions', definition: 'by frontmatter `effort`' },
    by_assignee: { value: tally(ms, (d) => val(d, 'assigned_to')), unit: 'missions', definition: 'by frontmatter `assigned_to`; `(none)` = unassigned' },
    territory_tba: { value: ms.filter((d) => (d.fm.territory ?? '').trim().toUpperCase() === 'TBA').length, unit: 'missions', definition: '`territory: TBA` (ADR-028 deferral; owner MIS-124 closed 2026-09-09, zero territory TBA remains)' },
    unassigned: { value: ms.filter((d) => val(d, 'assigned_to') === null).length, unit: 'missions', definition: '`assigned_to` absent or null-like' },
    in_progress_unassigned: { value: ms.filter((d) => d.status === 'in-progress' && val(d, 'assigned_to') === null).length, unit: 'missions', definition: '`status: in-progress` with no `assigned_to`' },
    done_without_closure: { value: done.filter((d) => !STRICT.test(d.text)).length, unit: 'missions', definition: '`status: done` with no `## Closure` heading (MIS-134 strict form)' },
    done_without_closure_tolerant: { value: done.filter((d) => !TOLERANT.test(d.text)).length, unit: 'missions', definition: '`status: done` with none of the five closure headings MIS-134 tolerates' },
    without_author: { value: ms.filter((d) => val(d, 'author') === null).length, unit: 'missions', definition: 'frontmatter `author` absent or null-like' },
    started_with_offset: { value: ms.filter((d) => /[+-]\d{2}:?\d{2}$/.test(d.fm.started ?? '')).length, unit: 'missions', definition: '`started` written with a UTC offset instead of `Z`' },
    started_zulu: { value: ms.filter((d) => /Z$/.test(d.fm.started ?? '')).length, unit: 'missions', definition: '`started` written in `Z`' },
  };
}
