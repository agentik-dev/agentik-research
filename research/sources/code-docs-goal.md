---
url: https://code.claude.com/docs/en/goal
title: "Keep Claude working toward a goal"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- `/goal` sets a completion condition; after each turn a small fast model checks whether it holds. If not met, Claude starts another turn. The goal clears when the condition is met, when the model judges it impossible, or when a turn fails on an error you must fix (authentication failure, exhausted credit balance, a context overflow auto-compaction could not clear, an unavailable model).
- To bound a goal, put a turn or time clause in the condition, such as "or stop after 20 turns"; Claude reports progress against it and the evaluator judges from the conversation. The condition can be up to 4,000 characters. The page names no built-in turn limit.
- If Claude answers the evaluator several turns in a row without tool use, Claude Code stops the loop and returns control with the goal still set.
- A rate limit or claude.ai usage limit pauses the goal ("Goal paused"); if the session is waiting for a limit reset, Claude resumes work then. After three automatic retries on a transient error the goal pauses.
- Background work defers evaluation. After 30 minutes of waiting a check-in is due, then 1 hour, then every 2 hours with the default; at most three idle check-ins per goal between your prompts (v2.1.246 or later; earlier uncapped). `CLAUDE_CODE_GOAL_CHECKIN_MINUTES=0` turns check-ins and automatic retries off.
- Evaluation tokens are billed on the small fast model and are "typically negligible compared to main-turn spend." Resuming a session restores an active goal with its turn count, timer and token baseline reset.

## Limits
- Vendor documentation, as of October 2026. No measurement of evaluator accuracy or cost.

## Used in
- research/synthesis/field-4.md
