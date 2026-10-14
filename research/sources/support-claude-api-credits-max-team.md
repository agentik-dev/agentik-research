---
url: https://support.claude.com/en/articles/17154008
title: "Monthly API credits for Max and Team plans"
author: Anthropic (Claude Help Center)
published: undated (page marked "Updated this week" when read in October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026 the same amounts as anthropic-api-credits-subscribers: Max 5x 100 US dollars, Max 20x 200, Team 20 per Standard seat and 100 per Premium seat, pooled up to 500 dollars; Free, Pro and Enterprise not eligible. The page says the rollout is staggered over several days.
- Coverage (section "What the credits cover"): the Claude API (Messages and Batches), the Console Playground, Claude Managed Agents and the Claude Agent SDK. Not covered: interactive Claude Code (terminal, IDE, desktop, web), extra usage in Claude, Claude Code or Cowork, and Claude on Bedrock, Vertex or Foundry.
- Caveat on `claude -p` (from the fetch tool's extract of the page): it is covered only when run with an API key from the linked organization; runs signed in with a Claude plan, or started through the Claude Code GitHub Action, an IDE extension or the desktop app, are not covered.
- Credits are used before purchased credits; when they run out, API requests stop unless the organization has purchased credits or auto-reload; usage is never charged to the Claude plan.

## Limits
- I read an extract of the page, not its layout, and the page carries no calendar date. The `claude -p` caveat is the extract's wording.

## Used in
- research/synthesis/field-10.md
