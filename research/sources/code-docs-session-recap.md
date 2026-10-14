---
url: https://code.claude.com/docs/en/interactive-mode
title: "Interactive mode (section: Session recap), with the Week 17 whats-new digest"
author: Anthropic (Claude Code documentation)
published: undated page; the whats-new digest covers 20 to 24 April 2026 (releases v2.1.114 to v2.1.119)
accessed: 2026-10-14
kind: documented
---

## What it says
- When you return to the terminal after stepping away, Claude Code shows a one-line recap of what happened in the session so far. It is generated in the background once at least three minutes have passed since the last completed turn and the terminal is unfocused. It appears only once the session has at least three turns, and never twice in a row.
- `/recap` produces a summary on demand and runs only when the user asks for it. If the request arrives in a message relayed from a chat thread, or in a prompt a routine sent, the user gets a notice instead of a recap.
- On by default for every plan and provider; the automatic recap can be turned off in `/config`. It never appears in non-interactive mode. Both the automatic recap and `/recap` output are capped at 400 characters.
- The Week 17 digest (https://code.claude.com/docs/en/whats-new/2026-w17) introduces it as a way to return to "a one-line recap of what happened while you were gone", pitched as helpful for running several sessions at once.

## Limits
- Documentation of a feature as of October 2026. The pages give no measure of recap accuracy, and a 400-character cap cannot carry the detail a long unattended run needs.

## Used in
- none yet. Read for question 9 but not cited in research/synthesis/field-9.md (size cap); a lead for the page draft.
