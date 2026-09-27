// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The core as a flow: each canon, the standards that make it concrete, the
// protocols that carry it out.
//
// WHY THIS EXISTS
// The Oracle reviews the core by listening to it end to end (2026-09-27).
// Shelf by shelf, the canon, the standards and the protocols are three lists;
// the question a reviewer brings is causal — this belief, these rules, these
// steps. So every standard and protocol names the one canon it comes from in
// its header (`derived_from`, a relation STD-004 registers), and this module
// builds the flow from that field and nothing else. No order, grouping or
// summary is typed here: change a header and the page follows.
//
// WHAT IT READS
// The body of each document, without the apparatus a listener does not need
// — the Check table and the References — so the page, read aloud by the
// site's own player, is the episode: the canon whole, then each rule, then
// each step.
//
// A standard or protocol with no canon THROWS. Dropping it silently would
// publish a flow that looks complete and is not.
import fs from "node:fs";
import path from "node:path";

const ARCHIVE_ROOT = path.resolve(process.cwd(), "..");

export interface CoreDoc {
  id: string;
  title: string;
  status: string;
  question: string;
  summary: string;
  /** The rendered document's own page: `/standards/std-020-git-is-the-archive`. */
  docHref: string;
  /** Repo-relative file: `standards/STD-020-git-is-the-archive.md`. */
  path: string;
  /** Markdown body a listener hears: no header, title, card, Check or References. */
  reading: string;
}

export interface CoreCanon extends CoreDoc {
  /** This canon's page in the flow: `/core/can-009-the-archive-is-the-organisation`. */
  href: string;
  slug: string;
  standards: CoreDoc[];
  protocols: CoreDoc[];
}

function field(head: string, name: string): string | undefined {
  const m = new RegExp(`^${name}:\\s*(.*?)\\s*$`, "m").exec(head);
  if (!m) return undefined;
  return m[1].replace(/^["'](.*)["']$/, "$1") || undefined;
}

/** A card line (`> **Epistemic:** …`), joined across its wrapped lines. */
function cardLine(text: string, label: string): string {
  const out: string[] = [];
  let on = false;
  for (const line of text.split("\n")) {
    if (!line.startsWith(">")) { if (on) break; continue; }
    const body = line.replace(/^>\s?/, "");
    const start = body.match(/^\*\*(\w+):\*\*\s*(.*)$/);
    if (start) { on = start[1] === label; if (on) out.push(start[2]); continue; }
    if (on) out.push(body.trim());
  }
  return out.join(" ").replace(/\s+/g, " ").trim();
}

const APPARATUS = /^(Check|References)\b/;

/** The body a listener hears. */
export function readingOf(text: string): string {
  let body = text;
  if (body.startsWith("---")) body = body.slice(body.indexOf("\n---", 3) + 4);
  // Drop HTML comments (SPDX blocks). Repeated until nothing changes, and any
  // unclosed opener removed, so no `<!--` survives a nested or broken comment.
  let prev: string;
  do { prev = body; body = body.replace(/<!--[\s\S]*?-->/g, ""); } while (body !== prev);
  body = body.split("<!--").join("");
  const lines = body.split("\n");
  const out: string[] = [];
  let skip = false;
  let inCard = false;
  for (const line of lines) {
    if (/^# /.test(line)) continue;
    if (/^> \*\*(Summary|Epistemic|Pragmatic|Audience):\*\*/.test(line)) { inCard = true; continue; }
    if (inCard) { if (line.startsWith(">")) continue; inCard = false; }
    const h2 = line.match(/^## (.*)$/);
    if (h2) skip = APPARATUS.test(h2[1].trim());
    if (!skip) out.push(line);
  }
  return out.join("\n").replace(/^\s*---\s*$/m, "").replace(/\n{3,}/g, "\n\n").trim();
}

function load(folder: string, prefix: string) {
  const dir = path.join(ARCHIVE_ROOT, folder);
  let files: string[] = [];
  try { files = fs.readdirSync(dir).filter((f) => f.startsWith(prefix) && f.endsWith(".md")).sort(); } catch { /* absent */ }
  return files.map((f) => {
    const text = fs.readFileSync(path.join(dir, f), "utf8");
    const close = text.indexOf("\n---", 3);
    const head = text.startsWith("---") && close > 0 ? text.slice(0, close) : "";
    const stem = f.replace(/\.md$/, "");
    const doc: CoreDoc = {
      id: field(head, "id") ?? stem.slice(0, 7),
      title: field(head, "title") ?? stem,
      status: field(head, "status") ?? "draft",
      question: cardLine(text, "Epistemic"),
      summary: cardLine(text, "Summary"),
      docHref: `/${folder}/${stem.toLowerCase()}`,
      path: `${folder}/${f}`,
      reading: readingOf(text),
    };
    return { doc, anchor: field(head, "derived_from"), slug: stem.toLowerCase() };
  });
}

/** Every canon in order, each with its standards and protocols. */
export function coreFlow(): CoreCanon[] {
  const canons: CoreCanon[] = load("canon", "CAN-").map(({ doc, slug }) => ({
    ...doc, slug, href: `/core/${slug}`, standards: [], protocols: [],
  }));
  const byId = new Map(canons.map((c) => [c.id, c]));
  const orphans: string[] = [];
  for (const [folder, prefix, key] of [["standards", "STD-", "standards"], ["protocols", "PRO-", "protocols"]] as const) {
    for (const { doc, anchor } of load(folder, prefix)) {
      const canon = anchor ? byId.get(anchor) : undefined;
      if (!canon) { orphans.push(`${doc.id} (derived_from: ${anchor ?? "none"})`); continue; }
      canon[key].push(doc);
    }
  }
  if (orphans.length) {
    throw new Error(
      `core.ts: these documents name no canon that exists, so /core cannot place them: ${orphans.join(", ")}. ` +
        `Add derived_from: "CAN-NNN" to each header.`,
    );
  }
  return canons;
}
