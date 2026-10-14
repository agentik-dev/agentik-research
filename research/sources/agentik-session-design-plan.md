---
repo: agentik-dev/agentik-session
path: design/plan.md
commit: e7f0723
title: "The plan: the packet queue (r1, 2026-09-22)"
author: agentik-dev
published: 2026-09-22
accessed: 2026-10-14
kind: our-use
---

## What it says
- Skimmed: the first 34 lines (the table of packet rows) and the baseline headings. One packet is one branch, one sitting, one merge decision; each row carries a model and a budget written as turns over context, for example 80 turns and 100k context for a retire-the-chain packet, 100 and 120k for the meter packet (design/plan.md:1-20).
- The queue is built and measured by sittings against baselines on main (headings from line 35 on name the main commit and the sitting that measured it).
- Model split per the owner's ruling D5: one model class builds, another writes packets and designs.
- A packet is "written by a packet-writing sitting when their turn nears, never earlier" because a packet written against a stale pin is a defect.

## Limits
- A planning table for the owner's own work; it shows how session budgets are used in practice (per-packet turn and context ceilings), not whether they help.
- Not read below line 34 except headings.

## Used in
- research/synthesis/tools-session.md
