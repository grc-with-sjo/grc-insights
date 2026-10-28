# GRC Insights v2: near-daily publication, new look, agent team

**Date:** 2026-10-28 · **Owner:** Surabhi Joshi · **Site:** https://grc-with-sjo.github.io/grc-insights/ · **Repo:** `grc-with-sjo/grc-insights`
**Builds on:** `2026-10-07-grc-insights-live-notebook-design.md` (pipeline, Radar, issues, guardrails). Everything there still applies unless changed below.

## 1. Intent

GRC Insights is Surabhi's **independent, named** publication on AI governance, privacy and cybersecurity. It is not anonymous: everything on it must make her look like **a credible, independent GRC voice worth following**. v2 turns a weekly newsletter site into a near-daily publication with a professional editorial look, run by a small team of agents, while keeping her review time low and her reputation safe.

**Success in three months (her words):** more LinkedIn followers and more people sharing her posts; on Substack, more viewers and subscribers.

## 2. Goals, non-goals, anti-goals

**Goals**
- Publish on the site **nearly every day**, covering the all-round trends in AI governance, privacy and cybersecurity.
- A **landing page** that says "credible, independent GRC voice" in ten seconds and lets readers go **by area**.
- More **thought leadership**: highly curated essays in her tone and voice, built from her own experience.
- A **forward-deployed GRC** lens: assess what's next, what the future looks like, and what people can start doing now, while watching the market and trends. Every forward-looking thought must have solid backing.
- A version of every reviewed piece for **both LinkedIn and Substack**.
- **Images** on posts that relate to the topic.
- Automation that **does not stall** silently.

**Non-goals**
- Climate & sustainability: a planned future area. **No placeholder section now**; the structure must make adding an area easy later.
- Auto-posting to LinkedIn, Substack or any social platform. Every post is pasted by Surabhi.
- Comments or community features on the site.

**Anti-goals (a failure even if it works)**
- Anything fictitious, speculative-as-fact, hyped or "AI slop"-sounding under her name.
- Opinion published without her approval.
- Topics that could hint at her employer, especially incident response.
- A flood of low-value posts that dilutes credibility.

## 3. Content types

| Type | What it is | Review | Cadence |
|---|---|---|---|
| **Note** | 150–400 words, one development: what happened, when, why it matters in one plain sentence, sources. No opinion. | **May auto-publish** if it passes the gate (§4) | Near-daily (cap 2/day) |
| **Issue** | The existing editorial (catch-up/monthly) per the `drafting-grc-insights-issues` skill. | Surabhi approves (previews in date order) | Monthly from Dec 2026, plus any catch-up still owed |
| **Essay** | Thought leadership: one argument from her experience (§5). | Surabhi approves | 1–2 per month |
| **Weekly digest** | Substack-first roundup of the week's notes and what to watch next. | Surabhi approves | Weekly |

All types are in one `posts`-style flow on the site with a visible type label (**Note / Issue / Essay / Digest**) and one or more **areas**: `ai-governance`, `privacy`, `cybersecurity` (areas are data-driven so a new one, e.g. climate, is a config + content change).

Existing Issues 1–3 keep their URLs.

## 4. Auto-publish gate for notes (Surabhi agreed: factual notes with references that pass a fact check may land without her review)

A note auto-publishes only if **all** hold; otherwise it waits for her:
1. Factual only: no opinion, no "my takeaway", no forecast.
2. Every claim cites an **official/primary source** (regulator, legislature, official journal, standards body); at least one link per claim. Secondary commentary may be linked as further reading but cannot carry a claim. *(Design call: primary-only for auto-publish.)*
3. Passes an **independent fact-check** by an agent that did not write it, checking each claim against its link.
4. Zero `⚠️ verify` markers.
5. Not employer-sensitive (incident-response topics never auto-publish).
6. Headline is conservative (no hype words), passes the voice brief's banned-phrase list.
7. Daily cap: **2 auto-published notes per day**. *(Design call.)*

