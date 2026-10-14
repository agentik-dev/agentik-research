---
url: https://code.claude.com/docs/en/agent-sdk/overview
title: "Agent SDK overview"
author: Anthropic (Claude Agent SDK documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026 the Agent SDK is a library, in Python and TypeScript, that runs the Claude Code binary with Claude Code's built-in tools, permissions, sessions, hooks, subagents, MCP, skills and plugins. To drive the same loop from another language the page says to run the CLI as a subprocess with `-p` and `--output-format json`.
- It separates four ways to run an agent: the Agent SDK (embedded, in a process you operate), the CLI, the Client SDK (you write the tool loop) and Managed Agents (a hosted agent harness with sessions in an Anthropic-managed or self-hosted sandbox).
- Note: unless previously approved, Anthropic does not allow third-party developers to offer claude.ai login or rate limits for products built on the SDK; the page says to use API key authentication.
- Changelogs and bug reports for both SDKs are kept in their GitHub repositories (linked from the page).

## Limits
- An index page: it names capabilities and links to the pages that hold the detail (agent loop, hooks, permissions, sessions, cost tracking).

## Used in
- research/synthesis/field-6.md
