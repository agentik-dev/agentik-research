---
repo: agentik-dev/agentik-commons
path: scripts/bounded
commit: e456f4b
title: "bounded: run a command under a wall, a per-tree lock and a load breaker"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- `bounded [--lock FILE] [--wall S] [--load N] -- cmd...` runs a command under three limits. The lock is an `flock` on a file that holds the holder's pid and start time (for the message only); if held, exit 2. The kernel frees it when the last holder dies, SIGKILL included, so there is no stale lock and no takeover. An older mkdir-style lock directory is removed when its owner pid is dead, else exit 2.
- The wall counts from start, including any load wait; at the wall the command's process group gets SIGTERM, then SIGKILL after a grace (default 5 seconds), exit 124.
- The load breaker waits while the one-minute load average is above N times the cores and the CPU confirms it (idle share at or under 25%), polling every 30 seconds for up to 600 seconds or the wall, then exits 2. A comment says the 25% floor equals the relay's night idle floor and "the two move together".
- Lifeline: bounded spawns a guardian in a new session that holds the pipe and the lock, runs the command in its own process group, and kills that group when the pipe closes (bounded died, or hit its wall). No member of the group outlives bounded by more than the grace plus one second, and the lock lives as long as the group.
- On a refusal or the wall the last stderr line is `bounded: stop: lock|load|wall`, which the gate reads as unrun, never red. A nested bounded writes `bounded: nested stop:` so an inner wall is a plain red.
- Other exits: the command's own code (128 plus the signal if a signal ended it), 1 usage, 127 when the command cannot start. Test overrides are environment variables (grace, poll, a fake load reading, a fake idle share).
- The header cites a private research round and finding ids (ADV10-1, ADV11-1, ADV11-2) for the lifeline, the process-group report and the nested stop; their records are not public.

## Limits
- The docstring and guide give the design, not the incident that led to it; no dated failure (for example a collision of two `make check` runs) is recorded in commons.
- Its tests live in the session repo (see agentik-commons-nice-to-have), so commons holds no test of its own for this file.

## Used in
- research/synthesis/tools-commons.md
