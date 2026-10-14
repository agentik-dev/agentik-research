---
url: https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence
title: "Multi-model strategies: advisor and orchestrator (Optimizing for cost and intelligence)"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: measured
---

## What it says
- The page says its results are Anthropic's internal and directional, not guarantees. Two strategies: advisor (a cheaper executor runs the loop and escalates; fits serial work that is hard in spots) and orchestrator (the frontier model runs the loop and delegates; fits independent pieces, especially beyond one context window).
- Advisor, GPQA Diamond: Sonnet 5.5 alone and Opus 5.5 alone both 91 percent; Haiku 5.5 alone 85 percent; neither Haiku nor Sonnet consulted the Opus advisor on any of 198 questions per run; the advisor definition (about 1,000 prompt tokens per request) added 12 percent to Haiku's cost and 25 percent to Sonnet's.
- Advisor, internal agentic-coding benchmark: Opus 5.5 at `high` with a Fable 5.1 advisor scored 90.1 percent at 2.92 US dollars per attempt, +1.7 points over Opus 5.5 alone at `high` (at the edge of noise, five attempts per task) for about 2.1 times the cost; Opus 5.5 alone at `xhigh` scored 91.1 percent at 4.11 dollars. A low-effort Opus 5.5 executor consulted on 1 of 300 chartography tasks and scored 7 points below Opus 5.5 alone at `low`.
- Consult rate varies by task: a low-effort Sonnet 5 executor kept consulting on DeepSWE and gained 23 points, and stopped consulting on SWE-bench Pro. The page warns that an executor at low effort may stop noticing it is stuck.
- Orchestrator, easy BrowseComp slice (10 problems, 50 delegated and 70 solo runs): a Fable 5 orchestrator with one Sonnet 5 worker cost about half of Fable 5 alone on average and about a third at the 90th percentile (12 against 33 dollars); on the full, harder set the economics reversed and Fable 5 alone matched accuracy at 22 to 30 percent lower cost. On a 21.6-million-token corpus (130 planted defects), a Fable 5.1 lead over 25 Sonnet 5 workers cost 47 to 55 percent less than Fable 5.1 solo (468 to 552 dollars per episode), scored 10 to 12 points lower, and took about 2.3 hours against 15 to 20 hours.
- Section "Choosing between them": sweep effort on the current model first (called the cheapest experiment and the baseline any multi-model strategy must beat); then price the stronger model alone at low effort; use an advisor only if the executor consults often; recheck at every model release.

## Limits
- Anthropic's own evaluations, some internal benchmarks not publicly available; the fetch covered the first 100,000 of 158,557 characters. As of October 2026. Prices and models change at each release.

## Used in
- research/synthesis/field-10.md
