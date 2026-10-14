---
repo: agentik-dev/agentik-relay
path: DECISIONS.md
commit: a326550
title: "relay: what is settled"
author: agentik-dev
published: 2026-09-28
accessed: 2026-10-14
kind: our-use
---

## What it says
- The ledger holds twelve numbered entries in force, none superseded, nothing under Proposed. Front matter says `updated: 2026-09-28`, but the newest entries are dated 2026-10-12, so the header is stale. Entries 11 and 12 appear in reverse order.
- Rule of the ledger: a review may block only on unmet acceptance criteria, bugs or failing tests, or a conflict with an entry; everything else goes to `NICE_TO_HAVE.md` and does not block (header paragraph, dated as the owner's word of 2026-09-25).
- Entry 1: a row may declare its packet copy-in skipped, and then the gate compares nothing for that row (2026-09-25).
- Entry 2: packets are written before their rows and copied in at act 0. The reason given is cost: packet-writer sittings took 58 of one earlier run's 183 sittings and $261 of its $653 (2026-09-24, owner's option A).
- Entries 3 to 7 (2026-09-29) settle the orchestrator row: one orchestrated night serves one repo; the relay, not a child, pushes `main` after a night, through the repo's pre-push gate; the owner answers during a night with `agentik relay words`, which only the owner's terminal may run; an orchestrator row writes only its own repo; notices keep quiet hours and a catch-up notice carries a count, never text.
- Entry 8 (2026-09-30): the guard parses each Bash command with a real shell-parser library and judges every command in the syntax tree; a line the parser rejects is denied inside a row. It is the repo's first outside dependency.
- Entry 9 (2026-10-10): the owner writes the table of about twenty zsh-only spellings, because Claude Code's safety check stops a helper that composes those lines. Until then the table is an open risk.
- Entry 10 (2026-10-10): a repo's config may set its own verify time limit; unset, the limit stays 900 s; a verify line cut at its limit reads red with a reason that says it was cut.
- Entry 12 (2026-10-12): when one model's own limit is hit and names its reset, only that model's rows pause; the five-hour window still pauses the whole night. Entry 11: a repo may name a `limit_fallback_model`; unset, nothing changes; only a less critical repo sets it.

## Limits
- Entries condense decisions taken in the owner's own sessions; the reason in each is the repo's, not independently checked.
- Several entries cite private sittings and sibling repos by name; this note does not repeat them.

## Used in
- research/synthesis/tools-relay.md

## Also (question 7)
Read for question 7 at commit a326550: entry 9 (2026-10-10). The owner writes the guard's zsh test table of about twenty zsh-only spellings, each shown read or denied, "because Claude Code's safety check stops a helper that composes those lines"; the table stays an open risk in design/guard-parser-r1.md. The entry does not say which check, or name a message.

Used in: research/synthesis/field-7.md
