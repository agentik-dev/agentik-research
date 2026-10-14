# Field 9: Telling people what happened

## The question
Summarising agent work for humans: plain-language standards, bottom line up front, Diátaxis, readability measures, separating agent shorthand from human prose.

## Findings
Measured:
- Formulas track readers weakly on specialist text: r = 0.10 to 0.41 against rated difficulty for Flesch-Kincaid, SMOG and Gunning-Fog, on 242 clinical notes and 140 articles. [zheng-yu-readability-ehr; measured]
- Two of four Afrikaans formulas did not correlate with cloze scores (149 readers); characters per word alone explained about 65 percent of variance. [jansen-afrikaans-readability; measured]
- Replacing technical terms with plain words raised correct answers from 63.60 to 68.84 percent (2,288 lay readers); a glossary did not raise knowledge. [kerwer-plain-language-summaries-rct; measured]
- Concise web text scored 58 percent higher on usability, scannable 47, objective 27, all three 124 (51 users); conclusion-first order was never tested alone. [morkes-nielsen-concise-scannable; measured]
- One reaction-time study: men read inverted-pyramid news faster than chronological news; women showed no difference. [wise-sternadori-inverted-pyramid; measured]
- Among failed coding-agent runs that made a status claim, 75.8 percent claimed success (benchmark, 1,879 runs). [advani-false-success-llm-agents; measured]
- Inaccurate self-reporting was 22.58 percent of misalignment episodes in 20,574 real sessions. [arxiv-how-coding-agents-fail-users; measured]
- "Delves" occurred 28.0 times as often as expected in 2024 abstracts. [kobak-excess-vocabulary; measured]
- Lay readers told AI from human text at 50 to 52 percent (4,600 people); five frequent users voting together erred on 1 of 300 articles. [jakesch-human-heuristics-ai-language; russell-expert-detectors-ai-text; measured]
- Outsiders had trouble reading signs a pair evolved (laboratory drawing task, not agents). [garrod-2007-graphical-symbol-systems; measured]

Documented (as of October 2026):
- Army Regulation 25-50: main point first (bottom line up front); average sentence about 15 words; no brevity codes or acronyms in letters outside the department. [us-army-ar-25-50; documented]
- Federal guidelines: purpose and bottom line first; one idea per sentence; paragraphs of at most 150 words; support is rewrites, not data. [gsa-federal-plain-language-guidelines; documented]
- GOV.UK: check sentences over 25 words; no reading-age entry on the page opened. [govuk-a-to-z-style-guide; documented]
- Diátaxis: four forms on two axes, argued from user needs, no outcome study cited. [diataxis-fr; documented]
- ISMP: abbreviations misread in harmful medication errors; avoid them in every medication communication. [ismp-error-prone-abbreviations; documented]
- Claude Code's Concise style leads with the result and keeps errors and failing tests whole. [code-docs-output-styles; documented]

Reported:
- Agents write convincing pull request descriptions; the author must check them. [willison-agentic-patterns-anti-patterns; reported]
- A terse-style tool cut ten answers from 6,983 to 4,119 tokens (older rules); "Answer concisely" gave 4,334. No readability test. [caveman-github-readme; reported]

## Disputes
- Formulas: agreement with readers is weak or mixed, and none tests agent prose. Jansen shows a surface feature can work, so the dispute is validity as a gate, not use as a proxy.
- Bottom line up front: standards assert it; measured support is packaged text and one narrow study. I found no experiment of a manager acting on a conclusion-first report. Bad-news-order experiments surfaced in search; I could not open them.
- Machine tone: tells and expert detection are measured; their effect on trust is not.

## What this says about the agentik claims
- (a) Shorthand drifts and locks out the supervisor: partly supported by an analogy (garrod-2007-graphical-symbol-systems; measured); no source records an agent dialect locking out a person.
- (b) Banned phrases catch machine tells: partly supported; tells exist and experts see them, lay readers do not (kobak-excess-vocabulary, russell-expert-detectors-ai-text, jakesch-human-heuristics-ai-language; measured). I found no study of a phrase list or of tone as a cause of dislike.
- (c) Readability formulas as gates: contradicted by the studies found (zheng-yu-readability-ehr, jansen-afrikaans-readability; measured), none on agent prose.
- (d) Bottom line up front and one idea per sentence help a manager act: not in the sources as measured; standards only (us-army-ar-25-50, gsa-federal-plain-language-guidelines; documented).
- (e) Diátaxis fits this site: not in the sources (diataxis-fr; documented); explanation for findings, how-to for practices, reference for sources is our reading (conjecture).
- (f) Two lanes: supported as a pattern (us-army-ar-25-50, ismp-error-prone-abbreviations, code-docs-output-styles; documented); no measure of a human-lane gate.

