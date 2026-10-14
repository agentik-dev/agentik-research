---
repo: agentik-dev
path: the git history of each repository, at its newest commit in the attached checkouts
commit: e8477a7, 405d1e0, 569a120, c83e9b8, f986500, 588530f, 8a0a188
title: "The agentik-dev repositories' git histories, read on 2026-10-14"
author: agentik-dev
published: 2026-10-14
accessed: 2026-10-14
kind: our-use
---

## What it says
- Re-read at the heads of 2026-10-14's second session (the pin in `research/synthesis/fixer-brief.md`), with `git rev-list --count HEAD`, `git log --format='%h %ad %s' --date=iso` and `git log --merges` in each checkout. The first reading, earlier that day, was at session 89c69a8, decisions fabb212, respeak eb7d642, agents 40fbe9e and commons e456f4b; relay 405d1e0 and the profile 8a0a188 have not moved since.
- Commit counts at each head: agentik-session 63 (e8477a7), agentik-decisions 23 (569a120), agentik-respeak 27 (c83e9b8), agentik-agents 22 (f986500), agentik-relay 21 (405d1e0), agentik-commons 9 (588530f), and the organization's `.github` profile repo 6 (8a0a188). The range is 6 to 63.
- Every history starts on 2026-10-13. The newest commit is dated 2026-10-14 in five of the seven: session (e8477a7, 11:06:21), decisions (569a120, 09:53:32), respeak (c83e9b8, 10:34:00), agents (f986500, 09:57:26) and commons (588530f, 09:53:53). The newest in relay (405d1e0, 19:18:20) and in the profile repo (8a0a188, 18:41:47) is dated 2026-10-13. Times are commit times, UTC-7.
- Commits dated 2026-10-14, by `git log --format='%ad' --date=short`: session 41, respeak 17, decisions 12, agents 12, commons 7, relay 0, profile 0.
- Each of the five tool repos merged its `agentik-r1-<tool>` branch on 2026-10-13, within one minute: session f4304a1 at 18:41:44, decisions fabb212, respeak eb7d642 and agents 40fbe9e at 18:41:45, relay a166166 at 18:42:08. The profile repo merged `agentik-r1-profile` (8a0a188) at 18:41:47.
- On 2026-10-14 five repos merged a branch titled `rf1-research-fixes`, each titled "the research site's findings": decisions 569a120 at 09:53:32, commons 588530f at 09:53:53, session 86ac60a at 09:55:41, agents f986500 at 09:57:26 and respeak 66531f7 at 09:57:51. Relay and the profile repo hold no such merge.
- At e456f4b (2026-10-13 17:21:17) the commons message read "tool branches merge in the switch, since the old marketplaces read the checkouts". Commons holds seven commits after it, all dated 2026-10-14, up to the merge 588530f.

## Limits
- Git metadata only: it shows that the merges happened, not whether the switch's install, swap and verify steps (agentik-r1 §8.3) ran. The commons record's own status of 2026-10-14 says the switch landed (see agentik-commons-head-2026-10-14); git shows no run.
- A snapshot: the counts grow with each commit.

## Used in
- docs/tools/index.md
