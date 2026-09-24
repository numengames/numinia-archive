#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// Portability guard — every published page offers its own markdown.
//
// WHY THIS EXISTS
// "File over app" is not a slogan about documents, it is a test the whole
// site has to pass: the data must be readable and portable without this
// application. A page whose content exists only as HTML fails that test
// even when every fact in it was read from a file.
//
// On 2026-09-22 the toolbar — listen, copy, download .md, open the source —
// was on 8 of 26 pages: every document detail view, and none of the pages a
// reader arrives at. The home, the six function pages and the section
// indexes had nothing, because they have no file behind them and nobody had
// written the generator. The asymmetry produced no error: a valid site where
// the pages that explain the archive were the least portable in it.
//
// WHAT IT CHECKS, and where it deliberately stops
// For every built page that is not exempt:
//   PORT-001  the page carries a toolbar (data-md-url)
//   PORT-002  the .md that toolbar names was actually built
//   PORT-003  the .md is not empty
// It reads web/dist, so it verifies the artefact rather than a rule in prose
// — the same ENG-067 exception check-url-shape takes.
//
// It does NOT check that the markdown SAYS what the page shows. A generator
// that emits a correct-looking file of the wrong content passes here and is
// caught by web/src/lib/composed-md's own tests and by review. Cardinality
// and existence are what a build can know.
//
// USAGE
//   node machine/scripts/check-md-portability.mjs
//   node machine/scripts/check-md-portability.mjs --json
//
// EXIT CODES  0 = every page portable · 1 = a page is not · 2 = misuse

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { declareBlindSpots } from "./lib/blindness.mjs";
declareBlindSpots("check-md-portability");

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..", "..");
const DIST = join(ROOT, "web", "dist");

/**
 * Pages that owe no markdown, each with the reason.
 *
 * THIS LIST IS AN ARGUMENT, NOT CONFIGURATION. A page is exempt because
 * offering a .md of it would be meaningless, never because nobody got round
 * to it — that second case is debt and belongs in debt/, not here.
 */
const EXEMPT = new Map([
  ["/404", "an error page states no archive content"],
  ["/agent", "the roster's detail view; every agent's SOUL/OPERATOR/STATUS/MEMORY is a document with its own .md"],
  ["/telemetry", "renders machine/telemetry/latest.json, which IS the portable artefact and is linked as such"],
  ["/updates", "the site's own version timeline, not archive content"],
  // The eight views filed under /system/ on 2026-09-21. Five of them carry
  // their data INSIDE the template rather than in the corpus, which is the
  // real defect — a .md generated from a hardcoded array would launder that
  // into something that looks like an archive record. They are exempt until
  // their content is moved to the corpus, and that is debt, tracked.
  ["/system/cao", "data lives in the template, not the corpus — DBT-021"],
  ["/system/language", "data lives in the template, not the corpus — DBT-021"],
  ["/system/sales", "data lives in the template, not the corpus — DBT-021"],
  ["/system/simulations", "data lives in the template, not the corpus — DBT-021"],
  ["/system/solutions", "data lives in the template, not the corpus — DBT-021"],
  ["/system/continuity", "data lives in the template, not the corpus — DBT-021"],
  ["/system/wardley", "renders BLU-001; links its source, toolbar owed — DBT-021"],
  ["/system/gaps", "carries the toolbar already; listed so the count is explicit"],
  ["/blueprints/meta", "hand-written cartography protocol, in Spanish, with no corpus counterpart — the protocol it describes belongs in protocols/ and until it is moved a .md of it would be a record with no series. DBT-021"],
]);

/** Every index.html under dist, as the address it serves. */
function builtPages(dir = DIST, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "pagefind" || name === "_astro") continue;
      builtPages(full, out);
    } else if (name === "index.html") {
      const rel = relative(DIST, full).split(sep).slice(0, -1).join("/");
      out.push({ url: `/${rel}`.replace(/\/$/, "") || "/", file: full });
    }
  }
  return out;
}

/** A redirect page states nothing; it is not a page for this guard. */
function isRedirect(html) {
  return /<meta\s+http-equiv="refresh"/i.test(html);
}

