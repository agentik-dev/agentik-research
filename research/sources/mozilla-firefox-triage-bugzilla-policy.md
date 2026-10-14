---
url: https://firefox-source-docs.mozilla.org/bug-mgmt/policies/triage-bugzilla.html
title: "Triage for Bugzilla"
author: Mozilla (Firefox Source Docs, Bug Handling, Policies)
published: undated
accessed: 2026-10-14
kind: documented
---

## What it says
- Severity and priority are separate fields. Severity levels are S1 to S4 plus N/A and `--`; priority levels are P1 to P5 plus `--`.
- Response bars are written per level (section "Important bugs monitoring and fixing"): new S1 and sec-critical bugs "should be assigned within 2 business days" and get the full attention of anyone who can reasonably help. New S2 and sec-high bugs should be assigned, with caveats, and monitored closely at the weekly team meeting.
- A defect counts as triaged only when its component is set and its severity is neither `--` nor N/A. Defects may not use N/A; task and enhancement bugs may.
- Sign-off on a change: changing a bug's severity requires a comment explaining the rationale. Quality assurance sets an initial severity for bugs it files. Automation sets P1 and P2 for bugs tracked against release and nightly, and overrides a triager's choice.
- P3 is the backlog level. An optional end-of-cycle step for P3 bugs that will not be reached is to demote them to P5 (will accept a patch) or resolve them as WONTFIX.
- The page does not define S3 or S4 beyond using them in two rules (wrong-component handling and carrying a fix back to an earlier version).

## Limits
- A policy page, not a measurement; it says nothing about how many bugs sit at each level or how well people agree on a level. It notes that its priority guidelines are under review.
- The full wording of each severity level lives on a separate project wiki page that would not load for this session (it returned a challenge page), so the level definitions are not recorded here.

## Used in
- research/synthesis/journal-ledger.md
