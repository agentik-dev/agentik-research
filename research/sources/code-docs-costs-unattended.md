---
url: https://code.claude.com/docs/en/costs
title: "Manage costs effectively (organization spend controls, scheduled and background usage)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Manage costs for your organization", as of October 2026: the control depends on how Claude Code is reached. Claude Console (API): workspace spend limits on total Claude Code spend and cost reporting; a "Claude Code" workspace is created automatically and a workspace rate limit can cap its share of the organization's API limits. Claude for Teams and Enterprise: usage draws from a per-seat allowance that resets on a rolling five-hour window and a weekly window; spend limits can be set at organization, group or member level once usage credits are on. Amazon Bedrock, Google Cloud's Agent Platform or Microsoft Foundry: spend controls live in the cloud provider's billing console, and a self-hosted Claude apps gateway can add per-user spend limits.
- Rate limit recommendations (tokens and requests per minute per user) fall as team size grows: 200k to 300k TPM and 5 to 7 RPM per user for 1 to 5 users, down to 10k to 15k TPM and 0.25 to 0.35 RPM per user for 500 or more users; the limits apply at organization level, so one user can temporarily exceed a calculated share.
- `--max-budget-usd` and the cost figures are estimates priced locally (list price unless a `modelPricing` managed setting is set; that setting changes what Claude Code reports, not what Anthropic charges). With the 1.1x data-residency rate, the multiplied figure also counts toward `--max-budget-usd`.
- Section "Why usage climbs in a long session": a scheduled task fires on its interval even while the session is idle and sends the full context each time; goal check-ins start new turns while background work keeps a goal waiting (at most three idle check-ins per goal between prompts, v2.1.236 and later); every subagent and every workflow agent sends its own requests; agent teammates keep consuming tokens until they exit.
- `/usage` shows a "Loops" row for the heaviest scheduled tasks by total tokens (v2.1.242 or later), computed from local session history on one machine.
- Agent teams use roughly 7 times the tokens of a standard session when teammates run in plan mode (the page's figure, no method given).
- Background token use is small: summarisation and status commands typically cost under 0.04 US dollars per session.

## Limits
- Vendor documentation. It names controls; it does not report how often a cap stopped a runaway run. Another note on this URL (code-docs-costs) covers question 4.

## Used in
- research/synthesis/field-6.md
