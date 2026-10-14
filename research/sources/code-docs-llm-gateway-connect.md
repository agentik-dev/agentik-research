---
url: https://code.claude.com/docs/en/llm-gateway-connect
title: "Connect Claude Code to an LLM gateway"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Slack, cloud sessions, and Remote Control", as of October 2026: Remote Control and voice dictation both rely on a claude.ai identity. Both are unavailable while `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN` or an `apiKeyHelper` is active. Remote Control is also disabled while `ANTHROPIC_BASE_URL` points at a non-Anthropic host, so a claude.ai sign-in is not enough on its own.
- The restore steps in the same section differ: for voice dictation, unset the gateway credential; for Remote Control, unset the gateway credential and `ANTHROPIC_BASE_URL`. So the page ties voice dictation to the credential, not to the base URL.
- Section "Conflicts with an existing login": a gateway credential variable takes precedence over a saved claude.ai login or Console key; with `ANTHROPIC_AUTH_TOKEN` it applies at once, with `ANTHROPIC_API_KEY` only after a one-time approval prompt in interactive mode. `/status` shows which source is active.
- Sections "Configure each surface" and "Send additional headers": the desktop app reads gateway routing from its own configuration, not from `ANTHROPIC_BASE_URL`, and with a gateway configuration the environment picker drops Anthropic-hosted cloud environments and Remote Control. The Agent SDK has no gateway options; it passes environment variables to the spawned Claude Code process.
- Section "Turn off traffic outside the gateway path": with `ANTHROPIC_BASE_URL` set and a credential variable or `apiKeyHelper` also active, Claude Code does not report usage metrics to the Console analytics dashboard. `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` turns off auto-updates and the fast mode availability check, among other things.
- Troubleshooting table (as of October 2026): a gateway that enforces a smaller context than the model's window makes Claude Code miss its "too long" recovery; set `CLAUDE_CODE_AUTO_COMPACT_WINDOW` to the gateway's limit (clamped to at least 100,000 tokens). Behind an `ANTHROPIC_BASE_URL` gateway the `ANTHROPIC_DEFAULT_*_MODEL_SUPPORTED_CAPABILITIES` variables do not apply. Gateway model discovery is opt-in (`CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1`).

## Limits
- Vendor documentation, as of October 2026. The page does not mention local models. It does not say what happens to voice dictation when only a base URL is set, beyond the restore steps above.

## Used in
- research/synthesis/field-10.md
