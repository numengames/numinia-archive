// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The ledger behind /system/account (STD-033 LED-001): one line per document,
// read from src/data/account-simulated.csv. The page computes its views from
// these lines in the browser; the markdown view (/system/account.md) sums the
// same lines here, so the two cannot disagree (LED-002).
//
// SIMULATED until the first month closes (PRO-021).
import raw from "@/data/account-simulated.csv?raw";

export const ACCOUNT_CSV = raw;
/** The ledger's cut-off: the last day it describes. */
export const AS_OF = "2026-09-24";
/** The company's first day. */
export const START = "2020-11-02";
/** Invented bank balance, for the runway view. */
export const CASH = 48000;
export const SIMULATED = true;
/** The documents that govern the account. */
export const ACCOUNT_SOURCES = [
  "standards/STD-033-charges-and-the-account.md",
  "system/SYS-008-the-account.md",
  "protocols/PRO-021-closing-the-month.md",
];

export type Line = Record<string, string>;
export function lines(): Line[] {
  const [head, ...rest] = raw.trim().split("\n");
  const cols = head.split(";");
  return rest.map((l) => {
    const v = l.split(";");
    return Object.fromEntries(cols.map((c, i) => [c, v[i]]));
  });
}

export const CATEGORY_LABEL: Record<string, string> = {
  personas: "People",
  ia: "Artificial intelligence",
  software: "Software and licences",
  nube: "Servers, web and domains",
  asesoria: "Gestoría, registry and bank",
  encargos: "Art and commissions",
  web3: "Web3 (gas)",
};
