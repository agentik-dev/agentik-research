---
url: https://simonwillison.net/2025/Oct/5/parallel-coding-agents/
title: "Embracing the parallel coding agent lifestyle"
author: Simon Willison
published: 2025-10-05
accessed: 2026-10-14
kind: reported
---

## What it says
- His starting objection: generated code still has to be reviewed, so review speed is the bottleneck and more agents could leave him further behind. His limit is focus: he can review and land one significant change at a time, though some tasks run in parallel with little extra mental load.
- Tasks he hands to parallel agents: research and proofs of concept (output not kept), code explanations saved as reusable context, small maintenance chores such as fixing deprecation warnings, tightly specified work where he writes the spec himself (which makes review easier), and scouting a hard task without meaning to merge it.
- Isolation: several terminal sessions in different directories, mostly Claude Code and Codex CLI. He had not adopted git worktrees; for two isolated agents on one repository he makes a fresh checkout. For riskier work he uses asynchronous cloud agents.
- He runs local agents without approval prompts only where he is confident hostile instructions cannot enter the context, and says he should move local agents into containers.

## Limits
- One practitioner's workflow as of October 2025; no measurements, costs or failure counts. Written before Claude Code's worktree flag (the Claude Code changelog dates it to February 2026).

## Used in
- research/synthesis/field-5.md
