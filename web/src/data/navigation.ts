// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
export type NavChild = {
  label: string;
  href: string;
  id: string;
};

export type NavItem =
  // a plain link
  | { label: string; href: string; id: string; children?: never; section?: never; inBar?: boolean }
  // a hand-written dropdown
  | { label: string; href?: never; id: string; children: NavChild[]; section?: never; inBar?: boolean }
  // a corpus section: the dropdown is its folder, listed at build time
  | { label: string; href: string; id: string; section: string; children?: never; inBar?: boolean };

export const navItems: NavItem[] = [
  // One entry per top-level folder of the repository that publishes documents,
  // ORDERED BY AUTHORITY: what binds the rest first, what is bound by
  // everything last. Not invented here — it mirrors the change-threshold table
  // in S-001 §2.1 (governed → open, canon first), and @/lib/corpus SECTIONS holds
  // the same order with the reasoning written out.
  { label: "Canon", href: "/canon/", id: "canon", section: "canon" },
  { label: "Decisions", href: "/decisions/", id: "decisiones", section: "decisions" },
  { label: "Standards", href: "/standards/", id: "standards", section: "standards" },
  { label: "Protocols", href: "/protocols/", id: "protocols", section: "protocols" },
  // System: reference manuals of how the machine works TODAY (ADR-035). It sits
  // after Protocols and before Blueprints on purpose — it is the hinge between
  // what is prescribed and what is merely proposed: this is what runs.
  { label: "System", href: "/system/", id: "system", section: "system" },
  { label: "Blueprints", href: "/blueprints/", id: "planos", section: "blueprints" },
  { label: "Missions", href: "/missions", id: "missions" },
  { label: "Debt", href: "/debt/", id: "debt", section: "debt" },
  // Operations and Objects (2026-09-21): the last two repository folders that
  // publish documents and had no door. They come after Debt because neither
  // binds anything — Operations records what the company is doing, Objects
  // registers the things that are not documents.
  //
  // `inBar: false` — THE BAR IS FULL, and that is a measurement, not a taste.
  // The comment above the desktop nav records that at 768 px seven entries
  // plus the search field already overflowed their column, which is why the
  // breakpoint is `lg`. Ten entries fit at 1024 px; twelve do not. So these
  // two live in the footer's navigation column and in the section strip at
  // the foot of every section index — both reachable from any page, neither
  // pushing the bar into the overflow the `lg` breakpoint exists to avoid.
  // When the bar is reworked to hold more (a "More" group, or the sections
  // collapsing into one entry), drop this flag and they return.
  { label: "Operations", href: "/operations/", id: "operations", section: "operations", inBar: false },
  { label: "Objects", href: "/objects/", id: "objects", section: "objects", inBar: false },
  // Agents and Archive were reachable ONLY by typing the URL. Both are real,
  // built pages — /agents is the roster read from agents/INDEX.md, /archive is
  // the classification scheme generated from STD-027 — and neither appeared in
  // the bar, in the footer, or in any section index. A page nobody can reach
  // is a page that does not exist, however well it is written.
  //
  // They sit after the corpus folders, not among them: those seven are series
  // of documents; these two answer "who acts" and "how is this filed", which
  // are questions ABOUT the corpus rather than parts of it.
  { label: "Agents", href: "/agents/", id: "agents" },
  { label: "Archive", href: "/archive", id: "archive" },
  // /corpus is no longer listed either: with the six folders in the bar, a
  // seventh entry meaning "all of them at once" is a second answer to a
  // question the bar already answers. Every section index still links to it.
  // /reports is no longer listed. The page still builds and still answers at
  // its URL — as with the thirteen MIS-110 retired, this removes the nav entry,
  // not the route.
];

/**
 * What the top bar shows — every entry except the ones marked `inBar: false`.
 *
 * The FOOTER keeps `navItems` whole. That split is the point: the bar is a
 * width-limited surface and has to choose; the footer is a list and does not.
 * A section that does not fit in the bar is still one click away from every
 * page of the site, which is the promise that matters.
 */
export const barItems: NavItem[] = navItems.filter((i) => i.inBar !== false);
