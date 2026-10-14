---
url: https://claude.com/blog/getting-started-with-loops
title: "Loop engineering: Getting started with loops"
author: Delba de Oliveira and Michael Segner (Anthropic)
published: 2026-06-30
accessed: 2026-10-14
kind: documented
---

## What it says
- Defines loops as agents repeating cycles of work until a stop condition is met, and sorts them by trigger and stop condition: turn-based (a user prompt starts each one), goal-based (`/goal`, stops when the goal is met or a maximum turn count is reached, for example "stop after 5 tries"), time-based (`/loop`, `/schedule`; an interval triggers it, you stop it or the work finishes) and proactive (event or schedule, no human in real time).
- `/loop` runs on your machine and stops when the machine is off; `/schedule` moves the loop to a cloud routine. For usage, the post advises longer intervals or event-based triggers, not running a routine more often than the watched thing changes, scripts for deterministic steps, piloting a large run on a small slice (dynamic workflows can spawn hundreds of agents), and model and effort choices as among the largest cost levers.
- It points to `/usage`, `/goal` (turns and tokens so far) and `/workflows` (per-agent token use) for review.

## Limits
- A short vendor post (2-minute read) with no measurements. It does not discuss self-paced loops, prompt-cache lifetime or idle waits; its only interval examples are `5m` and "every hour". Dated June 2026, so features may have changed since.

## Used in
- research/synthesis/field-4.md

## Also (question 6)
Re-read on 2026-10-14 for stop conditions and unattended runs.
- Stop conditions should be explicit; deterministic ones (a test count, a score threshold) work best. The post says that without a defined end Claude has to decide for itself when a result is good enough, and it warns to be specific enough that Claude finishes sooner, "but not too soon".
- Verification: the more quantitative the checks, the easier self-verification is; a second agent with fresh context should review code and is "less biased" than the author agent. The post says Claude's belief that work is correct is not proof.
- For unattended or scheduled routines it advises piloting on a small slice, watching the first runs to find where a loop stalls or over-reaches, setting explicit turn caps, and noting that large multi-agent runs "can spawn hundreds of agents".
- Limits for question 6: the post has no failure section and no measurements; runaway loops and drift are not named as such.
- Used in (question 6): research/synthesis/field-6.md
