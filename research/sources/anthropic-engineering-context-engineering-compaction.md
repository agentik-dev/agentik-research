---
url: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
title: "Effective context engineering for AI agents"
author: Anthropic Applied AI team (Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, Jeremy Hadfield, with named contributors)
published: 2025-09-29
accessed: 2026-10-14
kind: reported
---

## What it says
(Read for question 2 only: compaction, note-taking and sub-agents. Another note may cover the post's account of context rot.)
- Compaction means summarizing a conversation near the window limit and starting a new window with the summary. In Claude Code the message history goes to the model for summarization; the post says it keeps architectural decisions, unresolved bugs and implementation details and drops redundant tool outputs; the agent continues with the compressed context plus the five most recently accessed files.
- The main risk the post names is overly aggressive compaction, which can drop subtle details that turn out to matter later. Its tuning advice: first maximize recall so the prompt keeps every relevant detail of the trace, then improve precision by removing superfluous content, and tune on complex agent traces.
- Tool-result clearing is called one of the safest, lightest-touch forms of compaction, because a raw result deep in the history is rarely needed again. It was released as a feature on the Claude Developer Platform.
- Structured note-taking: the agent writes notes (a to-do list, a NOTES.md file) outside the window and reads them back later. In the Pokemon example Claude kept maps, achievements and strategies across thousands of game steps and, after context resets, read its notes and continued multi-hour sequences.
- Sub-agents explore in clean windows, may use tens of thousands of tokens or more, and return a condensed summary, often 1,000 to 2,000 tokens.
- When to choose: compaction for tasks with extensive back-and-forth; note-taking for iterative development with clear milestones; multi-agent architectures for parallel research and analysis.

## Limits
- A design essay with no measurement of what compaction loses. The Pokemon account is an illustration, not a controlled comparison. Vendor writing about its own product.

## Used in
- research/synthesis/field-2.md
