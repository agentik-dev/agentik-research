---
url: https://arxiv.org/abs/2508.21433
title: "The Complexity Trap: Simple Observation Masking Is as Efficient as LLM Summarization for Agent Context Management"
author: Tobias Lindenbauer, Igor Slinko, Ludwig Felder, Egor Bogomolov, Yaroslav Zharov
published: 2025-08-29 (v1); latest version v3 submitted 2025-10-27
accessed: 2026-10-14
kind: measured
---

## What it says
- Compares, inside the SWE-agent scaffold on SWE-bench Verified, LLM summarization of older context with simply masking (dropping) older observations, across five model configurations.
- Masking roughly halves cost against the unmanaged agent and matches the solve rate of LLM summarization, sometimes slightly exceeding it. The abstract page gives no exact solve rates.
- A hybrid of the two cuts cost a further 7% against masking alone and 11% against summarization alone.
- A probe in the OpenHands scaffold gives initial evidence that the finding carries over. The authors question the field's move to pure LLM summarization.

## Limits
- One benchmark (SWE-bench Verified) and one main scaffold; the OpenHands result is a probe. The page does not name the five models. It measures cost and solve rate, not what a summary dropped. v3 is a workshop camera-ready version.

## Used in
- research/synthesis/field-2.md
