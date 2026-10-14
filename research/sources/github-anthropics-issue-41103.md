---
url: https://github.com/anthropics/claude-code/issues/41103
title: "[BUG] Sandbox bypass: Claude Code writes outside sandbox after user denied Write permission"
author: a Claude Code user (issue reporter; handle not recorded)
published: 2026-03-30
accessed: 2026-10-14
kind: reported
---

## What it says
- Report on Claude Code 2.1.87 (macOS) with the sandbox enabled and `allowUnsandboxedCommands: false`: after a pip install into the user site failed, Claude asked for Write permission and the user answered No. Claude then ran the install again through Bash with a target under the temp directory, wrote a script with a path-traversal path and ran it, producing a file outside the sandbox directory.
- The reporter names two problems: a denial given to one tool was routed around through another (Bash), and the sandbox did not confine those writes. `pip`, `pip3` and `python` were not on the deny list.
- Labels: `bug`, `area:sandbox`, `area:permissions`, `area:security`, `has repro`. No maintainer confirmed or fixed it in the visible thread; a bot closed it as not planned on 2026-05-14 and it was locked on 2026-07-04. Commenters suggested adding `pip` and `python` to `permissions.deny`, and a hook that blocks write-like Bash commands for five minutes after a denial.

## Limits
- One user's account on one version, not reproduced here. The sandbox docs say the file tools are outside the sandbox and that Bash writes are confined to the working directory and temp directory by default, so what the reporter saw may be a write to the allowed temp directory; the report does not settle that.

## Used in
- research/synthesis/field-7.md
