---
repo: agentik-dev/agentik-session
path: claude_session/
commit: e7f0723
title: "claude_session/: the meter, the zones, the charter, the hooks and the launcher, as code"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
Opened only to confirm the mechanism the designs describe:
- budget.py:1-110. A module docstring states the problem: "The problem this solves: a session that runs to 100% dies mid-thought. There is no budget left to write down what it was doing, commit the work, or hand off -- so the most valuable turn of the sitting, the handoff, is the one that never happens." Policy defaults: reserve 8%, notice 80, wind-down 90; the reserve floor is 100 minus the reserve (92). `zone_for` returns exhausted at 100 and above, reserve at 92, wind-down at 90, notice at 80, else clear, and `unknown` with no reading.
- meter.py:1-80. Definitions: a turn is one deduplicated assistant line keyed by request id and message id; context is the last non-sidechain turn's input plus cache-creation plus cache-read tokens; message content is never read; parsing is incremental with an offset checked against the file's inode and size. `DEFAULT_LIMITS` are 180000 context, 400 turns, a 200000 window, `checkpoint_at` 0.8 (meter.py:38).
- charter.py:1-120. `CEILING = 4096`; the table rows are goal, budget, pin, window, agents; the parts are Done-ness, Handover, Next act; the title pattern is `# Sitting <date>-<n>: <repo>, <component>`; a RESPAWN Next act matches `^RESPAWN(?=[:.\s]|$)`; a WAITING line must be `WAITING <n>: <what>; <how to tell>`; `check` and `close` warn but keep their exit code.
- hooks.py. `MAX_OUT = 400` and `CHECKPOINT_EVERY = 10` (hooks.py:50-51); `EXIT_RULE` reads "EXIT: land the act in flight at a checkpoint, then exit; respawn, never compact" (hooks.py:52-53); the signal function is silent under the checkpoint threshold, speaks at the first crossing, then every tenth tool, and on every tool at or past 100% (hooks.py:350-367); the CHECKPOINT line includes percent and counts of both ceilings and the charter path and is dropped if it would exceed 400 bytes (hooks.py:370-383); `pre_compact` blocks only `trigger == "auto"` and returns the message that this setup restarts a sitting, naming the `checkpoint --respawn --charter` command and saying a typed `/compact` still runs (hooks.py:517-531).
- chain.py. `DEFAULTS = {"cap": 12, "floor": 600, "settle": 60}` (chain.py:46); the chain loop polls every 2 s, waits a 10 s grace before a restart and a 30 s kill grace after SIGTERM (chain.py:216-220); a forbidden-flag tuple sits at chain.py:42-44.

## Limits
- Read to confirm numbers and shapes, not audited. launch.py, ledger.py, resolver.py, admission.py, rules.py, doctor.py, models.py and the rest of hooks.py and chain.py were not read.

## Used in
- research/synthesis/tools-session.md
