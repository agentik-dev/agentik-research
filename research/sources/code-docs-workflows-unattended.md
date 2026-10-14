---
url: https://code.claude.com/docs/en/workflows
title: "Orchestrate subagents at scale with dynamic workflows"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "When an agent stalls and restarts", as of October 2026: an agent whose output stops arriving for long enough restarts from the same prompt automatically. The new attempt has no transcript of the stalled one; files it changed stay changed and its tokens stay in the run total. An agent restarts at most five times (six attempts); then the `agent()` call fails with a message such as `agent stalled on all 6 attempts`. Inside `parallel()` or `pipeline()` the run carries on with `null` for that agent; awaited directly, the run ends with the error. The window is `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS` (also covers subagents outside workflows) or `stallMs` per call; time spent waiting on the agent's own tool calls or a usage-limit reset does not count.
- Section "Behavior and limits": up to 16 concurrent agents by default (1 to 256 via `CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS`, v2.1.269 or later), up to 4,096 items in one `parallel()` or `pipeline()` call, and 1,000 agents total per run, a cap the page says "Prevents runaway loops". There is no mid-run user input.
- Section "Cost": a `Large workflow` warning shows when a run schedules more than 25 agents or its projected token total passes 1.5 million; it is advisory and does not pause or limit the run.
- In `claude -p` and the Agent SDK no approval prompt is shown: the Workflow tool call goes through normal permission evaluation, so an allow rule, auto mode, bypass, a hook or a host prompt tool is needed to let it start. The `ultracode` keyword does not start a workflow when it arrives in a `-p` prompt, a scheduled prompt or a relayed webhook payload.
- A workflow run does not pause for a usage limit in `-p`, the SDK, or a background session; the affected agent fails there. A run resumed after a stop replays completed agents from saved results; a failure in the middle of a fan-out re-runs the agents that started after it, even finished ones.
- Date and randomness calls throw inside the script so that a relaunched run repeats the same `agent()` calls.

## Limits
- Documentation of a feature; no failure rates. The stall window's own default (10 minutes) is on the env-vars page, not here.

## Used in
- research/synthesis/field-6.md
