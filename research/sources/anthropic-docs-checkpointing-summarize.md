---
url: https://code.claude.com/docs/en/checkpointing
title: "Checkpointing (section: Rewind and summarize)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read 2026-10-14)
accessed: 2026-10-14
kind: documented
---

## What it says
- The rewind menu offers Summarize from here (compress from the chosen message forward) and Summarize up to here (compress what came before, keep later messages intact). Both leave a "Summarized conversation" marker.
- Summarizing changes no files on disk, and the original messages stay in the session transcript, so Claude can still reference the details. The page says this keeps you in the same session and compresses context, "like a targeted `/compact`".
- To branch and keep the original session whole, use `/branch` or `claude --continue --fork-session`.
- Use case named: summarize a verbose debugging session from the midpoint forward while keeping initial instructions intact.

## Limits
- It does not say whether a full `/compact` or an automatic compaction also leaves the original messages readable in the transcript; only the rewind-and-summarize path is described.

## Used in
- research/synthesis/field-2.md
