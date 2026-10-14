---
url: https://code.claude.com/docs/en/agents
title: "Run agents in parallel"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
All as of October 2026.
- Five ways to work on several tasks at once: subagents (a side task in its own context that returns a summary), agent view (dispatch and monitor background sessions; research preview), agent teams (coordinated sessions with a task list; experimental), projects (public beta), and dynamic workflows (a script that runs many subagents and cross-checks results).
- Choose by three questions. Who coordinates: Claude inside one conversation (subagents), you (agent view), a lead agent (teams), or a script (workflows). Do workers need to talk: subagents report only to the session that spawned them; agent view sessions report only to the user; teammates message each other. Do tasks touch the same files: isolate with worktrees; agent teams do not isolate teammates in worktrees, so partition files by teammate.
- `/batch` splits one large change into 5 to 30 worktree-isolated subagents; the page calls it a packaged use of subagents and worktrees, not a separate coordination style.
- A note warns that running several sessions or subagents at once multiplies token usage.

## Limits
- A product comparison page; no measurement. Several of the features it lists are research previews or experimental.

## Used in
- research/synthesis/field-5.md
