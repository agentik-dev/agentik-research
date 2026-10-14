---
url: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
title: "Effective context engineering for AI agents"
author: Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, Jeremy Hadfield (Anthropic Applied AI team), with contributions from Rafi Ayub, Hannah Moran, Cal Rueb, Connor Jennings
published: 2025-09-29
accessed: 2026-10-14
kind: documented
---

## What it says
- Defines context rot: as the number of tokens in the window grows, the model's accuracy at recalling information from it drops. Some models degrade more gently, but the post says the pattern appears across all models. It calls context "a finite resource with diminishing marginal returns".
- Introduces the "attention budget": each new token uses some of it. The post ties this to the transformer's n-squared pairwise token relationships and to models having less training experience with very long sequences. These are the authors' architectural explanations; the post shows no measurement of its own.
- Guiding principle: find the smallest set of high-signal tokens that makes the desired outcome most likely.
- System prompts: aim for the "right altitude" between brittle hard-coded rules and vague guidance; start minimal and add against observed failures. Tools: few, non-overlapping, with token-efficient returns.
- Just-in-time retrieval: keep lightweight references (paths, queries) and load at run time. The post says Claude Code uses a hybrid: CLAUDE.md files are dropped into context up front, and glob and grep fetch the rest on demand.
- Long-horizon techniques: compaction (summarize near the limit and restart with the summary plus the five most recently accessed files; tune for recall first); tool-result clearing as "one of the safest lightest touch forms of compaction"; structured note-taking to a file outside the window; sub-agents that return a summary of about 1,000 to 2,000 tokens.
- Choosing: compaction for long back-and-forth; note-taking for iterative work with milestones; multi-agent for parallel research.

## Limits
- An engineering essay with no data of its own. The context-rot claim rests on needle-in-a-haystack studies the post names but does not cite by title.
- Vendor guidance written around Anthropic's own products. Dated September 2025; model names and features have moved since.
- The sibling repository's note on this post (agentik-respeak research) was used only for leads; this note is from a fresh open of the page.

## Used in
- research/synthesis/field-1.md
