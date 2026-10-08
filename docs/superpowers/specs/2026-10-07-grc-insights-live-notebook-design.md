# GRC Insights — Live Notebook Design

**Date:** 2026-10-07
**Owner:** Surabhi Joshi
**Site:** https://grc-with-sjo.github.io/grc-insights/
**Repo:** `grc-with-sjo/grc-insights`

## 1. Goal

Turn the one-off "2026 Field Notes" page into a living, periodically updated notebook of
Surabhi's views on how the AI world is evolving and how governance should adapt. It should
work as a personal tracker of privacy and AI laws that matter to her, and as something she is
proud to share with GRC peers.

Surabhi's only recurring job is to **review and merge one pull request per issue**, which
should take about 15–20 minutes.

### Success criteria

- A draft issue PR appears on schedule without manual triggering. That means weekly for the
  6-week catch-up, then monthly.
- Nothing goes live without Surabhi merging a PR.
- Every factual or regulatory claim in a published issue links to a source, and the
  research behind it came from the `anthropic-skills:deep-research` skill.
- The existing May 2026 content and `sources.html` stay reachable at stable URLs and are indexed.
- Each issue ships with ready-to-paste social drafts.
- Per-issue views and referrers are measurable with cookieless analytics.

### Out of scope

- Auto-posting to any social platform. Surabhi always posts herself.
- An email newsletter platform in Phase 1. Substack or Buttondown is optional in Phase 2.
- Comments or community features on the site.
- Legal advice. The existing footer disclaimer stays.

## 2. Current state

- Static GitHub Pages site with no generator: `index.html` (May 2026 Field Notes, 7 trends),
  `sources.html` (19 sources), and `css/style.css`.
- Published via GitHub web uploads.
- No archive, RSS, sitemap, OpenGraph tags, analytics, or subscribe path. LinkedIn is the only
  social link.

## 3. Site architecture (Jekyll on GitHub Pages)

GitHub Pages builds Jekyll natively (legacy build from `main` /), so deployment needs no custom Action. A separate check workflow builds the site with `actions/jekyll-build-pages` and runs tests on every push.

```
grc-insights/
├── _config.yml          # site meta; plugins: jekyll-sitemap, jekyll-seo-tag; future: true;
│                        # collection `issues` (output: true, permalink /issues/:name/)
├── _layouts/
│   ├── default.html     # current hero/footer/fonts extracted from index.html; SEO tags; analytics
│   └── issue.html       # issue page: hero, TL;DR, body sections, sources, share row
├── _includes/           # about.html, share.html, subscribe.html, filter-chips.html, radar-data.html
├── _issues/             # one Markdown file per issue: the only content the weekly PR adds
├── _data/
│   ├── editorial.yml    # cadence, calendar, source list, research brief inputs
│   ├── taxonomy.yml     # single source of truth for regions, sectors, categories, series, tracker enums
│   └── tracker.yml      # Regulation Radar rows
├── social/              # issue-NN.md social drafts (excluded from the site; _data/ only accepts data files)
├── index.html           # latest issue hero + archive list (filter by category/sector/region) + subscribe
├── radar.html           # Regulation Radar, permalink /radar/
├── about.html
├── sources.html         # UNCHANGED URL; passed through as-is (no front matter); back link → Issue 0
├── feed.xml             # hand-written Atom feed of the issues collection (jekyll-feed only feeds posts)
├── js/                  # filters.js (archive + radar filters), radar.js (upcoming-dates strip)
├── assets/og-card.png   # default social preview image
├── css/style.css        # existing styles, extended for archive/radar/share
├── scripts/             # validate.mjs, plan-run.mjs, lib/ (excluded from site)
├── tests/               # node:test suites (excluded from site)
├── routine/             # weekly routine prompt + issue/social/PR templates (excluded from site)
└── .github/workflows/check.yml
```

### Legacy content migration

- The May 2026 Field Notes becomes **Issue 0** at `/issues/2026-05-field-notes/`, with the
  content kept word-for-word.
- `sources.html` stays at `/sources.html`, so existing links still work.
- The root URL stays the same. The homepage shows the latest issue and the archive, with
  Issue 0 pinned as the founding piece.
- Every issue, including Issue 0, appears in `sitemap.xml` and gets a canonical URL, meta
  description, and OpenGraph/Twitter card via `jekyll-seo-tag`.
- Surabhi does a one-time manual step: verify the site in Google Search Console and submit
  the sitemap.

### Regulation Radar (`_data/tracker.yml`)

This is a standing, filterable table of every law, regulation, and standard being watched.
Each row has these fields:

