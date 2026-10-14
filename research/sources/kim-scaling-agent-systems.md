---
url: https://arxiv.org/abs/2512.08296
title: "Towards a Science of Scaling Agent Systems"
author: Yubin Kim and co-authors (Google Research, Google DeepMind and MIT affiliations on the HTML version)
published: 2025-12 (v1 9 December 2025; v2 17 December 2025; v3 8 April 2026; this note reads v1 and v3 HTML)
accessed: 2026-10-14
kind: measured
---

## What it says
- Method (v3, Sections 3 and 4): 260 configurations across six benchmarks (BrowseComp-Plus, Finance-Agent, PlanCraft, Workbench, SWE-bench Verified, Terminal-Bench), three LLM families, and five architectures: one single agent and four multi-agent designs (independent, centralized, decentralized, hybrid). Tools, prompts and token budgets were matched to isolate the architecture. Sample sizes: 50 to 100 instances for four benchmarks and only 20 instances each for SWE-bench Verified and Terminal-Bench (Appendix E.4).
- Headline (v3 abstract): change against the single-agent baseline runs from +80.8 percent (decomposable financial reasoning, centralized) to -70.0 percent (sequential planning, independent). The authors conclude that matching coordination to task structure decides the result, not the number of agents. Their model picks the best architecture for 87 percent of held-out configurations.
- Sequential tasks: on PlanCraft every multi-agent variant lost, from -39 percent to -70 percent (centralized -50.4 percent, decentralized -41.4 percent, hybrid -39.0 percent, independent -70.0 percent in the v1 text). Dynamic web navigation gained +9.2 percent under decentralized coordination.
- Three patterns: a tool-coordination trade-off (tool-heavy tasks suffer overhead, because multi-agent systems fragment the per-agent token budget); a capability ceiling (above about 45 percent single-agent accuracy, extra agents gave negative returns); and error amplification (independent agents amplify errors 17.2 times, centralized coordination holds it to 4.4 times).
- Across all six benchmarks and architectures the mean multi-agent change was -0.3 percent with a 95 percent interval of -58.7 to +77.2 percent (v3, Section 4.2). In v1, with four benchmarks and 180 configurations, the mean was -3.5 percent.
- Coding benchmarks (v3, Appendix F, Table 16, 20 instances, 95 percent bootstrap intervals; the paper gives typical widths of plus or minus 20 percentage points per cell): for claude-sonnet-4-5 on SWE-bench Verified the single agent scored 75 percent, centralized 70, decentralized 70, hybrid 70, independent 55; for claude-sonnet-4 the single agent scored 70 and the four multi-agent designs 50, 55, 45 and 30. On Terminal-Bench claude-sonnet-4-5 scored 60 single and 40 to 50 multi-agent. Other models differ (gpt-5-nano rose from 5 percent single-agent to between 25 and 35 percent on SWE-bench Verified). The authors call individual pairwise comparisons underpowered at 20 instances.
- Limits section: scaling to larger groups may face barriers because communication overhead grew superlinearly with agent count; the study explored up to nine agents.

## Limits
- Generic agent harnesses on these benchmarks, not Claude Code; model names are those of 2025. The coding results use 20 instances per cell, so they show direction and not size.
- Versions disagree on counts and some percentages (v1: 180 configurations and four benchmarks; v3: 260 and six). Matched token budgets differ from Anthropic's research system, where more tokens bought more performance (see anthropic-engineering-multi-agent-research).

## Used in
- research/synthesis/field-5.md
