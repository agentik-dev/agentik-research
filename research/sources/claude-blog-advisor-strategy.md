---
url: https://claude.com/blog/the-advisor-strategy
title: "The advisor strategy"
author: Anthropic (Claude blog; no author named on the page)
published: 2026-04-09
accessed: 2026-10-14
kind: measured
---

## What it says
- Claim: pairing Opus as advisor with Sonnet or Haiku as executor gives near-Opus intelligence at near-Sonnet cost; the executor consults Opus only when stuck. Output of an advisor call is typically 400 to 700 text tokens per plan.
- Anthropic's own evaluations (Opus 4.6 as advisor in all runs): on SWE-bench Multilingual (five trials of 300 problems across nine languages) Sonnet 4.6 with an Opus advisor scored 2.7 percentage points higher than Sonnet 4.6 alone at 11.9 percent lower cost per task. On BrowseComp (1,266 problems, one attempt each) Haiku 4.5 with an Opus advisor scored 41.2 percent against 19.7 percent for Haiku alone, and trailed Sonnet 4.6 alone by 29 percent at 85 percent lower cost per task.
- Limits stated on the page: the tool was in beta; Haiku with an advisor still costs more per task than Haiku alone; the advisor gives guidance only and calls no tools.

## Limits
- All figures are from Anthropic's internal evaluations on models of April 2026 (Sonnet 4.6, Haiku 4.5, Opus 4.6), with no independent check. The newer page anthropic-optimizing-cost-intelligence (October 2026 models) reports mixed results, including advisors that were never consulted.

## Used in
- Read for question 10 and kept for the site pages on cost lanes; research/synthesis/field-10.md does not cite it (the synthesis has a 9,000-byte cap).
