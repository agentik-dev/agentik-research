---
repo: agentik-dev/agentik-decisions
path: Makefile
commit: 80d59eb
title: "Makefile (make check and the decisions step)"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
- `make check` runs under a lock and a wall (`scripts/bounded --lock .check.lock --wall 840 --load 4`) and runs, in order, `gates test lint doclint hygiene validate decisions`, then compares the README to its sidecar hash (Makefile, `check` and `check-unlocked` targets).
- The `decisions` step runs `decisions render --check` when `DECISIONS.md` exists at the repo root, and otherwise prints "no DECISIONS.md, no block to check". A repo that adopts the tool therefore gets a stale-block gate from the same target. This repo has no `DECISIONS.md`, so its own step is a no-op.
- The `test` and `gates` targets run the harness (`tests/run.py`, `tests/gates.py`, `tests/skips.allow`) as extracted from the merge base with main (HEAD on main), so a branch cannot edit the checker that grades it; the Makefile comments cite ADV11-1, ADV10-5 and ADV10-2 as the reviews that asked for this.
- `hygiene` pins the canonical scripts by sha256 and fails when a copy has drifted.

## Limits
- Build tooling, not the ledger; cited for the freshness gate and for the lesson of the adversarial reviews.

## Used in
- research/synthesis/tools-decisions.md
