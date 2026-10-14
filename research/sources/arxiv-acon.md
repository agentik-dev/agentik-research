---
url: https://arxiv.org/abs/2510.00615
title: "ACON: Optimizing Context Compression for Long-horizon LLM Agents"
author: Minki Kang, Wei-Ning Chen, Dongge Han, Huseyin A. Inan, Lukas Wutschitz, Yanzhi Chen, Robert Sim, Saravan Rajmohan
published: 2025-10-01 (v1); latest version v3 submitted 2026-06-01
accessed: 2026-10-14
kind: measured
---

## What it says
- Proposes compressing both observations and interaction history by optimizing compression guidelines in natural language from analysis of agent failures, with no fine-tuning, then distilling the compressor into smaller models.
- Reported on AppWorld, OfficeBench and a multi-objective QA benchmark: peak token usage down 26 to 54%, task success better than existing compression baselines, and smaller models gaining up to 46% by mitigating context distraction.
- The stated aim is to preserve "critical state information" through compression; the failure analysis is what tells the compressor what it must keep.

## Limits
- Read from the abstract page only. The abstract names existing methods as brittle heuristics or parameter updates and does not discuss generic summarization, so the page does not show what a generic summary drops. The figures come from the authors' own benchmarks, not from Claude Code.

## Used in
- research/synthesis/field-2.md
