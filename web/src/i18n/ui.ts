// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// MIS-120(e) — the UI dictionary, English only. The Spanish half was deleted
// with the /es/ routes: the archive serves one corpus, in English, and the
// reader's browser translates the whole page — chrome included — better than
// a half-translated site ever did (DEC-006).
//
// Rule: pages and components never hardcode reader-visible UI text — they
// call t("key"). Kept as a single source of UI strings, not as i18n.

const en = {
  // — navigation chrome —
  "nav.missions": "Missions",
  "nav.corpus": "Corpus",
  "nav.decisions": "Decisions",
  "nav.blueprints": "Blueprints",
  "nav.reports": "Reports",
  "nav.openMenu": "Open menu",
  "nav.langSelector": "Language",

  // — footer —
  "footer.navigation": "Navigation",
  "footer.house": "Numen Games",
  "footer.legal": "Legal",
  "footer.terms": "Terms and conditions",
  "footer.privacy": "Privacy policy",
  "footer.social": "Social",
  "footer.licence": "Open by licence, per file",
  "footer.licenceTitle": "Code MIT · corpus CC0 · standards CC-BY-4.0 · legal texts and brand reserved. The per-path map is REUSE.toml",
  "footer.telemetry": "Telemetry",
  "footer.telemetryTitle": "Figures measured from this corpus, each with the predicate it is true of",
  "footer.versionTitle": "What changed in each version",
  "footer.commitTitle": "See this commit on GitHub",
  "footer.thisSite": "you are here",

  // — site search (SiteSearch.astro) —
  "search.label": "Search",
  "search.aria": "Site search",
  "search.placeholder": "Search the archive…",

  // — speech player (SpeechPlayer.astro, phase c wires these) —
  "speech.listen": "Listen",
  "speech.pause": "Pause",
  "speech.resume": "Resume",
  "speech.stop": "Stop listening",
  "speech.listenAria": "Listen to this document",
  "speech.pauseAria": "Pause listening",
  "speech.resumeAria": "Resume listening",
  "speech.noEngine": "This browser has no speech synthesis",
  "speech.nothing": "Nothing to read on this page",
  "speech.rateAria": "Playback rate: {rate}x. Press to change",
  "speech.min": "min",

  // — doc toolbar —
  "toolbar.copy": "Copy",
  "toolbar.copied": "Copied",
  "toolbar.error": "Error",
  "toolbar.copyAria": "Copy raw markdown",
  "toolbar.downloadAria": "Download {file}",
  "toolbar.sourceAria": "Open {file} in the repository",

  // — missions board (pilot page) —
  "board.searchPlaceholder": "Search missions — ID, title, assignee, guild…",
  "board.searchAria": "Search missions",
  "board.clearAria": "Clear search",
  "board.about": "About",
  "board.costLegend": "Cost legend",
  "board.effort": "Effort",
  "board.guild": "Guild",
  "board.priority": "Priority",
  "board.status": "Status",
  "board.filter.all": "All",
  "board.filter.inProgress": "In Progress",
  "board.filter.inReview": "In Review",
  "board.filter.critical": "Critical",
  "board.filter.high": "High",
  "board.filter.medium": "Medium",
  "board.filter.low": "Low",
  "board.col.inProgress": "In progress",
  "board.col.inReview": "In review",
  "board.col.backlog": "Backlog",
  "board.col.done": "Done",
  "board.col.frozen": "Frozen",
  "board.completed": "Completed",

  // — corpus index (pilot page) —
  "corpus.title": "Corpus",
  "corpus.intro": "The archive as it is served: every published document, by section.",
  "corpus.root": "root",

  // — home (pilot page) —
  "home.whatItIs": "What it is",
  "home.whyItMatters": "Why it matters",
  "home.features": "Features",
  "home.architecture": "Architecture",
  "home.designPrinciples": "Design principles",
  "home.implementation": "Implementation",
  "home.requirements": "Requirements",
  "home.reference": "Reference implementation",
  "home.narrativeLayer": "About the Narrative Layer",
  "home.active": "Active",
  "home.optional": "Optional",
  "home.fields": "Fields:",
} as const;

export const ui = { en } as const;
export type UIKey = keyof typeof en;

/** Look up a UI string. English only; the browser handles translation. */
export function useT(_locale?: string) {
  return (key: UIKey, vars?: Record<string, string>): string => {
    let s: string = en[key];
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v);
    return s;
  };
}
