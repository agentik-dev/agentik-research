---
url: https://cognition.com/blog/dont-build-multi-agents
title: "Don't Build Multi-Agents"
author: Walden Yan (Cognition)
published: 06.12.25 as printed on the page (day and month order not stated)
accessed: 2026-10-14
kind: reported
---

## What it says
- Treats reliability over long runs as the central problem, with context engineering as the main defense.
- For very long tasks it proposes a separate model that compresses the history of actions and conversation into key details, events and decisions. Getting that right "takes investment into figuring out what ends up being the key information", and the author says Cognition has fine-tuned a smaller model for the role.
- Says compression extends how long an agent can work but still hits a limit, and managing arbitrarily long contexts is an open problem.
- Does not say how often summaries lose decisions; the difficulty of picking the key information is the implied risk.

## Limits
- Opinion from a vendor with a product in this area; no measurement. Its main thesis is about multi-agent design, and the compression passage is a few lines.

## Used in
- research/synthesis/field-2.md
