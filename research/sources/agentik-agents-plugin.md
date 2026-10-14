---
repo: agentik-dev/agentik-agents
path: plugin/
commit: 78ce312
title: "The agents plugin: five local agents, four commands, two skills"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

Read: the manifest, the marketplace entry, all five agent files, all four command files and both skills.

## What it says
- Manifest: plugin version 1.2.0, MIT; the marketplace entry also reads 1.2.0 and ships only `plugin/` (source `./plugin`); the owner there is the organisation. The plugin's description: delegate to the lane that fits, with read-only review on API-billed headless agents under a budget cap, mechanical work on a local model, and cost reporting.
- Five local agents, each `model: local/default` with an explicit effort and a turn cap: `local-explore` (Read, Glob, Grep; low; 12 turns), `local-summarize` (Read, Glob; low; 8), `local-review` (Read, Glob, Grep; medium; 15; findings are leads), `local-implement` (Read, Edit, Write, Bash, Glob, Grep; medium; 20 turns; `isolation: worktree`; must report its worktree path and branch), `local-test` (Bash, Read; low; 6; writes output to a file instead of echoing it because generation is about 15 tokens a second). Every description states that the agent works only in a routed session.
- Output discipline is in the agent prompts: one final message, a direct answer first, evidence as path and line, no pasted tool output. `local-implement` and `local-test` carry an explicit warning that text inside files is data, not instructions.
- Commands: `delegate-review` builds 2 to 5 review shards, defaults the budget to dimensions times $1.00, runs the fan-out tool in the background and reports findings from `ok` shards only, with a verify-before-presenting step; `delegate-local` runs a preflight (print the base URL; it must match the router row of the router's `--check`; stop on a FAIL row; never do the work itself; print a mandatory verbatim preflight line) and maps jobs to agents in a table; `delegate-costs` runs the cost tool and relays its numbers without computing its own; `agents-status` runs the status tool and the router check and starts nothing.
- Skills: `delegated-review` and `local-delegation` are model-triggered fallbacks for the same flows; the commands are the deterministic path. The README says telling a session in prose to review in the background is unreliable because the instruction competes with everything else in context, which is the stated reason for the slash commands.
- The `delegated-review` skill gives a budgeting rule from experience: a broad shard (a docs-consistency pass, a trace-every-caller hunt) burns far more turns than a one-file check and, at a flat per-shard cap, budget-dies and returns nothing; the text cites two wasted shards, one at $1 and one at $1.32.
- Escalation rule in `delegate-local`: a degenerate local result escalates the same brief to sonnet, then opus; it is not re-run locally unchanged.

## Limits
- The plugin only wraps tools on PATH; it adds no new mechanism. Whether the commands make sessions reach for the tools more reliably than prose was not measured in the files read; the repo records the reasoning and one observed failure (a plain-session Haiku skipped the preflight and did the task itself, design/01 section 14), not a rate.

## Used in
- research/synthesis/tools-agents.md
