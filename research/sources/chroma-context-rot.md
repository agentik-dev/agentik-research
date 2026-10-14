---
url: https://www.trychroma.com/research/context-rot
title: "Context Rot: How Increasing Input Tokens Impacts LLM Performance"
author: Kelly Hong, Anton Troynikov, Jeff Huber (Chroma)
published: 2025-07-14 (a footnote was added 2025-07-16)
accessed: 2026-10-14
kind: measured
---

## What it says
- Scope: 18 models, not all in every experiment. Anthropic: Opus 4, Sonnet 4, Sonnet 3.7, Sonnet 3.5, Haiku 3.5. Also OpenAI, Google and Qwen3 models. The page says the code is public.
- Needle-in-a-haystack extension: each model is tested at 8 input lengths and 11 needle positions, temperature 0 where the model allows it. Pairs with lower needle-question similarity (cosine, averaged over five embedding models; ranges 0.445 to 0.775 on essay text and 0.521 to 0.829 on arXiv text) degrade faster as input grows. At short inputs, the models do well on all pairs.
- Needle position: across 11 positions the authors "find no notable variation in performance for this specific NIAH task". This differs from the position effect in liu-lost-in-the-middle.
- Distractors: adding even one distractor lowers accuracy, and four lower it further. Claude Sonnet 4 and Opus 4 tend to abstain when unsure; the GPT models hallucinate most often.
- Haystack structure: across all 18 models, shuffled haystacks gave better results than coherent essays. The authors call this surprising and do not explain it.
- LongMemEval: 306 prompts, about 113K tokens in the full version against about 300 tokens in the focused version. Every model scores higher on the focused prompts. The Claude family shows the largest gap, which the authors tie mostly to abstentions.
- Repeated-words task (output grows with input): performance becomes uneven as combined input and output length rises. GPT-3.5 Turbo was dropped after refusing 60.29 percent of tasks.
- Conclusion: models "do not maintain consistent performance across input lengths", and how information is presented matters as well as whether it is present.

## Limits
- The authors state the tasks are simple by design, so real tasks may degrade more; they hold task difficulty constant but say they cannot fully separate length from difficulty; they do not explain mechanisms; the needle-haystack similarity finding rests on two topics.
- Run in mid-2025 on models of that date. Chroma sells a vector database, an interest in the "retrieval beats long context" argument.
- A judge model (GPT-4.1, reported as over 99 percent aligned with human judgment) scored outputs.

## Used in
- research/synthesis/field-1.md
