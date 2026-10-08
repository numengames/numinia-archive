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
 *   node collateral.mjs <record.md> --piece first-contact-sheet.html
 *        [--lang es] [--offer PATH] [--card PATH]
 *        [--organisation "…"] [--signature "…"] [--greeting "…"]
 *        [--contact "…"] [--role "…"] [--phone "…"] [--mail "…"]
 *        [--sent YYYY-MM-DD] [--attachment "…"] [--out DIR] [--today YYYY-MM-DD]
 *
 * The sheet (A4 and mobile) is valid VALID_DAYS from --sent (default today);
 * the expiry e-mail takes the same --sent and names both dates. The phone
 * and the e-mail of whoever signs are typed here, never kept in the archive.
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
/* The house's legal line, as web/src/data/company.ts and LEG-004 hold it. */
const HOUSE = 'Numen Games S.L. · CIF B70735949 · C/ Chile 10, 28290 Las Rozas de Madrid · numen.games<br>Empresa emergente (Ley 28/2022), financiada por ENISA';

/* The pieces the kit can render: the register's Template column → the file
   under templates/ and the fields the template needs. A register row naming
   a template the kit does not know fails the kit's test. */
const SHEET_NEEDS = ['Service', 'Audience', 'Headline', 'Lead', 'Demo', 'Picture', 'Evidence', 'Evidence limits', 'Evidence source', 'Questions', 'packages', 'sheet', 'contact'];
export const PIECES = {
  'first-contact-sheet.html': { file: 'first-contact-sheet.es.html', ext: 'html', needs: SHEET_NEEDS },
  'first-contact-sheet-mobile.html': { file: 'first-contact-sheet-mobile.es.html', ext: 'html', needs: SHEET_NEEDS },
  'first-contact-email.txt': {
    file: 'first-contact-email.es.txt', ext: 'txt',
    needs: ['Subject', 'Hook', 'Promise', 'Ask', 'Service', 'packages', 'sheet', 'organisation', 'signature'],
  },
  'expiry-email.txt': { file: 'expiry-email.es.txt', ext: 'txt', needs: ['Subject', 'organisation', 'signature'] },
};

/* How a first contact asks (STD-047): the sheet is valid one week from the day it is sent. */
export const VALID_DAYS = 7;
const SITE = 'https://numinia.org';

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

