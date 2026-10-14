---
repo: agentik-dev/agentik-agents
path: NICE_TO_HAVE.md
commit: 78ce312
title: "NICE_TO_HAVE.md of agentik-agents"
author: agentik-dev (the suite owner)
published: 2026-10-13 (the entries' own dates)
accessed: 2026-10-14
kind: our-use
---

Read whole (6,535 bytes).

## What it says
- Header: levels S1 (a reproduced harm or red gate), S2 (blocks a first run), S3 (the build order), S4 (polish). The file holds 2 S3 rows and 11 S4 rows (counted by grep), no S1 or S2 row, all dated 2026-10-13.
- S3: no test catches a path left at the old place after the plugin move (a scratch clone restoring the old Explore path, the old marketplace source and an old fallback still passes `make test`); and the conventions "slice two" backlog (doclint, hygiene in the check, the README via the translator, `validate` in the check, `claude plugin test`, a doctor target, an interpreter pin and mixed shebangs, three commands over 30 lines).
- S4 launcher: a signal inside the router start's command substitution orphans the router (200 runs left 2 routers running; the window is about 1 ms); until its next poll a launcher can still stop a router another launcher is using (not reproduced; a 0.25 s window).
- S4 cost tool: Haiku 5.5's long-prompt tier ($0.50/$2.50 per million above 100K prompt tokens) is not priced, so a long-prompt call is under-predicted; per-model cache-read rates reach the predicted cost only, so the efficiency figure and `--check-prices` still use a global 0.1 multiplier (opus-5-5 0.20 per million rather than 0.40, fable-5-1 0.25 rather than 1.00).
- S4 status tool: an in-place rewrite of a helper transcript at no smaller size double-counts under `--watch` (Claude Code only appends, so real transcripts do not do this); a cost scan holds one whole line in memory (a 10 MB line grows peak size by about that); a helper whose newest line is over 64 KB prints `-` for model, last tool and context; a dead run whose pid was recycled reads busy and is never pruned.
- S4 API wrapper: a grandchild that holds the child's stdout delays the wrapper's exit (4.4 s against 0.3 s on main in the repro).
- S4 fan-out: its run stamp is local time while run ids are UTC.
- S4 plugin command: the status command's text names lanes seat, helper and local only, while lane `api` now exists.

## Limits
- It is the open-item list of a young repo; absence of an S1 or S2 row does not mean there are no defects, only that none is filed. Most repros are from adversary or refuter sessions, not from field use.

## Used in
- research/synthesis/tools-agents.md
