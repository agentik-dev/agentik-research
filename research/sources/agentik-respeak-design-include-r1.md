---
repo: agentik-dev/agentik-respeak
path: design/include-r1.md
commit: 319f060
title: "a static include file a repo ships (include r1)"
author: agentik-dev
published: 2026-10-11
accessed: 2026-10-14
kind: our-use
---

## What it says
- Status line: design r1, 2026-10-11, docs only, from the owner's ruling of that day made after a study of Claude Code mods. A repo's author, with respeak installed, generates the repo's default communication behaviour as one static file under 1.5 KB. The file ships in that repo and a `CLAUDE.md` or `AGENTS.md` imports it with an `@` line, so users get the behaviour without installing respeak. "No mod ships, and nothing runs per turn."
- §1: `/respeak:include` is a deterministic script (no model call) with `write` and `check`. Inputs are the plugin defaults and the repo's git-tracked project config only; no personal layer, session or environment reaches the file. The cap is 1,500 bytes; over the cap `write` exits 2 and writes nothing. `check` exits 0 current, 1 drift, 2 usage. The first line stamps the template version and a short hash of the inputs, so `check` tells stale from hand-edited.
- §2: a rendered example for a technical-mode peer-engineer repo is 1,306 bytes by `wc -c`. It defines the two lanes (notes, packets, tool output and agent-to-agent messages are the machine lane; what a person reads is the human lane), says to write in full in the machine lane, never to shorten error messages, security findings, quotes or numbers with units, and gives the three mode contracts in one line each.
- §3: in Claude Code 2.1.296 the `AGENTS.md` loader defaults to `claude-md-or-agents-md`, reading `AGENTS.md` only in a project with no `CLAUDE.md`, so an `@` line in `AGENTS.md` beside a `CLAUDE.md` does nothing.
- §4: size is checkable by anyone with one `wc -c` line; drift is checked only by the author, in a session with the plugin.
- §5: it replaces a mod that was weighed and not built, and leaves the hooks, `init` and this repo's `CLAUDE.md` alone.
- §7 open risks: other tools may not follow an `@` line in `AGENTS.md`; the stamp line counts against the cap and readers see it; the template restates the mode contracts in fewer words and the test pins the mode names only, not the wording; a consumer may hand-edit the file and only the author runs `check`.

## Limits
- It is a design record. It cites a "study of Claude Code mods" that is not in the repo. The loader behaviour is stated for one Claude Code version and is volatile.

## Used in
- research/synthesis/tools-respeak.md
