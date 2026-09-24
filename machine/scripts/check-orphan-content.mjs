#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// Orphan-content guard — content served without passing through the renderer.
//
// WHY THIS EXISTS
// Astro copies web/public/** into dist/ verbatim. Those files are served from
// numinia.org with no frontmatter, no declared licence, invisible to
// the GIT-048 guard and to every corpus measurement (which globs *.md).
// D-023's mechanism, one level out: the omission produces no error, it
// produces a valid site with content nobody is measuring.
//
// TWO INSTRUMENTS, DELIBERATELY
//   ENUMERATION  public/** intersected with dist/**  -> NAMES the orphans.
//                Depends on no log figure.
//   VERIFICATION pages_in_dist - redirects - astro_declared  -> cardinality
//                cross-check. Only runs when --declared is passed.
// An aggregate identity can cancel errors out (two new orphans + one
// miscounted page = zero). The enumeration cannot: it lists rutas. If the two
// disagree, the finding is that one instrument is wrong.
//
// USAGE
//   node machine/scripts/check-orphan-content.mjs
//   node machine/scripts/check-orphan-content.mjs --declared 581
//   node machine/scripts/check-orphan-content.mjs --json
//
// EXIT CODES  0 = only allow-listed orphans · 1 = unlisted orphan · 2 = misuse

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { declareBlindSpots } from "./lib/blindness.mjs";
declareBlindSpots("check-orphan-content");

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const WEB = join(__dirname, "..", "..", "web");
const PUBLIC = join(WEB, "public");
const DIST = join(WEB, "dist");

// Orphans acknowledged and tracked. Anything NOT here fails the guard.
//
// THIS LIST IS DEBT, NOT CONFIGURATION. Every entry carries a reason and the
// date it was accepted, so it can be read as a register of what is owed rather
// than as settings nobody revisits. An entry with no reason is a bug.
//
// What does NOT belong here: anything that must be fixed rather than tolerated.
// web/src/pages/agente.astro carried the VPS address and was deliberately kept
// out of this list — it was repaired instead (see D-032).
const ALLOWED = new Map([
  ["design/templates/2026_08_03-Plantilla_Factura-v1.0.0.html", {
    debt: "D-032",
    since: "2026-08-25",
    reason: "Invoice template, HTML artefact with no corpus counterpart. Listed as a toolkit row of STD-032 and shipped in the design download; still not a document.",
  }],
  // RESOLVED 2026-09-24: diseno/index.html, the v5 guide frozen in August,
  // deleted — /design is drawn from the documents instead (STD-032).
  // RESOLVED 2026-08-25, and removed from this list rather than left to rot:
  //   archive/archive-summa-{arquitectura,fundacional,prompt}-v0.1.0.md
  // The three were divergent second copies of blueprints/archive-summa-*.
  // BLU-005-archive-fondos.md's download links were repointed at the corpus copies
  // and the public/ files retired. An allow-list entry that outlives its case
  // is the rot this list is meant to avoid.
]);

// A public/ file whose basename also exists in the corpus is worse than an
// orphan: it is a SECOND COPY on a divergent path. Report it as such.
const CORPUS_DIRS = ["canon", "missions", "decisions", "protocols", "operations",
                     "reports", "blueprints", "agents", "guilds", "standards", "debt"];

// Assets are not orphan *content*: they carry no prose and make no claims.
const ASSET_RE = /\.(woff2?|ttf|otf|eot|png|jpe?g|gif|svg|ico|webp|avif|mp4|webm|css|js|mjs|map|txt|xml|json|pdf|zip)$/i;

