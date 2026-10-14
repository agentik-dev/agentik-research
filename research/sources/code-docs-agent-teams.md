---
url: https://code.claude.com/docs/en/agent-teams
title: "Orchestrate teams of Claude Code sessions"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026; version markers reach v2.1.281)
accessed: 2026-10-14
kind: documented
---

## What it says
All as of October 2026.
- Agent teams are experimental and off by default (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`). One session is the lead; teammates are separate sessions, each with its own context window, that message each other and share a task list. Task claiming uses file locking to prevent two teammates claiming one task. The changelog dates the research preview to 2026-02-05 (version 2.1.32).
- When they help (section "When to use agent teams"): research and review, new modules where each teammate owns a separate piece, debugging with competing hypotheses, and cross-layer changes. The page says: "Agent teams add coordination overhead and use significantly more tokens than a single session." It adds: "For sequential tasks, same-file edits, or work with many dependencies, a single session or subagents are more effective."
- Competing hypotheses (use case examples): the page argues that sequential investigation suffers from anchoring and that several investigators trying to disprove each other make the surviving theory more likely to be right. It gives no measurement.
- Team size and tasks (Best practices): start with 3 to 5 teammates; token cost is roughly proportional to team size; 5 to 6 tasks per teammate keeps everyone busy; tasks too small cost more in coordination than they save, tasks too large risk wasted effort. Two teammates editing one file leads to overwrites, so each teammate should own a different set of files. New users should start with review and research, not parallel implementation.
- Subagents versus teams (comparison table): subagents return a result to the caller and cost less; teammates message each other directly, cost more, and suit work that needs discussion.
- Limits: no resumption of in-process teammates; task status can lag; one team per session; no nested teams; teammates cannot run background subagents; in `claude -p` and the Agent SDK Claude does not spawn teammates.
- The costs page puts agent-team token use at about 7 times a standard session when teammates run in plan mode (code-docs-costs).

## Limits
- Documentation and advice; no measured effect on quality or time. Experimental feature.

## Used in
- research/synthesis/field-5.md
