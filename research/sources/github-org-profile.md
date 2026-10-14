---
repo: agentik-dev/.github
path: profile/README.md
commit: 6476f3a
title: "agentik (organization profile)"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- The tagline: "Guardrails for long, unattended Claude Code work." agentik is five Claude Code plugins with command line tools for work that runs for hours with nobody watching: each session gets a budget and a hard stop, overnight work merges only when its checks pass, and the owner reads one report in the morning with a way back into every stopped session.
- The tour: a task is a packet, a short file saying what to build and how to check it. The relay runs a queue of packets overnight, each on its own branch, in its own repo copy and its own Claude Code session; a branch merges only when its checks pass and nothing is pushed. The session tool counts context and turns, warns at 80%, and at 100% tells the session to finish its current step and exit; before exiting the session updates a short charter (what it was for, how it ended, what comes next), and a fresh session starts from that charter so long work continues without compacting the old context. Decisions keeps settled decisions in one `DECISIONS.md` and copies the few rules every session needs into `CLAUDE.md`; agents may draft questions but only the owner settles them. Respeak lets agents write in agreed shorthand and writes a human version in one of three modes (`eli5`, `bluf`, `technical`), checked against a list of banned phrases. Agents runs side work such as read-only review outside the interactive session, billed to an API key or run on a local model, and reports its cost.
- The five repos, each with install lines and a doctor command; respeak needs Claude Code 2.1.196 or newer and PyYAML; the session tool needs Python 3.11 or newer; the agents API lane stores its key encrypted with sops and age.
- How they fit (table): session writes one resolved configuration that relay, decisions and respeak read; relay starts each packet as a `builder` session and renders its morning report through respeak; decisions renders open questions through respeak; respeak takes its tone from session; agents' status view lists the sessions session tracks. Each installs and works alone, and a cross-link turns on when the other plugin is installed.
- Status: "agentik is early and built for the author's own daily use, so expect breaking changes between versions." It is unofficial and not affiliated with Anthropic; each repo is MIT-licensed.
- The install lines in the page still use each tool's pre-r1 marketplace id and CLI names; the r1 record lists this file in its rename inventory (§6.2) and a profile packet to update it (§8.2).
- The other files in the repo are the pixel-art icon: `tools/make_icon.py` draws an agent with a visor from a character grid and writes SVG and PNG in dark, cream and transparent variants (opened the head of the script only; the PNG and SVG files are not read).

## Limits
- A marketing and orientation page by the owner; its claims about the tools (80% warning, hard stop, merge only on passing checks) are the owner's descriptions, checked against the tool repos in other notes, not here.
- It lags the commons record: at this commit it predates the switch to `agentik <tool>` and the `@agentik` marketplace.

## Used in
- research/synthesis/tools-commons.md
