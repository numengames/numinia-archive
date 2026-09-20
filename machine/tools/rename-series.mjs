#!/usr/bin/env node
/**
 * rename-series.mjs — MIS-125 Stage B/C rename tool.
 *
 * Spec: .hermes/plans/2026-08-31_090215-MIS-125-prefix-standardization.md §B.
 * "no rediseñes, ejecuta" — the CLI surface and the 5-step algorithm below
 * are the plan's own words, not a new design. What follows fills in
 * implementation detail the plan left to the builder (numbering assignment
 * for files with no reusable number, date-series merge order, frozen-artifact
 * safety) — declared explicitly, not invented silently.
 *
 *   node machine/tools/rename-series.mjs \
 *     --dir <dir1[:subtypeValue],dir2[:subtypeValue],...> \
 *     --to <PREFIX> \
 *     [--from <PREFIX1,PREFIX2,...>]   legacy prefix(es) whose NNN is reused
 *     [--digits N]                      zero-pad width, default 3
 *     [--subtype-field <name>]          frontmatter field written per --dir tag
 *     [--order created|filename]        assignment order for unnumbered files
 *     [--into <dir>]                    relocate renamed files into <dir> (flatten)
 *     [--include-frozen-artifacts]      opt-in override, see note below
 *     [--apply]                         default: dry-run, prints the plan only
 *
 * Algorithm (plan §B, steps 1-5):
 *   1. List files to rename in --dir.
 *   2. Grep the WHOLE corpus (not just markdown links — ADR-004 documents
 *      1,619+ plain-text mentions invisible to a link-checker; the GIT-048 guard
 *      independently confirmed a third citation type, bare filenames) for
 *      the old id/filename.
 *   3. --dry-run (default): print the full plan, touch nothing.
 *   4. --apply: git mv, update id: in frontmatter, rewrite every citation
 *      found (old id string + old basename string, corpus-wide, any file
 *      type — not just .md), run the GIT-048 guard at the end. No commit.
 *   5. One run = one series. Never mixes series in the same pass.
 *
 * FROZEN-ARTIFACT SAFETY (ruled, no longer an open conflict):
 * P-010 §3.2 defines dated-filename files as permanent snapshots ("a
 * photograph, not a living document"). D-008 v2.0.0's "24 exempt enter the
 * scheme" ruling had swept 5 of them in, contradicting P-010 §3.2 on its
 * face. RULED 2026-08-31 (MIS-125): P-010 §3.2 prevails — see P-010 §3.2.2
 * and D-008 v3.0.0. The 5 keep their dated names permanently and leave
 * D-008's denominator; they are not debt, they are correctly named.
 *
 * Detection is by FILENAME SHAPE (YYYY_MM_DD-Title-vX.Y.Z.md), not by the
 * registration_exemption field: 2 of the 5 carry the shape without the
 * field (P-010 §3.2.1), so a field-keyed check would rename them.
 * --include-frozen-artifacts still exists as an operator override, and even
 * then the tool only ever queues them for --dry-run review, never silently.
 * With the ruling in force there is no legitimate reason to pass it.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRules, parseFM } from '../scripts/lib/frontmatter.mjs';
import { isTerminalStatus } from '../scripts/lib/rings.mjs';
const RULES = loadRules();

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const args = process.argv.slice(2);

function flag(name, def = undefined) {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return def;
  return args[i + 1];
}
// CodeQL: js/regex-injection — TO/FROM/etc. are CLI args, not literal
// strings; escape before interpolating into `new RegExp(...)` so a
// malformed --to/--from value can't build an unintended or catastrophic
// pattern.
function reEscape(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const APPLY = args.includes('--apply');
const INCLUDE_FROZEN = args.includes('--include-frozen-artifacts');
const INCLUDE_EXEMPT = args.includes('--include-exempt');
const DIR_ARG = flag('dir');
const TO = flag('to');
const FROM = flag('from', '');
const DIGITS = parseInt(flag('digits', '3'), 10);
const SUBTYPE_FIELD = flag('subtype-field', null);
const ORDER = flag('order', 'created');
// --into <dir>: relocate the renamed files into <dir> instead of leaving
// them where they were. Added 2026-09-01 for reports/ (ADR-005 v1.2.0 rule
// 4 flattens the folder: reports/audits/AUD-x.md -> reports/RPT-NNN-x.md).
// Full-path citations are rewritten by the same rel rule as before; the
// relocation is just a different newRel.
const INTO = flag('into', null);

if (!DIR_ARG || !TO) {
  console.error('usage: rename-series.mjs --dir <d1[:tag],d2[:tag]> --to <PREFIX> [--from p1,p2] [--digits N] [--subtype-field name] [--into <dir>] [--include-exempt] [--include-frozen-artifacts] [--apply]');
  process.exit(2);
}

const APPARATUS_BASENAMES = new Set(['README.md', 'INDEX.md', 'TEMPLATE.md', 'STANDARDS.md']);
const isApparatusPath = (rel) => /\/_template\//.test(rel) || rel.startsWith('agents/_template/');


const dirSpecs = DIR_ARG.split(',').map((d) => {
  const [dir, tag] = d.split(':');
  return { dir, tag: tag || null };
});
const fromPrefixes = FROM ? FROM.split(',').filter(Boolean) : [];

/* ---- 1. collect candidates ---- */
const candidates = [];
// Numbers already taken by files that match the target scheme exactly. They
// are not candidates (idempotency below) but their numbers are NOT free:
// without this set the first unnumbered file received 001 on a shelf where
// RPT-001 already existed. Found dry-running reports/ (2026-09-01) — every
// earlier run either had --from numbers for all files or an empty shelf.
const reserved = new Set();
for (const { dir, tag } of dirSpecs) {
  // ':(glob)' keeps '*' from crossing '/', so --dir reports lists
  // reports/*.md and not reports/daily/*.md (git's default pathspec would).
  const files = execFileSync('git', ['-C', ROOT, 'ls-files', '--', `:(glob)${dir}/*.md`], { encoding: 'utf8' })
    .split('\n').filter(Boolean);
  for (const rel of files) {
    const base = path.basename(rel);
    if (APPARATUS_BASENAMES.has(base) || isApparatusPath(rel)) continue;
    const text = readFileSync(path.join(ROOT, rel), 'utf8');
    const fm = parseFM(text) || {};
    // P-010 §3.2 detection: by declared field OR by the reserved dated
    // shape itself (YYYY_MM_DD-...). Two files confirmed live
    // (2026_04_14-Read_Me_How_to_Archive-v0.2.0.md,
    // 2026_04_14-Analogous_Terminology_Numina-v0.2.0.md) carry the exact
    // §3.2 name shape but are MISSING the registration_exemption field —
    // a metadata gap, not evidence they were meant to enter a live series.
    // Same unresolved P-010-vs-D-008 conflict either way; do not let a
    // missing field silently bypass the guard the field exists to set.
    const looksLikeFrozenShape = /^\d{4}_\d{2}_\d{2}-.+-v\d+(\.\d+){0,2}\.md$/.test(base);
    const isFrozen = fm.registration_exemption === 'frozen-artifact' || looksLikeFrozenShape;
    if (isFrozen && !INCLUDE_FROZEN) {
      candidates.push({ rel, base, fm, text, skip: 'frozen-artifact (P-010 §3.2 — ruled 2026-08-31, MIS-125: keeps its dated name permanently, not debt)', tag });
      continue;
    }
    // registration: exempt not otherwise ruled in scope. D-008 v2.1.0's
    // "24 exempt enter the scheme" ruling is a closed, ENUMERATED list —
    // it does not mean "every exempt file enters." APPROVAL-REQUEST-template.md
    // was in that pool once, then the Oracle correction (D-024 v1.2.0)
    // pulled it back OUT as permanent apparatus of P-008. Any exempt file
    // this tool doesn't otherwise touch stays exempt by default — an
    // Oracle ruling reopening it belongs in D-008/D-024, not silently
    // assumed by this script matching it into a --dir it can see.
    // --include-exempt: the operator's explicit per-run assertion "this
    // --dir's exempt files ARE the ones D-008's ruling enumerated" —
    // required because guilds/*, operations/security-policy.md,
    // credential-map.md, canon/archive-lore.md, the archive-summa
    // blueprints, and debt/D-024+D-028 ALL carry registration: exempt too,
    // and D-008 rules them IN. This flag does not distinguish
    // file-by-file — verify the --dir's file list against D-008's table
    // before passing it for a real Stage C run.
    if (fm.registration === 'exempt' && !isFrozen && !INCLUDE_EXEMPT) {
      candidates.push({ rel, base, fm, text, skip: `registration: exempt (reason: "${fm.registration_reason || 'unstated'}") — not auto-included; requires --include-exempt after verifying D-008's enumerated list covers this file`, tag });
      continue;
    }
    // idempotency: already matches the target scheme exactly?
    const already = base.match(new RegExp(`^${reEscape(TO)}-(\\d{${DIGITS}})-`));
    if (already) { reserved.add(parseInt(already[1], 10)); continue; }
    candidates.push({ rel, base, fm, text, tag });
  }
}

