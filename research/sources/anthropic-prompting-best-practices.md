---
url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
title: "Prompting best practices"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Long context prompting" (for inputs of 20k tokens or more): put long documents at the top of the prompt, above the query, instructions and examples; wrap multiple documents in tagged structure. A note says "Queries at the end can improve response quality by up to 30 percent in tests, especially with complex, multidocument inputs."
- Section "Long-horizon reasoning and state tracking": the latest models keep orientation across extended sessions by making incremental progress, and this "especially emerges over multiple context windows", where Claude saves state and continues with a fresh window.
- Section "Workflows across multiple context windows": use a different prompt for the first window to set up tests and scripts; keep tests in a structured file; write setup scripts so a fresh window can resume; use git for state; and "Starting fresh versus compacting": when a context window is cleared, consider a brand-new window rather than compaction, because the latest models are effective at discovering state from the filesystem; be prescriptive, for example read the progress file, the tests file and the git log.
- Section "Context awareness": if the harness compacts or saves context to files, tell the model so, or it may wrap up early as it nears the limit.

## Limits
- Guidance, not a controlled comparison. The "up to 30 percent" test is not described (no model, task or sample size). The fresh-versus-compact advice is conditional on state living in files.
- Model list and advice are as of October 2026.

## Used in
- research/synthesis/field-1.md
