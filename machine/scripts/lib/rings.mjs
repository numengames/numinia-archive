// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT

/**
 * machine/scripts/lib/rings.mjs — STD-004's three rings, in one place.
 *
 * MIS-145 v2 (2026-09-04). Until now this registry lived inside
 * the header guard (now machine/guards/rules/std-004-the-header.mjs), which was correct while that guard was its only
 * consumer. check-templates.mjs is the second: it applies HDR-030's rule one step
 * earlier — at the mould instead of at the documents copied from it — and a
 * second private copy of the registry is exactly the drift MIS-138 D1.1 moved
 * the vocabularies into rules.json to stop.
 *
 * Same reasoning, one difference: this registry stays as code rather than
 * moving into rules.json, because every entry here carries the comment that
 * says WHY a field was registered and by which decision. Those comments are
 * the record; JSON would drop them.
 */

/* ---------------- STD-004 HDR-030: the three rings ---------------- */

export const RING1 = ['id', 'title', 'type', 'status', 'version', 'created', 'updated', 'license'];
export const RING2 = ['author', 'owner', 'provenance', 'created_source', 'created_confidence',
  'requested_by', 'supersedes', 'superseded_by', 'derived_from'];

/** STD-004 Ring 3: the per-series extension registry. A field in no ring is HDR-030. */
export const RING3 = {
  'missions': ['priority', 'effort', 'assigned_to', 'started',
    // mission_id retired 2026-09-02 (missions/ normalisation): it duplicated
    // `id` in 58/58 files (TEMPLATE-CHANGES) and now appears in none.
    'completed', 'type_execution', 'freeze_reason', 'in_review_at',
    'depends_on', 'parent_mission', 'sub_missions', 'blocked_by',
    'requires_oracle_approval', 'human_approval_score', 'paths', 'context',
    'divergence_log',
    // registered 2026-08-30 (final sweep): provenance notes and series
    // metadata that were always written, never registered (STD-004 Ring 3)
    'phase', 'updated_note', 'executor', 'blocks', 'mission_mode',
    // MIS-132/133/134 (2026-09-02): a letter-suffixed sub-mission or an
    // unregistered proposal that entered the series keeps its old identifier
    // resolving (ADR-004 rule 4), same as reports/ and blueprints/.
    'former_id', 'former_id_note'],
  'reports': ['severity', 'period', 'subtype', 'model', 'agent', 'week', 'scope',
    // ADR-035: a document reshelved into reports/ from another series carries
    // where it came from (ADR-004 rule 4 never frees the old identifier) and,
    // when the move deliberately did not fix known-wrong content, says so.
    'former_id', 'former_id_note', 'accuracy_warning',
    'editorial_note', 'language', 'day_label', 'cost_estimate', 'context_load',
    'extraction_note',
    // registered 2026-09-08 (ADR-040, RPT-017 v0.2.0). Same load-bearing role
    // it has in decisions/, debt/ and standards/: the DEF-009 guard (std-012) reads
    // `absorbs` to keep an absorbed identifier resolving. RPT-017 is the
    // written resolution for every deleted `done` mission, so a report can
    // now be the absorbing document — a mission's story merges into the
    // narrative that compresses it, and its MIS-NNNN keeps landing there.
    'absorbs'],
  'decisions': ['deciders', 'consulted', 'outcome', 'decision',
    'context', 'pending_dark_council',
    // registered 2026-08-31 (MIS-127). `absorbs` is load-bearing, not a
    // note: the DEF-009 guard (std-012) reads it to keep absorbed identifiers
    // resolving, so a merged decision stays reachable (ADR-030). `amends`
    // records a decision that narrows a standard without superseding it.
    // `absorbs`, `amends` as above. Registered 2026-09-01 (ADR-036):
    // `threshold` marks a decision that itself sits at a sealed threshold
    // (it amends canon/, so it needs the Oracle's signature like the canon
    // does); `supersedes_record_of` names the retired files whose ONLY copy
    // of a record this decision inherited — the field is what makes deleting
    // an INDEX.md auditable instead of merely tidy.
    'absorbs', 'amends', 'threshold', 'supersedes_record_of'],
  'agents': ['role', 'platform', 'model', 'soul', 'agent',
    'previous_name', 'previous_name_note', 'translation_note',
    // agents/<agent>/skills/*/SKILL.md (AGENTS.md): the portable skill
    // format every agent platform reads. Both fields are required there.
    'name', 'description'],
  'debt': ['severity', 'severity_reason', 'detected', 'refuted', 'source_audit', 'opened_by',
    'visibility_reason',
    // registered 2026-08-31 (RPT-001 §12, the debt renumbering). Same
    // load-bearing role as in decisions/: the DEF-009 guard (std-012) reads
    // `absorbs` to keep a merged entry's original identifiers resolving,
    // so consolidating debt does not break every citation of it (ADR-030).
    'absorbs',
    'resolved_by', 'question_status', 'visibility_was', 'scope', 'supersedes_pending'],
  'blueprints': ['extraction_note', 'restoration_note', 'semaforo',
    'score', 'score_prev', 'scope', 'mission', 'input',
    'related_missions', 'contributors'],
  'operations': ['extraction_note', 'restoration_note',
    'language', 'language_note', 'review_flags', 'source_title'],
  'standards': ['supersedes_version', 'ratified_by', 'subtype', 'threshold',
    // series_change retired 2026-09-26: what a version changed is in the
    // changelog and in git, and the header kept a third copy of it.
    // registered 2026-09-05 (MIS-147). Same load-bearing role it already has
    // in decisions/ and debt/: the DEF-009 guard (std-012) reads `absorbs` to keep an
    // absorbed document's identifier resolving. STD-002 absorbed SYS-004, so a
    // standard can now be the absorbing document — the field had only ever
    // been needed where a record merged into a peer, and this is the first
    // time a system manual merged into the standard that governs it.
    'absorbs'],
  'canon': ['supersedes_version', 'ratified_by', 'threshold',
    'changelog', 'lore', 'extraction_note',
    // registered 2026-09-01 (ADR-036). `former_id`/`former_id_note` carry the
    // renumbering to the CAN- series exactly as they do in reports/ and
    // system/: ADR-004 rule 4 never frees an old identifier, so a renamed
    // document must say what it used to be called. The rest are CAN-005's
    // legacy Spanish header fields, migrated to English keys rather than
    // dropped — they encode the licensing canon's scope, authority and
    // downstream editions, and deleting them to satisfy a linter would have
    // destroyed the only record of where the distributed file and the public
    // guide live.
    'former_id', 'former_id_note', 'distributed_file', 'public_guide',
    'reasoned_edition', 'scope', 'out_of_scope', 'canonical_language',
    'normative_conventions', 'authority', 'revision_policy',
    // registered 2026-09-24 (ADR-057). Same load-bearing role it has in
    // decisions/, debt/, reports/ and standards/: the DEF-009 guard (std-012)
    // reads `absorbs` to keep an absorbed identifier resolving. CAN-004
    // absorbed CAN-003, so a canon can now be the absorbing document —
    // DEF-011's route out of a series, applied to canon for the first time.
    'absorbs'],
  'protocols': ['supersedes_version', 'ratified_by', 'applies_to', 'mandatory',
    'human_approval_score', 'mission', 'review_next'],
  // ADR-035: the two shelves MIS-129 opened. `former_id`/`former_id_note`
  // record a renumbering under ADR-004 rule 4 — the old identifier is never
  // freed, so a moved document must say where it came from.
  // `accuracy_warning` declares known-stale content the move did not edit.
  //
  // `fondos` and `graph` were registered here while SYS-003's frontmatter was
  // the database the /archive pages rendered. ADR-046 retired that model and
  // the pages now read STD-027 and STD-001, so both fields are unregistered:
  // a document that carries them again is restating a standard from memory,
  // which is what this vocabulary exists to catch.
  'system': ['extraction_note', 'restoration_note', 'mission',
    'former_id', 'former_id_note', 'accuracy_warning'],
  'history': ['former_id', 'former_id_note', 'supersedes_version'],
};

