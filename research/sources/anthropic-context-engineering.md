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

## Also (question 3)
- Hybrid retrieval (section on context retrieval and agentic search): the post describes pre-loading some data for speed and exploring just in time, and names Claude Code as doing so, with CLAUDE.md files dropped in up front and glob and grep fetching the rest. It adds that runtime exploration is slower than retrieving pre-computed data and needs well-designed tools.
- Progressive disclosure: agents discover context step by step, using file names, sizes and timestamps as signals, and hold in working memory only what is needed. The post gives no token threshold for what to pre-load.
- Structured note-taking and the memory tool: notes kept outside the window (a to-do list, a NOTES.md file) are pulled back in later; the post says a file-based memory tool entered public beta alongside Claude Sonnet 4.5.
- System prompt "right altitude": the post warns against both hard-coded brittle logic and vague guidance and says to start minimal and add instructions against observed failure.

## Also (question 5)
- Sub-agent architectures (the post's section on them): a main agent keeps a high-level plan while specialized sub-agents work on focused tasks in their own fresh context windows. A sub-agent may use tens of thousands of tokens or more exploring, and returns a condensed summary the post says is often 1,000 to 2,000 tokens, which the lead synthesizes. The post calls this a clear separation of concerns: detailed search context stays in the sub-agents.
- It cites Anthropic's multi-agent research system post as evidence, saying the pattern "showed a substantial improvement over single-agent systems on complex research tasks" (anthropic-engineering-multi-agent-research).
- Choosing: multi-agent architectures for complex research and analysis where parallel exploration pays off; compaction for long back-and-forth; note-taking for iterative work with milestones.
- Limits: advice with no measurement of its own; the 1,000 to 2,000 token figure is described as typical ("often"), not a guarantee. Used in: research/synthesis/field-5.md
