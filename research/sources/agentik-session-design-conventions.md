---
repo: agentik-dev/agentik-session
path: design/conventions.md
commit: e7f0723
title: "Conventions shared by the independent plugins (r1, 2026-09-22)"
author: agentik-dev
published: 2026-09-22
accessed: 2026-10-14
kind: our-use
---

## What it says
- Read headings and sections 7 to 9 only. Section 7 (versioning and the sitting record): sittings carry a charter, commit per act, never amend or push, and builders work in worktrees; `make install` freezes the committed package by tree hash and runs it with `python -P`; when the interpreter or frozen tree is gone a hook says to run `make install` once and exits 0.
- Section 8: packets and read lists cite a record as a `record <file> --section SPEC` line, never a prose range (the section-by-section reader that keeps long files out of context).
- Section 9 (packet authoring): a packet has six sections and stays under 9,216 bytes; "may touch" is a closed list of paths; each acceptance line is targeted and carries a measured baseline.
- The doc size caps (a charter under 4,096 bytes; conventions at 9,216 bytes) are enforced by a doc lint script.

## Limits
- Conventions for one owner's plugin family; useful here as the source of the charter size cap and the "read by section" practice.

## Used in
- research/synthesis/tools-session.md
