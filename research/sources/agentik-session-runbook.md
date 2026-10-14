---
repo: agentik-dev/agentik-session
path: RUNBOOK.md
commit: e7f0723
title: "claude-code-session Runbook"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- Two facts govern the document. A `set` applies only to the running session unless `--save` is given. And an unattended run cannot answer a permission prompt: "an unattended run cannot answer a permission prompt, so an unanswered prompt resolves to deny, even though Claude Code still reports success." (RUNBOOK.md:5-8).
- Install: `make install` freezes the committed package under a per-tree directory and writes a launcher that runs that copy with `python -P`, so neither the directory a hook fires in nor the live checkout can change a hook. Installing into a venv only leaves every hook silently dead, because hooks spawn with Claude Code's PATH (RUNBOOK.md:11-30).
- Profile constraints: the local-model profiles run through a router that sets the API base URL, which disables Remote Control and voice dictation for the whole session; local subagent concurrency is capped at 1, so ten local subagents are ten sequential runs (RUNBOOK.md:52-62).
- Measured, 2026-09-05, one developer machine (RUNBOOK.md:113-139): a 27B-parameter local model of 29 GB; cold start about 25 s; 155 s for a 2-turn trivial read task with three tools; 327 s (about 65 s per turn) for a 5-turn edit task. In the 327 s run the model reasoned correctly but its Edit call was declined because nobody answered the permission prompt; Claude Code still reported `subtype=success` and `is_error=false`; the tool classed the run PARTIAL by reading `permission_denials` from the transcript instead of the exit code. The text says the two timings are not interchangeable (different tool counts, turn counts, tasks).
- Live keys (`posture`, `reserve_pct`, `checkpoint`, `notes`) take effect at once; launch-time keys (model, effort, tools and others) cannot change a running process (RUNBOOK.md:140-200).
- Budget zones table (clear 0%, notice 80%, wind-down 90%, reserve 92%, exhausted 100%) and the sentence "Budget is a signal, not a gate" (RUNBOOK.md:235-258). Postures off, signal, ask, deny are "all confirmed by test".
- `checkpoint -c` runs `git add -u` (tracked files only) and never stages untracked files, because the wind-down nudge makes an autonomous agent the likeliest caller and `add -A` would sweep up a plaintext `.env` or a tfstate (RUNBOOK.md:261-266).
- The admission ledger (observe mode only): records helper spawns, rate-limit readings and verdicts, projects the five-hour window's peak at its reset, refuses nothing yet (RUNBOOK.md:227-231).
- The measure: `session.measure` is recorded beside the meter; `doctor` warns at a drift of 10% or more and never fails; the budget reads only the meter (RUNBOOK.md:233).
- Restarting a sitting (RUNBOOK.md:295-346): the `run` command, refusal of resume, fork, detach and print flags and of `/compact`, the close order (charter close, commit the charter, then `checkpoint --respawn`), guards (cap 12 per rolling 24 h, floor 600 s, settle 60 s), two STOP-file paths, and the advice to give a `/loop` an interval under 60 minutes because a longer one asks a cloud-or-session question before it arms.
- The launcher needs the Stop, PostToolUse, PostToolUseFailure and PostToolBatch hooks; until both CLI and plugin are current, a helper's failed call stays open and holds the sitting (RUNBOOK.md:342-345).

## Limits
- A runbook for one owner's machines; the local-model figures are one machine and one model on one date.
- The RUNBOOK says `local-only` is "not a daily driver"; it records measurement, not a recommendation to use it.

## Used in
- research/synthesis/tools-session.md
