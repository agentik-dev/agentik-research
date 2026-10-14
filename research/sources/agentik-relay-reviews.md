---
repo: agentik-dev/agentik-relay
path: design/
commit: a326550
title: "design/review-r6.md and design/review-adv*.md, review-ar2.md (adversarial reviews)"
author: agentik-dev
published: 2026-09-23
accessed: 2026-10-14
kind: our-use
---

Files read: `design/review-r6.md` in full; the openers (about the first 1,800 characters) of `review-adv6.md`, `review-adv10.md`, `review-adv17.md` and `review-ar2.md`. The other review files (adv11 to adv16) were not opened beyond their names and grep hits.

## What it says
- R6 (the design-decisions review, 2026-09-23, a read-only sitting): 31 ledger rows of decisions; nine "fork-storm" cycles found, eight bounded by the depth variable, fakes, the memo, an 8-turn cap, a stop-hook block cap or the earlier stand-in's own guard, and one unbounded: a relay child running `agentik relay run` (C4). "Bound: NONE in the binary", only prose and each level's turn and dollar caps.
- R6 section 4 (timing and edge conditions) lists defects with no test: the process-wide mutex for the root lets a hand plan or gate measure beside the night; the same-as-main anchor carried no head; a stage lock created with `O_EXCL` and never checked for a dead pid left a crashed relay's row refused; the live-claude probe (`lsof`) had no timeout and "under load it takes minutes"; the breaker took a background context so a stop landed up to 10 minutes late; the memo had no age; the gate's reruns bypassed the breaker so N suites could run at once; doclint and hygiene ran through a pyenv shim where an earlier defect brief saw 60 s per shell on the rehash lock.
- R6 decisions for the owner (recommended yes): refuse a nested `agentik relay run` in the binary and the child's guard; the targeted-acceptance grammar; one packet for the anchor head, the cross-process root lock and stale-lock reclaim; a small TLA+ model of the night; move the pyenv shim out of `make check`.
- R6 note: the first thirteen charters escalated 59 decisions; after the owner's standing word, one fork per packet.
- ADV6, ADV10 and ADV17 are adversarial reviews by two read-only Opus reviewers per round, each reproducing findings in temp copies. ADV6-1: a child could run `agentik relay run`, spawning a grandchild (repro: `spawns=1 rows=r1=red`). ADV6-2: a killed relay left every child and measurement unsupervised (repro: a stand-in relay sent SIGINT left both spawned `sleep 40` processes alive). ADV10-1: a child could move `main` with `update-ref` and skip the gate. ADV10-2: a tag named after the base hid every touched path. ADV17 answered two owner questions: ready to carry a downstream repo at `--parallel 1` with the sandbox open was "Qualified yes" once one fix landed; the earlier fixes did not regress except one.
- AR2 (the first adversarial review, three reviewers): one slice's agent used 41 tool uses, 116k tokens and 417 s and reported 14 findings (1 blocking, 6 high, 7 low). A finding counts only when the coordinator reproduces it.

## Limits
- Reviews are by the same family of models that built the code; findings are the repo's, with reproductions in temp copies, not an independent audit. R6 states the charters' handover sections were not read because the sandbox's permission classifier refused the read.
- The D1 to D7 defect brief that R6 and AR10 quote is not in this repo, so the fork-storm event itself cannot be read first-hand here.

## Used in
- research/synthesis/tools-relay.md
