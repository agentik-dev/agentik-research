---
url: https://arxiv.org/abs/2503.13657
title: "Why Do Multi-Agent LLM Systems Fail?"
author: Mert Cemri, Melissa Z. Pan, Shuyi Yang, Lakshya A. Agrawal, Bhavya Chopra, Rishabh Tiwari, Kurt Keutzer, Aditya Parameswaran, Dan Klein, Kannan Ramchandran, Matei Zaharia, Joseph E. Gonzalez, Ion Stoica
published: 2025-03 (v1 17 March 2025; v3 26 October 2025; this note reads the v3 HTML)
accessed: 2026-10-14
kind: measured
---

## What it says
- Method (Sections 3 and 4): the authors built MAST-Data, 1,642 annotated execution traces from 7 open-source multi-agent frameworks (ChatDev, MetaGPT, HyperAgent, AppWorld, AG2 MathChat, Magentic-One, OpenManus), run with models such as GPT-4o and Claude 3.7 Sonnet on coding, math and general agent benchmarks (including ProgramDev and SWE-Bench Lite). They derived a taxonomy, MAST, from 150 traces annotated by experts (Cohen's kappa 0.88) and checked it on two unseen systems and benchmarks (kappa 0.79). An LLM judge (OpenAI o1) was calibrated against humans at kappa 0.77 and used to label the rest.
- MAST has 14 failure modes in 3 categories: system design issues, inter-agent misalignment, task verification. Mode shares (Section 4): step repetition 15.7 percent; not recognizing task completion 12.4 percent; disobeying the task specification 11.8 percent; incorrect verification 9.10 percent; no or incomplete verification 8.20 percent; premature termination 6.20 percent; context loss 2.80 percent; disobeying a role specification 1.5 percent.
- Introduction: the authors report 41 percent to 86.7 percent failure rates across 7 open-source multi-agent systems (Figure 5 in Appendix B; its caption says the benchmarks differ, so the rates are not directly comparable). They also state that multi-agent gains over single-agent frameworks or best-of-N sampling often remain minimal, citing prior work, not their own comparison.
- Interventions (Section 5, Appendix H): giving the CEO agent the final say on termination in ChatDev gave +9.4 percent task success; improving role specifications alone gave +9.4 percent with the same model; adding a high-level task-objective verification step gave +15.6 percent on ProgramDev. The authors say such fixes are not enough and that tactical changes (prompts, topology, conversation management) were not consistently effective.
- Their conclusion (Insight 1): failure is not only a model limit, since a better-designed system gets gains from the same model. They conjecture that better base models alone will not remove the failures.
- Systems with an explicit verifier (MetaGPT, ChatDev) showed fewer total failures in Figure 4, yet the paper says a verifier is not a silver bullet.

## Limits
- The systems studied are role-play frameworks (software-company personas, debate), not Claude Code subagents; failure shares come from traces of GPT-4-class and Claude 3.x-era models. The paper reports no single-agent control of its own, so it measures how multi-agent systems fail, not whether they lose to one agent.
- Most labels come from an LLM judge (accuracy 94 percent against humans on a held-out set, Table 2); the released human-annotated set has 21 traces.

## Used in
- research/synthesis/field-5.md

## Also (question 8)
Re-read on 2026-10-14 from the v3 HTML (Section 4 failure-mode paragraphs; the page text was read to about 100,000 of 161,911 characters).
- Loop and verification failure shares across the 1,642 traces, as Section 4 states them: step repetition 15.7 percent, not recognising task completion 12.4 percent, incorrect verification 9.10 percent, no or incomplete verification 8.20 percent, premature termination 6.20 percent. Summed by category, the task-verification group is 23.5 percent (6.20 + 8.20 + 9.10); the page text states the modes, not the totals.
- A high-level task-objective verification step added to ChatDev raised success by 15.6 percent on ProgramDev (Section 4, FC3 paragraph; Section 5.3 gives it as the maximum improvement). The paper describes a verifier as helpful, not a cure.
- Used in (question 8): research/synthesis/field-8.md
