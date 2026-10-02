// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The cookie notice (LEG-003 §4), shared shape across the four sites of
// Numen Games; only the SITE block differs. Library: vanilla-cookieconsent
// (MIT, orestbida/cookieconsent) — Accept all and Reject all side by side,
// equal weight, as the AEPD cookie guide asks; browsing accepts nothing.
//
// What this site stores is listed in LEG-003 §3 and mirrored in
// STORED_KEYS below; a test fails when the code stores a key the list does
// not name. This site has nothing optional: every key is a preference the
// visitor sets or the record of the choice itself, so the notice informs
// and both buttons end in the same state. Say so, do not pretend a choice.

import * as CookieConsent from "vanilla-cookieconsent";

/** LEG-003's major version. Raising it asks every visitor again. */
export const POLICY_REVISION = 2;

/** The cookie that records the choice (LEG-003 §3, first row). */
export const CONSENT_COOKIE = "numen_consent";

/** Every key this site writes, as LEG-003 §3.2 names it. */
export const STORED_KEYS = ["numen_consent", "numinia-modo", "numinia-narrative", "sp:rate", "sp:"] as const;

const SITE = {
  policyHref: "/legal/cookies",
  noticeHref: "/legal/notice",
  title: "This site keeps a few things in your browser",
  description:
    "Only what you choose — day or night, the reading speed — and this answer. Nothing follows you, nothing is sent to anyone. Both buttons leave the site the same.",
};

export function startCookieNotice(): void {
  void CookieConsent.run({
    revision: POLICY_REVISION,
    cookie: { name: CONSENT_COOKIE, expiresAfterDays: 182, sameSite: "Lax" },
    guiOptions: {
      consentModal: { layout: "box", position: "bottom right", equalWeightButtons: true, flipButtons: false },
      preferencesModal: { layout: "box", equalWeightButtons: true, flipButtons: false },
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
    },
    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: SITE.title,
            description: `${SITE.description} <a href="${SITE.policyHref}">Cookie policy</a>`,
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            showPreferencesBtn: "Preferences",
            footer: `<a href="${SITE.noticeHref}">Legal notice</a><a href="/legal/privacy">Privacy</a>`,
          },
          preferencesModal: {
            title: "What this site keeps",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            savePreferencesBtn: "Save my choice",
            closeIconLabel: "Close",
            sections: [
              {
                title: "Needed, and yours",
                description:
                  "Your day or night mode, the page reader's speed and where you paused it, and the record of this answer. You set them yourself; they cannot be switched off here, only deleted from your browser.",
                linkedCategory: "necessary",
              },
              {
                title: "Nothing else",
                description: `No measurement, no advertising, nothing from other companies. The full list, key by key, is in the <a href="${SITE.policyHref}">cookie policy</a>.`,
              },
            ],
          },
        },
      },
    },
  });
}

/** The footer's "Change my choice" button. */
export function reopenCookieNotice(): void {
  CookieConsent.showPreferences();
}
