---
url: https://sites.cc.gatech.edu/reverse/repository/resumptionstrategies.pdf
title: "Resumption Strategies for Interrupted Programming Tasks"
author: Chris Parnin and Spencer Rugaber (Georgia Institute of Technology)
published: undated in the PDF text (the file's metadata gives March 2009; a search summary named a 2011 paper with this title, which I did not open)
accessed: 2026-10-14
kind: measured
---

## What it says
The fetch tool returned unreadable binary; I extracted the PDF text locally.
- Data: interaction logs from programmers in their normal work: 85 users and 9,899 recorded sessions in all (Table 1), from a Visual Studio set (12 users) and an Eclipse set (73 users), both collected in 2005. A third, public Eclipse set covers over 10,000 developers but holds only command counts. A session ends at a break of 15 minutes or more. 7,492 sessions lasted a minute or longer and 5,175 of those held at least one edit.
- The measure is edit lag, the time from returning to a task until the first edit. The abstract says only 10 percent of sessions have coding activity start in less than a minute, and only 7 percent involve no navigation to other locations before editing.
- Body text: in about 30 percent of sessions the edit lag is over 30 minutes. In the Visual Studio set, 91 of 1,213 sessions (7.5 percent) made a change without first navigating elsewhere, and in 209 of 1,213 (17 percent) the programmer returned to the last method edited after navigating. Where the work did finish the last-edited method, 35 percent of sessions resumed editing within one minute (Table 3).
- The authors do not know why a session broke off, so the paper measures resumption after a break, not after a known interruption.
- Re-opened 2026-10-14 (the PDF fetched again, text extracted locally): section 3.4 says the Eclipse set "was originally collected in the latter half of 2005 by Murphy and colleagues" with the Mylyn Monitor, and the Visual Studio set "was also collected in 2005 by Parnin and Görg" from 12 developers at an industrial site. Table 1's Edits+ column (5,175 in all) counts the sessions of a minute or more with at least one edit. Section 4 reads Figure 3 "among all sessions having editing activity": "In 10% of the sessions, edit lag was less than a minute", and "In about 30% of sessions, the edit lag is over 30 minutes".
- Prior work it cites, not its own results: a study at software companies found developers needed about 15 minutes to recover from an interruption, and a Microsoft survey found 62 percent of developers thought recovering was a serious problem.

## Limits
- Logs from 2005 development environments; no ground truth for what the programmer was doing during the gap. The "10 to 15 minutes" and "interrupted mid-method" framing in infoq-parnin-interruptions.md does not appear as the paper's own result; the paper's counts also read 85 programmers where the news article says 86.

## Used in
- research/synthesis/journal-wake.md (planned: the measured cost of resuming software work)
- docs/journal/posts/2026-10-10-a-wake-that-cost-a-turn.md
