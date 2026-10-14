---
url: https://code.claude.com/docs/en/env-vars
title: "Environment variables (nested sessions, watchdogs, retries, scrub, transcripts)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Nested sessions, as of October 2026: Claude Code sets `CLAUDECODE=1` in the subprocesses it spawns (Bash and PowerShell tools, tmux sessions, hook commands, status line commands, stdio MCP servers). It sets `CLAUDE_CODE_CHILD_SESSION=1` (v2.1.172 or later) in subprocesses spawned through the Bash, PowerShell and Monitor tools, hook commands and status line commands, but not for stdio MCP servers. A nested interactive `claude` TUI started this way is excluded from `--resume`, `--continue`, history and the `claude agents` list; "Non-interactive `claude -p` sessions still persist." `CLAUDE_CODE_FORCE_SESSION_PERSISTENCE=1` overrides the exclusion. I found no row that strips `CLAUDE*` variables from a child, and none that makes a nested `claude` refuse to start.
- `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` strips credentials from the environments of Bash commands, hooks and stdio MCP servers, recognising a credential by variable name or by value shape; it leaves GitHub tokens and proxy settings in place, and the page says to use it as one layer beside narrow permission rules. The GitHub Action sets it automatically when `allowed_non_write_users` is configured. `CLAUDE_CODE_SCRIPT_CAPS` (JSON, with the scrub set) limits how many times named scripts may be invoked per session; matching is by substring, fan-out through `xargs` or `find -exec` is not detected, and the page calls it a "defense-in-depth control".
- Print-mode waits: `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS` defaults to `600000` (10 minutes) and `0` waits indefinitely (v2.1.182 or later). `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` disables background tasks and auto-backgrounding. `BASH_DEFAULT_TIMEOUT_MS` defaults to `120000` and `BASH_MAX_TIMEOUT_MS` to `600000`.
- Retries and stalls: `CLAUDE_CODE_RETRY_WATCHDOG=1` is "for unattended sessions such as eval harnesses, CI jobs, or remote workers". It retries `429` and `529` errors without limit instead of failing after `CLAUDE_CODE_MAX_RETRIES` attempts, but fails at once on a `429` that reports a spend limit or exhausted usage credits; it backs off up to 5 minutes between attempts; from v2.1.199 it raises the retry count for other transient errors to 300 (roughly three hours of backoff). `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` (v2.1.295 or later) caps the wait per request. `CLAUDE_STREAM_IDLE_TIMEOUT_MS` (stream watchdogs; minimum 5 minutes when set, byte-level cap 30 minutes) and `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS` (stall timeout for subagents, and for workflow agents from v2.1.286; default `600000`, 10 minutes) are the stall controls. `API_TIMEOUT_MS` defaults to `600000`. `MCP_TOOL_TIMEOUT` defaults to `100000000` (about 28 hours); `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` defaults to 5 minutes for network servers and 30 minutes for stdio servers.
- Resume: `CLAUDE_CODE_RESUME_INTERRUPTED_TURN=1` resumes automatically when the previous session ended mid-turn. `CLAUDE_CODE_RESUME_INTERRUPTED_TURN_MAX_AGE_MS` bounds how old the last transcript message may be; the row says spawn scripts for long-running agents can set it so a restart against an old transcript does not re-run a stale prompt.
- Transcripts: `CLAUDE_CODE_TRANSCRIPT_LOCAL_GC=1` (v2.1.287 or later) removes pre-compaction history from a `-p` or SDK transcript once the file passes 5 MB after a compaction.
- `CLAUDE_CODE_SIMPLE=1` is equivalent to `--bare`: minimal system prompt, Bash, file read and file edit tools only, no CLAUDE.md, hooks or MCP discovery, no OAuth or keychain credentials.
- `CLAUDE_CODE_SYNC_PLUGIN_INSTALL=1` makes a `-p` run wait for plugin installation before the first query; without it plugins install in the background and may be missing on the first turn.

## Limits
- The page is about 170,000 characters. I read it in two passes (the first 100,000 characters through an extract, the rest through a saved copy searched by keyword), so a row outside my searches could exist. As of October 2026.
- Related notes from question 4 cover timeouts and cache TTL on the same URL (code-docs-env-vars-timeouts).

## Bears on repo claims
- "A nested `claude` spawn is its own session with its own hooks": the page supports a separate session (a nested `-p` session persists). It documents the opposite of stripping for two variables: Claude Code itself sets `CLAUDECODE` and `CLAUDE_CODE_CHILD_SESSION` in children. Stripping `CLAUDE*` variables is therefore a launcher's own choice; the page neither recommends nor forbids it.

## Used in
- research/synthesis/field-6.md
