#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-004-the-header — the guard of STD-004.
//
// The header in three rings. Every rule in the standard carries a plate;
// every finding here cites one. What cannot be expressed here the standard
// marks [MANUAL] — there is no third kind. Read STD-016 (the field register)
// side by side with the checks below: the mapping is 1:1 by construction.
//
// Two scopes, kept as their sources had them:
//   governed  tracked .md under the directories rules.json calls `governed` —
//             HDR-000..038, the ring contract (from lint-frontmatter, folded)
//   bound     tracked .md outside web/, not apparatus, not outward-facing —
//             HDR-040/043/044 (from check-core-rules, folded)
// The two overlap almost entirely; where they differ (agents/, templates)
// each plate keeps the reach its standard gave it.
//
// Not here: HDR-041 (YAML parses) is TXT-002's job in std-006; HDR-010/011/
// 015/016/042 are manual. check-templates reads the moulds against five
// standards at once and stays its own guard.
//
// Run from anywhere: node guards/rules/std-004-the-header.mjs

import { execute, isMain } from '../lib/guard.mjs';
import { loadRules, isTemplate, isApparatus } from '../../scripts/lib/frontmatter.mjs';
import { RING1, RING2, RING3, RING3_ALL } from '../../scripts/lib/rings.mjs';

export const meta = {
  family: 'HDR',
  plates: ['HDR-000', 'HDR-001', 'HDR-002', 'HDR-003', 'HDR-004', 'HDR-005', 'HDR-006', 'HDR-007',
    'HDR-008', 'HDR-009', 'HDR-012', 'HDR-013', 'HDR-014', 'HDR-017', 'HDR-018', 'HDR-019', 'HDR-020',
    'HDR-030', 'HDR-031', 'HDR-032', 'HDR-033', 'HDR-034', 'HDR-035', 'HDR-036', 'HDR-037', 'HDR-038',
    'HDR-040', 'HDR-043', 'HDR-044'],
};

const RULES = loadRules();
const GOVERNED = new Set(RULES.governed.dirs);
// lore/** is the reserved corpus (the RPG manual, the codex matter): prose
// the archive HOLDS, not documents it governs — no series, no header ring.
// Opaque to the rules, like reports/evidence/. Its regime is REUSE.toml's.
const OUTWARD = /^(AGENTS|CLAUDE|CONTRIBUTING|CHANGELOG|SECURITY|TRADEMARKS|README)\.md$|^\.github\/|^web\/|^lore\//;

/* Closed vocabularies. They live in rules.json so every guard reads one copy:
   a vocabulary duplicated per guard drifts silently, one guard at a time. */
const TYPES = RULES.types.all;
const TYPE_SERIES = RULES.types.series;
const LAX_TYPES = RULES.types.lax;
const STATUS = RULES.status;
const SUBTYPES = RULES.subtypes;
const PREFIX = Object.fromEntries(Object.entries(RULES.series)
  .filter(([k]) => !k.startsWith('_')).map(([k, v]) => [k, v.prefix]));

/* HDR-031: retired fields, each the object of a registered migration. */
const RETIRED = {
  area: 'renamed to territory',
  blocked_reason: 'orphaned when status blocked was removed',
  documento: 'Spanish-era key', ambito: 'Spanish-era key',
  estado: 'Spanish-era key', fecha: 'Spanish-era key',
  licencia: 'Spanish-era key', revision: 'Spanish-era key',
};

/* HDR-033..038: the closed vocabularies of the header, held by STD-001. Each
   drifted the same three ways before it was enforced: a Spanish value, a
   lowercase variant, a template comment glued to the value. */
const VOCAB = {
  guild: ['Sentinels', 'Alchemists', 'Exegetes', 'Procurators'],
  type_execution: ['digital', 'biological', 'hybrid'],
  visibility: ['public', 'restricted-oracle'],
  territory: ['CAO', 'Product', 'Platform', 'Infrastructure', 'Content', 'Sales', 'Funding', 'Archive'],
  priority: ['critical', 'high', 'medium', 'low'],
  effort: ['XS', 'S', 'M', 'L', 'XL'],
};
const VOCAB_PLATE = { guild: 'HDR-033', type_execution: 'HDR-034', visibility: 'HDR-035',
  territory: 'HDR-036', priority: 'HDR-037', effort: 'HDR-038' };

