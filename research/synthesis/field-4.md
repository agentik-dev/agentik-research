# Field 4: Budgets and pacing

## The question
Turn and context ceilings, usage windows, prompt-cache lifetimes and their cost, self-paced loops, idle waits.

## Findings
Measured:
- None. No source here is a controlled study; the two with a readable method are practitioners' transcripts, under reported.

Documented (as of October 2026):
- Cache lifetime, main conversation (interactive, `claude -p`, Agent SDK): one hour only on a subscription within plan usage; five minutes on usage credits, an API key or a cloud provider. [code-docs-prompt-caching; documented]
- Cache lifetime, everything else (subagents, workflows, teammates, forks, compaction): five minutes, except server-controlled helpers (one hour on a subscription). A fork reads the parent's cache; a fresh subagent does not. [code-docs-prompt-caching; documented]
- `promptCacheTtl` and `subagentPromptCacheTtl` (`5m` or `1h`, Claude Code 2.1.242 or later) set each bucket. [anthropic-docs-settings-compaction; documented]
- Cache write is 1.25 times base input (five minutes) or 2 times (one hour). Read is 0.1 times; 0.05 times on Opus 5.5 ($0.20 per million tokens) and Sonnet 5.5 ($0.10); 0.025 times on Fable 5.1 ($0.25). Caching pays off after one read (five minutes) or two (one hour). [anthropic-pricing-doc; documented]
- Current models list a 1,000,000-token window. Claude 4.6 and later cost the same per token across it (no premium above 200,000); Haiku 5.5 charges more above 100,000 prompt tokens. [anthropic-models-overview, anthropic-pricing-doc; documented]
- Subscriptions have a five-hour session limit and a weekly limit shared with chat; Max adds a weekly Fable limit. [support-claude-pro-max-usage; documented]
- Session and weekly limits span all models; Opus and Sonnet limits are per family. One workflow burst can exhaust the weekly limit. [code-docs-errors-usage-limits; documented]
- Subagent requests count toward the same limits as the main conversation. [code-docs-sub-agents-budgets; documented]
- `autoContinueAtUsageLimit` defaults to true (2.1.234 or later), covers only interactive claude.ai sessions, re-arms at most twice, and is not offered in `-p`, background sessions or API-key use. [code-docs-interactive-mode-usage-limit; documented]
- Fable can bill usage credits; in `-p` Claude Code bills it without asking. [code-docs-model-config; documented]
- Idle compaction (default on, 2.1.290 or later) runs after about 54 idle minutes above 200,000 tokens, on the one-hour cache. [anthropic-docs-settings-compaction; documented]
- `--max-turns` and `--max-budget-usd` work in print mode only and default to no limit; the budget is a client-side estimate that can pass the cap. [code-docs-cli-reference-budgets; documented]
- Status line: `rate_limits.five_hour` and `seven_day` give `used_percentage` (0 to 100) and `resets_at` (epoch seconds); `prompt_cache` gives `warm`, `ttl`, `hit_ratio`, `misses` (2.1.251 or later). [code-docs-statusline; documented]
- Stream event `rate_limit_event`: TypeScript lists `resetsAt`; Python lists `rate_limit_type` of `five_hour`, `seven_day`, `seven_day_opus`, `seven_day_sonnet`, `overage`. [code-docs-agent-sdk-rate-limit-event; documented]
- Bash timeout defaults to 120,000 ms (maximum 600,000 ms); a timed-out command moves to the background (30 minutes unattended, maximum 2 hours). [code-docs-tools-reference-bash-timeouts; documented]
- Hook timeout defaults to 600 seconds (command), 30 (prompt), 60 (agent). [code-docs-hooks-timeouts; documented]
- A self-paced `/loop` waits 1 minute to 1 hour; `/loop 5m` runs 4 minutes 45 seconds apart so the five-minute cache stays warm; recurring tasks expire after 7 days; a scheduled task fires on an idle session and resends the full context. [code-docs-scheduled-tasks, code-docs-costs; documented]

Reported:
- Across 63,880 requests the hit rate was 96.59 percent token-weighted but 86.41 percent for the median session, where writes were 75.9 percent of cache cost. [primeline-cache-cost; reported]
- Opus 4.6 per turn: about $0.03 at turn 20 (60K tokens), $0.15 at turn 50 (150K), over $0.33 at turn 80. [zivtech-economics-session-timing; reported]

## The cost model
- Each turn resends the whole conversation, priced as uncached input, cache write or cache read, plus output. [code-docs-costs, anthropic-pricing-doc; documented]
- A miss follows a gap past the lifetime, a model switch, a tool-definition change, compaction or an upgrade. [code-docs-prompt-caching; documented]
- A warm 200,000-token turn costs $0.04 on Opus 5.5; a cold one-hour rewrite costs $1.60 (40 times). [anthropic-pricing-doc; documented prices, arithmetic ours]
- So cost is turns times context only while warm; each miss reprices the context at the write rate. [anthropic-pricing-doc; conjecture; test: sum `cache_creation` tokens per session]