```yaml
- id: ca-qc-law25
  name: Québec Law 25
  region: CA            # CA | US | EU | UK | APAC | IN | GLOBAL
  jurisdiction: Québec
  type: privacy-law     # privacy-law | ai-law | sector-rule | standard | guidance
  status: in-force      # proposed | passed | in-force | phasing-in | amended | lapsed | repealed
  key_dates: [{date: "2024-09-22", what: "Data portability right in force"}]  # dates quoted
  sectors: [tech, saas, cloud, banking, retail]
  applies_to_me: high   # high | medium | watch
  summary: "One line."
  source: https://...
  last_reviewed: "2026-10-18"
```

`radar.html` renders this table with region, sector, and status filters (small vanilla JS,
no framework). It also shows an "upcoming in next 90 days" strip. The `applies_to_me` field is
Surabhi's personal relevance flag. It defaults to `high` for Canada federal and BC.

## 4. Issue template and content model

### Front matter

```yaml
---
title: "…"
issue: 1
series: catch-up        # field-notes (Issue 0) | catch-up | weekly | monthly | flash
date: 2026-10-18        # date the routine drafts it; Surabhi may change before merge
regions: [CA, US]
sectors: [saas, cloud, banking]
categories: [privacy-law, ai-governance]
description: "One-sentence hook (≤200 chars); meta/OG description and LinkedIn opener."
---
```

### Body sections (fixed order)

1. **TL;DR**: 3 bullets, 60 words or fewer in total.
2. **What changed**: 3–6 items, each with what, where, effective date, and a source link.
   In catch-up issues, this follows the theme and ends with a short "This week" box.
3. **Sector lens**: a table of affected sectors against "what it means / what to do".
   It lists only the sectors actually affected.
4. **My take**: 150–250 words with a clear position, drafted in Surabhi's voice for her to edit.
5. **What to do now**: 4–5 checklist actions, the existing signature format.
6. **On the radar**: dates in the next 90 days, pulled from `tracker.yml`.
7. **Sources**: every claim linked, with primary sources preferred.

### Categories (tags)

`ai-governance`, `privacy-law`, `enforcement`, `frameworks`, `third-party-risk`, `practitioner`.

### Sectors

The standing set is `tech`, `saas`, `cloud`, `hardware`, `banking`, `retail`. `healthcare` and
`public-sector` are added only when something material happens.

### Jurisdiction tiering

| Tier | Coverage | Jurisdictions |
|---|---|---|
| 1 | In depth, every issue | Canada: federal, BC, Québec, Ontario, Alberta |
| 2 | Covered when material | US federal and states; EU; UK |
| 3 | Headline + link, promoted to depth only when it's a big deal | APAC (Singapore, Australia, Japan), India, global standards (ISO 42001/27001, NIST AI RMF, OECD) |

### Quality guardrails

- **Research source rule (hard requirement):** all content gathering, regulatory status
  checks, and tracker data verification go through the `anthropic-skills:deep-research`
  skill. The drafting step must not introduce factual or regulatory claims from model memory.
- Every factual claim has a link. Primary sources (regulator or official journal) are preferred
  over secondary news.
- Any claim that can't be tied to a primary source after a deep-research re-check is marked
  `⚠️ verify` in the draft and counted in the PR checklist.
- There is no legal-advice framing.

## 5. Weekly/monthly pipeline

### Runner

A **Claude Code cloud routine** with GitHub access to `grc-with-sjo/grc-insights`.

**Open risk to verify first:** whether `anthropic-skills:deep-research`, including its
subagent fan-out, is available inside a cloud routine.
- If yes, use the cloud routine as designed.
- If no, run the same prompt as a **desktop scheduled task** on Surabhi's Mac on the same
  schedule. The downside is that a run is skipped if the Mac is asleep. The deep-research
  requirement takes priority over the cloud-vs-desktop choice.

### Schedule

- Catch-up phase: every **Sunday 18:00 America/Vancouver**.
- Monthly phase: the **first Sunday of the month, 18:00 America/Vancouver**.
- The routine always runs weekly. `scripts/plan-run.mjs` (deterministic, unit-tested) decides
  what this run does, in this order:
  1. An issue (merged or open PR) already exists for today's date → `radar-check`.
  2. `calendar` has an entry for today → publish that themed issue.
  3. `cadence: weekly` → publish a weekly issue.
  4. Today ≥ `monthly_start` and is the first Sunday of the month → publish a monthly issue,
     feature sector = `monthly_feature_rotation[months since monthly_start % length]`.
  5. Otherwise → `radar-check` (tracker-only PR if something material changed, else no PR).
- With `cadence: monthly`, the calendar drives the six catch-up weeks, 2026-11-22 and 2026-11-29 are
  radar-checks, and monthly issues start 2026-12-06 automatically. Setting `cadence: weekly`
  switches to weekly issues; that one line is the only cadence control.
- "Today" is computed in America/Vancouver, so the routine's cron can be expressed in UTC.

