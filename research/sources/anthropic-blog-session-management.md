---
url: https://claude.com/blog/using-claude-code-session-management-and-1m-context
title: "Using Claude Code: session management and 1M context"
author: Thariq Shihipar (Anthropic, Claude Code team)
published: 2026-04-15
accessed: 2026-10-14
kind: reported
---

## What it says
- Frames every turn end as a branch point with four choices: continue, rewind (re-prompt from an earlier message, dropping later ones), clear (start a new session, usually with a brief you write from what you learned) and compact (summarize and continue on the summary). Subagents are a fifth option.
- Compact versus clear: compacting has Claude write the summary, so it may capture things you would forget, but the summary is lossy and can be steered. Clearing puts the choice of what carries forward in your hands, which takes more effort but gives a context holding only what you decided is relevant. The post suggests a new session when you start a new task.
- Why auto-compact goes wrong: bad compacts often happen when the model cannot predict where your work is heading; the post's example is a long debugging session whose summary drops a second warning the user later asks about. It also says the model is at its least capable when it compacts, because of context rot. With a 1M window there is room to run `/compact` early with a description of the next step.
- A brief for a clear should hold the goal, the constraints, the key files and approaches already ruled out. Rewinding can act as a handoff: ask Claude to summarize what it learned from a failed attempt.
- Subagents test: "will I need this tool output again, or just the conclusion?"
- Context rot is described as performance degrading as context grows, with no numeric threshold on the page I read.

## Limits
- A first-party practitioner post: advice and one example, no measurement.

## Used in
- research/synthesis/field-2.md
