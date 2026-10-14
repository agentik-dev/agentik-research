---
url: https://code.claude.com/docs/en/output-styles
title: "Output styles"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Claude Code has four built-in styles besides the default: Proactive, Concise, Explanatory and Learning. A style is a set of instructions that sets role, tone and response format for every response in a session.
- Concise: the first sentence of a response states what happened or what the answer is; the lead-in, step-by-step narration and closing recap are left out; a simple question gets one to three sentences. The page says engineering work is done as thoroughly as in the default style, and the style needs Claude Code v2.1.237 or later.
- Concise still writes at full length for anything the user asks to have explained and for anything needed to act safely: error reports, failing test output, security warnings and confirmations for destructive actions keep their complete content.
- Explanatory adds short `Insight` blocks that explain the choices behind the code; Learning adds the same blocks and leaves small pieces of code for the user.
- Status of the control: "An output style gives Claude instructions to follow. It doesn't guarantee that something always happens or never happens." For something that must happen every time, the page points to a hook.
- Styles apply to the main conversation and to forks; other subagents run their own system prompt, so styles do not change how they respond. A custom style is a Markdown file with front matter, saved at user, project or managed-policy level.

## Limits
- Documentation of a setting as of October 2026; no measurement of whether Concise reports are easier to act on or whether they omit anything a reader needs.

## Used in
- research/synthesis/field-9.md
