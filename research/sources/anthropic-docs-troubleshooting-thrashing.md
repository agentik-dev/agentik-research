---
url: https://code.claude.com/docs/en/troubleshooting
title: "Troubleshooting (section: Auto-compaction stops with a thrashing error)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read 2026-10-14)
accessed: 2026-10-14
kind: documented
---

## What it says
- The error reads `Autocompact is thrashing: the context refilled to the limit...`. Automatic compaction succeeded, but a file or tool output immediately refilled the window several times in a row, so Claude Code stops retrying.
- Recovery in four steps: read the oversized file in chunks; run `/compact` with a focus that drops the large output (example: `/compact keep only the plan and the diff`); move the large-file work to a subagent; run `/clear` if the earlier conversation is no longer needed.
- If the error returns after `/clear`, compare the `Messages` row of `/context` with the other rows: either new output is refilling the window, or what loads at session start leaves too little room.
- In the same page, restarting Claude Code does not lose the conversation: `claude --continue` resumes it. A memory warning at 2.5GB of heap suggests a restart and `claude --continue` in a fresh process.

## Limits
- Documents a failure of compaction, not its fidelity. The changelog dates the guard: see anthropic-changelog-compaction (a detector for three refills in a row in 2.1.89).

## Used in
- research/synthesis/field-2.md
