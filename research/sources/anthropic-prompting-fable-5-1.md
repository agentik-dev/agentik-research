---
url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1
title: "Prompting Claude Fable 5.1"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Ask for user-facing progress updates": by default Fable 5.1 writes fewer user-facing updates during long tool-calling turns than Fable 5, more so at higher effort and in longer tool chains. The page describes the symptom as users watching the agent go quiet for minutes, or a final message that covers only the last step rather than the whole task.
- The same section says the short notes between tool calls come back as progress-update `thinking` blocks that are empty under the default `thinking.display` of `"omitted"`; a client must request `display: "updates"` (beta) to show them. It also says to delete older prompt lines such as "hold all findings for the final response".
- Its suggested closing instruction asks for a short recap that stands on its own (what was found, what was done, what is next), "so a reader who only sees the last message has the full picture".
- If a product collapses tool output, tell the model, or it may run commands to "show" output the user never sees; the page supplies a turn-scoped message for that.
- Section "Writing density": Fable 5.1's prose has few stock phrases and little unexplained jargon, but in some cases is denser than Fable 5's (longer sentences, fewer paragraph breaks). The page recommends an instruction that defines "mannered prose" (metaphor and flourish in place of direct statement) and says such prose irritates readers and is imprecise; the short form is a request to remove all mannered prose.
- Section "Finish the whole task" and its "Delivering work" block: if one part is blocked, complete every other part in full and say exactly what was left out and why; state the assumption made on an ambiguous request in the summary; report an unrelated bug found along the way as a follow-up in the summary instead of fixing it.
- Section "Quoting retrieved sources": when summarizing documents, Fable 5.1 is more likely than Fable 5 to reproduce source passages without marking them as quotations; the page recommends one complete worked example in the system prompt.
- Section "Tell the model what to preserve in compaction summaries": a client-side summary should keep problems and how they were resolved, options set aside and why, exact user constraints and decisions, current state, open items, and hard-to-reconstruct details (names, numbers, dates, exact wording, links) kept exactly.

## Limits
- Vendor guidance for one model family, as of October 2026. The page gives no sample, method or number for the density, silence or summary-fidelity observations; they are Anthropic's description of its own model.
- Several instructions on the page are prompts to copy, not findings.

## Used in
- research/synthesis/field-9.md
