---
url: https://arxiv.org/abs/2311.17371
title: "Should we be going MAD? A Look at Multi-Agent Debate Strategies for LLMs"
author: Andries Smit, Paul Duckworth, Nathan Grinsztajn, Thomas D. Barrett, Arnu Pretorius
published: 2023-11 (v1 29 November 2023; v3 18 July 2024; appeared at ICML 2024)
accessed: 2026-10-14
kind: measured
---

## What it says
- The abstract reports that current multi-agent debate (MAD) systems do not reliably beat other prompting methods such as self-consistency and ensembling over several reasoning paths, when cost, time and accuracy are weighed.
- After hyperparameter tuning, several debate systems, Multi-Persona among them, did better. The authors read this as MAD being more sensitive to settings and harder to optimize, not inherently worse. Tuning how much agents agree with each other could beat every non-debate protocol they tested.
- They released a repository with protocols and evaluation scripts.

## Limits
- I read the abstract page only. The abstract gives no numbers, models or datasets, so I record none. Debate between copies of one model, on question answering and reasoning tasks, is not a coding workflow.

## Used in
- research/synthesis/field-5.md
