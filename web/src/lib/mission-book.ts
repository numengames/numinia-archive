// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The mission book (/mission-book and /mission-book.md): what we are doing
// and why, read from the mission files (the Oracle, 2026-10-25).
//
// WHY THIS EXISTS
// /missions shows the work as cards, one per file. Since MIS-198 a mission
// carries a story, two budgets and an invoice, and since MIS-200 the big ones
// are parents of smaller ones; a person who wants to know "what are we doing,
// for whom, and what may it cost" had to open a hundred files. This book reads
// them in the order a person asks: how a mission runs, how it is budgeted,
// then each area with the story of its parent and the table of its children,
// the missions on their own, and what is done with what it taught.
//
// Nothing here is typed but the chapter titles, their one line, the table
// headings and the words for each status. The stories, the criteria and the
// budgets are read from the files at build time.
import fs from "node:fs";
import path from "node:path";
import { composeBook, bookSources, bookMarkdown, summaryOf, type ChapterSpec, type BookChapter, type BookPart } from "@/lib/book";
import { readingOf } from "@/lib/core";

const ROOT = path.resolve(process.cwd(), "..");
const DIR = "missions";

const HOW: ChapterSpec[] = [
  {
    id: "how-a-mission-runs",
    title: "How a mission runs",
    line: "From the first idea to the invoice: who opens a mission, what it needs before it starts, and each step until it closes.",
    parts: [{ path: "procedures/PRO-003-mission-cycle.md", sections: ["1. Purpose and trigger", "3. Procedure"] }],
  },
  {
    id: "how-a-mission-is-budgeted",
    title: "How a mission is budgeted",
    line: "Twice: by weight, how much thinking it needs (a card of the deck, which picks the model and the money), and by time, how much work there is.",
    parts: [{ path: "decisions/ADR-083-a-mission-is-budgeted-twice-by-weight-and-by-time.md", sections: ["2. Decision"], href: "/decisions/adr-083" }],
  },
];

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
      story: section(reading, "1. Story").split("\n\n")[0].replace(/\s+/g, " ").trim(),
      learned: section(reading, "5. What we learned"),
    });
  }
  return out;
}

/** The first sentence: a table cell says what a mission is, its file says the rest. */
const first = (s: string) => (/^.*?[.!?](?=\s|$)/.exec(s.replace(/\s+/g, " ").trim())?.[0] ?? s);
const cell = (s: string) => s.replace(/\|/g, "—").replace(/\s+/g, " ").trim();
const budget = (m: Mission) =>
  m.usd || m.minutes ? [m.usd && `$${m.usd}`, m.minutes && `${m.minutes} min`].filter(Boolean).join(" · ") : "—";
const status = (m: Mission) => STATUS[m.status] ?? m.status;
const open = (m: Mission) => m.status !== "done" && m.status !== "cancelled";

function part(m: Mission, markdown: string): BookPart {
  return { id: m.id, title: `${m.id} — ${m.title}`, href: m.href, path: m.path, markdown };
}

function childTable(kids: Mission[]): string {
  const done = kids.filter((k) => k.status === "done").length;
  return [
    `**${kids.length} missions, ${done} done.**`,
    "",
    "| Mission | For whom, and why | Weight | Budget | Status |",
    "|---|---|---|---|---|",
    ...kids.map((k) => `| [${k.id}](${k.href}) ${cell(k.title)} | ${cell(k.story || first(k.summary))} | ${k.weight || "?"} | ${budget(k)} | ${status(k)} |`),
  ].join("\n");
}

function areas(all: Mission[]): BookPart[] {
  const kids = new Map<number, Mission[]>();
  for (const m of all) if (m.parent != null) kids.set(m.parent, [...(kids.get(m.parent) ?? []), m]);
  return all
    .filter((m) => kids.has(m.n) && open(m))
    .map((m) => part(m, [m.story || m.summary, "", childTable(kids.get(m.n)!)].join("\n")));
}

function alone(all: Mission[]): BookPart[] {
  const parents = new Set(all.map((m) => m.parent).filter((p) => p != null));
  const rows = all.filter((m) => m.parent == null && !parents.has(m.n) && open(m));
  return [{
    id: "", title: `${rows.length} open missions with no parent and no children`, href: "/missions", path: DIR,
    markdown: [
      "| Mission | What it is | Priority | Status |",
      "|---|---|---|---|",
      ...rows.map((m) => `| [${m.id}](${m.href}) ${cell(m.title)} | ${cell(m.story || first(m.summary))} | ${m.priority || "—"} | ${status(m)} |`),
    ].join("\n"),
  }];
}

function done(all: Mission[]): BookPart[] {
  return all
    .filter((m) => m.status === "done")
    .map((m) => part(m, [m.story || m.summary, "", m.learned ? `**What we learned.** ${m.learned}` : "*What we learned: not written.*"].join("\n")));
}

/** What the book does not hold yet, said instead of filled. */
export const MISSION_GAPS: string[] = [
  "The board cards of each mission, and the real minutes and dollars they spent, live on the agents' machine; the site does not read them. A mission's invoice reaches this book when it is pasted into its file at close.",
  "The weights of the child missions were set by one agent when the parents were split; the team votes them with the deck when each one opens.",
];

export function missionBook(): BookChapter[] {
  const all = missions();
  const [runs, budgeted] = composeBook("mission-book.ts", HOW);
  const ch = (numeral: string, id: string, title: string, line: string, parts: BookPart[]): BookChapter => ({ id, numeral, title, line, parts });
  return [
    runs,
    budgeted,
    ch("III", "what-is-open", "What is open, by area", "Each area is a parent mission: its story, then the smaller missions it was split into, each with its weight and its budget.", areas(all)),
    ch("IV", "on-their-own", "Missions on their own", "The open missions that belong to no area: most were written before missions had a story and a budget.", alone(all)),
    ch("V", "what-is-done", "What is done, and what it taught", "Every mission closed, with what it taught us when it was written down.", done(all)),
  ];
}

/** Every file the book reads, for the .md view's preamble and the tests. */
export function missionSources(): string[] {
  return [...bookSources(HOW), ...missions().map((m) => m.path)];
}

export function missionMarkdown(): string {
  return bookMarkdown(
    "The mission book",
    "What we are doing and why: how a mission runs and is budgeted, each area with its missions, and what is done. Every word here is read from the archive; nothing is written for the book.",
    missionBook(),
    MISSION_GAPS,
  );
}
