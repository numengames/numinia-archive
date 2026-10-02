#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
/**
 * collateral.mjs — the sales collateral, rendered from the records.
 *
 * THE PROBLEM THIS SOLVES
 *
 * A deck typed by hand for each buyer drifts from the price list by the
 * second buyer, and a seller who leaves takes the words with them. STD-047
 * lists the pieces each stage of a sale hands over and what each is made
 * from. This script makes them: it reads the opportunity's record (its
 * `## Pitch` and `### Where it fits` tables, STD-039), the offer's
 * `### Packages` table (OPS-012) and the house's card (OPS-018, *Who may be
 * named*), fills the piece's template, and names what it could not fill
 * instead of inventing it.
 *
 * What it never reads from the record: the organisation's name and the
 * person written to. Those are typed at render time from the house's target
 * list, which lives outside the archive, and the rendered piece is written
 * outside the archive too: a rendered e-mail addressed to someone is not a
 * public record. Even so, a piece holding a person's name the card does not
 * list is refused (OPP-006), so a slip at the keyboard cannot leave the
 * house.
 *
 * WHAT IT DOES
 *
 *   node collateral.mjs <record.md> --piece first-contact-deck.html
 *        [--lang es] [--offer PATH] [--card PATH]
 *        [--organisation "…"] [--signature "…"] [--greeting "…"]
 *        [--attachment "…"] [--out DIR] [--today YYYY-MM-DD] [--draft]
 *   node collateral.mjs --list                 the pieces the register names
 *
 * Exit 0 written · 1 something is missing, or a name is not allowed (each
 * named) · 2 a file cannot be read, or the output is inside the archive.
 *
 * Zero dependencies, like pipeline.mjs beside it.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFM, personNames, loadCard, DEFAULT_CARD } from './pipeline.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
export const DEFAULT_REGISTER = path.join(ROOT, 'standards', 'STD-047-the-sales-collateral.md');
const OFFERS = path.join(ROOT, 'operations');
const FONTS = 'https://numinia.org/design/assets/fonts';

/* The pieces the kit can render: the register's Template column → the file
   under templates/ and the fields the template needs. A register row naming
   a template the kit does not know fails the kit's test. */
export const PIECES = {
  'first-contact-deck.html': {
    file: 'first-contact-deck.es.html', ext: 'html',
    needs: ['Headline', 'Lead', 'Gap headline', 'Gap', 'Ask', 'Calendar', 'fits', 'packages', 'organisation', 'signature'],
  },
  'first-contact-email.txt': {
    file: 'first-contact-email.es.txt', ext: 'txt',
    needs: ['Subject', 'Hook', 'Promise', 'Ask', 'packages', 'organisation', 'signature'],
  },
};

/* ---------- reading ---------- */

