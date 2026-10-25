// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The mission book is the mission board (/missions), the Oracle ruled on
// 2026-10-25: the shelf's card opens the board, and the board opens with the
// areas. This file reads every mission file for it: its story, its weight and
// budgets, and which parent it belongs to, so the board can show each area
// (a parent mission) with the smaller missions it was split into.
import fs from "node:fs";
import path from "node:path";
import { summaryOf } from "@/lib/book";
import { readingOf } from "@/lib/core";

const ROOT = path.resolve(process.cwd(), "..");
const DIR = "missions";

const STATUS: Record<string, string> = {
  todo: "to do", "in-progress": "in progress", "in-review": "in review", "on-hold": "on hold",
  done: "done", draft: "draft", cancelled: "cancelled",
};

export interface Mission {
  n: number;
  id: string;
  title: string;
  status: string;
  priority: string;
  weight: string;
  usd: string;
  minutes: string;
  parent: number | null;
  path: string;
  href: string;
  summary: string;
  story: string;
  learned: string;
}

function field(text: string, name: string): string {
  const head = text.slice(0, text.indexOf("\n---", 3));
  const m = new RegExp(`^${name}:\\s*"?(.*?)"?\\s*$`, "m").exec(head);
  return m && m[1] !== "null" ? m[1] : "";
}

/** The body of one H2 section, without its heading and without trailing rules. */
function section(reading: string, name: string): string {
  const m = new RegExp(`(?:^|\\n)## ${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`).exec(reading);
  if (!m) return "";
  return m[1].split("\n").filter((l) => !/^\s*-{3,}\s*$/.test(l)).join("\n").trim();
}

export function missions(): Mission[] {
  const out: Mission[] = [];
  for (const f of fs.readdirSync(path.join(ROOT, DIR)).filter((x) => /^MIS-\d+.*\.md$/.test(x)).sort()) {
    const text = fs.readFileSync(path.join(ROOT, DIR, f), "utf8");
    const visibility = field(text, "visibility");
    if (visibility && visibility !== "public") continue;
    const reading = readingOf(text);
    const parent = /^MIS-0*(\d+)/.exec(field(text, "parent_mission"));
    out.push({
      n: Number(/^MIS-0*(\d+)/.exec(f)![1]),
      id: field(text, "id"),
      title: field(text, "title"),
      status: field(text, "status"),
      priority: field(text, "priority"),
      weight: field(text, "weight"),
      usd: field(text, "budget_usd"),
      minutes: field(text, "budget_minutes"),
      parent: parent ? Number(parent[1]) : null,
      path: `${DIR}/${f}`,
      href: `/${DIR}/${field(text, "id").toLowerCase()}`,
      summary: summaryOf(text),
      story: section(reading, "1. Story").split("\n\n")[0].replace(/\s+/g, " ").replace(/`/g, "").trim(),
      learned: section(reading, "5. What we learned"),
    });
  }
  return out;
}

/** The first sentence of a summary, for missions written before they had a story. */
export const firstSentence = (s: string) => (/^.*?[.!?](?=\s|$)/.exec(s.replace(/\s+/g, " ").trim())?.[0] ?? s).replace(/`/g, "");
export const statusWord = (m: Mission) => STATUS[m.status] ?? m.status;
const isOpen = (m: Mission) => m.status !== "done" && m.status !== "cancelled";

export interface Area { parent: Mission; children: Mission[]; done: number; moving: number; usd: number; minutes: number }

/** Each open parent mission with its children, in number order. */
export function areas(): Area[] {
  const all = missions();
  const kids = new Map<number, Mission[]>();
  for (const m of all) if (m.parent != null) kids.set(m.parent, [...(kids.get(m.parent) ?? []), m]);
  return all
    .filter((m) => kids.has(m.n) && isOpen(m))
    .map((parent) => {
      const children = kids.get(parent.n)!;
      return {
        parent,
        children,
        done: children.filter((k) => k.status === "done").length,
        moving: children.filter((k) => k.status === "in-progress" || k.status === "in-review").length,
        usd: children.reduce((a, k) => a + (Number(k.usd) || 0), 0),
        minutes: children.reduce((a, k) => a + (Number(k.minutes) || 0), 0),
      };
    });
}
