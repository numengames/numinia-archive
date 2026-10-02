// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The sales playbook (/playbook and /playbook.md): a sale's stages from
// STD-038's table, the protocol that moves each one on (its own title and
// question), and the collateral each hands over (STD-047, through the kit).
// Read at build time; nothing here is typed but which protocol follows which
// stage, and that is checked against the protocols' own files.
import fs from "node:fs";
import path from "node:path";
import { pieces, STAGE_PROTOCOL, COLLATERAL_SOURCES, type Piece } from "@/lib/collateral";

const ROOT = path.resolve(process.cwd(), "..");
const REGISTER = "standards/STD-038-the-stages-of-an-opportunity.md";

export interface PlaybookStage {
  stage: string;
  means: string;
  evidence: string;
  protocol: { id: string; title: string; question: string; href: string } | null;
  pieces: Piece[];
}
export interface Playbook {
  stages: PlaybookStage[];
  protocols: { id: string; title: string; question: string; href: string }[];
  pieces: Piece[];
  sources: { register: string; collateral: string };
}

const unTick = (s: string) => s.replace(/`/g, "").trim();

function saleRows(): { stage: string; means: string; evidence: string }[] {
  const text = fs.readFileSync(path.join(ROOT, REGISTER), "utf8");
  const start = text.indexOf("\n## The stages");
  const block = text.slice(start, text.indexOf("\n## ", start + 5));
  return block.split("\n")
    .filter((l) => /^\| `sale` \|/.test(l))
    .map((l) => l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()))
    .map(([, stage, means, evidence]) => ({ stage: unTick(stage), means, evidence: evidence.replace(/`/g, "") }));
}

function protocolOf(id: string, href: string) {
  const dir = path.join(ROOT, "protocols");
  const f = fs.readdirSync(dir).find((n) => n.startsWith(`${id}-`));
  if (!f) throw new Error(`the playbook names ${id}, which has no file in protocols/`);
  const text = fs.readFileSync(path.join(dir, f), "utf8");
  const title = /^title:\s*"?(.*?)"?\s*$/m.exec(text)?.[1] ?? id;
  const question = /^> \*\*Epistemic:\*\*\s*(.*)$/m.exec(text)?.[1] ?? "";
  return { id, title, question, href };
}

let cached: Playbook | null = null;

export function playbook(): Playbook {
  if (cached) return cached;
  const all = pieces();
  const protocols = new Map<string, ReturnType<typeof protocolOf>>();
  const stages = saleRows().map((r) => {
    const p = STAGE_PROTOCOL[r.stage];
    const protocol = p ? (protocols.get(p.id) ?? protocols.set(p.id, protocolOf(p.id, p.href)).get(p.id)!) : null;
    return { ...r, protocol, pieces: all.filter((x) => x.stages.includes(r.stage)) };
  });
  cached = {
    stages,
    protocols: [...protocols.values()],
    pieces: all,
    sources: { register: "/standards/std-038-the-stages-of-an-opportunity", collateral: "/standards/std-047-the-sales-collateral" },
  };
  return cached;
}

export const PLAYBOOK_SOURCES = [...new Set([REGISTER, ...COLLATERAL_SOURCES])];

/** The playbook as markdown, for /playbook.md. */
export function playbookMarkdown(): string {
  const b = playbook();
  const out = [
    "# The sales playbook",
    "",
    "From an opportunity found to a sale won or lost: each stage, the protocol that moves it on, and the collateral it hands to the other side.",
    "",
  ];
  b.stages.forEach((s, i) => {
    out.push(`## Stage ${i + 1} · \`${s.stage}\``, "", `**${s.means}.** Evidence that puts a sale here: ${s.evidence}.`, "");
    if (s.protocol) out.push(`Moved on by [${s.protocol.title}](${s.protocol.href}) — ${s.protocol.question}`, "");
    if (s.pieces.length) {
      out.push("| Piece | What it does | Made from | Made by | State |", "|---|---|---|---|---|");
      for (const p of s.pieces) out.push(`| ${p.piece} | ${p.does} | ${p.from} | ${p.renderable ? "the kit" : "hand"} | ${p.state} |`);
      out.push("");
    }
  });
  return out.join("\n");
}
