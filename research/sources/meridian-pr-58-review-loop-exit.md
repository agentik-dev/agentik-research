---
url: https://github.com/meridianlabs-ai/agents/pull/58
title: "Review loop passes on no blocking findings; nits no longer spend fix rounds (pull request 58)"
author: The pull request's author (a maintainer of a public GitHub repository)
published: 2026-09-04 (opened and closed unmerged the same day)
accessed: 2026-10-14
kind: reported
---

## What it says
- The loop: for pull requests labelled for automation, a reviewer posts a verdict of clean or suggestions; on suggestions a fixer agent pushes changes and requests another review. Under the old rule, clean meant zero suggestions of any kind and the fixer addressed every nit.
- The author calls that rule, a standard of best-shape pull request and not only unblocking, "the looping cause": nit-only reviews kept triggering fix rounds. Two fix rounds ran on reviews that had only non-blocking findings.
- The change: reviewers tag each finding blocking or non-blocking; clean means no blocking findings; the fixer fixes blocking findings, takes cheap in-scope nits only alongside a blocking fix, and declines the rest with a one-line reply. The round cap of 10 stayed.
- Outcome: closed without merging because the scope went beyond the requested draft and the prompt changes needed a separate decision. The author also flagged one commit as error-path machinery the loop added unasked.

## Limits
- One repository's account of its own change, with a fresh-context review that passed with three non-blocking findings; no before-and-after measure of rounds. The change was not adopted.

## Used in
- research/synthesis/field-8.md
