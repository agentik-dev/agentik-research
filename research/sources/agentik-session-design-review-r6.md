---
repo: agentik-dev/agentik-session
path: design/review-r6.md
commit: e7f0723
title: "Review r6: the session repo's design decisions since 2026-09-22"
author: agentik-dev
published: 2026-09-23
accessed: 2026-10-14
kind: our-use
---

## What it says
- A review by one reviewing agent (relay row review-6-session, 2026-09-23, main at c7dbdee) that built nothing. It ledgered 19 decisions, listed reversals and tensions, and sized a "fork-storm class" in this repo: edges where one gate or hook could multiply processes.
- Fork-storm evidence (review-r6.md:38-47): a prior unattended run's defect D5, as quoted here, saw 310 concurrent gates spawn 620 node starts and 310 test suites, with no timeout, lock or load check; git status took two minutes in the storm (E2). Three edges had no bound in this repo: the gate (`make check` as a packet's acceptance line), a nested `claude-session start` from Bash (the launcher scrubs the session variables, so depth was invisible), and five hooks with no declared timeout (a version-manager shim stalled every tool call 60 s).
- Timing and edge conditions (review-r6.md:49-58): E5, the meter's turn ceiling was 400 while a relay child's `--max-turns` was 80, so one packet read "clear" at 79 of 80 turns; E6, the meter then summed the whole transcript rather than the window, so the gate and checkpoint nag fired early (fail-closed); E1, a gate on a dirty tree gives a result that is not a function of HEAD; E8, no per-hook timeout meant a 60 s stall at SessionStart was silent.
- The reviewer's five decisions for the owner: acceptance lines never run the whole suite; a nesting guard in `start`; timeouts and a gate lock; the zone follows `--max-turns`; the shebang rule. The README and design later record the nesting guard (`CLAUDE_SESSION_DEPTH`, refused above 1 without `--nested`) and the per-hook timeouts (5 s, 10 s for SessionStart, 15 s for SessionEnd) as landed.

## Limits
- The defect brief D1 to D7 that the review reads is in a private repository and was not opened. D5's figures (310, 620) are the review's quotation of it.
- Written by an agent about the owner's own repo; no outside reviewer.

## Used in
- research/synthesis/tools-session.md
