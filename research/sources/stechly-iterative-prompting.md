---
url: https://arxiv.org/abs/2310.12397
title: "GPT-4 Doesn't Know It's Wrong: An Analysis of Iterative Prompting for Reasoning Problems"
author: Kaya Stechly, Matthew Marquez, Subbarao Kambhampati
published: 2023-10 (submitted 19 October 2023)
accessed: 2026-10-14
kind: measured
---

## What it says
Read from the abstract page only.
- The authors test iterative prompting on graph colouring, an NP-complete problem tied to scheduling and allocation, with GPT-4 as solver and as critic, and with an external correct reasoner as critic.
- They report that GPT-4 is poor at solving the instances and no better at verifying a solution, so self-critique in an iterative loop is ineffective.
- With an external sound verifier in the loop, the content and correctness of the criticism seemed largely irrelevant; the abstract attributes the gain mainly to the correct solution appearing among the model's top-k completions and being recognised by the verifier.

## Limits
- One problem family (graph colouring), GPT-4 of 2023, and no numbers in the abstract, which is all I read. It does not test code review.

## Used in
- research/synthesis/field-8.md
