---
repo: agentik-dev/agentik-commons
path: docs/sibling.md
commit: e456f4b
title: "Conventions shared with the sibling plugins"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- It is the paragraph every tool README carries under the heading "Conventions shared with the sibling plugins". It says each plugin is one of five built to the same guide (`GUIDE.md` in commons).
- The front door, the hygiene scan and `bounded` are vendored from commons with sha256 pins in `scripts/vendored.sha256`, which `make check` verifies; `scripts/doclint` is byte-identical across the repos and pinned by hash in the Makefile.
- `scripts/hygiene` keeps only generic patterns. Private ones (a person, a private repo, a host, a domain) live outside it, in an environment-named file or a user config file of `group<TAB>regex` rows. Without the list the scan warns once and runs the generic groups.
- `scripts/bounded` holds `make check` to one run per tree, a wall of 840 seconds, and no start above a load of 4 per core.
- Each README is rendered from its source, and the sidecar `design/readme/rendered.sha256` holds the two hashes `make check` reads. Each README then adds its own table of the siblings it uses: `| id | range | role |`.

## Limits
- Ten lines; a statement of the convention, with no evidence of how well it holds in each repo.

## Used in
- research/synthesis/tools-commons.md
