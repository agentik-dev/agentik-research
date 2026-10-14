---
url: https://www.anthropic.com/engineering/writing-tools-for-agents
title: "Writing effective tools for agents - with agents"
author: Ken Aizawa (Anthropic), with contributions from colleagues across Research, MCP, Product Engineering, Marketing, Design and Applied AI
published: 2025-09-11
accessed: 2026-10-14
kind: documented
---

## What it says
- Tool responses should return only high-signal information; the amount of context a tool returns matters as much as its quality.
- For tools that can return a lot, combine pagination, range selection, filtering and truncation with sensible defaults, and steer the agent toward many small, targeted searches in the truncation message.
- Section on token efficiency: "For Claude Code, we restrict tool responses to 25,000 tokens by default." (as of September 2025).
- Response-format example: a "detailed" Slack-style tool response of about 206 tokens against a "concise" one of about 72 tokens, roughly one third.
- A search tool is preferred over a list-everything tool, so the agent does not read every entry.

## Limits
- Design advice with a small worked example, not a study of how much tool output slows or degrades an agent. The 25,000-token default is as of September 2025; check the current Claude Code docs for the present value.

## Used in
- research/synthesis/field-1.md
