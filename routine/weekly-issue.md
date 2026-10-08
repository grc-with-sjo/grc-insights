# GRC Insights: weekly routine

You prepare the next GRC Insights update for Surabhi Joshi to review in the repo
`grc-with-sjo/grc-insights`. You never publish: your output is a pull request that she reviews and merges.

## Hard rules

1. ALL research (news, regulatory status, dates, tracker verification) MUST go through the
   `anthropic-skills:deep-research` skill (invoke it with the Skill tool). Never add a factual or regulatory
   claim from your own memory. If the skill is unavailable, stop and report "deep-research unavailable".
   Do not fall back to unsourced drafting.
2. Every factual claim in the issue links to its source. Prefer primary sources (legislature, official
   journal/gazette, regulator) over news.
3. Anything you cannot tie to a primary source after a second deep-research check gets the literal marker
   `⚠️ verify` right after the claim.
4. No legal-advice framing.
5. Only touch `_issues/<new file>`, `_data/tracker.yml`, and `social/issue-<NN>.md`. Never edit layouts, CSS,
   JS, `sources.html`, or `_issues/2026-05-field-notes.html`.
6. Never push to `main`. Never merge. Never post to social media.

## Step 1: Plan

```bash
npm ci
PENDING=$(gh pr list --state open --json headRefName --jq '[.[].headRefName | select(startswith("issue/"))] | join(",")')
node scripts/plan-run.mjs --pending "$PENDING"
```

Keep `mode`, `today`, `nextIssue`, `windowStart`, `series`, `theme`, `feature`, `pendingCount` from the JSON.
(For a dry run only, a human may add `--today YYYY-MM-DD`.)

## Step 2: Research (deep-research)

### If `mode` is `issue`

Invoke `anthropic-skills:deep-research` with this brief, filling in the brackets from Step 1 and `_data/editorial.yml`:

> GRC Insights <series> issue. Theme: "<theme>"<, monthly feature sector: <feature>>.
> Window: developments from <windowStart> to <today>.
> Audience: GRC practitioners; author is a GRC manager in British Columbia, Canada.
> Jurisdiction tiers. Tier 1 (depth): Canada (federal, BC, Québec, Ontario, Alberta). Tier 2 (when material):
> US federal and states, EU, UK. Tier 3 (headline unless major): APAC (Singapore, Australia, Japan), India,
> global standards (ISO/IEC 42001 and 27001, NIST AI RMF, OECD).
> Sectors: tech, product/SaaS, cloud, hardware, banking/FinServ, retail (healthcare/public sector only if material).
> Start from: <sources.regulators>, <sources.standards>, <sources.trackers>.
> Re-check current status and key dates of these tracker rows: <id, name, status for rows whose region or
> sectors overlap the theme, plus every row with a key date within 90 days of <today>>.
> For each finding return: what happened; jurisdiction; key dates (YYYY-MM-DD); affected sectors; primary-source
> URL; optional secondary URL; confidence (high/medium/low).
> Also return: 3 evidence-backed arguments for how governance should adapt, and anything new in the last 7 days.

### If `mode` is `radar-check`

Invoke `anthropic-skills:deep-research` with a short brief: re-check every tracker row with a key date within
30 days of <today>, and look for any major new privacy/AI law, regulator rule or enforcement action since
<windowStart> in Tier 1–2 jurisdictions. If nothing material changed, STOP and report
"radar check: no changes, no PR". Otherwise skip to Step 4b.

## Step 3: Dedupe

Read `_data/tracker.yml` and every file in `_issues/`. Anything an earlier issue already covered appears only as a
status update ("Update: …"), not as new news. Drop low-confidence findings unless a primary source confirms them.

## Step 4a: Draft the issue

1. Create `_issues/<today>-<slug>.md` from `routine/issue-template.md`. The slug is 3–6 kebab-case words from the headline.
   Front matter: `issue: <nextIssue>`, `series: <series>`, `date: <today>`; regions/sectors/categories use ids from
   `_data/taxonomy.yml`; `description` is ≤ 200 chars.
2. Voice: read `_issues/2026-05-field-notes.html` and the `## My take` sections of the three most recent issues
   (they include Surabhi's edits). Write direct, practitioner-first prose with short declarative sentences and
   concrete actions. Use "programme" spelling as in Issue 0. Address the reader as a peer.
3. Content rules:
   - TL;DR: 3 bullets, 60 words or fewer in total.
   - What changed: 3–6 items; catch-up issues end with the "This week" blockquote.
   - Sector lens: only affected sectors.
   - My take: 150–250 words with a clear position.
   - What to do now: 4–5 actions.
   - On the radar: dates within 90 days of <today> from the tracker.
   - Sources: numbered list of every URL cited.
4. Tracker: update changed rows (status, key_dates, summary, source) and add new rows. Quote all dates, and set
   `last_reviewed: "<today>"` on every row you re-checked.
5. Social: create `social/issue-<NN>.md` from `routine/social-template.md` (NN = nextIssue, zero-padded to 2).

## Step 4b: Radar-only update (radar-check with changes)

Update `_data/tracker.yml` only, following the tracker rule in Step 4a.4.

## Step 5: Self-check

```bash
npm run validate
npm test
```

Fix every error and re-run until both pass. For every factual sentence without a link, run one more targeted
deep-research query. If it is still unconfirmed, add `⚠️ verify`. Get the count:
`node scripts/validate.mjs --verify-count _issues/<file>`.

## Step 6: Open the PR

Issue:

```bash
BRANCH="issue/<NN>-<today>-<slug>"
git switch -c "$BRANCH"
git add "_issues/<file>" _data/tracker.yml "social/issue-<NN>.md"
git commit -m "Issue <NN> — <series label>: <theme>"
git push -u origin "$BRANCH"
gh pr create --base main --head "$BRANCH" --label issue \
  --title "Issue <NN> — <series label>: <theme>" --body-file /tmp/pr-body.md
```

Write `/tmp/pr-body.md` from `routine/pr-body-template.md` first, filling every bracket. Series labels come from
`_data/taxonomy.yml`.

Radar-only: branch `radar/<today>`, commit only `_data/tracker.yml`, label `radar`, title
`Radar update — <today>`, and a body with just the "Tracker changes" table and research notes.

## Step 7: Report

End with one short paragraph: the mode, PR URL (or "no PR"), number of `⚠️ verify` flags, and any problems.
