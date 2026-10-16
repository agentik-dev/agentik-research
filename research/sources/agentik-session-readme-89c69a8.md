---
repo: agentik-dev/agentik-session
path: README.md, and the git history
commit: 89c69a8
title: "agentik-session (the repository README), and its git history, at commit 89c69a8"
author: agentik-dev
published: 2026-10-14
accessed: 2026-10-14
kind: our-use
---

## What it says
- The README's status line reads "Status: version `v2.0.0-alpha.14`, rendered `2026-10-13`, `1186` tests in the suite." (README.md:171). At commit e7f0723 the same line counted `1116` tests.
- The README names the command line tool `agentik-session` (README.md:5) and writes its commands as `agentik session <verb>`, for example `agentik session doctor` (README.md:20, 48) and `agentik session charter close --exit "<text>"` (README.md:133). At commit e7f0723 the same lines (README.md:5, 20, 48, 133) wrote the tool's older name.
- The history, read with `git rev-list --count 89c69a8` and `git log --reverse --format='%h %ad' --date=short` in the checkout on 2026-10-14, holds 38 commits, from 059c33f (2026-10-13, "agentik-session: the first public commit") to 89c69a8 (2026-10-14). At commit e7f0723 it held three, all dated 2026-10-13.
- The rename landed in the agentik-r1-session commits of 2026-10-13, after e7f0723: act 3 (6fff8b5, "the tool is agentik-session") and act 5 (975c508, "README, its source and RUNBOOK use the new names").

## Limits
- A snapshot: the test count and the commit count grow with each commit. The README's version and render date did not change between e7f0723 and 89c69a8.
- The test count is the README's own statement; this note did not run the suite.

## Used in
- docs/tools/session.md
