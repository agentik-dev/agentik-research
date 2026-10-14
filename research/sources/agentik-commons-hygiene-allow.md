---
repo: agentik-dev/agentik-commons
path: .hygiene-allow
commit: e456f4b
title: ".hygiene-allow: hygiene exceptions"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- Format: `<path-glob>: <group>[,<group>]`, `*` inside one path segment, and every row sits under a reason comment (packet ruling 6).
- Rows: the `sibling` group is allowed in the README, `NICE_TO_HAVE.md`, `design/*.md`, `docs/sibling.md`, the marketplace file, the marketplace check and its test, because commons exists to name its sibling tools; packets are allowed `sibling` and `home` because they name their read-only sources by path; the hygiene script and its test are allowed `renamed` because they hold the old-name patterns (the test assembles them at runtime); the guide is allowed `renamed` and `sibling` for its alias paragraph; the licence is allowed `person` because the copyright line names its holder.

## Limits
- It shows what the scan is told to ignore; it is the one place where the old names and sibling names appear on purpose.

## Used in
- research/synthesis/tools-commons.md
