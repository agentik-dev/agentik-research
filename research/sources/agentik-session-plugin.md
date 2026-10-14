---
repo: agentik-dev/agentik-session
path: plugin/
commit: e7f0723
title: "plugin/: the skill, commands, hooks and shim"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- Opened: plugin/skills/session/SKILL.md, plugin/hooks/hooks.json, plugin/hooks/run and plugin/commands/checkpoint.md. Listed but not opened: the other five commands, skills/read/SKILL.md, scripts/record, hooks/session.ts and the two TypeScript test files.
- hooks.json registers nine events, each a call to one shim: SessionStart (10 s timeout), PreToolUse on every tool (5 s), PostToolUse on every tool (5 s), PostToolUseFailure (5 s), PostToolBatch (5 s), UserPromptSubmit (5 s), Stop (5 s), SessionEnd (15 s) and PreCompact (5 s), plus a `modules` entry for the band (plugin/hooks/hooks.json:1-32).
- What runs on every turn or tool call: the PostToolUse meter; UserPromptSubmit's budget line and checkpoint nudge; PreToolUse's stamps and the spawn gate on Agent, Task and Workflow only; Stop's turn-end stamp. SessionStart prints one line with the profile, ceilings, window, checkpoint threshold, the resolved-file path, and a priority-and-pacing block (hooks.py:287-330).
- The shim (plugin/hooks/run:1-14) exits 0 silently when `claude-session` is not on PATH, and drops the CLI's exit code for Stop, PostToolUseFailure, PostToolBatch and PreCompact. The reason given: Stop's exit 2 would hold every turn end; an older CLI refuses newer events with exit 2; PreCompact keeps the tool's stdout (its block) but never its exit, because an older CLI's exit 2 "would block every compaction, the owner's typed /compact too".
- SKILL.md tells the model: the two ceilings; the zone table; "act on" the CHECKPOINT and EXIT lines and "do not argue with them"; when a PreToolUse hook blocks a spawn for a budget reason, do not retry or work around it; the charter's five parts and 4,096-byte cap; the close order (close, commit the charter, then `checkpoint --respawn`).
- The `checkpoint` command is `!` -prefixed shell injection of `claude-session checkpoint $ARGUMENTS`. It explains that a RESPAWN close is not marked by the command, because only a main-thread Bash call confirms it.

## Limits
- The skill text is instruction to a model; whether the model follows it is not in this file. Evidence of non-compliance is in NICE_TO_HAVE (a sitting that wrote RESPAWN and never ran the verb).

## Used in
- research/synthesis/tools-session.md
