---
url: https://ranjankumar.in/claude-code-headless-hooks-human-backstop
title: "Headless Claude Code: When the Human Leaves the Loop, Hooks Are All You Have Left"
author: Ranjan Kumar (The Claude Code Engineering Playbook, Part 11)
published: 2026-07-21
accessed: 2026-10-14
kind: reported
---

## What it says
- Thesis: interactive Claude Code relies on a human who approves prompts, reads diffs and interrupts runaways. Headless runs remove that person (the article calls it "Backstop Collapse"), so only protections that fire without a human survive: hooks, deny rules, tool allowlists and the sandbox boundary.
- Worked examples: a `Stop` hook that blocks ending a session on a detached HEAD or the default branch, when tests fail or the tree is dirty, exits 2 to send the failure back, and checks `stop_hook_active` to avoid loops; a `PreToolUse` hook that denies a call. The article's loop bound is `--max-turns` plus the `stop_hook_active` check; it gives no budget or loop-detection hook example.
- Claims about `-p`: `dontAsk` denies anything that would prompt; deny rules and `--disallowedTools` hold in every mode including bypass; `--bare` skips hooks, skills, MCP servers and CLAUDE.md. It also says a tool call that would normally prompt aborts the run when nobody answers.
- Secondhand figures it cites (not verified here): numbers attributed to a 20,574-session study, a production database deletion by a coding agent in 2025, and a stolen cloud API key said to have run up 82,314 US dollars in about 48 hours.

## Limits
- A practitioner essay, not a measurement. The statement that an unanswered prompt aborts the run conflicts with Anthropic's documentation, which says the call is denied, Claude receives a rejection and the run continues (code-docs-agent-sdk-agent-loop-unattended, code-docs-headless-unattended). The cited study's abstract page (arxiv-how-coding-agents-fail-users), which I opened, does not give the percentages the article quotes from it.

## Used in
- research/synthesis/field-6.md
