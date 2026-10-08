// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The sales playbook (/playbook and /playbook.md): the whole road of an
// opportunity. It opens BEFORE THE RECORD — the watch that finds a call,
// its feed and the Oracle's decision (PRO-035) — then walks every kind of
// opportunity: its stages from STD-038's table, the procedure that moves each
// on (its own title and question), and, for a sale, the collateral each
// stage hands over (STD-047, through the kit).
// Read at build time; nothing here is typed but which procedure follows which
// stage, and every procedure named is checked against its own file.
import fs from "node:fs";
import path from "node:path";
import { pieces, COLLATERAL_SOURCES, type Piece } from "@/lib/collateral";

const ROOT = path.resolve(process.cwd(), "..");
const REGISTER = "standards/STD-038-the-stages-of-an-opportunity.md";

export const KINDS = ["sale", "tender", "grant", "collaboration", "partner"] as const;
export type Kind = (typeof KINDS)[number];

export const KIND_TITLE: Record<Kind, string> = {
  sale: "A sale",
  tender: "A tender",
  grant: "A grant",
  collaboration: "A collaboration",
  partner: "A partner",
};

/** The procedure that moves a record out of each stage, per kind. Checked against the files. */
const STAGE_PROCEDURE: Record<Kind, Record<string, string>> = {
  sale: { lead: "PRO-028", qualified: "PRO-029", analysed: "PRO-029", proposed: "PRO-030", agreed: "PRO-030", won: "PRO-030", lost: "PRO-030" },
  tender: { found: "PRO-033", read: "PRO-031", bidding: "PRO-031", filed: "PRO-031", awarded: "PRO-031", won: "PRO-031", lost: "PRO-031" },
  grant: { foreseen: "PRO-032", open: "PRO-032", applied: "PRO-032", granted: "PRO-032", justified: "PRO-032", won: "PRO-032", lost: "PRO-032" },
  collaboration: {},
  partner: {},
};
const WATCH = "PRO-035";

export interface Procedure { id: string; title: string; question: string; href: string }
export interface PlaybookStage {
  stage: string;
  means: string;
  evidence: string;
  procedure: Procedure | null;
  pieces: Piece[];
}
export interface PlaybookKind { kind: Kind; title: string; is: string; stages: PlaybookStage[] }
export interface Playbook {
  watch: Procedure & { verdicts: { verdict: string; means: string; feed: string }[] };
  kinds: PlaybookKind[];
  /** the sale's stages */
  stages: PlaybookStage[];
  procedures: Procedure[];
  pieces: Piece[];
  sources: { register: string; collateral: string };
  /** How a first contact asks (STD-047), shown at the stage that sends it. */
  firstContact: { stage: string; rules: Rule[] };
}

const unTick = (s: string) => s.replace(/`/g, "").trim();
const cells = (l: string) => l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

function section(text: string, heading: string): string {
  const start = text.indexOf(`\n## ${heading}`);
  if (start < 0) throw new Error(`the playbook reads "${heading}" in ${REGISTER}, which has no such section`);
  const end = text.indexOf("\n## ", start + 5);
  return text.slice(start, end < 0 ? undefined : end);
}

