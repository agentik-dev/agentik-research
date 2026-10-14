---
url: https://code.claude.com/docs/en/cli-reference
title: "CLI reference (flags for print mode and unattended runs)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- `--max-budget-usd` (print mode only): "Stop the run once estimated spend on API calls reaches this amount." The check uses Claude Code's client-side cost estimate, which can differ from the bill; subagent spend counts toward the cap; "Spend can pass the cap, so leave headroom". Totals restored from earlier runs on `--continue` or `--resume` do not count toward it. Once spend reaches the cap, spawning another subagent fails with `Budget limit reached` and background subagents are stopped (v2.1.217 or later).
- `--max-turns` (print mode only): limits agentic turns and "Exits with an error when the limit is reached". No limit by default. With `--input-format stream-json`, a message still queued when a turn ends at the limit starts a new turn with its own limit.
- `--allowedTools` lists tools that run without prompting; `--tools` restricts which built-in tools exist. `--disallowedTools`: a bare tool name removes the tool from Claude's context (`"*"` removes every tool); a scoped rule such as `Bash(rm *)` leaves the tool and denies matching calls.
- `--permission-mode` accepts `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions` and `manual` (alias for `default`). `--dangerously-skip-permissions` is equivalent to `bypassPermissions`. `--permission-prompt-tool` names an MCP tool that answers prompts in non-interactive mode; `--permission-prompts none` denies them instead (v2.1.259 or later).
- `--bare` is "Minimal mode": it skips hooks, skills, commands, subagents, plugins, MCP servers, auto memory and CLAUDE.md, and sets `CLAUDE_CODE_SIMPLE`. `--no-session-persistence` (print mode only) stops transcripts being saved. `--fallback-model` takes a comma-separated chain tried in order when the primary model is overloaded or unavailable.
- `--restricted` (v2.1.248 or later) is for evaluation harnesses on a shared machine: it removes built-in tools that run commands or code, confines file tools to the working directories, loads only managed settings and `--settings`, and refuses `bypassPermissions`.
- `--bg` starts a background session and cannot be combined with `-p`. `claude agents --json` prints active background sessions as JSON. `claude ultrareview` runs non-interactively and exits 0 on success or 1 on failure; `--timeout` overrides a 45-minute default.
- `--continue` skips sessions created with `claude -p` or the Agent SDK; `claude -p --continue` includes them.
- `--session-id` must be a valid UUID. `--include-hook-events` and `--forward-subagent-text` need `stream-json`. `--json-schema` validates structured output (print mode only).

## Limits
- Flag descriptions only; no measurement. Version numbers are as the page states them, as of October 2026.

## Used in
- research/synthesis/field-6.md
