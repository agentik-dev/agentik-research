---
url: https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals
title: "AGENTS.md outperforms skills in our agent evals"
author: Jude Gao (Vercel)
published: 2026-01-27
accessed: 2026-10-14
kind: reported
---

## What it says
- Setup: coding agents writing code against Next.js 16 APIs that are not in model training data, judged on build, lint and behaviour tests, with retries to rule out model variance. The post does not state the model or the number of eval cases.
- Pass rates: baseline with no docs 53 percent; skill with default behaviour 53 percent (no gain); skill with explicit instructions to use it 79 percent (26 points above baseline); an index of the docs placed in AGENTS.md 100 percent (47 points above baseline). Build, lint and test pass rates for the index were 100 percent each.
- The docs index was compressed from about 40KB to 8KB (an 80 percent cut) with the 100 percent result kept.
- Reason given for the skill's weak result: it was never invoked in 56 percent of eval cases, so the agent had the docs but did not use them. The authors call passive always-present context winning over on-demand loading a "working theory".
- Caveats the post states: skills suit vertical, user-triggered workflows such as version upgrades; results depend on instruction wording; the gap may close as models use tools better; the findings are about general framework knowledge.

## Limits
- A vendor blog with one task family, unstated model and case count, and a commercial interest in the framework it tests. It supports "an unreliable pointer may not be followed", and does not test a pointer with a stronger trigger or a larger always-loaded file. Date of models unknown.

## Used in
- research/synthesis/field-3.md
