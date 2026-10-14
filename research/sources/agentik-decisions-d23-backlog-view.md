---
repo: agentik-dev/agentik-decisions
path: design/d23-backlog-view.md
commit: fabb212
title: "d23: the backlog view, and respeak kept optional"
author: agentik-dev
published: 2026-10-11
accessed: 2026-10-14
kind: our-use
---

## What it says
- Records the owner's answers of 2026-10-11 to an observer's study of the tool's modifications: ship a static include file, keep respeak optional, and add a backlog view of each repo's `NICE_TO_HAVE.md` ordered against its `HANDOFF.md` build order. At that date nothing in `src/` read either file (header paragraph). The file is marked `status: draft`.
- The levels are the session plugin's: S1 harm, S2 blocks the goal, S3 the build order, S4 the rest, never ahead of S3 (header paragraph; section 5 notes the "never ahead of S3" wording is the session profile's).
- The verb (section 1): `agentik decisions backlog [REPO...] [--json]`; reads the two files, writes nothing, takes no lock, runs no model. Exit 0 whenever the files could be read, 2 for usage or an unreadable file, never 1 (which stays `render`'s).
- Parsing (section 2): an item is a column-0 bullet; a level is a lone `S1` to `S4` token read in the item's lead, a sentence such as "Each line is S<n>.", or a heading; an item with no level is placed as S4 and printed `S4?`, never guessed higher.
- Placement (section 4): S1 then S2 before step 1; each open step followed by the S3, S4 and unlevelled items that share a backticked path with it; then unattached S3; then S4 and unlevelled.
- The respeak contract (section 6): never a dependency; the author generates an include file with respeak's author-side verb and ships it under `plugin/`; users get the behaviour without respeak. Only `ask` uses respeak at run time.
- Open risks the file names (section 8): a level in a bullet's tail reads `S4?` (errs low, never hides); a heading is read whole; done detection by the word `done` can misread a lead; one operations repo's NICE_TO_HAVE.md holds about 600 items, which "make a long view; a cap may follow use" (paraphrase of the file's wording).
- Line anchors at fabb212 (unchanged since 80d59eb; front matter still reads `status: draft`, `updated: 2026-10-11`). The levels are named at :9: S1 harm, S2 blocks the goal, S3 the build order, S4 the rest, never ahead of S3; they come from the session plugin's profile file, not from this repo. A level is a lone `\bS[1-4]\b` token (:24), read from the item's lead in one of four forms (:25); an unlevelled item is placed as S4 and printed `S4?` (:26); placement order is :37-41. These levels belong to `NICE_TO_HAVE.md` items. Entries in `DECISIONS.md` and question blocks have no level field.
- The risk line at d23:75 says one consumer's backlog of 600 items makes a long view and that "a cap may follow use" (an in-force cap on entries is the ledger's; the backlog has none at fabb212).

## Limits
- Built in sitting 2026-10-11-2 (281 tests then). The design is draft status, and its refuter rounds appear in NICE_TO_HAVE.md rather than here.
- Names several private repos in its text; the synthesis describes them generically.

## Used in
- research/synthesis/tools-decisions.md
- research/synthesis/journal-ledger.md
