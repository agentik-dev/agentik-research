---
url: https://github.com/anthropics/claude-code/issues/46829
title: "Cache TTL silently regressed from 1h to 5m (issue 46829)"
author: seanGSISG (issue author); replies by Anthropic staff in the thread
published: 2026-04-12
accessed: 2026-10-14
kind: reported
---

## What it says
- Method: the author filtered the `usage.cache_creation` fields in raw Claude Code session transcripts, 119,866 API calls from 11 January to 11 April 2026 on two machines and two accounts, priced from a rates file dated 2026-04-09.
- Findings (the author's claims): January 11 to 31 had only five-minute writes; February 1 to March 5 had only one-hour writes (no five-minute tokens on 33 or more consecutive days); five-minute tokens reappeared on March 6 and made up 83 percent of writes by March 8 and 93 percent on March 21. Overpayment against an all-one-hour baseline was 17.1 percent for both models (949.08 dollars for Sonnet 4.6, 1,581.80 dollars for Opus 4.6); February showed 1.1 percent waste and March 25.9 percent. About 220M tokens were written to the five-minute tier, which produced 5.7B cache reads.
- A commenter, Jarred Sumner (The Register identifies him as an Anthropic employee; the issue page states no role), said the March 6 change was intentional and cheaper ("The March 6 change makes Claude Code cheaper, not more expensive."), the client picks the lifetime per request, and a client bug that kept sessions on five minutes after exhausting quota into overages was fixed in v2.1.90. A later comment relaying emailed replies from Anthropic attributed the five-minute fallback to two bugs (an overage latch, fixed in v2.1.90, and a telemetry-disabled fallback, fixed in v2.1.106), said that once a seat enters extra usage the client uses five minutes across the board, and recommended v2.1.108 or later plus `ENABLE_PROMPT_CACHING_1H=1`.
- Another commenter reported about 407k turns where subagent turns moved to five minutes earlier than main-conversation turns, and Vertex-billed turns were always five minutes.
- State: closed as "not planned" on 12 April 2026 and locked on 28 June 2026.

## Limits
- The author's own analysis of his own transcripts; the dollar figures use list rates, not bills. The relayed emails are second-hand. The documentation as of October 2026 (code-docs-prompt-caching) now describes the lifetime per request bucket and per billing type, and the usage-credits drop to five minutes matches the thread's "extra usage" explanation.

## Used in
- research/synthesis/field-4.md
