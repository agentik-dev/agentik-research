---
url: https://www.buildthisnow.com/blog/guide/development/claude-code-max-plan-vs-api
title: "Claude Code Max Plan vs API Cost"
author: speedy_devv (handle; real name not given)
published: 2026-06-15
accessed: 2026-10-14
kind: reported
---

## What it says
- Break-even arithmetic from list prices, labelled by the author as illustrative and not measured: Pro (20 US dollars a month) breaks even at about 0.67 dollars a day of API-equivalent use, Max 5x (100 dollars) at about 3.33 dollars a day and Max 20x (200 dollars) at about 6.67 dollars a day. An uncached session of 100K input and 20K output tokens costs about 0.20 (Haiku 4.5), 0.60 (Sonnet 4.6), 1.00 (Opus 4.8) or 2.00 dollars (Fable 5); with 90K of the input read from cache on Sonnet 4.6 it costs 0.357 dollars per turn, about 40 percent less.
- It states that since 2026-06-15 non-interactive use (Agent SDK, `claude -p`, GitHub Actions) draws from a separate monthly credit pool of 20, 100 and 200 dollars (Pro, Max 5x, Max 20x). That conflicts with Anthropic's help article (support-claude-agent-sdk-plan), which says the 2026-06-15 change was paused.
- It says Anthropic publishes no exact limit numbers and that a plan's value stops rising once rate limits bind.

## Limits
- The page contains no measurement and no tool output; prices are of mid-2026 models. Reported, and where it disagrees with Anthropic's own page about the SDK credit, the Anthropic page governs as of October 2026.

## Used in
- research/synthesis/field-10.md
