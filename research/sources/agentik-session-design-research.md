---
repo: agentik-dev/agentik-session
path: design/research.md
commit: e7f0723
title: "Research: the four repos as they stand, and the documented facts (2026-09-22)"
author: agentik-dev
published: 2026-09-22
accessed: 2026-10-14
kind: our-use
---

## What it says
- Two research legs by Opus subagents in one sitting: leg 1 scanned four repositories for public-hygiene hits (counts only); leg 2 read the Claude Code documentation and local `--help` (binary 2.1.278).
- Section 3 lists documented Claude Code facts the design relied on, each with a page slug: plugin dependencies auto-install and cannot be disabled while a dependent needs them; hook stdin carries session_id, transcript_path, cwd, permission_mode, hook_event_name and effort but no token or context field (so a hook must read the transcript); stdout is context on SessionStart and UserPromptSubmit; PreToolUse denies with `permissionDecision`; `--max-turns` and `--max-budget-usd` are print-mode flags with result subtypes `error_max_turns` and `error_max_budget`; `--resume` keeps the session id, `--fork-session` mints a new one; the `subagents/` transcript directory is not documented but exists (44 files on the author's machine); no way to find another plugin's root or data directory.
- Section 1 notes this repo was nearly clean, the other repositories were not; those counts are hygiene work and are not used here.

## Limits
- The documented-facts table is the repo's reading of the docs as of Claude Code 2.1.278 (September 2026). Phase 2 should confirm against the live documentation.

## Used in
- research/synthesis/tools-session.md
