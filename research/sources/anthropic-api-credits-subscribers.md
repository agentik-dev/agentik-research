---
url: https://platform.claude.com/docs/en/about-claude/api-credits-for-subscribers
title: "API credits for Max and Team plans"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "At a glance", as of October 2026: Max 5x, Max 20x and Team plans (including discounted Team plans) include monthly credits for the Claude API: 100 US dollars (Max 5x), 200 dollars (Max 20x), and on Team 20 dollars per Standard seat and 100 dollars per Premium seat, pooled and capped at 500 dollars. Free, Pro and Enterprise plans are not eligible; new subscribers can claim after 7 days.
- Coverage table: the credits cover the Claude API, Claude Managed Agents, the Claude Agent SDK and the playground. They do not cover Claude Code or extra usage in the Claude apps, nor Claude Platform on AWS, Bedrock, Google Cloud or Foundry. The page says the credits do not change usage limits in Claude or Claude Code.
- Credits are claimed by linking one Console organization to the plan (one plan per organization); every API key and workspace in that organization draws on one balance. Unused credits expire at the end of each billing cycle with no rollover. When the balance is exhausted and no purchased credits remain, API requests stop; "Usage is never charged to your Claude plan." (section "When credits run out").
- If an organization holds only these credits and sends a request they do not cover, such as a Claude Code session, Claude Code shows `Credit balance too low`.

## Limits
- Vendor documentation, as of October 2026. It does not say how long the program lasts. The Help Center version (support-claude-api-credits-max-team) adds a statement about `claude -p`.

## Used in
- research/synthesis/field-10.md
