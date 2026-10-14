---
repo: agentik-dev/agentik-session
path: design/packets/
commit: e7f0723
title: "design/packets: one packet per build row"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- A folder of 30 packet files (.md) and 11 `rows-*.json` queue files. Read in part: s17-exit-rule-respawns.md (in full), s4-meter.md (lines 18 to 48) and the s20 test counts line; the rest were listed, not read.
- s17 (design/packets/s17-exit-rule-respawns.md:22): until 2026-09-29 the plugin's text told a sitting at its ceiling to "respawn by default, compact at most once", and two profile descriptions said the first checkpoint compacts in place and the second respawns. The owner ruled on 2026-09-29 that a sitting restarts rather than compacts, since a restart reads its brief fresh and a compaction needs the owner's hand. The packet changed the exit rule's text to "respawn, never compact" and added two tests that forbid the old phrases.
- s4 (design/packets/s4-meter.md:18): the meter's cadence (silent under 80%, one line at the crossing, every tenth tool, every tool at or past 100%) and the check that the meter agrees with an outside usage report on one real transcript (turns, tokens, max context).
- s20 (design/packets/s20-run.md:42): test counts for the launcher, for example 51 `s20a` tests with named groups for refusals, restart, guards held and cap failing closed.

## Limits
- Packets are instructions to builder sessions. They show intent and acceptance lines, not outcomes.
- Most of the folder was not read.

## Used in
- research/synthesis/tools-session.md
