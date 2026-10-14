---
url: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model
title: "Choosing the right model"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Establish key criteria", as of October 2026: capabilities, speed, cost and effort. The page says: "Tuning effort is often a better lever than switching models." Default effort is `high` for Fable 5.1, Opus 5 and Sonnet 5.5 and `medium` for Opus 5.5 and Haiku 5.5.
- Two starting strategies: efficiency-first (begin with Haiku 5.5 and upgrade only for specific gaps) and capability-first (begin with Opus 5.5, then lower effort or downgrade over time; move to Fable 5.1 if evals at `xhigh` or `max` still fall short).
- Selection matrix: Fable 5.1 for the highest capability and hours-long sessions; Opus 5.5 for complex agentic coding; Sonnet 5.5 for everyday coding and agentic tool use; Haiku 5.5 for the lowest latency and price, including sub-agent tasks. The page says most workloads start with Opus 5.5.
- Section "Combine models": pair a lower-cost model with a frontier model so most tokens bill at the lower rate; two patterns, an executor that escalates to an advisor and an orchestrator that delegates to cheaper workers (details on anthropic-optimizing-cost-intelligence). It tells readers to build evals specific to their use case before changing models.

## Limits
- Vendor guidance with no measurement on this page; as of October 2026.

## Used in
- Read for question 10 and kept for the site pages on cost lanes; research/synthesis/field-10.md does not cite it (the synthesis has a 9,000-byte cap).
