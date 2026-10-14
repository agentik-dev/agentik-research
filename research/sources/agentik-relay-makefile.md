---
repo: agentik-dev/agentik-relay
path: Makefile
commit: a326550
title: "agentik-relay Makefile"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- The build target runs `go build -o bin/relay ./cmd/relay`: the binary carries the bare tool name at this commit.
- The check target runs the check body under `scripts/bounded` with one lock per tree, an 840-second wall and a load threshold of 4 per core.

## How this site uses it
- The relay page says its commands are written in the suite's planned form, and that the Makefile still builds the bare name. The tools index cites the bounded check.
