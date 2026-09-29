#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// Reachability guard — every page can be reached from the Map or the Archive.
//
// WHY THIS EXISTS
// The site kept growing pages nobody could find: the narrative dial sat at the
// foot of /system behind one link, the agent moulds and a mission annex were
// built and linked from nowhere. A page answering 200 is not a page a reader
// can find. The Oracle's rule (2026-09-29): everything is navigable from the
// two doors — the Map (/) and the Archive (/about).
//
// WHAT IT MEASURES
// Start at / and /about and follow links found in each page's BODY — the bar
// and the footer are left out, because they sit on every page and would make
// anything they name "reachable" without telling where it lives. Every built
// page that is not a redirect must be reached. A page with no route in from
// the two doors is a finding, named.
//
// USAGE
//   node machine/scripts/check-reachable.mjs
//   node machine/scripts/check-reachable.mjs --json
//
// EXIT CODES  0 = every page reached · 1 = unreachable page(s) · 2 = no dist

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { declareBlindSpots } from "./lib/blindness.mjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DIST = join(__dirname, "..", "..", "web", "dist");

/** The two doors. */
export const DOORS = ["/", "/about"];

/**
 * Pages that need no door of their own, each with its reason. THIS LIST IS AN
 * ARGUMENT, NOT CONFIGURATION: a page added here is hidden on purpose, and
 * the guard fails when an entry names a page the build no longer makes.
 */
export const EXEMPT = new Map([
  ["/legal/privacy", "short address of LEG-001 for the footer and the sister sites; the document itself is reached from /legal"],
  ["/legal/terms", "short address of LEG-002 for the footer and the sister sites; the document itself is reached from /legal"],
  ["/legal/cookies", "short address of LEG-003 for the footer and the sister sites; the document itself is reached from /legal"],
  ["/legal/notice", "short address of LEG-004 for the footer and the sister sites; the document itself is reached from /legal"],
]);

const isRedirect = (html) => /http-equiv="refresh"/i.test(html);

/** Normalise an href to the key used for pages: no query, no hash, no trailing slash. */
export function keyOf(href) {
  const p = href.split("#")[0].split("?")[0];
  if (!p.startsWith("/") || p.startsWith("//")) return null;
  return p.replace(/\/+$/, "") || "/";
}

/** The links in a page's body: the bar (<nav>) and the footer are cut out first. */
export function bodyLinks(html) {
  const body = html
    .replace(/<(script|style|template)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, " ")
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, " ");
  const out = new Set();
  for (const m of body.matchAll(/href="([^"]+)"/g)) {
    const k = keyOf(m[1]);
    if (k) out.add(k);
  }
  return out;
}

/** Walk from the doors; return the pages never reached. `pages` maps key → html. */
export function unreachable(pages, doors = DOORS) {
  const seen = new Set(doors.filter((d) => pages.has(d)));
  const queue = [...seen];
  while (queue.length) {
    for (const k of bodyLinks(pages.get(queue.pop()))) {
      if (pages.has(k) && !seen.has(k)) { seen.add(k); queue.push(k); }
    }
  }
  return [...pages.keys()].filter((k) => !seen.has(k)).sort();
}

function builtPages() {
  const pages = new Map();
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const f = join(d, name);
      if (statSync(f).isDirectory()) walk(f);
      else if (name === "index.html") {
        const html = readFileSync(f, "utf8");
        if (isRedirect(html)) continue;
        const rel = relative(DIST, d).split(sep).join("/");
        pages.set(rel ? `/${rel}` : "/", html);
      }
    }
  };
  walk(DIST);
  pages.delete("/404");
  return pages;
}

const isMain = process.argv[1] && process.argv[1].endsWith("check-reachable.mjs");
if (isMain) {
  declareBlindSpots("check-reachable");
  if (!existsSync(DIST)) {
    console.log("check-reachable: web/dist not found — run `npm run build` in web/ first.");
    process.exit(2);
  }
  const pages = builtPages();
  const stale = [...EXEMPT.keys()].filter((k) => !pages.has(k));
  if (stale.length) {
    console.log(`check-reachable: EXEMPT names ${stale.length} page(s) the build no longer makes: ${stale.join(", ")}. Remove them from the list.`);
    process.exit(1);
  }
  const lost = unreachable(pages).filter((k) => !EXEMPT.has(k));
  if (process.argv.includes("--json")) {
    console.log(JSON.stringify({ pages: pages.size, unreachable: lost }, null, 2));
    process.exit(lost.length ? 1 : 0);
  }
  if (lost.length) {
    console.log(`check-reachable: ${lost.length} page(s) cannot be reached from the Map or the Archive.\n`);
    for (const k of lost) console.log(`  ✗ REACH-001  ${k}`);
    console.log(
      "\nEvery page is reached by following links from / or /about (bar and footer\n" +
        "not counted). Give each page above a door: an entry in web/src/lib/summa.ts,\n" +
        "a row on the index of the drawer it belongs to, or a link from its parent page.",
    );
    process.exit(1);
  }
  console.log(`check-reachable: all ${pages.size} page(s) reached from the Map or the Archive.`);
  process.exit(0);
}