### `_data/editorial.yml`

```yaml
cadence: monthly         # weekly | monthly (calendar entries always publish)
calendar:                # catch-up themes keyed by run date
  2026-10-11: {series: catch-up, theme: "Canada privacy & AI: federal reform, Law 25, BC PIPA"}
  2026-10-18: {series: catch-up, theme: "EU AI Act phase-ins, GDPR enforcement, UK"}
  2026-10-25: {series: catch-up, theme: "US state privacy & AI laws + FTC"}
  2026-11-01: {series: catch-up, theme: "Banking/FinServ: OSFI E-23, DORA, model risk, AI in credit"}
  2026-11-08: {series: catch-up, theme: "Tech, SaaS, cloud, hardware: AI supply chain, chips, vendor AI clauses"}
  2026-11-15: {series: catch-up, theme: "APAC, India DPDP, global standards + 2027 outlook"}
monthly_start: 2026-12-06
monthly_feature_rotation: [banking, saas, cloud, tech, retail, hardware]
sources:                 # seeds for the deep-research brief
  regulators: [OPC, BC OIPC, CAI Québec, IPC Ontario, OSFI, FTC, CPPA, state AGs, EDPB, EU AI Office, ICO, PDPC Singapore, OAIC, MeitY/DPB India]
  standards: [NIST, ISO/IEC JTC 1/SC 42, OECD AI]
  trackers: [IAPP]
```

### Steps per run

1. **Plan.** Run `node scripts/plan-run.mjs --pending <open issue/* branch names>`. It returns
   mode, series, theme, `nextIssue` (max of merged and pending issue numbers + 1) and the research
   window, which starts at the last *merged* issue's date, so a skipped week leaves no gap.
2. **Research.** Invoke `anthropic-skills:deep-research` with a brief containing the theme,
   window, tiered jurisdictions, standing sectors, seed sources, and current `tracker.yml`
   rows for status re-checks. Its cited report is the only factual input to drafting.
3. **Dedupe.** Compare against `tracker.yml` and prior `_issues/`. Anything already covered
   is shown as a status update, not as new news.
4. **Draft.**
   - Write `_issues/YYYY-MM-DD-<slug>.md` using the section 4 template.
   - Update the changed `tracker.yml` rows and their `last_reviewed` dates.
   - Write `social/issue-NN.md`.
   - Take the voice from Issue 0 and from the "My take" sections of merged issues, which
     already include Surabhi's edits.
5. **Self-check.**
   - Every claim has a link.
   - Unsourced claims are re-checked through deep-research, and any still unresolved get
     `⚠️ verify`.
   - Dates are ISO and the front matter is valid.
   - `npm run validate` and `npm test` pass. The check workflow builds the site with
     `actions/jekyll-build-pages` on the pushed branch and runs the site tests.
6. **Open the PR** on branch `issue/NN-YYYY-MM-DD-<slug>` (label `issue`), titled `Issue NN — <series>: <theme>`, with
   this checklist:
   - [ ] TL;DR works as a LinkedIn opener
   - [ ] "My take" sounds like me and I agree with it
   - [ ] `⚠️ verify` items resolved (N flagged)
   - [ ] Tracker changes look right (row-level summary in the PR body)
   - [ ] Social drafts reviewed (`social/issue-NN.md`)

### Edge cases

- **Quiet week:** open a short tracker-only PR (branch `radar/YYYY-MM-DD`, label `radar`).
  Surabhi merges or closes it.
- **Off-cycle big event** during the monthly phase: open a **tracker-only PR**. A full
  "flash" issue is created only when Surabhi asks in a session.
- **Unmerged previous PR:** the new run still opens its own PR. Its body notes the backlog,
  and its research window starts at the last *merged* issue.
- **Routine failure:** nothing is published, and the failure is visible in the routine's
  run history.

### Surabhi's review loop

1. Open the PR and read the Markdown preview.
2. Edit in the GitHub web editor, or leave PR comments and ask a session to revise.
3. Merge. Pages rebuilds in about a minute (`future: true`, so merging is publishing, whatever the front-matter date).
4. Post the social drafts.

## 6. Editorial calendar

**Phase 1, catch-up (weekly, covering the June to October 2026 gap):**

| # | PR opens (Sun) | Theme |
|---|---|---|
| 1 | 2026-10-11 | Canada privacy & AI: federal reform, Law 25, BC PIPA |
| 2 | 2026-10-18 | EU AI Act phase-ins, GDPR enforcement, UK |
| 3 | 2026-10-25 | US state privacy & AI laws + FTC (includes retail and consumer data) |
| 4 | 2026-11-01 | Banking/FinServ: OSFI E-23, DORA, model risk, AI in credit |
| 5 | 2026-11-08 | Tech, SaaS, cloud, hardware: AI supply chain, chips, vendor AI clauses (includes retail tech) |
| 6 | 2026-11-15 | APAC, India DPDP, global standards + 2027 outlook |