/* ---- number extraction / assignment ---- */
function extractExistingNumber(base, fm) {
  for (const p of fromPrefixes) {
    // A dated legacy id (AUD-2026-08-17-stack) carries no reusable number:
    // "2026" is a year, not a position in the series. Without the lookahead
    // the reports/ dry-run (2026-09-01) proposed RPT-2026-stack.md for
    // every audit. The date form is retired by ADR-005 v1.2.0; the file
    // gets a fresh number by --order like any unnumbered candidate.
    const re = new RegExp(`^${reEscape(p)}-(\\d+)(?!-\\d{2}-\\d{2})(?:-|\\.md$)`);
    const m = base.match(re) || (fm.id || '').match(new RegExp(`^${reEscape(p)}-(\\d+)$`));
    if (m) return parseInt(m[1], 10);
  }
  return null;
}

function sortKey(c) {
  if (ORDER === 'created' && c.fm.created) return c.fm.created;
  const dm = c.base.match(/(\d{4}-\d{2}-\d{2})|(\d{4}_\d{2}_\d{2})/);
  if (dm) return dm[0].replace(/_/g, '-');
  return c.base;
}

const active = candidates.filter((c) => !c.skip);
const skipped = candidates.filter((c) => c.skip);

// existing numbers (to avoid collisions with reused ones) + files needing
// fresh assignment, in a stable, declared order.
const withNumber = [];
const needsNumber = [];
for (const c of active) {
  const n = extractExistingNumber(c.base, c.fm);
  if (n !== null) withNumber.push({ ...c, num: n });
  else needsNumber.push(c);
}
const used = new Set([...withNumber.map((c) => c.num), ...reserved]);
needsNumber.sort((a, b) => (sortKey(a) < sortKey(b) ? -1 : sortKey(a) > sortKey(b) ? 1 : 0));
let next = 1;
const assigned = [];
for (const c of needsNumber) {
  while (used.has(next)) next++;
  used.add(next);
  assigned.push({ ...c, num: next });
  next++;
}

