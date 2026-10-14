---
url: https://code.claude.com/docs/en/context-window
title: "Explore the context window"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- An interactive simulation of how a session fills. Its token counts are labelled illustrative, not measured; the simulation uses a 200,000-token maximum. Examples in the simulation: system prompt 4,200 tokens, project CLAUDE.md 1,800, one source-file read 2,400, one test-run output 1,200.
- Before the first prompt, CLAUDE.md, auto memory, MCP tool names and skill descriptions are already in context. Reading a file, hook output and path-scoped rules each add tokens as the session runs.
- A subagent does large reads in its own window and returns only a summary plus a small metadata trailer.
- Section "What survives compaction" (as of October 2026): the system prompt and output style still apply; project-root CLAUDE.md and unscoped rules, auto memory and the plan-mode plan are re-injected from disk; up to five recently modified files are re-read (a file over 5,000 tokens comes back as a path reference); invoked skill bodies are re-injected, capped at 5,000 tokens each and 25,000 tokens in total, oldest dropped first; nested CLAUDE.md files and path-scoped rules reload on demand. The skill listing is not re-injected. Conversation content, including full tool outputs and intermediate reasoning, is replaced by a structured summary.
- Section "When your context fills up": compaction runs automatically near the limit; /compact with a focus, partial summarize via rewind, /autocompact with a token count, /clear between tasks, and subagents for large reads. The page says old conversation "crowds out the files you need next".
- Models with a 1M window include Fable models, Sonnet 5 and later, Haiku 5.5, Opus 4.6 and later, and Sonnet 4.6; compaction works the same way at the larger limit.
- /context shows a live breakdown by category with suggestions, including which CLAUDE.md and auto memory files loaded.

## Limits
- Numbers are illustrative by the page's own label. Behaviour is as of Claude Code versions current in October 2026 (a version note on the page mentions v2.1.198).

## Used in
- research/synthesis/field-1.md

## Also (question 3)
- The simulation's "before you type anything" items and their illustrative token counts (the page labels all counts representative): system prompt 4,200; auto memory 680; environment info 280; deferred MCP tool names 120; skill descriptions 450; user-level CLAUDE.md 320; project CLAUDE.md 1,800. My addition of those seven values is 7,850 tokens, about 4 percent of the 200,000 maximum the simulation uses. A subagent in the simulation starts with its own copy of the project CLAUDE.md (1,800 tokens).
- The simulation's tip on the project CLAUDE.md entry: keep it under 200 lines and move reference content to skills or path-scoped rules, so it loads only when needed. Its description of skill descriptions says a skill with `disable-model-invocation: true` is not in the list and stays out of context until invoked, and that the listing is not re-injected after `/compact`; only skills actually invoked are preserved.
- Section "What survives compaction" (as of October 2026): path-scoped rules and nested CLAUDE.md files enter message history when triggered, so compaction summarizes them away with the rest; the page advises dropping `paths:` frontmatter or moving the rule to the project-root CLAUDE.md if it must persist.
