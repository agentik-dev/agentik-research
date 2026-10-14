# Field 1: Length

## The question
How does model behaviour change as context grows (long-context retrieval, "lost in the middle", context rot, instruction drift, accumulated tool output)? What is measured, and what is anecdote?

## Findings
Measured:
- Padding alone lowers reasoning accuracy from 0.92 to 0.68 at 3,000 tokens, averaged over five 2023 models (no Claude). [levy-same-task-more-tokens; measured]
- With little word overlap, 11 of 13 models scored half of their base score or less at 32K tokens. Claude 3.5 Sonnet fell from 87.5 percent (base) to 77.6 at 4K and 29.8 at 32K. [modarressi-nolima; measured]
- GPT-4 (claimed 128K) averaged 96.6 percent at 4K tokens and 81.2 at 128K; its effective length was 64K. Almost all of 17 models fell below the threshold before their claimed length. No Claude. [hsieh-ruler; measured]
- Accuracy fell 13.9 to 85 percent as input grew, even when retrieval was perfect and the padding was blank or masked. [du-context-length-alone; measured]
- Lost in the middle: accuracy peaks for the first or last position. GPT-3.5-Turbo fell more than 20 percentage points mid-context, below its 56.1 percent no-document score. 2023 models. [liu-lost-in-the-middle; measured]
- Across 18 models (five Claude), prompts of about 113K tokens scored below the same question in about 300 tokens; Claude's gap was largest, tied to abstention. [chroma-context-rot; measured]
- At 500 simultaneous instructions the best model scored 68.9 percent; Claude Opus 4 scored 44.6 and Sonnet 4 42.9. Omission was the main error. [jaroslawicz-ifscale; measured]
- Multi-turn use scored 39 percent lower than one full message; one consolidated message recovered 95.1 percent of the single-turn score. [laban-lost-in-multiturn; measured]
- Tool output was about 84 percent of a coding-agent turn's tokens. Masking old output cut cost 50 percent or more in four of five setups; solve rate moved -2.0 to +2.8 points in three of those and fell 4.0 points in the fourth. [lindenbauer-observation-masking; measured]
- Agent-generated context files lowered resolution 0.5 to 2 percent and raised cost 20 to 23 percent. The test adds a file and does not vary its length. [gloaguen-agents-md-context-files; measured]

Documented (as of October 2026):
- Anthropic says accuracy and recall degrade as tokens grow ("context rot"). [anthropic-context-windows-doc; documented]
- A 1M window applies to Fable and Mythos models, Opus 4.6 and later, Sonnet 4.6 and later, and Haiku 5.5; Sonnet 4.5 and older have 200k. [anthropic-context-windows-doc; documented]
- Pricing is standard across the 1M window except Haiku 5.5, where prompts over 100,000 tokens cost 0.50 / 2.50 dollars per million input / output tokens, against 0.10 / 0.50. Base: Fable 5.1 10 / 50, Opus 5.5 4 / 20, Sonnet 5.5 2 / 10. [anthropic-pricing-doc; documented]
- Claude Code defaults Fable, Sonnet 5 and later, Haiku 5.5 and Opus 4.7 and later to 1M (Opus 4.6 and Sonnet 4.6 need `[1m]`) and compacts at about 967K tokens. [code-docs-model-config; documented]
- Claude Code says performance degrades as the window fills (no measurement); CLAUDE.md under 200 lines. [code-docs-best-practices; code-docs-memory; documented]

Reported:
- A practitioner taxonomy of four failures (poisoning, distraction, confusion, clash) relays other studies; its Gemini observation past 100k tokens is anecdotal by its source's own wording. [breunig-how-long-contexts-fail; reported]

## Disputes
- Position: 2023 models show a U-shape (liu-lost-in-the-middle); 2025 models showed no notable variation across 11 positions on a simple task (chroma-context-rot). Neither tests a current Claude model.
- Currency: the newest Claude models in the length studies are Opus 4 and Sonnet 4 (mid-2025). No independent measurement of a Claude 5.x model appears here, and the October 2026 documentation still states context rot.
- Anecdote: no source measures degradation inside a Claude Code session as it fills; the Gemini observation is anecdotal and the attention mechanisms offered as causes are untested here.

