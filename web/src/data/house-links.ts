// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The four sites of the house, in the order a visitor would read them:
// the company, the game, the archive, the service. The same list is in
// every site's footer (a copy per repository, by decision of 2026-09-16:
// no shared package yet), with the current site rendered as text, not a
// link. From any of the four you can see the other three and what they
// are for — that is the column's whole job.
export interface HouseLink {
  readonly id: "company" | "game" | "archive" | "service";
  readonly label: string;
  readonly what: string;
  readonly href: string;
}

export const HOUSE_LINKS: readonly HouseLink[] = [
  { id: "company", label: "Numen Games", what: "the company", href: "https://numen.games" },
  { id: "game", label: "Numinia", what: "the game", href: "https://numinia.com" },
  { id: "archive", label: "NWOS", what: "the archive, built in public", href: "https://numinia.org" },
  { id: "service", label: "NWOS for your organisation", what: "the service", href: "https://nwos.numen.games" },
];

/** Which of the four this site is. */
export const THIS_SITE: HouseLink["id"] = "archive";
