---
repo: agentik-dev/agentik-agents
path: bin/
commit: 78ce312
title: "bin/ of agentik-agents: the eight tools (header comments and the routing, pricing and pool code)"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

Read only as far as needed to confirm the mechanisms: file headers and docstrings, the router's model-name resolution and request dispatch, the cost tool's price table and subscription reader, the fan-out pool constants, the API wrapper's profile block, and the first 40 lines of the launcher, rig tool, status tool and interim orchestrator. The tools were not read whole.

## What it says
- Eight tools are linked into one bin folder by `make install`: the API wrapper, the fan-out orchestrator, the cost report, the router, the launcher, the rig tool, the status tool and an interim orchestrator demo.
- Router (version 0.4.0): `resolve_local` maps `local/default`, `local/<name>` and `local/<name>/<model>` to a declared backend; a `local/` name that is not declared returns HTTP 404 naming the declared backends (because serving the default made a whole measurement run report the wrong model); a model with a colon is local unless it contains "claude" or "anthropic". A chunked body returns HTTP 411. Defaults in code: listen 127.0.0.1:8787, upstream api.anthropic.com, local URL on Ollama's port, default model `qwen3.8:27b-mtp-q8_0`, default effort low, max effort medium, `max_tokens` clamp 8192, concurrency 1, reminder strip on, first ping after 20 s then every 15 s, timeout 1800 s.
- Cost tool price table (per million tokens, input/output), commented as the claude-api skill's table cached 2026-10-06: fable-5-1 $10/$50; opus-5-5 $4/$20; sonnet-5-5 $2/$10; haiku-5-5 $0.10/$0.50; fable-5 and mythos-5 $10/$50; opus-5 $5/$25; sonnet-5 $3/$15; haiku-4-5 $1/$5; opus 4.5 to 4.8 $5/$25. Cache-read rates per model for three 5.5 models; a global cache-read multiplier 0.10 and write multiplier 1.25 (a five-minute write; a one-hour write is 2.0, and the log cannot tell which was used). The `[1m]` variant is folded into its base model though the code comment says it bills a premium above 200K tokens. The code comment repeats the Sonnet 5 promotional-rate finding (eight review runs billed $3.1167, matching $3/$15 within 0.00%, missing the promotional $2/$10 by 33%) and says the self-check, not the pricing page, settles such questions.
- Subscription lane reader: sums the `lastModelUsage` entries of each project in Claude Code's config file and reads the account's rate-limit tier fields; the report prints "Session-window utilization (5-hour / weekly) is not exposed in any local file" and points to `/usage`.
- Fan-out: `OVERSHOOT_FACTOR = 1.35`, a minimum viable shard of $0.05, a measured shard range for `review` of $0.20 to $0.71 (median about $0.31 by its comment), thread-safe `reserve` and `settle`, status `skipped_budget`.
- API wrapper: profile defaults `review` Sonnet 5 medium, `explore` Sonnet 5 low, `analyze` Opus 5 high; default ceiling `$10`; a comment records two measured failures: 3 of 4 delegated runs that tried a denied tool returned schema-valid placeholder output after burning full cost (one spent $2.15 over 14 turns and 653 s), and a 2026-08-19 analyze run whose prompt promised Grep and Glob that `--bare` silently drops (the delegate's working toolset is Read alone).
- The status tool is read-only (only its internal `fold` verb writes), lists lanes seat, helper, local and api, and bounds its reads.
- The interim orchestrator has a model ladder of sonnet-5 medium, opus-5 high, fable-5 high and creates a human job when the third attempt fails; it keeps API dollars and seat usage as two ledgers never summed.

## Limits
- Only what the headers and the cited blocks say. Code was not run beyond the tests (see agentik-agents-tests).

## Used in
- research/synthesis/tools-agents.md
