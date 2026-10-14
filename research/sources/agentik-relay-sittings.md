---
repo: agentik-dev/agentik-relay
path: history/sittings/
commit: a326550
title: "history/sittings: the charters of 132 sittings"
author: agentik-dev
published: 2026-09-22
accessed: 2026-10-14
kind: our-use
---

The folder holds 132 charter files from `2026-09-22-1.md` to `2026-10-13-1-public-r1.md`. A charter is the sitting's goal, budget, pin, done-ness, handover and exit line. Opened: the first (`2026-09-22-1`), `2026-09-23-8` (the R6 review), `2026-09-23-26-ar17c-deflake`, `2026-10-13-1-public-r1`; grepped across all for "storm", "flak" and "stalled".

## What it says
- First sitting (2026-09-22): packet A1 built the repo from nothing: Go module, CLI verb stubs, types and one table test, plugin and marketplace, a Makefile check with hygiene and doclint. Budget 60 turns, 80k context; the charter reads like an unattended relay sitting hand-off, with "decide, owner" lines in the handover.
- 2026-09-23 sitting 8: a read-only review sitting that read the 216 commits since 2026-09-22 and wrote R6 (nine fork-storm cycles, one unbounded).
- 2026-09-23 sitting 26 (deflake): a test (`TestAR17C_4_ProbeLeavesNoOrphan`) was flaky under the full suite. With the probe timeout cut to 3 ms, 20 of 20 runs failed; the cause was the test's 300 ms timeout racing a fake `lsof` script's start-up under load, not the product's group kill. The fix made the test wait on a condition instead of a longer sleep. After the fix, `make check` passed twice.
- Other flake mentions: 2026-09-22 sitting 16, `TestAR2_6_ShellReapsBackgroundChild` failed once on a full run because it greps `pgrep` machine-wide and another worktree's concurrent run can trip it (green 3 of 3 alone). 2026-09-25 sitting 1: two tests failed once each at load 7 and passed 3 of 3 alone.
- On 2026-09-23, sittings 5, 8, 9, 10, 18, 19 and 20 mention the fork-storm class. Sitting 10 (AR11) built the TLA+ model: `Night.cfg` clean at 666,949 distinct states in about 70 s. Sitting 18 reports 984,043 distinct states in 2 min 18 s, with `Storm.cfg` violated 4 states deep and `Storm-run.cfg` 7 states deep, both as designed.
- 2026-10-13 sitting (public-r1): the repo was prepared for public reading: the hygiene scan keeps generic patterns in the repo and loads private patterns from outside it, the module path moved to the organization's path, and 84 tracked files were rewritten by a table; the charter says `make check` was not run in that sitting and left to the gate (it runs 10 to 20 minutes, past the builder's 540 s bound).

## Limits
- 132 charters were not read; the counts above come from the files opened or grepped. The charters name private repos and products, which this note omits. Charters are written by the sitting itself.

## Used in
- research/synthesis/tools-relay.md

## Also (question 7)
Read for question 7 at commit a326550: the charter `history/sittings/2026-09-23-8.md`, section "Done-ness", the bullet "Not read". It records that the sandbox's permission classifier refused the reviewer's read of the charters' handover sections twice, with the reason "PII handling", once over batched output and once over five charters, and that the review lists the gaps this left. The charter does not say which Claude Code mode or setting was active, and the refusal text is the charter's report of it, not a captured message.

Used in: research/synthesis/field-7.md