// ---------- DECLARATION FILES: a rule, not an allow-list entry ----------
//
// A licence sidecar is not content served without the renderer. It exists to
// DECLARE, and REUSE requires it to sit next to what it declares — annotations
// resolve by proximity (PrecedenceType.CLOSEST). Astro copies public/** into
// dist/ verbatim, so a sidecar reaches the surface as a side effect of
// complying with C-005 §5.
//
// This is a RULE because the alternative is an allow-list that grows by one
// entry every time someone does the right thing. Lists grow and stop being
// read; rules do not grow.
//
// The pairing condition is what stops the rule becoming a hiding place: a
// `*.license` counts as a declaration only if the file it declares EXISTS
// beside it. A sidecar pointing at nothing is not an exemption — it is a
// defect of its own, and the guard must say so in red. Machine-verifiable,
// no list required.
//
// Exempt is NOT invisible (D-025): these are still counted and named in their
// own section of the output. A guard that stops reporting a whole file type is
// blind to it.
const DECLARATION_RE = /(^|\/)(REUSE\.toml|LICENSE(-[^/]*)?(\.[a-z0-9]+)?)$/i;
const SIDECAR_RE = /\.license$/i;

function classifyDeclaration(rel, publicDir) {
  if (SIDECAR_RE.test(rel)) {
    const target = rel.slice(0, -".license".length);
    return existsSync(join(publicDir, target))
      ? { kind: "sidecar", ok: true, target }
      : { kind: "sidecar", ok: false, target };
  }
  if (DECLARATION_RE.test(rel)) return { kind: "declaration", ok: true };
  return null;
}

function walk(dir, base = dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, base, out);
    else out.push(relative(base, p).split(sep).join("/"));
  }
  return out;
}

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const dIdx = args.indexOf("--declared");
const declared = dIdx !== -1 ? Number(args[dIdx + 1]) : null;

if (!existsSync(DIST)) {
  console.error("orphan-content guard: web/dist not found — run `npm run build` in web/ first.");
  process.exit(2);
}

// ---------- INSTRUMENT 1: ENUMERATION ----------
const pub = walk(PUBLIC);
const inDist = pub.filter((f) => existsSync(join(DIST, f)));
const nonAsset = inDist.filter((f) => !ASSET_RE.test(f));

// Declaration files are exempt from FAIL by rule — but still counted and named.
const declarations = [];
const brokenSidecars = [];
const orphans = [];
for (const f of nonAsset) {
  const d = classifyDeclaration(f, PUBLIC);
  if (!d) { orphans.push(f); continue; }
  if (d.ok) declarations.push({ file: f, kind: d.kind });
  else brokenSidecars.push({ file: f, target: d.target });
}

const unlisted = orphans.filter((f) => !ALLOWED.has(f));
const listed = orphans.filter((f) => ALLOWED.has(f));

// ---------- duplicate detection: same basename inside the corpus? ----------
import { createHash } from "node:crypto";
const REPO = join(WEB, "..");
const dupes = [];
for (const f of orphans) {
  const base = f.split("/").pop();
  for (const d of CORPUS_DIRS) {
    const cand = join(REPO, d, base);
    if (existsSync(cand)) {
      const h = (p) => createHash("sha256").update(readFileSync(p)).digest("hex").slice(0, 12);
      dupes.push({
        public: f,
        corpus: `${d}/${base}`,
        identical: h(cand) === h(join(PUBLIC, f)),
      });
      break;
    }
  }
}

// ---------- INSTRUMENT 2: VERIFICATION (the subtraction) ----------
let verification = null;
if (declared !== null) {
  const all = walk(DIST).filter((f) => f.endsWith("index.html"));
  let redirects = 0;
  for (const f of all) {
    const html = readFileSync(join(DIST, f), "utf8");
    if (html.includes('http-equiv="refresh"')) redirects++;
  }
  const computed = all.length - redirects - declared;
  verification = {
    pages_in_dist: all.length,
    redirects,
    astro_declared: declared,
    computed_orphans: computed,
    enumerated_orphans: orphans.length,
    agree: computed === orphans.length,
  };
}

