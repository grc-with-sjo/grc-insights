---
name: drafting-grc-insights-issues
description: Use when drafting, rewriting, or editing a GRC Insights newsletter issue (any file in _issues/ other than Issue 0), including the weekly routine's draft step and any session revising an issue PR.
---

# Drafting GRC Insights issues

## Overview

An issue is a **field-notes editorial written in a risk practitioner's voice**. One question runs from the first line to "How I'd approach it". A reader who has not followed the topic must finish knowing what changed, why it matters to their organisation, and which questions to raise with their team.

Facts come only from the deep-research report for this issue (see `routine/weekly-issue.md` hard rules). This skill governs shape and voice, never facts.

## Voice: a risk practitioner, not a columnist

- Frame uncertainty, options and trade-offs. Do not hand down verdicts.
- Use the language of considerations: "one way to hedge is…", "teams may want to…", "it is worth asking whether…", "the risk is that…".
- Never judge other people's choices or past decisions. No "mistake", "wrong", "stop doing X", "naive", "you must".
- Be prescriptive about **what to consider and prepare**, not about one specific answer. Recommend approaches that hold up under several outcomes.
- Surface what others have not thought about: second-order effects, ownership gaps, evidence that will be asked for later.

## The shape (fill `routine/issue-template.md` in this order)

1. **Dek** (front-matter `description`, ≤200 chars): the central question or tension in one sentence.
2. **`## In brief`**: 3 bullets, plain language, no undefined acronyms, no unconfirmed claims.
3. **`## The story so far`** (120–180 words): the backdrop a newcomer needs. Every law, bill and regulator named gets its plain-language explanation here: what it is, what it was meant to do, where it stands. End by naming the issue's central question.
4. **`## What happened`**: 2–4 stories, each a `### ` headline written as a statement. Every story has, in order:
   - **Bridge**: the opening sentence links to the previous story or the central question.
   - **Context**: who the actor is and why the thing exists, before any detail.
   - **What happened**: dated, sourced, specific.
   - **Why it matters**: what it changes for an organisation's risk, controls or evidence.
   - `**Takeaway:**` one line a practitioner can act on or repeat.
   - `**Open question:**` a genuinely unsettled question, phrased so the reader can carry it into a meeting.
5. **`## How I'd approach it`** (200–300 words): first person, in the voice above. Name the uncertainty, set out the approach that holds its value under more than one outcome, and state the trade-off plainly. No verdicts.
6. **`## Questions to take to your team`**: 3 bullets. Each is a **bold, concrete question** a reader could ask in their next risk or governance meeting, followed by one sentence on why it is hard or easy to miss. Questions about the reader's own organisation ("who owns…", "what evidence would we show…"), not abstract policy debates.
7. **`## What to do this quarter`**: 4–5 actions phrased as options ("Consider…", "Map…", "Confirm…"), then `### If you work in…` with the sector table (only affected sectors).
8. **`## On the radar`** and **`## Sources`** as before.

Total 900–1,400 words.

## Sentence rules

- Define every acronym on first use: "the Office of the Privacy Commissioner of Canada (OPC), the federal privacy regulator".
- Explain every law or bill in plain words the first time: "Bill C-27, the federal government's previous attempt to replace PIPEDA, which also carried Canada's first proposed AI law".
- No paragraph opens with a name the reader has not met.
- Short declarative sentences; "programme" spelling (match Issue 0, `_issues/2026-05-field-notes.html`); speak to the reader as a peer.
- Turn jargon into plain claims: "the regulator found the complaint justified", not "well-founded".
- No legal-advice framing.

## Unconfirmed claims: attribute in the sentence, then mark

Anything the research marks secondary-only or conflicting is written as **attributed** prose and ends with the marker:

> Québec's Law 25 is fully in force, and law-firm analyses describe significant penalties available on paper ⚠️ verify.

The site renders `⚠️ verify` as a small † linked to one note at the end of the issue, so the attribution ("law-firm analyses describe…", "according to commentary on…", "reportedly") must carry the caution in the sentence itself. Place the marker at the end of the clause, before the full stop, and use at most one per sentence. Prefer cutting a weak claim over keeping it with a marker. Shape never removes a marker from a claim you keep.

## Before you finish, check

| Check | Pass when |
|---|---|
| Central question | Named by the end of "The story so far" and addressed in "How I'd approach it" |
| Context | Every acronym, law and bill is explained in plain words on first use |
| Voice | No verdicts or judgements of others; options and trade-offs instead |
| Flow | Every `### ` story opens with a bridge sentence |
| Per story | Has `**Takeaway:**` and `**Open question:**` lines |
| Questions | Each "Questions to take to your team" bullet is about the reader's own organisation |
| Unconfirmed | Every `⚠️ verify` claim is attributed in its sentence; ≤10 markers |
| Mechanics | `npm run validate && npm test` pass |

## Common mistakes

- **Verdict instead of judgement.** "Stop waiting for C-36; it was a mistake with C-27." Fix: "Federal reform will come, but nobody can say when or in what shape. One way to hedge is…"
- **A law named, not explained.** "Its successor, Bill C-36…" without saying what C-27 was. Fix: one plain clause of what it is and what it was meant to do.
- **Abstract open questions.** "Will the provinces converge?" Fix: "If a regulator asked tomorrow where your AI training data came from, who could answer, and with what evidence?"
- **Markers carrying the caution.** A bare claim plus `⚠️ verify`. Fix: attribute it in the sentence; the marker only signals it.
- **List of updates with an opinion bolted on.** Fix: pick the central question first, cut stories that don't serve it (they can go on the Radar), and order stories so each one builds on the last.
- **Context after detail.** Fix: move the "who/why" sentence in front of the date and the numbers.
- **Markers lost in a rewrite.** Fix: after drafting, re-check every claim the research marks secondary-only or conflicting and confirm its marker survived.
- **Verbs stronger than the finding.** A regulator "found the company did not comply", not "the company broke the law", unless a court or binding order says so. Never say a company "accepted" a remedy the research does not confirm.
- **Inference dressed as fact.** Put expectations in first person ("I expect…") and keep factual sentences to what the research states.
- **A product or case named without a reason.** "Grok, X's AI chatbot and image generator", not a bare "Grok".
