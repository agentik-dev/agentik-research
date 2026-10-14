---
url: https://code.claude.com/docs/en/changelog
title: "Claude Code changelog (entries on print mode, background work, budgets, hangs and locks)"
author: Anthropic (Claude Code documentation; the same text is published as CHANGELOG.md in the anthropics/claude-code repository)
published: undated page; newest entry read is v2.1.296, dated 9 October 2026
accessed: 2026-10-14
kind: documented
---

## What it says
Entries are quoted by version; dates come from the docs page headings where I could open them. Version-only entries had no date in the part I read.
- `claude -p` and background work. v2.1.163 (4 June 2026): fixed `claude -p` hanging forever after its final result when a backgrounded command never exits; background shells are now stopped about 5 seconds after the result once stdin closes. v2.1.257: `claude -p` no longer exits about 5 seconds after its final result while an armed Monitor is running. v2.1.292 (6 October 2026): one-shot `claude -p` and Agent SDK runs no longer stop a background command 5 seconds after the final result, and scheduled wakeups are no longer dropped; both are now waited for. v2.1.295 (8 October 2026): stderr (on a terminal) says what a `-p` run that stays open is waiting for. v2.1.280 (22 September 2026): messages sent to a background subagent could be silently lost in headless and SDK sessions when the subagent was finishing its turn (fixed).
- Budgets and turns. v2.1.217 (21 July 2026): `--max-budget-usd` did not stop background subagents; once the cap is reached new spawns are denied and running background agents are halted (fixed); subagents stopped nesting by default. v2.1.281 (23 September 2026): fixed a turn that could retry indefinitely, ignoring `--max-turns`, when the model alternated unparseable tool calls and output-limit truncation. v2.1.277 (18 September 2026): headless resumes no longer start cost totals at zero; `claude -p` and SDK sessions that could hang with no result after an internal error now report it and exit with code 1. v2.1.296 (9 October 2026): `--max-budget-usd` prices Sonnet 5.5 cache reads at 0.10 US dollars per million tokens (was 0.20).
- Permissions. v2.1.259: added `--permission-prompts none` for unattended headless hosts. v2.1.269 (11 September 2026): `permission_denials` in `stream-json` results had omitted Read, Edit and Write calls blocked by a path-scoped deny rule (fixed). v2.1.285: with `--permission-prompt-tool`, a background subagent's permission request goes to the prompt tool instead of being auto-denied.
- Hooks. v2.1.295: `onFailure: "block"` for command and HTTP hooks, so a hook that cannot start, times out or exits unexpectedly blocks the action; by default such a hook lets it through.
- Stalls and watchdogs. v2.1.143: false-positive worker-stall detection for background agents after host sleep (fixed); v2.1.290: background agents no longer fail with "Agent stalled" after a Mac wakes from sleep; v2.1.288 (2 October 2026): unattended sessions with the retry watchdog no longer retry for hours after a very long stream fails and give up after three timeouts; v2.1.295: `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS`.
- Worktree locks. v2.1.187: locked `.git/worktrees/` entries leaked by killed agents are cleaned up automatically. v2.1.210 (14 July 2026): killed background sessions no longer leave a permanent `git worktree lock`; a periodic sweep releases locks whose owner process is gone. v2.1.248: a backgrounded worktree session holds the worktree's lock while it runs, so cleanup leaves it alone.
- Bare mode. v2.1.286: `--bare` connects only command-line MCP servers, sends no system reminders and starts no background tasks; a command that reaches its timeout stops instead of moving to the background. v2.1.288 (2 October 2026): the background-command time limit applies only in unattended sessions.
- Nested sessions. v2.1.154: stdio MCP server subprocesses receive `CLAUDE_CODE_SESSION_ID` and `CLAUDECODE=1`.

## Limits
- I read the changelog text from the claude-code repository's CHANGELOG.md (fetched with a command-line download and searched by keyword) and confirmed headings and dates for the versions marked above on the docs page, which is about 1 MB. Versions I list without a date were not opened on the docs page. A few entries (v2.1.259, v2.1.285, v2.1.143, v2.1.187, v2.1.248, v2.1.257, v2.1.154) are paraphrased from the repository file only.
- Another note on this URL (code-docs-changelog-budgets) covers question 4 entries from the top of the page.

## Bears on repo claims
- Claim (b), that a `-p` run completes and kills background work when the model emits its final output: the changelog dates this behaviour for background shells to v2.1.163 (June 2026) through v2.1.291, with the fix to wait in v2.1.292 (6 October 2026). A run on v2.1.269 or v2.1.280 therefore predates the fix.
- Claim (d): a `--max-turns` bypass existed until v2.1.281; the cap overshoot on `--max-budget-usd` is documented separately (agent-loop page).
- Claim (h): the changelog shows stall detection exists for background agents and streams; no entry describes a watchdog for a main session that makes no progress.

## Used in
- research/synthesis/field-6.md
