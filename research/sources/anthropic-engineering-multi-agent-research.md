---
url: https://www.anthropic.com/engineering/multi-agent-research-system
title: "How we built our multi-agent research system"
author: Jeremy Hadfield, Barry Zhang, Kenneth Lien, Florian Scholz, Jeremy Fox, Daniel Ford (Anthropic)
published: 2025-06-13
accessed: 2026-10-14
kind: reported
---

## What it says
- The lead agent saves its plan to external memory early, because "if the context window exceeds 200,000 tokens it will be truncated and it is important to retain the plan."
- The appendix says agents summarize completed phases of work and store essential information in external memory before moving on, and can retrieve it, such as the research plan, instead of losing earlier work near the limit.
- When context limits approach, agents can spawn fresh subagents with clean contexts and keep continuity through careful handoffs.

## Limits
- Read only for the context-limit passages. A design description of a research product, with no comparison of handoff against in-place summary. The 200,000 token figure is as of June 2025 and a model-specific window.

## Used in
- research/synthesis/field-2.md

## Also (question 5)
Read for the multi-agent case; section names as the page prints them.
- Result (section "Benefits of a multi-agent system"): a lead Claude Opus 4 with Claude Sonnet 4 subagents "outperformed single-agent Claude Opus 4 by 90.2% on our internal research eval." The eval began with about 20 queries drawn from real usage; one LLM-judge call scored each answer from 0.0 to 1.0 on factual accuracy, citation accuracy, completeness, source quality and tool efficiency, and human testers caught edge cases the judge missed (section "Effective evaluation of agents").
- Cost, as of June 2025: agents use about 4 times the tokens of chat and multi-agent systems about 15 times. The page gives no multiple against a single agent. Token use alone explained 80 percent of the variance in BrowseComp performance, and token use, tool calls and model choice together explained 95 percent. The page says multi-agent systems need tasks whose value pays for the extra performance.
- Poor fits: domains where all agents must share one context or have many dependencies on each other; the page says most coding tasks involve fewer truly parallelizable tasks than research.
- Early failures: 50 subagents spawned for simple queries; endless searches for sources that did not exist; agents sending each other excessive updates; duplicated work from vague tasks (one subagent researched the 2021 automotive chip crisis while two others duplicated work on 2025 supply chains).
- Delegation rules: each subagent needs an objective, an output format, guidance on tools and sources, and clear task boundaries. Effort rules in the prompt: one agent with 3 to 10 tool calls for simple fact-finding, 2 to 4 subagents with 10 to 15 calls each for comparisons, more than 10 subagents for complex research. Parallel tool calls cut research time by up to 90 percent on complex queries.
- Handoffs: subagents write output to external storage and pass lightweight references back, to avoid a "game of telephone" through the lead. The lead runs subagents synchronously and cannot steer them while they work, which the page calls a bottleneck.
- Reliability: errors compound in stateful agents; the team resumes from checkpoints, retries, and deploys with rainbow deployments so running agents are not cut off.

### Limits (question 5)
- The vendor's own eval on a research task, not coding, with no variance, no stated final sample size and no run-to-run spread. Because token use explains most of the variance, the 90.2 percent gain cannot be separated from spending more tokens. Models are those of mid-2025.

### Used in (question 5)
- research/synthesis/field-5.md

## Also (question 8)
Re-opened on 2026-10-14 for the evaluation and stop-rule passages (page dated 13 June 2025).
- Evaluation (section "Effective evaluation of agents"): start with about 20 queries from real usage, because early prompt changes had large effects (one moved success from 30 percent to 80 percent). LLM-as-judge: after trying several judges the team settled on one model call with one prompt that scored five dimensions (factual accuracy, citation accuracy, completeness, source quality, tool efficiency) from 0.0 to 1.0 plus pass or fail; the page says this was the most consistent and closest to human judgment.
- Human testers still found what the judge missed: hallucinated answers on unusual queries, system failures and a bias toward search-engine-optimised pages over primary sources.
- Stop rules: the page describes no formal stop condition; the lead agent decides whether more research is needed, and effort is set by scaling rules in the prompt. Early failures included agents "continuing when they already had sufficient results" and 50 subagents for a simple query.
- Limits (question 8): a research product, not code review. The judge is calibrated against human testers on the team's own queries; no agreement figure is given.
- Used in (question 8): research/synthesis/field-8.md
