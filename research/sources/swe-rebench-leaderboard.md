---
url: https://swe-rebench.com/
title: "SWE-rebench leaderboard"
author: SWE-rebench project (maintainer not named in the extract I read)
published: snapshot window 2026-05-15 to 2026-07-01
accessed: 2026-10-14
kind: measured
---

## What it says
- Method as shown: tasks come from a time window (15 May to 1 July 2026, 111 problems from 65 repositories), chosen to be newer than model training; entries are models or agents (Claude Code, Codex, Junie and Cursor appear as agents); the table reports resolved rate with a margin, a Pass@5 column, tokens per problem and cost per problem. The page has a "potential contamination" filter but, in the extract, does not describe it.
- Top rows (resolved rate, cost per problem in US dollars): Fable 5 at `high` 64.5 percent, 4.40; Opus 5 at `high` 63.4, 3.47; Claude Code as an agent 60.4, 3.39; Sonnet 5 at `high` 56.8, 1.43; GLM-5.2 62.9, 1.40; GPT-5.6 at medium 62.3, 0.85.
- Models from families often released with open weights, same window: MiniMax M3 47.2 (0.95), DeepSeek-V4 Pro 40.2 (0.15), Qwen3.6-27B 31.2 (0.62), Qwen3.6-35B-A3B 24.7 (0.27), Qwen3.5-35B-A3B 17.1 (0.99). The page does not label which models are open-weight.

## Limits
- I read an extract of the page; the scaffold, context length and run count were not in it. Qwen3.8-27B (released after the window closed) is not on the board, so the board says nothing about it. Cost per problem is for the hosted run the site paid for, not a local run. As of October 2026.

## Used in
- research/synthesis/field-10.md
