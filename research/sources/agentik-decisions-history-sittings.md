---
repo: agentik-dev/agentik-decisions
path: history/sittings/
commit: fabb212
title: "history/sittings (one charter per working session)"
author: agentik-dev
published: 2026-09-22 to 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
Opened: `2026-09-22-1.md`, `2026-09-22-3.md`, `2026-09-23-5.md`, `2026-09-24-8.md`, `2026-09-28-1-d18.md`, the first 30 lines of `2026-10-11-2-d23-build.md`, and `2026-10-13-1-public-r1.md`. The other charters were not opened. Greps over `history/` for flap, re-litigate, re-cut, asked twice, same question, re-asked and loop, and for cap, found no charter that records a decision re-litigated across sittings or a ledger past its cap.
- There are 52 charters from 2026-09-22 to 2026-10-13 (a directory listing). The shape: a table of goal, budget, pin, wall, window and agents; Done-ness; Handover; Next act.
- Sitting 2026-09-22-1 measured the first consumer's log at its pin: 242,404 bytes, 1,643 lines, 214 ids at line start. A read-only refuter returned PASS WITH FOLDS, and a builder shipped 43 tests.
- Sitting 2026-09-22-3: the conversion study failed its refuter (5 blocking, 4 major, 8 minor) and was folded; four packets merged; 133 tests green at the close. The handover puts three questions to the owner in plain language with a recommended answer and a named consumer each.
- Sitting 2026-09-23-5 (review r6): 17 decision entries reconstructed from change-logs and charters, seven only in the change-log and three only in a charter; `make check` ran 229 tests with 38 skipped. One measured defect: the reviewer's check log path collided with another row's live run on the same fixed temp path.
- Sitting 2026-09-24-8 ended at 372 tests (per-file era). After the redesign, sitting 2026-09-28-1 (d18) fixed seven bugs after review, each with a test red before its fix, and ended with both live ledgers linting 0.
- Sitting 2026-10-11-2 (d23, backlog) ended at 281 tests, `make check` exit 0 in 46 s, and a README render of 297 s.
- Sitting 2026-10-13-1 (public release prep) ended at 356 tests, 99 tracked files rewritten to remove private names, three of them renamed, `make check` exit 0 in 52 s, and a README render of about 8 minutes. An earlier render in that sitting was refused after its helper hit the 600 s wall with load at 6.6 during three simultaneous renders.
- Re-checked at fabb212: `ls history/sittings | wc -l` reads 53 (the survey at 80d59eb counted 52). The newest is `2026-10-13-2-agentik-r1.md` (packet agentik-r1-decisions): acts 0 to 3 committed, `make check` exit 0 in 111 s with 361 tests passing, and a README source at 24,570 of 24,576 bytes (lines 10 and 17 of that charter). Its handover lists one open item for the owner, the install order at the switch (line 25), and its next act is none (line 31).
- I found no charter or design file that records an in-force set over the cap of 25 being refused. The one cap refusal on record is the questions file over its cap of five (`agentik-decisions-history-sessions`). The two older ledgers of 393 and 98 entries are said to fail the shape, not the cap by name (d18:46, see `agentik-decisions-d18-one-flow`).
- Line anchors at fabb212 for the passing-lint claims: `history/sittings/2026-09-28-1-d18.md:17` says both live ledgers lint 0 at the end of the d18 sitting, and :26 records that L1 takes a clock time between the date and the `;` or `,` because three entries of the cross-repo ledger carry one. The consumer intake of 2026-09-29 (:31) says `render --lint` exits 0 on the moved ledger as it is.

## Limits
- Charters are the builder's own account at close; numbers are theirs. The tool's own repo keeps no ledger, so these charters are the closest thing to a decision record for the tool itself.

## Used in
- research/synthesis/tools-decisions.md
- research/synthesis/journal-ledger.md
