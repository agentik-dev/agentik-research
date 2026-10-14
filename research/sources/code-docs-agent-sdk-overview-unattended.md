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

## Also (question 10)
Re-read on 2026-10-14 for authentication and billing. As of October 2026.
- The page's note says: unless previously approved, Anthropic does not allow third-party developers to offer claude.ai login or rate limits for products built on the SDK, and it points to API key authentication instead. The page states no price for SDK use; billing follows the credential (see code-docs-authentication) and, for Max and Team plans, the monthly API credits (anthropic-api-credits-subscribers) and the help article (support-claude-agent-sdk-plan).
- Used in (question 10): research/synthesis/field-10.md
