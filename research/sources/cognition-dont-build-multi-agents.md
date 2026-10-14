---
url: https://cognition.com/blog/dont-build-multi-agents
title: "Don't Build Multi-Agents"
author: Walden Yan (Cognition)
published: 06.12.25 as printed on the page (day and month order not stated)
accessed: 2026-10-14
kind: reported
---

## What it says
- Treats reliability over long runs as the central problem, with context engineering as the main defense.
- For very long tasks it proposes a separate model that compresses the history of actions and conversation into key details, events and decisions. Getting that right "takes investment into figuring out what ends up being the key information", and the author says Cognition has fine-tuned a smaller model for the role.
- Says compression extends how long an agent can work but still hits a limit, and managing arbitrarily long contexts is an open problem.
- Does not say how often summaries lose decisions; the difficulty of picking the key information is the implied risk.

## Limits
- Opinion from a vendor with a product in this area; no measurement. Its main thesis is about multi-agent design, and the compression passage is a few lines.

## Used in
- research/synthesis/field-2.md

## Also (question 5)
Read for the multi-agent argument (the page's date is printed 06.12.25).
- Two principles: share context, meaning full agent traces and not only individual messages; and actions carry implicit decisions. In the author's words: "Actions carry implicit decisions, and conflicting decisions carry bad results."
- Worked example: a task to build a Flappy Bird clone is split into a background subtask and a bird subtask. One subagent builds a Super Mario Bros.-style background and the other builds a bird that does not look or move like a Flappy Bird asset, and the final agent must reconcile them. Passing only the original task to each does not fix it, because in a multi-turn system the tool calls and earlier decisions shape the meaning of the task; even with shared context the two can differ in style because assumptions were not set first.
- Recommended baseline: a single-threaded linear agent, which keeps context continuous but may overflow the window on very large tasks.
- On Claude Code subagents as of June 2025: the author says they do not work in parallel with the main agent and are usually limited to answering a well-defined question, not writing code, because they lack the main agent's context; their gain is keeping investigative work out of the main history so traces can run longer.
- The page contains no measurement, benchmark or quantitative evaluation.

### Limits (question 5)
- Opinion from a vendor that sells a coding agent, with no data. The description of Claude Code subagents is stale: the October 2026 docs describe background subagents that run concurrently, up to 20 by default (code-docs-sub-agents-many-agents), and the author's own April 2026 follow-up softens the position (cognition-multi-agents-working).

### Used in (question 5)
- research/synthesis/field-5.md
