#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// check-internal-links.mjs — every internal href must resolve to a built page.
//
// Why this guard exists (2026-08-31): `main` shipped a section index that
// returned 404. ADR-035 opened `system/`, the collection was declared, the
// three SYS documents built and the retired /blueprints/* addresses were
// redirected to them — and CI was green through all of it, because every
// existing guard was blind to this class of failure:
//
//   · check-url-lifecycle only asks whether a URL that USED to exist still
//     answers. /corpus/system/ never existed, so its absence was not a death.
//   · check-orphan-content asks whether content passed through the renderer,
//     not whether the pages that link to it resolve.
//   · astro build cannot fail on a link, only on a route.
//
// The gap is structural: a folder can be published document by document while
// the address a reader would actually type — the section index — is never
// built. This guard closes it by reading the output the way a browser does:
// follow every href, demand a file at the other end.
//
// It resolves against web/dist, so redirects (emitted as real HTML files by
// Astro) count as valid targets without parsing astro.config.
//
// BLIND TO (D-025): declared in machine/scripts/blind-spots.json, printed at exit.
//
// Usage: node machine/scripts/check-internal-links.mjs

import { readdirSync, statSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { declareBlindSpots } from "./lib/blindness.mjs";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
declareBlindSpots("check-internal-links");
const DIST = path.join(ROOT, "web", "dist");

if (!existsSync(DIST)) {
  console.error("check-internal-links: web/dist not found — run the build first.");
  process.exit(1);
}

const pages = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry.endsWith(".html")) pages.push(full);
  }
})(DIST);

const resolves = (href) => {
  const clean = href.split("#")[0].split("?")[0];
  if (clean === "" || !clean.startsWith("/")) return true;
  const base = path.join(DIST, clean);
  return (
    existsSync(base) ||
    existsSync(`${base}.html`) ||
    existsSync(path.join(base, "index.html"))
  );
};

// A href inside <code> or <pre> is documentation ABOUT a path, not a link to
// it: DBT-003 quotes the retired /pdf/ addresses and MIS-111 shows a regex.
// Stripping those blocks first is what separates a broken link from prose.
const stripCode = (html) =>
  html.replace(/<pre[\s\S]*?<\/pre>/g, "").replace(/<code[\s\S]*?<\/code>/g, "");

const broken = new Map();
let checked = 0;

for (const page of pages) {
  const html = stripCode(readFileSync(page, "utf8"));
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    checked++;
    const href = match[1];
    if (!resolves(href)) {
      if (!broken.has(href)) broken.set(href, new Set());
      broken.get(href).add(path.relative(DIST, page));
    }
  }
}

if (broken.size === 0) {
  console.log(
    `check-internal-links: ${checked} internal links across ${pages.length} pages, all resolve.`,
  );
} else {
  console.error(
    `check-internal-links: ${broken.size} broken target(s) across ${pages.length} pages.\n`,
  );
  for (const [href, sources] of broken) {
    const from = [...sources];
    console.error(`  ${href}`);
    console.error(
      `      linked from ${from.slice(0, 3).join(", ")}${from.length > 3 ? ` (+${from.length - 3} more)` : ""}`,
    );
  }
  process.exit(1);
}

console.log(`
  BLIND TO (D-025) — this guard did not look at:
    · external links — it never leaves the filesystem
        NOT covered by any guard
    · whether the target page is the RIGHT page, only that one exists
        NOT covered by any guard
    · hrefs assembled at runtime by JavaScript
        NOT covered by any guard
    · #fragments — the file is checked, the anchor within it is not
        NOT covered by any guard`);
