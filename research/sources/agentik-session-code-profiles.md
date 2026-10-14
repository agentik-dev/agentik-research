---
repo: agentik-dev/agentik-session
path: claude_session/profiles.yaml
commit: e7f0723
title: "claude_session/profiles.yaml: the shipped profiles and the models table"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- Read in full. A `models:` table maps a model family to its window: fable and mythos 1,000,000; opus 200,000; opus-1m 1,000,000; sonnet and haiku 200,000 (profiles.yaml:13-19).
- `defaults` carries every field: model opus, effort xhigh, subagents opus, permission mode auto, posture signal, ceilings 180000 context and 400 turns on both windows, `checkpoint_at: 0.8`, builders opus with at most 3 concurrent, `push: never`, `device: never`, charter directory `history/sittings` and required, and `respawn: {cap: 12, floor: 600, settle: 60}` (profiles.yaml:21-37).
- Priority levels S1 to S4 and `pacing: {enabled: true, fallback: 1800, waiting: 3}` are defaults (profiles.yaml:38-48).
- Ten profiles: frontier; balanced (effort high, subagents sonnet); local (subagents through a local router, serialised); local-only (local model, effort medium, posture off); scratch (local, effort low, posture off, charter not required); review (tools Read, Glob and Grep; permission mode plan); packets (a Fable model writes packets and designs, never builds); builder (what the relay spawns; posture deny); orchestrator (Fable on 1M, ceilings 400000 and 400 on 1M); orchestrator-opus (`opus[1m]`, same ceilings).
- The descriptions of both orchestrator profiles say it runs "a continuous loop; at the checkpoint it brings its charter current and respawns".

## Limits
- Shipped defaults chosen by the owner; the file gives no derivation for 180000, 400, 0.8, 12, 600 or 60. The numbers come from rulings in a private ledger.
- Model names and windows are as of 2026-10 and move with Claude Code releases.

## Used in
- research/synthesis/tools-session.md