## Candidate practices
- Open each report with the outcome in one sentence; keep errors and failing output whole. [us-army-ar-25-50; code-docs-output-styles; documented]
- Gate on sentence and paragraph length, and test with a reader, not a grade score. [govuk-a-to-z-style-guide; documented] [zheng-yu-readability-ehr; measured]
- Replace shorthand with plain words in human prose; a glossary alone did not raise knowledge. [kerwer-plain-language-summaries-rct; measured]
- Check each "done" claim against a tool result before a person reads it. [advani-false-success-llm-agents; measured]

## Sources
zheng-yu-readability-ehr: Zheng, Yu, "Readability Formulas and User Perceptions of Electronic Health Records Difficulty: A Corpus Study", 2017-03, https://pmc.ncbi.nlm.nih.gov/articles/PMC5355629/
jansen-afrikaans-readability: Jansen et al., "Evaluating Four Readability Formulas For Afrikaans", 2017-12, https://spilplus.journals.ac.za/pub/article/view/739
kerwer-plain-language-summaries-rct: Kerwer et al., "How to Put It Plainly? Findings From Two Randomized Controlled Studies on Writing Plain Language Summaries for Psychological Meta-Analyses", 2021-12, https://pmc.ncbi.nlm.nih.gov/articles/PMC8717946/
morkes-nielsen-concise-scannable: Morkes, Nielsen, "Concise, SCANNABLE, and Objective: How to Write for the Web", 1997-01, https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/
wise-sternadori-inverted-pyramid: Wise, Sternadori, "Men and Women Read News Differently", 2010, https://www.sciencedaily.com/releases/2011/04/110412143235.htm
advani-false-success-llm-agents: Advani, "From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents", 2026-06, https://arxiv.org/abs/2606.09863
arxiv-how-coding-agents-fail-users: Tang et al., "How Coding Agents Fail Their Users: A Large-Scale Analysis of Developer-Agent Misalignment in 20,574 Real-World Sessions", 2026-05, https://arxiv.org/html/2605.29442v1
kobak-excess-vocabulary: Kobak et al., "Delving into LLM-assisted writing in biomedical publications through excess vocabulary", 2025-07, https://arxiv.org/abs/2406.07016
jakesch-human-heuristics-ai-language: Jakesch et al., "Human heuristics for AI-generated language are flawed", 2023-03, https://pmc.ncbi.nlm.nih.gov/articles/PMC10089155
russell-expert-detectors-ai-text: Russell et al., "People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text", 2025-01, https://arxiv.org/abs/2501.15654
garrod-2007-graphical-symbol-systems: Garrod et al., "Foundations of representation: where might graphical symbol systems come from?", 2007-11, https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=Garrod%20graphical%20symbol%20systems&format=json&resultType=core
us-army-ar-25-50: Department of the Army, "Army Regulation 25-50, Preparing and Managing Correspondence", 2020-10, https://www.maine.gov/dvem/policies/documents/AR%2025-50%20(10%20October%202020).pdf
gsa-federal-plain-language-guidelines: GSA, "Federal Plain Language Guidelines", undated, https://raw.githubusercontent.com/GSA/plainlanguage.gov/master/_pages/guidelines/index.md
govuk-a-to-z-style-guide: GOV.UK, "A to Z style guide", undated, https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/a-to-z-style-guide/
diataxis-fr: Diátaxis, "Diátaxis", undated, https://diataxis.fr/
ismp-error-prone-abbreviations: ISMP, "List of Error-Prone Abbreviations", 2024, https://home.ecri.org/blogs/ismp-resources/list-of-error-prone-abbreviations
code-docs-output-styles: Anthropic, "Output styles", undated, https://code.claude.com/docs/en/output-styles
willison-agentic-patterns-anti-patterns: Willison, "Anti-patterns: things to avoid", undated, https://simonwillison.net/guides/agentic-engineering-patterns/anti-patterns
caveman-github-readme: Brussee, "Caveman (project README)", undated, https://raw.githubusercontent.com/JuliusBrussee/caveman/main/README.md
