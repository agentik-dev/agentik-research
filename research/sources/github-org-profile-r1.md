---
repo: agentik-dev/.github
path: profile/README.md
commit: 8a0a188
title: "agentik (organization profile)"
author: agentik-dev (the suite owner)
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
- Commit 8a0a188 (2026-10-13) is "merge agentik-r1-profile", the profile packet the commons record names (agentik-r1 §8.2). It rewrites the "The five repos" section as "The repos" and adds agentik-commons at its head.
- The install lines now use the `agentik` marketplace: `claude plugin marketplace add agentik-dev/agentik-commons` once, then `session@agentik`, `relay@agentik`, `decisions@agentik`, `respeak@agentik` and `agents@agentik`. Each command-line tool installs from a clone with `make install`, which also installs the `agentik` front door. The doctor lines read `agentik <tool> doctor`.
- Commons is "The ground the five tools share; it builds no tool of its own", holding the marketplace, the front door, and "the guide the tools follow for names, verbs and exit codes".
- respeak "has no command line tool yet".
- Unchanged from 6476f3a: the tagline, the tour, the "How they fit" table and "Each one installs and works alone; a link in the last column turns on when the other plugin is installed."

## Limits
- The owner's orientation page. It describes the install lines a reader should use; it does not record that the switch on the owner's machine ran.

## Used in
- docs/tools/index.md
