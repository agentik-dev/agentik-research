---
url: https://code.claude.com/docs/en/workflows
title: "Orchestrate subagents at scale with dynamic workflows"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026; the changelog dates dynamic workflows to 2026-05-28)
accessed: 2026-10-14
kind: documented
---

## What it says
All as of October 2026.
- A dynamic workflow is a JavaScript script, written by Claude, that orchestrates many subagents. A runtime executes it in the background while the session stays responsive. The script holds the loop, the branching and the intermediate results in variables, so Claude's context holds only the final answer. With subagents, skills and agent teams, Claude is the orchestrator and every result goes into a context window (section "When to use a workflow").
- Quality pattern: because the plan is code, a workflow can have independent agents adversarially review each other's findings before they are reported, or draft a plan from several angles and weigh them. The bundled `/deep-research` workflow fans out searches, cross-checks sources, votes on each claim and filters claims that did not survive. If verifier agents cannot check a claim (for example after a rate limit), the report lists it as unverified instead of refuted.
- Limits (section "Behavior and limits"): up to 16 concurrent agents by default (adjustable from 1 to 256), up to 4,096 items in one `parallel()` or `pipeline()` call, 1,000 agents per run (the page says the cap prevents runaway loops). An agent whose output stalls restarts up to five times; files it already changed stay changed and its tokens stay in the run total.
- Cost: a single run "can use meaningfully more tokens than working through the same task in conversation". A `Large workflow` warning appears when a run schedules more than 25 agents or projects more than 1.5 million tokens; it is advisory and does not pause the run. A size guideline (`small` under 5 agents, `medium` under 10, `large` under 50) is advice to Claude, default `medium`.
- Under `claude -p` and the Agent SDK: no approval prompt appears; the Workflow call goes through the normal permission evaluation, so it needs an allow rule, auto mode, bypass mode, a hook or a host callback to start. The `ultracode` keyword in a `-p` prompt does not start a workflow. A run does not pause for a usage limit under `-p`.
- Resume: a failure in the middle of a fan-out reruns the agents that started after it, even ones that had completed.

## Limits
- Documentation for a feature introduced in 2026; no measurement of the quality gain from adversarial cross-checking. Volatile.

## Used in
- research/synthesis/field-5.md
