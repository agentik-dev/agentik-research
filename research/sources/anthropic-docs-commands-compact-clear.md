---
url: https://code.claude.com/docs/en/commands
title: "Commands (rows for /compact, /clear, /autocompact, /recap)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read 2026-10-14)
accessed: 2026-10-14
kind: documented
---

## What it says
- `/compact [instructions]` frees context by summarizing the conversation so far; optional focus instructions steer the summary.
- `/clear [name]` starts a new conversation with empty context. The previous conversation stays reachable with `/resume`, or from the rewind menu in the same process. Aliases: `/reset`, `/new`. The row says to use `/compact` to free context while continuing the same conversation.
- `/autocompact [auto|<tokens>]` sets the auto-compact window and saves it to user settings.
- `/recap` generates a one-line summary of the current session on demand.

## Limits
- A reference table; it does not compare the commands on what each loses.

## Used in
- research/synthesis/field-2.md
