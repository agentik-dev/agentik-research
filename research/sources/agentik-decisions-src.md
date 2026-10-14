---
repo: agentik-dev/agentik-decisions
path: src/decisions/
commit: 80d59eb
title: "src/decisions (the package: ledger, questions, render, ask, answer, selector, speak, doctor, backlog)"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
Opened only far enough to confirm the mechanism: the module docstrings, `render.py` lines 1-119 (whole), `ledger.py` lines 1-60 and the cap lines, `questions.py` lines 1-60 and the lint tail, constants by grep in the other modules, and `answer.py` lines 185-205. About 2,760 lines in 14 modules (`wc -l`). Stdlib only.
- Caps live in `ledger.py:40` (`IN_FORCE_CAP, EVERY_SESSION_CAP = 25, 7`) and are checked at `ledger.py:249-255`. The open-question cap is `questions.py:40` (`OPEN_CAP = 5`), checked at `questions.py:210-212`. The checks count entries; no check in `ledger.py` measures an entry's length in bytes or characters (grep for `len(` and `bytes` found none that does).
- The generated block (`render.py:50-78`): a header line saying it is generated and never to edit it; the `Every session` entries' full text; a sentence saying `decisions show N` reads one; then `- N Title (area)` for each other entry in force. Markers `<!-- BEGIN GENERATED: decisions -->` and `<!-- END GENERATED: decisions -->` (`render.py:28-29`). Rendered into a file beside no ledger, the block names the ledger whole and its commands carry `--ledger` (`render.py:50-67`).
- `render` lints before any write and exits 1 on a problem; `--check` prints a unified diff and exits 1 when stale (`render.py:91-119`, `cmd_render`).
- `new` refuses at the open-question cap with a message that tells the caller to ask the open questions before a sixth (`ask.py:219-221`, `open_count`). `ask` is implemented in `selector.py` (`cmd_ask`, `PER_CALL = 4`). `answer` lints the result of its write, both files, and refuses on any problem (`answer.py:196-200`), which includes the open-question cap (`questions.py:210`), so at 80d59eb the 2026-10-11 intake's case still refuses by reading; I did not run it.
- No module writes a Superseded line or moves an entry to Superseded: `ask.py:175` only finds the `## Superseded` heading to insert a Proposed line before it. Retiring an entry in force is a hand edit that the lint then checks for a date and a fate (`ledger.py:120-124`, `FATE` at `ledger.py:58`).
- `speak.py`: the respeak contract is a constant, `RENDER_WALL = 600` seconds, helper depth limit 2, a 200-character cap on a warning line, and escapes stripped from the renderer's stderr (`speak.py:30-48`).
- `doctor` checks python, tool, marketplace and plugin, provider, ledger and respeak; a warn never changes the exit (`doctor.py` docstring). `backlog.py` holds the level and step parsers (constants at `backlog.py:23-45`).
- Version `0.8.0` (`common.py:18`).

## Limits
- Read for mechanism only, not audited. The package has no network or model calls except the optional respeak child process in `ask`.

## Used in
- research/synthesis/tools-decisions.md
