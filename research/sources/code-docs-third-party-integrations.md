---
url: https://code.claude.com/docs/en/third-party-integrations
title: "Enterprise deployment overview"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Table "Compare deployment options", as of October 2026: Teams is a per-seat subscription with pay-as-you-go available, Enterprise is by contact with sales, the Anthropic Console, Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform and Microsoft Foundry are pay-as-you-go through their own bills. Prompt caching is on by default for all six. Cost tracking lives in the usage dashboard (Teams, Console), AWS Cost Explorer, GCP Billing or Azure Cost Management. Only the Teams and Enterprise column includes Claude on the web.
- Section "Pin model versions for cloud providers": without `ANTHROPIC_DEFAULT_FABLE_MODEL`, `ANTHROPIC_DEFAULT_OPUS_MODEL`, `ANTHROPIC_DEFAULT_SONNET_MODEL` and `ANTHROPIC_DEFAULT_HAIKU_MODEL`, aliases resolve to Claude Code's built-in default for that provider, which can lag the newest release and may not be enabled in the account.
- Section "Configure proxies and gateways": a corporate proxy (`HTTPS_PROXY`) and an LLM gateway (`ANTHROPIC_BASE_URL` or a provider-specific base-URL variable) are different configurations and can be used together. With a gateway or custom base URL, customer-managed encryption keys do not apply to Claude Code's operational telemetry.

## Limits
- Vendor documentation, as of October 2026; no prices on the page. Pricing detail is on the pricing pages (anthropic-pricing-doc, claude-pricing-plans).

## Used in
- research/synthesis/field-10.md
