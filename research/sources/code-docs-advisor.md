---
url: https://code.claude.com/docs/en/advisor
title: "Escalate hard decisions with the advisor tool"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026 the advisor tool is marked experimental. It runs server-side on Anthropic's infrastructure, needs the Anthropic API, and is not available on Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform or Microsoft Foundry. Behind an `ANTHROPIC_BASE_URL` gateway it works only if the gateway forwards the request intact to Anthropic.
- Section "Cost": each advisor call reads the whole conversation and bills at the advisor model's rates on top of the main model. API billing pays the advisor's input and output rates; on subscription plans advisor usage counts toward plan limits, except a Fable advisor, which bills to usage credits on plans where Fable does. The page says pairing a faster main model with a stronger advisor "typically costs less" than running the stronger model throughout (paraphrase of the sentence; no figure on this page).
- Section "Choose an advisor model": the advisor must rank at or above the main model. Examples: Sonnet 5.5 main accepts Fable, Opus 5 or later, or Sonnet 5.5; Haiku 5.5 or Sonnet 5 main accepts Fable, Opus 4.7 or later, Sonnet 5 or later, Haiku 5.5; Haiku 4.5 can call but cannot act as an advisor. Section "Common model pairings" lists Sonnet main with Opus advisor, Haiku main with Opus advisor ("lowest-cost main model with strong planning", more than Haiku alone, less than Sonnet or Opus as main).
- Claude decides when to call the advisor; there is no setting to cap or force calls. Enabling or disabling it mid-session does not invalidate the main model's prompt cache, but the advisor's own read of the transcript is not cached.
- Section "Compare with related features": the advisor runs at decision points; `opusplan` runs Opus in plan mode then Sonnet; a subagent with `model` set runs the stronger model for a whole subtask; `/model` switches from the next request on.

## Limits
- Vendor documentation, as of October 2026. This page gives no measured saving; the measurements are on claude-blog-advisor-strategy and anthropic-optimizing-cost-intelligence.

## Used in
- Read for question 10 and kept for the site pages on cost lanes; research/synthesis/field-10.md does not cite it (the synthesis has a 9,000-byte cap).
