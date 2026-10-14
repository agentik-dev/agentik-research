---
repo: agentik-dev/agentik-respeak
path: plugin/docs/config-layers.md
commit: 319f060
title: "Layered configuration (the contract)"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- The contract for ten configuration layers, nearest to the target file wins; `scripts/respeak-config.py` implements it, `tests/test_config_layers.py` pins it, and `examples/layered/` is a runnable tree (lines 1-17). One command, `respeak-config.sh explain --for <file>`, shows the result and which layer decided each key.
- "Why layers" (line 18): tone depends on where the writing lives; before v0.4 there was exactly one override per project. Each layer copies a Claude Code mechanism: user settings, project settings, gitignored local settings, plugin `userConfig`, parent-directory `CLAUDE.md` files, `.claude/rules` `paths:` frontmatter, managed settings.
- Trust boundaries (line 529): a folder or user file cannot change enforcement or governance, because `gate.enabled`, `gate.include`, `gate.exclude` and `shorthand.*` are project-only and dropped with a warning elsewhere; the CI verdict (`gate --committed`) reads only a project file that git tracks, from the index, and a git failure exits 2, never "untracked"; hooks fail open on any setup error, and the measure script exits 2 for every non-verdict failure because CPython's exit 1 for a traceback would read as a verdict; a session override can only silence a hook or run the gate; config strings that reach the model are whitelisted (mode from three names, profile name from `[A-Za-z0-9_-]`, tech level from 1 to 5) so a stray folder file cannot inject instructions through `additionalContext`.
- Session overrides (line 499): `/respeak:off [gate]`, `/respeak:on [gate]`, `RESPEAK_HOOKS`, `RESPEAK_GATE`; precedence is marker, then environment, then layers.
- "Design notes" (line 659), "Rejected alternatives": reusing `.claude/rules/*.md` frontmatter as the config carrier (rules are prose for the model; this config is data read by shell hooks, a statusline and CI); a YAML `extends:` chain (it would let a folder reach into another folder's file and break "nearest wins"); a user-level `.local` file (the user file is already personal); a top-level "managed" layer projects cannot override (nothing needs it yet). Cost: the resolver takes about 30 ms per call, a gate-hook call on a Markdown write about 200 ms, most of it the scan (on one of the author's machines, as the file states; not measured here).
- "Open" (end of file): the `schema:` pointer is still a promise; `mode_select: compass` has no consumer; the `respeak:respeak` agent has no Bash tool, so with no resolved block it approximates the stack and says so.

## Limits
- Read the introduction, section headings, "Trust boundaries" and "Design notes" in full; the precedence rules, worked examples, recipes and the three upgrade sections were read by heading only.
- Timings are the author's, on one machine.

## Used in
- research/synthesis/tools-respeak.md
