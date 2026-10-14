# Source notes

Write one note per source, at `research/sources/<slug>.md`. The slug is short and stable, such as `anthropic-context-engineering` or `agentik-relay-nice-to-have`. A page's footnote cites the source, and its note records what was read.

```markdown
---
url: https://example.org/the-page          # or, for a repo source:
# repo: agentik-dev/agentik-relay
# path: NICE_TO_HAVE.md
# commit: 1a2b3c4
title: "The page's own title"
author: The named author or organization
published: 2026-05                         # as the source states it; "undated" if none
accessed: 2026-10-13
kind: measured | documented | reported | our-use
---

## What it says
- One finding per line, paraphrased. A quote of at most two sentences, in quotation marks, with its location.

## Limits
- Its method, sample, date, or interest in the answer.

## Used in
- research/synthesis/field-1.md
```

`scripts/check` requires `url` or `repo`, plus `accessed` and `kind`.
