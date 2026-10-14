---
url: https://code.claude.com/docs/en/routines
title: "Automate work with routines"
author: Anthropic (Claude Code documentation)
published: undated (research preview; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026 routines are in research preview, and the page warns that behaviour, limits and the API surface may change. A routine is a saved prompt plus repositories and connectors that runs as a full Claude Code cloud session on a schedule (minimum interval one hour), on an API call, or on GitHub events (pull request and release events).
- Autonomy: there is no permission-mode picker; the session runs shell commands, committed skills and any included connector's tools, writes included, without stopping for approval, apart from some artifact actions. By default all of the user's connected connectors are included; the page says to remove those a routine does not need.
- Run status: "A green status in the run list means the session started and exited without an infrastructure error. It does not mean the task in your prompt succeeded." The reader has to open the transcript to see what Claude did.
- Limits table: scheduled runs, including one-off runs, 100 per hour per account (a run over the limit waits); "Run now", API fires and re-arming a one-off routine, 30 per hour per routine; "Run now" and re-arming, 100 per hour per account; API fires 100 per hour per account. GitHub events have per-routine and per-account hourly caps, and events beyond them are dropped until the window resets. None of the hourly limits has overage.
- When a GitHub connection is missing or expired a routine skips runs for up to 72 hours and then turns off.
- Fire text sent with an API trigger arrives wrapped in a `<routine-fire-payload>` block labelled as untrusted data; a routine's saved prompt must opt in to acting on it.
- Runs count against subscription usage like interactive sessions; with usage credits on, runs continue as metered overage, and without credits additional runs are rejected until the usage window resets.

## Limits
- Research-preview documentation; no failure statistics. The page describes no stop condition beyond the schedule, the run limits and the usage limit.

## Used in
- research/synthesis/field-6.md