const plan = [...withNumber, ...assigned].sort((a, b) => a.num - b.num).map((c) => {
  const pad = String(c.num).padStart(DIGITS, '0');
  // Slug: only strip a leading PREFIX- if the file actually had a
  // recognized old-series number (extractExistingNumber matched) — never
  // guess a prefix off an unnumbered basename. "STD-005-engineering-standards.md"
  // is not "PREFIX=engineering, name=standards"; it is one whole name.
  let slugSource = c.base.replace(/\.md$/, '');
  const hadNumber = fromPrefixes.some((p) => new RegExp(`^${reEscape(p)}-\\d+-`).test(c.base));
  if (hadNumber) {
    const stripped = c.base.match(/^[A-Za-z]+-\d[\d_-]*-(.+)\.md$/);
    if (stripped) slugSource = stripped[1];
  } else {
    // A --from prefix is the operator's declaration that the shelf's old
    // prefix is legacy, so it is never part of the new slug even when no
    // number follows it (AUD-2026-08-17-stack -> stack; PROP-C005-5.2-x ->
    // c005-5.2-x). A dated form drops the date too — the date was the id,
    // and the id is what is being replaced. Unlisted prefixes are still
    // never guessed off the basename (the STD-005 case above).
    for (const p of fromPrefixes) {
      const m = c.base.match(new RegExp(`^${reEscape(p)}-(?:\\d{4}-\\d{2}-\\d{2}-)?(.+)\\.md$`));
      if (m) { slugSource = m[1]; break; }
    }
  }
  const slug = slugSource.toLowerCase().replace(/[_\s]+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const newBase = `${TO}-${pad}-${slug}.md`;
  const newRel = path.join(INTO ?? path.dirname(c.rel), newBase);
  const oldId = c.fm.id || c.base.replace(/\.md$/, '');
  const newId = `${TO}-${pad}`;
  return { oldRel: c.rel, newRel, oldBase: c.base, newBase, oldId, newId, tag: c.tag };
});

/* ---- 2. corpus-wide citation search (id + bare basename, any file type) ---- */
// Case-insensitivity is not cosmetic here. A document's citations appear in
// TWO cases: the archive filename (`OPS-003-privacy-policy-numengames.md`) and
// the URL/slug form the web layer derives from it, lowercased
// (`ops-003-privacy-policy-numengames`). `web/src/pages/legal/[slug].astro`
// holds a hand-written slug map in the lowercase form; a case-SENSITIVE
// search does not see it, so the rename would leave a dangling getEntry()
// and take /legal/terminos and /legal/privacidad down at build time.
// Found by dry-running this tool over operations/ before applying it
// (MIS-127, 2026-09-01) — guilds/ never exposed it because no .astro maps
// guild filenames by hand.
function grepCorpusCount(needle) {
  try {
    const out = execFileSync('git', ['-C', ROOT, 'grep', '-Fli', needle], { encoding: 'utf8' });
    return out.split('\n').filter(Boolean).filter((f) => !f.startsWith('web/dist/'));
  } catch (e) {
    return []; // git grep exits 1 on no matches
  }
}

/* Ambiguous-basename guard: some basenames (charter.md, roster.md — one per
   guild folder) collide across sibling directories. A bare "charter.md"
   citation in prose, or a templated form like "{my-guild}/charter.md"
   (confirmed live: blueprints/archive-summa-fundacional-v0.1.0.md:95), does
   not say WHICH guild it means — a corpus-wide string-replace of the bare
   basename would silently repoint another guild's citation, or corrupt a
   generic template line, to the file being renamed right now. Only the full
   relative path is unambiguous by construction. A bare basename is only
   safe to auto-rewrite when it is unique across the entire tracked corpus. */
const allBasenames = execFileSync('git', ['-C', ROOT, 'ls-files'], { encoding: 'utf8' })
  .split('\n').filter(Boolean).map((f) => path.basename(f));
const basenameCount = {};
for (const b of allBasenames) basenameCount[b] = (basenameCount[b] || 0) + 1;
function isBasenameUnique(base) { return basenameCount[base] === 1; }

console.log(`rename-series.mjs — ${APPLY ? 'APPLY' : 'DRY-RUN'}`);
console.log(`  dirs: ${DIR_ARG}  to: ${TO}  from: ${FROM || '(none — fresh numbering)'}  digits: ${DIGITS}${INTO ? `  into: ${INTO}/` : ''}`);
if (reserved.size) console.log(`  reserved (already ${TO}-NNN on the shelf, not free): ${[...reserved].sort((a, b) => a - b).map((n) => String(n).padStart(DIGITS, '0')).join(' ')}`);
console.log('');

if (skipped.length) {
  console.log(`SKIPPED (${skipped.length}) — not renamed this run:`);
  for (const s of skipped) console.log(`  ${s.rel} — ${s.skip}`);
  console.log('');
}

console.log(`PLAN (${plan.length} files):`);
for (const p of plan) {
  const idHits = grepCorpusCount(p.oldId);
  const pathHits = grepCorpusCount(p.oldRel).filter((f) => f !== p.oldRel);
  const baseUnique = isBasenameUnique(p.oldBase);
  const baseHits = baseUnique
    ? grepCorpusCount(p.oldBase).filter((f) => f !== p.oldRel)
    : [];
  const ambiguousHits = !baseUnique
    ? grepCorpusCount(p.oldBase).filter((f) => f !== p.oldRel && !pathHits.includes(f))
    : [];
  console.log(`  ${p.oldRel}`);
  console.log(`    -> ${p.newRel}`);
  console.log(`    id: "${p.oldId}" -> "${p.newId}"  (${idHits.length} file(s) cite the id)`);
  console.log(`    full-path citations: ${pathHits.length} file(s) — safe, auto-rewritten on --apply`);
  if (baseUnique) {
    console.log(`    bare-basename citations (unique in corpus): ${baseHits.length} file(s) — safe, auto-rewritten on --apply`);
  } else if (ambiguousHits.length) {
    console.log(`    AMBIGUOUS bare-basename citations (shared with other file(s) named "${p.oldBase}"): ${ambiguousHits.length} file(s) — NOT auto-rewritten, manual review required:`);
    for (const f of ambiguousHits) console.log(`      ${f}`);
  }
  if (p.tag && SUBTYPE_FIELD) console.log(`    ${SUBTYPE_FIELD}: ${p.tag}`);
}

if (!APPLY) {
  console.log('\nDry-run only — nothing written. Re-run with --apply to execute.');
  process.exit(0);
}

/* ---- 4. apply ---- */
console.log('\nAPPLYING...');
const manualReview = [];
const refused = [];

// D-048: a rename must not rewrite a MENTION as if it were a CITATION.
// Dated evidence and closed records state what was true when written; a
// rewrite there is falsification, not maintenance (STD-001 §2.1, §9.1).
// Found in MIS-125 Stage C: an 8-file rename silently rewrote an SPDX SBOM
// (filenames changed, FileChecksum SHA1 left stale), a CC0 grant record, a
// status: done mission's narrative, and two counter-examples — all with
// every guard green.
const EVIDENCE_DIRS = ['reports/audits/', 'reports/', 'archive/'];
function refusalReason(rel) {
  if (EVIDENCE_DIRS.some((d) => rel.startsWith(d))) {
    return 'dated evidence — rewriting a record of a past run falsifies it';
  }
  // published-urls.json records the addresses the site PUBLISHED; rewriting
  // the old slug to the new one erases the very URL check-url-lifecycle
  // exists to see die. Measured on #192 (operations/): the tool rewrote 8
  // entries o-NNN -> ops-NNN and the guard never saw those addresses vanish —
  // the redirects were added by hand, so nothing broke, but the guard was blind.
  // A test file's fixtures MEAN the old name: rewriting them turns a
  // regression test into a tautology. This tool rewrote its own test on
  // the reports/ run (2026-09-01) and the suite went 24/25 — the one case
  // that asserted the retired shape now asserted the new one.
  if (/\.test\.(mjs|js|ts|py)$/.test(rel)) {
    return 'test fixture — the old name is the point of the assertion';
  }
  if (rel === 'machine/scripts/published-urls.json') {
    return 'the manifest of published URLs must keep the retired address, or the lifecycle guard goes blind';
  }
  const abs = path.join(ROOT, rel);
  if (!existsSync(abs)) return null;
  const head = readFileSync(abs, 'utf8').slice(0, 4000);
  const m = head.match(/^status:\s*["']?(\w[\w-]*)/m);
  if (m && isTerminalStatus(m[1], RULES)) {
    return `status: ${m[1]} — a closed record states what was true when written`;
  }
  return null;
}

for (const p of plan) {
  const idHits = grepCorpusCount(p.oldId);
  const pathHits = grepCorpusCount(p.oldRel);
  const baseUnique = isBasenameUnique(p.oldBase);
  const baseHits = baseUnique ? grepCorpusCount(p.oldBase) : [];
  const allHits = [...new Set([...idHits, ...pathHits, ...baseHits])];

  const safeHits = [];
  for (const f of allHits) {
    const why = refusalReason(f);
    if (why) refused.push({ file: f, forRename: p.oldRel, why });
    else safeHits.push(f);
  }

  if (!baseUnique) {
    const ambiguousHits = grepCorpusCount(p.oldBase).filter((f) => f !== p.oldRel && !pathHits.includes(f));
    if (ambiguousHits.length) manualReview.push({ file: p.oldRel, base: p.oldBase, citedBy: ambiguousHits });
  }

  // ---- CITATION REWRITE ----
  //
  // BUG FIXED 2026-08-31 (MIS-127, standards/ run). These three lines used to
  // be plain `.split(old).join(new)` — substring replacement with no notion of
  // a boundary. Renaming STD-001 -> STD-001 corrupted 139 files in one pass:
  //
  //   MIS-001            -> MISTD-001   (found the "STD-001" inside "MIS-001")
  //   governance.md      -> STD-002.md  (word-shaped name, slug lost)
  //   AUD-...-governance -> AUD-...-STD-002
  //
  // It reached LICENSE, CODEOWNERS and .github/workflows/. The reference guard
  // caught it and nothing was committed, but the tool is meant to be the safe
  // way to do this. Each rule is now bounded by the context it is valid in:
  //
  //   id   — word boundaries, so MIS-001 cannot match STD-001. Two further
  //          restrictions, both learned the hard way on this same shelf:
  //
  //          (a) not when followed by ".md" — for a word-shaped id like
  //              "governance" that string is a FILENAME, and rewriting it
  //              there produced the slugless STD-002.md. The basename rule
  //              owns that case; it knows the full new name.
  //
  //          (b) not at all, if the id is word-shaped. An id like
  //              "governance" or "engineering-standards" is indistinguishable
  //              from the English word, and the tool rewrote both: prose
  //              ("~29,000 lines of governance" became "of STD-002") and,
  //              worse, code — {fondo.governance} became {fondo.STD-002} in
  //              archive/[fondo].astro, which does not compile. It also
  //              rewrote this very comment. A file whose id is a real word
  //              has no unambiguous bare-id citation; its citations travel as
  //              filenames, which the other two rules handle. ID_SHAPED below
  //              is the test: a series id looks like ABC-123, nothing else.
  //   rel  — full paths are unambiguous, but anchor the left edge so
  //          "old/standards/x.md" is not rewritten inside a longer path.
  //   base — only where the basename stands alone: as a path segment, in a
  //          link, in backticks, or as a frontmatter value.
  //
  // Cases are asserted in machine/scripts/test/rename-series.test.mjs, including every one
  // that broke above. Run it after touching any of this.
  const reEsc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // A series id: letters, a hyphen, digits. "governance" is not one.
  const ID_SHAPED = /^[A-Z]{1,6}-\d{1,4}$/i;
  const rewriteId = (s, oldId, newId) => {
    if (!ID_SHAPED.test(oldId)) return s;   // see (b) above
    return s.replace(new RegExp(`(^|[^A-Za-z0-9_-])${reEsc(oldId)}(?![A-Za-z0-9_-])(?!\\.md)`, 'g'),
      (_m, pre) => pre + newId);
  };
  const rewriteRel = (s, oldRel, newRel) =>
    s.replace(new RegExp(`(^|[^A-Za-z0-9_./-])${reEsc(oldRel)}(?![A-Za-z0-9_-])`, 'g'),
      (_m, pre) => pre + newRel);
  // A basename only counts when it is being used AS a filename.
  const rewriteBase = (s, oldBase, newBase) =>
    s.replace(new RegExp(`([/\`(\\[<'"]|^|:\\s*)${reEsc(oldBase)}(?![A-Za-z0-9_-])`, 'gm'),
      (_m, pre) => pre + newBase);
  // The slug form: basename minus .md, lowercased — what the web layer uses
  // for URLs and what a hand-written slug map contains. Rewritten under the
  // same uniqueness guard as the basename, and only in that lowercase shape,
  // so prose that happens to mention the id in another case is untouched.
  const rewriteSlug = (s, oldBase, newBase) => {
    const oldSlug = oldBase.replace(/\.md$/, '').toLowerCase();
    const newSlug = newBase.replace(/\.md$/, '').toLowerCase();
    if (oldSlug === newSlug) return s;
    return s.replace(new RegExp(`([/\`(\\[<'"]|^|:\\s*)${reEsc(oldSlug)}(?![A-Za-z0-9_-])`, 'gm'),
      (_m, pre) => pre + newSlug);
  };

  for (const f of safeHits) {
    const abs = path.join(ROOT, f);
    let content = readFileSync(abs, 'utf8');
    const before = content;
    content = rewriteId(content, p.oldId, p.newId);
    content = rewriteRel(content, p.oldRel, p.newRel);
    if (baseUnique) content = rewriteBase(content, p.oldBase, p.newBase);
    if (baseUnique) content = rewriteSlug(content, p.oldBase, p.newBase);
    if (content !== before) writeFileSync(abs, content);
  }

  // frontmatter: id + subtype
  const absOld = path.join(ROOT, p.oldRel);
  let text = readFileSync(absOld, 'utf8');
  text = text.replace(/^id:\s*.*/m, `id: "${p.newId}"`);

  // Retire a registration exemption the rename has just falsified.
  // A file that now carries GLD-001 cannot also declare "not a numbered
  // series" — STD-001 §5.0 requires the exemption to state something true,
  // and count-evidence.py would report 8/8 coverage over 8 files each
  // claiming to be outside the scheme. Only the *entering* reasons are
  // dropped; a frozen-artifact exemption never reaches this code path
  // (those files are excluded before the plan is built).
  // Found in MIS-125 Stage C, guilds/ — the tool renamed correctly and
  // left every file self-contradictory.
  if (/^registration:\s*exempt\s*$/m.test(text)) {
    text = text.replace(/^registration:\s*exempt\s*\n/m, '');
    text = text.replace(/^registration_reason:\s*(>[-+]?\s*\n(?:[ \t]+.*\n)+|.*\n)/m, '');
    text = text.replace(/^registration_exemption:\s*.*\n/m, '');
    console.log(`    registration: exempt retired — the file is now ${p.newId}`);
  }

  if (p.tag && SUBTYPE_FIELD) {
    if (new RegExp(`^${reEscape(SUBTYPE_FIELD)}:`, 'm').test(text)) {
      text = text.replace(new RegExp(`^${reEscape(SUBTYPE_FIELD)}:.*`, 'm'), `${SUBTYPE_FIELD}: ${p.tag}`);
    } else {
      text = text.replace(/^(type:.*)$/m, `$1\n${SUBTYPE_FIELD}: ${p.tag}`);
    }
  }
  writeFileSync(absOld, text);

  execFileSync('git', ['-C', ROOT, 'mv', p.oldRel, p.newRel]);
  console.log(`  done: ${p.oldRel} -> ${p.newRel} (${safeHits.length} citing file(s) auto-updated)`);
}

if (manualReview.length) {
  console.log(`\n⚠ ${manualReview.length} file(s) had AMBIGUOUS basename citations NOT auto-rewritten — fix by hand before commit:`);
  for (const m of manualReview) {
    console.log(`  ${m.file} (now ${m.base} elsewhere too) — cited bare in:`);
    for (const f of m.citedBy) console.log(`    ${f}`);
  }
}

if (refused.length) {
  console.log(`\n⛔ ${refused.length} occurrence(s) REFUSED — evidence or closed records, deliberately NOT rewritten (D-048):`);
  for (const r of refused) console.log(`  ${r.file}\n     ${r.why}`);
  console.log('  If any of these is a live citation rather than a record, fix it by hand.');
}

console.log('\nVerifying with std-020-git-is-the-archive (GIT-048)...');
try {
  execFileSync('node', [path.join(ROOT, 'machine', 'guards', 'rules', 'std-020-git-is-the-archive.mjs')], { stdio: 'inherit' });
  console.log('\nstd-020-git-is-the-archive: clean.');
} catch (e) {
  console.error('\nstd-020-git-is-the-archive: FAILED — review before committing. Nothing was auto-committed.');
  process.exit(1);
}
