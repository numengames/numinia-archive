// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The share card and the favicon set — STD-023 §19, rule DSN-014.
//
// One pattern, four contents: this script is the same in every repository
// of the house (a copy per repository, like house-links.ts, until the design
// kit serves it). What differs per site is SITE below and where the output
// goes. Run before `astro build` so the files land in public/ and ship as
// statics:
//
//   node scripts/share-card.mjs            → public/favicon.svg, favicon.png,
//                                            apple-touch-icon.png, og-card.png
//   node scripts/share-card.mjs --check    → exit 1 if any is missing or the
//                                            card is not 1200×630
//
// The card is drawn as SVG and rasterised with @resvg/resvg-js, which embeds
// the house type (Geist, Geist Mono) from their TTF form — resvg reads
// TTF/OTF, not woff2, so the woff2 the site serves is decompressed with
// wawoff2 at render time. No browser, no system font: it runs on the
// Cloudflare Workers Builds image, which has neither.

import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import wawoff2 from "wawoff2";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

// ── The site (the one row of STD-023 §19 this repository is) ───────────────
const SITE = {
  kicker: "NUMEN GAMES · THE ARCHIVE",
  name: "NWOS",
  line: "The archive of Numen Games, built in public: canon, decisions, missions, how the work is done.",
  domain: "numinia.org",
};

const OUT = path.join(root, "public");
const FONTS = path.join(root, "public", "diseno", "assets", "fonts");
const KHEPRI = path.join(root, "src", "brand", "Khepri_Logo.svg");

// ── Values (STD-023: Carbón, Marfil, Marfil velada, Ámbar, Turquesa) ──────
const CARBON = "#14110F";
const MARFIL = "#F9EBDC";
const MARFIL_VELADA = "#C4B5A6";
const AMBAR = "#EFA517";
const TURQUESA = "#018EA1";

const W = 1200;
const H = 630;
const MARGIN = 90;

// ── Pieces ────────────────────────────────────────────────────────────────
function khepriInner() {
  return readFileSync(KHEPRI, "utf8")
    .replace(/<svg[^>]*>/, "")
    .replace("</svg>", "")
    .trim();
}

/** The sky of STD-023 §15 at low density: deterministic, so the PNG is
 *  stable across builds (a card that changes on every deploy is noise in
 *  git and in link previews). Rarity tiers and weights from the register. */
function sky(count = 110, seed = 7) {
  const tiers = [
    { c: "249,235,220", w: 60 },
    { c: "143,196,107", w: 25 },
    { c: "93,155,214", w: 10 },
    { c: "169,139,224", w: 4 },
    { c: "239,165,23", w: 1 },
  ];
  const pool = tiers.flatMap((t, i) => Array(t.w).fill(i));
  let s = seed;
  const rnd = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  let out = "";
  for (let i = 0; i < count; i++) {
    const t = tiers[pool[Math.floor(rnd() * pool.length)]];
    const x = (rnd() * W).toFixed(1);
    const y = (rnd() * H).toFixed(1);
    const r = (0.6 + rnd() * 1.6).toFixed(2);
    const a = (0.15 + rnd() * 0.45).toFixed(2);
    out += `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(${t.c},${a})"/>`;
  }
  return out;
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Wrap the line at ~52 characters; the card has room for two rows. */
function wrap(text, max = 52) {
  const words = text.split(" ");
  const rows = [""];
  for (const w of words) {
    const cur = rows[rows.length - 1];
    if ((cur + " " + w).trim().length > max) rows.push(w);
    else rows[rows.length - 1] = (cur + " " + w).trim();
  }
  return rows.slice(0, 2);
}

function cardSvg() {
  const rows = wrap(SITE.line);
  const lineY = 400;
  const ruleY = lineY + rows.length * 44 + 26;
  const domainY = ruleY + 46;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${CARBON}"/>
  ${sky()}
  <g transform="translate(${W - MARGIN - 96} ${MARGIN}) scale(1.27)" fill="${MARFIL}">${khepriInner()}</g>
  <text x="${MARGIN}" y="${MARGIN + 100}" font-family="Geist Mono" font-size="26" letter-spacing="3" fill="${AMBAR}">${esc(SITE.kicker)}</text>
  <text x="${MARGIN}" y="${MARGIN + 240}" font-family="Geist" font-weight="600" font-size="128" letter-spacing="-4" fill="${MARFIL}">${esc(SITE.name)}</text>
  ${rows.map((r, i) => `<text x="${MARGIN}" y="${lineY + i * 44}" font-family="Geist" font-size="34" fill="${MARFIL_VELADA}">${esc(r)}</text>`).join("\n  ")}
  <rect x="${MARGIN}" y="${ruleY}" width="260" height="3" fill="${TURQUESA}"/>
  <text x="${MARGIN}" y="${domainY}" font-family="Geist Mono" font-size="24" fill="${MARFIL_VELADA}">${esc(SITE.domain)}</text>
</svg>`;
}

/** The favicon: the canonical brandmark in Marfil on Carbón, 32-unit box,
 *  the mark at ~75 % so it reads at 16 px. */
function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" fill="${CARBON}"/>
  <g transform="translate(4 4) scale(0.318)" fill="${MARFIL}">${khepriInner()}</g>
</svg>
`;
}

async function fonts() {
  const out = [];
  for (const f of ["Geist-Variable.woff2", "GeistMono-Variable.woff2"]) {
    const p = path.join(FONTS, f);
    if (!existsSync(p)) throw new Error(`share-card: font missing: ${p}`);
    out.push(Buffer.from(await wawoff2.decompress(readFileSync(p))));
  }
  return out;
}

function png(svg, fontBuffers, width) {
  const r = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { fontBuffers, loadSystemFonts: false, defaultFontFamily: "Geist" },
  });
  return r.render().asPng();
}

// ── Check ─────────────────────────────────────────────────────────────────
const FILES = ["favicon.svg", "favicon.png", "apple-touch-icon.png", "og-card.png"];

function pngSize(buf) {
  // IHDR: width at byte 16, height at 20 (big-endian)
  return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
}

function check() {
  const missing = FILES.filter((f) => !existsSync(path.join(OUT, f)));
  if (missing.length) {
    console.error(`share-card --check: missing in public/: ${missing.join(", ")} — run node scripts/share-card.mjs`);
    process.exit(1);
  }
  const [w, h] = pngSize(readFileSync(path.join(OUT, "og-card.png")));
  if (w !== W || h !== H) {
    console.error(`share-card --check: og-card.png is ${w}×${h}, must be ${W}×${H}`);
    process.exit(1);
  }
  console.log(`share-card --check: OK — ${FILES.length} files, card ${w}×${h}`);
}

// ── Main ──────────────────────────────────────────────────────────────────
if (process.argv.includes("--check")) {
  check();
} else {
  mkdirSync(OUT, { recursive: true });
  const fb = await fonts();
  writeFileSync(path.join(OUT, "favicon.svg"), faviconSvg());
  writeFileSync(path.join(OUT, "favicon.png"), png(faviconSvg(), fb, 32));
  writeFileSync(path.join(OUT, "apple-touch-icon.png"), png(faviconSvg(), fb, 180));
  const card = png(cardSvg(), fb, W);
  writeFileSync(path.join(OUT, "og-card.png"), card);
  const [w, h] = pngSize(card);
  console.log(`share-card: ${SITE.domain} — favicon.svg, favicon.png 32, apple-touch-icon.png 180, og-card.png ${w}×${h} (${(card.length / 1024).toFixed(0)} KB)`);
}
