// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The house's social accounts, the same list on the four sites (a copy
// per repository, no shared package yet). GitHub and Discord are the
// organisation's; X is added when the Oracle hands over its URL.
// Never personal accounts.
export interface SocialLink {
  readonly label: string;
  readonly href: string;
}

export const socialLinks: readonly SocialLink[] = [
  { label: "GitHub", href: "https://github.com/numengames" },
  { label: "Discord", href: "https://discord.gg/ASwwdd24pp" },
];