function rowsUnder(text, heading) {
  const lines = String(text).split('\n');
  const at = lines.findIndex((l) => new RegExp(`^#{2,3}\\s+(?:\\d+\\.\\s+)?${heading}\\s*$`).test(l.trim()));
  if (at < 0) return null;
  const rows = [];
  let seen = false;
  for (const l of lines.slice(at + 1)) {
    if (/^#{1,3}\s/.test(l)) break;
    if (!l.trim().startsWith('|')) { if (seen && rows.length) break; continue; }
    seen = true;
    const cells = l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
    if (cells.every((c) => /^:?-+:?$/.test(c))) continue;
    rows.push(cells);
  }
  return rows.length ? rows : null;
}

/** The record's Pitch in one language, and its Where it fits rows. */
export function pitchOf(text, lang = 'es') {
  const rows = rowsUnder(text, 'Pitch');
  const out = { fits: [] };
  if (rows) {
    const [head, ...body] = rows;
    const col = lang === 'en' ? 1 : Math.max(1, head.findIndex((h) => /español|castellano|spanish/i.test(h)));
    for (const r of body) out[r[0].toLowerCase().replace(/\s+/g, '_')] = r[col] ?? '';
  }
  const fits = rowsUnder(text, 'Where it fits');
  if (fits) out.fits = fits.slice(1);
  return out;
}

/** The offer's Packages: name, what it holds, price before tax, the client's rendering. */
export function packagesOf(text) {
  const rows = rowsUnder(text, 'Packages');
  if (!rows) return [];
  return rows.slice(1).map(([name, holds, price, es]) => ({ name, holds, price, es: es ?? '' }));
}

/** The register's pieces (STD-047 *The pieces*). */
export function catalogue(file = DEFAULT_REGISTER) {
  const rows = rowsUnder(readFileSync(file, 'utf8'), 'The pieces');
  if (!rows) return [];
  const [head, ...body] = rows;
  const ix = (n) => head.findIndex((h) => h.toLowerCase() === n);
  return body.map((r) => ({
    stage: r[ix('stage')].replace(/`/g, ''), piece: r[ix('piece')], does: r[ix('what it does')],
    from: r[ix('made from')], missingWhen: r[ix('missing when')],
    template: r[ix('template')].replace(/`/g, ''), state: r[ix('state')],
  }));
}

/* ---------- rendering ---------- */

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const eur = (n) => `${Number(n).toLocaleString('es-ES', { useGrouping: 'always' })} €`;

function packageCards(pk) {
  return pk.filter((p) => /^\d+$/.test(p.price)).slice(0, 2).map((p) => {
    const [title, ...rest] = (p.es || p.name).split(':');
    return `      <div class="cifra"><span class="etiqueta">${esc(title.trim())}</span><span class="v">${eur(p.price)}</span><p>${esc(rest.join(':').trim() || p.holds)}</p></div>`;
  }).join('\n');
}
function packageNote(pk) {
  const fixed = pk.filter((p) => /^\d+$/.test(p.price));
  const withTax = fixed.map((p) => eur(Math.round(Number(p.price) * 1.21))).join(' y ');
  const upkeep = pk.find((p) => !/^\d+$/.test(p.price));
  const upkeepLine = upkeep ? ` ${(upkeep.es || upkeep.name).split(':')[0].trim()}: ${upkeep.price.replace('a month', '€/mes')}.` : '';
  return `Importes sin IVA (21 % aparte: ${withTax} con IVA).${upkeepLine}`;
}

/**
 * Fill one piece. Returns { text, missing, names }: `missing` lists every
 * field the sources lack (each left as a visible [falta: …] mark), `names`
 * every person's name the card does not list.
 */
export function render(piece, recordText, offerText, opts = {}) {
  const spec = PIECES[piece];
  if (!spec) throw new Error(`unknown piece "${piece}" — one of ${Object.keys(PIECES).join(', ')}`);
  const lang = opts.lang ?? 'es';
  const p = pitchOf(recordText, lang);
  const pk = packagesOf(offerText ?? '');
  const fm = parseFM(recordText) ?? {};
  const missing = [];
  const need = (label, value) => {
    if (value === undefined || value === null || String(value).trim() === '') { missing.push(label); return `[falta: ${label}]`; }
    return value;
  };
  const field = (label) => need(label, p[label.toLowerCase().replace(/\s+/g, '_')]);
  const today = opts.today ?? new Date().toISOString().slice(0, 10);
  const doc = `${today.replace(/-/g, '_')}-Numen_${spec.ext === 'html' ? 'Presentacion' : 'Correo'}-${fm.id ?? 'OPP'}`;

  const fitRows = p.fits.length
    ? p.fits.map(([course, who, what], i) => `      <tr><td class="concepto">${esc(course)}</td><td>${esc(who)}</td><td>${i === 0 ? `<b>${esc(what)}</b>` : esc(what)}</td></tr>`).join('\n')
    : (missing.push('Where it fits'), '      <tr><td>[falta: Where it fits]</td></tr>');
  const prices = pk.filter((x) => /^\d+$/.test(x.price));
  if (!prices.length) missing.push('Packages');
  const calendar = String(p.calendar ?? '').split('·').map((s) => s.trim()).filter(Boolean);
  if (spec.needs.includes('Calendar') && !calendar.length) missing.push('Calendar');

  const values = {
    fonts: FONTS,
    stamp: opts.draft === false ? '' : '<span class="sello">Borrador para revisar</span>',
    doc,
    organisation: esc(need('organisation', opts.organisation)),
    signature: esc(need('signature', opts.signature)),
    headline: esc(field('Headline')), lead: esc(field('Lead')),
    gap_headline: esc(field('Gap headline')), gap: esc(field('Gap')),
    ask: spec.ext === 'html' ? esc(field('Ask')) : field('Ask'),
    fit_rows: fitRows,
    package_cards: prices.length ? packageCards(pk) : '[falta: Packages]',
    package_note: prices.length ? packageNote(pk) : '',
    calendar_items: calendar.map((c) => { const [k, ...v] = c.split(':'); return `      <li><b>${esc(k.trim())}:</b> ${esc(v.join(':').trim())}</li>`; }).join('\n'),
    subject: field('Subject'), hook: field('Hook'), promise: field('Promise'),
    greeting: opts.greeting ?? 'Buenos días:',
    price_line: prices.length ? `Los dos formatos que proponemos (${prices.slice(0, 2).map((x) => eur(x.price)).join(' y ')} sin IVA) entran en un contrato menor de servicios.` : '[falta: Packages]',
    attachment: opts.attachment ?? `${today.replace(/-/g, '_')}-Numen_Presentacion-${fm.id ?? 'OPP'}.pdf`,
  };
  /* A plain-text mould carries its licence in a leading comment block; it
     never reaches the reader. */
  const raw = readFileSync(path.join(HERE, 'templates', spec.file), 'utf8');
  const tpl = spec.ext === 'txt' ? raw.replace(/^<!--[\s\S]*?-->\n/, '') : raw;
  const text = tpl.replace(/\{\{([a-z_]+)\}\}/g, (m, k) => (k in values ? values[k] : m));
  let named = opts.named;
  if (!named) { try { named = loadCard(opts.card ?? DEFAULT_CARD).named ?? []; } catch { named = []; } }
  const visible = spec.ext === 'html' ? text.replace(/<style>[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>|<[^>]+>/g, ' ') : text;
  return { text, missing: [...new Set(missing)], names: personNames(visible, named) };
}

/* ---------- the command line ---------- */

function main(argv) {
  const args = argv.slice(2);
  const val = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
  if (args.includes('--list')) {
    for (const r of catalogue(val('--register') ?? DEFAULT_REGISTER)) console.log(`${r.stage.padEnd(12)} ${r.piece.padEnd(26)} ${r.template.padEnd(26)} ${r.state}`);
    return 0;
  }
  const record = args[0];
  const piece = val('--piece');
  if (!record || !existsSync(record) || !piece) {
    console.error('usage: node collateral.mjs <record.md> --piece <template> [--lang es] [--offer PATH] [--card PATH] [--organisation …] [--signature …] [--greeting …] [--out DIR] [--today YYYY-MM-DD]');
    return 2;
  }
  const out = path.resolve(val('--out') ?? process.cwd());
  if (out === ROOT || out.startsWith(ROOT + path.sep)) {
    console.error(`--out ${out} is inside the archive — a rendered piece is addressed to someone; write it outside the archive`);
    return 2;
  }
  const text = readFileSync(record, 'utf8');
  const fm = parseFM(text) ?? {};
  const offerPath = val('--offer') ?? (fm.offer ? path.join(OFFERS, `${fm.offer}-training-the-offer.md`) : null);
  if (!offerPath || !existsSync(offerPath)) { console.error(`offer not found: ${offerPath} — pass --offer`); return 2; }
  const lang = val('--lang') ?? 'es';
  let r;
  try {
    r = render(piece, text, readFileSync(offerPath, 'utf8'), {
      lang, organisation: val('--organisation'), signature: val('--signature'), greeting: val('--greeting'),
      attachment: val('--attachment'), today: val('--today'), card: val('--card'), draft: !args.includes('--final'),
    });
  } catch (e) { console.error(String(e.message)); return 2; }
  if (r.names.length) { console.error(`OPP-006: ${r.names.map((n) => `"${n}"`).join(', ')} read as a person's name the card does not list — write the role, or add the person to the card's Who may be named`); return 1; }
  const today = val('--today') ?? new Date().toISOString().slice(0, 10);
  const file = path.join(out, `${today.replace(/-/g, '_')}-${fm.id ?? 'OPP'}-${piece.replace(/\.(html|txt)$/, '')}.${lang}.${PIECES[piece].ext}`);
  mkdirSync(out, { recursive: true });
  writeFileSync(file, r.text);
  if (r.missing.length) { console.error(`written with gaps: ${file}\nmissing: ${r.missing.join(', ')}`); return 1; }
  console.log(file);
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exit(main(process.argv));
