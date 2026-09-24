// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The navigation, derived from the classification.
//
// Until 2026-09-21 this file was a hand-written list of ten entries "ordered
// by authority", with three more hidden in the footer because the bar was
// full, and a comment block per entry explaining why it sat where it sat.
// The archive is classified by function (STD-027); the site was navigated by
// another logic, kept in sync by hand — the same drift the /archive page had
// before it learned to read the standard. This is the same fix.
//
// Six entries, one per function, in the order STD-027 writes them. Each is a
// menu of the series its activities produce. Nothing here is typed: a series
// added to the standard appears in the menu on the next build, or the build
// fails in @/lib/classification because nobody said where the site serves it.
//
// BLU-009 §12 recipe says "≤5 entries". This bar has six, by the Oracle's
// word (2026-09-21): here the menu IS the scheme, and a scheme with six
// functions gets six doors. The recipe's number is a recommendation for
// corporate sites; the amendment is owed in BLU-009 and is named in the PR.
import { functions, type Fn, type Series } from "@/lib/classification";

export interface NavEntry {
  /** the series, as the menu prints it — "Standards" */
  readonly label: string;
  readonly href: string;
  /** the activity (verb) beneath the label — "Standardising" */
  readonly activity: string;
  /** printed beside the row when set: why this one has no index of its own */
  readonly note: string | null;
  /** the folder, for the active-state match — "standards/" */
  readonly folder: string;
}

export interface NavGroup {
  /** the function — "Governance" */
  readonly label: string;
  /** route segment and active-state key — "governance" */
  readonly id: string;
  /** the function's own page: /archive/<id> */
  readonly href: string;
  readonly entries: readonly NavEntry[];
}

function entryOf(s: Series): NavEntry {
  if (s.href === null) {
    // classification.ts lets a series be unpublished with a reason; the menu
    // has nowhere to send a click, so it refuses rather than render a dead row.
    throw new Error(
      `navigation: the series "${s.folder}" has no address and cannot be a menu entry. ` +
        `Give it an href in SERVED_AT (web/src/lib/classification.ts) or take it out of the scheme.`,
    );
  }
  return { label: s.label, href: s.href, activity: s.activity, note: s.note, folder: s.folder };
}

function groupOf(fn: Fn): NavGroup {
  return {
    label: fn.name,
    id: fn.slug,
    href: fn.href,
    entries: fn.activities.flatMap((a) => a.series.map(entryOf)),
  };
}

/** The six menus, in the standard's order. Bar, mobile panel and footer all read this. */
export const navGroups: readonly NavGroup[] = functions().map(groupOf);

/**
 * Which function a page belongs to, from the folder it serves. Pages pass the
 * folder ("standards/") or a function slug ("governance") as `activeNav`; both
 * resolve here so the bar underlines the right door.
 */
export function activeGroupOf(activeNav: string | undefined): string | undefined {
  if (!activeNav) return undefined;
  const byId = navGroups.find((g) => g.id === activeNav);
  if (byId) return byId.id;
  const byFolder = navGroups.find((g) => g.entries.some((e) => e.folder === activeNav || e.href === activeNav));
  return byFolder?.id;
}

/**
 * The site's own pages — not series, not functions, but doors a reader needs
 * from every page. The footer prints them under the six functions.
 */
export const siteLinks: readonly { label: string; href: string }[] = [
  { label: "Design system", href: "/design" },
  { label: "Updates", href: "/updates" },
  { label: "Telemetry", href: "/telemetry" },
];
