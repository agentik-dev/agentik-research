---
repo: agentik-dev/agentik-relay
path: design/guard-parser-r1.md
commit: a326550
title: "agentik-relay design: the guard's shell reader (r1)"
author: agentik-dev
published: 2026-09-30
accessed: 2026-10-14
kind: our-use
---

Read the header, section 1, the opening of section 2, two measurement bullets from section 4, and section 5.

## What it says
- Problem: three review rounds found shapes that hid a `git push` or `agentik relay run` from the hand-written shell reader in the hook guard (a quoted heredoc delimiter, a quote nested in a parameter expansion, a quote inside a command substitution, a substitution past depth four, a `case` inside a substitution, a reader panic turned into an allow). Each was patched, but the reader was about 750 lines of byte-walking that re-derived shell grammar by hand.
- Decision (DECISIONS entry 8): inside a relay row, parse each Bash command with the `mvdan.cc/sh` Go library and judge every command in the syntax tree; a line the parser rejects is denied in a row. The design admits one parser gives one reading while the shells on the box differ. The built reader parses each line under two dialects, bash and zsh, and judges the union (stated in design/relay-r1.md section 10, AR46, not in this file).
- Measured cost of the stricter reader on 598 ordinary lines: 53 became newly unreadable (19 with a quote inside a parameter expansion, 11 from two substitution rules, 23 rejected by a dialect); thirteen lines the old reader over-denied are now allowed. Reader time was 3.7 ms for a 16 KB command list and 13.1 ms for 60 KB, against the old reader's 2.4 ms and 8.7 ms.
- The dependency is the guard's first outside module; the build avoids `go mod tidy` because it pulls test-only modules over the network, and `make check` stays offline.

## Limits
- A spike outside the repo produced the numbers; the spike's own output is not in the repo. The hooks stay advisory, by the repo's own statement in design/relay-r1.md section 10.

## Used in
- research/synthesis/tools-relay.md
