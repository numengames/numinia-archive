#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// check-responsive.mjs — the design system's web numbers, measured.
//
// standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md sets them and §12 calls
// accessibility "equity, not compliance". A number nobody measures is a
// preference; this turns four of them into a gate:
//
//   §12  no horizontal scroll   — a page of prose must fit its viewport
//   §12  touch targets 44×44    — outside prose (WCAG 2.2 exempts inline links)
//   §12  one <h1> per page      — the outline a screen reader announces
//   §14  < 1 MB initial payload — measured over the wire, not guessed
//
// Usage:
//   npm run build && npx astro preview --port 4399 &
//   node ../tools/check-responsive.mjs
//
// Requires playwright-core and a Chromium. Both are dev-only: this never runs
// in the deploy path, so the site ships without them. If either is missing the
// script SKIPS loudly rather than passing silently — an unmeasured budget must
// never look like a met one.

// `web/` owns node_modules; this script lives in `machine/scripts/`, one level up, so
// Node's resolver would look in the repo root and find nothing. Resolve the
// package from web/ explicitly rather than duplicating a node_modules tree.
import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve as resolvePath } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB_DIR = resolvePath(HERE, "..", "web");
const require = createRequire(pathToFileURL(resolvePath(WEB_DIR, "package.json")));

let chromium;
try {
  ({ chromium } = require("playwright-core"));
} catch {
  console.error(
    "SKIP check-responsive: playwright-core not installed.\n" +
      "  cd web && npm install   (it is a devDependency; the site ships without it)",
  );
  process.exit(0);
}

const BASE = process.env.CHECK_BASE ?? "http://127.0.0.1:4399";

// One page per shape the site actually renders: home, a section index, a
// rendered document, the mission board, a document dense with code.
const PAGES = [
  "/",
  "/corpus/canon/",
  "/corpus/canon/c-001-welcome-to-numinia",
  "/missions",
  "/corpus/standards/s-001-glossary",
  "/corpus/debt/",
];

const VIEWPORTS = [
  ["mobile", 375, 812],
  ["tablet", 768, 1024],
  ["desktop", 1440, 900],
];

// 44 is the design system's TOUCH minimum (§12) and applies where the pointer
// is coarse. With a mouse, WCAG 2.2 AA asks 24×24 — demanding 44 on desktop
// would be inventing a rule the standard does not state, and a gate that
// fails on a rule nobody agreed to is a gate people switch off.
const TOUCH_MIN_COARSE = 44;
const TOUCH_MIN_FINE = 24;
const PAYLOAD_MAX_KB = 1024;

// Playwright's own download location; `npx playwright install chromium`.
const CHROMIUM_GLOBS = [
  `${process.env.HOME}/.cache/ms-playwright`,
  "/var/home/uruk/arkitecktonia-home/.cache/ms-playwright",
];

function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  for (const root of CHROMIUM_GLOBS) {
    if (!existsSync(root)) continue;
    for (const v of ["chromium-1234", "chromium-1200", "chromium-1100"]) {
      const p = `${root}/${v}/chrome-linux64/chrome`;
      if (existsSync(p)) return p;
    }
  }
  return null;
}

const exe = findChromium();
if (!exe) {
  console.error(
    "SKIP check-responsive: no Chromium found.\n" +
      "  npx playwright install chromium   (then re-run)\n" +
      "  or set CHROMIUM_PATH=/path/to/chrome",
  );
  process.exit(0);
}

const browser = await chromium.launch({
  executablePath: exe,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const failures = [];
const rows = [];

for (const [vpName, width, height] of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    isMobile: vpName === "mobile",
    hasTouch: vpName === "mobile",
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (const path of PAGES) {
    let bytes = 0;
    page.removeAllListeners("response");
    page.on("response", async (r) => {
      try {
        const len = r.headers()["content-length"];
        if (len) bytes += parseInt(len, 10);
        else {
          const b = await r.body().catch(() => null);
          if (b) bytes += b.length;
        }
      } catch {}
    });

    await page.goto(BASE + path, { waitUntil: "load", timeout: 45000 });
    await page.waitForTimeout(200);

    const TOUCH_MIN = vpName === "mobile" ? TOUCH_MIN_COARSE : TOUCH_MIN_FINE;
    const r = await page.evaluate((TOUCH_MIN) => {
      const de = document.documentElement;
      const vw = de.clientWidth;

      const small = [];
      for (const el of document.querySelectorAll(
        "a,button,input,select,summary,[role=button]",
      )) {
        const b = el.getBoundingClientRect();
        if (b.width === 0 || b.height === 0) continue;
        const st = getComputedStyle(el);
        if (st.visibility === "hidden" || st.display === "none") continue;
        // WCAG 2.2 exempts links inside a sentence of prose.
        if (el.closest("p, li, td, blockquote, .mission-md")) continue;
        if (b.height < TOUCH_MIN || b.width < TOUCH_MIN) {
          const label = (el.innerText || el.getAttribute("aria-label") || el.tagName).trim();
          small.push(`${label.slice(0, 24)} ${Math.round(b.width)}x${Math.round(b.height)}`);
        }
      }

      return {
        overflow: de.scrollWidth - vw,
        small,
        h1: document.querySelectorAll("h1").length,
        noAlt: document.querySelectorAll("img:not([alt])").length,
        lang: de.getAttribute("lang") || "MISSING",
      };
    }, TOUCH_MIN);

    const kb = Math.round(bytes / 1024);
    rows.push({ vp: vpName, path, kb, ...r });

    const where = `${vpName} ${path}`;
    if (r.overflow > 0)
      failures.push(`${where}: horizontal scroll +${r.overflow}px`);
    if (r.small.length)
      failures.push(
        `${where}: ${r.small.length} target(s) under ${TOUCH_MIN}px — ${r.small.slice(0, 4).join(", ")}`,
      );
    if (r.h1 !== 1) failures.push(`${where}: ${r.h1} <h1> elements (expected 1)`);
    if (r.noAlt) failures.push(`${where}: ${r.noAlt} image(s) without alt`);
    if (r.lang === "MISSING") failures.push(`${where}: <html> has no lang`);
    if (kb > PAYLOAD_MAX_KB)
      failures.push(`${where}: ${kb} KB over the ${PAYLOAD_MAX_KB} KB budget`);
  }
  await ctx.close();
}

await browser.close();

const worstKb = Math.max(...rows.map((r) => r.kb));
console.log(
  `check-responsive: ${rows.length} measurements, heaviest page ${worstKb} KB ` +
    `(budget ${PAYLOAD_MAX_KB} KB); targets ≥${TOUCH_MIN_COARSE}px on touch, ` +
    `≥${TOUCH_MIN_FINE}px with a mouse`,
);

if (failures.length) {
  console.error(`\n${failures.length} violation(s):`);
  for (const f of failures) console.error(`  · ${f}`);
  process.exit(1);
}
console.log("All viewports clean: no overflow, targets within reach, one h1, within budget.");
