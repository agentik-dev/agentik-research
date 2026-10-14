---
url: https://www.anthropic.com/engineering/building-effective-agents
title: "Building effective agents"
author: Erik S. and Barry Zhang (Anthropic), as the page's byline prints it
published: 2024-12-19
accessed: 2026-10-14
kind: documented
---

## What it says
- Defines two kinds of system. Workflows are systems where LLMs and tools are orchestrated through predefined code paths. Agents are systems where the LLM dynamically directs its own process and tool use.
- Parallelization has two forms. Sectioning splits a task into independent subtasks that run at once, for speed or to separate concerns (the example is a guardrail model running beside the main response). Voting runs the same task several times for more confidence (the example is several prompts reviewing code for vulnerabilities).
- Orchestrator-workers: a central LLM breaks a task down dynamically, delegates the pieces to worker LLMs and synthesizes their results. It differs from parallelization because the subtasks are not predefined. The page's use-case example is coding products that make complex changes to multiple files each time.
- Evaluator-optimizer: one LLM generates and another evaluates in a loop. The page says it suits cases with clear evaluation criteria, where iterative refinement adds measurable value and the LLM can give useful feedback. Its examples are literary translation and multi-round search.
- Advice on complexity: find the simplest solution possible and add complexity only when needed. Agentic systems often trade latency and cost for better task performance. Start with simple prompts, optimize them with evaluation, and add multi-step agentic systems only when simpler solutions fall short.
- Coding is called a strong fit for agents because solutions can be checked by automated tests and the agent can iterate on test results. Human review stays crucial for fit with the wider system.

## Limits
- December 2024: it predates Claude Code subagents (the Claude Code changelog dates custom subagents to July 2025). It describes patterns and gives no failure rates or measurements of its own.
- Vendor guidance from the company that sells the models and tools it discusses.

## Used in
- research/synthesis/field-5.md

## Also (question 8)
Re-opened on 2026-10-14. Page dated 19 December 2024; the page notes that tooling has changed since.
- Evaluator-optimizer: suited where there are clear evaluation criteria and iterative refinement adds measurable value. The two signs of fit: a person's feedback visibly improves the model's answer, and the model can give that feedback itself. Examples: literary translation, and complex search where an evaluator decides whether another round is warranted.
- Round limits: "it's also common to include stopping conditions (such as a maximum number of iterations) to maintain control." The page also advises pausing for human feedback at checkpoints or when the agent hits a blocker.
- Limits (question 8): guidance, not a measurement; it gives no iteration count and no data on convergence.
- Used in (question 8): research/synthesis/field-8.md