/** The offer's First-contact sheet table, in one language: what every sheet of this offer says. */
export function sheetOf(text, lang = 'es') {
  const rows = rowsUnder(text, 'The first-contact sheet');
  const out = {};
  if (!rows) return out;
  const [head, ...body] = rows;
  const col = lang === 'en' ? 1 : Math.max(1, head.findIndex((h) => /español|castellano|spanish/i.test(h)));
  for (const r of body) out[r[0].toLowerCase().replace(/\s+/g, '_')] = r[col] ?? '';
  return out;
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
/** Escaped, then **bold** → <b>bold</b>: a cell may stress a phrase. */
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const MESES = 'enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre'.split(' ');
const addDays = (iso, n) => { const d = new Date(`${iso}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const dot = (iso) => iso.split('-').reverse().join('.');
const long = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${d} de ${MESES[m - 1]} de ${y}`; };
const ascii = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '');
/** A site path (`/sales/…`) becomes a full address, so a downloaded piece still finds its images. */
const url = (s) => (String(s).startsWith('/') ? `${SITE}${s}` : String(s));
const eur = (n) => `${Number(n).toLocaleString('es-ES', { useGrouping: 'always' })} €`;

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
  const sent = opts.sent ?? today;
  const valid = addDays(sent, VALID_DAYS);
  const sh = sheetOf(offerText ?? '', lang);
  const sheetField = (label) => need(label, sh[label.toLowerCase().replace(/\s+/g, '_')]);
  const uses = (k) => spec.needs.includes(k);

  const prices = pk.filter((x) => /^\d+$/.test(x.price));
  if (uses('packages') && !prices.length) missing.push('Packages');
  const first = prices[0];
  const list = (label, cell, item) => {
    const parts = String(cell ?? '').split(' · ').map((x) => x.trim()).filter(Boolean);
    if (!parts.length) { missing.push(label); return `[falta: ${label}]`; }
    return parts.map(item).join('');
  };
  const service = p.service ?? '';
  const clientFile = `Numen_Games-Propuesta_${ascii(service.replace(/·/g, ' ')) || 'Numen'}`;

  const values = {
    fonts: FONTS,
    organisation: esc(need('organisation', opts.organisation)),
    signature: esc(need('signature', opts.signature)),
    subject: field('Subject'),
    greeting: opts.greeting ?? 'Buenos días:',
    sent_dot: dot(sent), sent_long: long(sent), valid_dot: dot(valid), valid_long: long(valid),
    client_file: clientFile,
    attachment: opts.attachment ?? `${clientFile}.pdf`,
    price: first ? eur(first.price) : '[falta: Packages]',
    price_tax: first ? eur(Math.round(Number(first.price) * 1.21)) : '[falta: Packages]',
  };
  if (uses('Hook')) Object.assign(values, { hook: field('Hook'), promise: field('Promise'), ask: field('Ask'), service: field('Service') });
  if (uses('sheet')) values.demo_label = esc(String(sheetField('Demo address')).replace(/^https?:\/\//, ''));
  if (uses('contact')) {
    Object.assign(values, {
      service: esc(field('Service')), audience: esc(field('Audience')),
      headline: esc(field('Headline')), lead: rich(field('Lead')),
      demo: rich(field('Demo')), picture: esc(url(field('Picture'))),
      evidence: rich(field('Evidence')), evidence_limits: esc(field('Evidence limits')), evidence_source: esc(field('Evidence source')),
      question_items: list('Questions', p.questions, (q) => `<li><div>${rich(q)}</div></li>`),
      claim: esc(sheetField('Claim')), package: esc(sheetField('Package')), package_line: rich(sheetField('Package line')),
      demo_url: esc(sheetField('Demo address')),
      qr: esc(url(sheetField('QR'))),
      deliverable_items: list('Deliverables', sh.deliverables, (d) => `<li><div>${rich(d)}</div></li>`),
      method_title: esc(sheetField('Method title')),
      method_rows: list('Method', sh.method, (m) => {
        const [when, ...rest] = m.split(': ');
        const text = rest.join(': ');
        const pay = text.match(/\[([^\]]+)\]\s*$/);
        return `<tr><td class="s">${esc(when)}</td><td>${rich(text.replace(/\s*\[[^\]]+\]\s*$/, ''))}</td><td class="p">${pay ? esc(pay[1]) : ''}</td></tr>`;
      }),
      method_note: rich(sheetField('Method note')),
      upkeep_price: eur(sheetField('Upkeep')), upkeep_line: rich(sheetField('Upkeep line')),
      contact_name: esc(need('contact name', opts.contactName)), contact_role: esc(need('contact role', opts.contactRole)),
      contact_phone: esc(need('contact phone', opts.contactPhone)), contact_tel: esc(String(opts.contactPhone ?? '').replace(/[^+\d]/g, '')),
      contact_mail: esc(need('contact e-mail', opts.contactMail)),
      company: HOUSE,
    });
  }
  /* A plain-text template carries its licence in a leading comment block; it
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
    console.error('usage: node collateral.mjs <record.md> --piece <template> [--lang es] [--offer PATH] [--card PATH] [--organisation …] [--signature …] [--greeting …] [--contact …] [--role …] [--phone …] [--mail …] [--sent YYYY-MM-DD] [--out DIR] [--today YYYY-MM-DD]');
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
      attachment: val('--attachment'), today: val('--today'), sent: val('--sent'), card: val('--card'),
      contactName: val('--contact') ?? val('--signature'), contactRole: val('--role'), contactPhone: val('--phone'), contactMail: val('--mail'),
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
