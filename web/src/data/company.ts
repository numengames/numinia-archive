// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// Numen Games S.L. as the public registers describe it: the company card at
// the top of /system/open-books and its "Company & owners" room.
//
// Every fact here is public and cited: the Mercantile Registry's gazette
// (BORME, boe.es), the company's legal notice (LEG-004) and ENISA's public
// loan search. Who holds which share is NOT here: the Registry does not
// publish it, and the partners have not yet agreed to. It enters from the
// deeds, with their consent.
//
// machine/scripts/test/open-books.test.mjs holds the capital steps to the
// registered share capital.

export interface CapitalStep {
  readonly date: string;
  readonly increase: number;
  readonly borme: string;
  readonly what: string;
}

export interface RegistryAct {
  readonly date: string;
  readonly kind: "capital" | "loan" | "office" | "status";
  readonly title: string;
  readonly text: string;
  /** A BORME notice id, or a URL for acts outside the gazette. */
  readonly source: string;
}

export const COMPANY = {
  name: "Numen Games S.L.",
  form: "Sociedad limitada",
  taxId: "B70735949",
  address: ["Calle Chile 10", "28290 Las Rozas de Madrid"],
  incorporated: "2024-02-16",
  conceived: "2020-11-02",
  capital: 5512.4,
  registry: "Madrid · T 46518 · F 130 · H M-816810",
  activity: "CNAE 6201 · computer programming",
  purpose: "Design, development, marketing, management and operation of digital technology platforms and computer systems.",
  governedBy: "A sole director",
  contact: "legal@numengames.com",
  emerging: { since: "2025-05-06", years: 5, borme: "BORME-A-2025-149-28" },
} as const;

export const CAPITAL_STEPS: readonly CapitalStep[] = [
  { date: "2024-02-16", increase: 3000, borme: "BORME-A-2024-55-28", what: "Share capital at incorporation" },
  { date: "2024-04-25", increase: 262.4, borme: "BORME-A-2024-86-28", what: "First increase" },
  { date: "2024-04-25", increase: 1050, borme: "BORME-A-2024-86-28", what: "Second increase, the same day" },
  { date: "2026-01-28", increase: 1200, borme: "BORME-A-2026-23-28", what: "Third increase" },
];

export const ACTS: readonly RegistryAct[] = [
  { date: "2024-02-16", kind: "capital", title: "Incorporated", text: "Share capital 3,000.00 €. Sole director: Clio Beruete Concostrina. Seat: Calle Chile 10, Las Rozas de Madrid.", source: "BORME-A-2024-55-28" },
  { date: "2024-04-25", kind: "capital", title: "Two capital increases", text: "+262.40 € and +1,050.00 €, to 4,312.40 €.", source: "BORME-A-2024-86-28" },
  { date: "2024-05-14", kind: "office", title: "Attorney-in-fact appointed", text: "Pablo Fernández-Maquieira Martínez.", source: "BORME-A-2024-97-28" },
  { date: "2024-10-22", kind: "loan", title: "ENISA participative loan", text: "100,000 € granted.", source: "https://www.enisa.es/sobre-enisa/consuta-datos-publicos/" },
  { date: "2025-05-06", kind: "status", title: "Emerging company", text: "Recognised under Law 28/2022, with five years of its benefits.", source: "BORME-A-2025-149-28" },
  { date: "2026-01-28", kind: "capital", title: "New director and a capital increase", text: "Christian-Rodolfo Märtens becomes sole director. +1,200.00 €, to 5,512.40 €.", source: "BORME-A-2026-23-28" },
  { date: "2026-05-07", kind: "office", title: "Attorney-in-fact appointed", text: "Clio Beruete Concostrina.", source: "BORME-A-2026-91-28" },
];

/** The company's organs as the Registry shows them, top down. */
export const ORGANS = {
  meeting: { role: "General meeting", who: "The partners", note: "four Oracles today, five at the founding" },
  director: { role: "Sole director", who: "Christian-Rodolfo Märtens", note: "since 28 Jan 2026 · before him Clio Beruete (2024–2026)" },
  attorneys: [
    { role: "Attorney-in-fact", who: "Pablo Fernández-Maquieira", note: "since 14 May 2024" },
    { role: "Attorney-in-fact", who: "Clio Beruete", note: "since 7 May 2026" },
  ],
} as const;

export const bormeUrl = (id: string) => `https://www.boe.es/diario_borme/txt.php?id=${id}`;
