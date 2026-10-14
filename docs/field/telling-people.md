# Telling people what happened

Open with the outcome, keep the errors whole, and check a "done" claim against a tool result before a person reads it. Those three rules are the best supported in this question, though the first rests on standards rather than measurements. One benchmark found a false-success rate of 75.8 percent among runs that made a status claim,[^advani] and inaccurate self-reports made up 22.58 percent of the misalignment episodes in 20,574 real sessions.[^tang] The plain-language and military writing standards say to put the bottom line first,[^army][^gsa] and Claude Code's own Concise output style leads with the result and keeps errors and failing tests whole.[^outputstyles] Readability formulas are weak gates: they track rated difficulty at r = 0.10 to 0.41 on specialist text.[^zheng] This chapter answers research question 9: summarising agent work for humans, plain-language standards, bottom line up front, Diátaxis, readability measures, and separating agent shorthand from human prose.

## What is measured

- Readability formulas track readers weakly on specialist text: Flesch-Kincaid, SMOG and Gunning-Fog correlated at r = 0.10 to 0.41 with rated difficulty on 242 clinical notes and 140 articles.[^zheng] Two of four Afrikaans formulas did not correlate with cloze scores from 149 readers, and characters per word alone explained about 65 percent of the variance.[^jansen]
- Replacing technical terms with plain words raised correct answers from 63.60 to 68.84 percent in one arm of a randomised study, 1,026 lay readers of 2,288 across both studies; adding a glossary did not raise knowledge.[^kerwer]
- Concise web text scored 58 percent higher on usability than the control, scannable text 47 percent, objective text 27, and all three together 124, with 51 users. Conclusion-first order was never tested on its own.[^morkes] One study timed responses to a secondary signal while people read: men responded faster during inverted-pyramid news than chronological news, read as lower cognitive load, while women showed no difference.[^wise]
- One benchmark of 1,879 coding-agent runs found a false-success rate of 75.8 percent among runs that made a status claim.[^advani] Inaccurate self-reporting was 22.58 percent of misalignment episodes in 20,574 real sessions.[^tang]
- The word "delves" occurred 28.0 times as often as expected in 2024 biomedical abstracts.[^kobak] Lay readers told AI text from human text at 50 to 52 percent, over 4,600 people; five frequent users of a writing model, voting together, erred on 1 of 300 articles.[^jakesch][^russell]
- Outsiders had trouble reading signs that a pair of people had evolved between themselves, in a laboratory drawing task. The subjects were people, not agents.[^garrod]

## What the standards document, as of October 2026

- Army Regulation 25-50: the main point first, which the regulation calls the bottom line up front; an average sentence of about 15 words; no brevity codes or acronyms in letters to people outside the Department of Defense.[^army]
- The Federal Plain Language Guidelines, as kept in the plainlanguage.gov repository: purpose and bottom line first; one idea per sentence; paragraphs of at most 150 words. The guidelines' support is rewrites, not data.[^gsa] The live site has since moved to a shorter guide that states none of these three rules.[^digitalgov]
- GOV.UK's style guide: check any sentence over 25 words.[^govuk]
- Diátaxis: four forms of documentation on two axes, argued from user needs; no outcome study is cited.[^diataxis]
- The Institute for Safe Medication Practices lists abbreviations that were misread in harmful or potentially harmful medication errors and says to avoid them in every medication communication.[^ismp]
- Claude Code's Concise output style leads with the result and keeps errors and failing tests whole.[^outputstyles]

## What is reported

- Agents write convincing pull request descriptions, and the author has to check them.[^willison]
- A terse-style tool cut ten answers from 6,983 tokens to 4,119 under its older rules, against 4,334 for the instruction "Answer concisely". It ran no readability test.[^caveman]

## Where the evidence stops

- Formulas: their agreement with readers is weak or mixed, and none of the studies tests agent prose. One surface feature (characters per word) worked in one language, so the dispute is about formulas as a gate, not as a rough proxy.[^zheng][^jansen]
- Bottom line up front: the standards assert it, and the measured support is for packaged text and one narrow study. No experiment of a manager acting on a conclusion-first report was found.[^morkes][^wise]
- Machine tone: tells and expert detection are measured; their effect on a reader's trust is not.[^kobak][^russell]

## What this means for the agentik tools

agentik-respeak splits agent traffic from human prose and gates the human lane. Its premise that agent shorthand drifts into a dialect that locks out the supervising person rests on an analogy from human pairs; no source records an agent dialect locking out a person, and a search of the repo's history, design records, changelog and backlog at the commit read found no such incident either.[^garrod][^respeakreadme][^respeakrepo] Machine-prose tells exist and expert readers see them, but no study tests a banned-phrase list or shows that tone causes dislike.[^kobak][^russell] The readability grades the tool declares per mode are a weak gate by the studies found, and its scanner computes sentence length and dash density, never a grade.[^zheng][^respeakconfig][^respeakmeasure] Bottom line up front is a standard, not a measured effect.[^army] The two-lane split matches the Army regulation's rule on brevity codes, the medication-abbreviation list and Claude Code's own output style, so it is supported as a pattern; the gate's effect on readers is unmeasured.[^army][^ismp][^outputstyles] That Diátaxis fits a site like this one is our reading, not a finding.[^diataxis]

