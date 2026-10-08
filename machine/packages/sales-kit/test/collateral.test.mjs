#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// collateral.test.mjs — the collateral renderer, proven.
//
// Run: node --test 'machine/packages/sales-kit/test/*.test.mjs'   (or npm test)

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, rmSync, existsSync, writeFileSync, cpSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pitchOf, packagesOf, render, catalogue, PIECES } from '../collateral.mjs';

const KIT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.resolve(KIT, '..', '..', '..');
const TOOL = path.join(KIT, 'collateral.mjs');
const FIX = path.join(KIT, 'fixtures');
const RECORD = path.join(FIX, 'collateral', 'OPP-2099-008.md');
const OFFER = path.join(FIX, 'collateral', 'offer.md');
const CARD = path.join(FIX, 'card.md');
const REG = path.join(FIX, 'collateral', 'register.md');

function run(...args) {
  const r = spawnSync('node', [TOOL, ...args], { encoding: 'utf8' });
  return { code: r.status, out: r.stdout, err: r.stderr };
}
function withDir(fn) {
  const dir = mkdtempSync(path.join(tmpdir(), 'collateral-'));
  try { return fn(dir); } finally { rmSync(dir, { recursive: true, force: true }); }
}

test('the Pitch is read in the language asked, and Where it fits as rows', () => {
  const p = pitchOf(readFileSync(RECORD, 'utf8'), 'es');
  assert.equal(p.headline, 'El primer día antes del primer día.');
  assert.equal(p.subject, 'Ensayar el primer día · propuesta');
  assert.deepEqual(p.fits[0], ['Acogida de tienda', 'Dependientes nuevos', 'El primer turno, caja incluida']);
  assert.equal(pitchOf(readFileSync(RECORD, 'utf8'), 'en').headline, 'The first day before the first day.');
});

test('the offer\'s Packages are read with their price and the client\'s rendering', () => {
  const pk = packagesOf(readFileSync(OFFER, 'utf8'));
  assert.equal(pk.length, 2);
  assert.deepEqual(pk[0], { name: 'Pilot', holds: 'one room', price: '1000', es: 'Piloto: una sala' });
});

test('the catalogue is read from the register: every piece with a template exists in the kit', () => {
  const rows = catalogue(REG);
  assert.ok(rows.length >= 2);
  for (const r of rows.filter((x) => x.template && x.template !== '—' && !x.template.endsWith('.md'))) {
    assert.ok(PIECES[r.template], `register names template ${r.template}, the kit has no piece for it`);
  }
});

test('the real register names only templates the kit can render', { skip: !existsSync(path.join(ROOT, 'standards')) }, () => {
  const real = catalogue();
  assert.ok(real.length > 5, 'the real register has its pieces');
  for (const r of real.filter((x) => x.template && x.template !== '—' && !x.template.endsWith('.md'))) {
    assert.ok(PIECES[r.template], `STD-047 names ${r.template}, the kit has no piece for it`);
    assert.ok(existsSync(path.join(KIT, 'templates', PIECES[r.template].file)), `${PIECES[r.template].file} is missing`);
  }
});

const CONTACT = { contactName: 'Ada Lovelace', contactRole: 'Socia · Numen Games', contactPhone: '+34 600 000 000', contactMail: 'ada@example.org' };

