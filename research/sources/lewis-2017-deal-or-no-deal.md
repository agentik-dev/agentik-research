---
url: https://arxiv.org/abs/1706.05125
title: "Deal or No Deal? End-to-End Learning for Negotiation Dialogues"
author: Mike Lewis, Denis Yarats, Yann N. Dauphin, Devi Parikh, Dhruv Batra
published: 2017-06-16
accessed: 2026-10-14
kind: measured
---

## What it says
- The abstract page reports training end-to-end negotiation dialogue agents and a "dialogue rollouts" planning technique; it does not mention divergence from human language.
- In the full text (read from the PDF, extracted locally), the introduction says that to avoid the models diverging from human language, reinforcement learning updates are interleaved with supervised updates.
- In section 4 (goal-based training) the authors write that they fixed the second agent's parameters because updating both agents led to divergence from human language.
- Section 6.3: models trained or decoded to maximize their goals produce less human-like utterances by a perplexity measure, but the authors note this "may not necessarily correspond to lower quality language" and may reflect different strategic choices. The conclusion lists improving utterance diversity "without diverging from human language" as future work.

## Limits
- A 2017 negotiation-dialogue system trained on crowdsourced human dialogues. The paper reports divergence from human language as a training-setup problem it avoided. It does not report a case of a person unable to follow a working system.
- I did not open the fact-check page that other notes in this repo lean on (it returned HTTP 402), so the media account and any researcher quotation are unverified here.

## Used in
- none yet. Read for question 9 but not cited in research/synthesis/field-9.md (size cap); a lead for the page draft.