## Disputes
- Lifetime history: one user's 119,866 calls showed one-hour writes from 1 February to 5 March 2026, then five-minute writes (93 percent by 21 March); the October 2026 documentation gives per-bucket lifetimes. [github-claude-code-issue-46829; reported]
- Whether cache reads count in full against subscription limits is unconfirmed; the comments are self-reported. [github-claude-code-issue-24147; reported]
- All cost figures are single-user; the aggregate 96.59 percent hides the 86.41 percent median. [primeline-cache-cost; reported]

## What this says about the agentik claims
- (a) Partly: the one-hour main loop and five-minute subagents hold only on a subscription within plan usage; the 2 times write holds; the 0.1 times read is wrong for Opus 5.5 and Sonnet 5.5 (0.05) and Fable 5.1 (0.025). [code-docs-prompt-caching, anthropic-pricing-doc]
- (b) Supported: shared limits, no wait in `-p`, default true, Fable credits. [code-docs-sub-agents-budgets, code-docs-interactive-mode-usage-limit]
- (c) Partly: separate windows and `resetsAt` are documented; `rateLimitType` is not. [code-docs-agent-sdk-rate-limit-event]
- (d) Contradicted: the field is `used_percentage`, not `percentUsed`. [code-docs-statusline]
- (e) Not in the docs: no 60-minute cloud prompt, no figure for a late wake (the repo saw 3,636 to 3,648 seconds). [code-docs-scheduled-tasks; agentik-session-nice-to-have; our use]
- (f) Supported, first-order only. [code-docs-costs]
- (g) Supported. [anthropic-models-overview]
- (h) Contradicted: Bash default 120 seconds, hook default 600 seconds. [code-docs-tools-reference-bash-timeouts, code-docs-hooks-timeouts]

## Candidate practices
- Keep a self-paced wait under the cache lifetime in force. [code-docs-scheduled-tasks; documented]
- Set `--max-turns` and `--max-budget-usd` on every unattended run. [code-docs-cli-reference-budgets; documented]
- Keep model and effort fixed mid-task. [code-docs-prompt-caching; documented]
- Write a handoff and start fresh when a session returns cold. [zivtech-economics-session-timing; reported]

## Sources
code-docs-prompt-caching: Anthropic, "How Claude Code uses prompt caching", undated, https://code.claude.com/docs/en/prompt-caching
anthropic-docs-settings-compaction: Anthropic, "Settings reference", undated, https://code.claude.com/docs/en/settings-reference
anthropic-pricing-doc: Anthropic, "Pricing", undated, https://platform.claude.com/docs/en/about-claude/pricing
anthropic-models-overview: Anthropic, "Models overview", undated, https://platform.claude.com/docs/en/models/overview
support-claude-pro-max-usage: Anthropic, "Using Claude Code with your Pro or Max plan", undated, https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan
code-docs-errors-usage-limits: Anthropic, "Error reference", undated, https://code.claude.com/docs/en/errors
code-docs-sub-agents-budgets: Anthropic, "Subagents", undated, https://code.claude.com/docs/en/sub-agents
code-docs-interactive-mode-usage-limit: Anthropic, "Interactive mode", undated, https://code.claude.com/docs/en/interactive-mode
code-docs-model-config: Anthropic, "Model configuration", undated, https://code.claude.com/docs/en/model-config
code-docs-cli-reference-budgets: Anthropic, "CLI reference", undated, https://code.claude.com/docs/en/cli-reference
code-docs-statusline: Anthropic, "Customize your status line", undated, https://code.claude.com/docs/en/statusline
code-docs-agent-sdk-rate-limit-event: Anthropic, "Agent SDK reference", undated, https://code.claude.com/docs/en/agent-sdk/python
code-docs-tools-reference-bash-timeouts: Anthropic, "Tools reference", undated, https://code.claude.com/docs/en/tools-reference
code-docs-hooks-timeouts: Anthropic, "Hooks reference", undated, https://code.claude.com/docs/en/hooks
code-docs-scheduled-tasks: Anthropic, "Run prompts on a schedule", undated, https://code.claude.com/docs/en/scheduled-tasks
code-docs-costs: Anthropic, "Manage costs effectively", undated, https://code.claude.com/docs/en/costs
primeline-cache-cost: Robin, "Is Your Claude Code Cache Really 96% Efficient?", 2026-08-30, https://primeline.cc/blog/claude-md-cache-cost
zivtech-economics-session-timing: Alex Urevick-Ackelsberg, "The Economics of Claude Code, Part 1: Session Timing", 2026-04-22, https://www.zivtech.com/blog/economics-of-claude-code-part-1-session-timing
github-claude-code-issue-46829: seanGSISG, "Cache TTL silently regressed from 1h to 5m", 2026-04-12, https://github.com/anthropics/claude-code/issues/46829
github-claude-code-issue-24147: RedhatEnt, "Cache read tokens consume 99.93% of usage quota", 2026-02-08, https://github.com/anthropics/claude-code/issues/24147
agentik-session-nice-to-have: agentik-dev/agentik-session, "NICE_TO_HAVE.md" at e7f0723, 2026-10-13, https://github.com/agentik-dev/agentik-session/blob/e7f0723/NICE_TO_HAVE.md
