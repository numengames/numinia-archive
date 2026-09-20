// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
export type NavChild = {
  label: string;
  href: string;
  id: string;
};

export type NavItem =
  // a plain link
  | { label: string; href: string; id: string; children?: never; section?: never }
  // a hand-written dropdown
  | { label: string; href?: never; id: string; children: NavChild[]; section?: never }
  // a corpus section: the dropdown is its folder, listed at build time
  | { label: string; href: string; id: string; section: string; children?: never };

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
  // /corpus is no longer listed either: with the six folders in the bar, a
  // seventh entry meaning "all of them at once" is a second answer to a
  // question the bar already answers. Every section index still links to it.
  // /reports is no longer listed. The page still builds and still answers at
  // its URL — as with the thirteen MIS-110 retired, this removes the nav entry,
  // not the route.
];
