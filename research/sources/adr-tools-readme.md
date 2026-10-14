---
url: https://github.com/npryce/adr-tools
title: "adr-tools (README)"
author: The repository owner named in the URL (npryce) and contributors (public GitHub repository)
published: undated
accessed: 2026-10-14
kind: documented
---

## What it says
- Records are stored as Markdown files in a subdirectory of the project, by default `doc/adr`; `adr init` creates it and a first record about using ADRs; `adr new <title>` makes the next numbered record and opens an editor.
- Supersession is a command: `adr new -s <number> <title>` creates a new record that supersedes the numbered one and changes the old record's status to say it is superseded.
- The README text I read mentions no template, no table of contents and no `generate toc` or `link` command (the fetch of a likely script path returned not found), so a table-of-contents command is not confirmed here. The agentik-decisions design cites one; see the repo notes.

## Limits
- The README is short; command help and the project's own records may say more. It describes a shell tool for human use and says nothing about size caps or about agents.

## Used in
- research/synthesis/field-8.md
