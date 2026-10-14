---
url: https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record
title: "Maintain an architecture decision record (ADR) - Azure Well-Architected Framework"
author: Microsoft (Azure Well-Architected Framework documentation)
published: 2026-04-10 (the page's own date; updated 2026-04-13)
accessed: 2026-10-14
kind: documented
---

## What it says
All as of April 2026, the page's date.
- Scope: record only decisions that affect the system's structure or key quality attributes, or that are hard to reverse.
- Append-only: "The ADR serves as an append-only log. Don't go back and edit accepted records." A changed decision gets a new record that supersedes the original, with the two linked, which preserves the history and shows when and why the direction shifted.
- Each record should have a consistent anatomy: problem statement with context, options considered, decision outcome with trade-offs and a confidence level, and a status such as proposed, accepted or superseded; the page says tracking status matters more as the number of decisions grows.
- Style: keep records "pithy, assertive, on-topic, and factual"; do not turn them into design guides; link longer justification as supplemental material, so the decision stands alone. Always include context and rationale, because a record without justification loses value as people cannot tell whether it still applies.
- Split a decision that comes in phases (short, mid and long term) into one record per phase.
- Why record: the page says a decision that is made but never recorded will likely be forgotten, leading to repeated debates or later changes that unknowingly contradict the original intent.

## Limits
- Guidance for architects of cloud workloads, with no measurements and no limit on length or on how many records stay active. Nothing in it addresses a model reading the log.

## Used in
- research/synthesis/field-8.md
