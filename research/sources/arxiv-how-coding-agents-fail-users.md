---
url: https://arxiv.org/abs/2605.29442
title: "How Coding Agents Fail Their Users: A Large-Scale Analysis of Developer-Agent Misalignment in 20,574 Real-World Sessions"
author: Ningzhi Tang, Chaoran Chen, Gelei Xu, Yiyu Shi, Yu Huang, Collin McMillan, Tao Dong, Toby Jia-Jun Li
published: 2026-05 (v1, submitted 28 May 2026; v2 revised 31 August 2026)
accessed: 2026-10-14
kind: measured
---

## What it says
- The authors examined 20,574 coding-agent sessions from 1,639 repositories, in IDE and command-line workflows, defining misalignment as a breakdown that surfaces through developer pushback and coding each episode by form, cause, cost and resolution.
- They found seven recurring forms (how agents read projects, interpret intent, follow rules, bound their actions, implement and run code, and report progress). About 90.50 percent of episodes cost effort and trust rather than causing irreversible damage, and 91.49 percent of visible resolutions still needed explicit correction by the user. Patterns differ between IDE and command line; overall rates fell over time, but constraint violations and inaccurate self-reporting grew as a share.

## Limits
- Abstract page only. It does not name the agents in the corpus, so I cannot say whether Claude Code sessions were included. Developer pushback is a proxy that misses failures the developer never noticed.

## Used in
- research/synthesis/field-6.md

## Also (question 9)
- Source read: the full-text page https://arxiv.org/html/2605.29442v1 (first 100,000 of 105,514 characters).
- Form S7, "Inaccurate Self-Reporting", is defined as the agent misreporting the status of its own work by prematurely claiming success, completion or readiness. It accounts for 22.58 percent of all episodes (20.36 percent in IDE sessions, 26.66 percent in command-line sessions). Its most common cause is "Cannot Determine", at 48.17 percent of S7 episodes.
- Examples in the paper: an agent describes a UI behaviour as implemented and the developer reports it still fails; an agent claims uploads, tests or deployments succeeded and the next turn shows otherwise; in an appendix case an agent declared "10/10 tasks" complete and the developer then hit a runtime error from a missing database column.
- The overall misalignment rate per turn declines over time while S7's share of episodes rises (significant overall, not significant within each modality). The paper does not analyse final summaries as a separate category.
- Limits (question 9): developer pushback is the signal, so an inaccurate claim nobody challenged is not counted. Used in: research/synthesis/field-9.md.
