---
url: https://code.claude.com/docs/en/large-codebases
title: "Set up Claude Code in a monorepo or large codebase"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Layer CLAUDE.md files by directory": Claude Code loads every CLAUDE.md file from the working directory and every parent directory at launch, then loads each subdirectory's file on demand.
- Section "Choose where to start Claude", table: starting at the repository root loads the root file only at launch (subdirectory files on demand); starting in a subdirectory loads that directory's file plus every ancestor's. Project settings in `.claude/settings.json` are not inherited from parent directories the way CLAUDE.md files are.
- A single root CLAUDE.md in a large codebase "tends to either grow to cover every subsystem's conventions", costing context on unrelated instructions, or stay too generic; the page recommends splitting into a root file for rules that apply everywhere and per-directory files for area conventions.
- Section "Exclude irrelevant CLAUDE.md files": `claudeMdExcludes` skips files (including other teams' packages) by absolute-path glob, at any settings scope; managed policy files cannot be excluded. The list is static; to change focus, start Claude from a different directory.
- Section "Centralize conventions when layering stops scaling": move conventions and reference content out of always-loaded CLAUDE.md into skills, plugins, or an MCP server over a code index, so they load on demand.
- Section "Layer CLAUDE.md files by directory" also advises revisiting instructions after major model releases, since a rule that worked around an older model's limit can become overhead.
- Section "Keep skills discoverable": names always load, but with many skills some lose their descriptions; keep descriptions short and lead with the words a request would contain.

## Limits
- Vendor documentation; no measurement of the token cost of a parent file. Volatile; as of October 2026.

## Used in
- research/synthesis/field-3.md
