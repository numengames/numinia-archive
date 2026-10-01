// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The taxes of Numen Games S.L., for someone who has never filed a return:
// the Taxes room of /system/open-books.
//
// Five kinds of tax touch the company. Each one is explained here in plain
// words: what it is, who really pays it, how often, and the form Hacienda
// uses. The VAT per quarter is NOT typed here: the page computes it from the
// invoice books (ledger-2025.csv, ledger-2026.csv, sales.csv), so the two can
// never disagree. What is here is what the books cannot say: the calendar,
// and the 2024 estimate while the 2024 book is not loaded.
//
// VAT ends every quarter in one of three results, the words Hacienda's own
// form uses (modelo 303):
//   "to pay"     we charged more VAT than we paid: the difference goes to Hacienda
//   "to offset"  we paid more than we charged: the difference waits, as a credit,
//                for the next quarters (up to four years)
//   "to refund"  only in the last quarter of the year: instead of waiting, we
//                ask Hacienda to send the credit back to the bank
//
// Nothing here is advice. The gestoría files; these are our own estimates,
// each one labelled, until its filed return is loaded.
//
// machine/scripts/test/open-books-fiscal.test.mjs holds the three results, the
// calendar order and the five kinds.

export type VatResult = "to pay" | "to offset" | "to refund";

export const VAT_RESULTS: Record<VatResult, { label: string; plain: string }> = {
  "to pay": { label: "To pay", plain: "We charged our clients more VAT than our suppliers charged us. The difference is not ours: we hand it to Hacienda." },
  "to offset": { label: "To offset", plain: "Our suppliers charged us more VAT than we charged. Hacienda owes us the difference; it waits as a credit and is subtracted from the next quarters' VAT, for up to four years." },
  "to refund": { label: "To refund", plain: "Only possible in the fourth quarter: instead of waiting, we ask Hacienda to pay the whole credit into the bank. It has six months; after that it owes interest." },
};

export interface TaxKind {
  readonly name: string;
  readonly spanish: string;
  readonly form: string;
  readonly every: string;
  readonly plain: string;
  readonly whoPays: string;
  readonly ours: string;
}

export const TAX_KINDS: readonly TaxKind[] = [
  {
    name: "VAT",
    spanish: "IVA",
    form: "303 every quarter · 390 the yearly summary",
    every: "quarter",
    plain: "A 21% tax on almost everything sold. Companies are only its collectors: they add it to what they sell, subtract what they paid on what they bought, and settle the difference with Hacienda.",
    whoPays: "The final consumer. For a company it is money passing through: what it pays on purchases, it gets back.",
    ours: "We buy a lot and sold little with VAT: our one big client is abroad, and services sold outside the EU carry no Spanish VAT. So Hacienda owes us VAT, quarter after quarter.",
  },
  {
    name: "Withholding",
    spanish: "Retenciones de IRPF",
    form: "111 every quarter · 190 the yearly summary",
    every: "quarter",
    plain: "When the company pays a salary or a professional's invoice, it keeps back part of it (the professionals' 15%, a share of each payslip) and pays it to Hacienda in their name, as an advance on their own income tax.",
    whoPays: "The person who earns it. The company only keeps it back and hands it over.",
    ours: "Every quarter: the income tax kept from the payroll and from professionals' invoices.",
  },
  {
    name: "Social security",
    spanish: "Seguridad Social",
    form: "a monthly payment (RED system)",
    every: "month",
    plain: "Contributions that pay for pensions, sick leave and unemployment. Part is taken from the employee's payslip, the larger part is paid by the company on top of the salary.",
    whoPays: "Both: about 6.5% from the employee, about 31% on top from the company.",
    ours: "Paid each month for the staff on payroll; it is most of the difference between a salary and what it costs.",
  },
  {
    name: "Corporate tax",
    spanish: "Impuesto sobre Sociedades",
    form: "200 once a year, in July",
    every: "year",
    plain: "The company's own income tax: a share of its profit. With losses there is nothing to pay, and the losses are kept to lower the tax of future profitable years.",
    whoPays: "The company, from its profit.",
    ours: "Nothing to pay so far: the company has had losses every year. As an emerging company its rate will be 15% instead of 25% for its first four profitable years.",
  },
  {
    name: "Information returns",
    spanish: "Declaraciones informativas",
    form: "347 (anyone over 3,005.06 € a year) · 349 (EU suppliers and clients)",
    every: "year",
    plain: "Lists that cost nothing but must be filed: who the company bought from and sold to, so Hacienda can cross them with the other side's returns.",
    whoPays: "Nobody: they are information, not payments. Filing late is fined.",
    ours: "Our main suppliers and our client enter the 347; the EU suppliers that invoice without VAT enter the 349.",
  },
];

