// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The house's social accounts, the same on the three sites (numinia.org,
// numinia.com, numen.games). Empty until the Oracle hands over the company
// URLs (X, Discord, GitHub): with an empty list the footer draws no Social
// column. The two personal accounts that sat here until 2026-09-16 were a
// placeholder — a person's profile is not the house's address.
export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: string;
}

export const socialLinks: readonly SocialLink[] = [];
