# Draft outline: "The probe that stopped a night" (journal entry, 2026-09-30)

1. Problem: helpers and reviewers run beside an unattended night and share its state.
2. Human example: Reason 2000, the Swiss cheese model; active failures and latent conditions; one quote (reason-2000-human-error-models-management; documented).
3. Research: `Bash(git push *)` misses `git -C . push`, "isn't a security boundary" (code-docs-permissions-guardrails); the sandbox covers Bash and children, off by default, file tools and hooks outside (code-docs-sandboxing-guardrails); PreToolUse exit 2 denies (code-docs-hooks-reference) (documented, October 2026).
4. What happened: 2026-09-30 06:56Z to 06:58Z, hand-built relay with its own lock port, `agentik relay plan` four times; pid dir from the user database; the pid file replaced; stop `lock-moved`; nine rows ready; port lock never lost (agentik-relay-ar36-pid-file-guard, packet :17); the rule only in prompts, the guard only inside a row (agentik-relay-ar40-helper-relay-guard, :15, :17); the route named in ADV13-13 (review-adv13.md:91) and relay-r1.md:205.
5. Changes and evidence: AR36 rulings 1 to 3, three tests; AR40 `helper-relay`, three tests; review residuals: spelling bypasses, `make build`, a false positive (NICE_TO_HAVE.md:138-142); no count of denials (our use, two incidents).
6. Open: missing file versus held port, undecided (NICE_TO_HAVE.md:173); inode-only check (ADV14-10); the sandbox not built (relay-r1.md:253).
Links: field/unattended-and-guardrails.md, tools/relay.md.
