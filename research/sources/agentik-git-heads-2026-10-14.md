---
repo: agentik-dev
path: the git history of each repository, at its newest commit in the attached checkouts
commit: 89c69a8, 405d1e0, fabb212, eb7d642, 40fbe9e, e456f4b, 8a0a188
title: "The agentik-dev repositories' git histories, read on 2026-10-14"
author: agentik-dev
published: 2026-10-14
accessed: 2026-10-14
kind: our-use
---

## What it says
- Read with `git rev-list --count HEAD` and `git log --format='%h %ad %s' --date=iso` in each checkout on 2026-10-14. Commit counts at each newest commit: agentik-session 38 (89c69a8), agentik-relay 21 (405d1e0), agentik-decisions 11 (fabb212), agentik-respeak 10 (eb7d642), agentik-agents 10 (40fbe9e), agentik-commons 2 (e456f4b), and the organization's `.github` profile repo 6 (8a0a188).
- Every history starts on 2026-10-13. The newest commit in six of the seven is dated 2026-10-13; agentik-session's newest is dated 2026-10-14.
- Each of the five tool repos merged its `agentik-r1-<tool>` branch on 2026-10-13, within one minute: session f4304a1 at 18:41:44, decisions fabb212, respeak eb7d642 and agents 40fbe9e at 18:41:45, relay a166166 at 18:42:08 (commit times, UTC-7). The profile repo merged `agentik-r1-profile` (8a0a188) at 18:41:47.
- The commons repo holds no commit after e456f4b (17:21:17 the same day), whose message reads "tool branches merge in the switch, since the old marketplaces read the checkouts".

## Limits
- Git metadata only: it shows that the merges happened, not whether the switch's install, swap and verify steps (agentik-r1 §8.3) ran. No repo read records a run of the switch.
- A snapshot: the counts grow with each commit.

## Used in
- docs/tools/index.md
