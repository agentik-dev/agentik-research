---
url: https://docs.github.com/en/rest/checks/runs
title: "REST API endpoints for check runs"
author: GitHub (REST API documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
As of October 2026.
- A check run's `conclusion` is one of success, failure, neutral, cancelled, skipped, timed_out or action_required (or null while it runs), so the platform's own gate vocabulary has more states than pass and fail.
- The status values listed are queued, in_progress, completed, waiting, requested and pending; the page says only GitHub Actions can set waiting, pending or requested.
- The page does not say how branch protection treats each conclusion.

## Limits
- I read the create-a-check-run section only. It gives the vocabulary, not the policy; the Claude Code review check uses the neutral conclusion (see code-docs-code-review).

## Used in
- research/synthesis/field-8.md