## Practices this evidence supports

- Open each report with the outcome in one sentence, and keep errors and failing output whole. Documented.[^army][^outputstyles]
- Gate on sentence and paragraph length, and test with a reader, not with a grade score. Documented and measured.[^govuk][^zheng]
- Replace shorthand with plain words in human prose; a glossary alone did not raise knowledge. Measured.[^kerwer]
- Check each "done" claim against a tool result before a person reads it. Measured for the false-success rate; the effect of checking is conjecture.[^advani]

## Sources

[^advani]: Advani, "From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents", June 2026, <https://arxiv.org/abs/2606.09863>.
[^tang]: Tang et al., "How Coding Agents Fail Their Users: A Large-Scale Analysis of Developer-Agent Misalignment in 20,574 Real-World Sessions", May 2026, <https://arxiv.org/html/2605.29442v1>.
[^army]: Department of the Army, "Army Regulation 25-50, Preparing and Managing Correspondence", 10 October 2020, <https://www.maine.gov/dvem/policies/documents/AR%2025-50%20(10%20October%202020).pdf>.
[^gsa]: General Services Administration, "Federal Plain Language Guidelines", the plainlanguage.gov repository copy, read 2026-10-14, <https://raw.githubusercontent.com/GSA/plainlanguage.gov/master/_pages/guidelines/index.md>.
[^digitalgov]: General Services Administration, "Plain language", digital.gov guide, read 2026-10-14, <https://digital.gov/guides/plain-language>.
[^outputstyles]: Anthropic, "Output styles", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/output-styles>.
[^zheng]: Jiaping Zheng and Hong Yu, "Readability Formulas and User Perceptions of Electronic Health Records Difficulty: A Corpus Study", March 2017, <https://pmc.ncbi.nlm.nih.gov/articles/PMC5355629/>.
[^jansen]: Jansen et al., "Evaluating Four Readability Formulas For Afrikaans", December 2017, <https://spilplus.journals.ac.za/pub/article/view/739>.
[^kerwer]: Kerwer et al., "How to Put It Plainly? Findings From Two Randomized Controlled Studies on Writing Plain Language Summaries for Psychological Meta-Analyses", December 2021, <https://pmc.ncbi.nlm.nih.gov/articles/PMC8717946/>.
[^morkes]: John Morkes and Jakob Nielsen, "Concise, SCANNABLE, and Objective: How to Write for the Web", January 1997, <https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/>.
[^wise]: Kevin Wise and Miglena Sternadori, reported in "Men and Women Read News Differently", ScienceDaily, 12 April 2011, <https://www.sciencedaily.com/releases/2011/04/110412143235.htm>.
[^kobak]: Dmitry Kobak et al., "Delving into LLM-assisted writing in biomedical publications through excess vocabulary", July 2025, <https://arxiv.org/abs/2406.07016>.
[^jakesch]: Maurice Jakesch et al., "Human heuristics for AI-generated language are flawed", March 2023, <https://pmc.ncbi.nlm.nih.gov/articles/PMC10089155>.
[^russell]: Jenna Russell et al., "People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text", January 2025, <https://arxiv.org/abs/2501.15654>.
[^garrod]: Simon Garrod et al., "Foundations of representation: where might graphical symbol systems come from?", Cognitive Science, November 2007, record read through Europe PMC, <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=Garrod%20graphical%20symbol%20systems&format=json&resultType=core>.
[^govuk]: GOV.UK, "A to Z style guide", read 2026-10-14, <https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/a-to-z-style-guide/>.
[^diataxis]: Daniele Procida, "Diátaxis", read 2026-10-14, <https://diataxis.fr/>.
[^ismp]: Institute for Safe Medication Practices, "List of Error-Prone Abbreviations", 2024, <https://home.ecri.org/blogs/ismp-resources/list-of-error-prone-abbreviations>.
[^willison]: Simon Willison, "Anti-patterns: things to avoid", agentic engineering patterns, read 2026-10-14, <https://simonwillison.net/guides/agentic-engineering-patterns/anti-patterns>.
[^caveman]: Julius Brussee, "Caveman", project README read 2026-10-14, <https://raw.githubusercontent.com/JuliusBrussee/caveman/main/README.md>.
[^respeakreadme]: agentik-dev/agentik-respeak, "README.md", commit 319f060, <https://github.com/agentik-dev/agentik-respeak/blob/319f060/README.md>.
[^respeakconfig]: agentik-dev/agentik-respeak, "plugin/config/respeak.config.yaml", commit 319f060, <https://github.com/agentik-dev/agentik-respeak/blob/319f060/plugin/config/respeak.config.yaml>.
[^respeakmeasure]: agentik-dev/agentik-respeak, "plugin/scripts/respeak-measure.py", commit 319f060, <https://github.com/agentik-dev/agentik-respeak/blob/319f060/plugin/scripts/respeak-measure.py>.
[^respeakrepo]: agentik-dev/agentik-respeak, the repository tree at commit 319f060, <https://github.com/agentik-dev/agentik-respeak/tree/319f060>.
