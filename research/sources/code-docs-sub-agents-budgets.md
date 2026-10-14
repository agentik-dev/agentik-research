---
url: https://code.claude.com/docs/en/sub-agents
title: "Subagents (usage, cache TTL, forks, limits)"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- A subagent "sends its own requests, which count toward the same usage limits as your main conversation" (page text as read, section on how subagents work). The costs page adds that a subagent's requests still draw on your usage.
- Section "API errors in subagents": a background subagent that ends on an API error such as a usage limit is marked failed, and the message Claude receives names the error and includes the subagent's last output so partial work is not lost. A foreground subagent returns partial output with a note. You can ask Claude to retry or resume it once the error clears.
- Prompt cache: frontmatter `experimental.cacheTtl` (`5m` or `1h`, v2.1.248 or later) sets one subagent's TTL; Claude Code ignores `1h` while the subscription is using usage credits. A fork inherits the parent's system prompt, tools, model and history, so it reuses the parent's cache; a fresh subagent does not.
- Limits: subagents nest up to three layers by default (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`); 20 running subagents is the default concurrency cap (`CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`, v2.1.217 or later); there is no cap on the total spawned over a session. Frontmatter `maxTurns` stops a subagent and returns its output marked partial.
- Cost advice: route work to cheaper models such as Haiku; many subagents returning detailed results consume context, and each spends tokens of its own.

## Limits
- I read the first 100,000 of 108,817 characters. As of October 2026. The page names no spend cap for subagents; the CLI reference says `--max-budget-usd` counts subagent spend.

## Used in
- research/synthesis/field-4.md

## Also (question 10)
Re-read on 2026-10-14 for model routing and permissions. As of October 2026. I read the first 100,000 of 108,488 characters.
- Section "Choose a model": the subagent `model` field takes an alias (`sonnet`, `opus`, `haiku`, `fable`), a full model id or `inherit`. Precedence from v2.1.251: the Agent tool's per-call `model`, the definition's frontmatter `model`, `CLAUDE_CODE_SUBAGENT_MODEL`, then the main conversation's model. `CLAUDE_CODE_SUBAGENT_MODEL_FORCE=1` (v2.1.257 or later) applies one model to every subagent. Built-in defaults: Explore and Plan follow the main model (Explore runs on Opus when the main model is Fable under a subscription, Console or gateway), the general-purpose agent follows `CLAUDE_CODE_SUBAGENT_MODEL` if set, the statusline-setup agent runs on Sonnet and the guide agent on Haiku.
- Cost guidance on the page: route tasks to faster, lower-cost models such as Haiku; its example sets `model: haiku` on a custom Explore agent; subagent requests count toward the same usage limits as the main conversation.
- Section "Permissions in subagents": subagents inherit the parent's permission rules; in `dontAsk` mode prompts are auto-denied and explicitly allowed tools still work; foreground subagents pass prompts to the user; background subagents surface them in the main session. The page, as I read it, does not say what a subagent returns or how much it spends after a tool call is denied. Only the final report returns to the main conversation.
- Used in (question 10): research/synthesis/field-10.md
