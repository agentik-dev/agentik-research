---
url: https://arxiv.org/abs/2406.07016
title: "Delving into LLM-assisted writing in biomedical publications through excess vocabulary"
author: Dmitry Kobak, Rita Gonzalez-Marquez, Emoke-Agnes Horvat, Jan Lause
published: 2024-06-11 (v1); Science Advances 11(27), 2025-07-02
accessed: 2026-10-14
kind: measured
---

## What it says
- Method: an excess-vocabulary analysis over more than 15 million biomedical abstracts indexed by PubMed from 2010 to 2024, looking for words whose frequency jumped after language models appeared. A word counts as excess if its frequency gap exceeds 0.01 or its frequency ratio is large relative to its 2024 frequency (page https://arxiv.org/html/2406.07016v5).
- Examples from the full-text page: "delves" has a frequency ratio r of 28.0, "underscores" 13.8 and "showcasing" 10.7. Common words with excess use include "potential" (gap 0.052), "findings" (0.041) and "crucial" (0.037). In total 379 excess style words appeared in 2024.
- At least 13.5 percent of 2024 abstracts were processed with language models, as a lower bound, and the estimate rose to 40 percent in some subcorpora.
- Re-opened 2026-10-14 (site sitting): the abs page (v1 submitted 11 June 2024; shown version v5, revised 3 July 2025) has an abstract over more than 15 million PubMed abstracts from 2010 to 2024 that says the excess word analysis suggests "at least 13.5% of 2024 abstracts were processed with LLMs". It calls this a lower bound that differed across disciplines, countries and journals and reached 40% for some subcorpora. The abstract names no marker words. The full text (arxiv.org/html/2406.07016v5, Section 2.1, Figure 2a) gives frequency ratios r: delves 28.0, underscores 13.8, showcasing 10.7; Figure 2b gives frequency gaps for common words: potential 0.052, findings 0.041, crucial 0.037. Same page: 454 excess words in 2024 counting inflections separately (343 unique lemmas); 379 of the annotated excess words are style words, 66% verbs and 14% adjectives (Figure 3). The 13.5% is the average of two estimates, 0.136 from 291 rare style words and 0.134 from 10 common words (Sections 2.2 and 3, Figure 5a), and the authors stress that it is a lower bound.

## Limits
- The method works on a whole corpus and cannot label an individual abstract. It cannot separate direct language-model use from people adopting preferred words, or tell models apart.
- The estimate is a lower bound (abstracts using a model without marker words go uncounted). Differences between fields and countries may have causes other than adoption.
- It shows that some words are statistically over-used after 2022 in one genre. It does not test how readers react to those words.

## Used in
- research/synthesis/field-9.md
- journal-two-lanes
