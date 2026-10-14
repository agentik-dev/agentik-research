---
repo: agentik-dev/agentik-agents
path: design/01-local-agent-lane/
commit: 78ce312
title: "design/01 evidence folder: logs, the router ledger snapshot, harness scripts"
author: agentik-dev (the suite owner)
published: 2026-09-04
accessed: 2026-10-14
kind: our-use
---

Opened: the Ollama 0.33.2 gates log, the reminder-dump summary, the first lines of the ledger snapshot and the wire ledger, and one run log (grep only). The harness shell scripts and the router prototype were listed, not read.

## What it says
- The gates log (2026-09-04) shows the cache experiment the design cites: with the `<total_tokens>` reminder present, prompt evaluation took 35,994.82 ms for 7,004 tokens; with the reminder switched off, 7,106 of 7,133 tokens were cached and 27 new tokens took 381.83 ms. Gate B (non-bare Claude Code, no shim) completed in 98 s over 3 turns where 0.32.12 had returned HTTP 500; its turns still re-prefilled (about 36 to 39 s each).
- The reminder-dump summary records system lengths of 3,682 (run A) and 3,629 (run B) characters, which is the evidence for the design's correction that the reminder was not the only difference between the runs.
- Ledger snapshot (39 rows between 2026-09-04T19:04 and 19:20, eight distinct session ids): a re-count on 2026-10-14 gives 26 upstream rows and 13 local rows, all HTTP 200; the local rows total 188,897 input tokens, 3,365 output tokens and 774.3 s of wall time; the `pinged` column sums to 27. Rows record route, model in and out, effort in and out, `max_tokens` in and out, tool names, system length, time to first byte, wall time and usage, and no content.
- The snapshot holds the Live C3 and C4 rows the design describes: 31,136 input tokens with 172.2 s wall (166.4 s to first byte) and 31,685 input tokens with 180.9 s wall; and a 5,790-token turn with 1,683 output tokens in 79.6 s.
- The wire ledger (50 rows, 29 local, 9 with HTTP 500) is an earlier capture the same day; its 500 rows fit the 0.32.12 failures the design describes, though the file does not name the server version.
- A harness log shows the local model's reported cost for a local run is a nonzero list-style figure (about five cents for a single call), which is why the cost tool books local runs as zero by construction.

## Limits
- Logs from one machine on one day. The ledger snapshot holds the rows of a short session, not a long one.
- The counts above are this survey's own re-count of the committed file, not figures stated by the repo.
- The reminder-dump file embeds a home path inside a hook-context string; not repeated here.

## Used in
- research/synthesis/tools-agents.md