**Phase 2, monthly (from 2026-12-06, first Sunday of each month):** a roundup of the month plus
one deep-dive feature rotating through `monthly_feature_rotation`, so each sector gets
roughly two features a year.

## 7. Distribution and growth

### Canonical home

The site is canonical. Every platform links back to it, and the PR provides drafts that
**Surabhi posts manually**.

### Social drafts (`social/issue-NN.md`)

- **LinkedIn post:**
  - A hook taken from the TL;DR, 3 takeaways, and one line of the take.
  - The site link goes in the **first comment**.
  - Suggested time: Tue or Wed, 08:00–09:00 PT.
- **LinkedIn carousel outline:** 5–7 slides, for catch-up issues and features. Surabhi
  exports it to PDF.
- **LinkedIn newsletter edition:** the full issue text, adapted, with a canonical link.
- **X/Bluesky thread:** 4–6 posts.
- **Community summary (optional):** a value-first summary for r/privacy, r/grc, or
  IAPP/ISACA chapter channels. Only used when it adds value, never as link-dumping.

### Site growth features

- RSS (`/feed.xml`).
- A subscribe block with LinkedIn newsletter and RSS links. An email platform comes in
  Phase 2 (optional).
- A share row with LinkedIn and X share-intent links. These are plain links with no
  tracking scripts.
- OpenGraph cards on every page.
- A clean `/radar/` URL, to pin in LinkedIn Featured and use in the email signature.

### What to emphasize for views

These are heuristics, not guarantees:
1. Deadline pieces ("what changes on <date>").
2. Comparison tables and checklists, which also make good carousels.
3. A strong opinion in the first line.
4. The Radar as a reference page people bookmark.
5. Sector-specific angles.

### Analytics

**GoatCounter** (free, cookieless, no consent banner), consistent with a privacy-focused
brand. It tracks views per page and referrers.

### Feedback loop

Each monthly PR includes a "What worked last month" section covering top issues and top
referrers. The data is pasted in by Surabhi or read from a GoatCounter export. Strategy
changes are Surabhi's decision; the routine never changes strategy on its own.

## 8. One-time setup (Surabhi)

1. Connect the Claude GitHub app to `grc-with-sjo/grc-insights`, with permission to push
   branches and open PRs.
2. Create a GoatCounter account and site code, and add the code to `_config.yml`.
3. Verify the site in Google Search Console and submit `sitemap.xml`.
4. Optionally enable the LinkedIn newsletter feature on her profile.
5. Keep GitHub Pages set to build from `main` (root). Jekyll is used automatically.

## 9. Implementation order (for the plan)

1. Jekyll scaffold: `_config.yml`, layouts extracted from the current `index.html`, CSS
   carried over.
2. Migrate Issue 0, keep `sources.html`, and build the new homepage and archive.
3. Radar: `tracker.yml` seeded via deep-research, plus `radar.html`.
4. SEO, RSS, sitemap, share row, subscribe block, and GoatCounter.
5. `editorial.yml` and the routine prompt.
6. Verify deep-research availability in the cloud routine, and fall back to a desktop task
   if needed.
7. Dry run: generate Issue 1 as a PR, then Surabhi reviews it.
8. Schedule the routine.

## 10. Revisions made during planning (2026-10-07)

- Social drafts moved from `_data/social/` to top-level `social/`: Jekyll parses every file in
  `_data/` as data, so Markdown there breaks the build.
- `jekyll-feed` replaced by a hand-written `feed.xml`: jekyll-feed only feeds `_posts`, and a
  collection feed at `/feed.xml` would collide with its default posts feed.
- Issue front-matter `tldr` renamed to `description`, which `jekyll-seo-tag` uses for the meta
  and OpenGraph description.
- `next_issue` removed from `editorial.yml`; issue numbers are derived from merged issues plus
  open `issue/*` PR branches, so unmerged PRs can't cause collisions.
- `cadence` defaults to `monthly`; calendar entries drive the catch-up (see section 5).
- Tracker status `lapsed` added (bills that died on the order paper, such as Bill C-27).
- `_data/taxonomy.yml` added as the single source of truth for enums, read by both the Liquid
  templates and the validator.
- `future: true` in `_config.yml`, so merging always publishes.
- No local Jekyll toolchain (no Homebrew or Docker; system Ruby 2.6). Site-build verification
  runs in GitHub Actions; validators and logic tests run locally with Node 20.
- 2026-10-08: catch-up calendar moved one week earlier at Surabhi's request (2026-10-11 → 2026-11-15); monthly issues still start 2026-12-06.
