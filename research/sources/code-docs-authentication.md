---
url: https://code.claude.com/docs/en/authentication
title: "Authentication"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Authentication precedence", as of October 2026, in order: cloud provider credentials (`CLAUDE_CODE_USE_BEDROCK`, `CLAUDE_CODE_USE_VERTEX`, `CLAUDE_CODE_USE_FOUNDRY`); `ANTHROPIC_AUTH_TOKEN`; `ANTHROPIC_API_KEY`; `apiKeyHelper`; `CLAUDE_CODE_OAUTH_TOKEN`; Anthropic profile and federation credentials; then subscription OAuth credentials from `/login`, which is the default for Pro, Max, Team and Enterprise users.
- `ANTHROPIC_API_KEY`: in interactive mode Claude Code asks once whether to use the key and remembers the answer; in non-interactive mode (`-p`) the page says the key "is always used when present". With an active subscription and the variable set, Claude Code uses the key once approved, which can fail if the key belongs to a disabled or expired organization. `unset ANTHROPIC_API_KEY` returns to the subscription; `/status` shows which method is active.
- Section "Generate a long-lived token": `claude setup-token` prints a one-year OAuth token for CI that authenticates with the subscription (Pro, Max, Team or Enterprise plan), set as `CLAUDE_CODE_OAUTH_TOKEN`. That token can only make model requests, so it cannot establish Remote Control sessions or fetch claude.ai connectors. Bare mode does not read it; a `--bare` script must use `ANTHROPIC_API_KEY` or an `apiKeyHelper`.
- Cloud sessions always use subscription credentials; `ANTHROPIC_API_KEY` or `ANTHROPIC_AUTH_TOKEN` set in a cloud environment does not override them.
- Section "Log in with multiple accounts": a separate `CLAUDE_CONFIG_DIR` per account keeps separate settings, history and login.
- Section "Claude Console authentication": a Console sign-in without an API key is available from v2.1.242; the Claude Code role can create only Claude Code API keys and the Developer role any key. Features that need a claude.ai login (connectors, `/schedule`) are not available when a profile or federation credential is selected.
- `apiKeyHelper`, `ANTHROPIC_API_KEY` and `ANTHROPIC_AUTH_TOKEN` apply to the CLI and the surfaces that wrap it, including the Agent SDK and GitHub Actions; cloud sessions and Claude Desktop use OAuth.

## Limits
- Vendor documentation, as of October 2026. It names the credential order but gives no billing figures.

## Used in
- research/synthesis/field-10.md
