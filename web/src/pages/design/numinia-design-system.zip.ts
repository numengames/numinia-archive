// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// /design/numinia-design-system.zip — the design system, downloadable whole.
// Built at build time from STD-032's register (@/lib/design-download); a
// file the register names and the tree lacks fails the build.
import type { APIRoute } from "astro";
import { designZip } from "@/lib/design-download";

export const GET: APIRoute = () =>
  new Response(new Uint8Array(designZip()), {
    headers: { "Content-Type": "application/zip" },
  });
