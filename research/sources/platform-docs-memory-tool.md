---
url: https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool
title: "Memory tool"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- The memory tool lets Claude store and read information across conversations in a directory of files that the application runs client-side. The page frames it as just-in-time retrieval: record what was learned, read it back on demand, and keep the active context focused. It is available on all Claude 4 and later models; the tool type is `memory_20250818`.
- When the tool is present, the API adds to the system prompt an instruction to view the memory directory before anything else, and to assume interruption: "Your context window might be reset at any moment, so you risk losing any progress that is not recorded in your memory directory."
- Section "Using with compaction": context editing clears tool results on the client; compaction summarizes the conversation on the server near the limit. For long-running agents the page suggests using both, with memory holding what must survive summarization.
- Section "Multisession software development pattern": an initializer session writes a progress log, a feature checklist and a reference to a startup script; each later session opens by reading them; each session updates the progress log before it ends; work on one feature at a time and mark it complete only after end-to-end verification. It points to the long-running harness post for a case study.
- Section "Security considerations": validate every path against traversal (a path such as `/memories/../../secrets.env`), cap memory file sizes, expire files not accessed for a long time, and strip sensitive data before writing.

## Limits
- API documentation for a client-side tool; it is not the same thing as Claude Code's auto memory or CLAUDE.md, which are described in code-docs-memory. No measurement of retrieval accuracy or cost.

## Used in
- research/synthesis/field-3.md