if (asJson) {
  console.log(JSON.stringify({
    orphans, unlisted, listed,
    declarations, broken_sidecars: brokenSidecars,
    verification,
  }, null, 2));
} else {
  console.log("orphan-content guard — content served without the renderer\n");
  console.log(`  files in public/            : ${pub.length}`);
  console.log(`  of those, present in dist/  : ${inDist.length}`);
  console.log(`  declaration files (by rule) : ${declarations.length}`);
  console.log(`  non-asset (orphan content)  : ${orphans.length}\n`);

  // Exempt is not invisible: named in their own section, never silently dropped.
  if (declarations.length) {
    console.log("  declaration files — exempt by rule, not by list:");
    for (const d of declarations) {
      console.log(`    [decl] /${d.file}${d.kind === "sidecar" ? "  → declares its neighbour" : ""}`);
    }
    console.log("");
  }

  if (brokenSidecars.length) {
    console.log("  BROKEN DECLARATIONS — a sidecar pointing at nothing:");
    for (const b of brokenSidecars) {
      console.log(`    [BROKEN] /${b.file}`);
      console.log(`             declares "${b.target}", which does not exist beside it`);
    }
    console.log("");
  }

  if (orphans.length === 0) console.log("  none.\n");
  for (const f of orphans) {
    const e = ALLOWED.get(f);
    if (e) {
      console.log(`  [known] /${f}`);
      console.log(`            ${e.debt} · accepted ${e.since}`);
      console.log(`            ${e.reason}`);
    } else {
      console.log(`  [NEW]   /${f}`);
    }
  }

  if (verification) {
    const v = verification;
    console.log("\n  cross-check (the subtraction):");
    console.log(`    ${v.pages_in_dist} pages - ${v.redirects} redirects - ${v.astro_declared} declared = ${v.computed_orphans}`);
    console.log(`    enumerated: ${v.enumerated_orphans}`);
    console.log(v.agree
      ? "    -> instruments agree."
      : "    -> INSTRUMENTS DISAGREE — expected, and the reason is known:\n" +
        "       the subtraction counts index.html only, so it sees just the\n" +
        "       orphans that occupy a route. Files served at their own name\n" +
        "       (.md, .html templates) are invisible to it. The enumeration is\n" +
        "       the measurement; the subtraction is a lower bound.");
  }

  if (dupes.length) {
    console.log("\n  second copies — same basename also in the corpus:");
    for (const d of dupes) {
      console.log(`    /${d.public}`);
      console.log(`      corpus: ${d.corpus}  ->  ${d.identical ? "identical" : "DIVERGENT"}`);
    }
    console.log("    A divergent second copy is worse than an orphan: two documents,");
    console.log("    one address each, and no rule saying which one is true.");
  }

  if (unlisted.length || brokenSidecars.length) {
    if (brokenSidecars.length) {
      console.log(`\n  FAIL: ${brokenSidecars.length} broken declaration(s):`);
      for (const b of brokenSidecars) console.log(`        /${b.file} → "${b.target}" missing`);
      console.log("\n  A declaration exempt from the orphan rule must declare something.");
      console.log("  Either restore the file it names, or delete the sidecar.");
    }
    if (unlisted.length) {
      console.log(`\n  FAIL: ${unlisted.length} orphan(s) not in the allow-list:`);
      for (const f of unlisted) console.log(`        /${f}`);
      console.log("\n  Either register the debt that tracks it and add it to ALLOWED,");
      console.log("  or move the content into the corpus so it carries frontmatter and a licence.");
    }
  } else {
    console.log(`\n  OK — ${listed.length} orphan(s), all tracked; ${declarations.length} declaration file(s) exempt by rule.`);
  }
}

// The subtraction is a lower bound, not an equality: it only sees orphans that
// occupy a route (index.html). Disagreement is expected and does not fail the
// guard — the enumeration is the measurement.
//
// Two things fail: an UNLISTED orphan, and a BROKEN DECLARATION. The second is
// what stops the declaration rule becoming a hiding place — an exemption that
// declares nothing is a defect, not an exemption.
process.exit(unlisted.length || brokenSidecars.length ? 1 : 0);
