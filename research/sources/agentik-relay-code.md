---
repo: agentik-dev/agentik-relay
path: internal/
commit: a326550
title: "Go source: the stop reasons, the money cap, the watchdog and the ceilings"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

Opened only the lines that confirm the design page's mechanism: `internal/relay/types.go` (stop reasons), `internal/night/night.go` (money-cap checks near lines 1496, 1549, 1620; `tap.total`), `internal/night/status.go` (the budget line), `internal/night/bound.go` (breaker, watchdog and wall constants), `internal/night/run.go` (ceilings, grace), `internal/night/pause.go` (`MaxPauses`), `internal/queue/queue.go` (budget validation), `internal/hooks/stop.go`, and `cmd/relay/main.go` (flag parsing near line 1151 and 1173). 355 Go files exist; the rest were not read.

## What it says
- `StopReasons` lists thirty reasons (queue-empty, count-reached, until-reached, budget-reached, stream-error, no-progress, dirty-tree, no-commit, gate-failed-dependency, ceiling-kill, wall-clock, origin-moved, tmux-gone, owner-stop, owner-kill, ledger-error, measure-timeout, load, invariant, orphans, stalled-twice, usage-limit, auth, lock-moved, helper-storm, done, waiting, orchestrator-red, merge-held, queue-invalid). `SittingFailures` (each stops the night) lists thirteen of them. Packet failures that move the night on, absent from the list: `stalled`, `gate-unrun`, `main-moved`, `verify-cut`.
- Money cap, two layers. The row's `usd` becomes claude's own `--max-budget-usd` flag (internal/night/plan.go line 1004). The night's `--max-usd` is compared with the ledger tally (the read costs plus, for sittings whose cost was never read, the row's own budget as held spend) before each pick and at a usage-limit wake; once reached, no new sitting starts and the night steps `budget-reached` when no row is running. The code does not kill a running sitting for the night cap; that sitting is bounded by its own `--max-budget-usd`. An orchestrated run refuses to start without `--max-usd` or `--until`.
- Constants: `DefaultStallSeconds = 2700`, `WatchdogPoll = 60 s`, `DefaultWall = 4 h`, `MaxHelpers = 2`, `KillGrace = 30 s`, `SoftLine = 0.9`, `HardCap = 1.2`, `MaxPauses = 12`, `DefaultMeasureSeconds = 600`, `effects.Timeout = 900 s`, `LsRemoteTimeout = 30 s`, `SweepRounds = 3`, `OutputCap = 64 KiB`, `maxBlocks = 3`. Breaker: `Open 4`, `Close 2`, `Poll 30 s`, `Max 10 min`, idle floor 0.25.
- Queue validation refuses a row whose turns, context, usd or wall is zero or less.

## Limits
- Confirmed by reading, not by running; no test was run for this note. Constants can change after this commit.

## Used in
- research/synthesis/tools-relay.md
