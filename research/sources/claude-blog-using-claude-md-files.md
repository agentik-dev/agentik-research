---
url: https://claude.com/blog/using-claude-md-files
title: "Using CLAUDE.md files: Customizing Claude Code for your codebase"
author: Anthropic (no named author on the fetched page)
published: 2025-11-25
accessed: 2026-10-14
kind: documented
---

## What it says
- CLAUDE.md files can sit at the repository root (shared with the team), in parent directories for monorepo setups, or in the home folder for all projects.
- Suggested contents: a project summary and directory structure, main dependencies and architectural patterns, custom tools and scripts with usage, MCP server usage, standard workflows (planning steps, testing, commit format), common commands, code style, environment setup, project-specific warnings. Keep out API keys, credentials, connection strings and security vulnerability details.
- Length advice is qualitative: keep the file concise and readable, and when it grows large, split content into separate markdown files and reference them from CLAUDE.md. No line count is given.
- The post says the file becomes part of Claude's system prompt, so each conversation starts with its context loaded. The Claude Code memory page (October 2026) says CLAUDE.md content is delivered as a user message after the system prompt, not as part of it (code-docs-memory), so the two differ.
- Add repeated instructions with the `#` key; run `/init` for a starter file and revise it as the project changes, based on real friction.

## Limits
- Vendor guidance, November 2025, no data. The `#` key shortcut may not match the October 2026 interface; I did not check the current docs for it.

## Used in
- research/synthesis/field-3.md
