---
repo: agentik-dev/agentik-session
path: OPEN-QUESTIONS.md
commit: e7f0723
title: "Decisions for the owner"
author: agentik-dev
published: 2026-10-12
accessed: 2026-10-14
kind: our-use
---

## What it says
- Nothing is open at this commit; four questions are answered (OPEN-QUESTIONS.md:5-12).
- Q1 (2026-10-10): should a sitting that reaches its checkpoint start its own successor? Answer: yes, the successor starts itself. This produced the respawn design and the launcher.
- Q2 (2026-10-12): should the weekly allowance hold back the five-hour target? Answer: the five-hour target comes first; helpers run to 97% of every window whatever the week shows, because the owner moves to a second account when the week runs out. The admission design dropped the weekly hold-back and kept only a refusal near the weekly limit.
- Q3 (2026-10-12): a small JavaScript mod with the rules in Python.
- Q4 (2026-10-12): when a night and a sitting want the same room, neither waits; whoever starts first takes it. The owner's words, quoted by the file, were that there was too much focus on night and day times.

## Limits
- One owner's decisions, recorded as answered in an observer session; no rationale beyond the stated one.

## Used in
- research/synthesis/tools-session.md
