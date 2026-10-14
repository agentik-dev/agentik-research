---
url: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
title: "Agent Skills"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "How Skills work", table of three levels: Level 1 metadata (the `name` and `description` from the frontmatter) is always loaded at startup and costs about 100 tokens per skill; Level 2 instructions (the `SKILL.md` body) load when the skill is triggered and cost under 5k tokens; Level 3 and beyond (bundled files and scripts) cost nothing until accessed, and a script's code never enters context, only its output.
- The page says many skills can be installed "without context penalty" because until a skill triggers, only its name and description occupy context.
- Field limits: `name` at most 64 characters, lowercase letters, numbers and hyphens; `description` non-empty and at most 1,024 characters.
- Section "Claude Code": custom skills are filesystem-based, in `~/.claude/skills/` (personal) or `.claude/skills/` (project). Custom skills do not sync across claude.ai, the API and Claude Code.

## Limits
- Documentation of the platform-level design; the "about 100 tokens" and "under 5k tokens" figures are the vendor's stated sizes, not measurements. Claude Code applies its own listing budget and cap (code-docs-skills). Volatile; as of October 2026.

## Used in
- research/synthesis/field-3.md
