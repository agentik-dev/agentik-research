---
repo: agentik-dev/agentik-session
path: history/sittings/
commit: e7f0723
title: "history/sittings: one charter per sitting, 2026-09-22 to 2026-10-13"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
- The folder holds 58 charters, each the file the tool describes (title line, a table of goal, budget, pin, window and agents, Done-ness, Handover, Next act). Read in full or in large part: 2026-09-22-1, 2026-09-23-5, 2026-09-28-1, 2026-09-30-1, 2026-10-04-1, 2026-10-10-1, 2026-10-10-4 (opening), 2026-10-11-1 (two files), 2026-10-11-2, 2026-10-11-3, 2026-10-12-2 (M1), 2026-10-12-4 (M2, goal and drift lines), 2026-10-12-7, 2026-10-13-1. The other charters were searched for incident words only (overnight, stalled, stuck, wasted, compacted, ran past, exhausted), which found nothing beyond the files named here.
- Budget rows show the practice: a builder charter states a turn count and a context ceiling, for example "70 turns, 180k context", with "land the act in flight at 80%", and a closing line `exit taken: ...` (for example 2026-09-30-1: goal met, two commits, not pushed). The first sitting (2026-09-22-1) records "spent 165k / 25 after the push (meter, past 80%: exit)" in its budget row and "sitting closed at 134k / 20" in its exit line: two readings in one file.
- A coordinator keeps a window of 1M while its builders keep 180k; the `window` row reads "1M (a builder keeps 180k)" in 2026-10 charters.
- 2026-09-28-1 (model-ceilings): a Claude Code 1M Opus session cannot be told from a 200k one in the transcript, because the API id drops `[1m]`; the SessionStart payload's `model` keeps it. The charter says this was read from the binary and transcripts of Claude Code 2.1.284, not from a live hook run. About 65 turns and 120k context were spent, "under the 80% line".
- 2026-10-10-1 (the respawn mark): 59 tests were red on unchanged code and green after; the sitting stopped at a safety guard with its last act uncommitted, and the next act handed that to the coordinator (an example of a Handover and Next act carrying work across a stop).
- 2026-10-11-1 (frozen tree): `make install` could delete a launcher's tree while a live process ran from it; the fix keeps every tree a live process names and the newest three.
- 2026-10-11-1 (stale calls): a helper's call blocked by another hook never got a PostToolUse, so the launcher's readiness check stayed false; the fix closes such calls at PostToolBatch.
- 2026-10-11-2 and -3 (PreCompact): the hook blocks an automatic compaction and passes a manual one. The fix round records that Claude Code 2.1.296 reads a passing PreCompact hook's stdout as compaction instructions, so a pass prints nothing.
- 2026-10-13-1: `make check` ran 1116 tests green; `make readme` took 560 s.
- The Handover sections use "decide, owner:" lines, "Logged (reversible):" lines and "open by level:" lines.

## Limits
- Self-written charters, by builder agents and the owner's coordinators; they record what each agent reported, with test counts, but no independent verification.
- 14 of 58 charters were read in substance; the rest were searched, not read.

## Used in
- research/synthesis/tools-session.md
