---
url: https://www.anthropic.com/research/measuring-agent-autonomy
title: "Measuring AI agent autonomy in practice"
author: Anthropic (Miles McCain, Thomas Millar, Saffron Huang and others, as the page lists them)
published: 2026-02-18
accessed: 2026-10-14
kind: measured
---

## What it says
- Claude Code auto-approve rate: about 20% of sessions for new users (under 50 sessions), rising to over 40% of sessions by 750 sessions. Interrupt rate: about 5% of turns for new users (around 10 sessions), rising to about 9% of turns for experienced users.
- On the most complex tasks Claude stops to ask for clarification more than twice as often as on minimal-complexity tasks, and more than twice as often as humans interrupt it (Figure 4: n = 500,000 interactive sessions, 95% confidence interval under 0.9%).
- The 99.9th-percentile turn rose from under 25 minutes (late September to October 2025) to over 45 minutes (January 2026); the median turn is about 45 seconds.
- Public API sample of 998,481 tool calls: about 0.8% of actions appear irreversible; 80% of tool calls come from agents with at least one safeguard; 73% appear to have a human in the loop.
- The authors argue that mandating a pattern such as human approval of every action "will create friction without necessarily producing safety benefits"; oversight should mean being able to intervene when it matters.

## Limits
- One provider, one product for the Claude Code data, Claude-generated labels that cannot be fully inspected, a late 2025 to early 2026 window, and API data on isolated calls rather than sessions. Observational; it does not test whether any guardrail prevents harm.

## Used in
- research/synthesis/field-7.md
