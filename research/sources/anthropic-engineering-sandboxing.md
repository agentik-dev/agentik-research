---
url: https://www.anthropic.com/engineering/claude-code-sandboxing
title: "Beyond permission prompts: making Claude Code more secure and autonomous"
author: David Dworken and Oliver Weller-Davies, with named contributors (Anthropic)
published: 2025-10-20
accessed: 2026-10-14
kind: documented
---

## What it says
- Two boundaries built on operating-system features: filesystem isolation (read and write only in the working directory) and network isolation (traffic through a proxy outside the sandbox that restricts domains and asks the user to confirm new ones). The post says effective sandboxing needs both.
- One number: sandboxing cut permission prompts by 84%, "based on Anthropic's internal usage"; no sample size or method is given.
- The sandboxed bash tool's runtime was released as an open-source research preview. In Claude Code on the web, sensitive credentials such as git credentials and signing keys are kept outside the sandbox.

## Limits
- A vendor post on its own product; the 84% figure has no stated method, so it is a claim, not a study. The post is from October 2025; the docs page has since added modes and escape hatches (see code-docs-sandboxing-guardrails).

## Used in
- research/synthesis/field-7.md
