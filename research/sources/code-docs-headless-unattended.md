---
url: https://code.claude.com/docs/en/headless
title: "Run Claude Code programmatically (headless and print mode, for unattended runs)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026; changelog head v2.1.296, 9 October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026: `claude -p` runs the Agent SDK loop from the command line. It exits with code 0 on success and a non-zero code when the run fails. A failure inside the run, such as missing authentication, prints as the result on stdout; an invalid flag is reported on stderr before the run starts.
- Section "Start faster with bare mode": `--bare` skips auto-discovery of hooks, skills, custom commands, subagents, installed plugins, MCP servers, auto memory and CLAUDE.md. Without it, a `-p` run loads the context an interactive session would, runs the hooks in a project's `.claude/settings.json` and connects the servers in its `.mcp.json`, "even in a folder you've never trusted", with no trust dialog. Bare mode never reads OAuth credentials or the keychain, so it needs `ANTHROPIC_API_KEY` or an `apiKeyHelper`. From v2.1.286 it also connects only command-line MCP servers, sends no system reminders, starts no background tasks, and stops (instead of backgrounding) a command that reaches its timeout. The page calls it the recommended mode for scripted and SDK calls and says it will become the default for `-p` in a future release.
- Section "Background tasks at exit": after Claude's last turn and stdin closing, a `-p` run can stay open for background work. Default: unless a background command the main conversation started is still running, Claude Code stops what is still running after 10 minutes of continuous idle waiting and drops the partial result; `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS` changes it, `0` waits without a cap. It waits for background commands the main conversation started (until they exit or hit their time limit), background subagents and workflows (the run stays open until they complete, because their result is part of the final output), Monitor watches (default watch timeout five minutes), and pending self-paced `/loop` wakeups. At the `--max-budget-usd` cap it stops background work instead of waiting. With default text output each turn's result prints (before v2.1.295 only the last).
- Section "Stop a run with SIGTERM": SIGTERM gives exit code 143, leaves the turn in progress unfinished and records no result for it. SIGINT or the SDK `interrupt()` ends the turn instead. On SIGTERM Claude Code terminates the process tree of running Bash commands, then runs only `SessionEnd` hooks. A permission prompt pending at SIGTERM is left unanswered. On resume the interrupted turn stays as it was unless `CLAUDE_CODE_RESUME_INTERRUPTED_TURN=1`.
- If the working directory is deleted mid-run the session keeps running; it emits a warning message in `stream-json` output and shell commands fail until the directory exists again.
- Output: `--output-format json` carries `total_cost_usd` and a per-model breakdown; on `--continue` or `--resume` the figure is the conversation's whole total. Both are client-side estimates. `stream-json` needs `--verbose`; the last line is a `result` message. A slow consumer makes Claude Code wait for queued output to drain, capped at 30 seconds (about 2 seconds before v2.1.214). Piped stdin is capped at 10 MB.
- Events: `system/init` is the first event (unless startup hook events precede it) and carries `plugins`, `plugin_errors`, `mcp_servers` and `mcp_server_errors`; a skipped `--mcp-config` entry does not fail the run (it continues and exits cleanly), so a CI gate has to read those fields. `system/api_retry` carries `attempt`, `max_retries`, `retry_delay_ms`, `error_status` and an error category. With `--mcp-config` the first turn waits for pending servers up to the `MCP_TIMEOUT` startup timeout, 30 seconds by default.
- Section "Auto-approve tools": `--allowedTools` pre-approves tools; listing `Bash` does the same for shell commands except in a run that starts in auto mode, where a bare `Bash` entry is dropped as a broad allow rule. A run where nothing sets a permission mode takes the built-in starting mode, which can be `auto`. `dontAsk` denies every call that would otherwise prompt, and the page marks it as useful for locked-down CI runs.
- Section "Turn off permission prompts in unattended runs": `--permission-prompts none` (v2.1.259 or later) denies anything that would prompt unless a `PermissionRequest` hook allows it, tells Claude nobody can approve and not to retry, and lets the run continue. "In a `-p` run with no host, these requests are denied either way". With `stream-json`, denials appear as `permission_denied` system messages and the final result lists them in `permission_denials`.
- Sessions: `--continue` and `--resume <id>` continue a `-p` conversation; `--resume` also accepts the path of a session's `.jsonl` transcript. Built-in commands that only run in the terminal UI (such as `/login`) are unavailable in `-p`.

## Limits
- Living vendor documentation. It describes flags and events; it reports no failure rates and describes no watchdog for a main session that makes no progress (stall handling for streams and subagents is on other pages).
- It does not say what `subtype`, `is_error` or `stop_reason` a result carries after a denied permission request; that is inferred from the agent-loop page and from the repos' own runs.

## Bears on repo claims
- Print mode answers no permission prompt and denies it: supported (sections "Auto-approve tools", "Turn off permission prompts"). Hooks in a project's settings run in `-p` unless `--bare`: supported.
- "`claude -p` completes and kills background agents": the page now says the run stays open for background commands, subagents and workflows (up to the 10-minute ceiling); the changelog dates the earlier behaviour (see code-docs-changelog-unattended).
- `--bare` drops CLAUDE.md: supported.

## Used in
- research/synthesis/field-6.md

## Also (question 7)
Read for question 7 (guardrails); as of October 2026; I opened the whole page.
- Section "Start faster with bare mode": without `--bare`, a `-p` session runs the hooks in a project's `.claude/settings.json` and connects the servers in its `.mcp.json`, "even in a folder you've never trusted", with no trust dialog. With `--bare`, hooks, skills, plugins, MCP servers and CLAUDE.md are not discovered. The page says `--bare` "is the recommended mode for scripted and SDK calls, and will become the default for `-p` in a future release", which would stop project hook guards firing in `-p` unless they are passed with `--settings`.
- "Auto-approve tools" and "Turn off permission prompts": `dontAsk` denies every call that would otherwise prompt and is described as useful for locked-down CI; in a `-p` run with no permission host, prompts are denied either way; denials appear as `permission_denied` system messages and in `permission_denials` of the final result.
- Section "Stop a run with SIGTERM": on SIGTERM Claude Code terminates the process tree of any running Bash command, then runs only `SessionEnd` hooks.

Used in: research/synthesis/field-7.md

## Also (question 10)
Re-read on 2026-10-14 for billing and denials. As of October 2026.
- Section "Start faster with bare mode": `--bare` skips auto-discovery of hooks, skills, commands, subagents, plugins, MCP servers, auto memory and CLAUDE.md. The example says to set `ANTHROPIC_API_KEY` first, "because bare mode doesn't use your subscription login"; bare mode never reads OAuth credentials or the keychain, so it needs `ANTHROPIC_API_KEY` or an `apiKeyHelper` (Bedrock, Google Cloud and Foundry credentials still work). Bare mode sends no system reminders and runs no background tasks (stated for v2.1.286 or later). The page calls `--bare` the recommended mode for scripted and SDK calls and says it will become the default for `-p` in a future release.
- With `--output-format json` the response includes `total_cost_usd` and a per-model breakdown, which the page calls client-side estimates that can differ from the bill.
- Section "Turn off permission prompts in unattended runs": in a `-p` run with no permission host, requests that would prompt are denied; Claude is told nobody can approve and not to retry; the run continues; with `stream-json` the denials appear as `permission_denied` system messages and the result lists them in `permission_denials`. The page does not say what a subagent does after its own denial.
- Used in (question 10): research/synthesis/field-10.md
