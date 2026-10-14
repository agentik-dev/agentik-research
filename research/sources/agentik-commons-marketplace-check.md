---
repo: agentik-dev/agentik-commons
path: scripts/marketplace-check
commit: e456f4b
title: "marketplace-check: the shape of the `agentik` marketplace (agentik-r1 5.2)"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- A stdlib Python check that reads the marketplace file only and fetches nothing. It requires name `agentik`, an owner name, exactly five plugins named session, decisions, respeak, relay and agents once each, a `git-subdir` source with the exact public url for that tool and path `plugin`, and a semver version.
- With `--local` it expects a `file://` url (no host, absolute path, last segment `agentik-<tool>`, no query or fragment), the form `make local-marketplace` writes.
- Exits: 0 valid, 1 a check said no (one stderr line each), 2 usage or an unreadable file.

## Limits
- It checks shape, not truth: it does not compare versions with the plugin files and does not test installation (agentik-commons-nice-to-have).
- Its semver `\d` accepts non-ASCII digits (N3).

## Used in
- research/synthesis/tools-commons.md
