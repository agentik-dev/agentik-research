---
url: https://code.claude.com/docs/en/interactive-mode
title: "Interactive mode (section: Wait for a usage limit to reset)"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026; feature requires Claude Code v2.1.234 or later)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Wait for a usage limit to reset", as of October 2026: when a claude.ai usage limit stops Claude mid-task, Claude Code waits in the open session and continues the task after the reset. Automatic continue is on by default in interactive sessions signed in with a claude.ai subscription. It needs Claude Code v2.1.234 or later.
- At the reset Claude Code prompts Claude to pick the task up where it stopped; it does not resend the last message. If the computer slept for more than about 30 minutes and the limit reset meanwhile, it shows "Press enter to continue" instead of continuing alone.
- If the continued task hits the limit again, Claude Code re-arms the wait at most twice in a row, then stops with a message that points to `/rate-limit-options`.
- The wait ends without continuing if you send a prompt, exit Claude Code (it does not restart on resume), switch accounts, clear or rewind, resume another session, or hand the session elsewhere; also if the setting is turned off or the reset is more than 24 hours away (this ends only a wait Claude Code started itself).
- Claude Code does not start the wait by itself in Remote Control and agent-team teammate sessions, for a reset more than 24 hours away (a weekly limit can reset days out), or for an Opus or Sonnet limit while you run a model outside that family. A person can still pick "Wait here, then continue automatically" from `/rate-limit-options`.
- Claude Code does not offer the wait at all for background sessions and `-p` runs, for API keys, cloud providers and usage-based billing (no reset to wait for), or behind a gateway without a saved claude.ai login.
- Turning it off: `/config` row "Continue automatically at usage limit", or `autoContinueAtUsageLimit: false`. The page says `/config autoContinueAtUsageLimit=false` works even with `-p`, but the `key=value` form cannot turn it back on, "because the setting grants unattended execution."
- Prompt suggestions are short background requests that reuse the prompt cache and count toward plan limits; Claude Code skips them when the account is close to or at its usage limit; setting `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION` to `true` keeps them on until the limit is reached.

## Limits
- WebFetch saved the page's full text to a file because of its size; I read this section from that file. Behaviour is as of October 2026.
- No measurement; the page does not say how long a typical wait is.

## Used in
- research/synthesis/field-4.md