export interface Deadline {
  readonly due: string;
  readonly what: string;
  readonly form: string;
  readonly estimate: string;
}

/** The next twelve months of obligations, in date order. Deadlines that
 *  fall on a weekend move to the next working day, as Hacienda moves them. */
export const CALENDAR: readonly Deadline[] = [
  { due: "2026-10-20", what: "VAT, Q3 2026", form: "303", estimate: "to offset · 0 € to pay" },
  { due: "2026-10-20", what: "Withholding, Q3 2026", form: "111", estimate: "≈ 1,331 € to pay" },
  { due: "2026-10-30", what: "Social security, September", form: "RED", estimate: "≈ 606 €" },
  { due: "2026-11-30", what: "Social security, October", form: "RED", estimate: "≈ 606 €" },
  { due: "2026-12-31", what: "Social security, November", form: "RED", estimate: "≈ 606 €" },
  { due: "2027-01-20", what: "Withholding, Q4 2026", form: "111", estimate: "≈ 1,327 € to pay" },
  { due: "2027-02-01", what: "VAT, Q4 2026: offset or ask for the refund", form: "303 + 390", estimate: "the year's credit" },
  { due: "2027-02-01", what: "Withholding, yearly summary", form: "190", estimate: "information" },
  { due: "2027-03-01", what: "Suppliers and clients over 3,005.06 €", form: "347", estimate: "information" },
  { due: "2027-04-20", what: "VAT and withholding, Q1 2027", form: "303 + 111", estimate: "as Q4" },
  { due: "2027-04-30", what: "Legalise the 2026 company books", form: "Registry", estimate: "≈ 50 €" },
  { due: "2027-07-26", what: "Corporate tax, FY2026", form: "200", estimate: "0 €: a loss" },
  { due: "2027-07-30", what: "File the FY2026 annual accounts", form: "Registry", estimate: "≈ 70 €" },
];

/** Questions for the gestoría still open, counted on the Taxes room. The
 *  topic only: the detail (who, which invoice) stays with the company. */
export const GESTORIA_QUESTIONS: readonly { topic: string; moves: string }[] = [
  { topic: "Were the 2024 and 2025 VAT refunds asked for, and paid?", moves: "cash: the 2025 refund alone is estimated near 22,400 €" },
  { topic: "The withholding rate on one professional's invoices", moves: "withholding to pay" },
  { topic: "Whether one supplier invoices as a company or as a person", moves: "withholding to pay" },
  { topic: "A registry fee that may be counted twice", moves: "the books, by 69.54 €" },
  { topic: "A foreign supplier charging Spanish VAT", moves: "VAT paid that should not be" },
  { topic: "The ENISA loan's repayment schedule", moves: "cash: when the principal starts to be repaid" },
];

/** 2024 is not loaded yet: its VAT is estimated from 2025's pace for services. */
export const VAT_2024_ESTIMATE = {
  kind: "simulated" as const,
  inputVat: 5255,
  why: "The 2024 received-invoices book is not loaded. The input VAT is 2025's monthly VAT on services (without people and counsel) over 10.5 months, from 16 February.",
};

/** The emerging-company rate and the losses kept for the future. */
export const CORPORATE = {
  rate: 0.15,
  normalRate: 0.25,
  years: 4,
  note: "Law 28/2022: 15% for the first tax year with a profit and the three after it, while the company keeps the status (until 2030).",
};
