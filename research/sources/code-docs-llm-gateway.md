---
url: https://code.claude.com/docs/en/llm-gateway
title: "Other LLM gateways (section: Subscriptions and gateways)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Subscriptions and gateways", as of October 2026: while a gateway credential variable or an `apiKeyHelper` is active, requests carry that credential in place of the developer's claude.ai login, and the subscription's usage limits do not apply to them. The login stays saved on the machine but is not sent. That traffic is billed per token to whoever owns the credential the gateway forwards (a Console organization, or a Bedrock, Google Cloud or Foundry account).
- `ANTHROPIC_BASE_URL` alone, without a gateway credential, does not replace the subscription: requests go through the gateway, but the saved claude.ai login remains the active credential, so its usage limits and billing apply. A gateway that passes such traffic to Anthropic must forward the OAuth capability in the `anthropic-beta` header.
- Anthropic says it does not endorse, maintain or audit third-party gateway products, and "doesn't support routing Claude Code to non-Claude models through any gateway." (Page intro.)
- A gateway gives one place for credentials, usage tracking by developer or team, budgets and rate limits, audit logs and provider switching. The tradeoff is that the organization operates it, and a gateway that does not forward new Claude Code capabilities breaks the matching features.
- `allowedProviders` in managed settings (Claude Code v2.1.285 or later) can restrict a managed machine to a gateway reached through `ANTHROPIC_BASE_URL`.

## Limits
- Vendor documentation, as of October 2026. It is about organisation gateways; it does not discuss a single user's loopback router for local models.

## Used in
- research/synthesis/field-10.md
- docs/summary.md
