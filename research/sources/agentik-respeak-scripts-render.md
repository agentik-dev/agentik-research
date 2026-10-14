---
repo: agentik-dev/agentik-respeak
path: plugin/scripts/respeak-render.sh, scripts/readme-render.sh, scripts/readme-fresh.sh
commit: 319f060
title: "The headless renderer and the README render and freshness scripts"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- `respeak-render.sh` (header read, lines 1-75) is the headless renderer for CI or a swarm's own post-processing: `--mode {eli5|bluf|technical} --source <file> --out <file> [--contract <file>] [--max-rounds 2]`. It builds a system prompt from the translator agent file, resolves the layered configuration for the output file, runs `claude -p` by default (the header names `claude-sonnet-5` as the default model, "as of October 2026"; `RESPEAK_RENDER_CMD` and `RESPEAK_RENDER_MODEL` substitute), strips any preamble above the first real content line, writes the file, then gates it with `respeak-measure.py --fail-on error` and, on failure, re-runs once with the report appended as a rewrite request, up to `--max-rounds` (1 to 5).
- Bounds: refuses (exit 2, before any runner starts) when `RESPEAK_RENDER_DEPTH` is set (a render inside a render), when the one-minute load is over `RESPEAK_LOAD_MAX` (default 4 x cores), or when `--max-rounds` is outside 1 to 5. The runner gets `--tools Read Grep Glob` and `--max-turns` (default 8) and a wall of `RESPEAK_RENDER_WALL` seconds (default 600) in its own process group. A runner result with `is_error` true or a `subtype` other than `success` is a failure, and nothing reaches `--out`. An account failure (usage or rate limit, login, API key, credit, OAuth token) exits 4 with one stderr line so a sitting stops instead of retrying. Exit 0 wrote a passing narrative; 1 still failing the gate; 2 usage or setup.
- `scripts/readme-render.sh` (header read) renders `README.md` from `design/readme/source.md` through that renderer with `design/readme/contract.txt`. The source is copied to a temp directory and the status line written into the copy; the copy is rendered; only when the render passes the style gate and `respeak-verify-edit.py` proves it prose-only against the copy do the copy move over the source and the render over `README.md`, and `readme-fresh.sh` stamps both. Any other exit leaves both untouched. The renderer runs as a marked helper one level deeper (depth 2 maximum).
- `scripts/readme-fresh.sh` (header read) decides freshness by content, not mtime: it reads the two SHA-256 lines in `design/readme/rendered.sha256`, then re-runs the verifier on source and README, so a README edited by hand and re-stamped reads stale. Verdicts: skipped (no source, no stamp), stale (stamp without source; no stamp or mismatch; verifier fails), source over the 24,576-byte ceiling, or fresh. `--stamp` refuses unless the verifier passes and the source is under the ceiling.

## Limits
- Headers only. The model name and the `claude -p` flags are a volatile fact of Claude Code in this period.
- The sittings record render runs that failed or re-worded prose (see `agentik-respeak-history-sittings`); the renderer is a model call, so its output varies run to run.

## Used in
- research/synthesis/tools-respeak.md
