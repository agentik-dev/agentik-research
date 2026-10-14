---
repo: agentik-dev/agentik-session
path: bugs/2026-09-12-overnight-window.md
commit: e7f0723
title: "Bug report: the 2026-09-12 overnight window (budget reads, hooks, and the scheduled resume)"
author: agentik-dev
published: 2026-09-12
accessed: 2026-10-14
kind: our-use
---

## What it says
- Filed 2026-09-12 by a coordinator session of a private product, against Claude Code 2.1.269 and the first design of the tool (a statusline-sampled budget plus a scheduler that resumed a session when the usage window reset). Times are PDT. The owner disabled the tool at about 04:50 that morning.
- Defect 1, measured: a scheduled `claude -p` resume completed while four background builders were still working. The handoff is the run's structured final output, and emitting it completes the process, which kills every background agent. The run lasted 39 minutes of a 270 minute timeout. `result.json` read `terminal_reason = completed`, `subtype = success`, `is_error = False`, `num_turns = 104`, `stop_reason = tool_use`, `total_cost_usd = 69.34`. Each of four worktree branches held one or two commits and 55 to 138 lines of uncommitted diff.
- Defect 2, measured: usage samples came only from statusline renders. The session went idle at 23:29 with the window at 95 to 98 percent; the window rolled at 00:10; the next prompt, about 04:27, got no usage line and `budget` reported "no usage sample for a current window" while the account panel read 32 percent. The coordinator treated the budget as unreadable and deferred launching agents by 40 minutes.
- Defect 3: the schedule forked rather than resumed (`--fork-session`), so the parent never saw the fork's work and the fork queued its own follow-up that would have forked beside a live parent. The hook text said "resumes this exact session".
- Defect 4: a `SessionStart` notice on 2026-09-11 announced a run that had finished on 2026-09-08 as if just finished.
- Not bugs: reserve readings of 97 to 98 percent at 23:04 matched the samples on disk, so the first sitting's stop was the tool working as configured.

## Limits
- One coordinator session, one night, one author-owner. Cost, turn and diff figures are the report's own, read from the run's state files; no independent check.
- The report is of the first design, which the repo later retired (see agentik-session-design-overhaul).

## Used in
- research/synthesis/tools-session.md
