---
repo: agentik-dev/agentik-commons
path: scripts/hygiene
commit: e456f4b
title: "hygiene: the public-hygiene scan (conventions section 6, overhaul-r1 section 5)"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- A stdlib Python scanner (about 470 lines) for the working tree of a git repo: tracked files plus untracked-not-ignored files. It prints counts only, never a matched line, so a scan log cannot leak what it finds. Each file's path is scanned as a line of that file; a symlink is scanned as path plus target, never the target's content.
- Six generic groups: home paths, private-network addresses (lan), sibling tool names, secret shapes (an Anthropic-style key, a GitHub token, an AWS key id, an age secret key, a private-key header), email addresses, and `renamed` (the pre-r1 tool names). Terms private to the owner (a name, host, domain or private repo) are kept outside the repo in a tab-separated file; a regex from that file is never printed, even in an error.
- Hardening visible in the code and tests: a file over 4 MiB is streamed in 1 MiB chunks rather than skipped; UTF-16 files are decoded and scanned; a file with NULs in its first 8 KB is scanned only for home, secret and email, over its printable runs of 8 or more bytes. The comments tag these with adversary finding ids (ADV10-17, ADV11-3, and others) from review rounds whose records are not in the public repo.
- `renamed` reads live files only: outside `design/`, `bugs/` and `history/`, not a `NICE_TO_HAVE.md` or `CHANGELOG*`; start-line briefs and each declared chain's newest charter (chosen by date, then n as an integer) are live. A repo declares chains in `.hygiene-live`.
- `.hygiene-allow` has `glob: group` rows; a `secret` exception outside `tests/fixtures/` is a usage error; under `history/sittings/` the `sibling` group is skipped because charters are records.
- Exit codes: 0 no hit outside the allowlist, 1 a hit, 2 usage, git failure, an unreadable file, a bad list line, or `--require-private` without a readable list. The r1 record (§2.4) says the previous copy had 1 and 2 the other way round; the docstring only states the new codes.
- This survey ran the scan on a copy of commons on 2026-10-14: 0 hits outside the allowlist, with the warning that no private list was present, so only the generic groups ran.

## Limits
- The generic groups cannot catch an owner-specific name; that depends on a private list that is not in any public repo, so no outsider can re-run the full scan.
- The docstring does not say why the `sibling` group exists; commons' allowlist reason says commons exists to name its sibling tools.
- The scan is regex-based: a name written in a form the patterns miss would pass.

## Used in
- research/synthesis/tools-commons.md