Safety nets *(design calls)*: a **kill switch** (one config flag pauses all auto-publishing), a **daily digest to Surabhi in chat/notification** listing what auto-published with a one-step unpublish, and the existing pre-release check for anything scheduled.

## 5. Thought leadership (essays)

Agreed shape: ideas come **mostly from her own experience**, sometimes from something she read.
1. **Ideas inbox**: she drops a rough seed in chat; it's kept in a repo ideas list.
2. **Interview**: 3–4 sharp questions to pull out the experience (the moment, what most people get wrong, what she'd do instead). Her answers are the raw material.
3. **Research backs, never leads**: deep-research finds supporting and contradicting evidence.
4. **One-line argument → draft** in her voice (`routine/voice.md`), one argument per piece.
5. She edits until it sounds like her. Never ghost-written opinion: no essay starts without her seed or her yes to a spark.
6. **Sparks**: the scout flags 1–2 items a week worth an opinion and asks "does this connect to anything you've seen?".

## 6. Forward-deployed GRC

Every essay and issue includes a short **"What's next"** element: 2–3 signals to watch, each with a dated, linked source, plus low-regret steps to start now. Rules:
- Forward-looking claims stand on something real: announced timelines, published consultations/drafts, enforcement patterns with dates, regulators' stated priorities, or market data with a named source. **No invented scenarios or numbers.**
- Forecasts are labelled as hers ("I expect…, because…") with the evidence beside them; thin backing → cut, not hedged.
- The fact-checker treats forward-looking claims like facts: each needs at least one dated source showing the trend.
- A per-area **Signals** watch (consultations open, drafts, enforcement trends, market moves) feeds this. *(Design call on "market": vendor/product and adoption moves in GRC, security and AI-governance tooling, plus regulator/standards activity; the GRC jobs market is out of scope unless she says otherwise.)*

## 7. Distribution

- **LinkedIn**: one post a week by Surabhi (she will not post more). Tuesday 08:00–09:00 PT. Short format per `routine/voice.md` and the LinkedIn research (`.superpowers/sdd/2026-10-07-grc-insights-live-notebook/reports/LinkedIn post performance 2026.md` (git-ignored workspace; key rules restated here)): one specific idea, a personal or practitioner hook, ≤3 hashtags, link in the first comment (she may choose to put it in the post), a genuine closing question, reply to comments in the first hour. Usually the week's essay or issue.
- **Substack**: a Substack version of every reviewed piece (issues, essays) plus the **weekly digest**. Goal: viewership and subscribers.
- Nothing posts automatically; every version is delivered **in chat, ready to paste** (her rule: inline, not files).
- **Analytics**: GoatCounter is live (site code `grc-insights`, no history before 2026-10-28). A **weekly scorecard in chat**: top pages, referrers (LinkedIn/Substack/search), and her LinkedIn/Substack numbers if she pastes them.

## 8. Look and feel (Surabhi chose "Mix 1")

Professional, clean, inviting; thought-leadership feel.
- **Base**: light warm canvas `#FBFAF7`, ink text `#13202B`, muted text `#3D4B57`, hairlines `#E7E2D9`.
- **Brand**: deep teal `#0E4A57` (buttons, chips, "Latest" band); amber `#F2B544` + ink diamond pattern as the brand art (hero art, fallback card image, OG cards); amber-brown `#B7791F` for type labels. Coral is dropped.
- **Type**: Fraunces (headlines, wordmark) + Inter (UI and body). Google Fonts.
- **Homepage**: nav (Issues · Essays · Notes · Regulation Radar · About); hero with "Digital trust, decoded" chip, headline "Independent thinking on AI, privacy & cyber risk.", lede naming her, Substack (primary) and LinkedIn buttons, brand art; credibility markers from the existing About bio; a deep-teal **Latest** band of cream image cards (type label, title, area); a **featured essay**; **area** entry points; a **Radar strip** with the next deadlines.
- **Area pages** per area: latest posts + that area's Radar slice.
- **Post pages**: cover image, type label, date, areas, reading time, body (existing † rendering), sources, share, subscribe.
- **Images**: topic-related only (people, laptops, relevant objects; never landscapes/scenery), free-licence sources (e.g. Unsplash) with credit; **no AI-generated images of people**; brand pattern when no honest photo fits. Every post gets a matching **OG/social card**.
- Mockups: `.superpowers/brainstorm/40901-1793199849/content/mix-v4.html` (Mix 1).

## 9. Agent team

| Agent | Job | Runs |
|---|---|---|
| Scout | Daily sweep per area via deep-research; candidate notes, Radar changes, signals, essay sparks | Daily |
| Note writer | Drafts notes from the scout's sourced findings | Daily |
| Fact-checker | Independent claim-by-claim check against links; gate decision | Per note/post |
| Voice & polish editor | Voice brief, banned phrases, typos, headline tone | Per post |
| Image picker | Topic-matched free-licence photo + credit, or brand art; OG card | Per post |
| Publisher | Applies the §4 gate; auto-publishes or opens a PR for Surabhi | Daily |
| Issue/essay drafter | Existing issue skill; essay interview + draft flow | On schedule / on seed |
| Digest builder | Weekly Substack digest + LinkedIn post of the week | Weekly |
| Pre-release checker | Existing freshness check | Daily |
| **Health monitor** | Detects runs stuck or failed (e.g. waiting on a permission prompt, dirty working tree), notifies Surabhi with the fix | Daily |

**Reliability fix (must ship first):** the 2026-10-25 Sunday run and the noon pre-release check have been stuck "running" since 2026-10-26 / 2026-10-22 with ~6 seconds of activity, almost certainly blocked on a permission prompt. Also, stray folders from another project (`reports/`, `research_notes/`) sit untracked in the repo and make the tree dirty. Fix: move the stray folders out, run each task once with Surabhi present to pre-approve tools, and add the health monitor.

## 10. Rules that carry over (non-negotiable)

deep-research for every fact; `routine/voice.md`; plain-language context for every law; † for unconfirmed claims; no fiction; previews in date order before anything she reviews goes live; pre-release freshness check (hold only on major changes); "views are my own" disclaimer and author title "GRC & AI Governance Practitioner · Vancouver, BC".

## 11. Immediate backlog (before or alongside the build)

1. Issue 4 (US state privacy & AI laws + FTC): never drafted because the Sunday run stalled; LinkedIn post 5 already promised "Next week: US state privacy and AI laws".
2. PR #22 (Regulation Radar link-preview card): awaiting her "publish"; restyle to Mix 1 later.
3. PR #19 (shorter LinkedIn posts): open since 2026-10-21.

## 12. Decided by Surabhi vs left to the builder

**Decided by Surabhi:** near-daily site; landing page by area; climate later, no placeholder; factual notes may auto-publish after a fact check; thought leadership from her experience, highly curated, her voice; success = LinkedIn followers/shares and Substack viewers/subscribers; one LinkedIn post a week; Substack versions of everything; forward-deployed lens with solid backing; Mix 1 look; topic-related images, no scenery; About bio as the credentials source.

**Design calls (hers to override):** primary-only sources for auto-publish; daily cap of 2; kill switch and daily digest; weekly digest format; "market" scope; no AI images of people; Note length; content-type names.

**Left to the builder:** Jekyll collection/URL structure for new types (keeping existing issue URLs); how agents are wired as scheduled tasks vs routines; the scout's per-area source lists; exact component CSS; how unpublish works technically.

## 13. Delivery order (agreed 2026-10-28)

1. **Redesign first** (§8): Mix 1 applied to every page, including restyled per-page link-preview cards. Surabhi approved Mix 1 and asked for it across the whole site before anything else.
2. **Agent team and near-daily publishing** (§3–§7, §9) after she answers the open questions: the employer-sensitive deny list, the Substack link and full-vs-short versions (and Medium), an Unsplash developer account, and an auto-publish trial week. Design calls made meanwhile: held notes arrive as one batched daily review and expire after 3 days; one combined daily research sweep plus a weekly deep one; Issue 4 ships first in the current look.
