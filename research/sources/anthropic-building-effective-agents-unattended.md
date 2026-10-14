---
url: https://www.anthropic.com/engineering/building-effective-agents
title: "Building effective agents"
author: Erik S. and Barry Zhang (Anthropic), as the page bylines them
published: 2024-12-19
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Agents": agents plan and operate independently once the task is clear and can pause for human feedback at checkpoints or when they meet blockers; implementations are described as simple, tools in a loop, and the page says it is "common to include stopping conditions (such as a maximum number of iterations) to maintain control."
- Section "When to use agents": "The autonomous nature of agents means higher costs, and the potential for compounding errors." The authors recommend extensive testing in sandboxed environments along with appropriate guardrails.

## Limits
- A December 2024 design essay with no measurements. The page now carries a note that much of its tooling landscape has changed and points to newer Anthropic guidance on Managed Agents. As a source for unattended runs it supports three ideas only: a stop condition, a human checkpoint, and sandboxed testing.

## Used in
- research/synthesis/field-6.md
