// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The sales collateral on the site (STD-047): the wand on a sale's page and
// the sales playbook. Every piece is rendered at build time THROUGH THE KIT'S
// OWN RENDERER — machine/packages/sales-kit/collateral.mjs — from the record's
// Pitch and the offer's Packages, so the page and the command line can never
// say two different things. The stages and the record's current stage are the
// pipeline tool's (src/lib/pipeline.ts).
//
// What a public page may NOT carry: the organisation's name before it agreed,
// and the person written to. So the preview is rendered with the record's own
// organisation line (a sector and a size until it agreed, OPP-011) and a
// placeholder for the person; the seller renders the piece they will send
// with the command line, from the target list, outside the archive. A piece
// holding a person's name the card does not list fails the build here, as it
// fails the command line (OPP-006).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { pipeline, type PRecord } from "@/lib/pipeline";

const ROOT = path.resolve(process.cwd(), "..");
const KIT = path.join(ROOT, "machine", "packages", "sales-kit", "collateral.mjs");
const PIPE = path.join(ROOT, "machine", "packages", "sales-kit", "pipeline.mjs");
// Imported by URL so Vite does not try to bundle a file outside the project.
const tool = await import(/* @vite-ignore */ pathToFileURL(KIT).href);
const pipe = await import(/* @vite-ignore */ pathToFileURL(PIPE).href);

export const COLLATERAL_SOURCES = [
  "standards/STD-047-the-sales-collateral.md",
  "standards/STD-038-the-stages-of-an-opportunity.md",
  "operations/OPS-012-training-the-offer.md",
  "protocols/PRO-028-qualifying-an-opportunity.md",
  "protocols/PRO-029-making-a-proposal.md",
  "protocols/PRO-030-closing-a-sale.md",
  "machine/packages/sales-kit/collateral.mjs",
];

/** The protocol that moves a sale out of each stage (STD-038, the three sales protocols). */
export const STAGE_PROTOCOL: Record<string, { id: string; title: string; href: string }> = {
  lead: { id: "PRO-028", title: "Qualifying an opportunity", href: "/protocols/pro-028-qualifying-an-opportunity" },
  qualified: { id: "PRO-029", title: "Making a proposal", href: "/protocols/pro-029-making-a-proposal" },
  analysed: { id: "PRO-029", title: "Making a proposal", href: "/protocols/pro-029-making-a-proposal" },
  proposed: { id: "PRO-030", title: "Closing a sale", href: "/protocols/pro-030-closing-a-sale" },
  agreed: { id: "PRO-030", title: "Closing a sale", href: "/protocols/pro-030-closing-a-sale" },
  won: { id: "PRO-030", title: "Closing a sale", href: "/protocols/pro-030-closing-a-sale" },
  lost: { id: "PRO-030", title: "Closing a sale", href: "/protocols/pro-030-closing-a-sale" },
};

export interface Piece {
  /** the register's stage cell, e.g. `qualified` or `won · lost` */
  stage: string;
  stages: string[];
  piece: string;
  does: string;
  from: string;
  missingWhen: string;
  template: string;
  state: string;
  /** the kit can render it */
  renderable: boolean;
}

export interface Rendered {
  piece: string;
  template: string;
  ext: "html" | "txt";
  /** a filesystem-safe download name */
  filename: string;
  text: string;
  missing: string[];
}

export interface Wand {
  record: PRecord;
  stages: string[];
  current: string;
  pieces: Piece[];
  rendered: Rendered[];
}

let cachedPieces: Piece[] | null = null;

/** Every piece of the register, with the stages it belongs to. */
export function pieces(): Piece[] {
  if (cachedPieces) return cachedPieces;
  cachedPieces = (tool.catalogue() as Omit<Piece, "stages" | "renderable">[]).map((p) => ({
    ...p,
    stages: p.stage.split("·").map((s) => s.trim()).filter(Boolean),
    renderable: Boolean(tool.PIECES[p.template]),
  }));
  return cachedPieces;
}

/** A sale's stages, in order, from the register. */
export function saleStages(): string[] {
  const reg = pipe.loadRegister();
  return reg.kinds.find((k: { kind: string }) => k.kind === "sale")?.stages ?? [];
}

const offerFile = (offer: string | null) => {
  if (!offer) return null;
  const dir = path.join(ROOT, "operations");
  const f = fs.readdirSync(dir).find((n) => n.startsWith(`${offer}-`) && n.endsWith(".md"));
  return f ? path.join(dir, f) : null;
};

/** The wand for one record, or null when the record is not a sale. */
let cachedF: ReturnType<typeof pipeline> | null = null;

export function wandFor(id: string): Wand | null {
  const F = (cachedF ??= pipeline());
  const record = F.records.find((r) => r.id === id);
  if (!record || record.kind !== "sale") return null;
  const file = path.join(ROOT, "opportunities", `${record.id}.md`);
  const text = fs.readFileSync(file, "utf8");
  const offerPath = offerFile(record.offer);
  const offer = offerPath ? fs.readFileSync(offerPath, "utf8") : "";
  const today = F.today;
  const rendered: Rendered[] = [];
  for (const p of pieces().filter((x) => x.renderable)) {
    const spec = tool.PIECES[p.template];
    const r = tool.render(p.template, text, offer, {
      lang: "es",
      // The two things a public page never carries: the organisation's name
      // and the person written to. The seller types them at render time.
      organisation: "[nombre del organismo]",
      signature: "[tu nombre y firma] · Numen Games S.L.",
      greeting: "Buenos días:",
      today,
    });
    if (r.names.length) throw new Error(`${record.id} ${p.template}: ${r.names.join(", ")} read as a person's name the card does not list (OPP-006)`);
    rendered.push({
      piece: p.piece,
      template: p.template,
      ext: spec.ext,
      filename: `${today.replace(/-/g, "_")}-${record.id}-${p.template.replace(/\.(html|txt)$/, "")}.es.${spec.ext}`,
      text: r.text,
      missing: r.missing,
    });
  }
  return { record, stages: saleStages(), current: record.stage, pieces: pieces(), rendered };
}