## What this says about the agentik claims
- (a) Fresh context per sitting. Direction supported, strength unmeasured. A consolidated single message recovered 95.1 percent (laban-lost-in-multiturn; measured). Claude Code advises a clean session over accumulated corrections (code-docs-best-practices; documented). Against: the same page says to let context accumulate sometimes; no study compares restart, compaction and continuing. "The whole point" is conjecture; the owner's 2026-09-29 ruling is recorded in agentik-session-design-packets (our use).
- (b) The cap of 25 ledger entries. Direction supported: adherence falls as instruction count grows (jaroslawicz-ifscale; measured), and longer CLAUDE.md files reduce adherence (code-docs-memory; documented). The number 25 has no source: IFScale starts at 10 instructions, and the cap counts entries, not bytes (agentik-decisions-d17-four-verbs; our use). Conjecture.
- (c) Windows. agentik-session lists opus, sonnet and haiku at 200000, and 1M only for fable, mythos and `opus[1m]` (agentik-session-code-profiles; our use). The October 2026 documentation gives 1M to Opus 5.5, Sonnet 5.5 and Haiku 5.5 (anthropic-context-windows-doc; code-docs-model-config; documented). The table is stale or cautious; the 0.8 checkpoint rests on it.

## Candidate practices
- Clear context between unrelated tasks and start a long task from a short written brief. [laban-lost-in-multiturn; measured] [code-docs-best-practices; documented]
- Keep always-loaded instructions short (Claude Code: under 200 lines); load rare ones on demand. [code-docs-memory; documented] [jaroslawicz-ifscale; measured]
- Mask or clear old tool output; send large reads to subagents. [lindenbauer-observation-masking; measured] [code-docs-best-practices; documented]
- Read window size from current documentation, dated, not a fixed table. [anthropic-context-windows-doc; documented]

## Sources
levy-same-task-more-tokens: Levy, Jacoby, Goldberg, "Same Task, More Tokens: the Impact of Input Length on the Reasoning Performance of Large Language Models", 2024-02, https://arxiv.org/abs/2402.14848
modarressi-nolima: Modarressi et al., "NoLiMa: Long-Context Evaluation Beyond Literal Matching", 2025-02, https://arxiv.org/abs/2502.05167
hsieh-ruler: Hsieh et al., "RULER: What's the Real Context Size of Your Long-Context Language Models?", 2024-04, https://arxiv.org/abs/2404.06654
du-context-length-alone: Du et al., "Context Length Alone Hurts LLM Performance Despite Perfect Retrieval", 2025-10, https://arxiv.org/abs/2510.05381
liu-lost-in-the-middle: Liu et al., "Lost in the Middle: How Language Models Use Long Contexts", 2023-07, https://arxiv.org/abs/2307.03172
chroma-context-rot: Hong, Troynikov, Huber, "Context Rot: How Increasing Input Tokens Impacts LLM Performance", 2025-07, https://www.trychroma.com/research/context-rot
jaroslawicz-ifscale: Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?", 2025-07, https://arxiv.org/abs/2507.11538
laban-lost-in-multiturn: Laban et al., "LLMs Get Lost In Multi-Turn Conversation", 2025-05, https://arxiv.org/abs/2505.06120
lindenbauer-observation-masking: Lindenbauer et al., "The Complexity Trap: Simple Observation Masking Is as Efficient as LLM Summarization for Agent Context Management", 2025-08, https://arxiv.org/abs/2508.21433
gloaguen-agents-md-context-files: Gloaguen et al., "Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?", 2026-02, https://arxiv.org/abs/2602.11988
anthropic-context-windows-doc: Anthropic, "Context windows", undated, https://platform.claude.com/docs/en/build-with-claude/context-windows
anthropic-pricing-doc: Anthropic, "Pricing", undated, https://platform.claude.com/docs/en/about-claude/pricing
code-docs-model-config: Anthropic, "Model configuration", undated, https://code.claude.com/docs/en/model-config
code-docs-best-practices: Anthropic, "Best practices for Claude Code", undated, https://code.claude.com/docs/en/best-practices
code-docs-memory: Anthropic, "How Claude remembers your project", undated, https://code.claude.com/docs/en/memory
breunig-how-long-contexts-fail: Breunig, "How Long Contexts Fail", 2025-06-22, https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html
agentik-session-design-packets: agentik-dev/agentik-session, "design/packets: one packet per build row", undated, https://github.com/agentik-dev/agentik-session/blob/e7f0723/design/packets/
agentik-session-code-profiles: agentik-dev/agentik-session, "claude_session/profiles.yaml: the shipped profiles and the models table", undated, https://github.com/agentik-dev/agentik-session/blob/e7f0723/claude_session/profiles.yaml
agentik-decisions-d17-four-verbs: agentik-dev/agentik-decisions, "Packet d17: the four-verb redesign", 2026-09-28, https://github.com/agentik-dev/agentik-decisions/blob/80d59eb/design/d17-four-verbs.md
