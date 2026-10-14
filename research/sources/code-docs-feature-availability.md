---
url: https://code.claude.com/docs/en/feature-availability
title: "Feature availability"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Features that require a Claude subscription", as of October 2026: cloud sessions and mobile, Slack, Desktop, routines (`/schedule`), Ultrareview, Code Review (Team and Enterprise), Remote Control, the Chrome extension, computer use, Artifacts and voice dictation need a claude.ai sign-in and are not reachable with a Console API key or from a cloud provider.
- Section "Availability by model provider", closing note: through an LLM gateway, availability matches the provider the gateway forwards to, "except for the features Claude Code itself turns off." Whenever `ANTHROPIC_BASE_URL` points at a host other than `api.anthropic.com`, Claude Code turns off features such as Remote Control and server-managed settings (paraphrase). MCP tool search is off by default behind a non-first-party base URL.
- Table "CLI capabilities that vary by provider": web search is not available on Amazon Bedrock; fast mode and the advisor are available only on a subscription (fast mode with usage credits) or the Anthropic Console, not on Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform or Foundry; analytics dashboard and server-managed settings are not available on the cloud providers.
- Features on every provider: the CLI and Agent SDK, subagents, hooks, skills, CLAUDE.md memory, plugins, MCP servers, checkpoints, sandboxing and OpenTelemetry metrics. When the main conversation runs Fable, the built-in Explore subagent runs on Opus under a subscription, Console account or `ANTHROPIC_BASE_URL` gateway, and on Fable on other providers.
- Section "Model availability": prompt caching works the same on most providers; on Amazon Bedrock support varies by model.

## Limits
- Vendor documentation, as of October 2026. The page lists voice dictation under "requires a claude.ai sign-in" but does not say whether a custom base URL alone disables it (the connect page ties it to the credential variables; see code-docs-llm-gateway-connect).

## Used in
- Read for question 10 and kept for the site pages on cost lanes; research/synthesis/field-10.md does not cite it (the synthesis has a 9,000-byte cap).
