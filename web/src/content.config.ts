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
      territory: z.string().optional(),
      area: z.string().optional(),   // legado: D-010, ya migrado
      type_execution: z.string().optional(),
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
      territory: z.string().optional(),
      area: z.string().optional(),   // legado: D-010, ya migrado
      created: z.string(),
    })
    .passthrough(),
});

// Blueprints/planos — the root blueprints/ folder is the source of truth
// (MIS-065: the hardcoded planos.ts copy retires).
const blueprints = defineCollection({
  loader: glob({ pattern: ["BLU-*.md"], base: "../blueprints" }),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      status: z.string().default("active"),
      territory: z.string().optional(),
      area: z.string().optional(),   // legado: D-010, ya migrado
      semaforo: z.string().optional(),
      created: z.string(),
    })
    .passthrough(),
});

// system/ — reference manuals of how the system works today (ADR-035).
// SYS-003 carries the fondos + graph data the /archive pages render, which is
// why this collection is typed rather than left to the lax corpus mirror.
const system = defineCollection({
  loader: glob({ pattern: ["SYS-*.md"], base: "../system" }),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      status: z.string().default("active"),
      territory: z.string().optional(),
      created: z.string(),
    })
    .passthrough(),
});

// Legal artifacts — the master copies live in operations/ (per the FLAG-1
// record): the published pages derive from them at build time. Reserved-
// rights content, read here only for display (C-005 §5). Publication with
// open review flags is an Oracle-ordered exception — see CON-004/CON-005.
// MIS-127 (2026-09-01): operations/ was flattened to one level, so this
// collection selects the two legal documents by filename instead of by
// folder. Their reserved regime is now pinned per-file in REUSE.toml.
const legal = defineCollection({
  loader: glob({ pattern: "OPS-00{3,4}-*.md", base: "../operations" }),
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

// The full-canon mirror (MIS-087): every repo .md outside the detail
// collections above gets a generic corpus entry. Negated patterns keep
// single ownership of a file between corpus and the typed collections.
// Schema is lax on purpose — frontmatter varies per
// directory and some files (README, INDEX) carry none.
const corpus = defineCollection({
  loader: glob({
    pattern: [
      "*.md",
      "agents/**/*.md",
      "canon/**/*.md",
      "operations/**/*.md",
      "protocols/**/*.md",
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
      "blueprints/**/*.md",
      "!blueprints/BLU-*.md",
      // No exclusion twin to blueprints' below: BLU-* are excluded here
      // because /blueprints/<slug> renders them. SYS-* have no route of
      // their own, so the corpus mirror is where they become readable —
      // and it is where MIS-129's redirects send the retired addresses.
      "system/**/*.md",
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
      // lore/ is NOT here on purpose: reserved regime (REUSE.toml), the RPG
      // manual and the codex matter. The archive holds it; numinia.com
      // renders it for citizens (fetch-lore.mjs reads it at build). This
      // viewer is public and would publish the whole manual as a page.
    ],    base: "..",
  }),
  // Fully lax: agents/_template/STATUS.md carries `status:` as an object,
  // and other outliers exist — pages type-guard what they display.
  schema: z.object({}).passthrough(),
});

export const collections = { missions, reports, decisions, blueprints, system, legal, corpus };