const ISO_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:?\d{2})$/;
const SEMVER = /^\d+\.\d+\.\d+$/;

/* `TBA` defers a value, and a deferral is legal only when something owns it:
   an unowned TBA is a parking space that nobody ever comes back to. A field
   defers by being listed here with its owner, or HDR-032 fires. Empty today —
   every deferral in the corpus has been resolved. */
const DEFERRED = 'TBA';
const DEFERRAL_OWNER = {};

/* HDR-017: documents whose type is honest but whose home is historical —
   moving them breaks live references. Registered with the reason, not
   parked in a baseline. */
const SETTLED_ELSEWHERE = new Set([
  'blueprints/AUDIT-2026-04-07-web-vs-repo.md',
  'blueprints/AUDIT-numengames-2026-04-08.md',
  'operations/OPS-009-secrets-handling.md',
  'operations/OPS-003-privacy-policy-numengames.md',
  'operations/OPS-004-terms-and-conditions-numengames.md',
]);

const RING1_PLATE = { id: 'HDR-001', title: 'HDR-002', type: 'HDR-003', status: 'HDR-004',
  version: 'HDR-005', created: 'HDR-006', updated: 'HDR-007', license: 'HDR-008' };

/* ---------- the ring contract (governed scope) ---------- */

function rings(corpus, out) {
  const F = (plate, where, what) => out.push({ plate, what, where });
  for (const rel of corpus.files) {
    const top = rel.split('/')[0];
    if (!GOVERNED.has(top)) continue;
    const fm = corpus.fm(rel);
    if (fm === null) { F('HDR-000', rel, 'no frontmatter — invisible to every instrument'); continue; }

    for (const [k, v] of Object.entries(fm))
      if (v === DEFERRED && !DEFERRAL_OWNER[k])
        F('HDR-032', rel, `"${k}: ${DEFERRED}" defers a value with no mission to resolve it — a deferral nobody owns is a parking space`);

    // HDR-009: empty is absent. `uid` is the exception — it is declared and
    // left empty on purpose until the UID system exists, so its emptiness is
    // a reservation, not an omission.
    for (const [k, v] of Object.entries(fm))
      if (v === '' && k !== 'uid') F('HDR-009', rel, `empty value written for "${k}" — omit the field instead`);

    for (const [field, allowed] of Object.entries(VOCAB)) {
      const v = fm[field];
      if (v === undefined || v === '' || v === DEFERRED) continue;
      // A TEMPLATE.md documents its options inline (`digital  # digital|hybrid`):
      // strip the comment before judging so the documentation survives.
      const bare = String(v).replace(/\s+#.*$/, '').trim();
      if (allowed.includes(bare)) continue;
      const near = allowed.find((a) => a.toLowerCase() === bare.toLowerCase());
      const hint = near ? ` — did you mean "${near}"?` : ` — allowed: ${allowed.join(' · ')}`;
      F(VOCAB_PLATE[field], rel, `${field}: "${v}" is not in the vocabulary${hint}`);
    }

    for (const k of RING1)
      if (!(k in fm) || fm[k] === '') {
        if (k === 'id' && fm.registration === 'exempt') continue;   // exempt: carries no id by declaration
        F(RING1_PLATE[k], rel, `missing mandatory field "${k}"`);
      }

    if (fm.id && fm.registration !== 'exempt') {
      const pfx = fm.id.match(/^([A-Z]+)-/)?.[1];
      if (!pfx) F('HDR-001', rel, `id "${fm.id}" does not match <PREFIX>-<NNN>`);
      else if (PREFIX[top] && ![].concat(PREFIX[top]).includes(pfx))
        F('HDR-001', rel, `id prefix "${pfx}" is not one of the prefixes ${top}/ may use`);
    }

    if (fm.type && !TYPES.includes(fm.type))
      F('HDR-003', rel, `type "${fm.type}" not in the closed vocabulary (STD-016)`);

    if (fm.status) {
      if (fm.status !== fm.status.toLowerCase()) F('HDR-019', rel, `status "${fm.status}" must be lowercase`);
      const life = STATUS[fm.type] || STATUS._default;
      if (!life.includes(fm.status.toLowerCase()))
        F('HDR-004', rel, `status "${fm.status}" not in the ${fm.type === 'mission' ? 'mission' : 'default'} lifecycle [${life.join(' ')}] (STD-016)`);
    }

    if (fm.version && !SEMVER.test(fm.version))
      F('HDR-005', rel, `version "${fm.version}" is not bare SemVer (no v prefix)`);

    // HDR-006/007: templates are exempt — their placeholder dates ARE the content.
    const tpl = isTemplate(rel);
    if (fm.created && !tpl) {
      if (!ISO_TIME.test(fm.created)) F('HDR-006', rel, `created "${fm.created}" lacks a real time (ISO 8601 with time)`);
      else if (/T00:00:00(\.0+)?Z?$/.test(fm.created)) F('HDR-006', rel, `created "${fm.created}" carries the midnight nobody wrote at — a date with no time is a guess wearing a timestamp`);
    }
    if (fm.updated && !tpl) {
      if (!ISO_TIME.test(fm.updated)) F('HDR-007', rel, `updated "${fm.updated}" lacks a real time`);
      else if (fm.created && ISO_TIME.test(fm.created) && fm.updated < fm.created)
        F('HDR-007', rel, `updated ${fm.updated} < created ${fm.created}`);
    }

    if (fm.provenance && !['human', 'ai-assisted', 'ai-generated'].includes(fm.provenance))
      F('HDR-012', rel, `provenance "${fm.provenance}" invalid`);
    if (fm.created_source && !/^(git:[0-9a-f]{7,40}|declared)$/.test(fm.created_source))
      F('HDR-013', rel, `created_source "${fm.created_source}" is neither git:<sha> nor declared`);
    if (fm.created_confidence && !['exact', 'inferred'].includes(fm.created_confidence))
      F('HDR-014', rel, `created_confidence "${fm.created_confidence}" invalid`);

    if (fm.type && TYPE_SERIES[fm.type] && TYPE_SERIES[fm.type] !== top && !LAX_TYPES.includes(fm.type)
        && !SETTLED_ELSEWHERE.has(rel))
      F('HDR-017', rel, `type "${fm.type}" belongs in ${TYPE_SERIES[fm.type]}/, found in ${top}/`);

    if (fm.subtype && SUBTYPES[fm.type] && !SUBTYPES[fm.type].includes(fm.subtype))
      F('HDR-018', rel, `subtype "${fm.subtype}" not registered for type ${fm.type}`);

    if (fm.uid && fm.uid !== '')
      F('HDR-020', rel, 'uid carries a hand-authored value — the field is reserved for a system that does not exist yet: keep it declared and empty');

    for (const k of Object.keys(fm))
      if (RETIRED[k]) F('HDR-031', rel, `retired field "${k}" (${RETIRED[k]})`);

    // HDR-030: the anti-entropy rule — a field in no ring is invalid.
    const allowed = new Set([...RING1, ...RING2, ...RING3_ALL, ...(RING3[top] || []), 'subtype']);
    for (const k of Object.keys(fm))
      if (!allowed.has(k) && !RETIRED[k])
        F('HDR-030', rel, `field "${k}" is in no ring and not registered for ${top}/ (STD-016, Ring 3)`);
  }
}

/* ---------- the header exists and lies about nothing (bound scope) ---------- */

function presence(corpus, out) {
  for (const rel of corpus.files) {
    if (OUTWARD.test(rel)) continue;
    const fm = corpus.fm(rel) ?? {};
    if (isApparatus(rel, fm)) continue;
    if (!corpus.text(rel).startsWith('---\n')) out.push({ plate: 'HDR-040', what: 'no frontmatter', where: rel });
    if (!fm.license) out.push({ plate: 'HDR-043', what: 'no licence declared', where: rel });
    // HDR-044: an unknown value is left empty, never guessed. `todo` is a
    // legitimate mission status, not a placeholder.
    for (const [k, v] of Object.entries(fm)) {
      if (typeof v !== 'string' || k === 'status') continue;
      if (/^(TBD|TODO|XXX|N\/A|\?+|<.*>|YYYY-MM-DD|unknown|placeholder)$/i.test(v.trim()))
        out.push({ plate: 'HDR-044', what: `${k} holds a placeholder: "${v}"`, where: rel });
    }
  }
}

export function run(corpus) {
  const out = [];
  rings(corpus, out);
  presence(corpus, out);
  return out;
}

if (isMain(import.meta)) await execute(import.meta, meta, run);
