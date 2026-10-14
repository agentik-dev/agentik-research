---
url: https://code.claude.com/docs/en/hooks
title: "Hooks reference (Common fields: timeout; section: Timeouts)"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Common fields, `timeout` row, as of October 2026: seconds before canceling. Defaults: "600 for `command`, `http`, and `mcp_tool`; 30 for `prompt`; 60 for `agent`." Claude Code lowers the command, http and mcp_tool default to 30 on `UserPromptSubmit`, `PreModelSwitch` and `PostModelSwitch`, and to 10 on `MessageDisplay`. `SessionEnd` hooks share a 1.5-second budget, raised to match a longer per-hook `timeout` up to 60 seconds. A hook run with `async: true` is not timed.
- Section "Timeouts": Claude Code cancels a command, http or mcp_tool hook that reaches its timeout and discards its output, so on most events a timed-out hook renders no decision. A timed-out `PreToolUse` hook does not block the tool call (it continues through the normal permission flow) unless the hook sets `"onFailure": "block"`; a canceled `PreModelSwitch` hook blocks the switch; an Agent SDK callback hook that exceeds its timeout blocks the tool call.
- Hook output is capped at 10,000 characters; over that, Claude Code saves it to a file and passes a preview of up to 2,000 characters.

## Limits
- I read the first 100,000 of 268,801 characters. The default of 600 seconds for a command hook is the page's own figure, and no other default for command hooks appears in the part I read. As of October 2026; the changelog lists `onFailure: "block"` as new in v2.1.295.

## Used in
- research/synthesis/field-4.md
