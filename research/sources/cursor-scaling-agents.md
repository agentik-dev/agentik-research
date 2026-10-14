---
url: https://cursor.com/blog/scaling-agents
title: "Scaling long-running autonomous coding"
author: Wilson Lin (Cursor)
published: 2026-01-14
accessed: 2026-10-14
kind: reported
---

## What it says
- First attempt: agents of equal standing coordinated through a shared file and claimed tasks behind a lock. Locks were held too long or never released and became a bottleneck: twenty agents ran at about the throughput of two or three, with most time spent waiting. Agents could also fail while holding a lock, re-acquire a lock they held, or edit the file without locking.
- Second attempt: optimistic concurrency (reads free, a write fails if state changed since the last read). It was simpler and more robust, but without hierarchy the agents became risk-averse, avoided hard tasks and made small safe changes, so work churned without progress.
- Current design: planners explore the codebase and create tasks (and can spawn sub-planners), workers take one task and push without coordinating with other workers, and a judge agent decides at the end of each cycle whether to continue, with the next cycle starting fresh.
- Reported results: a browser built in close to a week, over 1 million lines in about 1,000 files with hundreds of concurrent workers; a three-week migration with 266 thousand lines added and 193 thousand removed that passed CI and early checks but still needs careful review; a video-rendering rewrite 25 times faster, merged.
- Lessons: removing coordination layers helped; an integrator role for conflict resolution created more bottlenecks than it removed. The right amount of structure sits between too little (conflicts, duplicated work, drift) and too much (fragility). The author writes "The harness and models matter, but the prompts matter more." Agents sometimes ran far too long, and periodic fresh starts were still needed against drift and tunnel vision.
- Model notes: GPT-5.2 stayed focused on long autonomous work better than Opus 4.5, which tended to stop early and take shortcuts (as of January 2026). Cursor assigns models by role.

## Limits
- A vendor's account of its own product, with no controlled comparison against fewer agents or against a single agent. Model comparisons are the author's impressions and date from January 2026.

## Used in
- research/synthesis/field-5.md
