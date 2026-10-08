// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
// Missions are read from the repo's flat missions/ folder at build time
// (MIS-066): the folder is the single source of truth, no index file.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const missions = defineCollection({
  loader: glob({ pattern: "MIS-*.md", base: "../missions" }),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      status: z.string().default("backlog"),
      priority: z.string().default("medium"),
      effort: z.string().default("M"),
      guild: z.string().optional(),
      section: z.string().optional(),
      area: z.string().optional(),   // legado: D-010, ya migrado
      executor: z.string().optional(),
      assigned_to: z.string().nullable().optional(),
      completed: z.string().nullable().optional(),
    })
    .passthrough(),
});

// Reports are read from the repo's reports/ folder at build time — same
// source-of-truth pattern as missions. Since 2026-09-01 (ADR-005 v1.2.0) the
// folder is flat and one collection holds every subtype: audit, analysis,
// proposal (RPT-NNN) and daily (RPT-YYYY-MM-DD). /reports renders them all;
// the corpus mirror below excludes RPT-* so ownership stays single.
const reports = defineCollection({
  loader: glob({ pattern: "RPT-*.md", base: "../reports" }),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      status: z.string().default("draft"),
      created: z.string(),
      author: z.string().optional(),
      tags: z.array(z.string()).default([]),
    })
    .passthrough(),
});

// Decision records — the root decisions/ folder is the source of truth
// (MIS-065: the hardcoded decisiones.ts copy retires).
const decisions = defineCollection({
  loader: glob({ pattern: ["DEC-*.md", "ADR-*.md"], base: "../decisions" }),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      status: z.string().default("active"),
      section: z.string().optional(),
      area: z.string().optional(),   // legado: D-010, ya migrado
      created: z.string(),
    })
    .passthrough(),
});

// Designs/planos — the root designs/ folder is the source of truth
// (MIS-065: the hardcoded planos.ts copy retires).
const designs = defineCollection({
  loader: glob({ pattern: ["DES-*.md"], base: "../designs" }),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      status: z.string().default("active"),
      section: z.string().optional(),
      area: z.string().optional(),   // legado: D-010, ya migrado
      created: z.string(),
    })
    .passthrough(),
});

// system/ — reference manuals of how the system works today (ADR-035).
// Typed rather than left to the lax corpus mirror because /system/ is
// a section index and its rows want a title and a status they can trust.
// Until 2026-09-20 SYS-003 also carried the `fondos:` + `graph:` data the
// /archive pages rendered; ADR-046 retired that model and the pages read
// STD-027 and STD-001 now (web/src/lib/classification.ts).
const system = defineCollection({
  loader: glob({ pattern: ["SYS-*.md"], base: "../system" }),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      status: z.string().default("active"),
      section: z.string().optional(),
      created: z.string(),
    })
    .passthrough(),
});

// Legal artifacts — the master copies live in legal/ since 2026-09-27, their
// own series (before that, operations/; per the FLAG-1
// record): the published pages derive from them at build time. Reserved-
// rights content, read here only for display (C-005 §5). Publication with
// open review flags is an Oracle-ordered exception — see CON-004/CON-005.
// MIS-127 (2026-09-01): operations/ was flattened to one level, so this
// collection selects the two legal documents by filename instead of by
// folder. Each now declares its reserved licence in its own SPDX comment.
const legal = defineCollection({
  loader: glob({ pattern: "LEG-*.md", base: "../legal" }),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      status: z.string().default("active"),
      version: z.string().optional(),
      updated: z.string().optional(),
    })
    .passthrough(),
});