export const RING3_ALL = ['tags', 'visibility', 'guild', 'territory', 'registration',
  'registration_reason', 'registration_exemption', 'evidence_script',
  'evidence_head', 'related', 'uid'];

/** True when `field` is registered for a document living in `dir`. */
export function inSomeRing(field, dir) {
  return RING1.includes(field) || RING2.includes(field) || RING3_ALL.includes(field)
    || (RING3[dir] ?? []).includes(field);
}

/** STD-004: the lifecycle a document of `type` may declare. Two exist — a
 *  mission's and everyone else's; `rules.json status` mirrors the table.
 *  `dir` is kept in the signature for callers; it no longer decides. */
export function lifecycleFor(dir, type, rules) {
  return rules.status[type] ?? rules.status._default;
}

/** STD-004 / CIT-053: a record in a terminal state is a photograph — its
 *  citations are not walked, its shape is not judged. One set, read here. */
export function isTerminalStatus(status, rules) {
  return rules.status._terminal.includes(String(status ?? '').toLowerCase());
}

/** CIT-053: a photograph is a record whose claims are not rewritten — either
 *  because its status is terminal (STD-004) or because its series' threshold
 *  is `closed` from publication (STD-001: reports/). A mission's threshold is
 *  `closed` only when `done`, which its status already says. */
export function isPhotograph(rel, status, rules) {
  if (isTerminalStatus(status, rules)) return true;
  const top = String(rel).split('/')[0];
  return rules.series[top]?.threshold === 'closed' && top !== 'missions';
}
