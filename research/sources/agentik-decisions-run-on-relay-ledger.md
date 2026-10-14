---
repo: agentik-dev/agentik-relay
path: DECISIONS.md
commit: a326550
title: "agent-relay: what is settled (run through the decisions tool, scratch copy)"
author: agentik-dev
published: 2026-09-28
accessed: 2026-10-14
kind: our-use
---

## What it says
This note records a run by this session of the tool at agentik-decisions 80d59eb on a scratch copy of the relay repo's `DECISIONS.md` and `OPEN-QUESTIONS.md` at relay commit a326550. The relay's own content is covered in `agentik-relay-decisions`; this note adds only what the tool measured.
- `decisions render --lint` exited 0 on the copy.
- The ledger is 7,995 bytes with 12 numbered entries in force in five areas (Packets, The orchestrator row, The guards, The gate, Usage limits), an empty `## Proposed`, and no `Every session` subsection. The longest entry line is 1,567 characters.
- `decisions render` wrote a block of 984 bytes in 18 lines, about 12 percent of the ledger's bytes. With no `Every session` entries the block is title lines only, for example `- 8 The guard's shell reader (The guards)`.
- The relay's `OPEN-QUESTIONS.md` copy is 1,788 bytes; its headings are `Decisions for the owner`, `Decided without asking` and `Answered`.
- The ledger's opening paragraph carries a review rule dated as the owner's word of 2026-09-25: a review may block only on unmet acceptance criteria, bugs or failing tests, or a conflict with an entry; everything else goes to `NICE_TO_HAVE.md` and does not block.

## Limits
- One small, public ledger, 12 entries, one owner; far below the cap of 25, so it shows nothing about behaviour at the cap. A single run on a scratch copy; the source repo was not changed.

## Used in
- research/synthesis/tools-decisions.md
