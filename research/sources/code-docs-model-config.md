---
url: https://code.claude.com/docs/en/model-config
title: "Model configuration"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Extended context (1M)", as of October 2026: Fable 5.1, Fable 5, Sonnet 5 and later, Haiku 5.5, Opus 4.6 and later, and Sonnet 4.6 can use a 1M window. Fable models, Sonnet 5 and later, Haiku 5.5 and Opus 4.7 and later run at 1M by default. Opus 4.6 and Sonnet 4.6 reach 1M only through the `[1m]` variants (for example `/model opus[1m]`).
- Plans: Opus 4.6 at 1M is included with Max, Team and Enterprise and needs usage credits on Pro; Sonnet 4.6 at 1M needs usage credits on every subscription plan including Max; the API and pay-as-you-go have full access.
- Pricing: on the API the 1M window uses standard pricing with no premium above 200K tokens, except Haiku 5.5 above 100K tokens.
- `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` removes the `[1m]` variants and treats native-1M models as 200K.
- Section "Default auto-compact thresholds": native-1M models compact at about 967K tokens by default; Sonnet 4.6 and Opus 4.6 without extended context compact at the 200K boundary. Section "Set the auto-compact window": the window can be set from 100K to 1M tokens (`/autocompact 500k`, the `autoCompactWindow` setting, a launch flag, or `CLAUDE_CODE_AUTO_COMPACT_WINDOW`).

## Limits
- I read the first 100,000 of 116,643 characters of the page; the extended-context and auto-compact sections were inside that part.
- Volatile; as of October 2026. The page does not say whether quality at 967K tokens matches quality at 200K; it states only the thresholds.

## Used in
- research/synthesis/field-1.md

## Also (question 4)
Re-read on 2026-10-14 for usage limits and fallback. As of October 2026.
- Section on Fable usage: depending on plan and seat tier, Fable usage can bill to usage credits instead of the plan's included limits (the `/model` picker shows "Requires usage credits"). In interactive sessions a consent prompt precedes a Fable request that bills credits. "In non-interactive mode with the `-p` flag, and in an Agent SDK application that doesn't show the prompt, Claude Code never asks for consent." There Claude Code bills it without asking. In Remote Control, background sessions and agent-team teammates the prompt is held for five minutes by default (`dialogExpiry`), then the turn ends without sending the request.
- The page does not mention a separate weekly limit for Fable; the Help Center page (support-claude-pro-max-usage) does, for Max plans.
- Fallback chains: `--fallback-model` or `fallbackModel` lists up to three models tried when the primary model is overloaded or unavailable; authentication, billing, rate-limit, request-size and transport errors never trigger a switch; the switch lasts one turn; subagents use the chain.
- Used in (question 4): research/synthesis/field-4.md
