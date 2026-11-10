# data/telemetry

Data, not code. `history.jsonl` is the telemetry ledger of numengames/numinia-archive:
one line per distinct `corpus_hash` measured on a clean tree of main, append-only.

Written only by `.github/workflows/telemetry-history.yml` after each merge to main.
Read by the web build and by CI (`machine/scripts/lib/history.mjs`).
Never merged into main. See `machine/telemetry/README.md` on main.
