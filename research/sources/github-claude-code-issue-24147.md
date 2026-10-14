---
url: https://github.com/anthropics/claude-code/issues/24147
title: "Cache read tokens consume 99.93% of usage quota - architectural scaling issue with CLAUDE.md re-reads (issue 24147)"
author: Issue reporter, with later commenters
published: 2026-02-08
accessed: 2026-10-14
kind: reported
---

## What it says
- Original report: 30 days of transcripts, 9 January to 8 February 2026, Claude Code 2.1.37 with Opus 4.5 and 4.6 on macOS: 3,887,759 input and output tokens, 5,092,500,074 cache read tokens, 176,498,498 cache creation tokens; cache reads were 99.93 percent of all tokens, 1,310 reads per input or output token. CLAUDE.md was about 57 KB (about 15,000 tokens); sessions were 50 to 150 messages. The core claim: each message re-sends the full instruction set and history as cached context, and cache reads count toward the quota.
- No Anthropic maintainer reply on the page; only a bot comment. The issue is open.
- Later self-reported comments: a 25 March comment gave cache reads as 97.7 percent of session cost, 1.47 US dollars API-equivalent against 64.98 billed; an April comment on AWS Bedrock reported daily spend rising from 10 to 15 dollars to 60 to 100 or more; a 2 September comment on a Pro plan with Opus 5 reported 47.4M tokens in one day across 497 requests and 99 percent of the five-hour limit, with one 17-minute session using about 45 percent of it. A 3 September comment on Claude Code 2.1.259 suspected cache reads now count at full weight; Anthropic did not confirm.
- Comments disagree on whether cache reads count against subscription quota; one says they are not billed but count toward session and weekly quota.

## Limits
- Anecdote from individual users with no controlled method; the later comments are unverified and some in the thread are promotional. It shows what users observe, not how Anthropic weights cache reads against plan limits; I found no Anthropic statement of that weight on the pages I opened.

## Used in
- research/synthesis/field-4.md