// The full-principles mirror (MIS-087): every repo .md outside the detail
// collections above gets a generic corpus entry. Negated patterns keep
// single ownership of a file between corpus and the typed collections.
// Schema is lax on purpose — frontmatter varies per
// directory and some files (README, INDEX) carry none.
const corpus = defineCollection({
  loader: glob({
    pattern: [
      // The repository's own files — README, CLAUDE.md, CONTRIBUTING,
      // SECURITY, TRADEMARKS, the CHANGELOG — are NOT published (ADR-047).
      // They addressed /changelog, /readme, /claude and so on: top-level
      // addresses naming no series, which STD-028 URL-001 does not admit,
      // and every one of them is read on GitHub where it belongs. The
      // archive publishes documents of a series; a repository's furniture
      // is not one.
      "agents/**/*.md",
      "principles/**/*.md",
      "operations/**/*.md",
      "opportunities/**/*.md",
      "legal/**/*.md",
      "procedures/**/*.md",
      "standards/**/*.md",
      "reports/**/*.md",
      "!reports/RPT-*.md",
      // reports/evidence/<RPT-id>/ (ADR-005 v1.2.0 rule 5): annexes of a
      // report — captured artefacts, moved as an opaque block. The report
      // that owns them is the published document; the annex is reachable on
      // GitHub. Before 2026-09-01 the only annex sat under reports/audits/,
      // excluded above, so this keeps the public surface where it was.
      "!reports/evidence/**",
      "decisions/**/*.md",
      "!decisions/DEC-*.md",
      "!decisions/ADR-*.md",
      "designs/**/*.md",
      "!designs/DES-*.md",
      // No exclusion twin to designs' below: DES-* are excluded here
      // because /designs/<slug> renders them. SYS-* have no route of
      // their own, so the corpus mirror is where they become readable —
      // and it is where MIS-129's redirects send the retired addresses.
      "system/**/*.md",
      // objects/ — the entity cards (2026-09-20): one Markdown per thing the
      // archive registers that is not a document — an avatar, a model, later
      // a place. The card is an index (entity → forms → copies); the bytes
      // live in the depot. Rendered as any corpus document; the folder is
      // not a /corpus section yet — that is decided when there are enough
      // cards to name what the section contains in one sentence.
      // CHECK.md is the dated copy-check report; it renders too, on purpose:
      // the count it carries is the resilience figure a reader may want.
      "objects/**/*.md",
      // stakeholders/ — one card per stakeholder outside the house (2026-10-08).
      "stakeholders/**/*.md",
      "history/**/*.md",
      "missions/**/*.md",
      "!missions/MIS-*.md",
      // debt/ — the register of what is known to be wrong. It was missing
      // from this list until 2026-08-25, so 22 entries and 73,742 chars were
      // invisible on numinia.org: the archive published what it had built and
      // withheld what it knew was broken. Nothing excluded it deliberately —
      // the folder was created after this glob was written and nobody added it.
      // 2026-08-25: withheld ON PURPOSE for a few hours, pending a filter.
      // MIS-114: back in the glob. The folder is no longer the unit of the
      // decision — the document is. What may be published is decided by
      // `visibility` in web/src/lib/corpus.ts, and it fails closed: an entry
      // with no field does not publish. Adding a file here no longer risks
      // publishing it; forgetting the field only makes it invisible.
      "debt/**/*.md",
      // lore/ — the game and the world (2026-09-21).
      //
      // This glob carried the opposite line for months: "lore/ is NOT here on
      // purpose: reserved regime, the RPG manual and the codex matter". The
      // premise under it was that serving a page is what makes a text public.
      // It is not, and three facts settle it:
      //
      //   1. THE REPOSITORY IS PUBLIC. Every file under lore/ is readable at
      //      github.com/numengames/numinia-archive today, by anyone, with no
      //      account. Withholding it from the viewer hid it from readers of
      //      the site and from nobody else.
      //   2. DISPLAYING IS NOT LICENSING. Each file declares its own
      //      licence. (Since 2026-09-24 the lore is CC0-1.0; when this glob
      //      was written it was reserved, and serving it granted nothing.)
      //   3. STD-014 DOES NOT BIND THIS. Its own scope line: it binds
      //      permanent publication (Arweave) and a private-to-public change
      //      of a repository, and nothing else; publication to a CDN can be
      //      withdrawn, so it is neither. numinia.org is a CDN worker. The
      //      irreversible act — making the repository public — already
      //      happened and was not this.
      //
      // So nothing is conceded here that was not conceded already, and the
      // reversible half stays reversible: deleting this line takes the pages
      // down again.
      //
      // ADR-046 registered lore/ as a series in STD-001, so /lore/<id> is an
      // address URL-001 admits.
      "lore/**/*.md",
      // …except the RPG manual, which is served as a book instead (the Oracle,
      // 2026-10-05): /manual and /manual/<chapter>, rendered by
      // web/src/pages/manual/ from the same files. Served here it would sit at
      // /lore/game/manual/es/…, and "es" is a retired segment (URL-004). It had
      // been kept out since it arrived because chapter 2 embedded four images
      // that were never committed; those embeds are now a visible line saying
      // the illustration is missing (legal-book.test.mjs holds it).
      "!lore/game/manual/**",
      // The folder's own README and the adventure TEMPLATE stay out, for the
      // same reason README.md and CONTRIBUTING.md at the root do (ADR-047):
      // they are the furniture of a directory, not documents of the series.
      // Both are read on GitHub, where a README belongs.
      "!lore/README.md",
      "!lore/adventures/README.md",
      "!lore/adventures/*/README.md",
      "!lore/adventures/tabletop/TEMPLATE.md",
    ],    base: "..",
  }),
  // Fully lax: agents/_template/STATUS.md carries `status:` as an object,
  // and other outliers exist — pages type-guard what they display.
  schema: z.object({}).passthrough(),
});

export const collections = { missions, reports, decisions, designs, system, legal, corpus };
