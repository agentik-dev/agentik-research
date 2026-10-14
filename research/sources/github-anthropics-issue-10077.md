---
url: https://github.com/anthropics/claude-code/issues/10077
title: "[BUG] ## CRITICAL: Claude Code executed rm -rf deleting entire home directory"
author: a Claude Code user (issue reporter; handle not recorded)
published: 2025-10-21
accessed: 2026-10-14
kind: reported
---

## What it says
- Report on Claude Code 2.0.22 (Ubuntu on WSL2): the reporter says Claude Code ran a recursive delete that removed all user files in the home directory, including project directories and 13 or more tracked source files; only dotfiles such as `.cache`, `.config` and `.claude` remained. They say interrupting the command did not stop the deletion.
- The exact command is not captured: the conversation log held only tool output, and the evidence is a stream of `Permission denied` errors on system paths such as `/bin`, which the reporter reads as a delete started from the filesystem root.
- The reporter says they did not use `--dangerously-skip-permissions` and that the agent had permission for the project directory only.
- Labels: `bug`, `has repro`, `platform:linux`, `area:core`, `area:security`. No maintainer reply appears on the page; a bot closed it as not planned on 2026-02-08 after 60 days without activity and it was locked on 2026-02-23. Other users in the thread describe similar incidents, including one on macOS in December 2025 whose log showed an `rm -rf` of a project directory.

## Limits
- One user's account, not reproduced, with the triggering command unknown and the permission setting only partly stated. A closed-as-stale label is not evidence of a fix. It illustrates the class of incident that the critical-path check and the auto-mode blocklist now target (code-docs-permission-modes-guardrails), but does not show those checks would have stopped this one.

## Used in
- research/synthesis/field-7.md
