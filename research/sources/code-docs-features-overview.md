---
url: https://code.claude.com/docs/en/features-overview
title: "Extend Claude Code"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Understand context costs", table "Context cost by feature": CLAUDE.md loads at session start in full and costs tokens on every request; output styles likewise; skills load descriptions at session start and full content when used (low cost, "descriptions every request"); MCP servers load tool names at start and full schemas on demand; subagents run in an isolated context; hooks cost nothing unless they return output.
- Tab "CLAUDE.md vs Skill": CLAUDE.md loads every session automatically, a skill loads on demand. Put in CLAUDE.md what Claude should always know: coding conventions, build commands, project structure, "never do X" rules. Put in a skill reference material needed sometimes or a workflow triggered with `/name`. Rule of thumb on the page: keep CLAUDE.md under 200 lines; if it grows, move reference content to skills or split it into `.claude/rules/` files.
- Tab "CLAUDE.md vs Rules vs Skills": unscoped rules load every session like CLAUDE.md; rules with `paths` frontmatter load only when matching files are opened; skills load on demand.
- Tab "Hook vs Skill": a hook has zero context cost unless it returns output. A rule such as "never edit .env" in CLAUDE.md or a skill is a request, not a guarantee; a PreToolUse hook that blocks the edit is enforcement.
- Section "Understand how features layer": CLAUDE.md files are additive; all levels contribute at once. Files from the working directory and above load at launch; subdirectories load as you work in them. When instructions conflict, Claude uses judgment to reconcile them.
- Section "Understand context costs" opens by warning that too many features can add noise as well as cost: skills may not trigger correctly, or Claude may lose track of conventions.
- Section "Build your setup over time": add a line to CLAUDE.md when Claude gets a convention or command wrong twice; capture a playbook as a skill when you paste it into chat for the third time.

## Limits
- Vendor documentation; no measurement behind the cost labels ("Low", "Every request"). Volatile; as of October 2026.

## Used in
- research/synthesis/field-3.md
