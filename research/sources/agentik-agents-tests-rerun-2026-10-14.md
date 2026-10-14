---
repo: agentik-dev/agentik-agents
path: tests/ (the run-path, rig and launcher, and API-run suites), bin/ (the API wrapper)
commit: 78ce312
title: "A second re-run of three agentik-agents test suites at the first public commit, and what each failure traces to"
author: agentik-dev (the suite owner); the re-run is this site's
published: undated
accessed: 2026-10-14
kind: our-use
---

Run on 2026-10-14 in this site's Linux sandbox (GNU coreutils 9.4, run as root), in a scratch `git clone` of the attached checkout at 78ce312, with a fake home folder and a fake `claude` that exits 1 first on PATH. No real model or API was reached. Suites run: the run-path suite, the rig and launcher suite and the API-run suite, the three that failed in the earlier re-run (see agentik-agents-tests). Read: the code behind each failing check (the run-path suite's lines 1-50 and 100-196, the rig suite's lines 62-100, the API-run suite's lines 605-630) and the API wrapper's environment strip, lines 1515-1545, and its proxy check, lines 1546-1597. Nothing was run on the owner's machine.

## What it says
- Counts match the earlier re-run: run-path 23 passed and 3 failed; rig and launcher 51 passed and 2 failed; API-run 80 passed and 1 failed. A first attempt in a plain `git archive` copy also failed two rig checks that ask `git check-ignore` about `secrets/`, because that copy was not a git repository; the clone does not fail them.
- Two failures are mode checks: run-path "the pin is mode 0600" and rig "backends.json is mode 600 (it holds an API key)". Each runs `stat -f '%Lp'` first and `stat -c '%a'` second. GNU `stat` reads `-f` as "display file system status instead of file status", so the captured mode is GNU file-system output followed by `600`, and the string comparison with `600` fails.
- One failure is rig "this platform's chmod really does reject a bare -- (so the cold-start bug was real here)". It printed "rc=0: ". GNU `chmod 700 -- <dir>` exits 0 here, so the check, which expects the platform to reject the bare `--`, fails.
- Two failures are run-path "matching proxy is silent" and "no proxy and no pin is silent", each printing "unexpected warning". The test's `proxyrun` clears `HTTPS_PROXY`, `https_proxy`, `ALL_PROXY` and `all_proxy` before each case, so the sandbox's proxy variables do not reach the wrapper. The warnings were the wrapper's "ignoring inherited ANTHROPIC_BASE_URL (set CLAUDE_API_AGENT_ALLOW_ENDPOINT_OVERRIDE=1 to permit it).", and the same line for `NODE_OPTIONS`, `NODE_EXTRA_CA_CERTS` and `SSL_CERT_FILE`, four variables this sandbox sets and the wrapper strips and warns about (lines 1530-1541). With those four unset for the run, the run-path suite gave 25 passed and 1 failed: both checks passed and only the mode check failed.
- The API-run failure is "a caller's exported log path is left alone", printing "rc=1 exists=False". The check runs `tests/test-run-path.sh` with a sentinel log path and needs exit 0 and no sentinel. The sentinel was not created; the check failed on the run-path suite's exit 1.
- So this re-run reads the earlier note's "an unexpected proxy warning in the proxy-pin checks (the sandbox sets proxy variables)" differently: the warnings named other inherited variables, not proxy variables.

## Limits
- One sandbox, one platform, one run. It shows what each failing check printed and why here; it does not show the suites pass on macOS, which they target.
- Every suite is stub-driven, so a pass is not evidence the tools work against a real model or API.

## Used in
- docs/tools/agents.md
