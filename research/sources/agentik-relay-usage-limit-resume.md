---
repo: agentik-dev/agentik-relay
path: design/usage-limit-resume-r1.md
commit: a326550
title: "agentik-relay design: the usage limit pauses the night (r1)"
author: agentik-dev
published: 2026-10-10
accessed: 2026-10-14
kind: our-use
---

Read sections 1, 2, 6, 7 and 8 (the problem, the decision, the open risks, choices for the refuter and the owner). Sections 3 to 5 were not read.

## What it says
- The owner's request (quoted by the design from an observer session note): sessions and relay runs should resume by themselves after a usage limit (the 5-hour window) instead of stopping.
- Problem evidence: before this design, a refused `rate_limit_event` killed the child, no gate ran, every other running row was killed, and the night ended `stopped:usage-limit` with every row skipped. The ledger held five such stops: two weekly limits and three limits on one named model with no reset time. One of the model-limit rows was refused at turn 1 at $0, 9 h 43 m after the previous one.
- The CLI's own records: grepping the CLI's local transcript files (96 files including subagents, CLI versions 2.1.263 to 2.1.296, on 2026-10-10) found three kinds of limit message: session (35 hits, `five_hour`), weekly (35 hits, `seven_day`) and model-specific (46 hits, no quota field). The 5-hour window, the owner's case, had 35 hits in the CLI transcripts and none in the relay's ledger.
- Decision: a window limit pauses the night until the reset plus 2 minutes; a model limit with a reset pauses only that model's rows; an unknown limit waits 30 minutes (source `fallback`) and the wake's sitting is the probe; a weekly limit stops at once; at most 12 pauses; with no `--until`, a wake over 6 hours away stops the night. Each paused row keeps its worktree and lock and gets a continuation under a fresh session id with the budget its earlier parts left (never under 10 turns and $5). A fresh session was chosen over `claude --resume` because the cache is cold and one row sat at 206k context.
- Open risks: all 46 measured model-limit texts named no reset; a held lock blocks the owner's own `gate`, `plan`, `run` and `resume` for up to 6 hours; a sleeping laptop wakes the night late; "the stream's fields are the CLI's", unpublished; a sibling killed mid-commit may leave `index.lock`, observed not reproduced.
- Owner choices recorded: a second model as an opt-in fallback; a 6 h cap with no `--until`.

## Limits
- The reset-time forms were measured only in the CLI's transcripts on one machine and one timezone; the reset text parsing reads only those forms. The stream fields are undocumented, by the design's own admission.
- Row names and the owner's timezone are not repeated here.

## Used in
- research/synthesis/tools-relay.md

## Also (journal-usage-window)
Re-read at commit 405d1e0 (the front matter above keeps the earlier commit); sections 3 to 5 and the rest are now read, 108 lines in all.
- Section 5 (lines 73-82) cuts the work into six packets: the facts, the machines, the pause, the wake, the guards, the readers. Section 4 (lines 63-71) lists five test groups, all on a fake spawner and a stepped clock; line 65 says no probe ran. Built and not built at this commit are in agentik-relay-usage-pause-built.
- The design has no proactive pacing: it acts on a refused event or an `is_error` result. The words `band` and `pacing` do not occur in it.
- Line 53 proposes an amendment (entry 23) to a ledger outside this repo, which the design says it does not edit; this repo's `DECISIONS.md:41` carries the model-scope part as entry 12.

Used in: research/synthesis/journal-usage-window.md
