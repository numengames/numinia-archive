// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// Configuring NWOS — the settings an organisation chooses, gathered.
//
// Three pages each draw one setting of the narrative operating system: the
// narrative and gamification dials (/system/language), the level of
// automation (/automation) and the team of agents (/agent). They were built
// apart and filed apart — the dials sat at the foot of /system behind one
// link — so nobody saw them as what they are: the controls of one system.
// The Oracle (2026-09-29): they are the configuration of the narrative
// system, and they belong together. /configure is that door, and the map
// and the archive reach it from The offer · Organise.
//
// One module feeds the page and its markdown, so the two cannot disagree.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "..");

export interface Setting {
  /** the control, in the reader's words */
  label: string;
  /** the question the setting answers for an organisation */
  question: string;
  /** what the reader will see and do on the page */
  line: string;
  /** the scale, as the page draws it */
  scale: string;
  href: string;
  /** the page's source under web/src/pages, checked at build */
  page: string;
  icon: string;
}

export const SETTINGS: Setting[] = [
  {
    label: "Narrative",
    question: "How much story does your organisation speak in?",
    line: "From plain business words to a full world of guilds, missions and oracles. Pick a level and see the vocabulary change.",
    scale: "1–5 · Business → Mythic",
    href: "/system/language",
    page: "system/language.astro",
    icon: "book-open",
  },
  {
    label: "Gamification",
    question: "How much play is in the work?",
    line: "From no mechanics at all to ranks, quests and rewards. Set it beside the narrative dial and read which mechanics unlock.",
    scale: "1–5 · none → full",
    href: "/system/language#gamif-buttons",
    page: "system/language.astro",
    icon: "game-controller",
  },
  {
    label: "Automation",
    question: "What may an agent do without asking?",
    line: "Five levels, from an agent that only proposes to one that acts alone, and the sixteen permissions granted at each.",
    scale: "5 levels · 16 permissions",
    href: "/automation",
    page: "automation.astro",
    icon: "lightning",
  },
  {
    label: "The team",
    question: "Who does the work?",
    line: "The humans and the digital agents, each with a role, a character and its files. A new agent starts from the templates.",
    scale: "roster · templates",
    href: "/agent",
    page: "agent.astro",
    icon: "robot",
  },
];

export const CONFIG_INTRO =
  "NWOS is one system that each organisation tunes. Four settings decide how it feels to work in it: how much story it speaks, how much play it carries, how much its agents do alone, and who those agents are. Each one has its own page; this is where they meet.";

/** The templates a new agent is copied from, and the skill agents read. */
export const TEMPLATES: { label: string; line: string; href: string; file: string }[] = [
  { label: "Operator", line: "Who governs the agent and when it must escalate", href: "/agents/_template/operator", file: "agents/_template/OPERATOR.md" },
  { label: "Soul", line: "Who the agent is: character, voice, limits", href: "/agents/_template/soul", file: "agents/_template/SOUL.md" },
  { label: "Sources", line: "Where the agent's knowledge comes from", href: "/agents/_template/sources", file: "agents/_template/SOURCES.md" },
  { label: "Skill: opening a pull request", line: "The procedure an agent follows to change this archive", href: "/agents/skills/numinia-nwos-pr/skill", file: "agents/skills/numinia-nwos-pr/SKILL.md" },
  { label: "Skill: screening a tender", line: "Bid, possible or decline, from the terms and never from a summary", href: "/agents/skills/tender-screening/skill", file: "agents/skills/tender-screening/SKILL.md" },
];

/** Throws at build when a setting or a template names something not in the tree. */
export function settings(): Setting[] {
  for (const s of SETTINGS) {
    const f = path.join(ROOT, "web", "src", "pages", s.page);
    if (!fs.existsSync(f)) throw new Error(`/configure lists ${s.href}, and web/src/pages/${s.page} is not in the tree`);
  }
  for (const m of TEMPLATES) {
    if (!fs.existsSync(path.join(ROOT, m.file))) throw new Error(`/configure lists ${m.file}, which is not in the tree`);
  }
  return SETTINGS;
}
