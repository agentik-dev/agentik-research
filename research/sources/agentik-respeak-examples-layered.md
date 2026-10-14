---
repo: agentik-dev/agentik-respeak
path: examples/layered/
commit: 319f060
title: "examples/layered: a runnable layered-configuration tree"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- A small project plus a sample user-level file that the test suite resolves against, so the documented outcomes cannot drift from the code. Files: a user config, a project config with two `scopes:`, a gitignored local config, and folder `.respeak.yaml` files for `docs/exec/`, `docs/api/` and `notes/`, plus sample documents.
- The README's outcome table: `README.md` gets technical, tech_level 3, `peer-engineer`; `docs/exec/q3-summary.md` gets `bluf`, tech_level 1, `exec`, with `fail_on` softened to `warn`; `docs/api/endpoints.md` gets technical, tech_level 5, `author` (a folder file beats the `docs/**` scope); `notes/` carries a project-only key that is ignored with a warning. The project config enables the gate with `allow: ["load-bearing"]`.
- It shows the same file handled by three audiences and shows `author` as the profile where shorthand may appear inline.

## Limits
- A fixture, not a record of use.

## Used in
- research/synthesis/tools-respeak.md
