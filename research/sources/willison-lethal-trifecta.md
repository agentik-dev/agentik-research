---
url: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
title: "The lethal trifecta for AI agents: private data, untrusted content, and external communication"
author: Simon Willison
published: 2025-06-16
accessed: 2026-10-14
kind: reported
---

## What it says
- Defines the "lethal trifecta": an agent that has access to private data, is exposed to untrusted content an attacker can control, and can communicate externally in a way that can leak data can be tricked into sending the data to the attacker.
- Skeptical of products that claim to detect or block such attacks: a catch rate of 95% is, in application security, "very much a failing grade".
- Main advice: do not combine all three capabilities in one agent; he points to developer-side design patterns that limit what an agent can do after it reads untrusted input.

## Limits
- One practitioner's argument, from June 2025, not a measurement. It supports removing a capability (a deny or a sandbox) over trying to detect the attack, but does not test any Claude Code control.

## Used in
- research/synthesis/field-7.md
