---
url: https://code.claude.com/docs/en/context-window
title: "Explore the context window"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read 2026-10-14, changelog head at 2.1.296)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "What survives compaction", as of October 2026: the system prompt and output style still apply; the project-root CLAUDE.md, unscoped rules, auto memory and the plan-mode plan are re-injected from disk; the git status snapshot is read fresh from the repository.
- Files Claude read or edited: Claude Code re-reads up to five of them after compaction, most recently modified first. A file over 5,000 tokens comes back as a path reference without its content.
- Invoked skill bodies are re-injected, capped at 5,000 tokens per skill and 25,000 tokens in total, with the oldest dropped first. The one-line skill listing is not re-injected.
- Rules with `paths:` frontmatter and nested CLAUDE.md files are summarized away with the rest of the conversation and reload only when their trigger file is touched again.
- Context that hooks added earlier is summarized with the conversation. SessionStart hooks whose matcher is `compact` run again and add their output. Background commands and background subagents keep running, and Claude is reminded which ones.
- As of v2.1.198 the summarization request inherits the session's extended-thinking configuration (thinking affects only how the summary is produced).
- Section "When your context fills up": the automatic pass works the same way as `/compact`. Before it runs, the page offers `/compact` with a focus ("The summary keeps what you choose instead of what the automatic pass guesses is important."), `/rewind` then Summarize from here or Summarize up to here, `/autocompact` with a token count, `/clear` between unrelated tasks, and subagents for large reads.
- On `/clear` the page says old conversation crowds out the files you need next and costs tokens on every message.
- Models with a 1 million token window (Fable models, Sonnet 5 and later, Haiku 5.5, Opus 4.6 and later, Sonnet 4.6, as of October 2026) compact "the same way" at the larger limit.

## Limits
- Documentation, not a measurement. The token counts in its timeline are labelled "representative".
- It names what is re-injected but gives no account of what the generated summary keeps from the conversation itself.
- Read through WebFetch; the page is long, and the saved copy included the page's source with the interactive timeline.

## Used in
- research/synthesis/field-2.md
