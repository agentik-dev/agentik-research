---
url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5
title: "Prompting Claude Fable 5"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Capability claim (section "Capability improvements"): relative to Opus 4.8, Fable 5 sustains multiday runs "with strong instruction retention across long, complex tasks". This is a vendor statement with no figure on the page.
- Section "Recommended scaffolding changes": separate, fresh-context verifier subagents "tend to outperform self-critique"; skills written for earlier models are often too prescriptive and can degrade output, so review and remove old instructions.
- Section "Ground progress claims during long runs": in Anthropic's testing, asking the model to audit each progress claim against a tool result from the session nearly eliminated fabricated status reports.
- Section "Rare cases of context-budget concern": deep into very long sessions the model may suggest a new session, offer to summarise and hand off, or trim its own work, most often when the harness shows a remaining-token countdown; the page suggests avoiding showing counts, or adding a reassurance line.
- Section "Rare cases of early stopping": deep in a long session the model can end a turn with a statement of intent but no tool call; a "continue" is enough.
- Section "Construct a memory system": one lesson per file with a one-line summary at the top; do not save what the repo or history already records.

## Limits
- Vendor guidance for one model family, as of October 2026. No method, sample or number for the instruction-retention, verifier or fabricated-report claims.

## Used in
- research/synthesis/field-1.md
