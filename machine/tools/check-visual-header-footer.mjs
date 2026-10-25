#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// check-visual-header-footer.mjs — the house header and footer, pinned to a
// picture.
//
// A visual regression on chrome that shows on every page (the bar, the
// footer) rarely shows up in a build or a type-check: the markup is still
// valid, the colours just shifted. This script is the gate for that: it
// screenshots the home page's <nav aria-label="Primary"> and <footer> at a
// fixed desktop viewport and diffs each against a committed reference PNG
// (machine/visual-baselines/*.png) pixel by pixel with pixelmatch.
//
// Usage:
//   npm run build && npx astro preview --port 4399 &
//   node ../machine/tools/check-visual-header-footer.mjs
//   node ../machine/tools/check-visual-header-footer.mjs --update   (writes new baselines)
//
// Requires playwright-core + pixelmatch + pngjs and a Chromium, all dev-only
// (same pattern as check-responsive.mjs): this never runs in the deploy
// path, so the site ships without them. Missing either SKIPS loudly rather
// than passing silently — an unmeasured diff must never look like a clean
// one.

import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve as resolvePath } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB_DIR = resolvePath(HERE, "..", "..", "web");
const BASELINE_DIR = resolvePath(HERE, "..", "visual-baselines");
const require = createRequire(pathToFileURL(resolvePath(WEB_DIR, "package.json")));

let chromium, PNG, pixelmatch;
try {
  ({ chromium } = require("playwright-core"));
  ({ PNG } = require("pngjs"));
  // pixelmatch v8 is ESM-only; Node's CJS interop surfaces the default
  // export under `.default` instead of as the module itself.
  pixelmatch = require("pixelmatch").default ?? require("pixelmatch");
} catch {
  console.error(
    "SKIP check-visual-header-footer: playwright-core/pixelmatch/pngjs not installed.\n" +
      "  cd web && npm install   (all three are devDependencies; the site ships without them)",
  );
  process.exit(0);
}

const BASE = process.env.CHECK_BASE ?? "http://127.0.0.1:4399";
const UPDATE = process.argv.includes("--update");
// 0.1% of pixels differing is the budget: enough to absorb sub-pixel font
// anti-aliasing noise between CI's and a local Chromium's font stack,
// tight enough to catch an actual colour, layout or copy change.
const DIFF_BUDGET_RATIO = 0.001;

const REGIONS = [
  { name: "header", selector: 'nav[aria-label="Primary"]' },
  { name: "footer", selector: "footer" },
];

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
    "SKIP check-visual-header-footer: no Chromium found.\n" +
      "  npx playwright install chromium   (then re-run)\n" +
      "  or set CHROMIUM_PATH=/path/to/chrome",
  );
  process.exit(0);
}

const browser = await chromium.launch({
  executablePath: exe,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
// The mode switch and the narrative dial animate in; give
// them a beat to settle so the screenshot is deterministic.
await page.waitForTimeout(300);

if (UPDATE) mkdirSync(BASELINE_DIR, { recursive: true });

const failures = [];
const rows = [];

for (const { name, selector } of REGIONS) {
  const locator = page.locator(selector).first();
  const count = await locator.count();
  if (count === 0) {
    failures.push(`${name}: selector "${selector}" matched no element on ${BASE}/`);
    continue;
  }
  const png = await locator.screenshot();
  const baselinePath = resolvePath(BASELINE_DIR, `${name}.png`);

  if (UPDATE) {
    writeFileSync(baselinePath, png);
    rows.push(`${name}: baseline written (${baselinePath})`);
    continue;
  }

  if (!existsSync(baselinePath)) {
    failures.push(`${name}: no baseline at ${baselinePath} — run with --update once to create it`);
    continue;
  }

  const current = PNG.sync.read(png);
  const reference = PNG.sync.read(readFileSync(baselinePath));

  if (current.width !== reference.width || current.height !== reference.height) {
    failures.push(
      `${name}: size changed — baseline ${reference.width}x${reference.height}, now ${current.width}x${current.height}`,
    );
    continue;
  }

  const { width, height } = current;
  const diffPng = new PNG({ width, height });
  const diffPixels = pixelmatch(current.data, reference.data, diffPng.data, width, height, {
    threshold: 0.1,
  });
  const totalPixels = width * height;
  const ratio = diffPixels / totalPixels;
  rows.push(
    `${name}: ${diffPixels}/${totalPixels} px differ (${(ratio * 100).toFixed(3)}%), budget ${(DIFF_BUDGET_RATIO * 100).toFixed(2)}%`,
  );

  if (ratio > DIFF_BUDGET_RATIO) {
    const diffPath = resolvePath(BASELINE_DIR, `${name}.diff.png`);
    writeFileSync(diffPath, PNG.sync.write(diffPng));
    failures.push(`${name}: diff ${(ratio * 100).toFixed(3)}% exceeds budget — see ${diffPath}`);
  }
}

await browser.close();

console.log(rows.join("\n"));

if (UPDATE) {
  console.log(`\nBaselines written to ${BASELINE_DIR}. Commit them with the change that moved the pixels.`);
  process.exit(0);
}

if (failures.length > 0) {
  console.error(`\n${failures.length} visual regression(s):\n` + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}

console.log("\ncheck-visual-header-footer: header and footer match their baselines.");
