---
url: https://code.claude.com/docs/en/costs
title: "Manage costs effectively"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Reduce token usage": token costs scale with context size. Tips: /clear between unrelated tasks ("Stale context wastes tokens on every subsequent message"); custom compaction instructions; keep CLAUDE.md under 200 lines and move workflow-specific instructions into skills, which load only when invoked; prefer command-line tools to MCP servers; use hooks to filter output, for example reducing a 10,000-line log to the matching lines; delegate verbose operations to subagents.
- Section "Why usage climbs in a long session": Claude Code sends the whole conversation with every request, and each tool use sends another request carrying the tool results; with caching that history is read at the cached rate, so a one-line question late in a long session still draws on the whole conversation. The first message after a pause longer than the cache lifetime misses the cache. Lifetime as of October 2026: one hour on a subscription, five minutes by default on an API key or when drawing on usage credits. `/compact` is itself a large request because it reads the whole conversation; `/clear` costs nothing.
- Reported averages as of October 2026: around 13 US dollars per developer per active day, 150 to 250 dollars per developer per month, below 30 dollars per active day for 90 percent of users.
- Agent teams use about 7 times the tokens of a standard session when teammates run in plan mode, because each runs its own window.
- Section "Understanding changes in Claude Code behavior": cost reporting changes across versions (examples cite v2.1.211 and later).

## Limits
- The page is about cost and usage limits; it measures no quality loss. The 7x and enterprise averages are Anthropic's figures with no method given.

## Used in
- research/synthesis/field-1.md

## Also (question 4)
Re-read in full for question 4 on 2026-10-14. All as of October 2026 unless a version is named.
- Section "Why usage climbs in a long session" lists the causes: the whole conversation is sent with every request, and each tool use sends another request with the results; a first message after a break longer than the cache lifetime misses the cache (one hour on a subscription, five minutes once drawing on usage credits, five minutes by default on an API key or a cloud provider; `promptCacheTtl` keeps the hour on credits); a scheduled task fires on its interval even while the session is idle and sends the full context each time; a message from another session starts a new turn when this one is idle (`crossSessionInbound` set to `hold` stops it); goal check-ins start new turns on an idle session (at most three idle check-ins per goal from v2.1.246, earlier uncapped; `CLAUDE_CODE_GOAL_CHECKIN_MINUTES=0` turns them off); every subagent and workflow agent sends its own requests; each active teammate keeps consuming tokens; `/compact` is itself a large request while `/clear` costs nothing.
- The `/usage` Session block carries a `Prompt cache (main)` line from v2.1.251: request count, share of input tokens served from cache, misses (with a likely cause from v2.1.260), expected rebuilds after compaction or tool-result clearing, and whether the cache is warm with its TTL and the idle time when cold. It covers the main conversation only, not subagents. The plan-usage breakdown flags behaviours such as long context or cache misses when one accounts for 10% or more of recent usage, and lists the heaviest `/loop` tasks (v2.1.242).
- Plan windows: on Teams and Enterprise each member's Claude Code usage draws from a per-seat allowance "that resets on a rolling five-hour window and a weekly window", shared with chat and Cowork. "You've hit your session limit" and "weekly limit" are seat-based windows shared across all models; after an Opus or Sonnet limit message, switching to a model outside that family keeps the developer working. Waiting and continuing automatically needs v2.1.234, and the managed setting `autoContinueAtUsageLimit` controls whether Claude Code starts the wait on its own.
- Background use: summarisation for `--resume` and some commands use "typically under $0.04 per session" while idle; prompt suggestions reuse the cache and are mostly cache reads.
- Rate-limit recommendations for API organisations, tokens per minute per user: 1 to 5 users 200k to 300k; 5 to 20 users 100k to 150k; 20 to 50 users 50k to 75k; 50 to 100 users 25k to 35k; 100 to 500 users 15k to 20k; 500+ users 10k to 15k. The limits apply at organisation level.
- The `/usage` dollar figure is computed locally from token counts at list price; for a response billed at the 1.1x data-residency rate Claude Code multiplies it by 1.1, and the multiplied figure counts toward `--max-budget-usd`. Since v2.1.211 the totals reset on `/clear`.
- Used in (question 4): research/synthesis/field-4.md

## Also (question 5)
- Section "Agent team token costs": usage scales with the number of active teammates and how long each runs; the page advises Sonnet for teammates, small teams, focused spawn prompts, and shutting teammates down when done, because each active teammate keeps consuming tokens. Token use is roughly proportional to team size.
- Section "Delegate verbose operations to subagents": the verbose output stays in the subagent's context and only a summary returns, but the subagent's own requests still draw on usage; a smaller model for simple subagents cuts the cost.
- Section "Why usage climbs in a long session": every subagent, and every agent a dynamic workflow spawns, sends its own requests on top of the main conversation's, and `/usage` attributes a share to subagents. The cache hit line in `/usage` covers the main conversation only, not subagents.
- Limits: the 7 times figure has no method on the page (the existing note says so). Used in: research/synthesis/field-5.md
