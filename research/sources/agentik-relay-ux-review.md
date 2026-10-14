---
repo: agentik-dev/agentik-relay
path: design/ux-review.md
commit: a326550
title: "UX1: the printed surface at a6a2eba"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

Read the first 3,500 characters.

## What it says
- Packet UX1 reviewed the human lines of `plan`, `run`, `status`, `report`, `doctor`, `resume` and `attach` against a seven-point checklist, including: the first line says what state the night is in; every red or failed row prints `relay resume <row>` on a line of its own, and `status` and `run` end with those lines; no home path, JSON or Go type name in a human line; every line under 100 columns.
- Measured on the real queue: 19 of the plan's lines were over 100 columns, and the plan printed the home directory whole. It changed wording and layout only; the `--json` keys were frozen by a golden test.

## Limits
- Own review of own output; only the opener and the first plan capture were read.

## Used in
- research/synthesis/tools-relay.md
