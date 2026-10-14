---
url: https://code.claude.com/docs/en/cli-reference
title: "CLI reference (flags --max-turns and --max-budget-usd)"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026; flags cite Claude Code versions up to v2.1.290)
accessed: 2026-10-14
kind: documented
---

## What it says
- `--max-turns`, as of October 2026: limits the number of agentic turns, print mode only; "Exits with an error when the limit is reached." No limit by default. With `--input-format stream-json`, a message still queued when the limit ends a turn stays queued and starts a new turn with its own limit.
- `--max-budget-usd`: stops the run once estimated spend on API calls reaches the amount, print mode only. The cap is checked against Claude Code's client-side cost estimate, which can differ from the bill. Spend from subagents counts. Spend can pass the cap, so leave headroom. Totals restored from earlier runs on `--continue` or `--resume` do not count toward it. Once spend reaches the cap, spawning another subagent fails with `Budget limit reached` and running background subagents are stopped (requires v2.1.217 or later).
- `--fallback-model` takes a comma-separated list tried in order when the primary model is overloaded or unavailable.
- `--bare` skips auto-discovery of hooks, skills, subagents, plugins, MCP servers, auto memory and CLAUDE.md for faster scripted calls. `--bg` starts a background session and cannot combine with `-p`. `--autocompact <auto|tokens>` sets the auto-compact window for one session (v2.1.221 or later).
- `--include-partial-messages` and `--output-format stream-json` need `--print`; `--mcp-config` with `-p` waits up to `MCP_TIMEOUT` (30 seconds by default) for pending servers.
- `--continue` skips sessions created with `claude -p` or the Agent SDK and sessions whose first prompt was `/loop`; `claude -p --continue` includes them.

## Limits
- Vendor reference; flag behaviour is as of October 2026. The page gives no default for a print-mode budget, so an unattended run with neither flag is unbounded by these two controls.

## Used in
- research/synthesis/field-4.md
