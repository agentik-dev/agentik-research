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

## Also (question 5)
Read for the generator and evaluator roles.
- The harness splits work between a generator (builds the output) and an evaluator (grades it and returns critiques), a structure the post calls GAN-inspired, with a planner that expands a one-to-four sentence prompt into a product spec.
- Why separate them: agents asked to judge their own work tend to praise it, most clearly on subjective tasks such as design. The evaluator is still an LLM that leans generous toward LLM output, but the post says tuning a standalone evaluator to be skeptical is far more tractable than making a generator critical of its own work.
- The evaluator drives the live app with the Playwright MCP server, grading against criteria with hard thresholds (full-stack criteria were product depth, functionality, visual design and code quality; falling below any one failed the sprint). Before each sprint the generator and evaluator agreed a contract through files; sprint 3 alone had 27 criteria.
- Evaluator failures: it found real issues and then talked itself into approving; it tested obvious paths and missed subtler bugs; even after tuning it missed small layout problems and bugs in deeply nested features. The author read its logs and tuned the prompt over several rounds.
- Cost (Opus 4.5, retro game maker): solo 20 minutes and 9 dollars against the full harness 6 hours and 200 dollars; the solo run's core game feature did not work and the harness's did. On Opus 4.6 the sprint construct was dropped and the post says the evaluator earns its cost only when the task sits beyond what the current model does reliably alone; for tasks inside the model's solo reach it became overhead.
- Limits: single runs by one author, no count of runs per configuration, model-specific (Opus 4.5 and 4.6, as of March 2026). Used in: research/synthesis/field-5.md

## Also (question 8)
Re-opened on 2026-10-14 (post dated 24 March 2026, by Prithvi Rajasekaran of Anthropic Labs).
- Self-grading (section on why a separate evaluator): the post says agents "reliably skew positive when grading their own work." A standalone evaluator is still a model that leans generous, but the post says tuning it to be skeptical is more tractable than making a generator critical of its own output.
- Tuning: for front-end work, few-shot examples with score breakdowns reduced score drift across iterations; for full-stack work the author read evaluator logs, found where its verdict differed from his own, and revised its prompt over several rounds. Out of the box it found real issues, argued itself out of them and approved; after tuning it still missed small layout issues and bugs in deeply nested features.
- Sign-off bar: before each sprint the generator and evaluator agreed a contract of testable criteria (27 in one sprint); each criterion had a hard threshold and a miss on any one failed the sprint. Front-end runs took 5 to 15 iterations (up to four hours). After the model upgrade the sprint construct was dropped and the evaluator ran once at the end of each of three build rounds. The post says the evaluator is worth its cost only when the task is beyond what the current model does reliably alone.
- Limits (question 8): one author's runs, no count of runs per configuration, no figure for how often the evaluator's verdict was wrong. Model-specific and dated March 2026.
- Used in (question 8): research/synthesis/field-8.md