function register() {
  const text = fs.readFileSync(path.join(ROOT, REGISTER), "utf8");
  const stages = section(text, "The stages").split("\n").filter((l) => /^\| `[a-z]+` \| `[a-z]+` \|/.test(l)).map(cells)
    .map(([kind, stage, means, evidence]) => ({ kind: unTick(kind) as Kind, stage: unTick(stage), means, evidence: evidence.replace(/`/g, "") }));
  const kinds = section(text, "The kinds").split("\n").filter((l) => /^\| `[a-z]+` \|/.test(l)).map(cells)
    .map(([kind, is]) => ({ kind: unTick(kind) as Kind, is }));
  const verdicts = section(text, "A watch's verdict").split("\n").filter((l) => /^\| `[a-z]+` \|/.test(l)).map(cells)
    .map(([verdict, means, feed]) => ({ verdict: unTick(verdict), means, feed }));
  return { stages, kinds, verdicts };
}

const procedures = new Map<string, Procedure>();
function procedureOf(id: string): Procedure {
  if (procedures.has(id)) return procedures.get(id)!;
  const dir = path.join(ROOT, "procedures");
  const f = fs.readdirSync(dir).find((n) => n.startsWith(`${id}-`));
  if (!f) throw new Error(`the playbook names ${id}, which has no file in procedures/`);
  const text = fs.readFileSync(path.join(dir, f), "utf8");
  const title = /^title:\s*"?(.*?)"?\s*$/m.exec(text)?.[1] ?? id;
  const question = /^> \*\*Epistemic:\*\*\s*(.*)$/m.exec(text)?.[1] ?? "";
  const p = { id, title, question, href: `/procedures/${f.replace(/\.md$/, "").toLowerCase()}` };
  procedures.set(id, p);
  return p;
}

/** STD-047's *How a first contact asks*: each numbered rule, its bold title and the rest. */
export interface Rule { title: string; text: string }
export const FIRST_CONTACT_SOURCE = "standards/STD-047-the-sales-collateral.md";
function firstContactRules(): Rule[] {
  const text = fs.readFileSync(path.join(ROOT, FIRST_CONTACT_SOURCE), "utf8");
  const start = text.indexOf("\n## How a first contact asks");
  if (start < 0) throw new Error(`the playbook reads "How a first contact asks" in ${FIRST_CONTACT_SOURCE}, which has no such section`);
  const end = text.indexOf("\n## ", start + 5);
  const body = text.slice(start, end < 0 ? undefined : end);
  return [...body.matchAll(/^\d+\. \*\*(.+?)\*\*([\s\S]*?)(?=^\d+\. \*\*|^Why:|$(?![\s\S]))/gm)]
    .map((m) => {
      const text = m[2].replace(/\s+/g, " ").replace(/`/g, "").trim();
      // "**The price is on the sheet**, with…": the comma stays with the title.
      const lead = /^[,;:]/.test(text) ? text[0] : "";
      return { title: m[1].trim() + lead, text: text.slice(lead.length).trim() };
    });
}

let cached: Playbook | null = null;

export function playbook(): Playbook {
  if (cached) return cached;
  const reg = register();
  const all = pieces();
  const watch = { ...procedureOf(WATCH), verdicts: reg.verdicts };
  const kinds = KINDS.map((kind) => ({
    kind,
    title: KIND_TITLE[kind],
    is: reg.kinds.find((k) => k.kind === kind)?.is ?? "",
    stages: reg.stages.filter((s) => s.kind === kind).map((s) => {
      const pid = STAGE_PROCEDURE[kind][s.stage];
      return {
        stage: s.stage, means: s.means, evidence: s.evidence,
        procedure: pid ? procedureOf(pid) : null,
        pieces: kind === "sale" ? all.filter((x) => x.stages.includes(s.stage)) : [],
      };
    }),
  }));
  cached = {
    watch,
    kinds,
    stages: kinds.find((k) => k.kind === "sale")!.stages,
    procedures: [...procedures.values()],
    pieces: all,
    sources: { register: "/standards/std-038-the-stages-of-an-opportunity", collateral: "/standards/std-047-the-sales-collateral" },
    firstContact: { stage: "qualified", rules: firstContactRules() },
  };
  return cached;
}

export const PLAYBOOK_SOURCES = [...new Set([
  REGISTER, ...COLLATERAL_SOURCES,
  "procedures/PRO-035-watching-for-opportunities.md",
  "procedures/PRO-031-bidding-for-a-tender.md",
  "procedures/PRO-032-applying-for-a-grant.md",
  "procedures/PRO-033-screening-a-tender.md",
])];

/** The playbook as markdown, for /playbook.md. */
export function playbookMarkdown(): string {
  const b = playbook();
  const out = [
    "# The sales playbook",
    "",
    "The whole road of an opportunity: how it is found, how the Oracle decides on it, and the stages each kind passes through until it is won or lost — with the procedure that moves each stage on and, for a sale, what it hands to the other side.",
    "",
    "## Before the record",
    "",
    `A watch sweeps the places where calls are published, keeps only what the house can take alone and writes it, unreviewed, to its feed; the pipeline page shows it apart; the Oracle decides; only a reviewed pull request opens the record. [${b.watch.title}](${b.watch.href}) — ${b.watch.question}`,
    "",
    "| Verdict | Means | Goes to the feed |",
    "|---|---|---|",
    ...b.watch.verdicts.map((v) => `| ${v.verdict} | ${v.means} | ${v.feed} |`),
    "",
  ];
  for (const k of b.kinds) {
    out.push(`## ${k.title}`, "", `${k.is}.`, "");
    k.stages.forEach((s, i) => {
      out.push(`### ${i + 1} · \`${s.stage}\``, "", `**${s.means}.** Evidence: ${s.evidence}.`, "");
      if (s.procedure) out.push(`Moved on by [${s.procedure.title}](${s.procedure.href}) — ${s.procedure.question}`, "");
      if (k.kind === "sale" && s.stage === b.firstContact.stage) {
        out.push("**How a first contact asks** (from [the sales collateral](/standards/std-047-the-sales-collateral)):", "");
        b.firstContact.rules.forEach((r, j) => out.push(`${j + 1}. **${r.title}** ${r.text}`));
        out.push("");
      }
      if (s.pieces.length) {
        out.push("| Piece | What it does | Made from | Made by | State |", "|---|---|---|---|---|");
        for (const p of s.pieces) out.push(`| ${p.piece} | ${p.does} | ${p.from} | ${p.renderable ? "the kit" : "hand"} | ${p.state} |`);
        out.push("");
      }
    });
    if (!k.stages.some((s) => s.procedure)) out.push("No procedure moves this kind yet: its record and its stages are the guide.", "");
  }
  return out.join("\n");
}