test('the first-contact sheet renders in both formats, every field filled, from the Pitch and the offer', () => {
  const rec = readFileSync(RECORD, 'utf8'), offer = readFileSync(OFFER, 'utf8');
  const opts = { lang: 'es', organisation: 'una tienda de prueba', signature: 'Ada Lovelace', today: '2099-10-15', card: CARD, ...CONTACT };
  for (const piece of ['first-contact-sheet.html', 'first-contact-sheet-mobile.html']) {
    const r = render(piece, rec, offer, opts);
    assert.deepEqual(r.missing, [], `${piece}: ${r.missing.join(', ')}`);
    assert.doesNotMatch(r.text, /\{\{[a-z_]+\}\}/, `${piece} leaves a field unfilled`);
    assert.match(r.text, /El primer día antes del primer día\./);
    assert.match(r.text, /1\.000 €/, 'the price is shown');
    assert.match(r.text, /1\.210 € con IVA/, 'and with tax');
    assert.match(r.text, /La demo es la <b>primera sala<\/b>/, '**bold** in a Pitch cell becomes bold');
    assert.match(r.text, /<li><div>¿Quién decide\?<\/div><\/li>/, 'the three questions are listed');
    assert.match(r.text, /<td class="p">100 %<\/td>/, 'a payment in brackets goes to its column');
    assert.match(r.text, /https:\/\/numinia\.org\/sales\/demo-numinia-qr\.svg/, 'site paths become full addresses');
    assert.match(r.text, /Numen_Games-Propuesta_Formacion_El_primer_dia/, 'the title is the client\'s file name, no accents');
  }
});

test('a first contact is valid one week, asks yes or no, and carries the P. D.', () => {
  const rec = readFileSync(RECORD, 'utf8'), offer = readFileSync(OFFER, 'utf8');
  const opts = { lang: 'es', organisation: 'una tienda', signature: 'Ada Lovelace', today: '2099-10-15', card: CARD, ...CONTACT };
  const sheet = render('first-contact-sheet.html', rec, offer, opts).text;
  assert.match(sheet, /<dd>15\.10\.2099<\/dd>/, 'sent today');
  assert.match(sheet, /<dd>22\.10\.2099<\/dd>/, 'valid seven days');
  assert.match(sheet, /Respondednos antes del 22\.10\.2099<\/b> con una palabra: sí o no/);
  assert.match(sheet, /P\. D\.<\/b> Un no también nos sirve\. Preferimos un no claro el 22 de octubre de 2099/);
  const sent = render('first-contact-sheet.html', rec, offer, { ...opts, sent: '2099-11-02' }).text;
  assert.match(sent, /<dd>09\.11\.2099<\/dd>/, 'the week runs from the day it is sent');
  const mail = render('first-contact-email.txt', rec, offer, opts);
  assert.deepEqual(mail.missing, []);
  assert.match(mail.text, /^Asunto: Ensayar el primer día · propuesta/);
  assert.match(mail.text, /1\.000 € sin IVA \(1\.210 € con IVA\)/, 'the e-mail says the price too');
  assert.match(mail.text, /vale hasta el 22 de octubre de 2099/);
  assert.match(mail.text, /Adjunto: Numen_Games-Propuesta_Formacion_El_primer_dia\.pdf/);
  assert.doesNotMatch(mail.text, /cada alumno|cuatro páginas/, 'no per-learner trace, no deck');
});

test('the expiry e-mail asks for the no, from the day the sheet was sent', () => {
  const rec = readFileSync(RECORD, 'utf8'), offer = readFileSync(OFFER, 'utf8');
  const r = render('expiry-email.txt', rec, offer, { lang: 'es', organisation: 'una tienda', signature: 'Ada Lovelace', today: '2099-10-23', sent: '2099-10-15', card: CARD });
  assert.deepEqual(r.missing, []);
  assert.match(r.text, /^Asunto: Re: Ensayar el primer día · propuesta/);
  assert.match(r.text, /el 15 de octubre de 2099 caducó ayer, 22 de octubre de 2099/);
  assert.match(r.text, /¿Me lo confirmáis con un no\?/);
  assert.doesNotMatch(r.text, /descuento|rebaja|oferta especial/, 'never lowers the price to rescue a sale');
});

test('what is missing is named, not invented', () => {
  const rec = readFileSync(RECORD, 'utf8').replace(/^\| Questions \|.*\n/m, '');
  const sheet = render('first-contact-sheet.html', rec, readFileSync(OFFER, 'utf8'), { lang: 'es', today: '2099-10-15', card: CARD });
  assert.ok(sheet.missing.includes('Questions'), sheet.missing.join(', '));
  assert.ok(sheet.missing.includes('contact phone'), 'the phone is typed at render time, never read from the archive');
  assert.match(sheet.text, /\[falta: Questions\]/);
});

