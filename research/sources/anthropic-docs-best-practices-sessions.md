---
url: https://code.claude.com/docs/en/best-practices
title: "Best practices for Claude Code"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; the older engineering-blog URL anthropic.com/engineering/claude-code-best-practices answered with a permanent redirect to this page on 2026-10-14)
accessed: 2026-10-14
kind: documented
---

## What it says
- The guide's frame: most best practices follow from one constraint, that the context window fills fast and performance degrades as it fills. Claude may start "forgetting" earlier instructions or make more mistakes.
- `/clear` resets context between unrelated tasks. After two failed corrections on one issue, run `/clear` and write a better first prompt. "A clean session with a better prompt almost always outperforms a long session with accumulated corrections."
- Auto compaction preserves "code patterns, file states, and key decisions" in the page's words. For control: `/compact <instructions>`; `/rewind` then Summarize from here or Summarize up to here (the first condenses from that point forward, the second condenses earlier messages and keeps recent ones in full); a CLAUDE.md line such as always preserve the list of modified files and test commands.
- For larger features, have Claude interview you and write a spec to a file, then start a fresh session to execute it: the new session has clean context focused on implementation and a written spec to refer to.
- Sessions can be resumed with `claude --continue` or `claude --resume`; name them with `/rename` and treat them like branches.
- A fresh context improves review, because Claude is not biased toward code it just wrote (Writer and Reviewer sessions).
- The closing section says sometimes you should let context accumulate because the history is valuable; the guide treats its patterns as starting points.

## Limits
- Guidance, not measurement; "almost always" is the vendor's judgment with no data shown. The page is silent on a numeric threshold.
- It recommends both compaction (with focus) and clearing, and gives no rule that picks between a compact and a restart from a written handoff beyond the spec-then-fresh-session workflow.

## Used in
- research/synthesis/field-2.md
