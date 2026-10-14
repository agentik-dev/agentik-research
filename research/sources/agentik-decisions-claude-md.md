---
repo: agentik-dev/agentik-decisions
path: CLAUDE.md
commit: 80d59eb
title: "agentik-decisions: agent contract"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
- The file is the tool's own agent contract. It names the read order (README, then `design/d18-one-flow.md`, then the newest sitting charter) and restates the ledger rules: sections, one-line entry shape, unique numbers, at most 25 in force and 7 under `Every session`, and `agentik decisions render --lint` for the shape and the questions file.
- It says: "this repo keeps no DECISIONS.md". The ledger entries that bind the repo live in the owner's cross-repo ledger, outside this repository.
- The plugin "carries two skills ... six commands and respeak's include file, and no data: a repo owns its ledger" (paraphrased from the bullet).
- A builder "decides inside the packet and escalates only a fork the packet cannot settle" (paraphrased from the Authority bullet).
- A sitting charter under 4 KB is written at open (Sittings bullet).

## Limits
- It is an instruction file for developing the tool. The tool's own repo does not run the tool on a ledger of its own, so the public repo shows no real, long-lived ledger; the only public ledger found in the checked-out sibling repos is the relay repo's.

## Used in
- research/synthesis/tools-decisions.md
