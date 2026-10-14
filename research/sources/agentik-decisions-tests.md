---
repo: agentik-dev/agentik-decisions
path: tests/
commit: 80d59eb
title: "tests/ (what the suite pins, and the sample ledger)"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
Opened: the test names in `test_ledger.py`, `test_answer.py`, `test_ask.py`, `test_render.py`, `test_new.py`; the lines of `test_ledger.py` that pin the caps; `tests/skips.allow`; `tests/fixtures/sectioned/DECISIONS.md` and `OPEN-QUESTIONS.md`. Not opened: the other test files (their purpose is taken from the README's table), `tests/fixtures/backlog/`, `tests/gates.py`, `tests/hermetic.py`, `tests/run.py`. I did not run the suite.
- The suite is described as 356 unittest cases in the README status line, with an allowlist of skips that lists none; the harness exits 1 on any unlisted skip (`tests/skips.allow`, README.md:261).
- Caps are pinned by case: `test_26_in_force` (26 entries give "26 entries in force; the cap is 25", 25 give no problem), `test_8_in_every_session` (8 give the cap-of-7 message, 7 give none), and a questions-file case for "6 questions open; the cap is 5" (`tests/test_ledger.py`, lines 68-80 and 323).
- Entry shape: `test_a_duplicate_number`, `test_an_entry_outside_a_subsection`, `test_an_entry_without_its_dated_parenthetical`, `test_a_title_or_tail_twice`, `test_l1_*`, `test_l2_*`, `test_legacy_marker_stops_parsing`, `test_l3_*` for the questions file (labels, fences, repeated numbers, equal labels).
- `answer`: `test_pick_writes_entry_n`, `test_amends_keeps_earlier_amendments`, `test_amends_refuses_a_paragraph_cut_by_half`, `test_amends_shorter_writes_and_prints_replaced`, `test_body_only_refuses_a_title`, `test_body_only_refuses_a_tail`, `test_no_entry_retires_number`, `test_both_files_or_neither`, `test_a_failed_block_write_keeps_the_answer`, `test_into_the_ledger_itself_exits_2`. Several of these names answer an incident or review finding recorded in the packets (d19, d21, d22).
- `ask`: `test_five_questions_two_calls`, `test_payload_fields`, `test_a_render_that_empties_a_part_keeps_the_text`, `test_a_render_that_drops_an_effect_keeps_the_text`, `test_an_answered_block_is_not_asked`, `test_no_respeak_exits_0`, `test_the_render_runs_as_a_marked_helper`.
- `new`: `test_two_to_four_options`, `test_first_option_recommended`, `test_sixth_question_refused`, `test_parallel_runs_take_distinct_numbers`, `test_a_held_lock_refuses_and_writes_nothing`, `test_a_failed_ledger_write_restores_the_questions`.
- `render`: `test_the_block_between_the_markers`, `test_proposed_and_superseded_stay_out`, `test_stale_prints_the_diff_exits_1_and_writes_nothing`, `test_into_the_ledger_itself_exits_2`, `test_a_crlf_target_keeps_crlf_outside_the_block`.
- Not pinned by any test name I read: the intake's case of `answer` while open questions exceed the cap (no test name mentions it), and any byte limit on an entry.
- The sample ledger (`tests/fixtures/sectioned/DECISIONS.md`) has six entries in force across `Every session` (2), `Build` (2), `Build tools` (1) and `Release` (1), one Proposed entry and two Superseded lines, and entry 2 reads "A ledger holds at most 25 entries in force."
- My run on a scratch copy of that fixture (this session, 2026-10-14, source tree untouched): `agentik decisions render` wrote a 563-byte block from a 1,155-byte ledger. The block lists the two `Every session` entries verbatim and one title line each for four other entries. `agentik decisions ask` with no respeak installed printed one AskUserQuestion call (header "Decision 8", two options) and exited 0 with the "no respeak" warning on stderr.

## Limits
- Test names are the tool's own claims about behaviour; I did not run the suite, so "pinned" means "a test of that name exists". The fixture is synthetic.

## Used in
- research/synthesis/tools-decisions.md
