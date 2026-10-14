---
repo: agentik-dev/agentik-relay
path: design/breaker-signal-r1.md
commit: a326550
title: "agentik-relay design: the breakers' load signal (r1)"
author: agentik-dev
published: 2026-10-01
accessed: 2026-10-14
kind: our-use
---

Read sections 1 to 4 and 6 (the problem, decision, seam, proof, open risks). Section 5 (packet cut) and 7 (refuter round) were not read.

## What it says
- Two breakers hold work back while the machine is loaded, and both read one number: the 1-minute load average against the core count. The night breaker opens above 4 x cores and waits up to 10 minutes; the `make check` wrapper does the same for up to 600 s.
- The problem on the owner's laptop (a macOS machine with 4 efficiency and 12 performance cores): the load average counts every runnable thread, and background-priority threads queue on the efficiency cores while performance cores stand idle. Seen once: a plan baseline read load 40.23 (31 to 72 over the hour) with 59% to 73% of the CPU idle, and 8 of 9 checks were marked `unrun: loaded`. A hand plan five minutes earlier read 52.7 with the same 8 of 9 outcome. A quiet reading at 10.49 had 90.3% idle.
- Decision: a high load reading counts only when the CPU confirms it, meaning the idle share over a one-second sample is at or under a floor of 25%. The idle share is read only after the load key has turned; an unreadable share leaves the load alone to decide, so the rule can only narrow when the breaker fires.
- Proof P1 (ran 2026-10-01, a night live so the scale was kept small): twelve busy loops under background priority for 75 s raised the load from 4.61 to 11.14 while idle stayed 72% to 89% and a fixed foreground job kept its time (0.154 s before, 0.147 s at the end). Proof P2 (forty busy loops at normal priority, and a sweep to set the floor) was still owed when written.
- Open risks (section 6): across five ledgers the breaker has never opened (0 `breaker` lines, 0 opens in 166 plans, highest load 52.7). The rule only narrows; it does not make the breaker see a saturated CPU at a low load (one reading had load 17.30 at 2.17% idle, 1.08 x cores). The 25% floor is a judgment until P2; one number serves every machine; `top` output is localised; Linux counts uninterruptible I/O in load. Nothing measured the last two.
- The header says the change was merged with the floor at 0.25 while P2's sweep suggested 0.50, a one-constant change waiting for the owner's word.

## Limits
- Own measurement on one machine and one night; no external benchmark. P2 owed.
- The design names the owner's device model; this note describes it only by core counts.

## Used in
- research/synthesis/tools-relay.md
