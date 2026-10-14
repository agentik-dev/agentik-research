---
repo: agentik-dev/agentik-relay
path: history/sittings/, design/packets/, design/review-r6.md, design/packets/ar11-tla-night.md, design/packets/rows-2026-09-23-r3.json, design/breaker-signal-r1.md, internal/night/night.go, internal/night/bound.go, Makefile, README.md
commit: 405d1e0
title: "agentik-relay at its head on 2026-10-14: the record's counts, the fork-storm fix, the idle floor, the build name"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

Read on 2026-10-14 in the attached checkout at 405d1e0 (2026-10-13 19:18:20 -0700), the relay's head in the fixer brief's pin. Line numbers are at 405d1e0. `git diff --stat a326550 405d1e0` shows `design/review-r6.md`, `design/relay-r1.md` and `design/breaker-signal-r1.md` unchanged since a326550; the Makefile, README and NICE_TO_HAVE changed.

## What it says

### The record's size, counted
- Sitting charters, counted with `ls .sources/<repo>/history/sittings | wc -l` in each checkout at its head on 2026-10-14 (every entry is a dated `.md` charter; `ls` without `-a` skips the relay's `.keep`): agentik-relay 133 (405d1e0), agentik-session 61 (e8477a7), agentik-decisions 53 (569a120), agentik-respeak 41 (c83e9b8), agentik-agents 2 (f986500), agentik-commons 1 (588530f). The `.github` profile repo (8a0a188) has no `history/sittings/`. The relay holds the most.
- The relay held 132 charters at a326550 (`git ls-tree --name-only a326550 history/sittings/`, 133 entries less `.keep`); the 133rd is `2026-10-13-2-agentik-r1-relay.md`, added in dccd8a9.
- Packets: `ls design/packets/*.md | wc -l` reads 88 at 405d1e0 (87 at a326550; the 88th is `agentik-r1-relay.md`, added in d366b6a), beside 19 `rows-*.json` files.
- Test functions: `git grep -h '^func Test' 405d1e0 -- '*_test.go' | wc -l` reads 723 (706 at a326550). The README's status line (README.md:104) still reads "version `0.1.3`, rendered `2026-10-13`, `699` Go tests".

### The fork-storm cycle C4 and its fix
- `design/review-r6.md:55`: C4, "a relay child runs" the run verb; "Bound: NONE in the binary". The fix it names: the run verb "refuses a nested plan before any stage (exit 2, `stop: nested`)", `relay.Invariants` gains `never-nested-run`, and "the PreToolUse guard denies" the run verb and a bare plan "when `RELAY_ROW` is set".
- `design/review-r6.md:71`: doclint and hygiene run through the pyenv shim inside the verify line; "D5 saw 60 s per shell on the rehash lock". D5 is an item of the defect brief R6 read (line 3). No file named as a brief or defect brief is tracked at 405d1e0 (`git ls-tree -r --name-only 405d1e0 | grep -i 'brief\|defect'` prints nothing).
- `design/review-r6.md:74-84`: section 5 says what a TLA+ model should cover; section 6 lists five decisions for the owner, each recommended: (1) refuse the nested run in the binary and the child's guard, (2) the acceptance grammar, (3) one packet for the anchor head, the root lock and stale-lock reclaim, (4) a small TLA+ model now, (5) the pyenv shim out of `make check`.
- `design/packets/rows-2026-09-23-r3.json`: one row, `ar10-bounded-night`, "the night bounded against the 2026-09-23 fork storm"; its act 0 is "the recursion guard" (`RELAY_MEASURE_DEPTH` in every measured line and the child's env, a nested plan measures nothing, the packet parser refuses plan, run and gate lines on the real queue).
- `design/packets/ar11-tla-night.md:1`: "Packet AR11: the night modeled (TLA+, the storm found, the run guard)". Its act 4 (line 25), "The run guard (C4)": the run verb under `RELAY_MEASURE_DEPTH` or `RELAY_ROW` exits 2 before any stage, `night.Run` returns `ErrNested`, and the child's PreToolUse guard denies the run verb, and the plan verb without `--rows`, when `RELAY_ROW` is set.
- `internal/night/night.go:97-100`: `ErrNested`, "Run refuses a night under a measurement or a sitting (the run guard, relay-r1 §15, AR11; R6 §3 C4)".

### The idle floor
- `design/breaker-signal-r1.md:3`: "Both proofs ran (§4). AR47 is merged at 4b980d7 with the floor at 0.25; P2's sweep says 0.50, a one-constant change that waits for the owner's word."
- Lines 61-73: P2 "ran 2026-10-01 13:10 in a compact form". Forty-eight background loops held the load past 32; normal-priority loops were added in steps while a 16-wide job was timed. The job slowed by a quarter at the first step (49.4% idle) and by more than half at 24.4% idle; "By this section's rule the floor is 0.50." The design calls the number coarse (a short job, one run per step). `night.DefaultIdleFloor` is still 0.25 in the code (`internal/night/bound.go:676`).
- Line 88, in the open risks, was not updated: "The floor is a judgment until P2's sweep."

### The build name
- `Makefile:36-37`: `build` writes `bin/agentik-relay` from `./cmd/agentik-relay`. `Makefile:38-43`: `install` builds `agentik-relay` into `BINDIR`, links the old bare name to it "until 2026-12-31", and installs the `agentik` front door beside it.
- `git show 72c0fe0 -- Makefile` (2026-10-13 17:43:48 -0700, "agentik-r1-relay act 5, its rest: the install target, the plugin relay") is the change from `bin/relay` and `./cmd/relay` to the new name; the merge a166166 (2026-10-13 18:42:08 -0700) took it to `main`.
- `README.md`: every command line uses `agentik relay <verb>` (lines 15 to 41, for example `agentik relay run` and `agentik relay report`); line 5 names the binary `agentik-relay`, with the bare name a link to it until 2026-12-31.

## Limits
- Counts of files, not of nights: a charter is written by its own sitting, and the ledger of nights is outside the repo.
- The fix for C4 is read from the design, the packet and one code comment; this note ran no test and no night. A fix in the repo is not proof it holds.
- The sweep is the design's own measurement on one machine, one run per step.

## Used in
- docs/tools/relay.md