test('a rendered piece holding a name the card does not list is refused (OPP-006)', () => {
  const rec = readFileSync(RECORD, 'utf8');
  const r = render('first-contact-email.txt', rec, readFileSync(OFFER, 'utf8'),
    { lang: 'es', organisation: 'una tienda', signature: 'Numen Games', greeting: 'Estimada Sra. Ortega:', today: '2099-10-15', card: CARD });
  assert.deepEqual(r.names, ['Sra. Ortega']);
  const ok = render('first-contact-email.txt', rec, readFileSync(OFFER, 'utf8'),
    { lang: 'es', organisation: 'una tienda', signature: 'Ada Lovelace · Numen Games', today: '2099-10-15', card: CARD });
  assert.deepEqual(ok.names, []);
});

test('the command line writes the pieces, exit 1 when something is missing', () => withDir((dir) => {
  const ok = run(RECORD, '--piece', 'first-contact-email.txt', '--lang', 'es', '--offer', OFFER, '--card', CARD,
    '--organisation', 'una tienda', '--signature', 'Numen Games', '--out', dir, '--today', '2099-10-15');
  assert.equal(ok.code, 0, ok.err);
  assert.ok(existsSync(path.join(dir, '2099_10_15-OPP-2099-008-first-contact-email.es.txt')));
  const bad = run(RECORD, '--piece', 'first-contact-email.txt', '--lang', 'es', '--offer', OFFER, '--card', CARD, '--out', dir, '--today', '2099-10-15');
  assert.equal(bad.code, 1);
  assert.match(bad.err, /missing: .*organisation/);
}));

test('the command line refuses to write a piece holding an unlisted name, and never into the archive', () => withDir((dir) => {
  const r = run(RECORD, '--piece', 'first-contact-email.txt', '--lang', 'es', '--offer', OFFER, '--card', CARD,
    '--organisation', 'una tienda', '--signature', 'Numen Games', '--greeting', 'Estimado Sr. Pérez:', '--out', dir, '--today', '2099-10-15');
  assert.equal(r.code, 1);
  assert.match(r.err, /OPP-006.*"Sr\. Pérez"/);
  const inside = run(RECORD, '--piece', 'first-contact-email.txt', '--offer', OFFER, '--card', CARD, '--organisation', 'x', '--signature', 'y', '--out', path.join(ROOT, 'opportunities'));
  assert.equal(inside.code, 2);
  assert.match(inside.err, /outside the archive/);
}));

test('the archive\'s first case renders from its own record and offer', { skip: !existsSync(path.join(ROOT, 'opportunities', 'OPP-2026-025.md')) }, () => {
  const rec = readFileSync(path.join(ROOT, 'opportunities', 'OPP-2026-025.md'), 'utf8');
  const offer = readFileSync(path.join(ROOT, 'operations', 'OPS-012-training-the-offer.md'), 'utf8');
  for (const piece of ['first-contact-sheet.html', 'first-contact-sheet-mobile.html', 'first-contact-email.txt', 'expiry-email.txt']) {
    const r = render(piece, rec, offer, { lang: 'es', organisation: 'el centro', signature: 'Numen Games', today: '2026-10-08', contactName: 'Numen Games', contactRole: 'Ventas', contactPhone: '[teléfono]', contactMail: '[correo]' });
    assert.deepEqual(r.missing, [], `${piece}: ${r.missing.join(', ')}`);
    assert.deepEqual(r.names, []);
    if (piece !== 'expiry-email.txt') assert.match(r.text, /8\.000 €/);
    assert.doesNotMatch(r.text, /8\.500|14\.500/, 'the old floors are gone');
  }
});
