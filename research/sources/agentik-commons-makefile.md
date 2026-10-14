---
repo: agentik-dev/agentik-commons
path: Makefile
commit: e456f4b
title: "agentik-commons Makefile"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- The header says commons is the tools' shared ground, builds no tool, and so has no install target and no plugin (r1 A9).
- `make check` runs `test` (stdlib unittest discovery), `lint` (`sh -n` on the front door and `sync`, and a bound that fails if the front door reaches 100 lines), `hygiene` (the commons scan on itself) and `marketplace-check`.
- `make local-marketplace` rewrites each plugin's url to a `file://` url under `AGENTIK_CODE` (default the parent of the commons checkout) and writes it to `AGENTIK_MARKETPLACE_DIR` (default a folder under the user's XDG data home), then runs the check with `--local` (r1 D1).
- Commons' own `make check` does not run `bounded`, `doclint` or the hash check; those are what the tool repos' checks add.

## Limits
- The Makefile shows what runs, not how long it takes or whether it has failed in use.

## Used in
- research/synthesis/tools-commons.md
