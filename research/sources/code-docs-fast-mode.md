---
url: https://code.claude.com/docs/en/fast-mode
title: "Speed up responses with fast mode"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026 fast mode is a research-preview configuration of Claude Opus that is up to 2.5 times faster at a higher price per token, with identical quality. Supported on Opus 5.5, Opus 5 and Opus 4.8; not on Sonnet, Haiku or other models. Prices per million input and output tokens: 8 / 40 US dollars on Opus 5.5 and 10 / 50 dollars on Opus 5 and Opus 4.8, flat across the 1M window.
- Section "Understand the cost tradeoff": the first time fast mode is turned on in a conversation, the whole context is charged at the fast-mode uncached input price, so turn it on at the start of a session; the charge applies once per conversation.
- Billing by login: on Pro, Max, Team and Enterprise subscriptions fast mode "is available via usage credits only and not included in the subscription rate limits" (page bullet), and draws on credits even when plan usage remains; on the Console it bills per token with the rest of API usage and appears under "Speed (Research Preview)" in the Usage and Cost pages. Team and Enterprise owners must enable it first.
- Fast mode is not available on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry or Claude Platform on AWS. The availability check calls `api.anthropic.com` directly and does not follow `ANTHROPIC_BASE_URL`; behind a gateway that blocks direct egress, `/fast` reports a connectivity error (workarounds: `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS=1`, `CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK=1`).
- The page advises standard mode for long autonomous tasks, batch processing, CI and cost-sensitive work. In a `-p` run `/fast` works only when launched with fast mode in `--settings` (v2.1.205 or later). The pricing page (platform.claude.com, read 2026-10-14) adds that fast mode is not available with the Batch API.

## Limits
- Vendor documentation, as of October 2026; research preview, so price and availability may change.

## Used in
- research/synthesis/field-10.md
