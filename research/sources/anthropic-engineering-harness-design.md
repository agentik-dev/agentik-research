---
url: https://www.anthropic.com/engineering/harness-design-long-running-apps
title: "Harness design for long-running application development"
author: Prithvi Rajasekaran (Anthropic Labs)
published: 2026-03-24
accessed: 2026-10-14
kind: reported
---

## What it says
- Defines two ways to continue past a full window. A context reset clears the window and starts a fresh agent with a structured handoff carrying the prior agent's state and next steps. Compaction summarizes earlier conversation in place so the same agent continues on a shortened history. In the post's words, "compaction preserves continuity, it doesn't give the agent a clean slate."
- With Sonnet 4.5 the author saw "context anxiety": the model wrapped up work early as it neared what it believed was its context limit. That was strong enough that compaction alone was not sufficient, so resets were essential to the harness.
- The trade: resets add orchestration complexity, token overhead and latency, and the handoff must hold enough state for the next agent to continue cleanly.
- With Opus 4.5 the behavior largely went away: "Opus 4.5 largely removed that behavior on its own, so I was able to drop context resets from this harness entirely." The build then ran as one session with automatic compaction. With Opus 4.6 the author removed the sprint construct and kept the evaluator only for work beyond the model's solo reach; the builder ran coherently for over two hours.
- Run figures in the post: a retro game maker took 20 minutes and cost $9 solo versus 6 hours and $200 for the full harness (Opus 4.5); a build the post abbreviates as DAW, on the updated harness (Opus 4.6), took 3 hours 50 minutes and cost $124.70.

## Limits
- The post does not state how many runs each configuration had; each prompt reads as a single comparison. The finding is model-dependent and dated: it favours resets for one model generation and compaction for the next, so it cannot settle the question for today's models. Run figures are as of March 2026.

## Used in
- research/synthesis/field-2.md
