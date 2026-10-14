---
url: https://raw.githubusercontent.com/JuliusBrussee/caveman/main/README.md
title: "Caveman (project README)"
author: Julius Brussee
published: undated (the README's session test is dated August 2026)
accessed: 2026-10-14
kind: reported
---

## What it says
- A tool for coding agents with a terse "caveman" response style, compression of tool output and files, a model router and a paid hosted product. As of October 2026 the README claims 33.2 percent fewer input tokens across whole Claude Code sessions with answers scored 18 of 18 correct; its header cites 54 runs while its table shows 3 runs for each of six file types (18 in all), so the run count does not reconcile on the page.
- Response style: a single example drops from 63 to 20 tokens. On ten developer questions with one model, output fell from 6,983 tokens with no instruction to 4,119 with the caveman instruction; the README says this was measured on older rules and not re-run. Its own baseline of simply asking to "Answer concisely" got 4,334 tokens.
- The README says the shorter-answer rules add about 1,160 input tokens, and that shorter answers save nothing on per-request billing.
- It cites third parties for quality (one reports no information loss; another found no measurable quality loss, p = 0.82). It does not study whether people find the terse style easy to read.

## Limits
- A product's own benchmark, with small samples and a run count that does not reconcile. The result worth keeping is its own: a plain request for concision (4,334 tokens) came within about 5 percent of the style's output (4,119 tokens), by our arithmetic.
- Volatile page; read October 2026.

## Used in
- research/synthesis/field-9.md
