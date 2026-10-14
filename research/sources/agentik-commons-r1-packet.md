---
repo: agentik-dev/agentik-commons
path: design/packets/agentik-r1-commons.md
commit: e456f4b
title: "Packet agentik-r1-commons: the front door, the canonical hygiene with `renamed`, the `agentik` marketplace, the guide"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- A packet is the work order a builder session receives. This one has five header rows (from, pin, wall, may touch, budget) and six sections: what the source says, rulings, interfaces, acceptance, reads outside the repo, report.
- The wall row forbids push, `--amend`, rebase, network, any `claude plugin` command (the P1 proof is the observer's, at the switch), and any relay run, plan, gate, stop, kill, clean or resume or relay binary build. The budget row is 120 turns and 150k context, commit per act, checkpoint at 80%.
- Six rulings, decided inside the design: (1) `scripts/sync` writes a pin file in `shasum -a 256 -c` form so the Makefile holds no hashes; (2) a chain's newest charter is chosen by (date, integer n), "never lexical", so a ten beats a nine; (3) stdlib `unittest`, no virtualenv, the hygiene test imported from the session repo with exit codes swapped; (4) `make check` is test, hygiene, marketplace-check, `sh -n` and the front-door line count, with no doclint until r2; (5) marketplace versions read from each repo's plugin file on its main and checked only for shape, never over the network; (6) every `.hygiene-allow` row carries a reason line.
- Sixteen acceptance lines, each a shell command with its expected output, three of which fail before the change: `agentik nosuch` exits 3 (line 2), a fake `agentik-x` passes arguments and exit code through (line 4), and a `renamed` hit exits 1 (line 8). Line 9 shows that a lexical sort would mis-pick the newest charter.
- The reads outside the repo are listed as read-only paths under the owner's code folder, and the forbidden reads include any transcript, any state folder, the owner's ledger, any other repo and the private hygiene list ("you never print or copy it").
- The report asks for a table of actual outputs, the commits, each ruling beyond the six, and anything for `NICE_TO_HAVE.md`, in under 1,500 words.

## Limits
- This survey measured the file at 9,913 bytes (`wc -c`), above the 9,216-byte packet ceiling the guide sets for tool-repo packets; commons runs no `doclint` until r2 and the guide binds the five tools, not commons.
- It has no `verify` row, which the guide requires of tool-repo packets.
- The packet reads home-folder paths of the owner's checkouts; this note does not repeat them.

## Used in
- research/synthesis/tools-commons.md
