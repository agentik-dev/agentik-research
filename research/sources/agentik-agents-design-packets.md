---
repo: agentik-dev/agentik-agents
path: design/packets/
commit: 78ce312
title: "design/packets: builder packets a-s1, a-s3, a-s4, a-s5"
author: agentik-dev (the suite owner)
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

Read: all four packets (a-s1 whole; a-s3, a-s4 and a-s5 sections 1, 2 and 7 plus the header tables).

## What it says
- Format: each packet is a header table (origin, pin, wall, may-touch, acceptance, budget, verify), a source section, numbered rulings, interfaces, findings, forbidden reads, a report shape and a builder charter with acts and an exit line. Each builder sitting is capped (at most 90 tool calls, checkpoint at 80%), works in a worktree, and the wall forbids pushes, merges, amends, a live `claude` call or an API call; tests put a fake `claude` first on PATH.
- a-s1 (router leaks): from a red `make test` on 2026-10-13 (one test failing twice in a row): the launcher started the router detached and dropped its pid, so any failure between the start and the exec left an orphan (ppid 1), and the next launch refused to start; the test asked for a router after the launcher call had itself started one. Rulings: keep the pid and stop the router on every pre-exec failure through an exit trap; make the test hermetic (a decoy router, a fake `claude`); stop every router a test starts in `try/finally`. Result: 63 launcher checks passed twice; the adversary's BLOCK then added a race fix (a router that answers is never its starter's to stop) and a SIGTERM fix in the router suite; two residual risks were filed in NICE_TO_HAVE.md.
- a-s3 (`status`, slice one): defines a read-only status verb listing seats, helpers and local rows from the session tool's per-session folders, Claude Code transcripts and the router ledger, never printing prompt, result or tool-input text; columns, states (busy, idle, quiet, done), exit codes (0, 1, 2), bounded reads (first 4 KB and last 64 KB of a transcript, last 2 MB of the ledger). Price table update from the claude-api skill's table, "cached 2026-10-06": fable-5-1 $10/$50, opus-5-5 $4/$20, sonnet-5-5 $2/$10, haiku-5-5 $0.10/$0.50 per million tokens, with per-model cache-read rates (opus-5-5 and sonnet-5-5 $0.20, fable-5-1 $0.25) and `claude-sonnet-5` kept at the billed $3/$15. Test counts at exit: 99 status checks. A refuter pair's BLOCK led to nine fixes and mutants M1 to M13 caught (M14 survives, called near-equivalent).
- a-s4 (layout): moves the plugin into `plugin/`, makes manifests follow the suite's conventions (version 1.2.0, MIT, under-200-character description), removes a stray empty tracked file, and wraps `make check` in the shared `bounded` script (one run per tree, 840 s wall, load 4). It broke the launcher's Explore override path (the file moved); the observer fixed it and filed a note that no test catches a stale path.
- a-s5 (`status`, slice two): API children in flight. Each API run writes a `run.json` at launch and a metadata-only `progress.json` from a stream-json fold; fan-out exports its run id to each shard; status lists lane `api` rows nested under the calling seat. Signals are forwarded to the child; the fold writes at most once a second. Test counts at exit: 81 run checks, 118 status checks, 46 fan-out checks. A two-refuter BLOCK produced four fix acts.

## Limits
- These are the builder's own charters and exit lines (our use); the adversary and refuter reports are summarised, not stored here.
- The packets name private notes (an owner's plugin review and a decision entry in a private configuration repo); the synthesis describes them generically.

## Used in
- research/synthesis/tools-agents.md
