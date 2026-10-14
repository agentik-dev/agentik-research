---
url: https://code.claude.com/docs/en/tools-reference
title: "Tools reference (sections: Timeout and output limits, Background commands, ScheduleWakeup)"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026; the background time limit cites v2.1.285 and v2.1.288)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Timeout and output limits", as of October 2026: Claude passes a per-call `timeout` when it wants longer than the default. `BASH_DEFAULT_TIMEOUT_MS` is the default when Claude passes none, "two minutes out of the box" (the env-vars page gives 120000 ms). `BASH_MAX_TIMEOUT_MS` sets the ceiling, "ten minutes out of the box" (600000 ms); the effective ceiling is the larger of the two variables.
- A foreground command that reaches its timeout is moved to the background, not stopped, unless the command starts with `sleep`. The result says `Command did not complete within its 120s timeout and was moved to the background`. With `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` or in bare mode, it stops instead.
- Section "Time limit for background commands": in unattended sessions (`-p`, Agent SDK, CI, cloud) a background command gets 30 minutes, or the `timeout` Claude passes, up to a maximum of 2 hours; a `-p` run whose prompt is passed as text gets 10 minutes by default. A local terminal, desktop or VS Code session has no limit. Applies from v2.1.285; before v2.1.288 it applied in every session.
- Output limits: a valid result arrives inline up to roughly 30,000 characters by default (file path plus a 2,000-character preview beyond that); a failure arrives inline up to roughly 10,000 characters. A command whose output passes 5 GB is killed.
- `ScheduleWakeup`: reschedules a self-paced `/loop` "between one minute and one hour out"; `stop: true` (v2.1.202 or later) cancels it; the pending wakeup appears in `session_crons` in Stop hook input.

## Limits
- As of October 2026. The page documents the Bash tool's per-call timeout, not the shell's wall-clock use across a whole turn.

## Used in
- research/synthesis/field-4.md
