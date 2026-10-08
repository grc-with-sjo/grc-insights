---
name: drafting-grc-insights-issues
description: Use when drafting, rewriting, or editing a GRC Insights newsletter issue (any file in _issues/ other than Issue 0), including the weekly routine's draft step and any session revising an issue PR.
---

# Drafting GRC Insights issues

## Overview

An issue is a **field-notes editorial**, not a regulatory digest. One argument runs from the first line to "Where I land". A reader who has not followed the topic must finish it knowing the stakes, holding a position, and carrying a question into their next meeting.

Facts come only from the deep-research report for this issue (see `routine/weekly-issue.md` hard rules). This skill governs shape and voice, never facts.

## The shape (fill `routine/issue-template.md` in this order)

1. **Dek** (front-matter `description`, ≤200 chars): the argument in one sentence.
2. **`## In brief`**: 3 bullets, plain language, no undefined acronyms. Each bullet stands alone on LinkedIn.
3. **`## The story so far`** (120–180 words): the backdrop a newcomer needs (which laws, which regulators, what was supposed to happen), then why now. Its last sentence states the thesis: "This issue argues…" or an equivalent plain claim.
4. **`## What happened`**: 2–4 stories, each a `### ` headline written as a statement. Every story has, in order:
   - **Bridge**: the opening sentence links to the previous story or the thesis ("While Ottawa waits, the regulators have not.").
   - **Context**: who the actor is and why the thing exists, before any detail.
   - **What happened**: dated, sourced, specific.
   - **Why it matters**: tie it back to the thesis.
   - `**Takeaway:**` one line a practitioner can act on or repeat.
   - `**Open question:**` the risk or debate the field has not settled, phrased as a real question.
5. **`## Where I land`** (200–300 words): first person, a clear position that resolves the thesis. Name the trade-off you are accepting.
6. **`## The questions still open`**: 2–3 bullets, each an industry-wide risk or unresolved debate, with one clause on why it is hard.
7. **`## What to do this quarter`**: 4–5 actions, then `### If you work in…` with the sector table (reference box; only affected sectors).
8. **`## On the radar`** and **`## Sources`** as before.

Total 900–1,400 words.

## Sentence rules

- Define every acronym on first use: "the Office of the Privacy Commissioner of Canada (OPC), the federal privacy regulator".
- Introduce every law, bill, company or regulator with a clause of context the first time it appears.
- No paragraph opens with a name the reader has not met.
- Short declarative sentences; "programme" spelling (match Issue 0, `_issues/2026-05-field-notes.html`); speak to the reader as a peer.
- Turn jargon into plain claims: "the regulator found the complaint justified", not "well-founded".
- Keep `⚠️ verify` exactly where the research is secondary or conflicting. Shape never removes a marker.
- No legal-advice framing.

## Before you finish, check

| Check | Pass when |
|---|---|
| Thesis | Stated by the end of "The story so far" and resolved in "Where I land" |
| Context | Every acronym and named entity is introduced on first use |
| Flow | Every `### ` story opens with a bridge sentence |
| Per story | Has `**Takeaway:**` and `**Open question:**` lines |
| Reader test | A GRC peer outside Canada (or outside the topic) could follow it |
| Mechanics | `npm run validate && npm test` pass |

## Common mistakes

- **List of updates with an opinion bolted on.** Fix: pick the thesis first, cut stories that don't serve it (they can go on the Radar), and order stories so each one advances the argument.
- **Context after detail.** Fix: move the "who/why" sentence in front of the date and the numbers.
- **Takeaway that restates the story.** Fix: make it something to do or to say in a meeting.
- **Open question with an obvious answer.** Fix: ask what regulators, boards or vendors genuinely disagree on.
