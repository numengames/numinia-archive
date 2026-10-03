// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT

/**
 * machine/scripts/lib/rings.mjs — STD-004's three rings, in one place.
 *
 * MIS-145 v2 (2026-09-04). Until now this registry lived inside
 * the header guard (now machine/guards/rules/std-004-the-header.mjs), which was correct while that guard was its only
 * consumer. check-templates.mjs is the second: it applies HDR-030's rule one step
 * earlier — at the template instead of at the documents copied from it — and a
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
export const RING2 = ['author', 'owner', 'digital_source_type', 'created_source', 'created_confidence',
  'requested_by', 'supersedes', 'superseded_by', 'derived_from'];

/** STD-004 Ring 3: the per-series extension registry. A field in no ring is HDR-030. */
export const RING3 = {
  'missions': ['priority', 'effort', 'assigned_to', 'started',
    // mission_id retired 2026-09-02 (missions/ normalisation): it duplicated
    // `id` in 58/58 files and now appears in none.
    // type_execution → executor and freeze_reason → hold_reason (2026-10-03):
    // the industry's words — ISO/IEC 22989 says human, Kanban says on hold.
    'completed', 'executor', 'hold_reason', 'in_review_at',
    'depends_on', 'parent_mission', 'sub_missions', 'blocked_by',
    'requires_oracle_approval', 'human_approval_score', 'paths', 'context',
    'divergence_log',
    // registered 2026-08-30 (final sweep): notes on origin and series
    // metadata that were always written, never registered (STD-004 Ring 3)
    'phase', 'updated_note', 'blocks', 'mission_mode',
    // MIS-132/133/134 (2026-09-02): a letter-suffixed sub-mission or an
    // unregistered proposal that entered the series keeps its old identifier
    // resolving (ADR-004 rule 4), same as reports/ and designs/.
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
    // (it amends principles/, so it needs the Oracle's signature like the principles
    // does); `supersedes_record_of` names the retired files whose ONLY copy
    // of a record this decision inherited — the field is what makes deleting
    // an INDEX.md auditable instead of merely tidy.
    'absorbs', 'amends', 'threshold', 'supersedes_record_of'],
  'agents': ['role', 'platform', 'model', 'soul', 'agent',
    'previous_name', 'previous_name_note', 'translation_note',
    // agents/<agent>/skills/*/SKILL.md (AGENTS.md): the portable skill
    // format every agent platform reads. Both fields are required there.
    'name', 'description',
    // agents/<agent>/AGENT.md, the entity card (agents/INDEX.md): what the
    // agent is and the files it is made of — the same shape as objects/.
    'entity', 'executor', 'forms',
    // agents/<agent>/OPERATOR.md (STD-017 AUT-065, rank sets the reach):
    // the level of automation the agent is operated at — one of the five
    // names of web/src/lib/automation-levels.ts (assisted · partial ·
    // conditional · high · full). Registered 2026-09-29; /automation reads it.
    'automation_level'],
  'debt': ['severity', 'severity_reason', 'detected', 'refuted', 'source_audit', 'opened_by',
    'visibility_reason',
    // registered 2026-08-31 (RPT-001 §12, the debt renumbering). Same
    // load-bearing role as in decisions/: the DEF-009 guard (std-012) reads
    // `absorbs` to keep a merged entry's original identifiers resolving,
    // so consolidating debt does not break every citation of it (ADR-030).
    'absorbs',
    'resolved_by', 'question_status', 'visibility_was', 'scope', 'supersedes_pending'],
  // semaforo deprecated 2026-10-03: a Spanish-era key no design ever carried.
  // former_id/former_id_note registered 2026-10-03 (ADR-067 cut 4): the series
  // took the prefix DES- for BLU-, and ADR-004 rule 4 never frees an old
  // identifier, so each document says what it used to be called.
  'designs': ['extraction_note', 'restoration_note', 'former_id', 'former_id_note',
    'score', 'score_prev', 'scope', 'mission', 'input',
    'related_missions', 'contributors'],
  // goods: an offer record's cards on sale, read by the site (STD-033
  // PAY-003: sites read the price from the record). 2026-09-29, OPS-014.
  'operations': ['extraction_note', 'restoration_note',
    'language', 'language_note', 'review_flags', 'source_title', 'goods'],
  // legal/ opened 2026-09-27 with the three texts operations/ held; they
  // bring their fields, and `former_id` keeps OPS-003/004/010 resolving.
  'legal': ['extraction_note', 'restoration_note',
    'language', 'language_note', 'review_flags', 'source_title',
    'former_id', 'former_id_note'],
  // threshold retired 2026-09-27: the series register (STD-001) states it
  // once per series; a header copy is the second source that drifts.
  // ratified_by → approved_by (2026-10-03): document control says approval.
  'standards': ['supersedes_version', 'approved_by', 'subtype',
    // series_change retired 2026-09-26: what a version changed is in the
    // changelog and in git, and the header kept a third copy of it.
    // registered 2026-09-05 (MIS-147). Same load-bearing role it already has
    // in decisions/ and debt/: the DEF-009 guard (std-012) reads `absorbs` to keep an
    // absorbed document's identifier resolving. STD-002 absorbed SYS-004, so a
    // standard can now be the absorbing document — the field had only ever
    // been needed where a record merged into a peer, and this is the first
    // time a system manual merged into the standard that governs it.
    'absorbs'],
  'principles': ['supersedes_version', 'approved_by',
    'changelog', 'lore', 'extraction_note',
    // registered 2026-09-01 (ADR-036). `former_id`/`former_id_note` carry the
    // renumbering to the CAN- series exactly as they do in reports/ and
    // system/: ADR-004 rule 4 never frees an old identifier, so a renamed
    // document must say what it used to be called. The rest are PRI-005's
    // legacy Spanish header fields, migrated to English keys rather than
    // dropped — they encode the licensing principle's scope, authority and
    // downstream editions, and deleting them to satisfy a linter would have
    // destroyed the only record of where the distributed file and the public
    // guide live.
    'former_id', 'former_id_note', 'distributed_file', 'public_guide',
    'reasoned_edition', 'scope', 'out_of_scope', 'canonical_language',
    'normative_conventions', 'authority', 'revision_policy',
    // registered 2026-09-24 (ADR-057). Same load-bearing role it has in
    // decisions/, debt/, reports/ and standards/: the DEF-009 guard (std-012)
    // reads `absorbs` to keep an absorbed identifier resolving. PRI-004
    // absorbed PRI-003, so a principle can now be the absorbing document —
    // DEF-011's route out of a series, applied to the principles for the first time.
    'absorbs'],
  'procedures': ['supersedes_version', 'approved_by', 'applies_to', 'mandatory',
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
    'former_id', 'former_id_note', 'accuracy_warning',
    // registered 2026-09-29 with the semantic census (SYS-011): a census
    // card, an entry of SYS-011 in system/semantic-census/, says which of
    // the eight categories it belongs to, where it stands in its validation
    // (draft → validated → approved → explicit) and how sure it is.
    // `category` is also the header of a supplier card (SYS-012, 2026-09-30),
    // an entry of SYS-012 in system/suppliers/.
    'category', 'stage', 'confidence'],
  'history': ['former_id', 'former_id_note', 'supersedes_version'],
  // opportunities/ governed 2026-09-28: an opportunity's record and its
  // proposal open with every document's header, then carry the fields the
  // pipeline tool reads (STD-039 the record, STD-040 the proposal). Listed
  // here so the header guard accepts them; their values are judged by the
  // tool, whose REQUIRED + WHEN_DUE lists a test holds equal to this ring.
  // 2026-10-02, one pipeline: sales, tenders, grants, collaborations and
  // partners are one record. The stage, the next step, the closing day, the
  // reason and the chance are computed from the `## Timeline` and the
  // criteria table, so `state`, `next_action`, `next_date`, `closed`,
  // `reason` and `chance` left the header; `notice` became `call`; the
  // funding/ series and its ring were retired into this one.
  'opportunities': [
    // every record (OPP-002)
    'kind', 'organisation', 'sector', 'source', 'value', 'currency', 'pays',
    'contact_role', 'contact_channel', 'opened',
    // written when due: the offer it sells, the share paid first, the
    // proposal, the agreement, who signs, whether it may be named, the
    // record it follows, what a collaboration gave back
    'offer', 'advance', 'proposal', 'agreement', 'decider_role', 'disclosure',
    'follows', 'gives_back',
    // a call — tender or grant: where it is, when it closes, what it was read from (OPP-012/014)
    'call', 'closes', 'read_from',
    // a tender: how the buyer purchases, its file, what it really buys,
    // the solvency asked, the day it starts (OPP-012/014/015)
    'procedure', 'file_ref', 'object', 'turnover_asked', 'works_asked', 'starts',
    // a grant: what the funder gives, when the call opens, days estimated
    'instrument', 'opens', 'estimated',
    // the proposal (PRP-)
    'opportunity', 'date', 'valid_until', 'level', 'price', 'tax_rate'],
};

export const RING3_ALL = ['tags', 'visibility', 'guild', 'section', 'registration',
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
 *  because its status is terminal (STD-004) or because its series' approval level
 *  is `closed` from publication (STD-001: reports/). A mission's approval level is
 *  `closed` only when `done`, which its status already says. */
export function isPhotograph(rel, status, rules) {
  if (isTerminalStatus(status, rules)) return true;
  const top = String(rel).split('/')[0];
  return rules.series[top]?.threshold === 'closed' && top !== 'missions';
}
