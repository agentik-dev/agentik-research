---
url: https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more
title: "Steering Claude Code: when to use CLAUDE.md, skills, hooks, and subagents"
author: Michael Segner (Anthropic), as the fetched page states it
published: 2026-06-18
accessed: 2026-10-14
kind: documented
---

## What it says
- A table by method of when it loads and what happens at compaction: root CLAUDE.md loads at session start and is re-read after compaction ("highest token cost per line"); a subdirectory CLAUDE.md loads when Claude reads a file there and is lost after compaction until that directory is touched again; unscoped rules cost like CLAUDE.md and path-scoped rules load conditionally; skills load name and description at start and the body when invoked, re-injected after compaction up to a shared budget with the oldest dropped first; subagents return only a summary; hooks sit outside the context and bypass compaction; output styles and an appended system prompt are never compacted.
- Guidance: "Keep CLAUDE.md under 200 lines, give it an owner, and review changes to it like code." Treat it as an overview that indexes other files, not a home for all detail.
- Pointer versus always-loaded: always-loaded CLAUDE.md holds facts needed all the time (build commands, layout, team conventions); procedures such as deploy runbooks and review checklists belong in skills; area-specific constraints belong in path-scoped rules; behaviour that must happen reliably belongs in hooks; personal preferences belong in user-level files.
- The post calls hooks deterministic and the only method that reliably enforces behaviour.

## Limits
- Vendor guidance with no data. The title differs by listing: a search listing for the same URL shows "Steering Claude Code: CLAUDE.md files, skills, hooks, rules, subagents and more". The author line comes from the fetched page text and I did not verify it elsewhere.

## Used in
- research/synthesis/field-3.md
