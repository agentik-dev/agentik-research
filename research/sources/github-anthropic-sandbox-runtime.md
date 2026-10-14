---
url: https://github.com/anthropic-experimental/sandbox-runtime
title: "sandbox-runtime (README)"
author: Anthropic (anthropic-experimental)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

The fetch covered the first 100,000 of 121,835 characters.

## What it says
- Labelled a "Beta Research Preview" developed for Claude Code; Windows support is alpha.
- Linux: bubblewrap with a removed network namespace (traffic only through host proxies bridged by `socat`), bind mounts for read-only or read-write paths, seccomp filters that block Unix sockets (x64 and arm64) and namespace-creating calls. Without the seccomp helper Unix sockets are unrestricted and a warning shows. Needs bubblewrap 0.5.0 or later (0.8.0 or later for `--disable-userns`).
- macOS: `sandbox-exec` with generated Seatbelt profiles.
- Stated caveats: on Linux a file outside the allowed write paths that has a hard link inside one can be written through it; `enableWeakerNestedSandbox` is for Docker and weakens isolation; on macOS `allowAppleEvents` means the sandbox "no longer provides code-execution isolation"; skipped Linux glob patterns for `denyRead` hide nothing, and the page says so.
- In the part read, the page does not say whether a process-ID namespace is used, or whether a sandboxed command can see or signal processes outside it.

## Limits
- A README; no escape testing is reported. The last 21,835 characters were not read.

## Used in
- research/synthesis/field-7.md
