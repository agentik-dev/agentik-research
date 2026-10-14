---
url: https://arxiv.org/abs/2407.00215
title: "LLM Critics Help Catch LLM Bugs"
author: Nat McAleese, Rai Michael Pokorny, Juan Felipe Ceron Uribe, Evgenia Nitishinskaya, Maja Trebacz, Jan Leike (OpenAI)
published: 2024-06 (submitted 28 June 2024)
accessed: 2026-10-14
kind: measured
---

## What it says
Read from the abstract page only.
- Critic models trained to write natural-language critiques of code were preferred over human critiques in 63 percent of cases on code with naturally occurring model errors.
- Human evaluation found that the critics caught more bugs than human contractors paid for code review. The abstract gives no counts for this comparison.
- Critics can hallucinate bugs, which could mislead people. Human-and-critic teams caught about as many bugs as the critic alone and hallucinated less than the critic alone.

## Limits
- Trained critics of one lab, judged by contractors on its own task set. It supports "a separate critic finds bugs a person misses" and "critics invent bugs", and says nothing about prompted general-purpose agents or about when a review stops.

## Used in
- research/synthesis/field-8.md
