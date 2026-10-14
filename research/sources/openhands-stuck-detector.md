---
url: https://docs.openhands.dev/sdk/guides/agent-stuck-detector
title: "Agent stuck detector (OpenHands SDK guide)"
author: OpenHands (project documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- The SDK's stuck detector flags five patterns: the same action producing the same observation 4 or more times; the same action ending in the same error 3 or more times; an agent monologue of 3 or more consecutive messages with no user input or progress; two action-observation pairs alternating in a ping-pong for 6 or more cycles; and repeated context-window errors (no numeric threshold given).
- It is on by default; when triggered it flags the conversation as stuck and can halt execution automatically, or the host can respond with corrective action. Status can be read with `conversation.stuck_detector.is_stuck()`. Detection looks at events after the last user message and compares events by content (tool name, content, thought), not IDs or timestamps.

## Limits
- One third-party agent framework's design, not a measurement of how well it works or of false-positive rates. The page lists no limitations. Shown as an example of a documented task-level loop detector; Claude Code's documentation, as read, offers none for the main session.

## Used in
- research/synthesis/field-6.md