/**
 * The text the listen button would speak, by the same selector chain the
 * component uses: the declared selector, then <article>, then <main>.
 *
 * WHY THIS IS HERE AND NOT ONLY IN THE COMPONENT
 * The toolbar shipped on 179 pages and the listen button was dead on 9 of
 * them: SpeechPlayer looked for <article>, which only document views have.
 * Nothing threw — the component disables a button it has no text for, which
 * is correct behaviour for an empty page and indistinguishable from a bug.
 * A toolbar that is present but mute is worse than an absent one: it
 * promises a reader who cannot read that the page can be heard.
 */
function spokenWords(html) {
  let seg = null;
  const article = /<article\b[\s\S]*?<\/article>/i.exec(html);
  if (article) seg = article[0];
  else {
    const main = /<main id="main">[\s\S]*?<\/main>/i.exec(html);
    if (main) seg = main[0];
  }
  if (!seg) return 0;
  const text = seg
    .replace(/<(script|style|noscript|template|svg)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text ? text.split(" ").length : 0;
}

export function check() {
  const findings = [];
  const pages = builtPages();
  let portable = 0;
  let exempt = 0;

  for (const page of pages) {
    const html = readFileSync(page.file, "utf8");
    if (isRedirect(html)) continue;

    const key = page.url === "/" ? "/" : page.url.replace(/\/$/, "");
    if (EXEMPT.has(key)) {
      exempt += 1;
      continue;
    }

    const m = /data-md-url="([^"]+)"/.exec(html);
    if (!m) {
      findings.push({
        plate: "PORT-001",
        what: "page offers no markdown of itself (no toolbar). A reader cannot take this page's content out of the site",
        where: page.url,
      });
      continue;
    }

    const mdUrl = m[1];
    // /canon.md -> dist/canon.md ; /canon/can-001.md -> dist/canon/can-001.md
    const mdFile = join(DIST, mdUrl.replace(/^\//, "").split("/").join(sep));
    if (!existsSync(mdFile)) {
      findings.push({
        plate: "PORT-002",
        what: `toolbar points at ${mdUrl}, which the build did not produce`,
        where: page.url,
      });
      continue;
    }
    if (readFileSync(mdFile, "utf8").trim().length === 0) {
      findings.push({
        plate: "PORT-003",
        what: `${mdUrl} was built but is empty`,
        where: page.url,
      });
      continue;
    }

    // PORT-004 — the listen button is not decoration. A page carrying the
    // toolbar must have text the player can find, or the button ships
    // disabled and the promise of accessibility is a grey rectangle.
    // 20 words is the floor: below it the page is a shell, not a reading.
    const words = spokenWords(html);
    if (words < 20) {
      findings.push({
        plate: "PORT-004",
        what:
          `offers a listen button but the player finds ${words} word(s) to speak. ` +
          `SpeechPlayer reads <article>, then <main id="main"> — this page has neither with prose in it`,
        where: page.url,
      });
      continue;
    }
    portable += 1;
  }

  return { findings, portable, exempt, total: portable + exempt + findings.length };
}

const isMain = process.argv[1] && process.argv[1].endsWith("check-md-portability.mjs");
if (isMain) {
  const args = new Set(process.argv.slice(2));
  const result = check();

  if (args.has("--json")) {
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.findings.length ? 1 : 0);
  }

  if (result.findings.length) {
    console.log(`check-md-portability: ${result.findings.length} page(s) offer no markdown of themselves.\n`);
    for (const f of result.findings) {
      console.log(`  ✗ ${f.plate}  ${f.what}`);
      console.log(`      ${f.where}`);
    }
    console.log(
      "\nEvery published page offers its own markdown: a page whose content only\n" +
        "exists as HTML is not portable, whatever it was generated from. Composed\n" +
        "pages get theirs from web/src/lib/composed-md.ts.",
    );
    process.exit(1);
  }

  console.log(
    `check-md-portability: ${result.portable} page(s) offer their markdown, ` +
      `${result.exempt} exempt with a stated reason.`,
  );
  process.exit(0);
}
